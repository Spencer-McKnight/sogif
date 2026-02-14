'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AppCard, ButtonLink, Container, SectionHeader } from '@/components/ui'

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
    detail: 'Takes only a few minutes',
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
    detail: 'Portal access',
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding bg-gray-50" ref={ref}>
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <SectionHeader
            eyebrow="Investment Process"
            title="Simple Steps to Start Investing"
            description="Our streamlined process makes it easy to become a SOGIF investor. Here's what to expect from application to your first distribution."
          />
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-sogif-cyan-dark/20 via-sogif-cyan-dark to-sogif-cyan-dark/20 -translate-y-1/2" />

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
                <AppCard variant="plain" className="relative z-10 shadow-sm border-gray-100">
                  {/* Number Badge */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-sogif-navy text-sogif-cyan-light font-bold rounded-xl mb-4">
                    {step.number}
                  </div>

                  <h3 className="type-title font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="type-support text-gray-800 mb-3">
                    {step.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 type-support text-sogif-cyan-dark font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {step.detail}
                  </span>
                </AppCard>

                {/* Arrow - Mobile/Tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <svg className="w-6 h-6 text-sogif-cyan-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <ButtonLink
            href="/invest"
            variant="primary"
            size="lg"
            className="group"
          >
            Start Application
          </ButtonLink>
        </motion.div>
      </Container>
    </section>
  )
}
