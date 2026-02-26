'use client'

import { useState, useMemo } from 'react'
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer, ReferenceDot } from 'recharts'
import type { TooltipProps } from 'recharts'
import { ChartContainer, ChartTooltip } from '@/components/ui'
import { usePerformance } from '@/lib'
import type { ChartDataPoint } from '@/lib'
import { TimeRangeFilter } from './TimeRangeFilter'
import {
  CHART_COLORS,
  CHART_HEIGHT_CLASS,
  AXIS_STYLE_DARK,
  CHART_MARGIN,
  filterByTimeRange,
  getDateRangeLabel,
  computeXTicks,
  type TimeRange,
} from './chart-constants'

// ---------------------------------------------------------------------------
// Chart configuration
// ---------------------------------------------------------------------------

const chartConfig = {
  issuePrice: { label: 'Issue Price', color: CHART_COLORS.cyan },
  redemptionPrice: { label: 'Redemption Price', color: CHART_COLORS.gold },
  cumulativeReturn: { label: 'Total Return', color: CHART_COLORS.success },
}

const TOOLTIP_METRICS = [
  { key: 'cumulativeReturn' as const, label: 'Total Return', color: CHART_COLORS.success },
  { key: 'issuePrice' as const, label: 'Issue Price', color: CHART_COLORS.cyan },
  { key: 'redemptionPrice' as const, label: 'Redemption Price', color: CHART_COLORS.gold },
]

// ---------------------------------------------------------------------------
// Custom sub-components
// ---------------------------------------------------------------------------

function TotalReturnTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const data = payload[0]?.payload as ChartDataPoint | undefined
  if (!data) return null

  const [month, year] = data.month.split('-')
  const label = `${month} '${year}`

  return (
    <div className="w-[280px] rounded-lg border border-white/20 bg-sogif-navy-light px-3 py-2.5 shadow-xl">
      <p className="mb-2 type-support font-medium text-white">{label}</p>
      <div className="space-y-1.5">
        {TOOLTIP_METRICS.map(({ key, label: metricLabel, color }) => {
          const value = data[key]
          if (value === undefined || value === 0) return null
          return (
            <div key={key} className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <span className="type-caption text-white/90">{metricLabel}</span>
              </div>
              <span className="type-caption font-medium tabular-nums text-white">
                ${(value as number).toFixed(4)}
              </span>
            </div>
          )
        })}
      </div>
      {data.annotation && (
        <p
          className="mt-2 pt-2 border-t border-white/15 type-caption text-white/80"
          style={{ borderColor: `${data.annotation.color}40` }}
        >
          {data.annotation.text}
        </p>
      )}
    </div>
  )
}

function ChartIndicator({ cx, cy, color }: { cx?: number; cy?: number; color: string }) {
  if (cx === undefined || cy === undefined) return null
  return (
    <g>
      <circle cx={cx} cy={cy} r={7} fill={color} stroke="white" strokeWidth={2} />
      <circle cx={cx} cy={cy} r={2.5} fill="white" />
    </g>
  )
}

// ---------------------------------------------------------------------------
// Legend
// ---------------------------------------------------------------------------

