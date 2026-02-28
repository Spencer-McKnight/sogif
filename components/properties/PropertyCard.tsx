'use client'

import { DatoImage } from '@/components/ui'
import type { Property } from './types'
import { splitAddress, formatShortDate } from './utils'

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
  const { street, locality } = splitAddress(property.address)

  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full h-full flex flex-col text-left rounded-2xl bg-white shadow-sm hover:shadow-lg ring-1 ring-border-soft overflow-hidden transition-all duration-300 hover:scale-[1.02] focus-ring"
    >
      {/* Image */}
      <div className="relative h-48 sm:h-56 rounded-t-2xl overflow-hidden [backface-visibility:hidden] isolate">
        <DatoImage
          data={property.images[0]}
          className="h-full w-full overflow-hidden rounded-t-2xl"
          layout="fill"
          objectFit="cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Explore affordance — top right */}
        <div className="absolute top-3 right-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm text-white/80 group-hover:bg-white/40 group-hover:text-white transition-all duration-300">
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

      {/* Content — 2-col grid on mobile/tablet (wide cards), 1-col on md+ (narrow cards in 3-col grid) */}
      <div className="flex-1 p-5 grid grid-cols-[1fr,auto] sm:grid-cols-1 gap-x-4">
        {/* Info column */}
        <div className="min-w-0">
          {/* Price + valuation */}
          <div className="flex flex-col xl:flex-row xl:items-baseline xl:gap-2 mb-2">
            <span className="relative w-fit type-title font-semibold text-sogif-navy tabular-nums tracking-tight after:content-[''] after:absolute after:-bottom-px after:left-0 after:h-[2px] after:w-0 after:bg-sogif-gold/80 after:transition-all after:duration-300 group-hover:after:w-full">
              {property.purchasePrice}
            </span>
          </div>

          {/* Address + headline */}
          <h3 className="type-body font-semibold text-sogif-navy leading-snug mb-0.5">
            {street}
            {locality && <><br />{locality}</>}
          </h3>
          <div className="type-caption lg:my-2">
            {property.propertyType}
          </div>
        </div>

        {/* Stats — right column on mobile/tablet, horizontal row below on md+ */}
        <div className="flex flex-col justify-between border-l border-border-soft pl-4 sm:grid sm:grid-cols-3 sm:pt-3 sm:mt-1 sm:pl-0 sm:border-l-0 sm:border-t">
          <div>
            <p className="type-caption text-text-muted w-fit mb-0.5">Acquired</p>
            <span className="text-sm font-semibold text-sogif-navy">{formatShortDate(property.acquiredDate)}</span>
          </div>
          <div>
            <p className="type-caption text-text-muted w-fit mb-0.5">Cap Rate</p>
            <span className="text-sm font-semibold text-sogif-navy tabular-nums">{property.capitalisationRate}</span>
          </div>
          <div>
            <p className="type-caption text-text-muted w-fit mb-0.5">WALE</p>
            <span className="text-sm font-semibold text-sogif-navy tabular-nums">{property.waleLeaseExpiry}</span>
          </div>
        </div>
      </div>
    </button>
  )
}
