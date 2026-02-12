import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow: string
  title: string
  description: string
  centered?: boolean
  dark?: boolean
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  centered = true,
  dark = false,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        centered ? 'text-center max-w-3xl mx-auto' : '',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'section-eyebrow',
          dark ? 'text-sogif-cyan-light' : 'text-sogif-cyan-dark'
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
