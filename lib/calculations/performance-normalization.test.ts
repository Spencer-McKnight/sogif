/**
 * Tests for Performance Data Normalization Utilities
 */

import { describe, it, expect } from 'vitest'
import {
  parseMonthLabel,
  parseMoneyLike,
  parseEmbeddedJsonField,
  normalizeBreakdown,
  normalizeKpiRow,
  normalizeKpiCsvRows,
  buildKpiMaster,
  toPerformanceDataRows,
  createEmptyKpiMaster,
} from './performance-normalization'
import type { RawKpiCsvRow } from '../types/datocms'

describe('parseMonthLabel', () => {
  it('parses full month names correctly', () => {
    expect(parseMonthLabel('September 2023')).toEqual({
      short: 'Sep-23',
      sortKey: '2023-09',
    })
    expect(parseMonthLabel('January 2024')).toEqual({
      short: 'Jan-24',
      sortKey: '2024-01',
    })
    expect(parseMonthLabel('December 2025')).toEqual({
      short: 'Dec-25',
      sortKey: '2025-12',
    })
  })

  it('handles whitespace', () => {
    expect(parseMonthLabel('  September 2023  ')).toEqual({
      short: 'Sep-23',
      sortKey: '2023-09',
    })
  })

  it('is case-insensitive', () => {
    expect(parseMonthLabel('JANUARY 2024')).toEqual({
      short: 'Jan-24',
      sortKey: '2024-01',
    })
  })

  it('returns null for invalid formats', () => {
    expect(parseMonthLabel('')).toBeNull()
    expect(parseMonthLabel('Sep-23')).toBeNull()
    expect(parseMonthLabel('2023')).toBeNull()
    expect(parseMonthLabel('Invalid 2023')).toBeNull()
  })

  it('returns null for null/undefined', () => {
    expect(parseMonthLabel(null as unknown as string)).toBeNull()
    expect(parseMonthLabel(undefined as unknown as string)).toBeNull()
  })
})

describe('parseMoneyLike', () => {
  it('parses currency strings with dollar signs', () => {
    expect(parseMoneyLike('$62,041,225')).toBe(62041225)
    expect(parseMoneyLike('$1.0562')).toBe(1.0562)
  })

  it('parses plain numbers', () => {
    expect(parseMoneyLike('1.0562')).toBe(1.0562)
    expect(parseMoneyLike('100')).toBe(100)
  })

  it('handles whitespace and quotes', () => {
    expect(parseMoneyLike(' $62,041,225 ')).toBe(62041225)
    expect(parseMoneyLike('" $1.0562 "')).toBe(1.0562)
  })

  it('returns 0 for empty/invalid values', () => {
    expect(parseMoneyLike('')).toBe(0)
    expect(parseMoneyLike(null)).toBe(0)
    expect(parseMoneyLike(undefined)).toBe(0)
    expect(parseMoneyLike('   ')).toBe(0)
  })

  it('handles decimal precision', () => {
    expect(parseMoneyLike('0.9862')).toBe(0.9862)
    expect(parseMoneyLike('1.0622')).toBe(1.0622)
  })
})

describe('parseEmbeddedJsonField', () => {
  it('parses valid JSON breakdowns', () => {
    const json = '{"data": {"Cash": "70713200.93", "Efficient": "102723"}, "type": "dollar", "title": "Asset Allocation"}'
    const result = parseEmbeddedJsonField(json)

    expect(result).toEqual({
      title: 'Asset Allocation',
      type: 'dollar',
      data: {
        Cash: '70713200.93',
        Efficient: '102723',
      },
    })
  })

  it('handles percentage type', () => {
    const json = '{"data": {"Dimensional Funds Australia": "80.3"}, "type": "percentage", "title": "Efficient"}'
    const result = parseEmbeddedJsonField(json)

    expect(result?.type).toBe('percentage')
  })

  it('defaults to dollar type for unknown types', () => {
    const json = '{"data": {"A": "1"}, "type": "unknown", "title": "Test"}'
    const result = parseEmbeddedJsonField(json)

    expect(result?.type).toBe('dollar')
  })

  it('returns null for empty/invalid JSON', () => {
    expect(parseEmbeddedJsonField('')).toBeNull()
    expect(parseEmbeddedJsonField(null)).toBeNull()
    expect(parseEmbeddedJsonField(undefined)).toBeNull()
    expect(parseEmbeddedJsonField('""')).toBeNull()
    expect(parseEmbeddedJsonField('invalid json')).toBeNull()
  })

  it('returns null for JSON without data field', () => {
    expect(parseEmbeddedJsonField('{"title": "Test"}')).toBeNull()
  })
})

