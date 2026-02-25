'use client'

import { useMemo } from 'react'
import { AppLink, ChartContainer, ChartTooltip, Container, SectionHeader } from '@/components/ui'
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer, ReferenceDot } from 'recharts'
import type { TooltipProps } from 'recharts'
import { StructuredText } from 'react-datocms'
import { usePerformanceSafe, computePerformanceMetrics } from '@/lib'
import type { PerformanceDataRow, ComputedPerformanceData, ChartDataPoint, HomePageData } from '@/lib'

interface PerformanceSnapshotProps {
  performanceData: PerformanceDataRow[]
  cms: HomePageData
}

const chartConfig = {
  issuePrice: {
    label: 'Issue Price',
    color: 'hsl(var(--sogif-cyan-light))',
  },
  redemptionPrice: {
    label: 'Redemption Price',
    color: 'hsl(var(--sogif-gold))',
  },
  cumulativeReturn: {
    label: 'Cumulative Return',
    color: 'hsl(var(--sogif-success))',
  },
}

const TOOLTIP_METRICS = [
  { key: 'cumulativeReturn', label: 'Cumulative', color: 'hsl(160, 84%, 39%)' },
  { key: 'issuePrice', label: 'Issue Price', color: 'hsl(189, 100%, 65%)' },
  { key: 'redemptionPrice', label: 'Redemption', color: 'hsl(41, 90%, 61%)' },
] as const

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null

  const data = payload[0]?.payload as ChartDataPoint | undefined
  if (!data) return null

  return (
    <div className="rounded-lg border border-white/20 bg-sogif-navy-light px-3 py-2.5 shadow-xl">
      <p className="mb-2 type-support font-medium text-white">{(() => { const [month, year] = data.month.split('-'); return `${month} '${year}` })()}</p>
      <div className="space-y-1.5">
        {TOOLTIP_METRICS.map(({ key, label, color }) => {
          const value = data[key]
          // Skip redemption price if undefined or 0 (before property acquisition)
          if (value === undefined || value === 0) return null

          return (
            <div key={key} className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="type-caption text-white/90">{label}</span>
              </div>
              <span className="type-caption font-medium tabular-nums text-white">
                ${value.toFixed(4)}
              </span>
            </div>
          )
        })}
      </div>
      {data.annotation && (
        <p className="mt-2 pt-2 border-t border-white/15 type-caption text-white/80 max-w-[220px]" style={{ borderColor: `${data.annotation.color}40` }}>
          {data.annotation.text}
        </p>
      )}
    </div>
  )
}

interface ChartIndicatorProps {
  cx?: number
  cy?: number
  color: string
}

function ChartIndicator({ cx, cy, color }: ChartIndicatorProps) {
  if (cx === undefined || cy === undefined) return null

  return (
    <g>
      <circle cx={cx} cy={cy} r={7} fill={color} stroke="white" strokeWidth={2} />
      <circle cx={cx} cy={cy} r={2.5} fill="white" />
    </g>
  )
}

