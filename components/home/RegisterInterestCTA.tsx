'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StructuredText } from 'react-datocms'
import { AppCard, Button, ButtonLink, Container, Input, Label, SectionHeader, Slider } from '@/components/ui'
import type { HomePageData } from '@/lib'
import type { ApiResponse } from '@/lib/api/register-interest'

interface RegisterInterestCTAProps {
  cms: HomePageData
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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
  formStartedAt: number
  website: string // honeypot field
}

interface FormErrors {
  email?: string
  phone?: string
  submit?: string
}

export function RegisterInterestCTA({ cms }: RegisterInterestCTAProps) {
  const {
    ctaEyebrow,
    ctaHeadline,
    ctaFormTitle,
    ctaDisclaimer,
  } = cms

  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: PHONE_PREFIX,
    investmentRange: SLIDER_DEFAULT,
    formStartedAt: Date.now(),
    website: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
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

    setErrors({})
    setIsSubmitted(true)

    try {
      const response = await fetch('/api/register-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          investmentRange: formData.investmentRange,
          formStartedAt: formData.formStartedAt,
          website: formData.website,
        }),
      })

      const data: ApiResponse = await response.json()

      if (data.code === 'ok') {
        return
      } else if (data.code === 'validation_error' && data.errors) {
        setIsSubmitted(false)
        const newErrors: FormErrors = {}
        if (data.errors.email) newErrors.email = data.errors.email[0]
        if (data.errors.phone) newErrors.phone = data.errors.phone[0]
        if (Object.keys(newErrors).length === 0) {
          newErrors.submit = data.message
        }
        setErrors(newErrors)
      } else {
        setIsSubmitted(false)
        setErrors({ submit: data.message || 'Something went wrong. Please try again.' })
      }
    } catch {
      setIsSubmitted(false)
      setErrors({ submit: 'Unable to submit. Please check your connection and try again.' })
    }
  }

  return (
    <section id="register" className="section-padding bg-sogif-navy relative overflow-hidden">
      <Container className="relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column - Content */}
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow={ctaEyebrow}
              title={ctaHeadline}
              align="left"
              dark={true}
              className="mb-4"
            />
          </div>

          {/* Right Column - Form Card */}
          <div className="lg:col-span-7">
            <AppCard variant="plain" className="p-8 shadow-2xl shadow-black/15 border-white/80">
              <motion.h3
                key={isSubmitted ? 'submitted-title' : 'form-title'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="type-title font-semibold text-gray-900 mb-2"
              >
                {isSubmitted ? 'Thank You!' : ctaFormTitle}
              </motion.h3>

              <AnimatePresence mode="wait" initial={false}>
                {!isSubmitted ? (
                  <motion.form
                    key="register-form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.24, ease: 'easeOut' }}
                  >
                  {/* Honeypot field - hidden from users, bots will fill it */}
                  <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>

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

                  {errors.submit && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg" role="alert">
                      <p className="type-support text-red-700">{errors.submit}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth="sm"
                  >
                    Submit
                  </Button>

                  {ctaDisclaimer?.value ? (
                    <div className="mt-2 [&_p]:type-caption [&_p]:text-gray-500">
                      <StructuredText data={ctaDisclaimer} />
                    </div>
                  ) : null}
                  </motion.form>
                ) : (
                  <motion.div
                    key="thank-you"
                    className="space-y-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
            </AppCard>
          </div>
        </div>
      </Container>
    </section>
  )
}
