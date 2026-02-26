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
import { ChartStats } from './ChartStats'

const chartConfig = {
  fum: { label: 'Assets Under Management', color: CHART_COLORS.navyLight },
}

function FUMTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const data = payload[0]?.payload as { month: string; value: number } | undefined
  if (!data) return null

  return (
    <ChartTooltipContent
      month={data.month}
      metrics={[{ label: 'AUM', value: formatFUM(data.value), color: CHART_COLORS.navyLight }]}
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

  // Stats — computed from full dataset
  const fumStats = useMemo(() => {
    if (!data.length) return null

    const current = data[data.length - 1].value
    const first = data[0].value
    const elapsedMonths = data.length - 1
    const years = elapsedMonths / 12
    const avgAnnualGrowth = years > 0 ? (current - first) / years : 0

    // CAGR: (ending / beginning)^(1/years) - 1
    const cagr = first > 0 && years > 0
      ? (Math.pow(current / first, 1 / years) - 1) * 100
      : 0

    return { current, avgAnnualGrowth, cagr }
  }, [data])

  if (!data.length) {
    return <div className={`${CHART_HEIGHT_CLASS.half} w-full bg-sogif-silver-light/50 rounded-lg animate-pulse`} />
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="type-title font-display font-semibold text-sogif-navy mb-3">Assets Under Management</h3>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="py-1.5 flex items-center gap-1.5 type-caption text-gray-800">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-sogif-navy-light" />
            AUM (AUD Millions)
          </div>
          <TimeRangeFilter value={timeRange} onChange={setTimeRange} dateRangeLabel={dateLabel} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 lg:gap-12 lg:items-center">
        <div className="col-span-12 lg:col-span-9">
          <ChartContainer config={chartConfig} className={`${CHART_HEIGHT_CLASS.half} w-full`}>
            <ResponsiveContainer>
              <AreaChart data={filtered} margin={CHART_MARGIN}>
                <defs>
                  <linearGradient id="fumGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS.navyLight} stopOpacity={0.95} />
                    <stop offset="95%" stopColor={CHART_COLORS.navyLight} stopOpacity={0.1} />
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
                  type="linear"
                  dataKey="value"
                  stroke={CHART_COLORS.navyLightAlpha}
                  strokeWidth={2}
                  fill="url(#fumGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {fumStats && (
          <ChartStats
            items={[
              { heading: 'Current AUM', value: formatFUM(fumStats.current) },
              { heading: 'Avg. Annual Growth', value: formatFUM(fumStats.avgAnnualGrowth) },
              { heading: 'Annual Growth Rate', value: `${fumStats.cagr.toFixed(1)}%` },
            ]}
          />
        )}
      </div>
    </div>
  )
}
