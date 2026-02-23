/**
 * Library Exports
 * 
 * Central export point for all library modules.
 * Provides clean imports throughout the application.
 */

// DatoCMS Client & Utilities
export {
  createDatoCMSClient,
  performQuery,
  isPreviewMode,
  REVALIDATION_TIMES,
} from './datocms'

// Query Functions
export { getConstants, constantsRevalidate } from './queries/constants'

// Types
export type {
  SiteConstants,
  ConstantsQueryResponse,
  ResponsiveImage,
  FileField,
  SeoField,
  DatoCMSRecord,
  DatoCMSUpload,
  PerformanceDataRow,
} from './types/datocms'

// Media Library
export { getAllUploads, getImageUploads, searchUploads, formatAsset, getMediaContext } from './media'
export type { MediaAsset } from './media'

// Contexts
export { ConstantsProvider, useConstants, useConstantsSafe } from './contexts/ConstantsContext'
export { PerformanceProvider, usePerformance, usePerformanceSafe } from './contexts/PerformanceContext'

// Performance Calculations
export {
  calculateChartData,
  calculateStats,
  calculateYAxisConfig,
  annotateChartData,
  computePerformanceMetrics,
} from './calculations/performance'
export type {
  ChartDataPoint,
  PerformanceStats,
  YAxisConfig,
  ComputedPerformanceData,
  ChartAnnotation,
  SpecialPoints,
} from './calculations/performance'

// GraphQL Fragments
export {
  responsiveImageFragment,
  minimalImageFragment,
  fileFieldFragment,
  fileWithResponsiveImageFragment,
  imgixPresets,
} from './fragments/image'

