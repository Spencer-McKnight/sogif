const MIN_SUBMISSION_SECONDS = getEnvNumber('BOT_MIN_SUBMISSION_SECONDS', 2)
const RATE_LIMIT_WINDOW_MINUTES = getEnvNumber('FORM_RATE_LIMIT_WINDOW_MINUTES', 15)
const MAX_SUBMISSIONS_PER_IP = getEnvNumber('FORM_RATE_LIMIT_MAX_PER_IP', 8)
const MAX_SUBMISSIONS_PER_EMAIL = getEnvNumber('FORM_RATE_LIMIT_MAX_PER_EMAIL', 3)

function getEnvNumber(key: string, fallback: number): number {
  const value = process.env[key]
  if (!value) return fallback
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export function isSuspiciousSubmissionTiming(formStartedAt?: number): boolean {
  if (!formStartedAt) return false

  const now = Date.now()
  const elapsedMs = now - formStartedAt

  // Reject clearly invalid timestamps and unrealistically fast submits.
  if (elapsedMs < 0) return true
  return elapsedMs < MIN_SUBMISSION_SECONDS * 1000
}

interface RateLimitCheckParams {
  supabase: any
  ipHash: string
  email: string
}

export async function isRateLimited({
  supabase,
  ipHash,
  email,
}: RateLimitCheckParams): Promise<boolean> {
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString()
  const normalizedEmail = email.toLowerCase().trim()

  const [ipResult, emailResult] = await Promise.all([
    supabase
      .from('form_submissions')
      .select('id', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', windowStart),
    supabase
      .from('form_submissions')
      .select('id', { count: 'exact', head: true })
      .eq('email', normalizedEmail)
      .gte('created_at', windowStart),
  ])

  if (ipResult.error || emailResult.error) {
    console.error('Rate limit check failed:', ipResult.error || emailResult.error)
    // Fail open to avoid blocking real users if the safety check cannot run.
    return false
  }

  const ipCount = ipResult.count ?? 0
  const emailCount = emailResult.count ?? 0

  return ipCount >= MAX_SUBMISSIONS_PER_IP || emailCount >= MAX_SUBMISSIONS_PER_EMAIL
}
