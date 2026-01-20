/**
 * DatoCMS Media Library GraphQL Queries
 */

export const ALL_UPLOADS_QUERY = `
  query AllUploads($first: IntType = 100, $skip: IntType = 0) {
    allUploads(first: $first, skip: $skip, orderBy: filename_ASC) {
      filename
      url
      width
      height
      title
    }
    _allUploadsMeta { count }
  }
`

export const IMAGE_UPLOADS_QUERY = `
  query ImageUploads($first: IntType = 100, $skip: IntType = 0) {
    allUploads(filter: { type: { eq: image } }, first: $first, skip: $skip, orderBy: filename_ASC) {
      filename
      url
      width
      height
      title
    }
    _allUploadsMeta(filter: { type: { eq: image } }) { count }
  }
`

export const SEARCH_UPLOADS_QUERY = `
  query SearchUploads($query: String!, $first: IntType = 50) {
    allUploads(filter: { filename: { matches: { pattern: $query } } }, first: $first) {
      filename
      url
      width
      height
      title
    }
    _allUploadsMeta(filter: { filename: { matches: { pattern: $query } } }) { count }
  }
`
