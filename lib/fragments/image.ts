/**
 * DatoCMS Image GraphQL Fragments
 * 
 * Reusable GraphQL fragments for querying responsive images from DatoCMS.
 * Use these fragments to ensure consistent image data across all queries.
 */

/**
 * Full responsive image fragment
 * Includes all fields needed for optimal DatoImage component usage
 * 
 * @example Usage in a GraphQL query
 * ```graphql
 * query PageQuery {
 *   page {
 *     heroImage {
 *       ...responsiveImageFragment
 *     }
 *   }
 * }
 * ${responsiveImageFragment}
 * ```
 */
export const responsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
    src
    srcSet
    webpSrcSet
    sizes
    width
    height
    aspectRatio
    alt
    title
    base64
    bgColor
  }
`

/**
 * Minimal image fragment for thumbnails or low-priority images
 * Excludes base64 blur placeholder to reduce payload
 */
export const minimalImageFragment = `
  fragment minimalImageFragment on ResponsiveImage {
    src
    width
    height
    alt
    title
  }
`

/**
 * File field fragment for generic file uploads
 * Use when you need the raw URL and metadata
 */
export const fileFieldFragment = `
  fragment fileFieldFragment on FileField {
    id
    url
    filename
    mimeType
    size
    alt
    title
  }
`

/**
 * Complete file field with responsive image
 * Best for hero images and featured content
 */
export const fileWithResponsiveImageFragment = `
  fragment fileWithResponsiveImageFragment on FileField {
    id
    url
    filename
    alt
    title
    responsiveImage(imgixParams: { auto: format, q: 75 }) {
      ...responsiveImageFragment
    }
  }
  ${responsiveImageFragment}
`

/**
 * Helper to generate imgix parameters for different image sizes
 */
export const imgixPresets = {
  /** Hero images - full width, high quality */
  hero: 'imgixParams: { auto: format, q: 80, w: 1920 }',
  /** Card thumbnails - medium size */
  thumbnail: 'imgixParams: { auto: format, q: 70, w: 600 }',
  /** Avatar/profile images - small, square crop */
  avatar: 'imgixParams: { auto: format, q: 75, w: 200, h: 200, fit: crop }',
  /** Background images - compressed for performance */
  background: 'imgixParams: { auto: format, q: 60, w: 1920 }',
} as const

