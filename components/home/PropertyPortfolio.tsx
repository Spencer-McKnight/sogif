'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui'

// TODO: Replace with CMS content
const PROPERTIES = [
  {
    id: '1',
    name: 'Canterbury Commercial',
    location: 'Canterbury, VIC',
    type: 'Commercial Office',
    status: 'Active',
    image: '', // CMS image URL
  },
  {
    id: '2',
    name: 'Greensborough Retail',
    location: 'Greensborough, VIC',
    type: 'Retail',
    status: 'Active',
    image: '',
  },
  {
    id: '3',
    name: 'Melbourne CBD Mixed',
    location: 'Melbourne, VIC',
    type: 'Mixed Use',
    status: 'Active',
    image: '',
  },
]

const EXIT_HIGHLIGHT = {
  property: 'Richmond Industrial',
  returnPercent: '12.4%',
  exitDate: 'Q3 2025',
}

export function PropertyPortfolio() {
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
            Property Portfolio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tangible assets across Australia&apos;s growth corridors. See where your investment goes.
          </p>
        </motion.div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {PROPERTIES.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group">
                {/* Property Image Placeholder */}
                <div className="relative aspect-[16/10] bg-gradient-to-br from-secondary to-primary overflow-hidden">
                  {property.image ? (
                    // Image will be rendered here when CMS content is available
                    <div className="absolute inset-0 bg-muted" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-16 h-16 text-primary-foreground/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  )}
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center rounded-full bg-sogif-success/90 px-2.5 py-0.5 text-xs font-medium text-white">
                      {property.status}
                    </span>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-primary group-hover:text-sogif-cyan transition-colors">
                    {property.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {property.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {property.type}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Exit Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-sogif-success/10 to-sogif-success/5 border border-sogif-success/20 rounded-lg p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-sogif-success/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-sogif-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recent Exit</p>
                <p className="font-semibold text-primary">{EXIT_HIGHLIGHT.property}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-sogif-success">{EXIT_HIGHLIGHT.returnPercent}</p>
                <p className="text-xs text-muted-foreground">Return Realized</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-primary">{EXIT_HIGHLIGHT.exitDate}</p>
                <p className="text-xs text-muted-foreground">Exit Date</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm font-medium text-sogif-cyan hover:text-sogif-cyan/80 transition-colors group"
          >
            View All Properties
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

