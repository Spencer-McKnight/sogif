import { GraphQLClient } from 'graphql-request'
import { cache } from 'react'

/**
 * DatoCMS GraphQL Client Configuration
 * 
 * This module provides the core GraphQL client for fetching data from DatoCMS.
 * Uses React's cache() for request deduplication during server-side rendering.
 */

const DATOCMS_API_ENDPOINT = 'https://graphql.datocms.com'

/**
 * Environment configuration with runtime validation
 */
function getApiToken(): string {
  const token = process.env.DATOCMS_API_TOKEN
  if (!token) {
    throw new Error(
      'Missing DATOCMS_API_TOKEN environment variable. ' +
      'Please add it to your .env.local file.'
    )
  }
  return token
}

/**
 * Check if we're in preview/draft mode
 */
export function isPreviewMode(): boolean {
  return process.env.DATOCMS_PREVIEW_MODE === 'true'
}

/**
 * Creates a configured GraphQL client for DatoCMS
 * 
 * @param preview - Enable draft content fetching for preview mode
 * @returns Configured GraphQLClient instance
 */
export function createDatoCMSClient(preview = false): GraphQLClient {
  const client = new GraphQLClient(DATOCMS_API_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${getApiToken()}`,
      // Include draft content when in preview mode
      ...(preview && { 'X-Include-Drafts': 'true' }),
    },
  })

  return client
}

/**
 * Generic typed query function for DatoCMS
 * Uses React cache() for request deduplication across components
 * 
 * @param query - GraphQL query string
 * @param variables - Optional query variables
 * @param preview - Enable draft content
 * @returns Typed query result
 */
export const performQuery = cache(
  async <T>(
    query: string,
    variables?: Record<string, unknown>,
    preview = false
  ): Promise<T> => {
    const client = createDatoCMSClient(preview)
    
    try {
      const data = await client.request<T>(query, variables)
      return data
    } catch (error) {
      console.error('DatoCMS Query Error:', error)
      throw error
    }
  }
)

/**
 * Revalidation configurations for different content types
 * Used with Next.js ISR (Incremental Static Regeneration)
 */
export const REVALIDATION_TIMES = {
  /** Global constants - rarely change, long cache */
  CONSTANTS: 3600, // 1 hour
  /** Performance data - news periodically */
  PERFORMANCE: 300, // 5 minutes
  /** News/blog content - moderate news */
  NEWS: 600, // 10 minutes
  /** Property listings - may update frequently */
  PROPERTIES: 300, // 5 minutes
  /** Static pages - rarely change */
  PAGES: 3600, // 1 hour
} as const

