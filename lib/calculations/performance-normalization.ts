/**
 * Performance Data Normalization Utilities
 *
 * Pure functions for parsing and normalizing the KPI CSV data into
 * strongly-typed structures. Handles embedded JSON fields, currency parsing,
 * and month format conversion.
 *
 * All functions are deterministic and side-effect free.
 */

import type {
  RawKpiCsvRow,
  KpiBreakdownField,
  NormalizedBreakdown,
  MonthlyKpiRow,
  LatestKpiSnapshot,
  KpiTimeSeries,
  PerformanceKpiMaster,
  PerformanceDataRow,
  AssetAllocation,
  EfficientAssetsAllocation,
  EfficientAssetsByType,
  InefficientByState,
  InefficientByIndustry,
  InefficientByLocation,
} from '../types/datocms'

const MONTH_ABBREV: Record<string, string> = {
  january: 'Jan',
  february: 'Feb',
  march: 'Mar',
  april: 'Apr',
  may: 'May',
  june: 'Jun',
  july: 'Jul',
  august: 'Aug',
  september: 'Sep',
  october: 'Oct',
  november: 'Nov',
  december: 'Dec',
}

const MONTH_INDEX: Record<string, string> = {
  january: '01',
  february: '02',
  march: '03',
  april: '04',
  may: '05',
  june: '06',
  july: '07',
  august: '08',
  september: '09',
  october: '10',
  november: '11',
  december: '12',
}

/**
 * Parse a month label like "September 2023" into a short format and sortable key
 *
 * @param monthLabel - Full month label (e.g., "September 2023")
 * @returns Object with short format ("Sep-23") and sortable key ("2023-09")
 */
export function parseMonthLabel(monthLabel: string): { short: string; sortKey: string } | null {
  if (!monthLabel || typeof monthLabel !== 'string') {
    return null
  }

  const trimmed = monthLabel.trim()
  const match = trimmed.match(/^(\w+)\s+(\d{4})$/)

  if (!match) {
    return null
  }

  const [, monthName, year] = match
  const monthLower = monthName.toLowerCase()
  const abbrev = MONTH_ABBREV[monthLower]
  const monthNum = MONTH_INDEX[monthLower]

  if (!abbrev || !monthNum) {
    return null
  }

  const yearShort = year.slice(-2)
  return {
    short: `${abbrev}-${yearShort}`,
    sortKey: `${year}-${monthNum}`,
  }
}

/**
 * Parse a money-like string into a number
 * Handles formats: "$62,041,225", " $1.0562 ", "1.0562", empty strings
 *
 * @param value - String value to parse
 * @returns Parsed number or 0 for invalid/empty values
 */
