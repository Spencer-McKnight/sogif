'use client'

import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui'
import type { Property } from './types'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function getStatusInfo(property: Property) {
  if (property.soldDate) {
    return { label: 'Exited', variant: 'statusWarning' as const }
  }
  return { label: 'Active', variant: 'statusSuccess' as const }
}

function MetricCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 px-4 bg-surface-soft rounded-xl">
      <span className="type-caption text-text-muted block mb-1">{label}</span>
      <span className="text-sm sm:text-base font-semibold text-sogif-navy">{value}</span>
    </div>
  )
}

interface PropertyDetailModalProps {
  property: Property | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PropertyDetailModal({ property, open, onOpenChange }: PropertyDetailModalProps) {
  if (!property) return null

  const status = getStatusInfo(property)
  const hasImage = property.images.length > 0
  const paragraphs = property.longDescription.split('\n\n').filter(Boolean)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Hero Image / Header */}
        <div className="relative h-56 sm:h-64 bg-sogif-navy overflow-hidden">
          {hasImage ? (
            <Image
              src={property.images[0]}
              alt={property.address}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-sogif-navy via-sogif-navy/50 to-sogif-navy/20" />

          {/* Header overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={status.variant} size="sm">{status.label}</Badge>
              <span className="type-caption text-white/70">{property.propertyType}</span>
            </div>
            <DialogHeader className="text-left">
              <DialogTitle className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {property.address}
              </DialogTitle>
              <DialogDescription className="text-white/70 type-support mt-1">
                {property.headline}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Key Financials */}
          <div>
            <h4 className="type-overline text-sogif-cyan-dark mb-3">Key Financials</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <MetricCell label="Purchase Price" value={property.purchasePrice} />
              {property.salePrice && (
                <MetricCell label="Sale Price" value={property.salePrice} />
              )}
              <MetricCell label="Cap Rate" value={property.capitalisationRate} />
              {property.independentValuation !== 'Not applicable' && (
                <MetricCell label="Independent Valuation" value={property.independentValuation} />
              )}
              <MetricCell label="Financing" value={property.financing} />
              <MetricCell label="Occupancy at Purchase" value={property.occupancyAtPurchase} />
            </div>
          </div>

          {/* Property Details */}
          <div>
            <h4 className="type-overline text-sogif-cyan-dark mb-3">Property Details</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <MetricCell label="Land Size" value={property.landSize} />
              <MetricCell label="Building Size" value={property.buildingSize} />
              <MetricCell label="Acquired" value={formatDate(property.acquiredDate)} />
              {property.soldDate && (
                <MetricCell label="Sold" value={formatDate(property.soldDate)} />
              )}
              {property.valuationDate !== 'Not applicable' && (
                <MetricCell label="Valuation Date" value={property.valuationDate} />
              )}
            </div>
          </div>

          {/* Lease Profile */}
          <div>
            <h4 className="type-overline text-sogif-cyan-dark mb-3">Lease Profile</h4>
            <div className="grid grid-cols-3 gap-2">
              <MetricCell label="WALE (Expiry)" value={`${property.waleLeaseExpiry} yr`} />
              <MetricCell label="WALE (Income)" value={`${property.waleIncome} yr`} />
              <MetricCell label="WALE (Area)" value={`${property.waleLettableArea} yr`} />
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="type-overline text-sogif-cyan-dark mb-3">Overview</h4>
            <div className="space-y-3">
              {paragraphs.map((paragraph, i) => (
                <p key={i} className="type-support text-text-body leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Map */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="type-overline text-sogif-cyan-dark">Location</h4>
              <a
                href={property.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="type-caption font-medium text-sogif-cyan-dark hover:text-sogif-navy transition-colors inline-flex items-center gap-1"
              >
                Open in Maps
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <div className="rounded-xl overflow-hidden border border-border-soft h-48 sm:h-56">
              <iframe
                src={property.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${property.address}`}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
