import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getConstants } from '@/lib/queries/constants'
import { createServerSupabaseClient, type FormSubmissionInsert } from '@/lib/supabase/server'
import {
  registerInterestSchema,
  verifyTurnstileToken,
  hashIp,
  type ApiResponse,
} from '@/lib/api/register-interest'
import { RegisterInterestEmail, LeadConfirmationEmail } from '@/emails/RegisterInterestEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await request.json()

    // 1. Validate input
    const parseResult = registerInterestSchema.safeParse(body)
    if (!parseResult.success) {
      const fieldErrors: Record<string, string[]> = {}
      for (const issue of parseResult.error.issues) {
        const field = issue.path.join('.')
        if (!fieldErrors[field]) fieldErrors[field] = []
        fieldErrors[field].push(issue.message)
      }
      return NextResponse.json(
        {
          code: 'validation_error',
          message: 'Please check your input and try again.',
          errors: fieldErrors,
        },
        { status: 400 }
      )
    }

    const { email, phone, investmentRange, turnstileToken, website } = parseResult.data

    // 2. Honeypot check
    if (website && website.length > 0) {
      return NextResponse.json(
        { code: 'spam_rejected', message: 'Submission rejected.' },
        { status: 400 }
      )
    }

    // 3. Turnstile verification (if token provided and secret configured)
    let turnstileSuccess = false
    if (turnstileToken && process.env.TURNSTILE_SECRET_KEY) {
      turnstileSuccess = await verifyTurnstileToken(turnstileToken)
      if (!turnstileSuccess) {
        return NextResponse.json(
          { code: 'spam_rejected', message: 'Security verification failed. Please try again.' },
          { status: 400 }
        )
      }
    } else if (process.env.TURNSTILE_SECRET_KEY) {
      return NextResponse.json(
        { code: 'spam_rejected', message: 'Security verification required.' },
        { status: 400 }
      )
    }

    // 4. Extract metadata
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const ipHash = await hashIp(ip)
    const userAgent = request.headers.get('user-agent') || null

    // 5. Insert into Supabase
    const supabase = createServerSupabaseClient()
    const submission: FormSubmissionInsert = {
      email: email.toLowerCase().trim(),
      phone: phone && phone.trim() !== '+61' ? phone.trim() : null,
      investment_min_k: investmentRange[0],
      investment_max_k: investmentRange[1],
      source: 'home_register_interest',
      turnstile_success: turnstileSuccess,
      ip_hash: ipHash,
      user_agent: userAgent,
    }

    const { error: dbError } = await supabase
      .from('form_submissions')
      .insert(submission)

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return NextResponse.json(
        { code: 'server_error', message: 'Unable to process your request. Please try again.' },
        { status: 500 }
      )
    }

    // 6. Get constants from CMS
    const constants = await getConstants()
    const adminEmail = constants.formSubmissionEmail || 'spencer.mcknight.g@gmail.com'
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@sogif.au'
    const investmentLabel = `$${investmentRange[0]}k - $${investmentRange[1] >= 500 ? '500k+' : investmentRange[1] + 'k'}`

    // 7. Fetch PDS for attachment
    const pdsAttachments: { filename: string; content: Buffer }[] = []
    const pdsUrl = constants.pdsUrl
    if (pdsUrl) {
      try {
        const pdfResponse = await fetch(pdsUrl)
        if (pdfResponse.ok) {
          const pdfBuffer = Buffer.from(await pdfResponse.arrayBuffer())
          pdsAttachments.push({
            filename: 'SOGIF-Product-Disclosure-Statement.pdf',
            content: pdfBuffer,
          })
        }
      } catch (pdfError) {
        console.warn('Failed to fetch PDS for attachment:', pdfError)
      }
    }

    // 8. Send admin notification
    try {
      await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject: `New Register Interest: ${email}`,
        react: RegisterInterestEmail({
          email,
          phone: phone && phone.trim() !== '+61' ? phone.trim() : undefined,
          investmentRange: investmentLabel,
          submittedAt: new Date().toISOString(),
        }),
      })
    } catch (emailError) {
      console.error('Admin email send error:', emailError)
    }

    // 9. Send lead confirmation with PDS attachment
    const applicationUrl = constants.onlineApplicationUrl || 'https://sogif.au/apply'
    try {
      await resend.emails.send({
        from: fromEmail,
        to: email.toLowerCase().trim(),
        subject: 'Thank you for your interest in SOGIF',
        react: LeadConfirmationEmail({
          applicationUrl,
          pdsUrl: pdsUrl || '',
        }),
        attachments: pdsAttachments.length > 0 ? pdsAttachments : undefined,
      })
    } catch (emailError) {
      console.error('Lead confirmation email error:', emailError)
    }

    return NextResponse.json(
      { code: 'ok', message: 'Thank you for your interest. We will be in touch soon.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Register interest API error:', error)
    return NextResponse.json(
      { code: 'server_error', message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
