'use client'

import Image, { ImageProps } from 'next/image'
import { ResponsiveImage, FileField } from '@/lib/types/datocms'

/**
 * DatoCMS Image Component
 * 
 * A performant image component that combines DatoCMS's imgix-powered 
 * responsive images with Next.js Image optimization.
 * 
 * Features:
 * - Automatic blur placeholder from DatoCMS base64
 * - Imgix URL optimization with auto format/quality
 * - Responsive srcSet support
 * - Lazy loading by default
 * - Priority loading for above-the-fold images
 */

type DatoImageData = ResponsiveImage | FileField | null | undefined

interface DatoImageProps extends Omit<ImageProps, 'src' | 'alt' | 'width' | 'height' | 'placeholder' | 'blurDataURL'> {
  /** DatoCMS image data - ResponsiveImage or FileField */
  data: DatoImageData
  /** Override alt text (uses CMS alt if not provided) */
  alt?: string
  /** Enable fill mode (ignores width/height, requires parent positioning) */
  fill?: boolean
  /** Override width (uses CMS width if not provided) */
  width?: number
  /** Override height (uses CMS height if not provided) */
  height?: number
  /** Object fit mode when using fill */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  /** Object position when using fill */
  objectPosition?: string
  /** Disable blur placeholder */
  disableBlur?: boolean
  /** Fallback alt text if none provided */
  fallbackAlt?: string
}

/**
 * Extract responsive image data from various DatoCMS image formats
 */
function extractImageData(data: DatoImageData): ResponsiveImage | null {
  if (!data) return null
  
  // If it's a FileField with responsiveImage, extract it
  if ('responsiveImage' in data && data.responsiveImage) {
    return data.responsiveImage
  }
  
  // If it's a FileField without responsiveImage, construct minimal data
  if ('url' in data && !('srcSet' in data)) {
    return {
      src: data.url,
      srcSet: data.url,
      width: 0,
      height: 0,
      alt: data.alt || null,
      title: data.title || null,
      base64: null,
    }
  }
  
  // It's already a ResponsiveImage
  return data as ResponsiveImage
}

/**
 * Custom loader for DatoCMS/imgix URLs
 * Appends imgix parameters for optimal delivery
 */
function datoImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }): string {
  // If already has query params, append; otherwise add new
  const separator = src.includes('?') ? '&' : '?'
  const params = new URLSearchParams({
    w: width.toString(),
    q: (quality || 75).toString(),
    auto: 'format,compress',
    fit: 'max',
  })
  
  return `${src}${separator}${params.toString()}`
}

/**
 * DatoImage Component
 * 
 * @example Basic usage with ResponsiveImage data
 * ```tsx
 * <DatoImage data={page.heroImage.responsiveImage} />
 * ```
 * 
 * @example Fill mode for background images
 * ```tsx
 * <div className="relative w-full h-96">
 *   <DatoImage data={image} fill objectFit="cover" />
 * </div>
 * ```
 * 
 * @example Priority loading for above-the-fold
 * ```tsx
 * <DatoImage data={heroImage} priority />
 * ```
 */
export function DatoImage({
  data,
  alt,
  fill,
  width,
  height,
  objectFit = 'cover',
  objectPosition = 'center',
  disableBlur = false,
  fallbackAlt = '',
  className,
  style,
  priority = false,
  sizes,
  ...props
}: DatoImageProps) {
  const imageData = extractImageData(data)
  
  // Return null if no valid image data
  if (!imageData || !imageData.src) {
    return null
  }
  
  // Determine dimensions
  const imageWidth = width ?? imageData.width
  const imageHeight = height ?? imageData.height
  
  // Determine alt text with fallback chain
  const imageAlt = alt ?? imageData.alt ?? imageData.title ?? fallbackAlt
  
  // Determine blur placeholder
  const hasBlur = !disableBlur && imageData.base64
  
  // Build style object for fill mode
  const imageStyle: React.CSSProperties = fill
    ? {
        objectFit,
        objectPosition,
        ...style,
      }
    : style || {}
  
  // Determine sizes attribute
  // Default responsive sizes if not provided
  const imageSizes = sizes ?? imageData.sizes ?? (fill ? '100vw' : undefined)
  
  return (
    <Image
      src={imageData.src}
      alt={imageAlt}
      width={fill ? undefined : imageWidth}
      height={fill ? undefined : imageHeight}
      fill={fill}
      loader={datoImageLoader}
      placeholder={hasBlur ? 'blur' : 'empty'}
      blurDataURL={hasBlur ? imageData.base64! : undefined}
      className={className}
      style={imageStyle}
      priority={priority}
      sizes={imageSizes}
      {...props}
    />
  )
}

/**
 * Placeholder component for images not yet loaded from CMS
 * Useful during development before CMS content is available
 */
interface ImagePlaceholderProps {
  width?: number
  height?: number
  className?: string
  aspectRatio?: string
  label?: string
}

export function ImagePlaceholder({
  width,
  height,
  className = '',
  aspectRatio,
  label = 'Image',
}: ImagePlaceholderProps) {
  const style: React.CSSProperties = {
    aspectRatio: aspectRatio ?? (width && height ? `${width}/${height}` : '16/9'),
  }
  
  return (
    <div
      className={`bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-slate-500 text-sm ${className}`}
      style={style}
      role="img"
      aria-label={label}
    >
      <span className="opacity-60">{label}</span>
    </div>
  )
}

export default DatoImage

