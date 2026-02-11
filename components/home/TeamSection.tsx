'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

// TODO: Replace with CMS-managed team data
const directors = [
  {
    id: 'steve-mcknight',
    name: 'Steve McKnight',
    role: 'Chair',
    credentials: 'B.Bus (Accounting), DipFS, CA',
    bio: 'A recognised authority on property investment helping Australians build wealth through positive cash flow property since 1999. CEO of PropertyInvesting.com and author of "From 0 to 130 Properties in 3.5 Years" with 200,000+ copies sold.',
    image: 'https://www.datocms-assets.com/192130/1768821769-steve-mcknight.webp?w=400&fit=max&auto=format',
  },
  {
    id: 'paul-harper',
    name: 'Paul Harper',
    role: 'Director',
    credentials: 'B.Bus (Accounting), MEI',
    bio: '25+ years helping individuals build wealth. A key success driver of the Passive Income (USA Commercial Property) Fund. Responsible manager for a $600M managed fund. Previously chaired investment committee overseeing $500M+ in investor capital.',
    image: 'https://www.datocms-assets.com/192130/1768821769-paul-harper.webp?w=400&fit=max&auto=format',
  },
  {
    id: 'ewan-macdonald',
    name: 'Ewan MacDonald',
    role: 'Director',
    credentials: 'BA, DipLaw, DipPLT',
    bio: 'Highly experienced financial services advise and consultant, specialising in listed and unlisted managed funds, AFSL compliance, and regulatory requirements. Member of PCL compliance committee, ensuring SOGIF\'s legal legitimacy.',
    image: 'https://www.datocms-assets.com/192130/1768871746-ewan-macdonald.webp?w=400&fit=max&auto=format',
  },
]

export function TeamSection() {
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
          <span className="text-sogif-cyan-dark font-semibold text-sm uppercase tracking-wider mb-3 block">
            Leadership Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Experienced Professionals, Proven Results
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our board brings decades of combined experience in property investment, 
            funds management, and financial services compliance.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {directors.map((director, index) => (
            <motion.div
              key={director.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="group text-center"
            >
              {/* Image */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-100 ring-2 ring-transparent group-hover:ring-sogif-cyan-dark/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-sogif-cyan-dark/10">
                  <Image
                    src={director.image}
                    alt={director.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-gray-900 mb-1">{director.name}</h3>
              <p className="text-sogif-cyan-dark font-semibold text-sm mb-2">{director.role}</p>
              <p className="text-gray-600 text-xs mb-4">{director.credentials}</p>
              <p className="text-gray-700 text-sm leading-relaxed max-w-xs mx-auto">
                {director.bio}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 grid sm:grid-cols-3 gap-6 text-center"
        >
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-3xl font-bold text-gray-900 mb-2">60+</p>
            <p className="text-gray-700 text-sm">Years Combined Experience</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-3xl font-bold text-gray-900 mb-2">$1B+</p>
            <p className="text-gray-700 text-sm">Capital Managed Historically</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-3xl font-bold text-gray-900 mb-2">100s</p>
            <p className="text-gray-700 text-sm">Property Transactions</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sogif-cyan-dark hover:text-gray-900 font-semibold transition-colors"
          >
            Learn more about our team
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
