'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// TODO: Replace with CMS content
const STEPS = [
  {
    number: '1',
    title: 'Review PDS',
    description: 'Read our Product Disclosure Statement to understand the fund structure, risks, and returns.',
    time: '5 min read',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'Complete Application',
    description: 'Fill out our simple online application form with your details and investment amount.',
    time: '10 min online',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Start Earning',
    description: 'Once your investment is processed, you\'ll begin receiving quarterly distributions.',
    time: 'Quarterly distributions',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export function HowToInvest() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary to-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground tracking-tight mb-4">
            How to Invest
          </h2>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Fully online. No paperwork. Start investing in under 15 minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-sogif-cyan/20 via-sogif-cyan to-sogif-cyan/20 -translate-y-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-primary-foreground/10 h-full">
                  {/* Step Number */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-sogif-cyan flex items-center justify-center text-sogif-navy font-bold text-lg">
                      {step.number}
                    </div>
                    <div className="text-sogif-cyan">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-primary-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm mb-4">
                    {step.description}
                  </p>
                  <span className="inline-flex items-center text-xs font-medium text-sogif-gold">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {step.time}
                  </span>
                </div>

                {/* Arrow - Mobile */}
                {index < STEPS.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <svg className="w-6 h-6 text-sogif-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/invest"
            className="inline-flex items-center justify-center rounded-md bg-sogif-cyan px-8 py-3.5 text-base font-semibold text-sogif-navy shadow-lg shadow-sogif-cyan/25 hover:bg-sogif-cyan/90 hover:shadow-sogif-cyan/40 transition-all"
          >
            Start Your Application
          </Link>
          <p className="mt-4 text-sm text-primary-foreground/50">
            Minimum investment: $10,000
          </p>
        </motion.div>
      </div>
    </section>
  )
}

