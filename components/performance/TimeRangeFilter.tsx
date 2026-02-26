'use client'

import { TIME_RANGES, type TimeRange } from './chart-constants'

interface TimeRangeFilterProps {
  value: TimeRange
  onChange: (range: TimeRange) => void
  dateRangeLabel: string
  /** Use light styling on dark backgrounds */
  dark?: boolean
  /** Time range values to exclude from the filter */
  exclude?: TimeRange[]
}

export function TimeRangeFilter({ value, onChange, dateRangeLabel, dark = false, exclude }: TimeRangeFilterProps) {
  const ranges = exclude ? TIME_RANGES.filter(r => !exclude.includes(r.value)) : TIME_RANGES

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {dateRangeLabel && (
        <>
          <span className={`type-caption tabular-nums ${dark ? 'text-white/80' : 'text-gray-800'}`}>
            {dateRangeLabel}
          </span>
          <span className={`h-4 w-px ${dark ? 'bg-white/15' : 'bg-gray-200'}`} />
        </>
      )}
      <div className={`flex items-center rounded-lg overflow-hidden border ${dark ? 'border-white/15' : 'border-gray-200 bg-white/15'}`} role="group" aria-label="Time range filter">
        {ranges.map(({ value: rangeValue, label }) => {
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
                    : 'bg-white/60 text-gray-900'
                  : dark
                    ? 'text-white/80 hover:text-white hover:bg-white/5'
                    : 'text-gray-800 hover:text-gray-900 hover:bg-white/30'
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
