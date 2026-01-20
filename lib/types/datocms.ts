/**
 * DatoCMS Type Definitions
 */

export interface PerformanceDataRow {
  month: string
  issuePrice: number
  redemptionPrice: number | null  // null before first property acquisition (Dec 2023)
  ntaPerUnit: number
  distribution: number
}

export interface FileUrlField {
  url: string
}

export interface ConstantsQueryData {
  performanceDataAllTime: FileUrlField | null
  productDisclosureStatement: FileUrlField | null
  offlineApplicationUrl: string
  onlineApplicationUrl: string
  portalUrl: string
}

export interface SiteConstants {
  offlineApplicationUrl: string
  onlineApplicationUrl: string
  pdsUrl: string
  portalUrl: string
  performanceData: PerformanceDataRow[]
}

export interface ConstantsQueryResponse {
  constant: ConstantsQueryData
}

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

export interface SeoField {
  title: string | null
  description: string | null
  image?: FileField | null
  twitterCard?: string | null
}

export interface DatoCMSRecord {
  id: string
  _createdAt: string
  _updatedAt: string
  _publishedAt: string | null
  _status: 'draft' | 'published' | 'updated'
}

export interface DatoCMSUpload {
  filename: string
  url: string
  width: number | null
  height: number | null
  title: string | null
}

export interface UploadsQueryResponse {
  allUploads: DatoCMSUpload[]
  _allUploadsMeta: { count: number }
}
