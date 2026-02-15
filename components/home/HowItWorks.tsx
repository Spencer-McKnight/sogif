'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BookDown, ClipboardPen, ChartSpline } from 'lucide-react'
import { AppCard, ButtonLink, Container, SectionHeader } from '@/components/ui'
import { useConstants } from '@/lib/contexts/ConstantsContext'

const icons = [BookDown, ClipboardPen, ChartSpline]

const steps = [
  {
    title: 'Review the PDS',
    description: 'Read our Product Disclosure Statement to understand the fund structure, risks, and potential returns.',
    linkLabel: 'Download PDS',
    urlKey: 'pdsUrl' as const,
    buttonVariant: 'navy' as const,
  },
  {
    title: 'Apply Online',
    description: 'Fill out our straightforward online application form with your personal and investment details.',
    linkLabel: 'Start Application',
    urlKey: 'onlineApplicationUrl' as const,
    buttonVariant: 'primary' as const,
  },
  {
    title: 'Transfer & Access',
    description: 'Transfer your investment amount and track performance, distributions, and portfolio updates via the investor portal.',
    linkLabel: 'Investor Portal',
    urlKey: 'portalUrl' as const,
    buttonVariant: 'success' as const,
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const constants = useConstants()

  return (
    <section className="section-padding bg-sogif-silver" ref={ref}>
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <SectionHeader
            align="center-to-left"
            eyebrow="Investment Process"
            title="3 Steps to Start Investing"
          />
        </motion.div>

        {/* Steps */}
        <div className="relative lg:mb-12">
          {/* Connection Line - Desktop (horizontal) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-sogif-cyan-dark/20 via-sogif-cyan-dark to-sogif-cyan-dark/20 -translate-y-1/2" />

          {/* Connection Line - Mobile/Tablet (vertical) */}
          <div className="lg:hidden absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-sogif-cyan-dark/20 via-sogif-cyan-dark to-sogif-cyan-dark/20 -translate-x-1/2" />

          <div className="grid lg:grid-cols-3 gap-10 max-w-md mx-auto lg:max-w-none">
            {steps.map((step, index) => {
              const Icon = icons[index]
              const href = constants[step.urlKey]

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="relative h-full"
                >
                  <AppCard variant="plain" className="relative z-10 group card-gradient-hover h-full flex flex-col">
                    {/* Icon & Title */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0 inline-flex items-center justify-center w-14 h-14 bg-sogif-navy/5 group-hover:bg-sogif-cyan-dark/10 rounded-xl text-gray-900 group-hover:text-sogif-cyan-dark transition-colors">
                        <Icon className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                      <h3 className="type-title font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="type-support text-gray-800 mb-4 flex-1">
                      {step.description}
                    </p>

                    <ButtonLink
                      href={href}
                      external
                      variant={step.buttonVariant}
                      size="md"
                      className="lg:self-start"
                    >
                      {step.linkLabel}
                    </ButtonLink>
                  </AppCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
