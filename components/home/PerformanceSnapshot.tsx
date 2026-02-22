'use client'

import { useMemo, useState } from 'react'
import { AppCard, AppLink, ChartContainer, ChartTooltip, Container, DisclaimerText, SectionHeader } from '@/components/ui'
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer, ReferenceDot } from 'recharts'
import type { TooltipProps } from 'recharts'
import type { PerformanceDataRow } from '@/lib/types/datocms'

interface PerformanceSnapshotProps {
  performanceData: PerformanceDataRow[]
}

interface ChartAnnotation {
  text: string
  color: string
}

interface ChartDataPoint {
  month: string
  issuePrice: number
  redemptionPrice: number | undefined  // undefined before first property acquisition (Recharts skips undefined)
  cumulativeReturn: number
  distribution: number
  cumulativeDistribution: number
  annotation?: ChartAnnotation
}

interface PerformanceStats {
  latestRedemption: number | null
  latestIssue: number
  // Capital Growth (price-only, no distributions)
  capitalGrowthInception: number
  capitalGrowthPrevYear: number
  // Distributions (income yield)
  distributionsInception: number
  distributionsPrevYear: number
  // Cumulative (total return = growth + distributions)
  cumulativeInception: number
  cumulativePrevYear: number
}

/**
 * Transforms raw DatoCMS data to include cumulative return calculation
 * Cumulative Return = Issue Price + All distributions to date
 */
function calculateChartData(data: PerformanceDataRow[]): ChartDataPoint[] {
  if (!data.length) return []

  // Data comes newest first, reverse to chronological order (oldest first)
  const chronological = [...data].reverse()

  let cumulativeDistribution = 0

  return chronological.map((item) => {
    cumulativeDistribution += item.distribution
    // Convert 0 or null to undefined - CMS stores 0 for missing prices, Recharts needs undefined to skip
    const redemptionValue = (item.redemptionPrice === 0 || item.redemptionPrice === null) ? undefined : item.redemptionPrice

    return {
      month: item.month,
      issuePrice: item.issuePrice,
      // Convert null to undefined - Recharts skips undefined values entirely
      redemptionPrice: redemptionValue,
      cumulativeReturn: Number((item.issuePrice + cumulativeDistribution).toFixed(4)),
      distribution: item.distribution,
      cumulativeDistribution: Number(cumulativeDistribution.toFixed(4)),
    }
  })
}

/**
 * Calculate summary statistics from the performance data
 *
 * Capital Growth = price-only return (no distributions)
 * Distributions  = raw dollar totals
 * Cumulative     = total return (growth + distributions)
 */
