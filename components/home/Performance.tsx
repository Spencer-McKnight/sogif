'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui'
import { cn } from '@/lib/utils'

// TODO: Replace with CMS content (from SOGIF_CONTEXT.md historical data)
const NTA_DATA = [
  { month: 'Dec 23', nta: 0.9948 },
  { month: 'Jan 24', nta: 0.9846 },
  { month: 'Feb 24', nta: 0.9875 },
  { month: 'Mar 24', nta: 0.9939 },
  { month: 'Apr 24', nta: 0.9820 },
  { month: 'May 24', nta: 0.9766 },
  { month: 'Jun 24', nta: 0.9842 },
  { month: 'Jul 24', nta: 0.9714 },
  { month: 'Aug 24', nta: 0.9745 },
  { month: 'Sep 24', nta: 0.9862 },
  { month: 'Oct 24', nta: 0.9866 },
  { month: 'Nov 24', nta: 0.9979 },
  { month: 'Dec 24', nta: 0.9666 },
  { month: 'Jan 25', nta: 0.9811 },
  { month: 'Feb 25', nta: 0.9769 },
  { month: 'Mar 25', nta: 0.9781 },
  { month: 'Apr 25', nta: 0.9652 },
  { month: 'May 25', nta: 0.9697 },
  { month: 'Jun 25', nta: 0.9852 },
  { month: 'Jul 25', nta: 0.9972 },
  { month: 'Aug 25', nta: 1.0076 },
  { month: 'Sep 25', nta: 0.9949 },
  { month: 'Oct 25', nta: 1.0026 },
  { month: 'Nov 25', nta: 0.9882 },
]

const DISTRIBUTION_DATA = [
  { quarter: 'Q2 24', distribution: 0.0204 },
  { quarter: 'Q3 24', distribution: 0.0100 },
  { quarter: 'Q4 24', distribution: 0.0200 },
  { quarter: 'Q1 25', distribution: 0.0150 },
  { quarter: 'Q2 25', distribution: 0.0150 },
  { quarter: 'Q3 25', distribution: 0.0150 },
]

const chartConfigNTA = {
  nta: {
    label: 'NTA Per Unit',
    color: 'hsl(var(--sogif-cyan))',
  },
}

const chartConfigDist = {
  distribution: {
    label: 'Distribution',
    color: 'hsl(var(--sogif-gold))',
  },
}

type ViewMode = 'nta' | 'distributions'

export function Performance() {
  const [viewMode, setViewMode] = useState<ViewMode>('nta')

  return (
    <section className="py-16 lg:py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight mb-4">
            Fund Performance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track our historical performance with transparent, up-to-date data.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex rounded-lg bg-muted p-1">
            <button
              onClick={() => setViewMode('nta')}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-all',
                viewMode === 'nta'
                  ? 'bg-background text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-primary'
              )}
            >
              NTA Growth
            </button>
            <button
              onClick={() => setViewMode('distributions')}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-all',
                viewMode === 'distributions'
                  ? 'bg-background text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-primary'
              )}
            >
              Distributions
            </button>
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-background rounded-xl border border-border p-6"
        >
          {viewMode === 'nta' ? (
            <ChartContainer config={chartConfigNTA} className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={NTA_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ntaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--sogif-cyan))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--sogif-cyan))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                    className="text-muted-foreground"
                  />
                  <YAxis
                    domain={[0.95, 1.05]}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                    className="text-muted-foreground"
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => [`$${Number(value).toFixed(4)}`, 'NTA Per Unit']}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="nta"
                    stroke="hsl(var(--sogif-cyan))"
                    strokeWidth={2}
                    fill="url(#ntaGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <ChartContainer config={chartConfigDist} className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DISTRIBUTION_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                  <XAxis
                    dataKey="quarter"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                    className="text-muted-foreground"
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => [`$${Number(value).toFixed(4)}`, 'Distribution Per Unit']}
                      />
                    }
                  />
                  <Bar
                    dataKey="distribution"
                    fill="hsl(var(--sogif-gold))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </motion.div>

        {/* Benchmark Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div className="bg-background rounded-lg border border-border p-5 text-center">
            <p className="text-sm text-muted-foreground mb-1">SOGIF Return</p>
            <p className="text-2xl font-bold text-sogif-cyan">8.3%</p>
            <p className="text-xs text-muted-foreground mt-1">Historical cumulative*</p>
          </div>
          <div className="bg-background rounded-lg border border-border p-5 text-center">
            <p className="text-sm text-muted-foreground mb-1">Term Deposit</p>
            <p className="text-2xl font-bold text-muted-foreground">~4.5%</p>
            <p className="text-xs text-muted-foreground mt-1">12-month average</p>
          </div>
          <div className="bg-background rounded-lg border border-border p-5 text-center">
            <p className="text-sm text-muted-foreground mb-1">Cash Rate</p>
            <p className="text-2xl font-bold text-muted-foreground">~4.35%</p>
            <p className="text-xs text-muted-foreground mt-1">RBA cash rate</p>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 text-xs text-muted-foreground text-center"
        >
          *Past performance is not a reliable indicator of future performance. Investment returns are not guaranteed.
        </motion.p>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Link
            href="/performance"
            className="inline-flex items-center gap-2 text-sm font-medium text-sogif-cyan hover:text-sogif-cyan/80 transition-colors group"
          >
            View Full Performance Data
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

