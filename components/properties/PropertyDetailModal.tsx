'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui'
import type { Property } from './types'

function formatShortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-AU', {
    month: 'short',
    year: 'numeric',
  })
}

function getStatusInfo(property: Property) {
  if (property.soldDate) return { label: 'Exited', variant: 'statusWarning' as const }
  return { label: 'Active', variant: 'statusSuccess' as const }
}

function Cell({ label, value, sub, valueClass }: { label: string; value: string; sub?: string; valueClass?: string }) {
  return (
    <div className="bg-white p-3.5">
      <span className="type-caption text-text-muted block mb-0.5">{label}</span>
      <span className={`text-sm font-semibold tabular-nums ${valueClass ?? 'text-sogif-navy'}`}>{value}</span>
      {sub && <span className="type-caption text-text-muted block mt-0.5">{sub}</span>}
    </div>
  )
}

function LargeCell({ label, value, sub, valueClass }: { label: string; value: string; sub?: string; valueClass?: string }) {
  return (
    <div className="bg-white p-3.5">
      <span className="type-caption text-text-muted block mb-0.5">{label}</span>
      <span className={`text-base sm:text-lg font-bold tabular-nums ${valueClass ?? 'text-sogif-navy'}`}>{value}</span>
      {sub && <span className="type-caption text-text-muted block mt-0.5">{sub}</span>}
    </div>
  )
}

