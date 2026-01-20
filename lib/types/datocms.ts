/**
 * DatoCMS Type Definitions
 * 
 * This module contains TypeScript interfaces for all CMS data structures.
 * Types are organized by content model for maintainability.
 */

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
  /** DatoCMS record ID */
  id: string
}

/**
 * Response wrapper for the constants query
 */
export interface ConstantsQueryResponse {
  constant: SiteConstants
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

