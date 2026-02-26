'use client'

import { formatMonthLabel } from './chart-constants'

export interface TooltipMetric {
  label: string
  value: string
  color: string
}

interface ChartTooltipContentProps {
  month: string
  metrics: TooltipMetric[]
  dark?: boolean
}

export function ChartTooltipContent({ month, metrics, dark = true }: ChartTooltipContentProps) {
  return (
    <div
      className={`
        min-w-[200px] max-w-[280px] rounded-lg border px-3 py-2.5 shadow-xl
        ${dark
          ? 'border-white/20 bg-sogif-navy-light'
          : 'border-gray-200 bg-white'
        }
      `}
    >
      <p className={`mb-2 type-support font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>
        {formatMonthLabel(month)}
      </p>
      <div className="space-y-1.5">
        {metrics.map(({ label, value, color }) => (
          <div key={label} className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className={`type-caption ${dark ? 'text-white/90' : 'text-gray-800'}`}>
                {label}
              </span>
            </div>
            <span className={`type-caption font-medium tabular-nums ${dark ? 'text-white' : 'text-gray-900'}`}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
