'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Award, Briefcase, GraduationCap, ExternalLink } from 'lucide-react'

// TODO: Replace with CMS content
const teamContent = {
  headline: 'Expert Governance',
  subheadline: 'Led by a board of directors with decades of combined experience in accounting, finance, and managed fund operations.',
  directors: [
    {
      name: 'Stephen McKnight',
      role: 'Chair',
      image: '', // TODO: Replace with CMS image
      qualifications: ['Bachelor of Business (Accounting)', 'Diploma Financial Services', 'Chartered Accountant'],
      highlights: [
        'Chair of PCL since 2012',
        '200,000+ copies sold: "From 0 to 130 Properties"',
        'Hundreds of property transactions completed',
        'CEO of PropertyInvesting.com',
      ],
    },
    {
      name: 'Paul Harper',
      role: 'Director',
      image: '', // TODO: Replace with CMS image
      qualifications: ['Bachelor of Business (Accounting)', 'Master of Entrepreneurship and Innovation'],
      highlights: [
        '25+ years wealth building experience',
        'Responsible manager for $600m managed fund',
        'Director of PCL since 2012',
        '32 years in finance industry',
      ],
    },
    {
      name: 'Ewan MacDonald',
      role: 'Director',
      image: '', // TODO: Replace with CMS image
      qualifications: ['Bachelor of Arts', 'Diploma of Law', 'Diploma of Practical Legal Training'],
      highlights: [
        'Financial services specialist',
        'Managed fund establishment expert',
        'AFSL licensing & compliance',
        'Internal compliance committee member',
      ],
    },
  ],
  cta: { label: 'Learn More About Us', href: '/about' },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

export function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0A2540 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sogif-navy/5 text-sogif-navy text-sm font-medium mb-6">
            <Award className="h-4 w-4" />
            Leadership Team
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-sogif-navy mb-4">
            {teamContent.headline}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {teamContent.subheadline}
          </p>
        </motion.div>

        {/* Directors Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {teamContent.directors.map((director, index) => (
            <motion.div
              key={director.name}
              variants={fadeInUp}
              className="group relative"
            >
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Image Area */}
                <div className="aspect-[4/3] bg-gradient-to-br from-sogif-navy to-sogif-navy-light relative overflow-hidden">
                  {director.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={director.image}
                      alt={director.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Placeholder Avatar */}
                      <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white/40">
                          {director.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-sogif-navy/80 via-transparent to-transparent" />
                  
                  {/* Name & Role */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{director.name}</h3>
                    <p className="text-sogif-cyan font-medium text-sm">{director.role}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Qualifications */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="h-4 w-4 text-sogif-gold" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Qualifications</span>
                    </div>
                    <ul className="space-y-1">
                      {director.qualifications.map((qual, i) => (
                        <li key={i} className="text-sm text-slate-600">{qual}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Highlights */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="h-4 w-4 text-sogif-cyan" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Experience</span>
                    </div>
                    <ul className="space-y-1.5">
                      {director.highlights.slice(0, 3).map((highlight, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-sogif-cyan mt-2 shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href={teamContent.cta.href}
            className="inline-flex items-center gap-2 text-sogif-navy font-medium hover:text-sogif-cyan transition-colors"
          >
            {teamContent.cta.label}
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

