'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AppCard, Badge, Button, ButtonLink, Container, DisclaimerText } from '@/components/ui'

// TODO: Replace with CMS-managed content
const ctaContent = {
  headline: 'Interested in our strategy?',
  subheadline: 'Strategic Opportunities (Growth & Income) Fund. It\'s in the name. We aim to protect and grow your capital, with passive distributions along the way. We\'re closing to new investors soon to stabilise our capital, so join now.',
  minInvestment: '$10,000',
  additionalInvestment: '$1,000',
  closingDate: 'June 2026',
}

export function RegisterInterestCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Implement actual form submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail('')
  }

  return (
    <section id="register" className="section-padding bg-sogif-navy relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(0,217,255,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(245,185,66,0.1),transparent_50%)]" />
      </div>

      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="announcementGold" className="gap-2 mb-6">
              <svg className="w-4 h-4 text-sogif-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>Fund open to new investors until {ctaContent.closingDate}</span>
            </Badge>

            <h2 className="type-heading font-bold text-white mb-4">
              {ctaContent.headline}
            </h2>
            <p className="type-body text-white/90 mb-8">
              {ctaContent.subheadline}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-white/90 type-support mb-1">Minimum Investment</p>
                <p className="type-title font-bold text-white tabular-nums">{ctaContent.minInvestment}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-white/90 type-support mb-1">Additional Investment</p>
                <p className="type-title font-bold text-white tabular-nums">{ctaContent.additionalInvestment}</p>
              </div>
            </div>

          </motion.div>

          {/* Right Column - Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AppCard variant="plain" className="p-8 shadow-2xl shadow-black/15 border-white/80">
              <h3 className="type-title font-bold text-gray-900 mb-2">
                {isSubmitted ? 'Thank You!' : 'Register Your Interest'}
              </h3>
              <p className="type-support text-gray-800 mb-6">
                {isSubmitted
                  ? "Monitor your email for more information about investing in SOGIF."
                  : "Get our PDS and investment information pack delivered to your inbox."
                }
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sogif-cyan-dark focus:ring-2 focus:ring-sogif-cyan-dark/20 outline-none transition-all text-gray-900 placeholder:text-gray-600"
                    />
                  </div>
                  <DisclaimerText tone="dark" className="mt-2">
                    By registering, you agree to receive an investment guide from SOGIF via email. Unsubscribe at any time.
                  </DisclaimerText>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="navy"
                    size="md"
                  >
                    {isSubmitting ? 'Sending...' : 'Request Information'}
                  </Button>

                </form>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-sogif-success/10 rounded-xl">
                  <svg className="w-6 h-6 text-sogif-success shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sogif-success font-medium">Information pack on its way!</span>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-gray-600 type-support mb-4">Ready to invest now?</p>
                <ButtonLink
                  href="/invest"
                  variant="primary"
                  size="md"
                  glow="gold"
                >
                  Join the Fund
                </ButtonLink>
              </div>

            </AppCard>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