export function PerformanceSnapshot({ performanceData, cms }: PerformanceSnapshotProps) {
  const {
    performanceEyebrow,
    performanceTitle,
    performanceLinkLabel,
    performanceDisclaimers,
  } = cms

  // Trim data to Dec 2025 for presentation
  const trimmedData = useMemo(() => {
    return performanceData.filter(d => {
      const parts = d.month.split('-')
      const yearStr = parts[parts.length - 1]
      const yr = yearStr.length === 4 ? parseInt(yearStr) : 2000 + parseInt(yearStr)
      return yr <= 2025
    })
  }, [performanceData])

  // Compute metrics from trimmed data so stats also reflect the cutoff
  const computed = useMemo((): ComputedPerformanceData => {
    return computePerformanceMetrics(trimmedData)
  }, [trimmedData])

  const chartData = computed.chartData
  const stats = computed.stats
  const { domain: yDomain, ticks: yTicks } = computed.yAxisConfig
  const annotatedData = computed.annotatedChartData

  // Custom X-axis ticks: Sep '23 first, then Dec and Jun only
  const xTicks = useMemo(() => {
    const ticks: string[] = []
    let firstAdded = false
    for (const d of annotatedData) {
      const [month] = d.month.split('-')
      const m = month.substring(0, 3).toLowerCase()
      if (!firstAdded && m === 'sep') {
        ticks.push(d.month)
        firstAdded = true
      } else if (m === 'dec' || m === 'jun') {
        ticks.push(d.month)
      }
    }
    return ticks
  }, [annotatedData])

  // Don't render if no data
  if (!performanceData.length) {
    return null
  }

  return (
    <section className="section-padding bg-sogif-navy relative overflow-hidden">
      <Container className="relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <SectionHeader
              dark
              align="left"
              eyebrow={performanceEyebrow}
              title={performanceTitle}
            />
          </div>
        </div>
        {/* Desktop: chart left, stats sidebar right | Mobile: chart then stats */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Chart — always first visually */}
          <div className="col-span-12 lg:col-span-9">
            <div className="mb-3 flex items-center gap-4 type-caption text-white/70">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-sogif-cyan-light" />
                Issue Price
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-sogif-gold" />
                Redemption
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-sogif-success" />
                Cumulative
              </span>
            </div>
            <ChartContainer config={chartConfig} className="h-[300px] md:h-[400px] lg:h-[500px] max-h-[50vh] w-full">
              <ResponsiveContainer>
                <AreaChart data={annotatedData} margin={{ top: 10, right: 40, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="redemptionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(41, 90%, 61%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(41, 90%, 61%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="issueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(189, 100%, 65%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(189, 100%, 65%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="cumulativeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ style: { fill: 'rgba(255,255,255,0.8)', fontSize: 12, fontFamily: 'inherit' } }}
                    ticks={xTicks}
                    interval={0}
                    tickFormatter={(value) => {
                      const [month, year] = value.split('-')
                      return `${month.substring(0, 3)} '${year}`
                    }}
                  />
                  <YAxis
                    domain={yDomain}
                    ticks={yTicks}
                    axisLine={false}
                    tickLine={false}
                    tick={{ style: { fill: 'rgba(255,255,255,0.8)', fontSize: 12, fontFamily: 'inherit' } }}
                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                  />
                  <ChartTooltip
                    content={<CustomTooltip />}
                    cursor={{ stroke: 'rgba(255,255,255,0.2)' }}
                  />
                  {/* Redemption Price - Gold (lowest, rendered first) */}
                  <Area
                    type="monotone"
                    dataKey="redemptionPrice"
                    stroke="hsl(41, 90%, 61%)"
                    strokeWidth={2}
                    fill="url(#redemptionGradient)"
                  />
                  {/* Issue Price - Cyan (middle) */}
                  <Area
                    type="monotone"
                    dataKey="issuePrice"
                    stroke="hsl(189, 100%, 65%)"
                    strokeWidth={2}
                    fill="url(#issueGradient)"
                  />
                  {/* Cumulative Return - Green (highest, rendered last) */}
                  <Area
                    type="monotone"
                    dataKey="cumulativeReturn"
                    stroke="hsl(160, 84%, 39%)"
                    strokeWidth={2}
                    fill="url(#cumulativeGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Stats Sidebar — right on desktop, below chart on mobile */}
          <div className="col-span-12 lg:col-span-3 border-y border-white/15 py-5 lg:border-y-0 lg:py-0">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-8">
              {/* Current Prices — mobile row 1 left, desktop item 1 */}
              <div className="pb-5 lg:pt-5 lg:py-5">
                <p className="type-overline text-white/70 mb-2">Dec '25 Prices</p>
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

              {/* Cumulative — mobile row 1 right, desktop item 2 */}
              <div className="pb-5 lg:border-t lg:border-white/15 lg:py-5">
                <p className="type-overline text-white/70 mb-2">Cumulative</p>
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

              {/* Full-width mobile divider between rows */}
              <hr className="col-span-2 lg:hidden border-white/15" />

              {/* Capital Growth — mobile row 2 right, desktop item 4 */}
              <div className="pt-5 lg:border-t lg:border-white/15 lg:py-5">
                <p className="type-overline text-white/70 mb-2">Capital Growth</p>
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

              {/* Distributions — mobile row 2 left, desktop item 3 */}
              <div className="pt-5 lg:border-t lg:border-white/15 lg:pt-5">
                <p className="type-overline text-white/70 mb-2">Distributions</p>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="type-caption text-white">Since Inception</span>
                    <span className="type-body font-semibold tabular-nums text-white">{(stats.distributionsInception * 100).toFixed(2)}c</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="type-caption text-white">Last 12 Months</span>
                    <span className="type-body font-semibold tabular-nums text-white">{(stats.distributionsPrevYear * 100).toFixed(2)}c</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-1 type-caption text-white/70">
          <p>Capital Growth = Change In Issue Price</p>
          <p>Cumulative Return = Capital Growth + Cumulative Distributions</p>
          <p>Past performance is not a reliable indicator of future performance. No earnings estimates are made.</p>
        </div>
      </Container>

    </section>
  )
}
