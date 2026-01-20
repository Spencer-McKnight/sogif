/**
 * DatoCMS Media Library Utilities
 * 
 * Functions for fetching and exploring media assets from DatoCMS.
 * Enables discovery of available images for development.
 * 
 * Note on Folders: DatoCMS folder structure is managed via the Management API.
 * For Content Delivery API, use tags to organize assets or specify folder IDs
 * directly (obtained from the DatoCMS admin UI URL when viewing a folder).
 */

import { performQuery } from './datocms'
import { 
  UPLOADS_BY_FOLDER_QUERY, 
  ALL_UPLOADS_QUERY,
  SEARCH_UPLOADS_QUERY,
  UPLOADS_BY_TAG_QUERY,
  IMAGE_UPLOADS_QUERY
} from './queries/media'
import type { 
  DatoCMSUpload, 
  UploadsQueryResponse, 
} from './types/datocms'

/**
 * Known folder IDs in DatoCMS (obtain from admin UI URL)
 * Update these with actual folder IDs from your DatoCMS project
 * 
 * To find folder IDs:
 * 1. Go to DatoCMS admin > Media
 * 2. Click on a folder
 * 3. Look at the URL: /media/folder/{FOLDER_ID}
 */
export const FOLDER_IDS = {
  // Example: PROPERTIES: '12345',
  // Example: PEOPLE: '67890',
} as const

/**
 * Formatted media asset for easier consumption
 */
export interface MediaAsset {
  id: string
  filename: string
  url: string
  thumbnailUrl: string
  optimizedUrl: string
  dimensions: { width: number; height: number } | null
  alt: string | null
  title: string | null
  tags: string[]
  smartTags: string[]
  format: string
  sizeKB: number
  colors: string[]
}

/**
 * Fetch uploads from a specific folder by ID
 */
export async function getUploadsByFolder(
  folderId: string | null, 
  options: { first?: number; skip?: number } = {}
): Promise<{ uploads: DatoCMSUpload[]; total: number }> {
  const { first = 100, skip = 0 } = options
  
  const response = await performQuery<UploadsQueryResponse>(
    UPLOADS_BY_FOLDER_QUERY,
    { folderId, first, skip }
  )
  
  return {
    uploads: response.allUploads,
    total: response._allUploadsMeta.count
  }
}

/**
 * Fetch all uploads (no folder filter)
 */
export async function getAllUploads(
  options: { first?: number; skip?: number } = {}
): Promise<{ uploads: DatoCMSUpload[]; total: number }> {
  const { first = 100, skip = 0 } = options
  
  const response = await performQuery<UploadsQueryResponse>(
    ALL_UPLOADS_QUERY,
    { first, skip }
  )
  
  return {
    uploads: response.allUploads,
    total: response._allUploadsMeta.count
  }
}

/**
 * Fetch only image uploads
 */
export async function getImageUploads(
  options: { first?: number; skip?: number } = {}
): Promise<{ uploads: DatoCMSUpload[]; total: number }> {
  const { first = 100, skip = 0 } = options
  
  const response = await performQuery<UploadsQueryResponse>(
    IMAGE_UPLOADS_QUERY,
    { first, skip }
  )
  
  return {
    uploads: response.allUploads,
    total: response._allUploadsMeta.count
  }
}

/**
 * Search uploads by filename pattern
 */
export async function searchUploads(
  query: string,
  options: { first?: number } = {}
): Promise<{ uploads: DatoCMSUpload[]; total: number }> {
  const { first = 50 } = options
  
  const response = await performQuery<UploadsQueryResponse>(
    SEARCH_UPLOADS_QUERY,
    { query, first }
  )
  
  return {
    uploads: response.allUploads,
    total: response._allUploadsMeta.count
  }
}

/**
 * Filter uploads by tag
 */
export async function getUploadsByTag(
  tag: string,
  options: { first?: number } = {}
): Promise<{ uploads: DatoCMSUpload[]; total: number }> {
  const { first = 100 } = options
  
  const response = await performQuery<UploadsQueryResponse>(
    UPLOADS_BY_TAG_QUERY,
    { tag, first }
  )
  
  return {
    uploads: response.allUploads,
    total: response._allUploadsMeta.count
  }
}

/**
 * Format raw upload data into a cleaner structure
 */