describe('normalizeBreakdown', () => {
  it('normalizes string values to numbers', () => {
    const field = {
      title: 'Test',
      type: 'dollar' as const,
      data: { A: '100', B: '200.50' },
    }
    const result = normalizeBreakdown(field)

    expect(result).toEqual({
      title: 'Test',
      type: 'dollar',
      data: { A: 100, B: 200.5 },
      total: 300.5,
    })
  })

  it('handles numeric values', () => {
    const field = {
      title: 'Test',
      type: 'percentage' as const,
      data: { A: 50, B: 50 },
    }
    const result = normalizeBreakdown(field)

    expect(result?.total).toBe(100)
  })

  it('returns null for null input', () => {
    expect(normalizeBreakdown(null)).toBeNull()
  })
})

describe('normalizeKpiRow', () => {
  const createValidRow = (overrides: Partial<RawKpiCsvRow> = {}): RawKpiCsvRow => ({
    Month: 'January 2024',
    Distribution: '0.0100',
    issueprice: '1.0313',
    redemptionprice: '0.9444',
    nta: '0.9811',
    fum: ' $115,247,440 ',
    efficientAssetsAllocation: '{"data": {"Dimensional Funds Australia": "80.2", "Vanguard Australia": "19.8"}, "type": "percentage", "title": "Test"}',
    efficientAssetsType: '{"data": {"International": "21561575", "Australian": "14175759"}, "type": "dollar", "title": "Test"}',
    inefficientState: '{"data": {"QLD": "46990096", "TAS": "7540200", "VIC": "21701680"}, "type": "dollar", "title": "Test"}',
    inefficientIndustry: '{"data": {"Retail": "67152707", "Industrial": "9079269"}, "type": "dollar", "title": "Test"}',
    inefficientIndustryLocation: '{"data": {"Metro": "34563818", "Regional": "41668158"}, "type": "dollar", "title": "Test"}',
    assetAllocation: '{"data": {"Cash": "3278130", "Efficient": "35737334", "Inefficient": "76231976"}, "type": "dollar", "title": "Test"}',
    ...overrides,
  })

  it('normalizes a valid row correctly', () => {
    const row = createValidRow()
    const result = normalizeKpiRow(row)

    expect(result).not.toBeNull()
    expect(result?.month).toBe('Jan-24')
    expect(result?.monthLabel).toBe('January 2024')
    expect(result?.sortKey).toBe('2024-01')
    expect(result?.issuePrice).toBe(1.0313)
    expect(result?.redemptionPrice).toBe(0.9444)
    expect(result?.distribution).toBe(0.01)
    expect(result?.fum).toBe(115247440)
  })

  it('extracts asset allocation correctly', () => {
    const row = createValidRow()
    const result = normalizeKpiRow(row)

    expect(result?.assetAllocation).toEqual({
      cash: 3278130,
      efficient: 35737334,
      inefficient: 76231976,
      total: 115247440,
    })
  })

  it('extracts efficient assets allocation correctly', () => {
    const row = createValidRow()
    const result = normalizeKpiRow(row)

    expect(result?.efficientAssetsAllocation).toEqual({
      dimensionalFunds: 80.2,
      vanguard: 19.8,
    })
  })

  it('extracts inefficient by state correctly', () => {
    const row = createValidRow()
    const result = normalizeKpiRow(row)

    expect(result?.inefficientByState.qld).toBe(46990096)
    expect(result?.inefficientByState.tas).toBe(7540200)
    expect(result?.inefficientByState.vic).toBe(21701680)
  })

  it('sets redemptionPrice to null when 0', () => {
    const row = createValidRow({ redemptionprice: '0.0000' })
    const result = normalizeKpiRow(row)

    expect(result?.redemptionPrice).toBeNull()
  })

  it('returns null for rows without issue price', () => {
    const row = createValidRow({ issueprice: '' })
    expect(normalizeKpiRow(row)).toBeNull()
  })

  it('returns null for rows without month', () => {
    const row = createValidRow({ Month: '' })
    expect(normalizeKpiRow(row)).toBeNull()
  })

  it('handles empty JSON fields gracefully', () => {
    const row = createValidRow({
      efficientAssetsAllocation: '',
      efficientAssetsType: '',
      inefficientState: '',
      inefficientIndustry: '',
      inefficientIndustryLocation: '',
      assetAllocation: '',
    })
    const result = normalizeKpiRow(row)

    expect(result).not.toBeNull()
    expect(result?.assetAllocation.total).toBe(0)
    expect(result?.efficientAssetsAllocation.dimensionalFunds).toBe(0)
  })
})

