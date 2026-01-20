'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useConstants } from '@/lib'

// TODO: Replace with CMS-managed content
const ctaContent = {
  headline: 'Ready to Grow Your Wealth?',
  subheadline: 'Join over 500 investors who trust SOGIF for strategic growth and reliable income.',
  minInvestment: '$10,000',
  additionalInvestment: '$1,000',
  closingDate: 'June 2026',
}

export function RegisterInterestCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const constants = useConstants()
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
    <section id="register" className="py-24 bg-sogif-navy relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(0,217,255,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(245,185,66,0.1),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-sogif-gold/20 border border-sogif-gold/40 rounded-full px-4 py-1.5 mb-6">
              <svg className="w-4 h-4 text-sogif-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sogif-gold text-sm font-medium">
                Fund closing to new investors {ctaContent.closingDate}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {ctaContent.headline}
            </h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              {ctaContent.subheadline}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-white/60 text-xs mb-1">Minimum Investment</p>
                <p className="text-2xl font-bold text-white">{ctaContent.minInvestment}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-white/60 text-xs mb-1">Additional Investment</p>
                <p className="text-2xl font-bold text-white">{ctaContent.additionalInvestment}</p>
              </div>
            </div>

            {/* Existing Investor Path */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-white/80 text-sm mb-3">Already an investor?</p>
              <a
                href={constants.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sogif-cyan hover:text-white font-medium transition-colors"
              >
                Access your Investor Portal
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Right Column - Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-sogif-navy mb-2">
                {isSubmitted ? 'Thank You!' : 'Register Your Interest'}
              </h3>
              <p className="text-gray-600 mb-6">
                {isSubmitted 
                  ? "We'll be in touch soon with more information about investing in SOGIF."
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
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sogif-cyan focus:ring-2 focus:ring-sogif-cyan/20 outline-none transition-all text-sogif-navy placeholder:text-gray-400"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-sogif-navy hover:bg-sogif-navy-light text-white font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-sogif-cyan focus-visible:ring-offset-2"
                  >
                    {isSubmitting ? 'Sending...' : 'Request Information'}
                  </button>
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
                <p className="text-gray-500 text-sm mb-4">Ready to invest now?</p>
                <Link
                  href="/invest"
                  className="group flex items-center justify-between w-full bg-sogif-cyan hover:bg-sogif-cyan/90 text-sogif-navy font-semibold px-6 py-4 rounded-xl transition-all"
                >
                  <span>Start Investment Application</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <p className="text-gray-400 text-xs mt-4">
                By registering, you agree to receive investment information from SOGIF. 
                You can unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
