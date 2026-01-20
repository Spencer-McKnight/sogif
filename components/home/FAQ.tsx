'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

// TODO: Replace with CMS content
const FAQS = [
  {
    id: 'withdrawal',
    question: 'What happens if I need to withdraw my investment?',
    answer: 'The Fund offers quarterly redemption windows. Withdrawal requests must be submitted before the end of each quarter, and proceeds are typically paid within 30 days of the quarter end. Please refer to the PDS for detailed withdrawal terms and any applicable fees.',
  },
  {
    id: 'distributions',
    question: 'How are quarterly distributions calculated?',
    answer: 'Distributions are calculated based on the Fund\'s net income, which includes rental income from properties, interest earned, and any realized capital gains, less operating expenses. Distributions are paid to unit holders on a pro-rata basis based on their holding at the end of each quarter.',
  },
  {
    id: 'fees',
    question: 'What are the fund\'s fees?',
    answer: 'The Fund charges a management fee and may charge performance fees in certain circumstances. All fees are fully disclosed in the Product Disclosure Statement (PDS). There are no entry or exit fees for direct investors.',
  },
  {
    id: 'protection',
    question: 'How is my investment protected?',
    answer: 'The Fund is an Australian registered managed investment scheme (ARSN 668 357 837) regulated by ASIC. Plantation Capital Limited, the Responsible Entity, holds Australian Financial Services Licence 339481. Fund assets are held separately from the Responsible Entity\'s assets by an independent custodian.',
  },
  {
    id: 'minimum-period',
    question: 'What is the minimum investment period?',
    answer: 'While there is no lock-up period, the Fund is designed as a medium to long-term investment. We recommend a minimum investment horizon of 3-5 years to allow the portfolio strategy to deliver optimal returns. Early withdrawal may result in receiving less than your initial investment.',
  },
  {
    id: 'tracking',
    question: 'How do I track my investment performance?',
    answer: 'Investors receive quarterly statements detailing their unit holding, current value, and distributions received. You can also access the Investor Portal at portal.sogif.au for real-time portfolio information, transaction history, and tax documents.',
  },
]

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="faqs" className="py-16 lg:py-24 bg-background scroll-mt-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Common questions about investing with SOGIF.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-3"
        >
          {FAQS.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className={cn(
                  'w-full flex items-center justify-between p-5 text-left transition-colors',
                  openId === faq.id ? 'bg-muted' : 'bg-background hover:bg-muted/50'
                )}
                aria-expanded={openId === faq.id}
              >
                <span className="font-medium text-primary pr-4">
                  {faq.question}
                </span>
                <span className={cn(
                  'flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center transition-transform',
                  openId === faq.id && 'rotate-180 bg-sogif-cyan/20'
                )}>
                  <svg
                    className={cn(
                      'w-4 h-4 transition-colors',
                      openId === faq.id ? 'text-sogif-cyan' : 'text-muted-foreground'
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-muted-foreground mb-2">
            Still have questions?
          </p>
          <a
            href="mailto:admin@sogif.au"
            className="inline-flex items-center gap-2 text-sm font-medium text-sogif-cyan hover:text-sogif-cyan/80 transition-colors"
          >
            Contact our team
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

