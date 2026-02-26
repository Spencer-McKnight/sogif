'use client'

import { useMemo } from 'react'
import { AppLink, Container, SectionHeader } from '@/components/ui'
import { usePerformanceSafe, computePerformanceMetrics, PerformanceProvider } from '@/lib'
import type { PerformanceDataRow, ComputedPerformanceData, HomePageData } from '@/lib'
import { TotalReturnChart } from '@/components/performance'

interface PerformanceSnapshotProps {
  performanceData: PerformanceDataRow[]
  cms: HomePageData
}

export function PerformanceSnapshot({ performanceData, cms }: PerformanceSnapshotProps) {
  const {
    performanceEyebrow,
    performanceTitle,
    performanceLinkLabel,
  } = cms

  // Use context data when available; compute locally otherwise.
  const contextData = usePerformanceSafe()

  const computed = useMemo((): ComputedPerformanceData => {
    if (contextData) {
      return contextData.computed
    }
    // Fallback: compute locally (e.g., when not wrapped in PerformanceProvider)
    return computePerformanceMetrics(performanceData)
  }, [contextData, performanceData])

  // Don't render if no data
  if (!performanceData.length) {
    return null
  }

  return (
    <section className="section-padding bg-sogif-navy relative overflow-hidden">
      <Container className="relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <SectionHeader
              dark
              align="left"
              eyebrow={performanceEyebrow}
              title={performanceTitle}
            />
          </div>
          {performanceLinkLabel && (
            <AppLink
              href="/performance"
              showArrow
              variant="light"
              className="hidden md:inline-flex shrink-0 text-sogif-cyan-light hover:text-white"
            >
              {performanceLinkLabel}
            </AppLink>
          )}
        </div>

        <PerformanceProvider computed={computed}>
          <TotalReturnChart showStats showTitle={false} showTimeFilter={false} />
        </PerformanceProvider>
      </Container>
    </section>
  )
}
