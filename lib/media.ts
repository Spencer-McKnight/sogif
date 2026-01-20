/**
 * DatoCMS Media Library Utilities
 * 
 * Functions for fetching media assets from DatoCMS.
 * Outputs optimized for AI agent context consumption.
 */

import { performQuery } from './datocms'
import { ALL_UPLOADS_QUERY, IMAGE_UPLOADS_QUERY, SEARCH_UPLOADS_QUERY } from './queries/media'
import type { DatoCMSUpload, UploadsQueryResponse } from './types/datocms'

/**
 * Simplified media asset for AI consumption
 */
export interface MediaAsset {
  name: string
  url: string
  size: string
}

/**
 * Fetch all uploads
 */
export async function getAllUploads(first = 100): Promise<DatoCMSUpload[]> {
  const response = await performQuery<UploadsQueryResponse>(ALL_UPLOADS_QUERY, { first, skip: 0 })
  return response.allUploads
}

/**
 * Fetch only images
 */
export async function getImageUploads(first = 100): Promise<DatoCMSUpload[]> {
  const response = await performQuery<UploadsQueryResponse>(IMAGE_UPLOADS_QUERY, { first, skip: 0 })
  return response.allUploads
}

/**
 * Search uploads by filename
 */
export async function searchUploads(query: string, first = 50): Promise<DatoCMSUpload[]> {
  const response = await performQuery<UploadsQueryResponse>(SEARCH_UPLOADS_QUERY, { query, first })
  return response.allUploads
}

/**
 * Format upload for AI context
 */
export function formatAsset(upload: DatoCMSUpload): MediaAsset {
  const dims = upload.width && upload.height ? `${upload.width}x${upload.height}` : ''
  return {
    name: upload.title || upload.filename,
    url: `${upload.url}?w=500&fit=max&auto=format`,
    size: dims
  }
}

/**
 * Generate concise media context for AI agents
 */
export async function getMediaContext(): Promise<string> {
  const uploads = await getImageUploads()
  
  const lines = ['# Available Images\n']
  
  for (const upload of uploads) {
    const asset = formatAsset(upload)
    lines.push(`**${asset.name}** (${asset.size})`)
    lines.push(`${asset.url}\n`)
  }
  
  return lines.join('\n')
}
