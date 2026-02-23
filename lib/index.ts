/**
 * Library Exports
 *
 * Public API surface for the application. Internal helpers (e.g. individual
 * calculation sub-functions, raw client constructors) stay in their modules
 * and are imported directly where needed.
 */

// DatoCMS Client & Utilities
export { performQuery, isPreviewMode, REVALIDATION_TIMES } from './datocms'

// Query Functions
export { getConstants } from './queries/constants'

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

// Performance — only the orchestrator; sub-functions are internal
export { computePerformanceMetrics } from './calculations/performance'
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