export function parseMoneyLike(value: string | undefined | null): number {
  if (value === undefined || value === null || value === '') {
    return 0
  }

  const cleaned = String(value)
    .replace(/[$,\s"]/g, '')
    .trim()

  if (cleaned === '') {
    return 0
  }

  const num = parseFloat(cleaned)
  return isNaN(num) ? 0 : num
}

/**
 * Parse an embedded JSON field from CSV
 * Handles malformed JSON, empty strings, and type coercion
 *
 * @param jsonString - JSON string from CSV field
 * @returns Parsed KpiBreakdownField or null for invalid data
 */
export function parseEmbeddedJsonField(jsonString: string | undefined | null): KpiBreakdownField | null {
  if (!jsonString || typeof jsonString !== 'string') {
    return null
  }

  const trimmed = jsonString.trim()
  if (trimmed === '' || trimmed === '""') {
    return null
  }

  try {
    const parsed = JSON.parse(trimmed)

    if (!parsed || typeof parsed !== 'object') {
      return null
    }

    const { data, type, title } = parsed

    if (!data || typeof data !== 'object') {
      return null
    }

    return {
      title: String(title || ''),
      type: type === 'percentage' ? 'percentage' : 'dollar',
      data: data as Record<string, string | number>,
    }
  } catch {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[KPI Normalization] Failed to parse JSON field:', jsonString.slice(0, 100))
    }
    return null
  }
}

/**
 * Normalize a breakdown field to have numeric values and compute total
 *
 * @param field - Parsed breakdown field
 * @returns Normalized breakdown with numeric data and total
 */
export function normalizeBreakdown(field: KpiBreakdownField | null): NormalizedBreakdown | null {
  if (!field) {
    return null
  }

  const numericData: Record<string, number> = {}
  let total = 0

  for (const [key, value] of Object.entries(field.data)) {
    const num = typeof value === 'number' ? value : parseMoneyLike(String(value))
    numericData[key] = num
    total += num
  }

  return {
    title: field.title,
    type: field.type,
    data: numericData,
    total,
  }
}

/**
 * Extract efficient assets allocation from normalized breakdown
 */
function extractEfficientAssetsAllocation(breakdown: NormalizedBreakdown | null): EfficientAssetsAllocation {
  const defaults: EfficientAssetsAllocation = {
    dimensionalFunds: 0,
    vanguard: 0,
  }

  if (!breakdown) return defaults

  return {
    dimensionalFunds: breakdown.data['Dimensional Funds Australia'] ?? breakdown.data['Dimensional Funds'] ?? 0,
    vanguard: breakdown.data['Vanguard Australia'] ?? breakdown.data['Vanguard'] ?? 0,
  }
}

/**
 * Extract efficient assets by type (international vs australian)
 */
function extractEfficientAssetsByType(breakdown: NormalizedBreakdown | null): EfficientAssetsByType {
  const defaults: EfficientAssetsByType = {
    international: 0,
    australian: 0,
  }

  if (!breakdown) return defaults

  return {
    international: breakdown.data['International'] ?? 0,
    australian: breakdown.data['Australian'] ?? 0,
  }
}

/**
 * Extract inefficient assets by state
 */
function extractInefficientByState(breakdown: NormalizedBreakdown | null): InefficientByState {
  const defaults: InefficientByState = {
    qld: 0,
    tas: 0,
    vic: 0,
    nsw: 0,
    wa: 0,
    sa: 0,
    nt: 0,
    act: 0,
  }

  if (!breakdown) return defaults

  return {
    qld: breakdown.data['QLD'] ?? 0,
    tas: breakdown.data['TAS'] ?? 0,
    vic: breakdown.data['VIC'] ?? 0,
    nsw: breakdown.data['NSW'] ?? 0,
    wa: breakdown.data['WA'] ?? 0,
    sa: breakdown.data['SA'] ?? 0,
    nt: breakdown.data['NT'] ?? 0,
    act: breakdown.data['ACT'] ?? 0,
  }
}

/**
 * Extract inefficient assets by industry
 */
function extractInefficientByIndustry(breakdown: NormalizedBreakdown | null): InefficientByIndustry {
  const defaults: InefficientByIndustry = {
    retail: 0,
    industrial: 0,
    office: 0,
    residential: 0,
    other: 0,
  }

  if (!breakdown) return defaults

  return {
    retail: breakdown.data['Retail'] ?? 0,
    industrial: breakdown.data['Industrial'] ?? 0,
    office: breakdown.data['Office'] ?? 0,
    residential: breakdown.data['Residential'] ?? 0,
    other: breakdown.data['Other'] ?? 0,
  }
}

/**
 * Extract inefficient assets by location
 */
function extractInefficientByLocation(breakdown: NormalizedBreakdown | null): InefficientByLocation {
  const defaults: InefficientByLocation = {
    metro: 0,
    regional: 0,
  }

  if (!breakdown) return defaults

  return {
    metro: breakdown.data['Metro'] ?? 0,
    regional: breakdown.data['Regional'] ?? 0,
  }
}

/**
 * Extract asset allocation
 */
function extractAssetAllocation(breakdown: NormalizedBreakdown | null): AssetAllocation {
  const defaults: AssetAllocation = {
    cash: 0,
    efficient: 0,
    inefficient: 0,
    total: 0,
  }

  if (!breakdown) return defaults

  const cash = breakdown.data['Cash'] ?? 0
  const efficient = breakdown.data['Efficient'] ?? 0
  const inefficient = breakdown.data['Inefficient'] ?? 0

  return {
    cash,
    efficient,
    inefficient,
    total: cash + efficient + inefficient,
  }
}

/**
 * Check if a row has valid data (non-empty pricing fields)
 */
function isValidDataRow(row: RawKpiCsvRow): boolean {
  const hasMonth = Boolean(row.Month && row.Month.trim() !== '')
  const hasIssuePrice = Boolean(row.issueprice && row.issueprice.trim() !== '' && row.issueprice.trim() !== '0.0000')

  return hasMonth && hasIssuePrice
}

/**
 * Normalize a single raw CSV row into a typed MonthlyKpiRow
 *
 * @param raw - Raw CSV row from papaparse
 * @returns Normalized monthly KPI row or null for invalid rows
 */
export function normalizeKpiRow(raw: RawKpiCsvRow): MonthlyKpiRow | null {
  if (!isValidDataRow(raw)) {
    return null
  }

  const monthParsed = parseMonthLabel(raw.Month)
  if (!monthParsed) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[KPI Normalization] Invalid month format:', raw.Month)
    }
    return null
  }

  const efficientAllocationBreakdown = normalizeBreakdown(parseEmbeddedJsonField(raw.efficientAssetsAllocation))
  const efficientTypeBreakdown = normalizeBreakdown(parseEmbeddedJsonField(raw.efficientAssetsType))
  const stateBreakdown = normalizeBreakdown(parseEmbeddedJsonField(raw.inefficientState))
  const industryBreakdown = normalizeBreakdown(parseEmbeddedJsonField(raw.inefficientIndustry))
  const locationBreakdown = normalizeBreakdown(parseEmbeddedJsonField(raw.inefficientIndustryLocation))
  const assetAllocationBreakdown = normalizeBreakdown(parseEmbeddedJsonField(raw.assetAllocation))

  const redemptionPrice = parseMoneyLike(raw.redemptionprice)

  return {
    month: monthParsed.short,
    monthLabel: raw.Month.trim(),
    sortKey: monthParsed.sortKey,
    distribution: parseMoneyLike(raw.Distribution),
    issuePrice: parseMoneyLike(raw.issueprice),
    redemptionPrice: redemptionPrice === 0 ? null : redemptionPrice,
    nta: parseMoneyLike(raw.nta),
    fum: parseMoneyLike(raw.fum),
    assetAllocation: extractAssetAllocation(assetAllocationBreakdown),
    efficientAssetsAllocation: extractEfficientAssetsAllocation(efficientAllocationBreakdown),
    efficientAssetsByType: extractEfficientAssetsByType(efficientTypeBreakdown),
    inefficientByState: extractInefficientByState(stateBreakdown),
    inefficientByIndustry: extractInefficientByIndustry(industryBreakdown),
    inefficientByLocation: extractInefficientByLocation(locationBreakdown),
    rawBreakdowns: {
      efficientAssetsAllocation: efficientAllocationBreakdown,
      efficientAssetsType: efficientTypeBreakdown,
      inefficientState: stateBreakdown,
      inefficientIndustry: industryBreakdown,
      inefficientIndustryLocation: locationBreakdown,
      assetAllocation: assetAllocationBreakdown,
    },
  }
}

