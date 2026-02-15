'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui'
import type { Property } from './types'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-AU', {
    month: 'short',
    year: 'numeric',
  })
}

function getStatusInfo(property: Property) {
  if (property.soldDate) {
    return { label: 'Exited', variant: 'statusWarning' as const }
  }
  return { label: 'Active', variant: 'statusSuccess' as const }
}

interface PropertyCardProps {
  property: Property
  onClick?: () => void
}

export function PropertyCard({ property, onClick }: PropertyCardProps) {
  const status = getStatusInfo(property)
  const hasImage = property.images.length > 0

  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full text-left rounded-2xl bg-white shadow-sm hover:shadow-lg border border-border-soft overflow-hidden transition-all duration-300 hover:-translate-y-0.5 focus-ring"
    >
      {/* Image / Placeholder */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-sogif-navy">
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
        <div className="absolute inset-0 bg-gradient-to-t from-sogif-navy/80 via-sogif-navy/20 to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={status.variant} size="sm">
            {status.label}
          </Badge>
        </div>

        {/* Property Type */}
        <div className="absolute top-3 right-3">
          <span className="type-caption font-medium text-white/80 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1">
            {property.propertyType}
          </span>
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <span className="text-lg sm:text-xl font-bold text-white tabular-nums tracking-tight">
            {property.purchasePrice}
          </span>
          {property.salePrice && (
            <span className="type-caption font-medium text-sogif-gold">
              Sold {property.salePrice}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Address */}
        <h3 className="text-base sm:text-lg font-bold text-sogif-navy leading-snug mb-1 group-hover:text-sogif-cyan-dark transition-colors duration-200">
          {property.address}
        </h3>

        {/* Headline */}
        <p className="type-caption text-text-muted line-clamp-1 mb-4">
          {property.headline}
        </p>

        {/* Metrics strip */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border-soft">
          <div>
            <span className="type-caption text-text-muted block mb-0.5">Cap Rate</span>
            <span className="text-sm font-semibold text-sogif-navy tabular-nums">{property.capitalisationRate}</span>
          </div>
          <div>
            <span className="type-caption text-text-muted block mb-0.5">WALE</span>
            <span className="text-sm font-semibold text-sogif-navy tabular-nums">{property.waleLeaseExpiry} yr</span>
          </div>
          <div>
            <span className="type-caption text-text-muted block mb-0.5">Acquired</span>
            <span className="text-sm font-semibold text-sogif-navy">{formatDate(property.acquiredDate)}</span>
          </div>
        </div>

        {/* View details affordance */}
        <div className="mt-4 flex items-center gap-1.5 type-caption font-medium text-sogif-cyan-dark opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span>View details</span>
          <svg className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  )
}
