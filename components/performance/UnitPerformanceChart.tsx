'use client'

import { ChartContainer, ChartTooltip } from '@/components/ui'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ReferenceDot, ResponsiveContainer } from 'recharts'
import type { TooltipProps } from 'recharts'
import type { ChartDataPoint, YAxisConfig, SpecialPoints } from '@/lib'
import {
  CHART_COLORS, formatMonthTick, calculateTickInterval,
  AXIS_TICK, GRID_PROPS, CURSOR_LINE, CHART_MARGIN, STROKE_WIDTH,
  TOOLTIP_CLASSES, TOOLTIP_HEADER, TOOLTIP_LABEL, TOOLTIP_VALUE, LEGEND_DOT,
  GRADIENT_STOP,
} from './chart-utils'

interface UnitPerformanceChartProps {
  chartData: ChartDataPoint[]
  annotatedData: ChartDataPoint[]
  yAxisConfig: YAxisConfig
  specialPoints: SpecialPoints
}

const chartConfig = {
  issuePrice: { label: 'Issue Price', color: CHART_COLORS.cyan },
  redemptionPrice: { label: 'Redemption Price', color: CHART_COLORS.gold },
  cumulativeReturn: { label: 'Cumulative Return', color: CHART_COLORS.green },
}

const TOOLTIP_METRICS = [
  { key: 'cumulativeReturn', label: 'Cumulative', color: CHART_COLORS.green },
  { key: 'issuePrice', label: 'Issue Price', color: CHART_COLORS.cyan },
  { key: 'redemptionPrice', label: 'Redemption', color: CHART_COLORS.gold },
] as const

function Tooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const data = payload[0]?.payload as ChartDataPoint | undefined
  if (!data) return null

  return (
    <div className={TOOLTIP_CLASSES}>
      <p className={TOOLTIP_HEADER}>{formatMonthTick(data.month)}</p>
      <div className="space-y-1.5">
        {TOOLTIP_METRICS.map(({ key, label, color }) => {
          const value = data[key as keyof ChartDataPoint] as number | undefined
          if (value === undefined || value === 0) return null
          return (
            <div key={key} className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className={LEGEND_DOT} style={{ backgroundColor: color }} />
                <span className={TOOLTIP_LABEL}>{label}</span>
              </div>
              <span className={TOOLTIP_VALUE}>
                ${(value as number).toFixed(4)}
              </span>
            </div>
          )
        })}
      </div>
      {data.annotation && (
        <p className="mt-2 pt-2 border-t border-gray-200 type-caption text-text-muted max-w-[220px]">
          {data.annotation.text}
        </p>
      )}
    </div>
  )
}

function ChartIndicator({ cx, cy, color }: { cx?: number; cy?: number; color: string }) {
  if (cx === undefined || cy === undefined) return null
  return (
    <g>
      <circle cx={cx} cy={cy} r={7} fill={color} stroke="white" strokeWidth={2} />
      <circle cx={cx} cy={cy} r={2.5} fill="white" />
    </g>
  )
}

export function UnitPerformanceChart({
  chartData,
  annotatedData,
  yAxisConfig,
  specialPoints,
}: UnitPerformanceChartProps) {
  const { domain: yDomain, ticks: yTicks } = yAxisConfig
  const { firstRedemption, firstDistribution, acquisitionPoint } = specialPoints

  if (!chartData.length) {
    return <div className="h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center text-text-muted type-support">No performance data available</div>
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-4 type-caption text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className={`inline-block ${LEGEND_DOT}`} style={{ backgroundColor: CHART_COLORS.cyan }} />
          Issue Price
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`inline-block ${LEGEND_DOT}`} style={{ backgroundColor: CHART_COLORS.gold }} />
          Redemption
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`inline-block ${LEGEND_DOT}`} style={{ backgroundColor: CHART_COLORS.green }} />
          Cumulative
        </span>
      </div>

      <ChartContainer config={chartConfig} className="h-[300px] md:h-[400px] lg:h-[500px] w-full">
        <ResponsiveContainer>
          <AreaChart data={annotatedData} margin={CHART_MARGIN}>
            <defs>
              <linearGradient id="perfRedemptionGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.gold} stopOpacity={GRADIENT_STOP.top} />
                <stop offset="95%" stopColor={CHART_COLORS.gold} stopOpacity={GRADIENT_STOP.bottom} />
              </linearGradient>
              <linearGradient id="perfIssueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.cyan} stopOpacity={GRADIENT_STOP.top} />
                <stop offset="95%" stopColor={CHART_COLORS.cyan} stopOpacity={GRADIENT_STOP.bottom} />
              </linearGradient>
              <linearGradient id="perfCumulativeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.green} stopOpacity={GRADIENT_STOP.top} />
                <stop offset="95%" stopColor={CHART_COLORS.green} stopOpacity={GRADIENT_STOP.bottom} />
              </linearGradient>
            </defs>
            <CartesianGrid {...GRID_PROPS} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={AXIS_TICK}
              interval={calculateTickInterval(chartData.length)}
              tickFormatter={formatMonthTick}
            />
            <YAxis
              domain={yDomain}
              ticks={yTicks}
              axisLine={false}
              tickLine={false}
              tick={AXIS_TICK}
              tickFormatter={(v) => `$${v.toFixed(2)}`}
            />
            <ChartTooltip content={<Tooltip />} cursor={CURSOR_LINE} />
            <Area type="monotone" dataKey="redemptionPrice" stroke={CHART_COLORS.gold} strokeWidth={STROKE_WIDTH} fill="url(#perfRedemptionGrad)" />
            <Area type="monotone" dataKey="issuePrice" stroke={CHART_COLORS.cyan} strokeWidth={STROKE_WIDTH} fill="url(#perfIssueGrad)" />
            <Area type="monotone" dataKey="cumulativeReturn" stroke={CHART_COLORS.green} strokeWidth={STROKE_WIDTH} fill="url(#perfCumulativeGrad)" />
            {firstRedemption && (
              <ReferenceDot
                x={firstRedemption.month}
                y={firstRedemption.redemptionPrice}
                shape={(props) => <ChartIndicator {...props} color={CHART_COLORS.gold} />}
              />
            )}
            {firstDistribution && (
              <ReferenceDot
                x={firstDistribution.month}
                y={firstDistribution.cumulativeReturn}
                shape={(props) => <ChartIndicator {...props} color={CHART_COLORS.green} />}
              />
            )}
            {acquisitionPoint && (
              <ReferenceDot
                x={acquisitionPoint.month}
                y={acquisitionPoint.issuePrice}
                shape={(props) => <ChartIndicator {...props} color={CHART_COLORS.cyan} />}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