describe('normalizeKpiCsvRows', () => {
  const createValidRow = (month: string): RawKpiCsvRow => ({
    Month: month,
    Distribution: '0.01',
    issueprice: '1.0',
    redemptionprice: '0.95',
    nta: '0.98',
    fum: '$100000000',
    efficientAssetsAllocation: '',
    efficientAssetsType: '',
    inefficientState: '',
    inefficientIndustry: '',
    inefficientIndustryLocation: '',
    assetAllocation: '',
  })

  it('returns rows sorted newest-first', () => {
    const rows = [
      createValidRow('January 2024'),
      createValidRow('March 2024'),
      createValidRow('February 2024'),
    ]
    const result = normalizeKpiCsvRows(rows)

    expect(result.map(r => r.month)).toEqual(['Mar-24', 'Feb-24', 'Jan-24'])
  })

  it('filters out invalid rows', () => {
    const rows = [
      createValidRow('January 2024'),
      { ...createValidRow('February 2024'), issueprice: '' },
      createValidRow('March 2024'),
    ]
    const result = normalizeKpiCsvRows(rows)

    expect(result).toHaveLength(2)
  })

  it('handles empty array', () => {
    expect(normalizeKpiCsvRows([])).toEqual([])
  })
})

describe('buildKpiMaster', () => {
  const createValidRow = (month: string, fum: string): RawKpiCsvRow => ({
    Month: month,
    Distribution: '0.01',
    issueprice: '1.0',
    redemptionprice: '0.95',
    nta: '0.98',
    fum,
    efficientAssetsAllocation: '',
    efficientAssetsType: '',
    inefficientState: '',
    inefficientIndustry: '',
    inefficientIndustryLocation: '',
    assetAllocation: '',
  })

  it('builds complete master structure', () => {
    const rows = [
      createValidRow('January 2024', '$100000000'),
      createValidRow('February 2024', '$110000000'),
    ]
    const result = buildKpiMaster(rows)

    expect(result.monthCount).toBe(2)
    expect(result.latestSnapshot).not.toBeNull()
    expect(result.latestSnapshot?.month).toBe('Feb-24')
    expect(result.dateRange).toEqual({
      first: 'Jan-24',
      last: 'Feb-24',
    })
  })

  it('builds time series in chronological order', () => {
    const rows = [
      createValidRow('January 2024', '$100000000'),
      createValidRow('February 2024', '$110000000'),
    ]
    const result = buildKpiMaster(rows)

    expect(result.timeSeries.fum[0].month).toBe('Jan-24')
    expect(result.timeSeries.fum[1].month).toBe('Feb-24')
  })

  it('handles empty input', () => {
    const result = buildKpiMaster([])

    expect(result.monthCount).toBe(0)
    expect(result.latestSnapshot).toBeNull()
    expect(result.dateRange).toBeNull()
    expect(result.timeSeries.fum).toHaveLength(0)
  })
})

describe('toPerformanceDataRows', () => {
  it('converts KPI rows to PerformanceDataRow format', () => {
    const rows = normalizeKpiCsvRows([
      {
        Month: 'January 2024',
        Distribution: '0.0100',
        issueprice: '1.0313',
        redemptionprice: '0.9444',
        nta: '0.9811',
        fum: '$115247440',
        efficientAssetsAllocation: '',
        efficientAssetsType: '',
        inefficientState: '',
        inefficientIndustry: '',
        inefficientIndustryLocation: '',
        assetAllocation: '',
      },
    ])
    const result = toPerformanceDataRows(rows)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      month: 'Jan-24',
      issuePrice: 1.0313,
      redemptionPrice: 0.9444,
      ntaPerUnit: 0.9811,
      distribution: 0.01,
    })
  })

  it('handles null redemption price', () => {
    const rows = normalizeKpiCsvRows([
      {
        Month: 'September 2023',
        Distribution: '0.0000',
        issueprice: '1.0000',
        redemptionprice: '0.0000',
        nta: '0.0000',
        fum: '$62041225',
        efficientAssetsAllocation: '',
        efficientAssetsType: '',
        inefficientState: '',
        inefficientIndustry: '',
        inefficientIndustryLocation: '',
        assetAllocation: '',
      },
    ])
    const result = toPerformanceDataRows(rows)

    expect(result[0].redemptionPrice).toBeNull()
  })
})

describe('createEmptyKpiMaster', () => {
  it('returns empty master structure', () => {
    const result = createEmptyKpiMaster()

    expect(result.monthCount).toBe(0)
    expect(result.latestSnapshot).toBeNull()
    expect(result.dateRange).toBeNull()
    expect(result.monthlySeries).toEqual([])
    expect(result.timeSeries.fum).toEqual([])
  })
})

describe('embedded JSON with commas (regression)', () => {
  it('handles JSON strings containing commas in values', () => {
    const json = '{"data": {"QLD": "46990096", "TAS": "7540200", "VIC": "21701680"}, "type": "dollar", "title": "Inefficient investments by State"}'
    const result = parseEmbeddedJsonField(json)

    expect(result?.data).toEqual({
      QLD: '46990096',
      TAS: '7540200',
      VIC: '21701680',
    })
  })
})