function ChartLegend() {
  return (
    <div className="py-1.5 flex items-center gap-4 type-caption text-white/70">
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-sogif-success" />
        Total Return
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-sogif-cyan-light" />
        Issue Price
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-sogif-gold" />
        Redemption Price
      </span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Stats sidebar
// ---------------------------------------------------------------------------

function StatsSidebar() {
  const { chartData, stats } = usePerformance()
  const lastMonth = chartData[chartData.length - 1]?.month ?? ''
  const [m, y] = lastMonth.split('-')
  const priceLabel = `${m} '${y} Prices`

  return (
    <div className="col-span-12 lg:col-span-3 border-y border-white/15 py-5 lg:border-y-0 lg:py-0">
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-8">
        {/* Prices */}
        <div className="pb-5">
          <p className="type-overline text-white/70 mb-2">{priceLabel}</p>
          <div className="space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="type-caption text-white">Issue</span>
              <span className="type-body font-semibold tabular-nums text-sogif-cyan-light">${stats.latestIssue.toFixed(4)}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="type-caption text-white">Redemption</span>
              <span className="type-body font-semibold tabular-nums text-sogif-gold">
                {(stats.latestRedemption !== null && stats.latestRedemption !== 0) ? `$${stats.latestRedemption.toFixed(4)}` : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Distributions Paid */}
        <div className="pb-5 lg:border-t lg:border-white/15 lg:py-5">
          <p className="type-overline text-white/70 mb-2">Distributions Paid</p>
          <div className="space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="type-caption text-white">Since Inception</span>
              <span className="type-body font-semibold tabular-nums text-white">{(stats.distributionsInception * 100).toFixed(1)}&cent;</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="type-caption text-white">Last 12 Months</span>
              <span className="type-body font-semibold tabular-nums text-white">{(stats.distributionsPrevYear * 100).toFixed(1)}&cent;</span>
            </div>
          </div>
        </div>

        <hr className="col-span-2 lg:hidden border-white/15" />

        {/* Capital Growth */}
        <div className="pt-5 lg:border-t lg:border-white/15 lg:py-5">
          <p className="type-overline text-white/70 mb-2">Change in Issue Price</p>
          <div className="space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="type-caption text-white">Since Inception</span>
              <span className="type-body font-semibold tabular-nums text-white">{stats.capitalGrowthInception.toFixed(2)}%</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="type-caption text-white">Last 12 Months</span>
              <span className="type-body font-semibold tabular-nums text-white">{stats.capitalGrowthPrevYear.toFixed(2)}%</span>
            </div>
          </div>
        </div>

        {/* Total Return */}
        <div className="pt-5 lg:border-t lg:border-white/15 lg:pt-5">
          <p className="type-overline text-white/70 mb-2">Total Return</p>
          <div className="space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="type-caption text-white">Since Inception</span>
              <span className="type-body font-semibold tabular-nums text-sogif-success">{stats.cumulativeInception.toFixed(2)}%</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="type-caption text-white">Last 12 Months</span>
              <span className="type-body font-semibold tabular-nums text-sogif-success">{stats.cumulativePrevYear.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Y-axis config for filtered data
// ---------------------------------------------------------------------------

function computeYAxis(data: ChartDataPoint[]) {
  if (!data.length) return { domain: [0.9, 1.2] as [number, number], ticks: [0.9, 0.95, 1.0, 1.05, 1.1, 1.15, 1.2] }

  let min = Infinity
  let max = -Infinity
  for (const d of data) {
    min = Math.min(min, d.issuePrice, d.cumulativeReturn)
    max = Math.max(max, d.issuePrice, d.cumulativeReturn)
    if (d.redemptionPrice !== undefined) {
      min = Math.min(min, d.redemptionPrice)
      max = Math.max(max, d.redemptionPrice)
    }
  }

  const domainMin = Math.floor((min - 0.02) / 0.05) * 0.05
  const domainMax = Math.ceil((max + 0.02) / 0.05) * 0.05
  const ticks: number[] = []
  for (let v = domainMin; v <= domainMax + 0.001; v += 0.05) {
    ticks.push(Math.round(v * 100) / 100)
  }
  return { domain: [domainMin, domainMax] as [number, number], ticks }
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

interface TotalReturnChartProps {
  showStats?: boolean
  showTitle?: boolean
  showTimeFilter?: boolean
}

export function TotalReturnChart({ showStats = true, showTitle = true, showTimeFilter = true }: TotalReturnChartProps) {
  const { computed } = usePerformance()
  const [timeRange, setTimeRange] = useState<TimeRange>('all')

  const annotatedData = computed.annotatedChartData
  const { firstRedemption, firstDistribution, acquisitionPoint } = computed.specialPoints

  const filtered = useMemo(() => filterByTimeRange(annotatedData, timeRange), [annotatedData, timeRange])
  const dateLabel = useMemo(() => getDateRangeLabel(filtered), [filtered])
  const xTicks = useMemo(() => computeXTicks(filtered), [filtered])
  const yAxis = useMemo(() => computeYAxis(filtered), [filtered])

  if (!annotatedData.length) return null

  return (
    <div>
      {/* Header row: title above, legend + filter below */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <ChartLegend />
          {showTimeFilter && <TimeRangeFilter value={timeRange} onChange={setTimeRange} dateRangeLabel={dateLabel} dark />}
        </div>
      </div>

      <div className={`grid grid-cols-12 ${showStats ? 'gap-8 lg:gap-12 lg:items-center' : ''}`}>
        {/* Chart */}
        <div className={showStats ? 'col-span-12 lg:col-span-9' : 'col-span-12'}>
          <ChartContainer config={chartConfig} className={`${CHART_HEIGHT_CLASS.full} w-full`}>
            <ResponsiveContainer>
              <AreaChart data={filtered} margin={CHART_MARGIN}>
                <defs>
                  <linearGradient id="trRedemptionGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS.gold} stopOpacity={0.5} />
                    <stop offset="95%" stopColor={CHART_COLORS.gold} stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="trIssueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS.cyan} stopOpacity={0.5} />
                    <stop offset="95%" stopColor={CHART_COLORS.cyan} stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="trCumulativeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS.success} stopOpacity={0.5} />
                    <stop offset="95%" stopColor={CHART_COLORS.success} stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ style: AXIS_STYLE_DARK }}
                  ticks={xTicks}
                  tickFormatter={(v) => { const [m, y] = v.split('-'); return `${m.substring(0, 3)} '${y}` }}
                />
                <YAxis
                  domain={yAxis.domain}
                  ticks={yAxis.ticks}
                  axisLine={false}
                  tickLine={false}
                  tick={{ style: AXIS_STYLE_DARK }}
                  tickFormatter={(v) => `$${v.toFixed(2)}`}
                  width={58}
                />
                <ChartTooltip
                  content={<TotalReturnTooltip />}
                  cursor={{ stroke: 'rgba(255,255,255,0.2)' }}
                />
                <Area type="linear" dataKey="redemptionPrice" stroke={CHART_COLORS.gold} strokeWidth={2} fill="url(#trRedemptionGrad)" />
                <Area type="linear" dataKey="issuePrice" stroke={CHART_COLORS.cyan} strokeWidth={2} fill="url(#trIssueGrad)" />
                <Area type="linear" dataKey="cumulativeReturn" stroke={CHART_COLORS.success} strokeWidth={2} fill="url(#trCumulativeGrad)" />
                {firstRedemption && timeRange === 'all' && (
                  <ReferenceDot x={firstRedemption.month} y={firstRedemption.redemptionPrice} shape={(props) => <ChartIndicator {...props} color={CHART_COLORS.gold} />} />
                )}
                {firstDistribution && timeRange === 'all' && (
                  <ReferenceDot x={firstDistribution.month} y={firstDistribution.cumulativeReturn} shape={(props) => <ChartIndicator {...props} color={CHART_COLORS.success} />} />
                )}
                {acquisitionPoint && timeRange === 'all' && (
                  <ReferenceDot x={acquisitionPoint.month} y={acquisitionPoint.issuePrice} shape={(props) => <ChartIndicator {...props} color={CHART_COLORS.cyan} />} />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {showStats && <StatsSidebar />}
      </div>

      <div className="mt-6 space-y-1 type-caption text-white/70">
        <p>Total Return = Change in Issue Price + Cumulative Distributions Paid</p>
        <p>Cumulative return assumes investors were issued units at the start of the fund at an issue price of $1.00.</p>
        <p>Past performance is not a reliable indicator of future performance. No earnings estimates are made.</p>
      </div>
    </div>
  )
}
