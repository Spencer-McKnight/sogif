import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

const appLinkVariants = cva(
  'inline-flex items-center gap-2 transition-all focus-ring',
  {
    variants: {
      variant: {
        text: 'font-semibold text-sogif-cyan-dark hover:text-gray-900',
        light: 'font-semibold text-white hover:text-sogif-cyan-light',
        nav: 'font-medium text-white/90 hover:text-white active:text-sogif-cyan-light',
        'nav-expanded': 'font-medium text-white hover:text-white active:text-white px-3 py-4',
        portal:
          'font-semibold bg-sogif-success/10 border border-sogif-success/30 text-sogif-success hover:bg-sogif-success/20 rounded-xl px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'text',
    },
  }
)

export interface AppLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
  VariantProps<typeof appLinkVariants> {
  href: string
  external?: boolean
  showArrow?: boolean
  arrowType?: 'right' | 'external'
  children: ReactNode
}

function ArrowIcon({ type = 'right' }: { type?: 'right' | 'external' }) {
  if (type === 'external') {
    return (
      <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    )
  }

  return (
    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

export function AppLink({
  href,
  external = false,
  showArrow = false,
  arrowType = 'right',
  className,
  variant,
  children,
  ...props
}: AppLinkProps) {
  const classes = cn('group', appLinkVariants({ variant }), className)

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
        {showArrow && <ArrowIcon type={arrowType} />}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
      {showArrow && <ArrowIcon type={arrowType} />}
    </Link>
  )
}

export { appLinkVariants }
