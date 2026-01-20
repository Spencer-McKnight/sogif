/**
 * DatoCMS Type Definitions
 * 
 * This module contains TypeScript interfaces for all CMS data structures.
 * Types are organized by content model for maintainability.
 */

/**
 * Historical performance data row
 * Represents monthly fund performance metrics
 */
export interface PerformanceDataRow {
  /** Month identifier (e.g., "Nov-25") */
  month: string
  /** Price for new unit purchases */
  issuePrice: number
  /** Price for unit redemptions */
  redemptionPrice: number
  /** Net Tangible Asset value per unit */
  ntaPerUnit: number
  /** Distribution paid per unit */
  distribution: number
}

/**
 * DatoCMS file URL field
 */
export interface FileUrlField {
  url: string
}

/**
 * Raw constants response from DatoCMS GraphQL
 */
export interface ConstantsQueryData {
  performanceDataAllTime: FileUrlField | null
  productDisclosureStatement: FileUrlField | null
  offlineApplicationUrl: string
  onlineApplicationUrl: string
  portalUrl: string
}

/**
 * Global site constants from DatoCMS
 * Contains URLs and configuration values used across the site
 */
export interface SiteConstants {
  /** URL to the offline investment application PDF */
  offlineApplicationUrl: string
  /** URL to the online investment application portal */
  onlineApplicationUrl: string
  /** URL to the Product Disclosure Statement (PDS) document */
  pdsUrl: string
  /** URL to the investor portal */
  portalUrl: string
  /** Historical performance data parsed from CSV */
  performanceData: PerformanceDataRow[]
}

/**
 * Response wrapper for the constants query
 */
export interface ConstantsQueryResponse {
  constant: ConstantsQueryData
}

/**
 * DatoCMS responsive image data structure
 * Compatible with react-datocms Image component
 */
export interface ResponsiveImage {
  src: string
  srcSet: string
  width: number
  height: number
  alt: string | null
  title: string | null
  base64: string | null
  webpSrcSet?: string
  sizes?: string
  aspectRatio?: number
  bgColor?: string
}

/**
 * DatoCMS file field structure
 */
export interface FileField {
  id: string
  url: string
  filename: string
  mimeType: string
  size: number
  alt?: string | null
  title?: string | null
  responsiveImage?: ResponsiveImage
}

/**
 * DatoCMS SEO metadata structure
 */
export interface SeoField {
  title: string | null
  description: string | null
  image?: FileField | null
  twitterCard?: string | null
}

/**
 * Common fields present in all DatoCMS records
 */
export interface DatoCMSRecord {
  id: string
  _createdAt: string
  _updatedAt: string
  _publishedAt: string | null
  _status: 'draft' | 'published' | 'updated'
}

