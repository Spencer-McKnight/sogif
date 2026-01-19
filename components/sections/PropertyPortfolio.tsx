'use client'

import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

// TODO: Replace with CMS content
const PORTFOLIO_CONTENT = {
  eyebrow: 'Property Portfolio',
  title: 'Diversified Assets Across',
  titleAccent: 'Prime Locations',
  description: 'Our curated portfolio spans commercial, residential, and industrial properties in high-growth corridors.',
  properties: [
    {
      id: 1,
      name: 'Riverside Commercial Hub',
      location: 'Brisbane CBD, QLD',
      type: 'Commercial',
      value: '$12.4M',
      yield: '7.2%',
      image: '', // TODO: Add CMS image URL
    },
    {
      id: 2,
      name: 'Harbour View Residences',
      location: 'Sydney, NSW',
      type: 'Residential',
      value: '$8.7M',
      yield: '5.8%',
      image: '',
    },
    {
      id: 3,
      name: 'Logistics Park South',
      location: 'Melbourne, VIC',
      type: 'Industrial',
      value: '$15.2M',
      yield: '8.1%',
      image: '',
    },
    {
      id: 4,
      name: 'Metro Office Tower',
      location: 'Perth, WA',
      type: 'Commercial',
      value: '$11.8M',
      yield: '6.9%',
      image: '',
    },
  ],
}

function PropertyCard({ property }: { property: typeof PORTFOLIO_CONTENT.properties[0] }) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg shadow-navy-900/5 hover:shadow-xl hover:shadow-navy-900/10 transition-all duration-500">
      {/* Image Container */}
      <div className="relative h-56 bg-gradient-to-br from-navy-800 to-navy-900 overflow-hidden">
        {property.image ? (
          <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Placeholder Pattern */}
            <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
            <svg className="w-16 h-16 text-cyan-400/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        )}
        
        {/* Property Type Badge */}
        <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-navy-900 text-xs font-semibold rounded-full">
          {property.type}
        </span>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-navy-900 mb-1 group-hover:text-cyan-500 transition-colors">
          {property.name}
        </h3>
        <p className="text-slate-500 text-sm mb-4 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {property.location}
        </p>
        
        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <span className="block text-xs text-slate-400 uppercase tracking-wider">Value</span>
            <span className="text-lg font-semibold text-navy-900">{property.value}</span>
          </div>
          <div className="text-right">
            <span className="block text-xs text-slate-400 uppercase tracking-wider">Yield</span>
            <span className="text-lg font-semibold text-green-500">{property.yield}</span>
          </div>
        </div>
      </div>
      
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}

export function PropertyPortfolio() {
  return (
    <section className="relative py-24 md:py-32 bg-slate-50 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cyan-400/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-900/5 rounded-full blur-[100px]" />
      
      <Container className="relative z-10">
        <SectionHeading
          eyebrow={PORTFOLIO_CONTENT.eyebrow}
          title={
            <>
              {PORTFOLIO_CONTENT.title}{' '}
              <span className="text-cyan-500">{PORTFOLIO_CONTENT.titleAccent}</span>
            </>
          }
          description={PORTFOLIO_CONTENT.description}
        />
        
        {/* Property Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {PORTFOLIO_CONTENT.properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <Button variant="outline">
            View Full Portfolio
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </Container>
    </section>
  )
}

