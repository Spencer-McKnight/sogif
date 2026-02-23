/**
 * DatoCMS Type Definitions
 */

import type { ComputedPerformanceData } from '../calculations/performance'

export interface PerformanceDataRow {
  month: string
  issuePrice: number
  redemptionPrice: number | null  // null before first property acquisition (Dec 2023)
  ntaPerUnit: number
  distribution: number
}

// ============================================================================
// KPI Performance Data Types (Extended CSV with asset breakdowns)
// ============================================================================

/**
 * Raw CSV row as parsed by papaparse (all string values)
 * Column order: Month, Distribution, issueprice, redemptionprice, nta, fum,
 * efficientAssetsAllocation, efficientAssetsType, inefficientState,
 * inefficientIndustry, inefficientIndustryLocation, assetAllocation
 */
export interface RawKpiCsvRow {
  Month: string
  Distribution: string
  issueprice: string
  redemptionprice: string
  nta: string
  fum: string
  efficientAssetsAllocation: string
  efficientAssetsType: string
  inefficientState: string
  inefficientIndustry: string
  inefficientIndustryLocation: string
  assetAllocation: string
}

/**
 * Embedded JSON breakdown field structure from CSV
 * Values in data can be string numbers or actual numbers
 */
export interface KpiBreakdownField {
  title: string
  type: 'percentage' | 'dollar'
  data: Record<string, string | number>
}

/**
 * Normalized breakdown with numeric values only
 */
export interface NormalizedBreakdown {
  title: string
  type: 'percentage' | 'dollar'
  data: Record<string, number>
  total: number
}

/**
 * Asset allocation categories for the fund
 */
export interface AssetAllocation {
  cash: number
  efficient: number
  inefficient: number
  total: number
}

/**
 * Efficient assets breakdown by fund manager
 */
export interface EfficientAssetsAllocation {
  dimensionalFunds: number
  vanguard: number
}

/**
 * Efficient assets split by geography
 */
export interface EfficientAssetsByType {
  international: number
  australian: number
}

/**
 * Inefficient assets by Australian state
 */
export interface InefficientByState {
  qld: number
  tas: number
  vic: number
  nsw: number
  wa: number
  sa: number
  nt: number
  act: number
}

/**
 * Inefficient assets by industry sector
 */
export interface InefficientByIndustry {
  retail: number
  industrial: number
  office: number
  residential: number
  other: number
}

/**
 * Inefficient assets by location type
 */
export interface InefficientByLocation {
  metro: number
  regional: number
}

/**
 * Fully normalized monthly KPI row with all breakdowns
 */
export interface MonthlyKpiRow {
  month: string
  monthLabel: string
  sortKey: string
  distribution: number
  issuePrice: number
  redemptionPrice: number | null
  nta: number
  fum: number
  assetAllocation: AssetAllocation
  efficientAssetsAllocation: EfficientAssetsAllocation
  efficientAssetsByType: EfficientAssetsByType
  inefficientByState: InefficientByState
  inefficientByIndustry: InefficientByIndustry
  inefficientByLocation: InefficientByLocation
  rawBreakdowns: {
    efficientAssetsAllocation: NormalizedBreakdown | null
    efficientAssetsType: NormalizedBreakdown | null
    inefficientState: NormalizedBreakdown | null
    inefficientIndustry: NormalizedBreakdown | null
    inefficientIndustryLocation: NormalizedBreakdown | null
    assetAllocation: NormalizedBreakdown | null
  }
}

/**
 * Latest snapshot with key metrics for display
 */
export interface LatestKpiSnapshot {
  month: string
  monthLabel: string
  issuePrice: number
  redemptionPrice: number | null
  nta: number
  fum: number
  distribution: number
  assetAllocation: AssetAllocation
  efficientAssetsAllocation: EfficientAssetsAllocation
  efficientAssetsByType: EfficientAssetsByType
  inefficientByState: InefficientByState
  inefficientByIndustry: InefficientByIndustry
  inefficientByLocation: InefficientByLocation
}

/**
 * Time series for specific metric categories
 */
export interface KpiTimeSeries {
  fum: Array<{ month: string; value: number }>
  assetAllocation: Array<{ month: string; cash: number; efficient: number; inefficient: number }>
  efficientSplit: Array<{ month: string; international: number; australian: number }>
  inefficientByState: Array<{ month: string; data: InefficientByState }>
  inefficientByIndustry: Array<{ month: string; data: InefficientByIndustry }>
  inefficientByLocation: Array<{ month: string; metro: number; regional: number }>
}

/**
 * Master KPI data structure containing all parsed and derived data
 */
export interface PerformanceKpiMaster {
  monthlySeries: MonthlyKpiRow[]
  latestSnapshot: LatestKpiSnapshot | null
  timeSeries: KpiTimeSeries
  monthCount: number
  dateRange: {
    first: string
    last: string
  } | null
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
  contactEmail: string
  formSubmissionEmail: string
  arsn: string
  afsl: string
  responsibleEntity: string
  contactPhone: string
  address: string
  postalAddress: string
}

export interface SiteConstants {
  offlineApplicationUrl: string
  onlineApplicationUrl: string
  pdsUrl: string
  portalUrl: string
  contactEmail: string
  formSubmissionEmail: string
  arsn: string
  afsl: string
  responsibleEntity: string
  contactPhone: string
  address: string
  postalAddress: string
  performanceData: PerformanceDataRow[]
  computedPerformance: ComputedPerformanceData
  performanceKpiData: PerformanceKpiMaster
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
