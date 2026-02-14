'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { AppCard, AppLink, Container, SectionHeader } from '@/components/ui'

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
    bio: 'Highly experienced financial services adviser and consultant, specialising in listed and unlisted managed funds, AFSL compliance, and regulatory requirements. Member of PCL compliance committee, ensuring SOGIF\'s legal legitimacy.',
    image: 'https://www.datocms-assets.com/192130/1768871746-ewan-macdonald.webp?w=400&fit=max&auto=format',
  },
]

export function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
            eyebrow="Leadership Team"
            title="Experienced Professionals, Proven Results"
            description="Our board brings decades of combined experience in property investment, funds management, and financial services compliance. Backed by a team of passionate and intelligent analysts."
          />
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
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-100 ring-2 ring-transparent group-hover:ring-sogif-cyan-dark/50 transition-all duration-base ease-standard group-hover:shadow-lg group-hover:shadow-sogif-cyan-dark/10">
                  <Image
                    src={director.image}
                    alt={director.name}
                    fill
                    className="object-cover object-top media-zoom-hover"
                  />
                </div>
              </div>

              {/* Info */}
              <h3 className="type-title font-bold text-gray-900 mb-1">{director.name}</h3>
              <p className="text-sogif-cyan-dark font-semibold type-support mb-2">{director.role}</p>
              <p className="text-gray-600 type-support mb-4">{director.credentials}</p>
              <p className="text-gray-800 type-support max-w-xs mx-auto">
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
          <AppCard variant="plain" className="group card-gradient-hover hover-lift-soft text-center">
            <p className="type-metric font-bold text-gray-900 mb-2">Master</p>
            <p className="text-gray-800 type-support">Investment Strategies</p>
          </AppCard>
          <AppCard variant="plain" className="group card-gradient-hover hover-lift-soft text-center">
            <p className="type-metric font-bold text-gray-900 mb-2">$2B+</p>
            <p className="text-gray-800 type-support">Capital Managed</p>
          </AppCard>
          <AppCard variant="plain" className="group card-gradient-hover hover-lift-soft text-center">
            <p className="type-metric font-bold text-gray-900 mb-2">70+</p>
            <p className="text-gray-800 type-support">Years Combined Experience</p>
          </AppCard>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <AppLink
            href="/about"
            showArrow
          >
            Learn more about the fund
          </AppLink>
        </motion.div>
      </Container>
    </section>
  )
}
