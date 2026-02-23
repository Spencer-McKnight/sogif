import { describe, it, expect } from 'vitest'
import { registerInterestSchema, hashIp } from './register-interest'

describe('registerInterestSchema', () => {
  it('validates a complete valid submission', () => {
    const result = registerInterestSchema.safeParse({
      email: 'test@example.com',
      phone: '+61 412 345 678',
      investmentRange: [20, 70],
    })
    expect(result.success).toBe(true)
  })

  it('validates minimal submission (email only)', () => {
    const result = registerInterestSchema.safeParse({
      email: 'test@example.com',
      investmentRange: [10, 500],
    })
    expect(result.success).toBe(true)
  })

  it('allows empty phone or +61 prefix only', () => {
    const emptyResult = registerInterestSchema.safeParse({
      email: 'test@example.com',
      phone: '',
      investmentRange: [20, 70],
    })
    expect(emptyResult.success).toBe(true)

    const prefixOnlyResult = registerInterestSchema.safeParse({
      email: 'test@example.com',
      phone: '+61',
      investmentRange: [20, 70],
    })
    expect(prefixOnlyResult.success).toBe(true)
  })

  it('rejects missing email', () => {
    const result = registerInterestSchema.safeParse({
      investmentRange: [20, 70],
    })
    expect(result.success).toBe(false)
  })

  it('rejects invalid email format', () => {
    const result = registerInterestSchema.safeParse({
      email: 'not-an-email',
      investmentRange: [20, 70],
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Enter a valid email address')
    }
  })

  it('rejects invalid Australian phone number', () => {
    const result = registerInterestSchema.safeParse({
      email: 'test@example.com',
      phone: '0412345678', // missing +61
      investmentRange: [20, 70],
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Australian phone number')
    }
  })

  it('rejects investment range where min > max', () => {
    const result = registerInterestSchema.safeParse({
      email: 'test@example.com',
      investmentRange: [70, 20],
    })
    expect(result.success).toBe(false)
  })

  it('rejects investment range outside bounds', () => {
    const tooLow = registerInterestSchema.safeParse({
      email: 'test@example.com',
      investmentRange: [5, 50],
    })
    expect(tooLow.success).toBe(false)

    const tooHigh = registerInterestSchema.safeParse({
      email: 'test@example.com',
      investmentRange: [50, 600],
    })
    expect(tooHigh.success).toBe(false)
  })

  it('rejects honeypot field when filled', () => {
    const result = registerInterestSchema.safeParse({
      email: 'test@example.com',
      investmentRange: [20, 70],
      website: 'spam-content',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Spam detected')
    }
  })

  it('accepts empty honeypot field', () => {
    const result = registerInterestSchema.safeParse({
      email: 'test@example.com',
      investmentRange: [20, 70],
      website: '',
    })
    expect(result.success).toBe(true)
  })
})

describe('hashIp', () => {
  it('returns a consistent hash for the same IP', async () => {
    const hash1 = await hashIp('192.168.1.1')
    const hash2 = await hashIp('192.168.1.1')
    expect(hash1).toBe(hash2)
  })

  it('returns different hashes for different IPs', async () => {
    const hash1 = await hashIp('192.168.1.1')
    const hash2 = await hashIp('192.168.1.2')
    expect(hash1).not.toBe(hash2)
  })

  it('returns a 64-character hex string', async () => {
    const hash = await hashIp('192.168.1.1')
    expect(hash).toMatch(/^[a-f0-9]{64}$/)
  })
})
