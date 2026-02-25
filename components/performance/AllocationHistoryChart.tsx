'use client'

import { ChartContainer, ChartTooltip } from '@/components/ui'
import {
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts'
import type { TooltipProps } from 'recharts'
import type { KpiTimeSeries } from '@/lib'
import {
  CHART_COLORS, formatCompactCurrency, formatMonthTick,
  calculateTickInterval, filterByPeriod,
  AXIS_TICK, GRID_PROPS, CURSOR_LINE, CHART_MARGIN, STROKE_WIDTH_STACKED,
  TOOLTIP_CLASSES, TOOLTIP_HEADER, TOOLTIP_LABEL, TOOLTIP_VALUE, LEGEND_DOT,
  GRADIENT_STOP,
  type PeriodRange,
} from './chart-utils'

interface AllocationHistoryChartProps {
  timeSeries: KpiTimeSeries
  periodRange: PeriodRange
}

const allocConfig = {
  cash: { label: 'Cash', color: CHART_COLORS.gold },
  efficient: { label: 'Efficient', color: CHART_COLORS.green },
  inefficient: { label: 'Inefficient', color: CHART_COLORS.cyan },
}

function AllocTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const data = payload[0]?.payload as { month: string; cash: number; efficient: number; inefficient: number } | undefined
  if (!data) return null
  return (
    <div className={TOOLTIP_CLASSES}>
      <p className={TOOLTIP_HEADER}>{formatMonthTick(data.month)}</p>
      <div className="space-y-1">
        {[
          { label: 'Cash', value: data.cash, color: CHART_COLORS.gold },
          { label: 'Efficient', value: data.efficient, color: CHART_COLORS.green },
          { label: 'Inefficient', value: data.inefficient, color: CHART_COLORS.cyan },
        ].map(item => (
          <div key={item.label} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5">
              <span className={LEGEND_DOT} style={{ backgroundColor: item.color }} />
              <span className={TOOLTIP_LABEL}>{item.label}</span>
            </span>
            <span className={TOOLTIP_VALUE}>{formatCompactCurrency(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AllocationHistoryChart({ timeSeries, periodRange }: AllocationHistoryChartProps) {
  const allocData = filterByPeriod(timeSeries.assetAllocation, periodRange)

  return (
    <div>
      <h3 className="type-title font-display text-sogif-navy mb-2">Capital Allocation History</h3>
      <p className="type-caption text-text-muted mb-6">Cash, efficient and inefficient assets over time</p>
      <ChartContainer config={allocConfig} className="h-[260px] md:h-[300px] w-full">
        <ResponsiveContainer>
          <AreaChart data={allocData} margin={CHART_MARGIN}>
            <defs>
              <linearGradient id="allocCashGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.gold} stopOpacity={GRADIENT_STOP.top} />
                <stop offset="95%" stopColor={CHART_COLORS.gold} stopOpacity={GRADIENT_STOP.bottom} />
              </linearGradient>
              <linearGradient id="allocEfficientGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.green} stopOpacity={GRADIENT_STOP.top} />
                <stop offset="95%" stopColor={CHART_COLORS.green} stopOpacity={GRADIENT_STOP.bottom} />
              </linearGradient>
              <linearGradient id="allocInefficientGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.cyan} stopOpacity={GRADIENT_STOP.top} />
                <stop offset="95%" stopColor={CHART_COLORS.cyan} stopOpacity={GRADIENT_STOP.bottom} />
              </linearGradient>
            </defs>
            <CartesianGrid {...GRID_PROPS} />
            <XAxis
              dataKey="month" axisLine={false} tickLine={false}
              tick={AXIS_TICK}
              interval={calculateTickInterval(allocData.length)}
              tickFormatter={formatMonthTick}
            />
            <YAxis
              axisLine={false} tickLine={false} tick={AXIS_TICK}
              tickFormatter={formatCompactCurrency}
            />
            <ChartTooltip content={<AllocTooltip />} cursor={CURSOR_LINE} />
            <Area type="monotone" dataKey="inefficient" stackId="1" stroke={CHART_COLORS.cyan} strokeWidth={STROKE_WIDTH_STACKED} fill="url(#allocInefficientGrad)" />
            <Area type="monotone" dataKey="efficient" stackId="1" stroke={CHART_COLORS.green} strokeWidth={STROKE_WIDTH_STACKED} fill="url(#allocEfficientGrad)" />
            <Area type="monotone" dataKey="cash" stackId="1" stroke={CHART_COLORS.gold} strokeWidth={STROKE_WIDTH_STACKED} fill="url(#allocCashGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="flex items-center justify-center gap-4 mt-3">
        {[
          { label: 'Cash', color: CHART_COLORS.gold },
          { label: 'Efficient', color: CHART_COLORS.green },
          { label: 'Inefficient', color: CHART_COLORS.cyan },
        ].map(item => (
          <span key={item.label} className="flex items-center gap-1.5 type-caption text-text-muted">
            <span className={LEGEND_DOT} style={{ backgroundColor: item.color }} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}
