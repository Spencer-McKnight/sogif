'use client'

import { motion } from 'framer-motion'

// TODO: Replace with CMS content
const TRUST_METRICS = [
  { value: '$130M+', label: 'Assets Invested' },
  { value: '8.3%', label: 'Historical Return', suffix: '*' },
  { value: '$10,000', label: 'Min. Investment' },
  { value: 'Quarterly', label: 'Distributions' },
]

export function TrustStrip() {
  return (
    <section className="bg-muted border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TRUST_METRICS.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight">
                {metric.value}
                {metric.suffix && (
                  <span className="text-xs text-muted-foreground align-super ml-0.5">
                    {metric.suffix}
                  </span>
                )}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

