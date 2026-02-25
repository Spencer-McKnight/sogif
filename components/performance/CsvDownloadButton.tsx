'use client'

import { useCallback } from 'react'
import { useConstants, usePerformance } from '@/lib'
import type { MonthlyKpiRow } from '@/lib'
import { Button } from '@/components/ui'

function buildCsv(rows: MonthlyKpiRow[]): string {
  const chronological = [...rows].sort((a, b) => a.sortKey.localeCompare(b.sortKey))

  const headers = [
    'Month',
    'Issue Price',
    'Redemption Price',
    'NTA',
    'Distribution',
    'FUM',
    'Cash',
    'Efficient',
    'Inefficient',
    'Australian (Efficient)',
    'International (Efficient)',
    'QLD', 'TAS', 'VIC', 'NSW', 'WA', 'SA', 'NT', 'ACT',
  ]

  const csvRows = chronological.map(r => [
    r.monthLabel,
    r.issuePrice.toFixed(4),
    r.redemptionPrice?.toFixed(4) ?? '',
    r.nta.toFixed(4),
    r.distribution.toFixed(4),
    r.fum.toFixed(0),
    r.assetAllocation.cash.toFixed(0),
    r.assetAllocation.efficient.toFixed(0),
    r.assetAllocation.inefficient.toFixed(0),
    r.efficientAssetsByType.australian.toFixed(0),
    r.efficientAssetsByType.international.toFixed(0),
    r.inefficientByState.qld.toFixed(0),
    r.inefficientByState.tas.toFixed(0),
    r.inefficientByState.vic.toFixed(0),
    r.inefficientByState.nsw.toFixed(0),
    r.inefficientByState.wa.toFixed(0),
    r.inefficientByState.sa.toFixed(0),
    r.inefficientByState.nt.toFixed(0),
    r.inefficientByState.act.toFixed(0),
  ])

  return [headers.join(','), ...csvRows.map(r => r.join(','))].join('\n')
}

export function CsvDownloadButton() {
  const { performanceKpiData } = useConstants()
  // Access performance context to confirm data is loaded
  usePerformance()

  const handleDownload = useCallback(() => {
    const csv = buildCsv(performanceKpiData.monthlySeries)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sogif-performance-data-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }, [performanceKpiData.monthlySeries])

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      size="sm"
      aria-label="Download performance data as CSV"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden="true">
        <path d="M8 1v10m0 0L4.5 7.5M8 11l3.5-3.5M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Download CSV
    </Button>
  )
}
