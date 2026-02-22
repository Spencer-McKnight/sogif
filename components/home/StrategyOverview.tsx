'use client'

import { useState } from 'react'
import { Container, SectionHeader } from '@/components/ui'

/* ── Types ─────────────────────────────────────────── */

type StrategyKey = 'property' | 'equity'

interface StrategyPoint {
  title: string
  detail: string
  url?: string
}

interface Strategy {
  label: string
  qualifier: string
  ordinal: string
  tagline: string
  rationale: string
  points: StrategyPoint[]
}

/* ── CMS-replaceable content ───────────────────────── */
// TODO: replace with CMS data when available

const SECTION_EYEBROW = 'Dual Strategy'
const SECTION_TITLE = 'Two Distinct Edges'
const SECTION_DESCRIPTION =
  'Deliberately pairing inefficient property assets with efficient global equities — each independently managed for a different return profile.'

const STRATEGIES: Record<StrategyKey, Strategy> = {
  property: {
    label: 'Property',
    qualifier: 'Inefficient',
    ordinal: '01',
    tagline: 'Capitalising on the valuation gaps others overlook.',
    rationale:
      'Property markets are rife with information asymmetry. Our approach targets the unique gap between retail and commercial investors — where deep expertise and conviction, not capital alone, unlock outsized returns.',
    points: [
      {
        title: 'Unique Value Gaps',
        detail:
          'Targeting the opportunity-dense valuation gap between retail and commercial investor interests, where pricing inefficiencies create outsized upside.',
      },
      {
        title: 'Information Edge',
        detail:
          'Experience and expertise in identifying information disparities enables strategic growth when investing in Australian property.',
      },
      {
        title: 'Minimised Friction',
        detail:
          'High upside potential with minimised costs and management headache through a unique value-add approach.',
      },
      {
        title: 'Expert Oversight',
        detail:
          "Steve McKnight's decades of experience and exclusive investment strategies inform every acquisition.",
      },
    ],
  },
  equity: {
    label: 'Equity',
    qualifier: 'Efficient',
    ordinal: '02',
    tagline: 'Disciplined global diversification, systematically delivered.',
    rationale:
      'Efficient markets demand a different playbook. A systematic, evidence-based approach to global equities diversifies from the Australian property market, providing liquidity and reducing portfolio risk.',
    points: [
      {
        title: 'Market Diversification',
        detail:
          'Actively diversified between international and Australian markets, balancing value and growth, established and emerging positions.',
      },
      {
        title: 'Systematic Discipline',
        detail:
          'A backtested process of rebalancing and hedging, providing liquidity and reducing risk across market cycles.',
      },
      {
        title: 'Dimensional Partnership',
        detail:
          "Products directly curated with one of the world's most respected systematic asset managers.",
        url: 'https://www.dimensional.com/',
      },
      {
        title: 'Signal Over Noise',
        detail:
          'Trusting in markets and capturing what the evidence says works — tuning out short-term noise.',
      },
    ],
  },
}

const STRATEGY_KEYS: StrategyKey[] = ['property', 'equity']

/* ── Accent color mappings ─────────────────────────── */

const accentStyles = {
  property: {
    badge: 'border-sogif-gold/30 text-sogif-gold',
    border: 'border-sogif-gold/15',
    borderHover: 'hover:border-sogif-gold/35',
    number: 'text-sogif-gold/50 group-hover:text-sogif-gold',
    link: 'text-sogif-gold/70 hover:text-sogif-gold',
    glow: 'bg-sogif-gold/[0.04]',
    ordinal: 'text-sogif-gold/[0.03]',
    leftBorder: 'lg:border-sogif-gold/20',
  },
  equity: {
    badge: 'border-sogif-cyan-light/30 text-sogif-cyan-light',
    border: 'border-sogif-cyan-light/15',
    borderHover: 'hover:border-sogif-cyan-light/35',
    number: 'text-sogif-cyan-light/50 group-hover:text-sogif-cyan-light',
    link: 'text-sogif-cyan-light/70 hover:text-sogif-cyan-light',
    glow: 'bg-sogif-cyan-light/[0.04]',
    ordinal: 'text-sogif-cyan-light/[0.03]',
    leftBorder: 'lg:border-sogif-cyan-light/20',
  },
}

/* ── Component ─────────────────────────────────────── */

