'use client'

import Image from 'next/image'
import type { Property } from './types'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-AU', {
    month: 'short',
    year: 'numeric',
  })
}

function formatValuationDate(dateStr: string) {
  const parts = dateStr.split(' ')
  if (parts.length === 3) {
    return `${parts[1].substring(0, 3)} ${parts[2]}`
  }
  return dateStr
}

interface PropertyCardProps {
  property: Property
  onClick?: () => void
}

export function PropertyCard({ property, onClick }: PropertyCardProps) {
  const hasImage = property.images.length > 0

  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full h-full flex flex-col text-left rounded-2xl bg-white shadow-sm hover:shadow-md border border-border-soft overflow-hidden transition-all duration-300 hover:-translate-y-0.5 focus-ring"
    >
      {/* Image / Placeholder */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-sogif-navy">
        {hasImage ? (
          <Image
            src={property.images[0]}
            alt={property.address}
            fill
            className="object-cover media-zoom-hover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <svg className="w-10 h-10 text-white/20 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="type-caption text-white/30 block">{property.propertyType}</span>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-sogif-navy/70 via-transparent to-sogif-navy/20" />

        {/* Property Type — top left */}
        <div className="absolute top-3 left-3">
          <span className="type-caption font-medium text-white/90 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1">
            {property.propertyType}
          </span>
        </div>

        {/* Explore affordance — top right */}
        <div className="absolute top-3 right-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm text-white/50 group-hover:bg-white/25 group-hover:text-white transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </span>
        </div>

        {/* Sale price badge (sold properties only) */}
        {property.salePrice && (
          <div className="absolute bottom-3 left-3">
            <span className="type-caption font-semibold text-sogif-gold bg-sogif-navy/60 backdrop-blur-sm rounded-full px-2.5 py-1">
              Sold {property.salePrice}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Price + valuation */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="relative text-xl sm:text-2xl font-bold text-sogif-navy tabular-nums tracking-tight after:content-[''] after:absolute after:-bottom-px after:left-0 after:h-[2px] after:w-0 after:bg-sogif-gold/80 after:transition-all after:duration-300 group-hover:after:w-full">
            {property.purchasePrice}
          </span>
          <span className="type-caption text-sogif-cyan-dark/70">
            valued {formatValuationDate(property.valuationDate)}
          </span>
        </div>

        {/* Address */}
        <h3 className="text-base sm:text-lg font-bold text-sogif-navy leading-snug mb-0.5 min-h-[3.125em] line-clamp-2">
          {property.address}
        </h3>

        {/* Headline */}
        <p className="type-caption text-text-muted line-clamp-2">
          {property.headline}
        </p>

        {/* Spacer pushes metrics to bottom */}
        <div className="flex-1 min-h-4" />

        {/* Metrics strip — always at bottom */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border-soft">
          <div>
            <span className="type-caption text-text-muted block mb-0.5">Cap Rate</span>
            <span className="text-sm font-semibold text-sogif-navy tabular-nums">{property.capitalisationRate}</span>
          </div>
          <div>
            <span className="type-caption text-text-muted block mb-0.5">Land Size</span>
            <span className="text-sm font-semibold text-sogif-navy tabular-nums">{property.landSize}</span>
          </div>
          <div>
            <span className="type-caption text-text-muted block mb-0.5">Acquired</span>
            <span className="text-sm font-semibold text-sogif-navy">{formatDate(property.acquiredDate)}</span>
          </div>
        </div>
      </div>
    </button>
  )
}
