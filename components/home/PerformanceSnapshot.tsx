'use client'

import { useMemo, useState } from 'react'
import { AppCard, AppLink, ChartContainer, ChartTooltip, Container, DisclaimerText, SectionHeader } from '@/components/ui'
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer, ReferenceDot } from 'recharts'
import type { TooltipProps } from 'recharts'
import type { PerformanceDataRow } from '@/lib/types/datocms'

interface PerformanceSnapshotProps {
  performanceData: PerformanceDataRow[]
}

interface ChartDataPoint {
  month: string
  issuePrice: number
  redemptionPrice: number | undefined  // undefined before first property acquisition (Recharts skips undefined)
  cumulativeReturn: number
  distribution: number
  cumulativeDistribution: number
}

interface PerformanceStats {
  latestRedemption: number | null
  latestIssue: number
  totalDistributions: number
  cumulativeReturnPercent: number
  annualizedReturn: number
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
 */
function calculateStats(data: PerformanceDataRow[]): PerformanceStats {
  if (!data.length) {
    return {
      latestRedemption: null,
      latestIssue: 0,
      totalDistributions: 0,
      cumulativeReturnPercent: 0,
      annualizedReturn: 0,
    }
  }

  const latest = data[0] // Most recent (data is newest first)
  const chronological = [...data].reverse()

  // Total distributions (all time)
  const totalDistributions = data.reduce((sum, item) => sum + item.distribution, 0)

  // Cumulative return percentage from inception
  const inception = chronological[0]
  const latestCumulativeReturn = latest.issuePrice + totalDistributions
  const returnPercentage = ((latestCumulativeReturn - inception.issuePrice) / inception.issuePrice) * 100

  // Calculate approximate years since inception for annualized return
  const monthCount = data.length
  const years = monthCount / 12
  const annualizedReturn = years > 0 ? returnPercentage / years : 0

  return {
    latestRedemption: latest.redemptionPrice,
    latestIssue: latest.issuePrice,
    totalDistributions,
    cumulativeReturnPercent: returnPercentage,
    annualizedReturn,
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
  { key: 'redemptionPrice', label: 'Redemption', color: 'hsl(41, 90%, 61%)' },
  { key: 'issuePrice', label: 'Issue Price', color: 'hsl(189, 100%, 65%)' },
  { key: 'cumulativeReturn', label: 'Cumulative', color: 'hsl(160, 84%, 39%)' },
] as const

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null

  const data = payload[0]?.payload as ChartDataPoint | undefined
  if (!data) return null

  return (
    <div className="rounded-lg border border-white/20 bg-sogif-navy-light px-3 py-2.5 shadow-xl">
      <p className="mb-2 type-support font-medium text-white">{data.month}</p>
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
    </div>
  )
}

interface ChartIndicatorProps {
  cx?: number
  cy?: number
  color: string
  onHover?: (position: { x: number; y: number } | null) => void
}

function ChartIndicator({ cx, cy, color, onHover }: ChartIndicatorProps) {
  if (cx === undefined || cy === undefined) return null

  return (
    <g
      className="cursor-pointer"
      onMouseEnter={(e) => {
        const svg = (e.target as SVGElement).ownerSVGElement
        if (svg && onHover) {
          const rect = svg.getBoundingClientRect()
          onHover({ x: rect.left + cx, y: rect.top + cy })
        }
      }}
      onMouseLeave={() => onHover?.(null)}
    >
      {/* Outer ring */}
      <circle
        cx={cx}
        cy={cy}
        r={7}
        fill={color}
        stroke="white"
        strokeWidth={2}
      />
      {/* Inner dot */}
      <circle
        cx={cx}
        cy={cy}
        r={2.5}
        fill="white"
        className="pointer-events-none"
      />
    </g>
  )
}

export function PerformanceSnapshot({ performanceData }: PerformanceSnapshotProps) {
  const chartData = useMemo(() => calculateChartData(performanceData), [performanceData])
  const stats = useMemo(() => calculateStats(performanceData), [performanceData])

  // Find first data point with redemption price (start of the redemption line)
  const firstRedemptionPoint = useMemo(() => {
    return chartData.find(d => d.redemptionPrice !== undefined)
  }, [chartData])

  // Find May 2024 - first quarterly distribution
  const firstDistributionPoint = useMemo(() => {
    return chartData.find(d => d.month === 'May-24')
  }, [chartData])

  // State for indicator tooltips
  const [redemptionTooltip, setRedemptionTooltip] = useState<{ x: number; y: number } | null>(null)
  const [distributionTooltip, setDistributionTooltip] = useState<{ x: number; y: number } | null>(null)

  const performanceStats = [
    {
      label: 'Latest Redemption Price',
      value: (stats.latestRedemption !== null && stats.latestRedemption !== 0) ? `$${stats.latestRedemption.toFixed(4)}` : 'N/A',
      change: null
    },
    { label: 'Total Distributions', value: `$${stats.totalDistributions.toFixed(4)}`, change: `+${(stats.totalDistributions * 100).toFixed(2)}%` },
    { label: 'Cumulative Return*', value: `${stats.cumulativeReturnPercent.toFixed(1)}%`, change: `~${stats.annualizedReturn.toFixed(1)}% p.a.` },
  ]

  // Don't render if no data
  if (!performanceData.length) {
    return null
  }

  return (
    <section className="section-padding bg-sogif-navy relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sogif-cyan-light/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-sogif-gold/5 rounded-full blur-3xl" />

      <Container className="relative">
        {/* Section Header */}
        <div className="mb-16">
          <SectionHeader
            dark
            eyebrow="Fund Performance"
            title="Consistent Growth, Reliable Returns"
            description="Track our fund's performance with transparent monthly reporting. Our diversified strategy aims to deliver steady growth with quarterly income distributions."
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 min-w-0">
          {/* Stats Column - appears second on mobile, first on desktop */}
          <div className="lg:col-span-5 min-w-0 space-y-3 lg:space-y-4 order-2 lg:order-1">
            {performanceStats.map((stat) => (
              <AppCard
                key={stat.label}
                variant="stat"
              >
                <p className="text-white/90 type-support mb-1 lg:mb-2">{stat.label}</p>
                <div className="flex items-end gap-2 lg:gap-3">
                  <span className="type-metric font-bold text-white">{stat.value}</span>
                  {stat.change && (
                    <span className={`type-support font-medium pb-0.5 lg:pb-1 ${stat.change.startsWith('+') ? 'text-sogif-success' : 'text-white/90'
                      }`}>
                      {stat.change}
                    </span>
                  )}
                </div>
              </AppCard>
            ))}

            <AppLink
              href="/performance"
              className="group flex items-center justify-between bg-sogif-cyan-light/10 border border-sogif-cyan-light/30 hover:bg-sogif-cyan-light/20 rounded-xl p-4 lg:p-6 text-white"
            >
              <div>
                <p className="text-white font-semibold type-support mb-0.5 lg:mb-1">View Full Performance</p>
                <p className="text-white/90 type-support">Monthly data, distributions & analysis</p>
              </div>
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6 text-sogif-cyan-light group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </AppLink>

            {/* Existing Investor Portal CTA */}
            <a
              href="https://portal.sogif.au"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-sogif-success/10 border border-sogif-success/30 hover:bg-sogif-success/20 rounded-xl p-4 lg:p-6 transition-all focus-ring"
            >
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-sogif-success/20 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 text-sogif-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sogif-success font-semibold type-support mb-0.5 lg:mb-1">Existing Investor?</p>
                  <p className="text-white/90 type-support">View your personalised returns</p>
                </div>
              </div>
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6 text-sogif-success group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Chart Column - appears first on mobile, second on desktop */}
          <div className="lg:col-span-7 min-w-0 bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-6 order-1 lg:order-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="type-title text-white font-semibold">Fund Pricing & Returns</h3>
                <p className="text-white/90 type-support">Monthly performance since inception</p>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 mb-4 type-support">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sogif-gold" />
                <span className="text-white/90">Redemption Price</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sogif-cyan-light" />
                <span className="text-white/90">Issue Price</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sogif-success" />
                <span className="text-white/90">Cumulative Return</span>
              </div>
            </div>

            <div className="h-96">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer>
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                      tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                      interval={Math.max(0, Math.ceil(chartData.length / 6) - 1)}
                      tickFormatter={(value) => {
                        const [month, year] = value.split('-')
                        return `${month.substring(0, 3)} '${year}`
                      }}
                    />
                    <YAxis
                      domain={[0.90, 1.15]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
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
                        shape={(props) => <ChartIndicator {...props} color="hsl(41, 90%, 61%)" onHover={setRedemptionTooltip} />}
                      />
                    )}
                    {/* Indicator dot at first distribution on cumulative return line */}
                    {firstDistributionPoint && (
                      <ReferenceDot
                        x={firstDistributionPoint.month}
                        y={firstDistributionPoint.cumulativeReturn}
                        shape={(props) => <ChartIndicator {...props} color="hsl(160, 84%, 39%)" onHover={setDistributionTooltip} />}
                      />
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <DisclaimerText tone="hero" className="mt-4">
              *Cumulative return calculated as Issue Price plus all distributions since fund inception. Past performance is not a reliable indicator of future performance.
            </DisclaimerText>
          </div>
        </div>
      </Container>

      {/* Redemption start tooltip - rendered outside chart for proper z-index */}
      {redemptionTooltip && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: redemptionTooltip.x - 10,
            top: redemptionTooltip.y - 90,
          }}
        >
          <div className="bg-sogif-navy border border-sogif-gold/40 rounded-lg px-3 py-2 type-caption text-white shadow-2xl max-w-[220px]">
            No property was acquired until the minimum subscription was achieved.
            Accordingly, there was no redemption price prior to December 2023.
          </div>
        </div>
      )}

      {/* First distribution tooltip */}
      {distributionTooltip && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: distributionTooltip.x - 10,
            top: distributionTooltip.y - 55,
          }}
        >
          <div className="bg-sogif-navy border border-sogif-success/40 rounded-lg px-3 py-2 type-caption text-white shadow-2xl max-w-[200px]">
            First quarterly distribution began here
          </div>
        </div>
      )}
    </section>
  )
}
