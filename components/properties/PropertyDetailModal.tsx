'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { A11y, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  SwiperControls,
} from '@/components/ui'
import type { Property } from './types'

import 'swiper/css'

function formatShortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-AU', {
    month: 'short',
    year: 'numeric',
  })
}

function splitAddress(address: string) {
  const firstComma = address.indexOf(',')
  if (firstComma === -1) return { street: address, locality: '' }
  return {
    street: address.substring(0, firstComma),
    locality: address.substring(firstComma + 1).trim(),
  }
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
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
  const [imgIdx, setImgIdx] = useState(0)
  const propertyId = property?.id
  useEffect(() => {
    setImgIdx(0)
    swiperInstance?.slideToLoop(0, 0)
  }, [propertyId, swiperInstance])

  if (!property) return null

  const { street, locality } = splitAddress(property.address)
  const hasImage = property.images.length > 0
  const multiImage = property.images.length > 1
  const paragraphs = property.longDescription.split('\n\n').filter(Boolean)
  const showValuation = property.independentValuation !== 'Not applicable'
  const showCapRate = property.capitalisationRate !== 'Not applicable'
  const showValuationDate = property.valuationDate !== 'Not applicable'
  const isExited = !!property.soldDate

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-0 left-0 translate-x-0 translate-y-0 h-full max-h-full max-w-full rounded-none sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:h-auto sm:max-w-3xl sm:max-h-[92vh] sm:rounded-2xl overflow-y-auto p-0 gap-0 border-0 shadow-2xl [&>button]:hidden !duration-0 data-[state=open]:animate-none data-[state=closed]:animate-none sm:!duration-150 sm:data-[state=open]:animate-in sm:data-[state=closed]:animate-out sm:data-[state=open]:fade-in-0 sm:data-[state=closed]:fade-out-0 sm:data-[state=open]:zoom-in-100 sm:data-[state=closed]:zoom-out-100 sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-[48%] sm:data-[state=closed]:slide-out-to-left-1/2 sm:data-[state=closed]:slide-out-to-top-[48%]">

        {/* Sticky close button — stays pinned at top while scrolling */}
        <div className="sticky top-0 z-30 h-0 pointer-events-none">
          <div className="flex justify-end p-3 pointer-events-none">
            <DialogClose className="pointer-events-auto w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white grid place-items-center hover:bg-black/60 transition-all focus-ring-inverse">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </div>

        {/* ── Hero Image ── */}
        <div className="relative h-72 sm:h-[28rem] overflow-hidden bg-sogif-navy">
          {hasImage ? (
            <Swiper
              modules={[A11y, Keyboard]}
              slidesPerView={1}
              loop={multiImage}
              keyboard={{ enabled: true }}
              onSwiper={setSwiperInstance}
              onSlideChange={(s) => setImgIdx(s.realIndex)}
              className="h-full"
            >
              {property.images.map((src, i) => (
                <SwiperSlide key={i}>
                  <div className="relative h-full">
                    <Image
                      src={src}
                      alt={`${property.address} — image ${i + 1}`}
                      fill
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-white/[0.08]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          )}

          {/* Bottom gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

          {/* Image controls — overlaid on hero */}
          {multiImage && (
            <div className="absolute inset-x-0 bottom-3 z-20">
              <SwiperControls
                swiper={swiperInstance}
                activeIndex={imgIdx}
                slideCount={property.images.length}
              />
            </div>
          )}

        </div>

        {/* ── Address & Description ── */}
        <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-border-soft">
          <DialogHeader className="text-left">
            <DialogTitle className="type-title font-bold text-sogif-navy leading-snug">
              {street}
              {locality && <><br /><span className="type-body font-semibold text-text-body">{locality}</span></>}
            </DialogTitle>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="type-caption text-text-muted">{property.propertyType} | {property.headline}</span>
              <span className="type-caption text-text-muted"></span>
            </div>
          </DialogHeader>
          <p className="type-support text-text-body leading-relaxed mt-3">{property.shortDescription}</p>
        </div>

        {/* ── Content Body ── */}
        <div className="p-5 sm:p-6 space-y-5">

          {/* Investment Summary */}
          <section>
            <h4 className="type-overline text-sogif-cyan-dark mb-3">Investment Summary</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-border-soft rounded-xl overflow-hidden max-sm:[&>*:nth-child(odd)]:pl-0 max-sm:[&>*:nth-child(even)]:pr-0 sm:[&>*:nth-child(3n+1)]:pl-0 sm:[&>*:nth-child(3n)]:pr-0">
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
              <LargeCell label="Financing" value={property.financing} />
              <LargeCell label="Occupancy at Purchase" value={property.occupancyAtPurchase} />
              {isExited && property.salePrice ? (
                <LargeCell
                  label="Sale Price"
                  value={property.salePrice}
                  sub={property.soldDate ? `Sold ${formatShortDate(property.soldDate)}` : undefined}
                  valueClass="text-sogif-gold"
                />
              ) : (
                <LargeCell label="Status" value="Active" valueClass="text-emerald-600" />
              )}
              <LargeCell label="Lease Expiry" value={`${property.waleLeaseExpiry} years`} />
              <LargeCell label="Lease Income" value={`${property.waleIncome} years`} />
              <LargeCell label="Lease Area" value={`${property.waleLettableArea} years`} />
            </div>
          </section>

          {/* Overview */}
          <section>
            <h4 className="type-overline text-sogif-cyan-dark mb-3">Overview</h4>
            <div className="space-y-3">
              {paragraphs.map((paragraph, i) => (
                <p key={i} className="type-caption text-text-body leading-relaxed text-justify">{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Property & Location */}
          <section>
            <h4 className="type-overline text-sogif-cyan-dark mb-3">Property</h4>
            <div className="grid grid-cols-3 gap-px bg-border-soft rounded-xl overflow-hidden mb-3 [&>*:nth-child(3n+1)]:pl-0 [&>*:nth-child(3n)]:pr-0">
              <LargeCell label="Land Size" value={property.landSize} />
              <LargeCell label="Building Size" value={property.buildingSize} />
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
    </Dialog >
  )
}
