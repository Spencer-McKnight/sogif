'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import type { MonthlyKpiRow } from '@/lib'
import type { PeriodRange } from './chart-utils'
import { formatMonthTick } from './chart-utils'

interface PeriodRangeSelectorProps {
  monthlySeries: MonthlyKpiRow[]
  selectedRange: PeriodRange
  onRangeChange: (range: PeriodRange) => void
  className?: string
}

const selectClasses = cn(
  'h-8 rounded-md border border-border-soft bg-white px-2.5 pr-7',
  'type-caption font-medium text-sogif-navy',
  'appearance-none bg-[length:16px] bg-[right_4px_center] bg-no-repeat',
  'bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2716%27%20height%3D%2716%27%20viewBox%3D%270%200%2024%2024%27%20fill%3D%27none%27%20stroke%3D%27%236b7280%27%20stroke-width%3D%272%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%3E%3Cpath%20d%3D%27m6%209%206%206%206-6%27%2F%3E%3C%2Fsvg%3E")]',
  'focus-ring cursor-pointer transition-colors hover:border-sogif-navy/30',
)

export function PeriodRangeSelector({
  monthlySeries,
  selectedRange,
  onRangeChange,
  className,
}: PeriodRangeSelectorProps) {
  const months = useMemo(() => {
    const sorted = [...monthlySeries].sort((a, b) => a.sortKey.localeCompare(b.sortKey))
    return sorted.map(r => ({ sortKey: r.sortKey, label: formatMonthTick(r.month) }))
  }, [monthlySeries])

  const toOptions = useMemo(() => {
    if (!selectedRange?.start) return months
    return months.filter(m => m.sortKey >= selectedRange.start)
  }, [months, selectedRange?.start])

  if (months.length <= 1) return null

  function handleFromChange(value: string) {
    if (!value) {
      onRangeChange(null)
      return
    }
    const end = selectedRange?.end && selectedRange.end >= value
      ? selectedRange.end
      : months[months.length - 1].sortKey
    onRangeChange({ start: value, end })
  }

  function handleToChange(value: string) {
    if (!value || !selectedRange?.start) return
    onRangeChange({ start: selectedRange.start, end: value })
  }

  function handleReset() {
    onRangeChange(null)
  }

  const isFiltered = selectedRange !== null

  return (
    <div className={cn('flex items-center gap-2', className)} role="group" aria-label="Period range">
      <span className="type-caption text-text-muted hidden sm:inline">Period</span>
      <select
        value={selectedRange?.start ?? ''}
        onChange={(e) => handleFromChange(e.target.value)}
        className={selectClasses}
        aria-label="From month"
      >
        <option value="">From inception</option>
        {months.map(m => (
          <option key={m.sortKey} value={m.sortKey}>{m.label}</option>
        ))}
      </select>
      <span className="type-caption text-text-muted">&ndash;</span>
      <select
        value={selectedRange?.end ?? ''}
        onChange={(e) => handleToChange(e.target.value)}
        className={selectClasses}
        aria-label="To month"
        disabled={!selectedRange?.start}
      >
        <option value="">{months[months.length - 1]?.label ?? 'Latest'}</option>
        {toOptions.map(m => (
          <option key={m.sortKey} value={m.sortKey}>{m.label}</option>
        ))}
      </select>
      {isFiltered && (
        <button
          onClick={handleReset}
          className="type-caption font-medium text-text-muted hover:text-sogif-navy transition-colors px-1.5 focus-ring rounded"
          aria-label="Reset to all time"
        >
          Reset
        </button>
      )}
    </div>
  )
}
