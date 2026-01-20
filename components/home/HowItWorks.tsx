'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

// TODO: Replace with CMS-managed content
const steps = [
  {
    number: '01',
    title: 'Review the PDS',
    description: 'Read our Product Disclosure Statement to understand the fund structure, risks, and potential returns.',
    detail: 'Available on our website',
  },
  {
    number: '02',
    title: 'Complete Application',
    description: 'Fill out our straightforward online application form with your personal and investment details.',
    detail: 'Takes approximately 10 minutes',
  },
  {
    number: '03',
    title: 'Transfer Funds',
    description: 'Transfer your investment amount to the fund account. Minimum initial investment is $10,000.',
    detail: 'Bank transfer or BPAY',
  },
  {
    number: '04',
    title: 'Start Earning',
    description: 'Once processed, you\'ll receive quarterly distribution payments and access to the investor portal.',
    detail: 'Portal access within 48 hours',
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sogif-cyan font-semibold text-sm uppercase tracking-wider mb-3 block">
            Investment Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-sogif-navy mb-4">
            Simple Steps to Start Investing
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our streamlined process makes it easy to become a SOGIF investor. 
            Here&apos;s what to expect from application to your first distribution.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-sogif-cyan/20 via-sogif-cyan to-sogif-cyan/20 -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative z-10">
                  {/* Number Badge */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-sogif-navy text-sogif-cyan font-bold rounded-xl mb-4">
                    {step.number}
                  </div>

                  <h3 className="text-xl font-bold text-sogif-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-3 leading-relaxed">
                    {step.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-sogif-cyan font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {step.detail}
                  </span>
                </div>

                {/* Arrow - Mobile/Tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <svg className="w-6 h-6 text-sogif-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <Link
              href="/invest"
              className="inline-flex items-center gap-2 bg-sogif-cyan hover:bg-sogif-cyan/90 text-sogif-navy font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg"
            >
              Start Your Application
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <span className="text-gray-500 text-sm">or</span>
            <Link
              href="#register"
              className="text-sogif-navy hover:text-sogif-cyan font-medium transition-colors"
            >
              Request more information first
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
