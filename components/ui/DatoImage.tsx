import { SRCImage } from 'react-datocms'
import type { ResponsiveImage, FileField } from '@/lib/types/datocms'

/**
 * Thin wrapper around react-datocms SRCImage.
 *
 * Adds FileField → ResponsiveImage normalisation so callers can pass either
 * shape. Rendering, srcSet, LQIP placeholder, and lazy loading are all
 * handled by the library.
 */

type DatoImageData = ResponsiveImage | FileField | null | undefined

interface DatoImageProps {
  data: DatoImageData
  className?: string
  style?: React.CSSProperties
  priority?: boolean
  sizes?: string
}

function extractResponsiveImage(data: DatoImageData): ResponsiveImage | null {
  if (!data) return null

  if ('responsiveImage' in data && data.responsiveImage) {
    return data.responsiveImage
  }

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

  return data as ResponsiveImage
}

export function DatoImage({ data, className, style, priority, sizes }: DatoImageProps) {
  const imageData = extractResponsiveImage(data)
  if (!imageData?.src) return null

  return (
    <SRCImage
      data={imageData}
      imgClassName={className}
      imgStyle={style}
      priority={priority}
      sizes={sizes}
    />
  )
}

/**
 * Placeholder for images not yet loaded from CMS.
 * Useful during development before CMS content is available.
 */
interface ImagePlaceholderProps {
  className?: string
  aspectRatio?: string
  label?: string
}

export function ImagePlaceholder({
  className = '',
  aspectRatio = '16/9',
  label = 'Image',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-slate-500 type-support ${className}`}
      style={{ aspectRatio }}
      role="img"
      aria-label={label}
    >
      <span className="opacity-60">{label}</span>
    </div>
  )
}

export default DatoImage