/**
 * Normalize all CSV rows and return sorted (newest-first for consistency)
 *
 * @param rawRows - Array of raw CSV rows from papaparse
 * @returns Array of normalized monthly KPI rows, newest-first
 */
export function normalizeKpiCsvRows(rawRows: RawKpiCsvRow[]): MonthlyKpiRow[] {
  const normalized: MonthlyKpiRow[] = []

  for (const raw of rawRows) {
    const row = normalizeKpiRow(raw)
    if (row) {
      normalized.push(row)
    }
  }

  normalized.sort((a, b) => b.sortKey.localeCompare(a.sortKey))

  return normalized
}

/**
 * Build time series data from normalized rows
 *
 * @param rows - Normalized monthly KPI rows (any order)
 * @returns Time series object with chronological data
 */
export function buildTimeSeries(rows: MonthlyKpiRow[]): KpiTimeSeries {
  const chronological = [...rows].sort((a, b) => a.sortKey.localeCompare(b.sortKey))

  return {
    fum: chronological.map(r => ({ month: r.month, value: r.fum })),
    assetAllocation: chronological.map(r => ({
      month: r.month,
      cash: r.assetAllocation.cash,
      efficient: r.assetAllocation.efficient,
      inefficient: r.assetAllocation.inefficient,
    })),
    efficientSplit: chronological.map(r => ({
      month: r.month,
      international: r.efficientAssetsByType.international,
      australian: r.efficientAssetsByType.australian,
    })),
    inefficientByState: chronological.map(r => ({
      month: r.month,
      data: r.inefficientByState,
    })),
    inefficientByIndustry: chronological.map(r => ({
      month: r.month,
      data: r.inefficientByIndustry,
    })),
    inefficientByLocation: chronological.map(r => ({
      month: r.month,
      metro: r.inefficientByLocation.metro,
      regional: r.inefficientByLocation.regional,
    })),
  }
}

