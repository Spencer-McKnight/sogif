import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section'
}

export function Container({ as = 'div', className, ...props }: ContainerProps) {
  const Comp = as
  return <Comp className={cn('section-container', className)} {...props} />
}
