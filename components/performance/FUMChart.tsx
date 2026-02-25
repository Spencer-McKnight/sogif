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

const chartConfig = {
  fum: { label: 'Funds Under Management', color: CHART_COLORS.success },
}

function FUMTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const data = payload[0]?.payload as { month: string; value: number } | undefined
  if (!data) return null

  return (
    <ChartTooltipContent
      month={data.month}
      metrics={[{ label: 'FUM', value: formatFUM(data.value), color: CHART_COLORS.success }]}
      dark={false}
    />
  )
}

export function FUMChart() {
  const { performanceKpiData } = useConstants()
  const [timeRange, setTimeRange] = useState<TimeRange>('all')

  const data = performanceKpiData.timeSeries.fum
  const filtered = useMemo(() => filterByTimeRange(data, timeRange), [data, timeRange])
  const dateLabel = useMemo(() => getDateRangeLabel(filtered), [filtered])
  const xTicks = useMemo(() => computeXTicks(filtered), [filtered])

  const yDomain = useMemo(() => {
    if (!filtered.length) return [0, 100_000_000] as [number, number]
    const max = Math.max(...filtered.map(d => d.value))
    return [0, Math.ceil(max / 10_000_000) * 10_000_000] as [number, number]
  }, [filtered])

  if (!data.length) {
    return <div className={`${CHART_HEIGHT_CLASS.half} w-full bg-sogif-silver-light/50 rounded-lg animate-pulse`} />
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="type-title font-display font-semibold text-gray-900 mb-3">Funds Under Management / Time</h3>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="py-1.5 flex items-center gap-1.5 type-caption text-gray-500">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-sogif-success" />
            FUM
          </div>
          <TimeRangeFilter value={timeRange} onChange={setTimeRange} dateRangeLabel={dateLabel} />
        </div>
      </div>

      <ChartContainer config={chartConfig} className={`${CHART_HEIGHT_CLASS.half} w-full`}>
        <ResponsiveContainer>
          <AreaChart data={filtered} margin={CHART_MARGIN}>
            <defs>
              <linearGradient id="fumGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.success} stopOpacity={0.25} />
                <stop offset="95%" stopColor={CHART_COLORS.success} stopOpacity={0.02} />
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
              domain={yDomain}
              axisLine={false}
              tickLine={false}
              tick={{ style: AXIS_STYLE_LIGHT }}
              tickFormatter={formatFUM}
              width={62}
            />
            <ChartTooltip
              content={<FUMTooltip />}
              cursor={{ stroke: 'rgba(0,0,0,0.1)' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={CHART_COLORS.success}
              strokeWidth={2}
              fill="url(#fumGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
