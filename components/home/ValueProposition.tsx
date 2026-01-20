'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

// TODO: Replace with CMS-managed content
const valueProps = [
  {
    icon: 'passive',
    title: 'Truly Passive Income',
    description: 'Receive quarterly distributions directly to your bank account without active management on your part.',
    highlight: 'Quarterly distributions from June 2024',
  },
  {
    icon: 'growth',
    title: 'Long-term Growth',
    description: 'Strategic property acquisitions and entrepreneurial investments designed to grow your capital over time.',
    highlight: 'Capital appreciation strategy',
  },
  {
    icon: 'diversified',
    title: 'Diversified Portfolio',
    description: 'Spread across cash, bonds, strategic assets, and property investments to minimize concentrated risk.',
    highlight: 'Multi-asset allocation',
  },
  {
    icon: 'expert',
    title: 'Expert Management',
    description: 'Guided by directors with decades of experience managing hundreds of millions in investor capital.',
    highlight: '$600M+ combined experience',
  },
]

const icons = {
  passive: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  growth: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  diversified: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  expert: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
}

export function ValueProposition() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sogif-cyan font-semibold text-sm uppercase tracking-wider mb-3 block">
            Why Choose SOGIF
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-sogif-navy mb-4">
            Your Pathway to Financial Growth
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            SOGIF combines the stability of traditional investments with the growth potential of strategic opportunities, 
            managed by experienced professionals with a proven track record.
          </p>
        </motion.div>

        {/* Value Props Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="group relative bg-gray-50 hover:bg-white rounded-2xl p-8 border border-gray-100 hover:border-sogif-cyan/30 transition-all hover:shadow-xl hover:shadow-sogif-cyan/5"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 bg-sogif-navy/5 group-hover:bg-sogif-cyan/10 rounded-xl text-sogif-navy group-hover:text-sogif-cyan transition-colors mb-5">
                {icons[prop.icon as keyof typeof icons]}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-sogif-navy mb-3">
                {prop.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {prop.description}
              </p>

              {/* Highlight Tag */}
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-sogif-cyan">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {prop.highlight}
              </span>

              {/* Hover Gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sogif-cyan/0 via-transparent to-sogif-gold/0 group-hover:from-sogif-cyan/5 group-hover:to-sogif-gold/5 transition-all pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-sogif-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>ASIC Registered</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-sogif-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>ARSN 668 357 837</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-sogif-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>AFSL No 339481</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
