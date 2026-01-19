'use client'

import { useState, FormEvent } from 'react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

// TODO: Replace with CMS content
const REGISTER_CONTENT = {
  eyebrow: 'Join Us',
  title: 'Ready to Start Building',
  titleAccent: 'Your Property Portfolio?',
  description: 'Register your interest and our team will reach out to discuss your investment goals.',
  amountRanges: [
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k-250k', label: '$100,000 - $250,000' },
    { value: '250k+', label: '$250,000+' },
  ],
  submitText: 'Register Interest',
  successMessage: 'Thank you for your interest! Our team will be in touch shortly.',
  disclaimer: 'By submitting, you agree to our Privacy Policy and consent to receiving communications about SOGIF.',
}

export function RegisterInterest() {
  const [email, setEmail] = useState('')
  const [amountRange, setAmountRange] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email || !amountRange) {
      setError('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    
    // TODO: Implement actual form submission
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  return (
    <section className="relative py-24 md:py-32 bg-navy-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-400/5 rounded-full blur-[120px]" />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
        
        {/* Diagonal Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cyan-400/5 to-transparent" />
      </div>

      {/* Decorative Shapes */}
      <div className="absolute top-10 left-[10%] w-20 h-20 border border-cyan-400/20 rounded-full" />
      <div className="absolute bottom-20 right-[15%] w-3 h-3 bg-cyan-400 rounded-full animate-pulse-slow" />
      <div className="absolute top-1/3 right-[5%] w-40 h-40 border border-white/5 rotate-45" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-cyan-400 mb-4">
              {REGISTER_CONTENT.eyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight mb-4">
              {REGISTER_CONTENT.title}{' '}
              <span className="text-cyan-400">{REGISTER_CONTENT.titleAccent}</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
              {REGISTER_CONTENT.description}
            </p>
          </div>

          {/* Form Card */}
          <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10">
            {/* Success State */}
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">You&apos;re on the list!</h3>
                <p className="text-slate-300">{REGISTER_CONTENT.successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Amount Range Select */}
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-slate-300 mb-2">
                    Investment Amount Range
                  </label>
                  <div className="relative">
                    <select
                      id="amount"
                      value={amountRange}
                      onChange={(e) => setAmountRange(e.target.value)}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all cursor-pointer"
                    >
                      <option value="" disabled className="bg-navy-900">
                        Select your investment range
                      </option>
                      {REGISTER_CONTENT.amountRanges.map((range) => (
                        <option key={range.value} value={range.value} className="bg-navy-900">
                          {range.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      {REGISTER_CONTENT.submitText}
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </Button>

                {/* Disclaimer */}
                <p className="text-xs text-slate-500 text-center">
                  {REGISTER_CONTENT.disclaimer}
                </p>
              </form>
            )}

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-cyan-400/20 rounded-full opacity-50" />
            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-cyan-400/10 rounded-full blur-xl" />
          </div>
        </div>
      </Container>
    </section>
  )
}

