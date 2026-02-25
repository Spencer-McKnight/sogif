'use client'

import { useState, useMemo } from 'react'
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts'
import type { TooltipProps } from 'recharts'
import { ChartContainer, ChartTooltip } from '@/components/ui'
import { useConstants } from '@/lib'
import { ChartTooltipContent } from './ChartTooltipContent'
import { TimeRangeFilter } from './TimeRangeFilter'
import {
  CHART_COLORS,
  CHART_HEIGHT_CLASS,
  AXIS_STYLE_LIGHT,
  GRID_STYLE_LIGHT,
  CHART_MARGIN,
  filterByTimeRange,
  getDateRangeLabel,
  computeXTicks,
  formatFUM,
  type TimeRange,
} from './chart-constants'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AllocationDataPoint {
  month: string
  cash: number
  efficient: number
  inefficient: number
}

const chartConfig = {
  cash: { label: 'Cash', color: CHART_COLORS.success },
  efficient: { label: 'Efficient Assets', color: CHART_COLORS.cyan },
  inefficient: { label: 'Inefficient Assets', color: CHART_COLORS.gold },
}

// ---------------------------------------------------------------------------
// Tooltip
// ---------------------------------------------------------------------------

function AllocationTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const data = payload[0]?.payload as AllocationDataPoint | undefined
  if (!data) return null

  const total = data.cash + data.efficient + data.inefficient

  const metrics = [
    { label: 'Cash', value: formatFUM(data.cash), color: CHART_COLORS.success },
    { label: 'Efficient', value: formatFUM(data.efficient), color: CHART_COLORS.cyan },
    { label: 'Inefficient', value: formatFUM(data.inefficient), color: CHART_COLORS.gold },
    { label: 'Total', value: formatFUM(total), color: CHART_COLORS.navy },
  ]

  return <ChartTooltipContent month={data.month} metrics={metrics} dark={false} />
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

export function CapitalAllocationTimeline() {
  const { performanceKpiData } = useConstants()
  const [timeRange, setTimeRange] = useState<TimeRange>('all')

  const data: AllocationDataPoint[] = performanceKpiData.timeSeries.assetAllocation
  const filtered = useMemo(() => filterByTimeRange(data, timeRange), [data, timeRange])
  const dateLabel = useMemo(() => getDateRangeLabel(filtered), [filtered])
  const xTicks = useMemo(() => computeXTicks(filtered), [filtered])

  const yMax = useMemo(() => {
    if (!filtered.length) return 100_000_000
    const max = Math.max(...filtered.map(d => d.cash + d.efficient + d.inefficient))
    return Math.ceil(max / 10_000_000) * 10_000_000
  }, [filtered])

  if (!data.length) {
    return <div className={`${CHART_HEIGHT_CLASS.half} w-full bg-sogif-silver-light/50 rounded-lg animate-pulse`} />
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="type-title font-display font-semibold text-gray-900 mb-3">Capital Allocation / Time</h3>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="py-1.5 flex items-center gap-4 type-caption text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-sogif-success" />
              Cash
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-sogif-cyan-light" />
              Efficient
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-sogif-gold" />
              Inefficient
            </span>
          </div>
          <TimeRangeFilter value={timeRange} onChange={setTimeRange} dateRangeLabel={dateLabel} />
        </div>
      </div>

      <ChartContainer config={chartConfig} className={`${CHART_HEIGHT_CLASS.half} w-full`}>
        <ResponsiveContainer>
          <AreaChart data={filtered} margin={CHART_MARGIN} stackOffset="none">
            <defs>
              <linearGradient id="caCashGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.success} stopOpacity={0.3} />
                <stop offset="95%" stopColor={CHART_COLORS.success} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="caEfficientGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.cyan} stopOpacity={0.3} />
                <stop offset="95%" stopColor={CHART_COLORS.cyan} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="caInefficientGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.gold} stopOpacity={0.3} />
                <stop offset="95%" stopColor={CHART_COLORS.gold} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} {...GRID_STYLE_LIGHT} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ style: AXIS_STYLE_LIGHT }}
              ticks={xTicks}
              tickFormatter={(v) => { const [m, y] = v.split('-'); return `${m} '${y}` }}
            />
            <YAxis
              domain={[0, yMax]}
              axisLine={false}
              tickLine={false}
              tick={{ style: AXIS_STYLE_LIGHT }}
              tickFormatter={formatFUM}
              width={62}
            />
            <ChartTooltip
              content={<AllocationTooltip />}
              cursor={{ stroke: 'rgba(0,0,0,0.1)' }}
            />
            <Area type="monotone" dataKey="inefficient" stackId="1" stroke={CHART_COLORS.gold} strokeWidth={2} fill="url(#caInefficientGrad)" />
            <Area type="monotone" dataKey="efficient" stackId="1" stroke={CHART_COLORS.cyan} strokeWidth={2} fill="url(#caEfficientGrad)" />
            <Area type="monotone" dataKey="cash" stackId="1" stroke={CHART_COLORS.success} strokeWidth={2} fill="url(#caCashGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
