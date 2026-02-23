import { z } from 'zod'

/**
 * Australian phone pattern: +61 followed by 9 digits (with optional spaces/dashes)
 */
const AU_PHONE_PATTERN = /^\+61[\s\-]?\d[\d\s\-]{7,11}\d$/

/**
 * Validation schema for register interest form submissions
 */
export const registerInterestSchema = z.object({
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Enter a valid email address'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === '' || val.trim() === '+61') return true
        return AU_PHONE_PATTERN.test(val.trim())
      },
      { message: 'Enter a valid Australian phone number (+61)' }
    ),
  investmentRange: z
    .tuple([z.number().min(10).max(500), z.number().min(10).max(500)])
    .refine(([min, max]) => min <= max, {
      message: 'Investment range minimum must be less than or equal to maximum',
    }),
  turnstileToken: z.string().optional(),
  website: z.string().max(0, 'Spam detected').optional(),
})

export type RegisterInterestInput = z.infer<typeof registerInterestSchema>

export type ApiResponseCode =
  | 'ok'
  | 'validation_error'
  | 'spam_rejected'
  | 'server_error'

export interface ApiResponse {
  code: ApiResponseCode
  message: string
  errors?: Record<string, string[]>
}

export interface SuccessResponse extends ApiResponse {
  code: 'ok'
}

export interface ValidationErrorResponse extends ApiResponse {
  code: 'validation_error'
  errors: Record<string, string[]>
}

export interface SpamRejectedResponse extends ApiResponse {
  code: 'spam_rejected'
}

export interface ServerErrorResponse extends ApiResponse {
  code: 'server_error'
}

/**
 * Verify Cloudflare Turnstile token server-side
 */
export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY
  if (!secretKey) {
    console.warn('TURNSTILE_SECRET_KEY not set, skipping verification')
    return true
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
        }),
      }
    )

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('Turnstile verification failed:', error)
    return false
  }
}

/**
 * Hash IP address for privacy-preserving rate limiting
 */
export async function hashIp(ip: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(ip + (process.env.IP_HASH_SALT || 'sogif-salt'))
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}
