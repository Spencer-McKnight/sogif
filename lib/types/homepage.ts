/**
 * Homepage CMS Type Definitions
 *
 * TypeScript interfaces mirroring the DatoCMS GraphQL response shapes
 * for the home_page singleton and property collection models.
 */

import type { ResponsiveImage } from './datocms'

/** DatoCMS Structured Text field value (DAST document) */
export interface StructuredTextField {
  value: unknown
}

/** CMS file field with responsive image data */
export interface CmsImageField {
  responsiveImage: ResponsiveImage
}

// ---------------------------------------------------------------------------
// Block types (modular content records)
// ---------------------------------------------------------------------------

export interface HeroStatBlock {
  id: string
  value: string
  label: string
}

export interface TeamMemberBlock {
  id: string
  name: string
  role: string
  credentials: string
  tagline: StructuredTextField
  image: CmsImageField
}

export interface InvestmentStepBlock {
  id: string
  title: string
  description: StructuredTextField
}

// ---------------------------------------------------------------------------
// Home Page singleton
// ---------------------------------------------------------------------------

export interface HomePageData {
  // Hero
  heroHeadlineTop: string
  heroHeadlineBottom: string
  heroSubheadline: StructuredTextField
  heroStaticStats: HeroStatBlock[]
  heroCtaLabel: string
  heroCtaHref: string
  heroBackgroundImage: CmsImageField | null
  heroDisclaimer: string | null

  // Performance
  performanceEyebrow: string
  performanceTitle: string
  performanceLinkLabel: string | null
  performanceDisclaimers: StructuredTextField | null

  // Properties
  propertiesEyebrow: string
  propertiesTitle: string
  propertiesDescription: string | null
  propertiesLinkLabel: string | null

  // Team
  teamEyebrow: string
  teamTitle: string
  teamDescription: string | null
  teamMembers: TeamMemberBlock[]
  teamLinkLabel: string | null

  // Steps
  stepsEyebrow: string
  stepsTitle: string
  steps: InvestmentStepBlock[]
  stepsCtaLabel: string
  stepsCtaHref: string

  // CTA
  ctaEyebrow: string
  ctaHeadline: string
  ctaFormTitle: string
  ctaDisclaimer: StructuredTextField | null
}

export interface HomePageQueryResponse {
  homePage: HomePageData | null
}

// ---------------------------------------------------------------------------
// Property collection
// ---------------------------------------------------------------------------

export interface CmsProperty {
  id: string
  address: string
  slug: string
  headline: string
  shortDescription: string
  longDescription: StructuredTextField | null
  propertyType: string
  acquiredDate: string
  soldDate: string | null
  purchasePrice: string
  salePrice: string | null
  landSize: string
  buildingSize: string
  independentValuation: string
  capitalisationRate: string
  valuationDate: string
  occupancyAtPurchase: string
  financing: string
  waleLeaseExpiry: string
  waleIncome: string
  waleLettableArea: string
  mapEmbed: string | null
  mapLink: string | null
  images: CmsImageField[]
}

export interface PropertiesQueryResponse {
  allProperties: CmsProperty[]
}
