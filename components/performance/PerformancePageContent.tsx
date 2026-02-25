'use client'

import { useState, useMemo } from 'react'
import { Container, SectionHeader } from '@/components/ui'
import { useConstants, usePerformance, computePerformanceMetrics } from '@/lib'
import { UnitPerformanceChart } from './UnitPerformanceChart'
import { CapitalAllocationSankey } from './CapitalAllocationSankey'
import { AllocationHistoryChart } from './AllocationHistoryChart'
import { HistoricalCharts } from './HistoricalCharts'
import { CsvDownload } from './CsvDownload'
import { PeriodRangeSelector } from './PeriodRangeSelector'
import { monthToSortKey, type PeriodRange } from './chart-utils'

export function PerformancePageContent() {
  const constants = useConstants()
  const { computed } = usePerformance()
  const kpiData = constants.performanceKpiData
  const [periodRange, setPeriodRange] = useState<PeriodRange>(null)

  const filteredPerformance = useMemo(() => {
    if (!periodRange) return computed
    const filteredRaw = computed.raw.filter(row => {
      const sk = monthToSortKey(row.month)
      return sk >= periodRange.start && sk <= periodRange.end
    })
    return computePerformanceMetrics(filteredRaw)
  }, [periodRange, computed])

  const filteredMonthlySeries = useMemo(() => {
    if (!periodRange) return kpiData.monthlySeries
    return kpiData.monthlySeries.filter(r =>
      r.sortKey >= periodRange.start && r.sortKey <= periodRange.end
    )
  }, [periodRange, kpiData.monthlySeries])

  const snapshot = kpiData.latestSnapshot
  const latestRow = kpiData.monthlySeries[0] ?? null

  if (!kpiData.monthCount || !snapshot || !latestRow) {
    return (
      <section className="section-padding bg-sogif-silver-light">
        <Container>
          <p className="type-body text-text-muted text-center">Performance data is currently unavailable. Please check back later.</p>
        </Container>
      </section>
    )
  }

  return (
    <>
      {/* ── STICKY PERIOD BAR ────────────────────────────────────── */}
      <div className="sticky top-20 lg:top-[6.5rem] z-40 bg-white/95 backdrop-blur-md border-b border-border-soft">
        <Container>
          <div className="flex items-center justify-between py-3">
            <PeriodRangeSelector
              monthlySeries={kpiData.monthlySeries}
              selectedRange={periodRange}
              onRangeChange={setPeriodRange}
            />
            <CsvDownload monthlySeries={filteredMonthlySeries} />
          </div>
        </Container>
      </div>

      {/* ── UNIT PERFORMANCE (Light) ─────────────────────────────── */}
      <section className="section-padding bg-sogif-silver-light relative overflow-hidden">
        <Container className="relative">
          <div className="mb-10">
            <SectionHeader
              align="left"
              eyebrow="PERFORMANCE"
              title="Cumulative Unit Performance"
              description="Issue, redemption and cumulative return pricing over time."
            />
          </div>

          <UnitPerformanceChart
            chartData={filteredPerformance.chartData}
            annotatedData={filteredPerformance.annotatedChartData}
            yAxisConfig={filteredPerformance.yAxisConfig}
            specialPoints={filteredPerformance.specialPoints}
          />
        </Container>
      </section>

      {/* ── CAPITAL ALLOCATION (Silver) ──────────────────────────── */}
      <section className="section-padding bg-white">
        <Container>
          <SectionHeader
            align="left"
            eyebrow="CAPITAL ALLOCATION"
            title={`How Capital Is Allocated`}
            description={`Snapshot for ${snapshot.monthLabel}. Total funds under management: ${new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(snapshot.fum)}.`}
          />

          {/* Sankey */}
          <div className="mt-10">
            <CapitalAllocationSankey snapshot={snapshot} latestRow={latestRow} />
          </div>

          {/* Allocation History */}
          <div className="mt-16">
            <AllocationHistoryChart timeSeries={kpiData.timeSeries} periodRange={periodRange} />
          </div>
        </Container>
      </section>

      {/* ── HISTORICAL ───────────────────────────────────────────── */}
      <section className="section-padding bg-sogif-silver-light">
        <Container>
          <div className="mb-10">
            <SectionHeader
              align="left"
              eyebrow="ALL TIME"
              title="Fund Performance History"
              description="Key fund metrics tracked from inception."
            />
          </div>

          <HistoricalCharts
            timeSeries={kpiData.timeSeries}
            monthlySeries={kpiData.monthlySeries}
            periodRange={periodRange}
          />
        </Container>
      </section>
    </>
  )
}
