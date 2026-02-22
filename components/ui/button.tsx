import { cva, type VariantProps } from 'class-variance-authority'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold cursor-pointer focus-ring disabled:pointer-events-none disabled:opacity-50 btn-interactive',
  {
    variants: {
      variant: {
        primary:
          'bg-sogif-gold text-gray-900 hover:brightness-110 hover:cta-glow-gold-hover active:bg-sogif-gold/90',
        success:
          'bg-sogif-success text-white hover:brightness-110 hover:cta-glow-success-hover active:bg-sogif-success/90',
        navy: 'bg-sogif-navy text-white hover:brightness-125 hover:bg-sogif-navy-light',
        outline:
          'border-2 border-white/30 bg-transparent text-white hover:border-white/60 hover:bg-white/5',
        cyan: 'bg-sogif-cyan-light text-gray-900 hover:brightness-110 hover:cta-glow-cyan active:bg-sogif-cyan-light/90',
        ghost: 'bg-transparent text-sogif-cyan-dark hover:text-gray-900',
      },
      size: {
        sm: 'min-h-10 px-4 py-2 type-support rounded-md',
        md: 'min-h-11 px-6 py-3 type-support rounded-md',
        lg: 'min-h-12 px-8 py-4 type-body rounded-md',
      },
      glow: {
        none: '',
        gold: 'cta-glow-gold-passive',
        success: 'cta-glow-success-passive',
        cyan: 'cta-glow-cyan',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      glow: 'none',
    },
  }
)

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const fullWidthBreakpoints: Record<Breakpoint, string> = {
  sm: 'w-full sm:w-fit',
  md: 'w-full md:w-fit',
  lg: 'w-full lg:w-fit',
  xl: 'w-full xl:w-fit',
  '2xl': 'w-full 2xl:w-fit',
}

function resolveFullWidth(fullWidth: boolean | Breakpoint | null | undefined): string {
  if (fullWidth === true) return 'w-full'
  if (typeof fullWidth === 'string') return fullWidthBreakpoints[fullWidth]
  return ''
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  fullWidth?: boolean | Breakpoint
}

export interface ButtonLinkProps
  extends VariantProps<typeof buttonVariants>,
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'> {
  href: string
  className?: string
  external?: boolean
  children: ReactNode
  fullWidth?: boolean | Breakpoint
}

export function Button({
  className,
  variant,
  size,
  glow,
  fullWidth,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, glow }), resolveFullWidth(fullWidth), className)}
      {...props}
    />
  )
}

export function ButtonLink({
  href,
  className,
  external = false,
  variant,
  size,
  glow,
  fullWidth,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = cn(buttonVariants({ variant, size, glow }), resolveFullWidth(fullWidth), className)

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  )
}

export { buttonVariants }
