import { describe, expect, it } from 'vitest'
import { isRateLimited, isSuspiciousSubmissionTiming } from './register-interest-security'

function createSupabaseMock(ipCount: number, emailCount: number, hasError = false) {
  let callIndex = 0
  const responses = [
    { count: ipCount, error: hasError ? new Error('ip query failed') : null },
    { count: emailCount, error: hasError ? new Error('email query failed') : null },
  ]

  return {
    from() {
      return {
        select() {
          return {
            eq() {
              return {
                gte() {
                  const response = responses[callIndex]
                  callIndex += 1
                  return Promise.resolve(response)
                },
              }
            },
          }
        },
      }
    },
  }
}

describe('isSuspiciousSubmissionTiming', () => {
  it('returns false when timestamp is missing', () => {
    expect(isSuspiciousSubmissionTiming(undefined)).toBe(false)
  })

  it('flags very fast submissions', () => {
    const startedAt = Date.now() - 1000
    expect(isSuspiciousSubmissionTiming(startedAt)).toBe(true)
  })

  it('allows normal submission timings', () => {
    const startedAt = Date.now() - 5000
    expect(isSuspiciousSubmissionTiming(startedAt)).toBe(false)
  })
})

describe('isRateLimited', () => {
  it('returns true when IP count exceeds threshold', async () => {
    const supabase = createSupabaseMock(8, 0)
    await expect(
      isRateLimited({ supabase, ipHash: 'ip-hash', email: 'test@example.com' })
    ).resolves.toBe(true)
  })

  it('returns true when email count exceeds threshold', async () => {
    const supabase = createSupabaseMock(0, 3)
    await expect(
      isRateLimited({ supabase, ipHash: 'ip-hash', email: 'test@example.com' })
    ).resolves.toBe(true)
  })

  it('returns false when under thresholds', async () => {
    const supabase = createSupabaseMock(2, 1)
    await expect(
      isRateLimited({ supabase, ipHash: 'ip-hash', email: 'test@example.com' })
    ).resolves.toBe(false)
  })

  it('fails open when query errors occur', async () => {
    const supabase = createSupabaseMock(99, 99, true)
    await expect(
      isRateLimited({ supabase, ipHash: 'ip-hash', email: 'test@example.com' })
    ).resolves.toBe(false)
  })
})
