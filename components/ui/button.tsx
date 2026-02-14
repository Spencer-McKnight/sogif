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
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      glow: 'none',
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> { }

export interface ButtonLinkProps
  extends VariantProps<typeof buttonVariants>,
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'> {
  href: string
  className?: string
  external?: boolean
  children: ReactNode
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
      className={cn(buttonVariants({ variant, size, glow, fullWidth }), className)}
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
  const classes = cn(buttonVariants({ variant, size, glow, fullWidth }), className)

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
