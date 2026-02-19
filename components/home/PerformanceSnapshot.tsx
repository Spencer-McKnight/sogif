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
  annualizedReturnPercent: number
  annualizedDistributions: number
  annualizedStartMonth: string
  annualizedEndMonth: string
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
      annualizedReturnPercent: 0,
      annualizedDistributions: 0,
      annualizedStartMonth: '',
      annualizedEndMonth: '',
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

  // Trailing 12-month stats (data is newest first)
  const trailing12 = data.slice(0, Math.min(12, data.length))
  const startPoint = trailing12[trailing12.length - 1] // 12 months ago (or oldest available)
  const annualizedDistributions = trailing12.reduce((sum, item) => sum + item.distribution, 0)
  const trailing12Return = latest.issuePrice + annualizedDistributions
  const annualizedReturnPercent = ((trailing12Return - startPoint.issuePrice) / startPoint.issuePrice) * 100

  return {
    latestRedemption: latest.redemptionPrice,
    latestIssue: latest.issuePrice,
    totalDistributions,
    cumulativeReturnPercent: returnPercentage,
    annualizedReturn,
    annualizedReturnPercent,
    annualizedDistributions,
    annualizedStartMonth: startPoint.month,
    annualizedEndMonth: latest.month,
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

  // Find first data point with redemption price (start of the redemption line)
  const firstRedemptionPoint = useMemo(() => {
    return chartData.find(d => d.redemptionPrice !== undefined)
  }, [chartData])

  // Find May 2024 - first quarterly distribution
  const firstDistributionPoint = useMemo(() => {
    return chartData.find(d => d.month === 'May-24')
  }, [chartData])

  // Find Dec 2024 - aggressive property acquisition
  const acquisitionPoint = useMemo(() => {
    return chartData.find(d => d.month === 'Dec-24')
  }, [chartData])

  // State for indicator tooltips
  const [redemptionTooltip, setRedemptionTooltip] = useState<{ x: number; y: number } | null>(null)
  const [distributionTooltip, setDistributionTooltip] = useState<{ x: number; y: number } | null>(null)
  const [acquisitionTooltip, setAcquisitionTooltip] = useState<{ x: number; y: number } | null>(null)

  // Don't render if no data
  if (!performanceData.length) {
    return null
  }

  return (
    <section className="section-padding bg-sogif-navy relative overflow-hidden">
      <Container className="relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <SectionHeader
              dark
              align="left"
              eyebrow="Performance"
              title="Price & Distribution History"
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
        <ChartContainer config={chartConfig} className="h-[300px] md:h-[400px] lg:h-[500px] w-full">
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
              {/* Indicator dot at Dec 2024 - aggressive acquisition on issue price line */}
              {acquisitionPoint && (
                <ReferenceDot
                  x={acquisitionPoint.month}
                  y={acquisitionPoint.issuePrice}
                  shape={(props) => <ChartIndicator {...props} color="hsl(189, 100%, 65%)" onHover={setAcquisitionTooltip} />}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Value Highlights */}
        {/* flex-col-reverse on mobile puts Current Prices first; md:grid restores desktop order */}
        <div className="mt-8 flex flex-col-reverse md:grid md:grid-cols-3 gap-8 border-t md:border-t-0 border-white/10 pt-8 md:pt-0">
          <div>
            <p className="type-caption font-medium uppercase tracking-wider text-white/50 mb-3">Since Inception</p>
            <div className="flex gap-8">
              <div className="flex-1">
                <p className="type-metric font-semibold text-white">{stats.cumulativeReturnPercent.toFixed(1)}%</p>
                <p className="type-caption text-white/60">Cumulative Return</p>
              </div>
              <div className="flex-1">
                <p className="type-metric font-semibold text-white">${stats.totalDistributions.toFixed(4)}</p>
                <p className="type-caption text-white/60">Distributions</p>
              </div>
            </div>
          </div>
          <div className="md:-ml-4 md:border-l md:border-white/10 md:pl-4">
            <p className="type-caption font-medium uppercase tracking-wider text-white/50 mb-3">12 Month ({(() => { const [sM, sY] = stats.annualizedStartMonth.split('-'); const [, eY] = stats.annualizedEndMonth.split('-'); return `${sM} 20${sY} – 20${eY}` })()})</p>
            <div className="flex gap-8">
              <div className="flex-1">
                <p className="type-metric font-semibold text-white">{stats.annualizedReturnPercent.toFixed(1)}%</p>
                <p className="type-caption text-white/60">Cumulative Return</p>
              </div>
              <div className="flex-1">
                <p className="type-metric font-semibold text-white">${stats.annualizedDistributions.toFixed(4)}</p>
                <p className="type-caption text-white/60">Distributions</p>
              </div>
            </div>
          </div>
          <div className="md:-ml-4 md:border-l md:border-white/10 md:pl-4">
            <p className="type-caption font-medium uppercase tracking-wider text-white/50 mb-3">Current Prices</p>
            <div className="flex gap-8">
              <div className="flex-1">
                <p className="type-metric font-semibold text-white">${stats.latestIssue.toFixed(4)}</p>
                <p className="type-caption text-white/60">Issue</p>
              </div>
              <div className="flex-1">
                <p className="type-metric font-semibold text-white">
                  {(stats.latestRedemption !== null && stats.latestRedemption !== 0) ? `$${stats.latestRedemption.toFixed(4)}` : 'N/A'}
                </p>
                <p className="type-caption text-white/60">Redemption</p>
              </div>
            </div>
          </div>
        </div>

        <DisclaimerText tone="hero" className="mt-8">
          Cumulative return calculated as Issue Price plus distributions for that period.
        </DisclaimerText>
        <DisclaimerText tone="hero">
          Past performance is not a reliable indicator of future performance.
        </DisclaimerText>
      </Container >

      {/* Redemption start tooltip - rendered outside chart for proper z-index */}
      {
        redemptionTooltip && (
          <div
            className="fixed z-[9999] pointer-events-none"
            style={{
              left: redemptionTooltip.x - 10,
              top: redemptionTooltip.y - 90,
            }}
          >
            <div className="border border-sogif-gold/40 bg-sogif-navy-light rounded-lg px-3 py-2 type-caption text-white shadow-2xl max-w-[220px]">
              No property was acquired until the minimum subscription was achieved.
              Accordingly, there was no redemption price prior to December 2023.
            </div>
          </div>
        )
      }

      {/* First distribution tooltip */}
      {
        distributionTooltip && (
          <div
            className="fixed z-[9999] pointer-events-none"
            style={{
              left: distributionTooltip.x - 10,
              top: distributionTooltip.y - 55,
            }}
          >
            <div className="border border-sogif-success/40 bg-sogif-navy-light rounded-lg px-3 py-2 type-caption text-white shadow-2xl max-w-[200px]">
              First quarterly distribution began here
            </div>
          </div>
        )
      }

      {/* Aggressive acquisition tooltip */}
      {
        acquisitionTooltip && (
          <div
            className="fixed z-[9999] pointer-events-none"
            style={{
              left: acquisitionTooltip.x - 10,
              top: acquisitionTooltip.y - 55,
            }}
          >
            <div className="border border-sogif-cyan-light/40 bg-sogif-navy-light rounded-lg px-3 py-2 type-caption text-white shadow-2xl max-w-[200px]">
              Aggressive property acquisition began
            </div>
          </div>
        )
      }
    </section >
  )
}
