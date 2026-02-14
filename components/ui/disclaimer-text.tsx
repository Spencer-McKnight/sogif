import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const disclaimerVariants = cva('type-caption', {
  variants: {
    tone: {
      hero: 'text-white/75',
      dark: 'text-gray-600',
      footer: 'text-white/75',
    },
    emphasis: {
      none: '',
      strong: 'font-medium',
    },
  },
  defaultVariants: {
    tone: 'dark',
    emphasis: 'none',
  },
})

export interface DisclaimerTextProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof disclaimerVariants> {}

export function DisclaimerText({
  className,
  tone,
  emphasis,
  ...props
}: DisclaimerTextProps) {
  return (
    <p
      className={cn(disclaimerVariants({ tone, emphasis }), className)}
      {...props}
    />
  )
}