interface PropertyDetailModalProps {
  property: Property | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PropertyDetailModal({ property, open, onOpenChange }: PropertyDetailModalProps) {
  const [imgIdx, setImgIdx] = useState(0)
  const propertyId = property?.id
  useEffect(() => { setImgIdx(0) }, [propertyId])

  if (!property) return null

  const status = getStatusInfo(property)
  const hasImage = property.images.length > 0
  const multiImage = property.images.length > 1
  const safeIdx = hasImage ? Math.min(imgIdx, property.images.length - 1) : 0
  const paragraphs = property.longDescription.split('\n\n').filter(Boolean)
  const showValuation = property.independentValuation !== 'Not applicable'
  const showCapRate = property.capitalisationRate !== 'Not applicable'
  const showValuationDate = property.valuationDate !== 'Not applicable'
  const isExited = !!property.soldDate

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-0 left-0 translate-x-0 translate-y-0 h-full max-h-full max-w-full rounded-none sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:h-auto sm:max-w-3xl sm:max-h-[92vh] sm:rounded-2xl overflow-y-auto p-0 gap-0 border-0 shadow-2xl [&>button]:hidden !duration-0 data-[state=open]:animate-none data-[state=closed]:animate-none sm:!duration-150 sm:data-[state=open]:animate-in sm:data-[state=closed]:animate-out sm:data-[state=open]:fade-in-0 sm:data-[state=closed]:fade-out-0 sm:data-[state=open]:zoom-in-100 sm:data-[state=closed]:zoom-out-100 sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-[48%] sm:data-[state=closed]:slide-out-to-left-1/2 sm:data-[state=closed]:slide-out-to-top-[48%]">

        {/* Sticky close button for mobile — stays pinned while scrolling */}
        <div className="sm:hidden sticky top-0 z-30 h-0 pointer-events-none">
          <div className="flex justify-end p-3 pointer-events-none">
            <DialogClose className="pointer-events-auto w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/80 grid place-items-center hover:bg-black/40 hover:text-white transition-all focus-ring-inverse">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </div>

        {/* ── Hero Image ── */}
        <div className="relative h-72 sm:h-[28rem] bg-sogif-navy overflow-hidden">
          {hasImage ? (
            <Image
              src={property.images[safeIdx]}
              alt={property.address}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-white/[0.08]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          )}

          {/* Image carousel controls */}
          {multiImage && (
            <>
              <button
                onClick={() => setImgIdx(i => i === 0 ? property.images.length - 1 : i - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm text-white/90 grid place-items-center hover:bg-black/50 transition-colors focus-ring-inverse"
                aria-label="Previous image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={() => setImgIdx(i => i === property.images.length - 1 ? 0 : i + 1)}
                className="absolute right-14 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm text-white/90 grid place-items-center hover:bg-black/50 transition-colors focus-ring-inverse"
                aria-label="Next image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                {property.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`h-1.5 rounded-full transition-all ${i === safeIdx ? 'bg-white w-6' : 'bg-white/40 w-1.5'}`}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-sogif-navy via-sogif-navy/30 to-transparent" />

          {/* Close button — desktop only (mobile uses sticky close above) */}
          <DialogClose className="hidden sm:grid absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white/80 place-items-center hover:bg-black/40 hover:text-white transition-all focus-ring-inverse">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            <span className="sr-only">Close</span>
          </DialogClose>

          {/* Address overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant={status.variant} size="sm">{status.label}</Badge>
              <span className="type-caption font-medium text-white/60">{property.propertyType}</span>
            </div>
            <DialogHeader className="text-left">
              <DialogTitle className="text-lg sm:text-xl font-bold text-white leading-snug">
                {property.address}
              </DialogTitle>
              <DialogDescription className="text-white/65 type-caption mt-0.5">
                {property.headline}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* ── Short Description ── */}
        <div className="px-5 sm:px-6 py-4 border-b border-border-soft">
          <p className="type-support text-text-body leading-relaxed">{property.shortDescription}</p>
        </div>

        {/* ── Content Body ── */}
        <div className="p-5 sm:p-6 space-y-5">

          {/* Investment Summary */}
          <section>
            <h4 className="type-overline text-sogif-cyan-dark mb-3">Investment Summary</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-border-soft rounded-xl overflow-hidden">
              <LargeCell label="Purchase Price" value={property.purchasePrice} sub={`Acquired ${formatShortDate(property.acquiredDate)}`} />
              {showValuation && (
                <LargeCell
                  label="Independent Valuation"
                  value={property.independentValuation}
                  sub={showValuationDate ? `Valued ${property.valuationDate}` : undefined}
                />
              )}
              {showCapRate && (
                <LargeCell label="Cap Rate" value={property.capitalisationRate} />
              )}
              <Cell label="Financing" value={property.financing} />
              <Cell label="Occupancy at Purchase" value={property.occupancyAtPurchase} />
              {isExited && property.salePrice ? (
                <LargeCell
                  label="Sale Price"
                  value={property.salePrice}
                  sub={property.soldDate ? `Sold ${formatShortDate(property.soldDate)}` : undefined}
                  valueClass="text-sogif-gold"
                />
              ) : (
                <div className="bg-white p-3.5">
                  <span className="type-caption text-text-muted block mb-0.5">Status</span>
                  <span className="text-sm font-semibold text-emerald-600">Currently Owned</span>
                </div>
              )}
            </div>
          </section>

          {/* Lease Profile */}
          <section>
            <h4 className="type-overline text-sogif-cyan-dark mb-3">Lease Profile</h4>
            <div className="grid grid-cols-3 gap-px bg-border-soft rounded-xl overflow-hidden">
              <Cell label="WALE (Expiry)" value={property.waleLeaseExpiry} />
              <Cell label="WALE (Income)" value={property.waleIncome} />
              <Cell label="WALE (Area)" value={property.waleLettableArea} />
            </div>
          </section>

          {/* Overview */}
          <section>
            <h4 className="type-overline text-sogif-cyan-dark mb-3">Overview</h4>
            <div className="space-y-3">
              {paragraphs.map((paragraph, i) => (
                <p key={i} className="type-caption text-text-body leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Property & Location */}
          <section>
            <h4 className="type-overline text-sogif-cyan-dark mb-3">Property</h4>
            <div className="grid grid-cols-3 gap-px bg-border-soft rounded-xl overflow-hidden mb-3">
              <Cell label="Land Size" value={property.landSize} />
              <Cell label="Building Size" value={property.buildingSize} />
              <div className="bg-white p-3.5 flex items-center">
                <a
                  href={property.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-caption font-medium text-sogif-cyan-dark hover:text-sogif-navy transition-colors inline-flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  View on Maps
                </a>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-border-soft h-40 sm:h-48">
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
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
