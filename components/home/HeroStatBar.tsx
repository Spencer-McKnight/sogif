'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui'

// TODO: Replace with CMS-managed content
const stats = [
  { value: '~10%', label: 'Annual Growth', sublabel: 'since Dec 2024' },
  { value: '$170M+', label: 'Total Invested' },
  { value: 'Quarterly', label: 'Distributions' },
  { value: '$1.05 / $0.95', label: 'Issue / Redemption Price' },
]

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

export function HeroStatBar() {
  return (
    <section aria-label="Key fund metrics" className="relative bg-sogif-navy pt-2 pb-16 md:pb-20 lg:pb-24">
      <Container>
        {/* Thin separator line */}
        <div className="mb-8 md:mb-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              transition={{ duration: 0.45 }}
              className="rounded-xl border border-white/15 bg-white/[0.03] px-4 md:px-6 py-4 md:py-5 text-center"
            >
              <p className="type-title md:type-metric font-bold text-white">{stat.value}</p>
              <p className="type-caption text-white/60 mt-1">
                {stat.label}
                {stat.sublabel && (
                  <span className="block text-white/40 mt-0.5">{stat.sublabel}</span>
                )}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Bottom gradient bleed — softens the navy-to-white transition */}
      <div className="absolute inset-x-0 bottom-0 h-12 md:h-16 bg-gradient-to-b from-transparent to-white/[0.04] pointer-events-none" />
    </section>
  )
}
