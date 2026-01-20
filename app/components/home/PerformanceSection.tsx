'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight, TrendingUp, Calendar, DollarSign, BarChart3 } from 'lucide-react'

// TODO: Replace with CMS content
const performanceData = {
  headline: 'Transparent Performance',
  subheadline: 'Track record of consistent returns and quarterly distributions since inception.',
  latestMonth: 'November 2025',
  metrics: {
    issuePrice: '$1.0562',
    redemptionPrice: '$0.9547',
    ntaPerUnit: '$0.9882',
    ytdReturn: '+5.62%',
  },
  historicalData: [
    { month: 'Nov-25', nta: 0.9882, distribution: 0 },
    { month: 'Oct-25', nta: 1.0026, distribution: 0 },
    { month: 'Sep-25', nta: 0.9949, distribution: 0.015 },
    { month: 'Aug-25', nta: 1.0076, distribution: 0 },
    { month: 'Jul-25', nta: 0.9972, distribution: 0 },
    { month: 'Jun-25', nta: 0.9852, distribution: 0.015 },
    { month: 'May-25', nta: 0.9697, distribution: 0 },
    { month: 'Apr-25', nta: 0.9652, distribution: 0 },
    { month: 'Mar-25', nta: 0.9781, distribution: 0.015 },
    { month: 'Feb-25', nta: 0.9769, distribution: 0 },
    { month: 'Jan-25', nta: 0.9811, distribution: 0 },
    { month: 'Dec-24', nta: 0.9666, distribution: 0.02 },
  ],
  cta: { label: 'View Full Performance', href: '/performance' },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function PerformanceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const maxNTA = Math.max(...performanceData.historicalData.map(d => d.nta))
  const minNTA = Math.min(...performanceData.historicalData.map(d => d.nta))
  const ntaRange = maxNTA - minNTA

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0A2540 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sogif-navy/5 text-sogif-navy text-sm font-medium mb-6">
            <BarChart3 className="h-4 w-4" />
            Fund Performance
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-sogif-navy mb-4">
            {performanceData.headline}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {performanceData.subheadline}
          </p>
        </motion.div>

        {/* Performance Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Key Metrics */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-4"
          >
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-muted-foreground">As at {performanceData.latestMonth}</span>
                <div className="flex items-center gap-1 text-sogif-success text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  {performanceData.metrics.ytdReturn}
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sogif-cyan/10 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-sogif-cyan" />
                    </div>
                    <span className="text-sm text-muted-foreground">Issue Price</span>
                  </div>
                  <span className="text-xl font-bold text-sogif-navy">{performanceData.metrics.issuePrice}</span>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sogif-gold/10 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-sogif-gold" />
                    </div>
                    <span className="text-sm text-muted-foreground">Redemption Price</span>
                  </div>
                  <span className="text-xl font-bold text-sogif-navy">{performanceData.metrics.redemptionPrice}</span>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sogif-success/10 flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-sogif-success" />
                    </div>
                    <span className="text-sm text-muted-foreground">NTA Per Unit</span>
                  </div>
                  <span className="text-xl font-bold text-sogif-navy">{performanceData.metrics.ntaPerUnit}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="text-sm text-muted-foreground">Distributions</span>
                  </div>
                  <span className="text-xl font-bold text-sogif-navy">Quarterly</span>
                </div>
              </div>
            </div>

            <Link
              href={performanceData.cta.href}
              className="group flex items-center justify-center gap-2 w-full px-6 py-4 bg-sogif-navy text-white font-medium rounded-xl hover:bg-sogif-navy-light transition-colors"
            >
              {performanceData.cta.label}
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Chart Area */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 lg:p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-semibold text-sogif-navy">NTA Per Unit (12 Months)</h3>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-sogif-cyan" />
                  <span className="text-muted-foreground">NTA</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-sogif-gold" />
                  <span className="text-muted-foreground">Distribution</span>
                </div>
              </div>
            </div>

            {/* Custom Chart */}
            <div className="relative h-64">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-muted-foreground">
                <span>${maxNTA.toFixed(2)}</span>
                <span>${((maxNTA + minNTA) / 2).toFixed(2)}</span>
                <span>${minNTA.toFixed(2)}</span>
              </div>

              {/* Chart area */}
              <div className="ml-14 h-full pb-8">
                <svg viewBox="0 0 600 200" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="ntaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={i * 50}
                      x2="600"
                      y2={i * 50}
                      stroke="#e2e8f0"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Area fill */}
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    d={`
                      M 0 ${200 - ((performanceData.historicalData[performanceData.historicalData.length - 1].nta - minNTA) / ntaRange) * 180}
                      ${performanceData.historicalData.map((d, i) => {
                        const x = (i / (performanceData.historicalData.length - 1)) * 600
                        const y = 200 - ((d.nta - minNTA) / ntaRange) * 180
                        return `L ${x} ${y}`
                      }).reverse().join(' ')}
                      L 600 200
                      L 0 200
                      Z
                    `}
                    fill="url(#ntaGradient)"
                  />

                  {/* Line */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                    d={`
                      M ${performanceData.historicalData.map((d, i) => {
                        const x = (i / (performanceData.historicalData.length - 1)) * 600
                        const y = 200 - ((d.nta - minNTA) / ntaRange) * 180
                        return `${i === 0 ? '' : 'L '}${x} ${y}`
                      }).reverse().join(' ')}
                    `}
                    fill="none"
                    stroke="#00D9FF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Distribution markers */}
                  {performanceData.historicalData.map((d, i) => {
                    if (d.distribution > 0) {
                      const x = ((performanceData.historicalData.length - 1 - i) / (performanceData.historicalData.length - 1)) * 600
                      const y = 200 - ((d.nta - minNTA) / ntaRange) * 180
                      return (
                        <motion.circle
                          key={d.month}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                          transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
                          cx={x}
                          cy={y}
                          r="8"
                          fill="#F5B942"
                          stroke="white"
                          strokeWidth="3"
                        />
                      )
                    }
                    return null
                  })}
                </svg>

                {/* X-axis labels */}
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  {[...performanceData.historicalData].reverse().filter((_, i) => i % 3 === 0).map((d) => (
                    <span key={d.month}>{d.month}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="mt-6 text-xs text-muted-foreground">
              Past performance is not a reliable indicator of future performance. Data shown is for illustrative purposes.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

