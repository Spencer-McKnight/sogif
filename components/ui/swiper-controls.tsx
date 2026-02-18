'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Swiper as SwiperType } from 'swiper'
import { cn } from '@/lib/utils'

interface SwiperControlsProps {
  swiper: SwiperType | null
  activeIndex: number
  slideCount: number
  /** CSS color value for the active dot, e.g. a hsl() string or tailwind var */
  accentColor?: string
  /** Style variant */
  variant?: 'dark' | 'light'
  className?: string
}

export function SwiperControls({
  swiper,
  activeIndex,
  slideCount,
  accentColor,
  variant = 'dark',
  className,
}: SwiperControlsProps) {
  if (!swiper || slideCount <= 1) return null

  const isDark = variant === 'dark'
  const dotInactive = isDark ? 'bg-white/60 hover:bg-white/90' : 'bg-black/20 hover:bg-black/40'
  const arrowIdle = isDark ? 'text-white/60 hover:text-white' : 'text-black/30 hover:text-black/70'
  const focusRing = isDark ? 'focus-ring-inverse' : 'focus-ring'
  const activeDotStyle = accentColor
    ? ({ backgroundColor: accentColor } as React.CSSProperties)
    : undefined
  const activeDotClass = accentColor ? '' : (isDark ? 'bg-white' : 'bg-sogif-navy')

  return (
    <div className={cn('mx-auto flex max-w-56 items-center justify-between', className)}>
      <button
        onClick={() => swiper.slidePrev()}
        aria-label="Previous slide"
        className={cn(
          'group flex size-12 shrink-0 items-center justify-center transition-colors',
          arrowIdle,
          focusRing,
        )}
      >
        <ChevronLeft className="size-6 transition-transform group-hover:-translate-x-0.5" />
      </button>

      <div
        className="flex items-center justify-center gap-2.5"
        role="tablist"
        aria-label="Slide navigation"
        style={{ width: 32 + (slideCount - 1) * 18 }}
      >
        {Array.from({ length: slideCount }).map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={activeIndex === i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => swiper.slideToLoop(i)}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              focusRing,
              activeIndex === i
                ? cn('w-8', activeDotClass)
                : cn('w-2', dotInactive),
            )}
            style={activeIndex === i ? activeDotStyle : undefined}
          />
        ))}
      </div>

      <button
        onClick={() => swiper.slideNext()}
        aria-label="Next slide"
        className={cn(
          'group flex size-12 shrink-0 items-center justify-center transition-colors',
          arrowIdle,
          focusRing,
        )}
      >
        <ChevronRight className="size-6 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  )
}
