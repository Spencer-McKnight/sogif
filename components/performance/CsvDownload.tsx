'use client'

import { useCallback } from 'react'
import { Button } from '@/components/ui'
import type { MonthlyKpiRow } from '@/lib'

interface CsvDownloadProps {
  monthlySeries: MonthlyKpiRow[]
  className?: string
}

function buildCsvContent(rows: MonthlyKpiRow[]): string {
  const headers = [
    'Month', 'Issue Price', 'Redemption Price', 'NTA', 'FUM', 'Distribution',
    'Cash', 'Efficient', 'Inefficient',
    'Dimensional Funds', 'Vanguard',
    'International', 'Australian',
    'QLD', 'NSW', 'VIC', 'SA', 'WA', 'NT', 'TAS', 'ACT',
    'Retail', 'Industrial', 'Office', 'Residential', 'Other',
  ]

  const chronological = [...rows].sort((a, b) => a.sortKey.localeCompare(b.sortKey))

  const csvRows = chronological.map(row => [
    row.monthLabel,
    row.issuePrice.toFixed(4),
    row.redemptionPrice?.toFixed(4) ?? '',
    row.nta.toFixed(4),
    row.fum.toFixed(0),
    row.distribution.toFixed(4),
    row.assetAllocation.cash.toFixed(0),
    row.assetAllocation.efficient.toFixed(0),
    row.assetAllocation.inefficient.toFixed(0),
    row.efficientAssetsAllocation.dimensionalFunds.toFixed(0),
    row.efficientAssetsAllocation.vanguard.toFixed(0),
    row.efficientAssetsByType.international.toFixed(0),
    row.efficientAssetsByType.australian.toFixed(0),
    row.inefficientByState.qld.toFixed(0),
    row.inefficientByState.nsw.toFixed(0),
    row.inefficientByState.vic.toFixed(0),
    row.inefficientByState.sa.toFixed(0),
    row.inefficientByState.wa.toFixed(0),
    row.inefficientByState.nt.toFixed(0),
    row.inefficientByState.tas.toFixed(0),
    row.inefficientByState.act.toFixed(0),
    row.inefficientByIndustry.retail.toFixed(0),
    row.inefficientByIndustry.industrial.toFixed(0),
    row.inefficientByIndustry.office.toFixed(0),
    row.inefficientByIndustry.residential.toFixed(0),
    row.inefficientByIndustry.other.toFixed(0),
  ])

  return [headers.join(','), ...csvRows.map(r => r.join(','))].join('\n')
}

export function CsvDownload({ monthlySeries, className }: CsvDownloadProps) {
  const handleDownload = useCallback(() => {
    const csv = buildCsvContent(monthlySeries)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `sogif-performance-data.csv`
    link.click()
    URL.revokeObjectURL(url)
  }, [monthlySeries])

  if (!monthlySeries.length) return null

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      className={className}
    >
      <svg className="h-4 w-4 mr-1.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 12h10" />
      </svg>
      Download CSV
    </Button>
  )
}
