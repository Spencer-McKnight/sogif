/**
 * DatoCMS Media Library GraphQL Queries
 * 
 * Queries for fetching uploads/assets from the DatoCMS media library.
 * Note: Folder IDs must be obtained from the DatoCMS admin interface URL
 * or via the Management API (not available in Content Delivery API).
 */

/**
 * Query to fetch uploads with optional folder filtering
 */
export const UPLOADS_BY_FOLDER_QUERY = `
  query UploadsByFolder($folderId: ItemId, $first: IntType = 100, $skip: IntType = 0) {
    allUploads(
      filter: { folder: { eq: $folderId } }
      first: $first
      skip: $skip
      orderBy: filename_ASC
    ) {
      id
      filename
      basename
      url
      mimeType
      format
      size
      width
      height
      alt
      title
      customData
      tags
      smartTags
      colors {
        hex
      }
      blurhash
    }
    _allUploadsMeta(filter: { folder: { eq: $folderId } }) {
      count
    }
  }
`

/**
 * Query to fetch ALL uploads (no folder filter)
 */
export const ALL_UPLOADS_QUERY = `
  query AllUploads($first: IntType = 100, $skip: IntType = 0) {
    allUploads(
      first: $first
      skip: $skip
      orderBy: filename_ASC
    ) {
      id
      filename
      basename
      url
      mimeType
      format
      size
      width
      height
      alt
      title
      customData
      tags
      smartTags
      colors {
        hex
      }
      blurhash
    }
    _allUploadsMeta {
      count
    }
  }
`

/**
 * Query to search uploads by filename pattern
 */
export const SEARCH_UPLOADS_QUERY = `
  query SearchUploads($query: String!, $first: IntType = 50) {
    allUploads(
      filter: { filename: { matches: { pattern: $query } } }
      first: $first
      orderBy: filename_ASC
    ) {
      id
      filename
      basename
      url
      mimeType
      format
      size
      width
      height
      alt
      title
      tags
      smartTags
    }
    _allUploadsMeta(filter: { filename: { matches: { pattern: $query } } }) {
      count
    }
  }
`

/**
 * Query to filter uploads by tags
 */
export const UPLOADS_BY_TAG_QUERY = `
  query UploadsByTag($tag: String!, $first: IntType = 100) {
    allUploads(
      filter: { tags: { contains: $tag } }
      first: $first
      orderBy: filename_ASC
    ) {
      id
      filename
      basename
      url
      mimeType
      format
      size
      width
      height
      alt
      title
      tags
      smartTags
      colors {
        hex
      }
    }
    _allUploadsMeta(filter: { tags: { contains: $tag } }) {
      count
    }
  }
`

/**
 * Query to get only image uploads
 */
export const IMAGE_UPLOADS_QUERY = `
  query ImageUploads($first: IntType = 100, $skip: IntType = 0) {
    allUploads(
      filter: { type: { eq: image } }
      first: $first
      skip: $skip
      orderBy: filename_ASC
    ) {
      id
      filename
      basename
      url
      mimeType
      format
      size
      width
      height
      alt
      title
      tags
      smartTags
      colors {
        hex
      }
      blurhash
    }
    _allUploadsMeta(filter: { type: { eq: image } }) {
      count
    }
  }
`
