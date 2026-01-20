'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// TODO: Replace with CMS content (from SOGIF_CONTEXT.md)
const TEAM_MEMBERS = [
  {
    id: 'steve-mcknight',
    name: 'Stephen (Steve) McKnight',
    role: 'Chair',
    credentials: 'Bachelor of Business (Accounting), Diploma Financial Services, Chartered Accountant',
    highlight: '200,000+ books sold • Property investing authority',
    bio: 'Steve, a qualified chartered accountant and experienced investor, is a recognised authority on property investment. His book "From 0 to 130 Properties in 3.5 Years" has sold over 200,000 copies.',
    image: '', // CMS image URL
  },
  {
    id: 'paul-harper',
    name: 'Paul Harper',
    role: 'Director',
    credentials: 'Bachelor of Business (Accounting), Master of Entrepreneurship and Innovation',
    highlight: '$600M+ fund management experience',
    bio: 'Paul has been assisting individuals to build wealth for more than 25 years. He is currently a responsible manager for a $600M managed fund that owns direct Australian real estate.',
    image: '',
  },
  {
    id: 'ewan-macdonald',
    name: 'Ewan MacDonald',
    role: 'Director',
    credentials: 'Bachelor of Arts, Diploma of Law, Diploma of Practical Legal Training',
    highlight: 'Financial services licensing expert',
    bio: 'Ewan is a highly experienced financial services and managed funds adviser. His experience includes establishment and operation of listed and unlisted managed funds.',
    image: '',
  },
]

export function Team() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight mb-4">
            Leadership Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experienced professionals managing your investment with decades of combined expertise.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-muted rounded-xl p-6 h-full flex flex-col">
                {/* Avatar Placeholder */}
                <div className="mb-5">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center overflow-hidden">
                    {member.image ? (
                      <div className="w-full h-full bg-muted" />
                    ) : (
                      <span className="text-2xl font-bold text-primary-foreground">
                        {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-primary group-hover:text-sogif-cyan transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-sogif-cyan font-medium mt-1">
                    {member.role}
                  </p>
                  
                  {/* Highlight Badge */}
                  <div className="mt-3">
                    <span className="inline-flex items-center rounded-full bg-sogif-gold/10 border border-sogif-gold/20 px-3 py-1 text-xs font-medium text-sogif-gold">
                      {member.highlight}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4 line-clamp-3">
                    {member.bio}
                  </p>

                  <p className="text-xs text-muted-foreground/70 mt-3">
                    {member.credentials}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-medium text-sogif-cyan hover:text-sogif-cyan/80 transition-colors group"
          >
            Learn More About Us
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

