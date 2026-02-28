/**
 * Performance Data Calculation Utilities
 *
 * Pure functions for computing financial metrics from raw performance data.
 * These functions are deterministic and side-effect free, designed for both
 * server-side pre-computation and client-side recalculation.
 *
 * Performance considerations:
 * - All functions perform single-pass iterations where possible
 * - Data is reversed only once to avoid repeated allocations
 * - Early returns for empty data sets
 * - Numeric precision maintained through explicit rounding
 */

import type { PerformanceDataRow } from '../types/datocms'

export interface ChartAnnotation {
  text: string
  color: string
}

export interface ChartDataPoint {
  month: string
  issuePrice: number
  redemptionPrice: number | undefined
  cumulativeReturn: number
  distribution: number
  cumulativeDistribution: number
  annotation?: ChartAnnotation
}

export interface PerformanceStats {
  latestRedemption: number | null
  latestIssue: number
  capitalGrowthInception: number
  capitalGrowthPrevYear: number
  distributionsInception: number
  distributionsPrevYear: number
  cumulativeInception: number
  cumulativePrevYear: number
}

export interface YAxisConfig {
  domain: [number, number]
  ticks: number[]
}

export interface SpecialPoints {
  firstRedemption?: ChartDataPoint
  firstDistribution?: ChartDataPoint
  acquisitionPoint?: ChartDataPoint
}

export interface ComputedPerformanceData {
  raw: PerformanceDataRow[]
  chartData: ChartDataPoint[]
  annotatedChartData: ChartDataPoint[]
  stats: PerformanceStats
  yAxisConfig: YAxisConfig
  specialPoints: SpecialPoints
}

/**
 * Transforms raw DatoCMS data to include cumulative return calculation
 * Single pass through data - O(n) time complexity
 *
 * @param data - Raw performance data rows (assumed newest-first from CMS)
 * @returns Array of chart data points with cumulative calculations
 */
export function calculateChartData(data: PerformanceDataRow[]): ChartDataPoint[] {
  if (!data.length) return []

  // Reverse once to convert to chronological order (oldest first)
  const chronological = [...data].reverse()
  const chartData: ChartDataPoint[] = []
  let cumulativeDistribution = 0

  // Single pass through chronological data
  for (const item of chronological) {
    cumulativeDistribution += item.distribution

    // Convert 0 or null to undefined - Recharts needs undefined to skip missing values
    const redemptionValue = (item.redemptionPrice === 0 || item.redemptionPrice === null) ? undefined : item.redemptionPrice

    chartData.push({
      month: item.month,
      issuePrice: item.issuePrice,
      redemptionPrice: redemptionValue,
      cumulativeReturn: Number((item.issuePrice + cumulativeDistribution).toFixed(4)),
      distribution: item.distribution,
      cumulativeDistribution: Number(cumulativeDistribution.toFixed(4)),
    })
  }

  return chartData
}

/**
 * Calculate summary statistics from the performance data
 *
 * Capital Growth = price-only return (no distributions)
 * Distributions  = raw dollar totals
 * Cumulative     = cumulative value (growth + distributions)
 *
 * Optimizations:
 * - Single pass to sum all distributions
 * - Early return for empty data
 * - Reuses chronological reversal if needed
 *
 * @param data - Raw performance data rows (newest-first)
 * @returns Statistics object with inception and trailing 12-month metrics
 */
export function calculateStats(data: PerformanceDataRow[]): PerformanceStats {
  if (!data.length) {
    return {
      latestRedemption: null,
      latestIssue: 0,
      capitalGrowthInception: 0,
      capitalGrowthPrevYear: 0,
      distributionsInception: 0,
      distributionsPrevYear: 0,
      cumulativeInception: 0,
      cumulativePrevYear: 0,
    }
  }

  const latest = data[0] // Most recent (data is newest first)
  const chronological = [...data].reverse()
  const inception = chronological[0]

  // Single pass to calculate total distributions
  let totalDistributions = 0
  for (const item of data) {
    totalDistributions += item.distribution
  }

  // Since Inception - cumulative return uses issuePrice + ALL distributions
  const capitalGrowthInception = ((latest.issuePrice - inception.issuePrice) / inception.issuePrice) * 100
  const distributionsInception = totalDistributions
  const cumulativeInception = ((latest.issuePrice + totalDistributions - inception.issuePrice) / inception.issuePrice) * 100

  // True trailing 12-month (T12M): startPoint = same month 12 months prior
  // data[12] gives exactly 12 intervals from current to 12 months ago
  const startPointIndex = Math.min(12, data.length - 1)
  const startPoint = data[startPointIndex]

  // Calculate trailing 12-month distributions
  let trailing12Distributions = 0
  for (let i = 0; i < Math.min(12, data.length - 1); i++) {
    trailing12Distributions += data[i].distribution
  }

  // Calculate cumulative distributions up to the start point
  // Find where startPoint is in the original data array
  const distributionsToStartPoint = data.slice(startPointIndex).reduce((sum, item) => sum + item.distribution, 0)
  const startCumulative = startPoint.issuePrice + distributionsToStartPoint
  const latestCumulative = latest.issuePrice + totalDistributions

  const capitalGrowthPrevYear = ((latest.issuePrice - startPoint.issuePrice) / startPoint.issuePrice) * 100
  const distributionsPrevYear = trailing12Distributions
  const cumulativePrevYear = ((latestCumulative - startCumulative) / startCumulative) * 100

  return {
    latestRedemption: latest.redemptionPrice,
    latestIssue: latest.issuePrice,
    capitalGrowthInception,
    capitalGrowthPrevYear,
    distributionsInception,
    distributionsPrevYear,
    cumulativeInception,
    cumulativePrevYear,
  }
}

