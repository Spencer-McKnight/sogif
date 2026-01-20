'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

// TODO: Replace with CMS content
const CONTENT = {
  headline: 'Not ready to invest? Stay informed.',
  description: 'Receive fund updates, performance reports, and the latest PDS directly to your inbox.',
  submitLabel: 'Register Interest',
  successMessage: 'Thank you! We\'ll be in touch soon.',
  disclaimer: 'We respect your privacy. Unsubscribe at any time.',
}

const INVESTMENT_RANGES = [
  { value: '', label: 'Investment range (optional)' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: '100k-250k', label: '$100,000 - $250,000' },
  { value: '250k+', label: '$250,000+' },
]

export function RegisterInterest() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    investmentRange: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // TODO: Implement form submission to CMS/API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section className="py-16 lg:py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight mb-3">
              {CONTENT.headline}
            </h2>
            <p className="text-muted-foreground">
              {CONTENT.description}
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {isSubmitted ? (
              <div className="bg-sogif-success/10 border border-sogif-success/20 rounded-xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-sogif-success/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-sogif-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-primary">
                  {CONTENT.successMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-background rounded-xl border border-border p-6 lg:p-8">
                <div className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>

                  {/* Investment Range Field */}
                  <div>
                    <label htmlFor="investmentRange" className="block text-sm font-medium text-primary mb-1.5">
                      Investment Range
                      <span className="text-muted-foreground font-normal ml-1">(optional)</span>
                    </label>
                    <select
                      id="investmentRange"
                      value={formState.investmentRange}
                      onChange={(e) => setFormState({ ...formState, investmentRange: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
                    >
                      {INVESTMENT_RANGES.map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      CONTENT.submitLabel
                    )}
                  </button>

                  {/* Disclaimer */}
                  <p className="text-xs text-center text-muted-foreground">
                    {CONTENT.disclaimer}
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

