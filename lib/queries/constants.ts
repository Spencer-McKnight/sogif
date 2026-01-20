import { cache } from 'react'
import { performQuery, REVALIDATION_TIMES } from '../datocms'
import type { SiteConstants, ConstantsQueryResponse } from '../types/datocms'

/**
 * GraphQL query for global site constants
 * These values are configured in DatoCMS and used across the site
 */
const CONSTANTS_QUERY = `
  query ConstantQuery {
    constant {
      offlineApplicationUrl
      onlineApplicationUrl
      pdsUrl
      portalUrl
      id
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
  id: '',
}

/**
 * Fetches global site constants from DatoCMS
 * 
 * This function is cached using React's cache() for request deduplication,
 * ensuring only one request is made per render cycle regardless of how
 * many components call it.
 * 
 * @param preview - Enable draft content for preview mode
 * @returns Site constants object
 * 
 * @example
 * ```tsx
 * // In a Server Component
 * const constants = await getConstants()
 * console.log(constants.portalUrl) // https://portal.sogif.au/
 * ```
 */
export const getConstants = cache(async (preview = false): Promise<SiteConstants> => {
  try {
    const data = await performQuery<ConstantsQueryResponse>(
      CONSTANTS_QUERY,
      undefined,
      preview
    )
    
    return data.constant ?? DEFAULT_CONSTANTS
  } catch (error) {
    console.error('Failed to fetch site constants:', error)
    // Return defaults to prevent site breakage
    return DEFAULT_CONSTANTS
  }
})

/**
 * Revalidation time for constants data (ISR)
 * Used in page/layout configurations
 */
export const constantsRevalidate = REVALIDATION_TIMES.CONSTANTS

