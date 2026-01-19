'use client'

import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

// TODO: Replace with CMS content
const PERFORMANCE_CONTENT = {
  eyebrow: 'Track Record',
  title: 'Consistent Performance,',
  titleAccent: 'Transparent Results',
  description: 'Our disciplined investment approach has delivered steady returns across market cycles.',
  metrics: [
    {
      value: '12.4%',
      label: 'Average Annual Return',
      sublabel: 'Since inception (2023)',
      trend: 'up',
    },
    {
      value: '98.7%',
      label: 'Occupancy Rate',
      sublabel: 'Across all properties',
      trend: 'up',
    },
    {
      value: '$48M',
      label: 'Assets Under Management',
      sublabel: 'Growing portfolio',
      trend: 'up',
    },
    {
      value: '24',
      label: 'Months',
      sublabel: 'Of consecutive distributions',
      trend: 'stable',
    },
  ],
  chartData: {
    years: ['2023', '2024', '2025', '2026'],
    returns: [8.2, 11.6, 14.1, 12.4],
    benchmark: [5.1, 6.8, 7.2, 6.9],
  },
  disclaimer: 'Past performance is not indicative of future results. All investments carry risk.',
}

function MetricCard({ metric, index }: { metric: typeof PERFORMANCE_CONTENT.metrics[0]; index: number }) {
  return (
    <div 
      className="relative group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative p-8 rounded-2xl bg-navy-800/50 border border-white/5 hover:border-cyan-400/30 transition-all duration-500 hover:bg-navy-800/70">
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content */}
        <div className="relative">
          <div className="flex items-start justify-between mb-2">
            <span className="text-4xl md:text-5xl font-serif text-white">
              {metric.value}
            </span>
            {metric.trend === 'up' && (
              <span className="flex items-center gap-1 text-green-400 text-sm font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">
            {metric.label}
          </h3>
          <p className="text-sm text-slate-400">
            {metric.sublabel}
          </p>
        </div>
        
        {/* Corner Accent */}
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-cyan-400/10 to-transparent rounded-tl-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  )
}

function PerformanceChart({ data }: { data: typeof PERFORMANCE_CONTENT.chartData }) {
  const maxReturn = Math.max(...data.returns, ...data.benchmark)
  
  return (
    <div className="relative bg-navy-800/30 rounded-2xl p-6 md:p-8 border border-white/5">
      {/* Chart Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h3 className="text-xl font-semibold text-white">Annual Returns vs Benchmark</h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-cyan-400 rounded-full" />
            <span className="text-sm text-slate-400">SOGIF Returns</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-slate-500 rounded-full" />
            <span className="text-sm text-slate-400">Market Benchmark</span>
          </div>
        </div>
      </div>
      
      {/* Chart */}
      <div className="relative h-64">
        {/* Y-axis lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[15, 10, 5, 0].map((val) => (
            <div key={val} className="flex items-center gap-3">
              <span className="text-xs text-slate-500 w-8 text-right">{val}%</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>
          ))}
        </div>
        
        {/* Bars */}
        <div className="absolute inset-0 pl-12 flex items-end justify-around gap-4 pb-6">
          {data.years.map((year, index) => (
            <div key={year} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex justify-center gap-2 h-48">
                {/* SOGIF Bar */}
                <div 
                  className="w-8 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-lg transition-all duration-700 ease-out hover:from-cyan-400 hover:to-cyan-300"
                  style={{ height: `${(data.returns[index] / maxReturn) * 100}%` }}
                >
                  <span className="block text-xs text-navy-900 font-semibold text-center pt-2">
                    {data.returns[index]}%
                  </span>
                </div>
                {/* Benchmark Bar */}
                <div 
                  className="w-8 bg-slate-600 rounded-t-lg transition-all duration-700 ease-out"
                  style={{ height: `${(data.benchmark[index] / maxReturn) * 100}%` }}
                />
              </div>
              <span className="text-sm text-slate-400">{year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Performance() {
  return (
    <section className="relative py-24 md:py-32 bg-navy-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-[100px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
      </div>
      
      <Container className="relative z-10">
        <SectionHeading
          eyebrow={PERFORMANCE_CONTENT.eyebrow}
          title={
            <>
              {PERFORMANCE_CONTENT.title}{' '}
              <span className="text-cyan-400">{PERFORMANCE_CONTENT.titleAccent}</span>
            </>
          }
          description={PERFORMANCE_CONTENT.description}
          dark
        />
        
        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {PERFORMANCE_CONTENT.metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} index={index} />
          ))}
        </div>
        
        {/* Performance Chart */}
        <PerformanceChart data={PERFORMANCE_CONTENT.chartData} />
        
        {/* Disclaimer */}
        <p className="text-center text-sm text-slate-500 mt-8">
          {PERFORMANCE_CONTENT.disclaimer}
        </p>
      </Container>
    </section>
  )
}

