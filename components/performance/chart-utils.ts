import type { MonthlyKpiRow } from '@/lib'

export const CHART_COLORS = {
  green: 'hsl(160, 84%, 39%)',
  greenLight: 'hsl(160, 70%, 50%)',
  cyan: 'hsl(189, 100%, 65%)',
  cyanDark: 'hsl(189, 100%, 22%)',
  cyanMid: 'hsl(189, 85%, 42%)',
  gold: 'hsl(41, 98%, 67%)',
  goldDark: 'hsl(41, 80%, 45%)',
  navy: 'hsl(210, 73%, 16%)',
  navyLight: 'hsl(211, 52%, 25%)',
} as const

// ── Shared Chart Styling ─────────────────────────────────────────────

/** Axis tick style shared across all Recharts axes */
export const AXIS_TICK = {
  style: { fill: 'hsl(210, 12%, 42%)', fontSize: 12, fontFamily: 'inherit' },
} as const

/** Muted fill color for secondary SVG text (e.g. Sankey value labels) */
export const MUTED_FILL = 'hsl(210, 12%, 42%)'

/** Dashed grid for all Recharts charts */
export const GRID_PROPS = {
  strokeDasharray: '3 3',
  stroke: 'hsl(210, 20%, 88%)',
  strokeOpacity: 0.7,
} as const

/** Cursor for line/area chart tooltips */
export const CURSOR_LINE = { stroke: 'hsl(210, 20%, 80%)' } as const

/** Cursor for bar chart tooltips */
export const CURSOR_BAR = { fill: 'hsl(210, 20%, 95%)' } as const

/** Standard chart margin (top, right, left, bottom) */
export const CHART_MARGIN = { top: 10, right: 10, left: -10, bottom: 0 } as const

/** Standard stroke width for primary data lines */
export const STROKE_WIDTH = 2 as const

/** Standard stroke width for stacked area fills */
export const STROKE_WIDTH_STACKED = 1.5 as const

/** Tooltip container classes — use on every chart tooltip wrapper */
export const TOOLTIP_CLASSES = 'rounded-lg border border-gray-200 bg-white px-3 py-2.5 shadow-lg'

/** Tooltip header classes — month/quarter label */
export const TOOLTIP_HEADER = 'mb-1.5 type-caption font-medium text-sogif-navy'

/** Tooltip metric label classes */
export const TOOLTIP_LABEL = 'type-caption text-text-muted'

/** Tooltip metric value classes */
export const TOOLTIP_VALUE = 'type-caption font-medium tabular-nums text-sogif-navy'

/** Legend dot size classes */
export const LEGEND_DOT = 'h-2.5 w-2.5 rounded-full'

/** Gradient stops — standard opacity for area fills */
export const GRADIENT_STOP = { top: 0.45, bottom: 0.05 } as const

export const PIE_COLORS_LIGHT = [
  CHART_COLORS.cyanDark,
  CHART_COLORS.green,
  CHART_COLORS.goldDark,
  CHART_COLORS.navy,
  CHART_COLORS.cyanMid,
] as const

export function formatCurrency(value: number, decimals = 0): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatCompactCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`
  return formatCurrency(value)
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

export function formatMonthTick(month: string): string {
  const [m, y] = month.split('-')
  return `${m} '${y}`
}

export function calculateTickInterval(dataLength: number): number {
  if (dataLength <= 6) return 0
  if (dataLength <= 12) return 1
  if (dataLength <= 24) return 2
  return Math.ceil(dataLength / 8) - 1
}

export interface QuarterData {
  quarter: string
  sortKey: string
  distribution: number
}

export function aggregateToQuarters(monthlySeries: MonthlyKpiRow[]): QuarterData[] {
  const sorted = [...monthlySeries].sort((a, b) => a.sortKey.localeCompare(b.sortKey))
  const quarterMap = new Map<string, { total: number; sortKey: string }>()

  for (const row of sorted) {
    const [year, monthNum] = row.sortKey.split('-')
    const q = Math.ceil(parseInt(monthNum) / 3)
    const label = `Q${q} '${year.slice(-2)}`
    const sk = `${year}-Q${q}`
    const existing = quarterMap.get(label)
    quarterMap.set(label, {
      total: (existing?.total || 0) + row.distribution,
      sortKey: existing?.sortKey || sk,
    })
  }

  return Array.from(quarterMap.entries())
    .map(([quarter, { total, sortKey }]) => ({
      quarter,
      sortKey,
      distribution: Number(total.toFixed(4)),
    }))
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
}

export function sliceTimeSeries<T>(data: T[], range: number | null): T[] {
  if (!range) return data
  return data.slice(-range)
}

// ── Period Range Filtering ─────────────────────────────────────────────

/** Sort-key based range: { start: "2024-01", end: "2025-06" } or null for all */
export type PeriodRange = { start: string; end: string } | null

const MONTH_TO_NUM: Record<string, string> = {
  Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
  Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
}

/** Convert short month label (e.g. "Sep-23") to sortKey ("2023-09") */
export function monthToSortKey(month: string): string {
  const [abbr, yr] = month.split('-')
  return `20${yr}-${MONTH_TO_NUM[abbr] ?? '01'}`
}

/** Filter time-series data by period range using the `month` field (short format) */
export function filterByPeriod<T extends { month: string }>(
  data: T[],
  range: PeriodRange,
): T[] {
  if (!range) return data
  return data.filter(item => {
    const sk = monthToSortKey(item.month)
    return sk >= range.start && sk <= range.end
  })
}
