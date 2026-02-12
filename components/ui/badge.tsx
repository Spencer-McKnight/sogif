import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-semibold',
  {
    variants: {
      variant: {
        statusSuccess: 'bg-sogif-success/90 text-white',
        statusWarning: 'bg-sogif-gold/90 text-white',
        announcementCyan:
          'bg-sogif-cyan-light/10 border border-sogif-cyan-light/30 text-sogif-cyan-light',
        announcementGold:
          'bg-sogif-gold/20 border border-sogif-gold/40 text-sogif-gold',
        trust: 'bg-sogif-navy/5 text-sogif-cyan-dark',
      },
      size: {
        sm: 'px-3 py-1 text-xs',
        md: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'trust',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { badgeVariants }
