'use client'

import { useRef, useMemo } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui'
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import type { PerformanceDataRow } from '@/lib/types/datocms'

interface PerformanceSnapshotProps {
  performanceData: PerformanceDataRow[]
}

interface ChartDataPoint {
  month: string
  issuePrice: number
  redemptionPrice: number
  cumulativeReturn: number
  distribution: number
  cumulativeDistribution: number
}

interface PerformanceStats {
  latestRedemption: number
  latestIssue: number
  totalDistributions: number
  distributions2024: number
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
    return {
      month: item.month,
      issuePrice: item.issuePrice,
      redemptionPrice: item.redemptionPrice,
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
      latestRedemption: 0,
      latestIssue: 0,
      totalDistributions: 0,
      distributions2024: 0,
      cumulativeReturnPercent: 0,
      annualizedReturn: 0,
    }
  }
  
  const latest = data[0] // Most recent (data is newest first)
  const chronological = [...data].reverse()
  
  // Total distributions (all time)
  const totalDistributions = data.reduce((sum, item) => sum + item.distribution, 0)
  
  // Distributions for 2024 only
  const distributions2024 = data
    .filter(item => item.month.includes('-24'))
    .reduce((sum, item) => sum + item.distribution, 0)
  
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
    distributions2024,
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

export function PerformanceSnapshot({ performanceData }: PerformanceSnapshotProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const chartData = useMemo(() => calculateChartData(performanceData), [performanceData])
  const stats = useMemo(() => calculateStats(performanceData), [performanceData])

  const performanceStats = [
    { label: 'Latest Redemption Price', value: `$${stats.latestRedemption.toFixed(4)}`, change: null },
    { label: 'Total Distributions (2024)', value: `$${stats.distributions2024.toFixed(4)}`, change: `+${(stats.distributions2024 * 100).toFixed(2)}%` },
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
                      interval="preserveStartEnd"
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
                      content={
                        <ChartTooltipContent
                          formatter={(value, name) => {
                            const labels: Record<string, string> = {
                              redemptionPrice: 'Redemption',
                              issuePrice: 'Issue',
                              cumulativeReturn: 'Cumulative',
                            }
                            return (
                              <span className="flex items-center gap-2">
                                <span className="text-white/60">{labels[name as string] || name}:</span>
                                <span className="font-semibold">${Number(value).toFixed(4)}</span>
                              </span>
                            )
                          }}
                        />
                      }
                      cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
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
