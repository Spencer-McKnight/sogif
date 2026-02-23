'use client'

import { useMemo, useState } from 'react'
import { AppLink, Container, SectionHeader } from '@/components/ui'
import { PropertyDetailModal, PropertyGrid } from '@/components/properties'
import type { Property } from '@/components/properties'
import type { CmsProperty, HomePageData, StructuredTextField } from '@/lib'

function dastToPlainText(field: StructuredTextField | null): string {
  if (!field?.value) return ''
  try {
    const doc = (field.value as { document: { children: Array<{ children?: Array<{ value?: string }> }> } }).document
    return doc.children
      .map(node => (node.children ?? []).map(span => span.value ?? '').join(''))
      .join('\n\n')
  } catch {
    return ''
  }
}

function cmsToProperty(p: CmsProperty, index: number): Property {
  return {
    id: index + 1,
    address: p.address,
    slug: p.slug,
    headline: p.headline,
    shortDescription: p.shortDescription,
    longDescription: dastToPlainText(p.longDescription),
    propertyType: p.propertyType,
    acquiredDate: p.acquiredDate,
    soldDate: p.soldDate,
    purchasePrice: p.purchasePrice,
    salePrice: p.salePrice,
    landSize: p.landSize,
    buildingSize: p.buildingSize,
    independentValuation: p.independentValuation,
    capitalisationRate: p.capitalisationRate,
    valuationDate: p.valuationDate,
    occupancyAtPurchase: p.occupancyAtPurchase,
    financing: p.financing,
    waleLeaseExpiry: p.waleLeaseExpiry,
    waleIncome: p.waleIncome,
    waleLettableArea: p.waleLettableArea,
    mapEmbed: p.mapEmbed,
    mapLink: p.mapLink,
    images: p.images,
  }
}

interface PropertyShowcaseProps {
  cms: HomePageData
  properties: CmsProperty[]
}

export function PropertyShowcase({ cms, properties: cmsProperties }: PropertyShowcaseProps) {
  const {
    propertiesEyebrow,
    propertiesTitle,
    propertiesDescription,
    propertiesLinkLabel,
  } = cms

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  const properties = useMemo(
    () => cmsProperties.map(cmsToProperty),
    [cmsProperties]
  )

  return (
    <section className="section-padding bg-sogif-silver relative overflow-hidden">
      <Container className="relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <SectionHeader
              align="left"
              eyebrow={propertiesEyebrow}
              title={propertiesTitle}
              description={propertiesDescription ?? undefined}
            />
          </div>
          {propertiesLinkLabel && (
            <AppLink
              href="/properties"
              showArrow
              variant="text"
              className="hidden md:inline-flex shrink-0"
            >
              {propertiesLinkLabel}
            </AppLink>
          )}
        </div>

        {/* Properties Grid */}
        <PropertyGrid
          properties={properties}
          onPropertyClick={setSelectedProperty}
        />

        {/* Mobile page link */}
        {propertiesLinkLabel && (
          <div className="mt-10 text-center md:hidden">
            <AppLink href="/properties" showArrow variant="text">
              {propertiesLinkLabel}
            </AppLink>
          </div>
        )}
      </Container>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        open={!!selectedProperty}
        onOpenChange={(open) => { if (!open) setSelectedProperty(null) }}
      />
    </section>
  )
}
