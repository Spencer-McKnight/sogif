"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    labels?: string[]
  }
>(({ className, defaultValue, value, labels, ...props }, ref) => {
  const thumbCount = value?.length ?? defaultValue?.length ?? 1

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      defaultValue={defaultValue}
      value={value}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-200">
        <SliderPrimitive.Range className="absolute h-full bg-sogif-gold" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }, (_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className="relative block h-4 w-4 rounded-full border-2 border-sogif-gold bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-900/20 disabled:pointer-events-none disabled:opacity-50"
        >
          {labels?.[i] && (
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-sogif-gold text-gray-900 font-semibold text-xs tabular-nums px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap pointer-events-none">
              {labels[i]}
            </span>
          )}
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
