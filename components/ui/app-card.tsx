import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const appCardVariants = cva('rounded-2xl', {
  variants: {
    variant: {
      interactive: 'card-hover-soft p-8',
      property: 'bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300',
      'property-dark': 'bg-white/5 border border-white/10 overflow-hidden backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300',
      'property-light': 'bg-white overflow-hidden shadow-sm shadow-gray-200/50 transition-all duration-300',
      stat: 'bg-white/5 border border-white/10 rounded-xl p-4 lg:p-6',
      plain: 'bg-white rounded-2xl shadow-sm shadow-gray-200/50 border border-gray-100/80 p-6',
    },
  },
  defaultVariants: {
    variant: 'plain',
  },
})

export interface AppCardProps
  extends HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof appCardVariants> { }

export function AppCard({ className, variant, ...props }: AppCardProps) {
  return <div className={cn(appCardVariants({ variant }), className)} {...props} />
}

export { appCardVariants }
