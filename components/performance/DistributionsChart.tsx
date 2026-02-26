'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Bar, BarChart, Cell, LabelList, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts'
import { ChartContainer } from '@/components/ui'
import { usePerformance, useConstants } from '@/lib'
import {
  CHART_COLORS,
  CHART_HEIGHT_CLASS,
  AXIS_STYLE_LIGHT,
  GRID_STYLE_LIGHT,
  CHART_MARGIN,
  filterByTimeRange,
  getDateRangeLabel,
  type TimeRange,
} from './chart-constants'
import { TimeRangeFilter } from './TimeRangeFilter'
import { ChartStats } from './ChartStats'

// ---------------------------------------------------------------------------
// Quarterly aggregation
// ---------------------------------------------------------------------------

interface QuarterlyData {
  quarter: string    // "Q1 '24"
  month: string      // keep for tooltip compat — last month of quarter
  distribution: number
  isLatest: boolean
}

const QUARTER_MAP: Record<string, number> = {
  Jan: 1, Feb: 1, Mar: 1,
  Apr: 2, May: 2, Jun: 2,
  Jul: 3, Aug: 3, Sep: 3,
  Oct: 4, Nov: 4, Dec: 4,
}

function aggregateQuarterly(
  chartData: { month: string; distribution: number }[],
  monthlySeries: { month: string; distribution: number }[],
): QuarterlyData[] {
  // Use monthly series (newest first) for distribution values, keyed by month
  const distMap = new Map<string, number>()
  for (const row of monthlySeries) {
    distMap.set(row.month, row.distribution)
  }

  // Group into quarters using chartData (chronological)
  const buckets = new Map<string, { total: number; lastMonth: string }>()
  const quarterOrder: string[] = []

  for (const d of chartData) {
    const [m, y] = d.month.split('-')
    const q = QUARTER_MAP[m]
    if (!q) continue
    const key = `Q${q} '${y}`
    const dist = distMap.get(d.month) ?? d.distribution ?? 0

    if (!buckets.has(key)) {
      buckets.set(key, { total: 0, lastMonth: d.month })
      quarterOrder.push(key)
    }
    const bucket = buckets.get(key)!
    bucket.total += dist
    bucket.lastMonth = d.month
  }

  const lastKey = quarterOrder[quarterOrder.length - 1]

  return quarterOrder.map(key => {
    const b = buckets.get(key)!
    return {
      quarter: key,
      month: b.lastMonth,
      distribution: Number(b.total.toFixed(4)),
      isLatest: key === lastKey,
    }
  })
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

export function DistributionsChart() {
  const { chartData } = usePerformance()
  const { performanceKpiData } = useConstants()
  const [timeRange, setTimeRange] = useState<TimeRange>('all')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const hasAnimated = useRef(false)
  useEffect(() => { hasAnimated.current = true }, [])

  const filtered = useMemo(() => filterByTimeRange(chartData, timeRange), [chartData, timeRange])
  const dateLabel = useMemo(() => getDateRangeLabel(filtered), [filtered])

  const quarterly = useMemo(
    () => aggregateQuarterly(filtered, performanceKpiData.monthlySeries).filter(q => q.distribution > 0),
    [filtered, performanceKpiData.monthlySeries],
  )

  // Stats — computed from full dataset (not filtered by time range)
  const distStats = useMemo(() => {
    const series = performanceKpiData.monthlySeries
    if (!series.length) return null

    const totalPaid = series.reduce((sum, row) => sum + row.distribution, 0)
    const monthCount = series.length
    const years = monthCount / 12
    const avgAnnual = years > 0 ? totalPaid / years : 0

    // Trailing 12-month yield: T12M distributions / latest issue price
    const t12m = series.slice(0, Math.min(12, series.length))
    const trailing12Dist = t12m.reduce((sum, row) => sum + row.distribution, 0)
    const latestIssue = series[0]?.issuePrice ?? 1
    const trailingYield = (trailing12Dist / latestIssue) * 100

    return { totalPaid, avgAnnual, trailingYield }
  }, [performanceKpiData.monthlySeries])

  // Y-axis ticks at every 0.5¢ (0.005 in raw), from 0 to next 0.5¢ above max
  const { yMax, yTicks } = useMemo(() => {
    if (!quarterly.length) return { yMax: 0.02, yTicks: [0, 0.005, 0.01, 0.015, 0.02] }
    const max = Math.max(...quarterly.map(d => d.distribution))
    const step = 0.005 // 0.5¢
    const ceiling = Math.ceil(max / step) * step
    const ticks: number[] = []
    for (let v = 0; v <= ceiling; v = Number((v + step).toFixed(4))) {
      ticks.push(v)
    }
    return { yMax: ceiling, yTicks: ticks }
  }, [quarterly])

  if (!quarterly.length) {
    return <div className={`${CHART_HEIGHT_CLASS.half} w-full bg-sogif-silver-light/50 rounded-lg animate-pulse`} />
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="type-title font-display font-semibold text-sogif-navy">Distributions Paid</h3>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="py-1.5 flex items-center gap-1.5 type-caption text-gray-500">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-sogif-success" />
            Distribution (¢) per Unit
          </div>
          <TimeRangeFilter value={timeRange} onChange={setTimeRange} dateRangeLabel={dateLabel} exclude={['1m']} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 lg:gap-12 lg:items-center">
        <div className="col-span-12 lg:col-span-9">
          <ChartContainer config={{ distribution: { label: 'Distribution', color: CHART_COLORS.success } }} className={`${CHART_HEIGHT_CLASS.half} w-full`}>
            <ResponsiveContainer>
              <BarChart data={quarterly} margin={{ ...CHART_MARGIN, left: 4 }} onMouseLeave={() => setActiveIndex(null)}>
                <CartesianGrid vertical={false} {...GRID_STYLE_LIGHT} />
                <XAxis
                  dataKey="quarter"
                  axisLine={false}
                  tickLine={false}
                  tick={{ style: AXIS_STYLE_LIGHT }}
                />
                <YAxis
                  domain={[0, yMax]}
                  ticks={yTicks}
                  axisLine={false}
                  tickLine={false}
                  tick={{ style: AXIS_STYLE_LIGHT }}
                  tickFormatter={(v) => `${(v * 100).toFixed(1)}¢`}
                  width={48}
                />
                <Bar
                  dataKey="distribution"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={48}
                  isAnimationActive={!hasAnimated.current}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {quarterly.map((_, i) => (
                    <Cell
                      key={i}
                      fill={CHART_COLORS.success}
                      fillOpacity={i === activeIndex ? 1 : 0.95}
                    />
                  ))}
                  <LabelList
                    dataKey="distribution"
                    position="top"
                    content={(props) => {
                      const { x, y, width, value, index } = props as Record<string, number>
                      if (index !== activeIndex || !value) return null
                      return (
                        <text
                          x={x + width / 2}
                          y={y - 8}
                          textAnchor="middle"
                          style={{ fontSize: 13, fontWeight: 600, fill: '#111827' }}
                        >
                          {`${(value * 100).toFixed(1)}¢`}
                        </text>
                      )
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {distStats && (
          <ChartStats
            items={[
              { heading: 'Total Paid', value: `${(distStats.totalPaid * 100).toFixed(1)}¢` },
              { heading: 'Avg. Annual Paid', value: `${(distStats.avgAnnual * 100).toFixed(1)}¢` },
              { heading: 'Trailing Yield', value: `${distStats.trailingYield.toFixed(2)}%` },
            ]}
          />
        )}
      </div>
    </div>
  )
}
