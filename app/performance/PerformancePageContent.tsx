'use client'

import { Container, SectionHeader } from '@/components/ui'
import {
  TotalReturnChart,
  FUMChart,
  DistributionsChart,
  CapitalAllocationSankey,
  CapitalAllocationTimeline,
  CsvDownloadButton,
} from '@/components/performance'

export function PerformancePageContent() {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Section 1 — Pricing & Returns (navy background)              */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-sogif-navy">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeader
              dark
              align="left"
              eyebrow="Pricing & Returns"
              title="Fund Performance"
            />
            <CsvDownloadButton />
          </div>
          <TotalReturnChart showStats />
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 2 — FUM & Distributions (silver-light background)          */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-sogif-silver-light">
        <Container>
          <SectionHeader
            align="left"
            eyebrow="Fund Metrics"
            title="Growth & Distributions"
            className="mb-12"
          />
          <div className="grid grid-cols-12 gap-8 lg:gap-12">
            <div className="col-span-12 lg:col-span-6">
              <FUMChart />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <DistributionsChart />
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 3 — Capital Allocation (silver-light background)           */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-sogif-silver-light border-t border-gray-200/60">
        <Container>
          <SectionHeader
            align="left"
            eyebrow="Asset Breakdown"
            title="Capital Allocation"
            className="mb-12"
          />
          {/* Sankey — always full width */}
          <div className="mb-12 lg:mb-16">
            <CapitalAllocationSankey />
          </div>
          {/* Timeline — full width */}
          <div>
            <CapitalAllocationTimeline />
          </div>
        </Container>
      </section>
    </>
  )
}