/**
 * Calculate Y-axis domain and tick values for the chart
 * Uses 0.05 step intervals aligned with financial data conventions
 *
 * Performance: Single pass through chart data to find min/max
 *
 * @param chartData - Computed chart data points
 * @returns Domain tuple and array of tick values
 */
export function calculateYAxisConfig(chartData: ChartDataPoint[]): YAxisConfig {
  if (!chartData.length) {
    return {
      domain: [0.9, 1.2],
      ticks: [0.9, 0.95, 1.0, 1.05, 1.1, 1.15, 1.2],
    }
  }

  // Single pass to find min/max across all price types
  let min = Infinity
  let max = -Infinity

  for (const d of chartData) {
    min = Math.min(min, d.issuePrice, d.cumulativeReturn)
    max = Math.max(max, d.issuePrice, d.cumulativeReturn)

    if (d.redemptionPrice !== undefined) {
      min = Math.min(min, d.redemptionPrice)
      max = Math.max(max, d.redemptionPrice)
    }
  }

  // Snap to 0.05 boundaries with padding
  const domainMin = Math.floor((min - 0.02) / 0.05) * 0.05
  const domainMax = Math.ceil((max + 0.02) / 0.05) * 0.05

  // Generate ticks at every 0.05 step
  const ticks: number[] = []
  for (let v = domainMin; v <= domainMax + 0.001; v += 0.05) {
    ticks.push(Math.round(v * 100) / 100)
  }

  return {
    domain: [domainMin, domainMax],
    ticks,
  }
}

/**
 * Annotate chart data with special point descriptions
 * Marks significant events (first redemption, first distribution, aggressive acquisition)
 *
 * @param chartData - Chart data points to annotate
 * @returns Annotated chart data with tooltip information
 */
export function annotateChartData(chartData: ChartDataPoint[]): ChartDataPoint[] {
  // Early return for empty data
  if (!chartData.length) return []

  // Find first redemption month in single pass
  let firstRedemptionMonth: string | undefined
  for (const d of chartData) {
    if (d.redemptionPrice !== undefined && !firstRedemptionMonth) {
      firstRedemptionMonth = d.month
      break
    }
  }

  // Annotate with mutable operation only where needed
  return chartData.map(d => {
    if (d.month === firstRedemptionMonth) {
      return {
        ...d,
        annotation: {
          text: 'No property was acquired until the minimum subscription was achieved. Accordingly, there was no redemption price prior to December 2023.',
          color: 'hsl(41, 90%, 61%)',
        },
      }
    }
    if (d.month === 'May-24') {
      return {
        ...d,
        annotation: {
          text: 'First quarterly distribution began here',
          color: 'hsl(160, 84%, 39%)',
        },
      }
    }
    return d
  })
}

/**
 * Orchestrate all performance metric calculations in one call
 * Designed for server-side pre-computation during data fetch
 *
 * This function performs all calculations once and returns a complete,
 * reusable data structure. Avoids redundant recalculation on client.
 *
 * Performance: O(n) - single conceptual pass despite multiple functions
 *
 * @param rawData - Raw performance data rows from CMS
 * @returns Complete computed performance metrics object
 */
export function computePerformanceMetrics(rawData: PerformanceDataRow[]): ComputedPerformanceData {
  const chartData = calculateChartData(rawData)
  const stats = calculateStats(rawData)
  const yAxisConfig = calculateYAxisConfig(chartData)
  const annotatedChartData = annotateChartData(chartData)

  // Extract special points for indicators in single pass
  let firstRedemption: ChartDataPoint | undefined
  let firstDistribution: ChartDataPoint | undefined
  let acquisitionPoint: ChartDataPoint | undefined

  for (const d of annotatedChartData) {
    if (d.redemptionPrice !== undefined && !firstRedemption) {
      firstRedemption = d
    }
    if (d.month === 'May-24' && !firstDistribution) {
      firstDistribution = d
    }
  }

  return {
    raw: rawData,
    chartData,
    annotatedChartData,
    stats,
    yAxisConfig,
    specialPoints: {
      firstRedemption,
      firstDistribution,
      acquisitionPoint,
    },
  }
}
