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
import { InvestmentSteps } from '@/components/home/InvestmentSteps'
import type { HomePageData } from '@/lib'

// TODO: replace with CMS query
const STEPS_MOCK = {
  stepsEyebrow: 'HOW IT WORKS',
  stepsTitle: 'Three Easy Steps to Investing',
  stepsCtaLabel: 'Start Your Application Here',
  stepsCtaHref: '/apply',
  steps: [
    {
      id: '1',
      title: 'Read',
      description: {
        value: {
          schema: 'dast',
          document: {
            type: 'root',
            children: [{ type: 'paragraph', children: [{ type: 'span', value: 'Read the offer documents to make an informed decision.' }] }],
          },
        },
      },
    },
    {
      id: '2',
      title: 'Register',
      description: {
        value: {
          schema: 'dast',
          document: {
            type: 'root',
            children: [{ type: 'paragraph', children: [{ type: 'span', value: 'Apply online with an identification check.' }] }],
          },
        },
      },
    },
    {
      id: '3',
      title: 'Remit',
      description: {
        value: {
          schema: 'dast',
          document: {
            type: 'root',
            children: [{ type: 'paragraph', children: [{ type: 'span', value: 'Transfer funds to complete your application.' }] }],
          },
        },
      },
    },
  ],
} as unknown as HomePageData

export function PerformancePageContent() {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Section 1 — Pricing & Returns (navy background)              */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding-short bg-sogif-navy">
        <Container>
          <SectionHeader
            dark
            align="left"
            eyebrow="Performance"
            title="Prices with Distributions"
            className="mb-12"
          />
          <TotalReturnChart showStats />
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 2 — FUM & Distributions (silver background)          */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding-short bg-sogif-silver">
        <Container className="flex flex-col gap-8 md:gap-24">
          <DistributionsChart />
        </Container>
      </section>

      <section className="section-padding-short bg-sogif-silver-light">
        <Container className="flex flex-col gap-8 md:gap-24">
          <FUMChart />
          <CapitalAllocationSankey />
          <CapitalAllocationTimeline />
        </Container>
      </section>


      {/* ------------------------------------------------------------------ */}
      {/* Section 4 — Investment Steps                                        */}
      {/* ------------------------------------------------------------------ */}
      <InvestmentSteps cms={STEPS_MOCK} />
    </>
  )
}
