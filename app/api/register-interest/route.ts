import { after, NextRequest, NextResponse } from 'next/server'
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

async function sendRegisterInterestEmails(params: {
  email: string
  phone?: string
  investmentRange: [number, number]
}) {
  try {
    const constants = await getConstants()
    const adminEmail = constants.formSubmissionEmail || 'spencer.mcknight.g@gmail.com'
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@sogif.au'
    const investmentLabel = `$${params.investmentRange[0]}k - $${params.investmentRange[1] >= 500 ? '500k+' : params.investmentRange[1] + 'k'}`
    const pdsUrl = constants.pdsUrl
    const applicationUrl = constants.onlineApplicationUrl || 'https://sogif.au/apply'

    const pdsAttachments: { filename: string; content: Buffer }[] = []
    if (pdsUrl) {
      try {
        const pdfResponse = await fetch(pdsUrl)
        if (pdfResponse.ok) {
          pdsAttachments.push({
            filename: 'SOGIF-Product-Disclosure-Statement.pdf',
            content: Buffer.from(await pdfResponse.arrayBuffer()),
          })
        }
      } catch (pdfError) {
        console.warn('Failed to fetch PDS for attachment:', pdfError)
      }
    }

    await Promise.allSettled([
      resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject: `New Register Interest: ${params.email}`,
        react: RegisterInterestEmail({
          email: params.email,
          phone: params.phone,
          investmentRange: investmentLabel,
          submittedAt: new Date().toISOString(),
        }),
      }),
      resend.emails.send({
        from: fromEmail,
        to: params.email,
        subject: 'Thank you for your interest in SOGIF',
        react: LeadConfirmationEmail({
          applicationUrl,
          pdsUrl: pdsUrl || '',
        }),
        attachments: pdsAttachments.length > 0 ? pdsAttachments : undefined,
      }),
    ])
  } catch (error) {
    console.error('Register interest follow-up error:', error)
  }
}

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

    // 6. Return quickly and run non-critical side effects after the response
    const sanitizedEmail = email.toLowerCase().trim()
    const sanitizedPhone = phone && phone.trim() !== '+61' ? phone.trim() : undefined
    after(() => sendRegisterInterestEmails({
      email: sanitizedEmail,
      phone: sanitizedPhone,
      investmentRange,
    }))

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
