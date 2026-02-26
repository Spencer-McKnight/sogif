/**
 * Performance Charts — Shared Constants
 *
 * Centralised configuration for all performance page visualisations.
 * Ensures consistent sizing, colours, and formatting across charts.
 */

// ---------------------------------------------------------------------------
// Chart dimensions (used for skeleton / loading placeholders to reduce CLS)
// ---------------------------------------------------------------------------

export const CHART_HEIGHT = {
  full: { mobile: 320, tablet: 420, desktop: 500 },
  half: { mobile: 280, tablet: 340, desktop: 380 },
} as const

export const CHART_HEIGHT_CLASS = {
  full: 'h-[320px] md:h-[420px] lg:h-[500px]',
  half: 'h-[280px] md:h-[340px] lg:h-[380px]',
} as const

// ---------------------------------------------------------------------------
// Colour palette (HSL strings for inline styles / Recharts props)
// ---------------------------------------------------------------------------

export const CHART_COLORS = {
  cyan: 'hsl(189, 100%, 65%)',
  cyanDark: 'hsl(189, 100%, 22%)',
  gold: 'hsl(41, 90%, 61%)',
  success: 'hsl(160, 84%, 39%)',
  navy: 'hsl(211, 52%, 25%)',
  navyLight: 'hsl(211, 52%, 25%)',
  navyLightAlpha: 'hsla(211, 52%, 25%, 0.85)',
  navyDeep: 'hsl(210, 73%, 16%)',
} as const

// Tailwind class equivalents (for elements that use class-based colouring)
export const CHART_COLOR_CLASSES = {
  cyan: 'bg-sogif-cyan-light',
  gold: 'bg-sogif-gold',
  success: 'bg-sogif-success',
  navy: 'bg-sogif-navy-light',
} as const

// ---------------------------------------------------------------------------
// Axis / grid styling tokens
// ---------------------------------------------------------------------------

export const AXIS_STYLE_DARK = {
  fill: 'rgba(255,255,255,0.85)',
  fontSize: 12,
  fontFamily: 'inherit',
} as const

export const AXIS_STYLE_LIGHT = {
  fill: 'rgb(30,41,59)',
  fontSize: 12,
  fontFamily: 'inherit',
} as const

export const GRID_STYLE_DARK = {
  stroke: 'rgba(255,255,255,0.08)',
  strokeDasharray: '3 3',
} as const

export const GRID_STYLE_LIGHT = {
  stroke: 'rgba(15,23,42,0.08)',
  strokeDasharray: '3 3',
} as const

// ---------------------------------------------------------------------------
// Chart container padding (generous, consistent across all charts)
// ---------------------------------------------------------------------------

export const CHART_MARGIN = { top: 16, right: 16, left: 0, bottom: 8 } as const

// ---------------------------------------------------------------------------
// Time-range filter options
// ---------------------------------------------------------------------------

export type TimeRange = 'all' | '24m' | '12m' | '6m' | '1m'

export const TIME_RANGES: { value: TimeRange; label: string; months: number | null }[] = [
  { value: 'all', label: 'Inception', months: null },
  { value: '24m', label: '24M', months: 24 },
  { value: '12m', label: '12M', months: 12 },
  { value: '6m', label: '6M', months: 6 },
  { value: '1m', label: '1M', months: 1 },
]

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

/** Format a month key like "Sep-23" → "Sep '23" */
export function formatMonthLabel(month: string): string {
  const [m, y] = month.split('-')
  return `${m} '${y}`
}

/** Format a dollar value with appropriate precision */
export function formatDollar(value: number, decimals = 2): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`
  }
  return `$${value.toFixed(decimals)}`
}

/** Format a dollar value for FUM (always in millions) */
export function formatFUM(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  }
  return `$${value.toLocaleString()}`
}

/** Format a percentage value */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

/** Filter data array by time range (assumes chronological order, month format "Mon-YY") */
export function filterByTimeRange<T extends { month: string }>(
  data: T[],
  range: TimeRange,
): T[] {
  if (range === 'all' || data.length === 0) return data
  const config = TIME_RANGES.find(r => r.value === range)
  if (!config?.months) return data
  return data.slice(Math.max(0, data.length - config.months))
}

/** Get the date range label from filtered data */
export function getDateRangeLabel(data: { month: string }[]): string {
  if (data.length === 0) return ''
  if (data.length === 1) return formatMonthLabel(data[0].month)
  return `${formatMonthLabel(data[0].month)} – ${formatMonthLabel(data[data.length - 1].month)}`
}

/** Compute smart X-axis ticks: show first point + every Jun/Dec */
export function computeXTicks(data: { month: string }[]): string[] {
  if (data.length === 0) return []
  if (data.length <= 3) return data.map(d => d.month)

  const first = data[0].month
  const reporting = data
    .map(d => d.month)
    .filter(m => {
      const month = m.split('-')[0]
      return month === 'Jun' || month === 'Dec'
    })

  if (!reporting.includes(first)) {
    return [first, ...reporting]
  }
  return reporting
}
