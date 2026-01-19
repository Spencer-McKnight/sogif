import { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
  dark?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  
  return (
    <div className={`max-w-3xl ${alignClass} mb-12 md:mb-16`}>
      {eyebrow && (
        <span className={`
          inline-block text-sm font-semibold tracking-widest uppercase mb-4
          ${dark ? 'text-cyan-400' : 'text-cyan-500'}
        `}>
          {eyebrow}
        </span>
      )}
      <h2 className={`
        text-3xl md:text-4xl lg:text-5xl font-serif leading-tight mb-4
        ${dark ? 'text-white' : 'text-navy-900'}
      `}>
        {title}
      </h2>
      {description && (
        <p className={`
          text-lg md:text-xl leading-relaxed
          ${dark ? 'text-slate-300' : 'text-slate-600'}
        `}>
          {description}
        </p>
      )}
    </div>
  )
}

