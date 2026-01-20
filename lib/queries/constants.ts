import { cache } from 'react'
import { performQuery, REVALIDATION_TIMES } from '../datocms'
import type { SiteConstants, ConstantsQueryResponse, PerformanceDataRow } from '../types/datocms'

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
  performanceData: [],
}

/**
 * Parses a currency string to a number
 * Handles formats like "$1.0562" or "1.0562"
 */
function parseCurrencyValue(value: string): number {
  const cleaned = value.replace(/[$,\s]/g, '').trim()
  const num = parseFloat(cleaned)
  return isNaN(num) ? 0 : num
}

/**
 * Fetches and parses the performance CSV file
 * Expected CSV columns: Month, Issue Price, Redemption Price, NTA Per Unit, Distribution
 */
async function fetchPerformanceData(url: string): Promise<PerformanceDataRow[]> {
  try {
    const response = await fetch(url, { next: { revalidate: REVALIDATION_TIMES.PERFORMANCE } })
    if (!response.ok) {
      console.error('Failed to fetch performance CSV:', response.status)
      return []
    }
    
    const csvText = await response.text()
    const lines = csvText.trim().split('\n')
    
    if (lines.length < 2) return []
    
    // Skip header row, parse data rows
    return lines.slice(1).map(line => {
      const cols = line.split(',').map(c => c.trim())
      return {
        month: cols[0] || '',
        issuePrice: parseCurrencyValue(cols[1] || '0'),
        redemptionPrice: parseCurrencyValue(cols[2] || '0'),
        ntaPerUnit: parseCurrencyValue(cols[3] || '0'),
        distribution: parseCurrencyValue(cols[4] || '0'),
      }
    }).filter(row => row.month)
  } catch (error) {
    console.error('Error parsing performance CSV:', error)
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
    
    // Fetch and parse performance CSV if URL exists
    const performanceData = constant.performanceDataAllTime?.url
      ? await fetchPerformanceData(constant.performanceDataAllTime.url)
      : []
    
    return {
      offlineApplicationUrl: constant.offlineApplicationUrl || '',
      onlineApplicationUrl: constant.onlineApplicationUrl || '',
      pdsUrl: constant.productDisclosureStatement?.url || '',
      portalUrl: constant.portalUrl || '',
      performanceData,
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

