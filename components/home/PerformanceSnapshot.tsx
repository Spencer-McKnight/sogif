'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui'
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer } from 'recharts'

// TODO: Replace with CMS-managed performance data
const performanceData = [
  { month: 'Dec 23', nta: 0.9948, distribution: 0.0000 },
  { month: 'Mar 24', nta: 0.9939, distribution: 0.0000 },
  { month: 'Jun 24', nta: 0.9842, distribution: 0.0204 },
  { month: 'Sep 24', nta: 0.9862, distribution: 0.0100 },
  { month: 'Dec 24', nta: 0.9666, distribution: 0.0200 },
  { month: 'Mar 25', nta: 0.9781, distribution: 0.0150 },
  { month: 'Jun 25', nta: 0.9852, distribution: 0.0150 },
  { month: 'Sep 25', nta: 0.9949, distribution: 0.0150 },
  { month: 'Nov 25', nta: 0.9882, distribution: 0.0000 },
]

const chartConfig = {
  nta: {
    label: 'NTA Per Unit',
    color: 'hsl(var(--sogif-cyan))',
  },
}

// TODO: Replace with calculated values from performance data
const performanceStats = [
  { label: 'Latest NTA', value: '$0.9882', change: null },
  { label: 'Total Distributions (2024)', value: '$0.0654', change: '+6.54%' },
  { label: 'Cumulative Return*', value: '8.3%', change: 'p.a.' },
]

export function PerformanceSnapshot() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
                <h3 className="text-white font-semibold">NTA Per Unit</h3>
                <p className="text-white/60 text-sm">Net Tangible Assets over time</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-sogif-cyan" />
                  <span className="text-white/60">NTA</span>
                </div>
              </div>
            </div>

            <div className="h-64">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer>
                  <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="ntaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(189, 100%, 50%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(189, 100%, 50%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                    />
                    <YAxis
                      domain={[0.95, 1.02]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                      tickFormatter={(value) => `$${value.toFixed(2)}`}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="nta"
                      stroke="hsl(189, 100%, 50%)"
                      strokeWidth={2}
                      fill="url(#ntaGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <p className="text-white/40 text-xs mt-4">
              *Cumulative returns calculated since fund inception (Dec 2023). Past performance is not a reliable indicator of future performance.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
