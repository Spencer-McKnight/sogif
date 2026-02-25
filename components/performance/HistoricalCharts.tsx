'use client'

import { ChartContainer, ChartTooltip } from '@/components/ui'
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts'
import type { TooltipProps } from 'recharts'
import type { MonthlyKpiRow, KpiTimeSeries } from '@/lib'
import {
  CHART_COLORS, formatCompactCurrency, formatMonthTick,
  calculateTickInterval, aggregateToQuarters, filterByPeriod,
  AXIS_TICK, GRID_PROPS, CURSOR_LINE, CURSOR_BAR, CHART_MARGIN, STROKE_WIDTH,
  TOOLTIP_CLASSES, TOOLTIP_HEADER, TOOLTIP_LABEL,
  type QuarterData, type PeriodRange,
} from './chart-utils'

interface HistoricalChartsProps {
  timeSeries: KpiTimeSeries
  monthlySeries: MonthlyKpiRow[]
  periodRange: PeriodRange
}

const fumConfig = { fum: { label: 'Funds Under Management', color: CHART_COLORS.green } }
const distConfig = { distribution: { label: 'Distribution', color: CHART_COLORS.green } }

function FumTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const data = payload[0]?.payload as { month: string; value: number } | undefined
  if (!data) return null
  return (
    <div className={TOOLTIP_CLASSES}>
      <p className={TOOLTIP_HEADER}>{formatMonthTick(data.month)}</p>
      <p className={TOOLTIP_LABEL}>FUM: {formatCompactCurrency(data.value)}</p>
    </div>
  )
}

function DistTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const data = payload[0]?.payload as QuarterData | undefined
  if (!data) return null
  return (
    <div className={TOOLTIP_CLASSES}>
      <p className={TOOLTIP_HEADER}>{data.quarter}</p>
      <p className={TOOLTIP_LABEL}>Distribution: ${data.distribution.toFixed(4)}</p>
    </div>
  )
}

export function HistoricalCharts({ timeSeries, monthlySeries, periodRange }: HistoricalChartsProps) {
  const fumData = filterByPeriod(timeSeries.fum, periodRange)

  const filteredMonthly = periodRange
    ? monthlySeries.filter(r => r.sortKey >= periodRange.start && r.sortKey <= periodRange.end)
    : monthlySeries
  const quarterData = aggregateToQuarters(filteredMonthly)

  return (
    <div className="grid grid-cols-12 gap-8 lg:gap-12">
      {/* FUM Line Chart */}
      <div className="col-span-12 lg:col-span-6">
        <h3 className="type-title font-display text-sogif-navy mb-2">Funds Under Management</h3>
        <p className="type-caption text-text-muted mb-6">Total fund value over time</p>
        <ChartContainer config={fumConfig} className="h-[260px] md:h-[300px] w-full">
          <ResponsiveContainer>
            <LineChart data={fumData} margin={CHART_MARGIN}>
              <CartesianGrid {...GRID_PROPS} />
              <XAxis
                dataKey="month" axisLine={false} tickLine={false}
                tick={AXIS_TICK}
                interval={calculateTickInterval(fumData.length)}
                tickFormatter={formatMonthTick}
              />
              <YAxis
                axisLine={false} tickLine={false} tick={AXIS_TICK}
                tickFormatter={formatCompactCurrency}
              />
              <ChartTooltip content={<FumTooltip />} cursor={CURSOR_LINE} />
              <Line
                type="monotone" dataKey="value"
                stroke={CHART_COLORS.green} strokeWidth={STROKE_WIDTH}
                dot={false} activeDot={{ r: 5, fill: CHART_COLORS.green, stroke: 'white', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Distributions Bar Chart */}
      <div className="col-span-12 lg:col-span-6">
        <h3 className="type-title font-display text-sogif-navy mb-2">Distributions</h3>
        <p className="type-caption text-text-muted mb-6">Quarterly distributions per unit</p>
        {quarterData.length > 0 ? (
          <ChartContainer config={distConfig} className="h-[260px] md:h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={quarterData} margin={CHART_MARGIN}>
                <CartesianGrid {...GRID_PROPS} />
                <XAxis
                  dataKey="quarter" axisLine={false} tickLine={false}
                  tick={AXIS_TICK}
                  interval={0}
                  angle={quarterData.length > 8 ? -45 : 0}
                  textAnchor={quarterData.length > 8 ? 'end' : 'middle'}
                  height={quarterData.length > 8 ? 50 : 30}
                />
                <YAxis
                  axisLine={false} tickLine={false} tick={AXIS_TICK}
                  tickFormatter={(v) => `$${v.toFixed(3)}`}
                />
                <ChartTooltip content={<DistTooltip />} cursor={CURSOR_BAR} />
                <Bar dataKey="distribution" fill={CHART_COLORS.green} radius={[4, 4, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="h-[260px] flex items-center justify-center text-text-muted type-caption">
            No distribution data available
          </div>
        )}
      </div>
    </div>
  )
}