function calculateStats(data: PerformanceDataRow[]): PerformanceStats {
  if (!data.length) {
    return {
      latestRedemption: null,
      latestIssue: 0,
      capitalGrowthInception: 0,
      capitalGrowthPrevYear: 0,
      distributionsInception: 0,
      distributionsPrevYear: 0,
      cumulativeInception: 0,
      cumulativePrevYear: 0,
    }
  }

  const latest = data[0] // Most recent (data is newest first)
  const chronological = [...data].reverse()
  const inception = chronological[0]

  // Total distributions (all time)
  const totalDistributions = data.reduce((sum, item) => sum + item.distribution, 0)

  // Since Inception
  const capitalGrowthInception = ((latest.issuePrice - inception.issuePrice) / inception.issuePrice) * 100
  const distributionsInception = totalDistributions
  const cumulativeInception = ((latest.issuePrice + totalDistributions - inception.issuePrice) / inception.issuePrice) * 100

  // Trailing 12-month (data is newest first)
  const trailing12 = data.slice(0, Math.min(12, data.length))
  const startPoint = trailing12[trailing12.length - 1]
  const trailing12Distributions = trailing12.reduce((sum, item) => sum + item.distribution, 0)

  const capitalGrowthPrevYear = ((latest.issuePrice - startPoint.issuePrice) / startPoint.issuePrice) * 100
  const distributionsPrevYear = trailing12Distributions
  const cumulativePrevYear = ((latest.issuePrice + trailing12Distributions - startPoint.issuePrice) / startPoint.issuePrice) * 100

  return {
    latestRedemption: latest.redemptionPrice,
    latestIssue: latest.issuePrice,
    capitalGrowthInception,
    capitalGrowthPrevYear,
    distributionsInception,
    distributionsPrevYear,
    cumulativeInception,
    cumulativePrevYear,
  }
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

export function PerformanceSnapshot({ performanceData }: PerformanceSnapshotProps) {
  const chartData = useMemo(() => calculateChartData(performanceData), [performanceData])
  const stats = useMemo(() => calculateStats(performanceData), [performanceData])

  // Y-axis domain and ticks at every $0.05
  const { yDomain, yTicks } = useMemo(() => {
    if (!chartData.length) return { yDomain: [0.9, 1.2] as [number, number], yTicks: [0.9, 0.95, 1.0, 1.05, 1.1, 1.15, 1.2] }

    let min = Infinity
    let max = -Infinity

    for (const d of chartData) {
      min = Math.min(min, d.issuePrice, d.cumulativeReturn)
      max = Math.max(max, d.issuePrice, d.cumulativeReturn)
      if (d.redemptionPrice !== undefined) {
        min = Math.min(min, d.redemptionPrice)
        max = Math.max(max, d.redemptionPrice)
      }
    }

    // Snap to 0.05 boundaries with padding
    const domainMin = Math.floor((min - 0.02) / 0.05) * 0.05
    const domainMax = Math.ceil((max + 0.02) / 0.05) * 0.05

    // Generate ticks at every 0.05 step
    const ticks: number[] = []
    for (let v = domainMin; v <= domainMax + 0.001; v += 0.05) {
      ticks.push(Math.round(v * 100) / 100)
    }

    return { yDomain: [domainMin, domainMax] as [number, number], yTicks: ticks }
  }, [chartData])

  // Annotate special data points with descriptions shown in the chart tooltip
  const annotatedData = useMemo(() => {
    const firstRedemptionMonth = chartData.find(d => d.redemptionPrice !== undefined)?.month

    return chartData.map(d => {
      if (d.month === firstRedemptionMonth) {
        return { ...d, annotation: { text: 'No property was acquired until the minimum subscription was achieved. Accordingly, there was no redemption price prior to December 2023.', color: 'hsl(41, 90%, 61%)' } }
      }
      if (d.month === 'May-24') {
        return { ...d, annotation: { text: 'First quarterly distribution began here', color: 'hsl(160, 84%, 39%)' } }
      }
      if (d.month === 'Dec-24') {
        return { ...d, annotation: { text: 'Aggressive property acquisition began', color: 'hsl(189, 100%, 65%)' } }
      }
      return d
    })
  }, [chartData])

  // Special points for indicator dots
  const firstRedemptionPoint = annotatedData.find(d => d.redemptionPrice !== undefined)
  const firstDistributionPoint = annotatedData.find(d => d.month === 'May-24')
  const acquisitionPoint = annotatedData.find(d => d.month === 'Dec-24')

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
              eyebrow="Performance"
              title="Price & Distributions"
            />
          </div>
          <AppLink
            href="/performance"
            showArrow
            variant="light"
            className="hidden md:inline-flex shrink-0 text-sogif-cyan-light hover:text-white"
          >
            More Charts
          </AppLink>
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
                <AreaChart data={annotatedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                    interval={Math.max(0, Math.ceil(chartData.length / 6) - 1)}
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
                  {/* Indicator dot at start of redemption price line */}
                  {firstRedemptionPoint && (
                    <ReferenceDot
                      x={firstRedemptionPoint.month}
                      y={firstRedemptionPoint.redemptionPrice}
                      shape={(props) => <ChartIndicator {...props} color="hsl(41, 90%, 61%)" />}
                    />
                  )}
                  {/* Indicator dot at first distribution on cumulative return line */}
                  {firstDistributionPoint && (
                    <ReferenceDot
                      x={firstDistributionPoint.month}
                      y={firstDistributionPoint.cumulativeReturn}
                      shape={(props) => <ChartIndicator {...props} color="hsl(160, 84%, 39%)" />}
                    />
                  )}
                  {/* Indicator dot at Dec 2024 - aggressive acquisition on issue price line */}
                  {acquisitionPoint && (
                    <ReferenceDot
                      x={acquisitionPoint.month}
                      y={acquisitionPoint.issuePrice}
                      shape={(props) => <ChartIndicator {...props} color="hsl(189, 100%, 65%)" />}
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Stats Sidebar — right on desktop, below chart on mobile */}
          <div className="col-span-12 lg:col-span-3 border-y border-white/15 py-5 lg:border-y-0 lg:py-0">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-8">
              {/* Current Prices — mobile row 1 left, desktop item 1 */}
              <div className="pb-5 lg:pt-5 lg:py-5">
                <p className="type-overline text-white/70 mb-2">Current Prices</p>
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
                    <span className="type-caption text-white">Inception</span>
                    <span className="type-body font-semibold tabular-nums text-sogif-success">{stats.cumulativeInception.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="type-caption text-white">Prev. Year</span>
                    <span className="type-body font-semibold tabular-nums text-sogif-success">{stats.cumulativePrevYear.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* Full-width mobile divider between rows */}
              <hr className="col-span-2 lg:hidden border-white/15" />

              {/* Distributions — mobile row 2 left, desktop item 3 */}
              <div className="pt-5 lg:border-t lg:border-white/15 lg:py-5">
                <p className="type-overline text-white/70 mb-2">Distributions</p>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="type-caption text-white">Inception</span>
                    <span className="type-body font-semibold tabular-nums text-white">${stats.distributionsInception.toFixed(4)}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="type-caption text-white">Prev. Year</span>
                    <span className="type-body font-semibold tabular-nums text-white">${stats.distributionsPrevYear.toFixed(4)}</span>
                  </div>
                </div>
              </div>

              {/* Capital Growth — mobile row 2 right, desktop item 4 */}
              <div className="pt-5 lg:border-t lg:border-white/15 lg:pt-5">
                <p className="type-overline text-white/70 mb-2">Capital Growth</p>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="type-caption text-white">Inception</span>
                    <span className="type-body font-semibold tabular-nums text-white">{stats.capitalGrowthInception.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="type-caption text-white">Prev. Year</span>
                    <span className="type-body font-semibold tabular-nums text-white">{stats.capitalGrowthPrevYear.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DisclaimerText tone="hero" className="mt-8">
          Cumulative return calculated as capital growth plus distributions for that period.
        </DisclaimerText>
        <DisclaimerText tone="hero">
          Past performance is not a reliable indicator of future performance.
        </DisclaimerText>
      </Container>

    </section>
  )
}
