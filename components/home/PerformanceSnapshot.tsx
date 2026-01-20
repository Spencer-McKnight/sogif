'use client'

import { useRef, useMemo } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ChartContainer, ChartTooltip } from '@/components/ui'
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer } from 'recharts'
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
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/b397af8d-0424-4aac-86b3-e9c41cc4ac79', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: 'PerformanceSnapshot.tsx:calculateChartData',
      message: 'Input data inspection',
      data: {
        inputLength: data.length,
        firstFewRedemptionPrices: data.slice(0, 5).map(d => ({
          month: d.month,
          redemptionPrice: d.redemptionPrice,
          type: typeof d.redemptionPrice,
          isNull: d.redemptionPrice === null,
          isZero: d.redemptionPrice === 0
        }))
      },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      hypothesisId: 'H3-input-data'
    })
  }).catch(() => {})
  // #endregion

  if (!data.length) return []
  
  // Data comes newest first, reverse to chronological order (oldest first)
  const chronological = [...data].reverse()
  
  let cumulativeDistribution = 0
  
  return chronological.map((item) => {
    cumulativeDistribution += item.distribution
    // Convert 0 or null to undefined - CMS stores 0 for missing prices, Recharts needs undefined to skip
    const redemptionValue = (item.redemptionPrice === 0 || item.redemptionPrice === null) ? undefined : item.redemptionPrice
    
    // #region agent log
    if (item.redemptionPrice === null || item.redemptionPrice === 0) {
      fetch('http://127.0.0.1:7244/ingest/b397af8d-0424-4aac-86b3-e9c41cc4ac79', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: 'PerformanceSnapshot.tsx:calculateChartData:map',
          message: 'Null/zero redemption price found',
          data: {
            month: item.month,
            originalValue: item.redemptionPrice,
            convertedValue: redemptionValue,
            convertedType: typeof redemptionValue
          },
          timestamp: Date.now(),
          sessionId: 'debug-session',
          hypothesisId: 'H3-null-conversion'
        })
      }).catch(() => {})
    }
    // #endregion

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
    color: 'hsl(var(--sogif-cyan))',
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
  { key: 'issuePrice', label: 'Issue Price', color: 'hsl(189, 100%, 50%)' },
  { key: 'cumulativeReturn', label: 'Cumulative', color: 'hsl(160, 84%, 39%)' },
] as const

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null

  const data = payload[0]?.payload as ChartDataPoint | undefined
  if (!data) return null

  return (
    <div className="rounded-lg border border-white/20 bg-sogif-navy-light px-3 py-2.5 shadow-xl">
      <p className="mb-2 text-sm font-medium text-white">{data.month}</p>
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
                <span className="text-xs text-white/60">{label}</span>
              </div>
              <span className="text-xs font-medium tabular-nums text-white">
                ${value.toFixed(4)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function PerformanceSnapshot({ performanceData }: PerformanceSnapshotProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const chartData = useMemo(() => calculateChartData(performanceData), [performanceData])
  const stats = useMemo(() => calculateStats(performanceData), [performanceData])

  // #region agent log
  // Debug: Log raw performanceData and transformed chartData
  useMemo(() => {
    const debugPayload = {
      location: 'PerformanceSnapshot.tsx:component',
      message: 'Chart data inspection',
      data: {
        rawDataLength: performanceData.length,
        rawFirst3: performanceData.slice(0, 3).map(d => ({ 
          month: d.month, 
          redemptionPrice: d.redemptionPrice,
          redemptionPriceType: typeof d.redemptionPrice,
          isNull: d.redemptionPrice === null,
          isUndefined: d.redemptionPrice === undefined
        })),
        chartDataLength: chartData.length,
        chartFirst5: chartData.slice(0, 5).map(d => ({
          month: d.month,
          redemptionPrice: d.redemptionPrice,
          redemptionPriceType: typeof d.redemptionPrice,
          isUndefined: d.redemptionPrice === undefined
        })),
        allRedemptionPrices: chartData.map(d => d.redemptionPrice)
      },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      hypothesisId: 'H3-data-transform'
    }
    fetch('http://127.0.0.1:7244/ingest/b397af8d-0424-4aac-86b3-e9c41cc4ac79', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(debugPayload)
    }).catch(() => {})
  }, [performanceData, chartData])
  // #endregion

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
    <section className="py-24 bg-sogif-navy relative overflow-hidden" ref={ref}>
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sogif-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-sogif-gold/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sogif-cyan font-semibold text-sm uppercase tracking-wider mb-3 block">
            Fund Performance
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Consistent Growth, Reliable Returns
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Track our fund&apos;s performance with transparent monthly reporting. 
            Our diversified strategy aims to deliver steady growth with quarterly income distributions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Stats Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {performanceStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <p className="text-white/60 text-sm mb-2">{stat.label}</p>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-bold text-white">{stat.value}</span>
                  {stat.change && (
                    <span className={`text-sm font-medium pb-1 ${
                      stat.change.startsWith('+') ? 'text-sogif-success' : 'text-white/60'
                    }`}>
                      {stat.change}
                    </span>
                  )}
                </div>
              </div>
            ))}

            <Link
              href="/performance"
              className="group flex items-center justify-between bg-sogif-cyan/10 border border-sogif-cyan/30 hover:bg-sogif-cyan/20 rounded-xl p-6 transition-all"
            >
              <div>
                <p className="text-white font-semibold mb-1">View Full Performance</p>
                <p className="text-white/60 text-sm">Monthly data, distributions & analysis</p>
              </div>
              <svg
                className="w-6 h-6 text-sogif-cyan group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          {/* Chart Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white font-semibold">Fund Pricing & Returns</h3>
                <p className="text-white/60 text-sm">Monthly performance since inception</p>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sogif-gold" />
                <span className="text-white/60">Redemption Price</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sogif-cyan" />
                <span className="text-white/60">Issue Price</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sogif-success" />
                <span className="text-white/60">Cumulative Return</span>
              </div>
            </div>

            <div className="h-72">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer>
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="redemptionGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(41, 90%, 61%)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="hsl(41, 90%, 61%)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="issueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(189, 100%, 50%)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="hsl(189, 100%, 50%)" stopOpacity={0} />
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
                      stroke="hsl(189, 100%, 50%)"
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

            <p className="text-white/40 text-xs mt-4">
              *Cumulative return calculated as Issue Price plus all distributions since fund inception. Past performance is not a reliable indicator of future performance.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
