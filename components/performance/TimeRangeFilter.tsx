'use client'

import { TIME_RANGES, type TimeRange } from './chart-constants'

interface TimeRangeFilterProps {
  value: TimeRange
  onChange: (range: TimeRange) => void
  dateRangeLabel: string
  /** Use light styling on dark backgrounds */
  dark?: boolean
}

export function TimeRangeFilter({ value, onChange, dateRangeLabel, dark = false }: TimeRangeFilterProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {dateRangeLabel && (
        <>
          <span className={`type-caption tabular-nums ${dark ? 'text-white/50' : 'text-gray-400'}`}>
            {dateRangeLabel}
          </span>
          <span className={`h-4 w-px ${dark ? 'bg-white/15' : 'bg-gray-200'}`} />
        </>
      )}
      <div className={`flex items-center rounded-lg overflow-hidden border ${dark ? 'border-white/15' : 'border-gray-200'}`} role="group" aria-label="Time range filter">
        {TIME_RANGES.map(({ value: rangeValue, label }) => {
          const isActive = value === rangeValue
          return (
            <button
              key={rangeValue}
              onClick={() => onChange(rangeValue)}
              className={`
                px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors focus-ring
                ${isActive
                  ? dark
                    ? 'bg-white/15 text-white'
                    : 'bg-sogif-navy text-white'
                  : dark
                    ? 'text-white/60 hover:text-white/90 hover:bg-white/5'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
              aria-pressed={isActive}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
