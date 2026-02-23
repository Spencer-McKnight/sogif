import { cache } from 'react'
import Papa from 'papaparse'
import { performQuery, REVALIDATION_TIMES } from '../datocms'
import { computePerformanceMetrics } from '../calculations/performance'
import {
  buildKpiMaster,
  toPerformanceDataRows,
  createEmptyKpiMaster,
} from '../calculations/performance-normalization'
import type { SiteConstants, ConstantsQueryResponse, RawKpiCsvRow } from '../types/datocms'

/**
 * GraphQL query for global site constants
 * These values are configured in DatoCMS and used across the site
 */
const CONSTANTS_QUERY = `
  query ConstantQuery {
    constant {
      performanceDataAllTime {
        url
      }
      productDisclosureStatement {
        url
      }
      offlineApplicationUrl
      onlineApplicationUrl
      portalUrl
      contactEmail
      formSubmissionEmail
      arsn
      afsl
      responsibleEntity
      contactPhone
      address
      postalAddress
    }
  }
`

/**
 * Default fallback values for constants
 * Used when CMS data is unavailable or during development
 */
const DEFAULT_CONSTANTS: SiteConstants = {
  offlineApplicationUrl: '',
  onlineApplicationUrl: '',
  pdsUrl: '',
  portalUrl: '',
  contactEmail: '',
  formSubmissionEmail: '',
  arsn: '',
  afsl: '',
  responsibleEntity: '',
  contactPhone: '',
  address: '',
  postalAddress: '',
  performanceData: [],
  computedPerformance: computePerformanceMetrics([]),
  performanceKpiData: createEmptyKpiMaster(),
}

/**
 * Fetches and parses the performance KPI CSV file using papaparse
 * Handles embedded JSON fields with commas safely
 *
 * @param url - URL to the CSV file
 * @returns Parsed raw CSV rows
 */
async function fetchKpiCsvData(url: string): Promise<RawKpiCsvRow[]> {
  try {
    const response = await fetch(url, { next: { revalidate: REVALIDATION_TIMES.PERFORMANCE } })
    if (!response.ok) {
      console.error('Failed to fetch performance CSV:', response.status)
      return []
    }

    const csvText = await response.text()

    const result = Papa.parse<RawKpiCsvRow>(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    })

    if (result.errors.length > 0 && process.env.NODE_ENV === 'development') {
      console.warn('[KPI CSV] Parse warnings:', result.errors)
    }

    return result.data
  } catch (error) {
    console.error('Error fetching/parsing performance CSV:', error)
    return []
  }
}

/**
 * Fetches global site constants from DatoCMS
 * 
 * This function is cached using React's cache() for request deduplication,
 * ensuring only one request is made per render cycle regardless of how
 * many components call it.
 * 
 * @param preview - Enable draft content for preview mode
 * @returns Site constants object with parsed performance data
 * 
 * @example
 * ```tsx
 * // In a Server Component
 * const constants = await getConstants()
 * console.log(constants.portalUrl) // https://portal.sogif.au/
 * console.log(constants.performanceData[0].ntaPerUnit) // 0.9882
 * ```
 */
export const getConstants = cache(async (preview = false): Promise<SiteConstants> => {
  try {
    const data = await performQuery<ConstantsQueryResponse>(
      CONSTANTS_QUERY,
      undefined,
      preview
    )
    
    if (!data.constant) {
      return DEFAULT_CONSTANTS
    }
    
    const { constant } = data

    // Fetch and parse performance KPI CSV if URL exists
    const rawKpiRows = constant.performanceDataAllTime?.url
      ? await fetchKpiCsvData(constant.performanceDataAllTime.url)
      : []

    // Build the master KPI data structure with all normalized breakdowns
    const performanceKpiData = rawKpiRows.length > 0
      ? buildKpiMaster(rawKpiRows)
      : createEmptyKpiMaster()

    // Convert to legacy PerformanceDataRow format for backward compatibility
    const performanceData = toPerformanceDataRows(performanceKpiData.monthlySeries)

    // Pre-compute performance metrics server-side
    const computedPerformance = performanceData.length > 0
      ? computePerformanceMetrics(performanceData)
      : computePerformanceMetrics([])

    return {
      offlineApplicationUrl: constant.offlineApplicationUrl || '',
      onlineApplicationUrl: constant.onlineApplicationUrl || '',
      pdsUrl: constant.productDisclosureStatement?.url || '',
      portalUrl: constant.portalUrl || '',
      contactEmail: constant.contactEmail || '',
      formSubmissionEmail: constant.formSubmissionEmail || 'spencer.mcknight.g@gmail.com',
      arsn: constant.arsn || '',
      afsl: constant.afsl || '',
      responsibleEntity: constant.responsibleEntity || '',
      contactPhone: constant.contactPhone || '',
      address: constant.address || '',
      postalAddress: constant.postalAddress || '',
      performanceData,
      computedPerformance,
      performanceKpiData,
    }
  } catch (error) {
    console.error('Failed to fetch site constants:', error)
    return DEFAULT_CONSTANTS
  }
})

/**
 * Revalidation time for constants data (ISR)
 * Used in page/layout configurations
 */
export const constantsRevalidate = REVALIDATION_TIMES.CONSTANTS

