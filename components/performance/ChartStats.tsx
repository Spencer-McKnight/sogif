'use client'

import type { ReactNode } from 'react'

// ---------------------------------------------------------------------------
// Item shape
// ---------------------------------------------------------------------------

export interface ChartStatItem {
  heading: string
  /** Simple single value */
  value?: string
  /** Custom content (e.g. mini donut) — takes precedence over value */
  content?: ReactNode
}

// ---------------------------------------------------------------------------
// ChartStats — sidebar stat column alongside a chart
//
// Mirrors the TotalReturnChart StatsSidebar layout exactly:
//   • col-span-12 lg:col-span-3 (place inside a grid-cols-12 parent)
//   • Mobile (xs): beneath chart, border-y framing, items stacked with dividers
//   • Tablet (sm–md): items in 3 columns, no dividers
//   • Desktop (lg): right sidebar, items stacked with border-t + py-5 dividers
//   • `dark` variant for navy-background sections
// ---------------------------------------------------------------------------

interface ChartStatsProps {
  items: ChartStatItem[]
  dark?: boolean
}

export function ChartStats({ items, dark = false }: ChartStatsProps) {
  const border = dark ? 'border-white/15' : 'border-gray-200'
  const headingColor = dark ? 'text-white/70' : 'text-gray-500'
  const valueColor = dark ? 'text-white' : 'text-sogif-navy'

  return (
    <div className={`col-span-12 lg:col-span-3 border-y ${border} py-5 lg:border-y-0 lg:py-0`}>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-x-8">
        {items.map((item, i) => {
          const isFirst = i === 0
          const isLast = i === items.length - 1

          return (
            <div
              key={item.heading}
              className={[
                // Non-first: divider above with equal top padding
                !isFirst && `border-t ${border} pt-5 sm:border-t-0 sm:pt-0 lg:border-t lg:pt-5`,
                // Non-last: bottom padding to space from next divider
                !isLast && 'pb-5 sm:pb-0 lg:pb-5',
              ].filter(Boolean).join(' ')}
            >
              <p className={`type-overline ${headingColor} mb-2`}>{item.heading}</p>
              {item.content ?? (
                <p className={`type-body font-semibold tabular-nums ${valueColor}`}>
                  {item.value}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