export function StrategyOverview() {
  const [active, setActive] = useState<StrategyKey>('property')
  const strategy = STRATEGIES[active]
  const accent = accentStyles[active]

  return (
    <section
      className="section-padding bg-sogif-navy relative overflow-hidden"
      aria-label="Fund Strategy"
    >
      {/* Ambient background glow */}
      {STRATEGY_KEYS.map((key) => (
        <div
          key={key}
          className={`
            absolute inset-0 pointer-events-none transition-opacity duration-slow
            ${active === key ? 'opacity-100' : 'opacity-0'}
          `}
          aria-hidden="true"
        >
          <div
            className={`
              absolute bottom-0 ${key === 'property' ? 'left-1/4' : 'right-1/4'}
              w-[32rem] h-[32rem] ${accentStyles[key].glow} rounded-full blur-[160px]
            `}
          />
        </div>
      ))}

      <Container>
        <SectionHeader
          eyebrow={SECTION_EYEBROW}
          title={SECTION_TITLE}
          description={SECTION_DESCRIPTION}
          align="left-to-center"
          dark
        />

        {/* ── Strategy Selector ── */}
        <div
          className="flex justify-center mt-12 lg:mt-16 mb-12 lg:mb-16"
          role="tablist"
          aria-label="Strategy selection"
        >
          <div className="relative inline-grid grid-cols-2">
            {STRATEGY_KEYS.map((key) => (
              <button
                key={key}
                role="tab"
                aria-selected={active === key}
                aria-controls="strategy-panel"
                id={`strategy-tab-${key}`}
                onClick={() => setActive(key)}
                className={`
                  relative px-4 sm:px-10 py-4 text-center
                  type-support tracking-wider uppercase cursor-pointer
                  transition-colors duration-base focus-ring-inverse
                  ${active === key
                    ? 'text-white'
                    : 'text-white/30 hover:text-white/50'}
                `}
              >
                <span className="font-semibold">{STRATEGIES[key].label}</span>
                <span className="mx-1.5 sm:mx-2 text-white/20 hidden sm:inline">&middot;</span>
                <span className="font-normal hidden sm:inline">{STRATEGIES[key].qualifier}</span>
              </button>
            ))}

            {/* Base border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />

            {/* Sliding accent indicator */}
            <div
              className={`
                absolute bottom-0 h-0.5 w-1/2 transition-all duration-base ease-standard
                ${active === 'property'
                  ? 'left-0 bg-sogif-gold'
                  : 'left-1/2 bg-sogif-cyan-light'}
              `}
            />
          </div>
        </div>

        {/* ── Strategy Content ── */}
        <div
          id="strategy-panel"
          role="tabpanel"
          aria-labelledby={`strategy-tab-${active}`}
          className="grid lg:grid-cols-12 gap-8 lg:gap-12"
        >
          {/* Left: Strategy Identity */}
          <div
            className={`
              lg:col-span-5 flex flex-col lg:border-l-2 lg:pl-8
              transition-colors duration-base ${accent.leftBorder}
            `}
          >
            <div
              className={`
                inline-flex items-center px-3.5 py-1.5 rounded-full border w-fit mb-6
                transition-colors duration-base ${accent.badge}
              `}
            >
              <span className="type-caption font-medium uppercase tracking-wider">
                {strategy.qualifier} Assets
              </span>
            </div>

            <h3 className="type-title text-white font-light leading-relaxed mb-6">
              {strategy.tagline}
            </h3>

            <p className="type-support text-white/55 leading-relaxed">
              {strategy.rationale}
            </p>
          </div>

          {/* Right: Insight Ledger */}
          <div className="lg:col-span-7">
            {strategy.points.map((point, i) => (
              <div
                key={point.title}
                className={`
                  group py-5 sm:py-6 border-t transition-colors duration-base
                  ${accent.border} ${accent.borderHover}
                `}
              >
                <div className="flex gap-4 lg:gap-6">
                  <span
                    className={`
                      type-caption font-mono font-semibold shrink-0 mt-1 tabular-nums
                      transition-colors duration-base ${accent.number}
                    `}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <h4 className="type-body font-semibold text-white/90 group-hover:text-white transition-colors duration-base">
                      {point.title}
                    </h4>
                    <p className="type-support text-white/50 mt-1.5 leading-relaxed group-hover:text-white/65 transition-colors duration-base">
                      {point.detail}
                    </p>
                    {point.url && (
                      <a
                        href={point.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          inline-flex items-center gap-1.5 mt-2.5 type-caption font-medium
                          transition-colors duration-base ${accent.link}
                        `}
                      >
                        Visit Dimensional
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        <span className="sr-only">(opens in new tab)</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {/* Bottom border */}
            <div className={`border-t transition-colors duration-base ${accent.border}`} />
          </div>
        </div>
      </Container>

      {/* Decorative background ordinal */}
      <div
        className="absolute -right-4 lg:right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
        aria-hidden="true"
      >
        <span
          className={`
            text-[18rem] xl:text-[22rem] font-black leading-none tracking-tighter
            transition-colors duration-slow ${accent.ordinal}
          `}
        >
          {strategy.ordinal}
        </span>
      </div>
    </section>
  )
}
