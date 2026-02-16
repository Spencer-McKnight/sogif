import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type SectionAlign = 'center' | 'left' | 'left-to-center' | 'center-to-left'

const alignClasses: Record<SectionAlign, string> = {
  center: 'text-center max-w-3xl mx-auto',
  left: '',
  'left-to-center': 'lg:text-center lg:max-w-3xl lg:mx-auto',
  'center-to-left': 'text-center max-w-3xl mx-auto lg:text-left lg:max-w-none lg:mx-0',
}

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow: string
  title: string
  description?: string
  align?: SectionAlign
  dark?: boolean
  eyebrowClassName?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
  eyebrowClassName,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(alignClasses[align], className)}
      {...props}
    >
      <span
        className={cn(
          'section-eyebrow',
          dark ? 'text-sogif-cyan-light' : 'text-sogif-cyan-dark',
          eyebrowClassName
        )}
      >
        {eyebrow}
      </span>
      <h2 className={cn('section-title', dark ? 'text-white' : 'text-sogif-navy')}>
        {title}
      </h2>
      <p className={cn('section-description', dark ? 'text-white/90' : 'text-gray-800')}>
        {description}
      </p>
    </div>
  )
}