export function formatMediaAsset(upload: DatoCMSUpload): MediaAsset {
  return {
    id: upload.id,
    filename: upload.filename,
    url: upload.url,
    // Optimized thumbnail for AI agent vision analysis
    thumbnailUrl: `${upload.url}?w=200&h=200&fit=crop&auto=format`,
    // Optimized URL for AI vision models (reduces token cost)
    optimizedUrl: `${upload.url}?w=500&h=500&fit=max&auto=format`,
    dimensions: upload.width && upload.height 
      ? { width: upload.width, height: upload.height }
      : null,
    alt: upload.alt,
    title: upload.title,
    tags: upload.tags || [],
    smartTags: upload.smartTags || [],
    format: upload.format,
    sizeKB: Math.round(upload.size / 1024),
    colors: upload.colors?.map(c => c.hex) || [],
  }
}

/**
 * Get a summary of all media for development reference
 */
export async function getMediaSummary(): Promise<{
  totalCount: number
  assets: MediaAsset[]
  byFormat: Record<string, number>
  allTags: string[]
}> {
  const { uploads, total } = await getAllUploads({ first: 200 })
  
  const assets = uploads.map(formatMediaAsset)
  
  // Group by format
  const byFormat: Record<string, number> = {}
  for (const asset of assets) {
    byFormat[asset.format] = (byFormat[asset.format] || 0) + 1
  }
  
  // Collect all unique tags
  const allTags = [...new Set(assets.flatMap(a => [...a.tags, ...a.smartTags]))]
  
  return {
    totalCount: total,
    assets,
    byFormat,
    allTags
  }
}

/**
 * Get complete media library overview for AI agent consumption
 */
export async function getMediaLibraryOverview(): Promise<{
  totalUploads: number
  imageCount: number
  assets: MediaAsset[]
  byFormat: Record<string, number>
  allTags: string[]
  smartTags: string[]
}> {
  const [allResult, imageResult] = await Promise.all([
    getAllUploads({ first: 200 }),
    getImageUploads({ first: 1 })
  ])
  
  const assets = allResult.uploads.map(formatMediaAsset)
  
  // Group by format
  const byFormat: Record<string, number> = {}
  for (const asset of assets) {
    byFormat[asset.format] = (byFormat[asset.format] || 0) + 1
  }
  
  // Collect all unique tags
  const allTags = [...new Set(assets.flatMap(a => a.tags))]
  const smartTags = [...new Set(assets.flatMap(a => a.smartTags))]
  
  return {
    totalUploads: allResult.total,
    imageCount: imageResult.total,
    assets,
    byFormat,
    allTags,
    smartTags
  }
}

/**
 * Generate a markdown summary of media assets for AI agent context
 * This can be included in prompts to help the agent understand available imagery
 */
export async function generateMediaContextForAgent(): Promise<string> {
  const overview = await getMediaLibraryOverview()
  
  let markdown = `# DatoCMS Media Library\n\n`
  markdown += `**Total Assets:** ${overview.totalUploads}\n`
  markdown += `**Images:** ${overview.imageCount}\n\n`
  
  markdown += `## File Formats\n`
  for (const [format, count] of Object.entries(overview.byFormat)) {
    markdown += `- ${format}: ${count}\n`
  }
  
  if (overview.allTags.length > 0) {
    markdown += `\n## Tags\n`
    markdown += overview.allTags.join(', ') + '\n'
  }
  
  if (overview.smartTags.length > 0) {
    markdown += `\n## AI-Detected Tags\n`
    markdown += overview.smartTags.join(', ') + '\n'
  }
  
  markdown += `\n## Assets\n\n`
  
  for (const asset of overview.assets) {
    markdown += `### ${asset.filename}\n`
    markdown += `- **ID:** ${asset.id}\n`
    markdown += `- **URL:** ${asset.url}\n`
    if (asset.dimensions) {
      markdown += `- **Dimensions:** ${asset.dimensions.width}x${asset.dimensions.height}\n`
    }
    markdown += `- **Format:** ${asset.format} (${asset.sizeKB}KB)\n`
    if (asset.alt) markdown += `- **Alt:** "${asset.alt}"\n`
    if (asset.title) markdown += `- **Title:** "${asset.title}"\n`
    if (asset.tags.length) markdown += `- **Tags:** ${asset.tags.join(', ')}\n`
    if (asset.smartTags.length) markdown += `- **Smart Tags:** ${asset.smartTags.join(', ')}\n`
    if (asset.colors.length) markdown += `- **Colors:** ${asset.colors.join(', ')}\n`
    markdown += `- **Optimized URL (for AI):** ${asset.optimizedUrl}\n`
    markdown += '\n'
  }
  
  return markdown
}
