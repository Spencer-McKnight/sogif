'use client'

import { useMemo, useState } from 'react'
import { AppLink, Container, SectionHeader } from '@/components/ui'
import { cn } from '@/lib/utils'

type StrategyKey = 'property' | 'equity'

type StrategyContent = {
  key: StrategyKey
  marketType: string
  label: string
  strapline: string
  narrative: string
  authorityTitle: string
  authorityBody: string
  authorityLinkLabel?: string
  authorityLinkHref?: string
  authorityLinkExternal?: boolean
  bullets: string[]
}

// TODO: Replace with CMS-managed content
const strategyContent: StrategyContent[] = [
  {
    key: 'property',
    marketType: 'Inefficient Market',
    label: 'Property',
    strapline: 'Finding value where others cannot look',
    narrative:
      'High-conviction real assets with upside potential from valuation dislocation, disciplined execution, and low-friction management.',
    authorityTitle: 'Led by Steve McKnight',
    authorityBody: "Exclusive deal strategy and active oversight from one of Australia's most experienced property investors.",
    bullets: [
      'High upside potential from a unique value story with minimised cost drag and management overhead.',
      'Targets valuation gaps between retail and commercial investor demand.',
      'Leverages information disparities to unlock growth opportunities in property.',
      "Backed by Steve McKnight's oversight and exclusive investment strategy.",
    ],
  },
  {
    key: 'equity',
    marketType: 'Efficient Market',
    label: 'Equity',
    strapline: 'Disciplined diversification that trusts the market',
    narrative:
      'Systematic global exposure designed to increase liquidity, reduce concentration risk, and maintain evidence-based discipline.',
    authorityTitle: 'In partnership with Dimensional',
    authorityBody: 'We directly curate and select products with a globally respected, evidence-based asset manager.',
    authorityLinkLabel: 'Visit Dimensional',
    authorityLinkHref: 'https://www.dimensional.com/',
    authorityLinkExternal: true,
    bullets: [
      'Diversifies beyond the Australian property cycle into liquid, efficient assets to reduce portfolio risk.',
      'Systematic and backtested process for rebalancing and hedging.',
      'Actively diversified across Australian and international markets, value and growth, and developed and emerging regions.',
      'Built on a long-term approach: trust markets and tune out short-term noise.',
    ],
  },
]

export function StrategyOverview() {
  const [activeStrategy, setActiveStrategy] = useState<StrategyKey>('property')

  const activeContent = useMemo(
    () => strategyContent.find((item) => item.key === activeStrategy) ?? strategyContent[0],
    [activeStrategy]
  )

  const accentBorderClass =
    activeStrategy === 'property' ? 'border-l-sogif-gold' : 'border-l-sogif-cyan-dark'

  return (
    <section className="section-padding bg-sogif-silver-light">
      <Container>
        <SectionHeader
          align="left"
          eyebrow="Strategy"
          title="Trusting Our Future"
        />

        {/* Strategy toggle */}
        <div className="mt-10 grid grid-cols-12 gap-8 border-b border-gray-200">
          {strategyContent.map((strategy) => {
            const isActive = strategy.key === activeStrategy
            const accentBorder =
              strategy.key === 'property'
                ? 'border-sogif-gold'
                : 'border-sogif-cyan-dark'

            return (
              <button
                key={strategy.key}
                type="button"
                onClick={() => setActiveStrategy(strategy.key)}
                aria-pressed={isActive}
                className={cn(
                  'col-span-6 lg:col-span-3 -mb-px border-b-2 pb-3 text-left transition-colors duration-200 focus-ring',
                  isActive
                    ? cn(accentBorder, 'text-gray-900')
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                )}
              >
                <p className={cn(
                  'type-caption uppercase tracking-[0.12em] mb-0.5',
                  isActive
                    ? (strategy.key === 'property' ? 'text-sogif-gold' : 'text-sogif-cyan-dark')
                    : 'text-gray-400'
                )}>
                  {strategy.marketType}
                </p>
                <p className="type-body font-semibold">{strategy.label}</p>
              </button>
            )
          })}
        </div>

        {/* Active strategy content — 5/7 grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left column: narrative + authority */}
          <div className="lg:col-span-5">
            <h3 className="type-title text-gray-900">{activeContent.strapline}</h3>
            <p className="mt-3 type-body text-gray-600">{activeContent.narrative}</p>

            {/* Authority anchor */}
            <div className="mt-8 border-t border-gray-200 pt-5">
              <p className="type-support font-semibold text-gray-900">{activeContent.authorityTitle}</p>
              <p className="mt-1 type-body text-gray-600">{activeContent.authorityBody}</p>
              {activeContent.authorityLinkHref && activeContent.authorityLinkLabel ? (
                <AppLink
                  href={activeContent.authorityLinkHref}
                  external={activeContent.authorityLinkExternal}
                  showArrow
                  arrowType="external"
                  variant="text"
                  className="mt-3"
                >
                  {activeContent.authorityLinkLabel}
                </AppLink>
              ) : null}
            </div>
          </div>

          {/* Right column: bullet cards */}
          <div className="space-y-3 lg:col-span-7">
            {activeContent.bullets.map((point) => (
              <div
                key={point}
                className={cn(
                  'border-l-[3px] rounded-r-lg bg-white px-4 py-3 type-body text-gray-700',
                  accentBorderClass
                )}
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
