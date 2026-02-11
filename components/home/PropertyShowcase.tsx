'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

// TODO: Replace with CMS-managed property data
const properties = [
  {
    id: '1',
    title: 'Commercial Property Portfolio',
    location: 'Melbourne Metro, VIC',
    type: 'Commercial',
    status: 'Active',
    image: 'https://www.datocms-assets.com/192130/1768821769-house1.webp?w=800&fit=max&auto=format',
  },
  {
    id: '2',
    title: 'Residential Development',
    location: 'Greater Sydney, NSW',
    type: 'Residential',
    status: 'Active',
    image: 'https://www.datocms-assets.com/192130/1768821769-house2.webp?w=800&fit=max&auto=format',
  },
  {
    id: '3',
    title: 'Mixed-Use Investment',
    location: 'Brisbane, QLD',
    type: 'Mixed-Use',
    status: 'Monitoring',
    image: 'https://www.datocms-assets.com/192130/1768821769-house3.webp?w=800&fit=max&auto=format',
  },
]

const statusColors = {
  Active: 'bg-sogif-success/20 text-sogif-success',
  Monitoring: 'bg-sogif-gold/20 text-sogif-gold',
  Exited: 'bg-white/20 text-white/60',
}

export function PropertyShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-sogif-cyan-dark font-semibold text-sm uppercase tracking-wider mb-3 block">
              Portfolio Assets
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Property Investments
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              SOGIF invests in strategic real estate opportunities across Australia, 
              focusing on properties with strong income potential and growth upside.
            </p>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sogif-cyan-dark hover:text-gray-900 font-semibold transition-colors shrink-0"
          >
            View All Properties
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <motion.article
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusColors[property.status as keyof typeof statusColors]}`}>
                    {property.status}
                  </span>
                </div>

                {/* Type Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-white text-sm font-medium">{property.type}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sogif-cyan-dark transition-colors">
                  {property.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{property.location}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-sogif-navy/5 rounded-full px-6 py-3">
            <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-gray-900 font-medium">
              All investments independently valued and audited annually
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
