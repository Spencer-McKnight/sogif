'use client'

import { useMemo } from 'react'
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts'
import type { TooltipProps } from 'recharts'
import { ChartContainer, ChartTooltip } from '@/components/ui'
import { usePerformance, useConstants } from '@/lib'
import { ChartTooltipContent } from './ChartTooltipContent'
import {
  CHART_COLORS,
  CHART_HEIGHT_CLASS,
  AXIS_STYLE_LIGHT,
  GRID_STYLE_LIGHT,
  CHART_MARGIN,
} from './chart-constants'

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
// Tooltip
// ---------------------------------------------------------------------------

function DistributionTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const data = payload[0]?.payload as QuarterlyData | undefined
  if (!data) return null

  return (
    <ChartTooltipContent
      month={data.month}
      metrics={[
        {
          label: data.quarter,
          value: data.distribution > 0 ? `${(data.distribution * 100).toFixed(2)}¢` : 'Nil',
          color: CHART_COLORS.success,
        },
      ]}
      dark={false}
    />
  )
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

export function DistributionsChart() {
  const { chartData } = usePerformance()
  const { performanceKpiData } = useConstants()

  const quarterly = useMemo(
    () => aggregateQuarterly(chartData, performanceKpiData.monthlySeries).filter(q => q.distribution > 0),
    [chartData, performanceKpiData.monthlySeries],
  )

  const yMax = useMemo(() => {
    if (!quarterly.length) return 0.02
    const max = Math.max(...quarterly.map(d => d.distribution))
    return Math.ceil(max * 200) / 200 // snap to 0.005
  }, [quarterly])

  if (!quarterly.length) {
    return <div className={`${CHART_HEIGHT_CLASS.half} w-full bg-sogif-silver-light/50 rounded-lg animate-pulse`} />
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="type-title font-display font-semibold text-gray-900 mb-3">Quarterly Distributions / Quarter</h3>
        <div className="py-1.5 flex items-center gap-1.5 type-caption text-gray-500">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-sogif-success" />
          Distribution per unit
        </div>
      </div>

      <ChartContainer config={{ distribution: { label: 'Distribution', color: CHART_COLORS.success } }} className={`${CHART_HEIGHT_CLASS.half} w-full`}>
        <ResponsiveContainer>
          <BarChart data={quarterly} margin={{ ...CHART_MARGIN, left: 4 }}>
            <CartesianGrid vertical={false} {...GRID_STYLE_LIGHT} />
            <XAxis
              dataKey="quarter"
              axisLine={false}
              tickLine={false}
              tick={{ style: AXIS_STYLE_LIGHT }}
            />
            <YAxis
              domain={[0, yMax]}
              axisLine={false}
              tickLine={false}
              tick={{ style: AXIS_STYLE_LIGHT }}
              tickFormatter={(v) => `${(v * 100).toFixed(1)}¢`}
              width={48}
            />
            <ChartTooltip
              content={<DistributionTooltip />}
              cursor={{ fill: 'rgba(0,0,0,0.04)' }}
            />
            <Bar dataKey="distribution" radius={[4, 4, 0, 0]} maxBarSize={48} fill={CHART_COLORS.success} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