/**
 * Extract latest snapshot from normalized rows
 *
 * @param rows - Normalized monthly KPI rows (newest-first)
 * @returns Latest snapshot or null if no data
 */
export function extractLatestSnapshot(rows: MonthlyKpiRow[]): LatestKpiSnapshot | null {
  if (!rows.length) {
    return null
  }

  const latest = rows[0]

  return {
    month: latest.month,
    monthLabel: latest.monthLabel,
    issuePrice: latest.issuePrice,
    redemptionPrice: latest.redemptionPrice,
    nta: latest.nta,
    fum: latest.fum,
    distribution: latest.distribution,
    assetAllocation: latest.assetAllocation,
    efficientAssetsAllocation: latest.efficientAssetsAllocation,
    efficientAssetsByType: latest.efficientAssetsByType,
    inefficientByState: latest.inefficientByState,
    inefficientByIndustry: latest.inefficientByIndustry,
    inefficientByLocation: latest.inefficientByLocation,
  }
}

/**
 * Build the master KPI data structure from raw CSV rows
 *
 * @param rawRows - Array of raw CSV rows from papaparse
 * @returns Complete PerformanceKpiMaster structure
 */
export function buildKpiMaster(rawRows: RawKpiCsvRow[]): PerformanceKpiMaster {
  const monthlySeries = normalizeKpiCsvRows(rawRows)
  const latestSnapshot = extractLatestSnapshot(monthlySeries)
  const timeSeries = buildTimeSeries(monthlySeries)

  const chronological = [...monthlySeries].sort((a, b) => a.sortKey.localeCompare(b.sortKey))

  return {
    monthlySeries,
    latestSnapshot,
    timeSeries,
    monthCount: monthlySeries.length,
    dateRange: monthlySeries.length > 0
      ? {
          first: chronological[0].month,
          last: chronological[chronological.length - 1].month,
        }
      : null,
  }
}

/**
 * Adapter function to convert normalized KPI rows to PerformanceDataRow format
 * for compatibility with existing computePerformanceMetrics function
 *
 * @param kpiRows - Normalized monthly KPI rows (newest-first)
 * @returns PerformanceDataRow array (newest-first) for existing calculations
 */
export function toPerformanceDataRows(kpiRows: MonthlyKpiRow[]): PerformanceDataRow[] {
  return kpiRows.map(row => ({
    month: row.month,
    issuePrice: row.issuePrice,
    redemptionPrice: row.redemptionPrice,
    ntaPerUnit: row.nta,
    distribution: row.distribution,
  }))
}

/**
 * Create an empty KPI master structure
 * Used as fallback when no data is available
 */
export function createEmptyKpiMaster(): PerformanceKpiMaster {
  return {
    monthlySeries: [],
    latestSnapshot: null,
    timeSeries: {
      fum: [],
      assetAllocation: [],
      efficientSplit: [],
      inefficientByState: [],
      inefficientByIndustry: [],
      inefficientByLocation: [],
    },
    monthCount: 0,
    dateRange: null,
  }
}
