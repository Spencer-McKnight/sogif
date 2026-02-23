'use client'

import { useState } from 'react'
import { AppCard, Button, ButtonLink, Container, DisclaimerText, SectionHeader } from '@/components/ui'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

// TODO: Replace with CMS-managed content
const ctaContent = {
  headline: 'Got questions about investing in SOGIF?',
  minInvestment: '$10,000',
  additionalInvestment: '$1,000',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Matches +61 followed by 9 digits (with optional spaces/dashes), e.g. +61 4xx xxx xxx
const PHONE_PATTERN = /^\+61[\s\-]?\d[\d\s\-]{7,11}\d$/
const PHONE_PREFIX = '+61 '

const SLIDER_MIN = 10
const SLIDER_MAX = 500
const SLIDER_STEP = 10
const SLIDER_DEFAULT: [number, number] = [20, 70]

function formatInvestment(value: number) {
  return value >= SLIDER_MAX ? '$500k+' : `$${value}k`
}

interface FormData {
  email: string
  phone: string
  investmentRange: [number, number]
}

interface FormErrors {
  email?: string
  phone?: string
}

// TODO: Replace with actual submission endpoint
async function submitInterest(data: FormData) {
  console.log('Submitting interest:', data)
  await new Promise(resolve => setTimeout(resolve, 1000))
}

export function RegisterInterestCTA() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: PHONE_PREFIX,
    investmentRange: SLIDER_DEFAULT,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  function validate(): FormErrors {
    const next: FormErrors = {}
    if (!formData.email.trim()) {
      next.email = 'Email address is required'
    } else if (!EMAIL_PATTERN.test(formData.email)) {
      next.email = 'Enter a valid email address'
    }
    const phoneTrimmed = formData.phone.trim()
    const isJustPrefix = phoneTrimmed === PHONE_PREFIX.trim() || phoneTrimmed === ''
    if (!isJustPrefix && !PHONE_PATTERN.test(phoneTrimmed)) {
      next.phone = 'Enter a valid Australian phone number (+61)'
    }
    return next
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    await submitInterest(formData)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="register" className="section-padding bg-sogif-navy relative overflow-hidden">
      <Container className="relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column - Content */}
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Connect"
              title={ctaContent.headline}
              align="left"
              dark={true}
              className="mb-4"
            />
          </div>

          {/* Right Column - Form Card */}
          <div className="lg:col-span-7">
            <AppCard variant="plain" className="p-8 shadow-2xl shadow-black/15 border-white/80">
              <h3 className="type-title font-semibold text-gray-900 mb-2">
                {isSubmitted ? 'Thank You!' : 'Find Out More'}
              </h3>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="cta-email" className="type-support text-gray-900">
                      Email address <span className="text-gray-600">*</span>
                    </Label>
                    <Input
                      type="email"
                      id="cta-email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, email: e.target.value }))
                        if (errors.email) setErrors(prev => ({ ...prev, email: undefined }))
                      }}
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'cta-email-error' : undefined}
                      className="h-11 rounded-xl bg-white type-body text-gray-900 placeholder:text-gray-600"
                    />
                    {errors.email && (
                      <p id="cta-email-error" className="type-support text-red-600" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="cta-phone" className="type-support text-gray-900">
                      Phone number <span className="ml-1 text-gray-400 type-support">Optional</span>
                    </Label>
                    <p className="type-support text-gray-600">
                      If you&apos;d like us to call
                    </p>
                    <Input
                      type="tel"
                      id="cta-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value
                        if (!value.startsWith(PHONE_PREFIX)) return
                        setFormData(prev => ({ ...prev, phone: value }))
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }))
                      }}
                      placeholder="+61"
                      autoComplete="tel"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'cta-phone-error' : undefined}
                      className="h-11 rounded-xl bg-white type-body text-gray-900 placeholder:text-gray-600 sm:max-w-xs"
                    />
                    {errors.phone && (
                      <p id="cta-phone-error" className="type-support text-red-600" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label className="type-support text-gray-900">
                      Investment range <span className="ml-1 text-gray-400 type-support">Optional</span>
                    </Label>
                    <Slider
                      value={formData.investmentRange}
                      onValueChange={(value) =>
                        setFormData(prev => ({ ...prev, investmentRange: value as [number, number] }))
                      }
                      labels={formData.investmentRange.map(formatInvestment)}
                      min={SLIDER_MIN}
                      max={SLIDER_MAX}
                      step={SLIDER_STEP}
                      aria-label="Investment range"
                      className="pt-8"
                    />
                    <div className="flex justify-between type-support text-gray-600 tabular-nums">
                      <span>$10k</span>
                      <span>$500k+</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    size="lg"
                    fullWidth="sm"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </Button>

                  <DisclaimerText tone="dark" className="mt-2">
                    By submitting, you agree to receive information via email. Providing a phone number will prompt a SOGIF team member to contact you via phone.
                  </DisclaimerText>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 p-4 bg-sogif-success/10 rounded-xl">
                    <svg className="w-6 h-6 text-sogif-success shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sogif-success font-medium type-support">Information pack on its way!</span>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <p className="type-support text-gray-900 mb-4">Ready to invest?</p>
                    <ButtonLink
                      href="/apply"
                      variant="primary"
                      size="lg"
                      glow="gold"
                    >
                      Join the Fund
                    </ButtonLink>
                  </div>
                </div>
              )}
            </AppCard>
          </div>
        </div>
      </Container>
    </section>
  )
}
