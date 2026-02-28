'use client'

import { useState, type ComponentType } from 'react'
import { ChartNoAxesCombined, HandCoins, Landmark, ShieldCheck, TrendingUp } from 'lucide-react'
import { A11y, Autoplay, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { AppLink, Container, SectionHeader, SwiperControls } from '@/components/ui'
import { cn } from '@/lib/utils'

import 'swiper/css'

interface StrategyPair {
    title: string
    description: string
    icon: ComponentType<{ className?: string }>
}

type AccentColor = 'cyan-light' | 'gold' | 'success'

const accentVar = (accent: AccentColor) =>
    ({ '--slide-accent': `var(--sogif-${accent})` }) as React.CSSProperties

interface ValueSlide {
    id: string
    label: string
    title: string
    description: string
    strategyPairs: StrategyPair[]
    ctaHref: string
    ctaLabel: string
    accent: AccentColor
}

const slides: ValueSlide[] = [
    {
        id: 'passive-income',
        label: 'Capital Distributions',
        title: 'Passive Income, Paid Quarterly',
        description:
            'Convert portfolio performance into usable cash flow while keeping long-term growth in play.',
        strategyPairs: [
            {
                title: 'Diversified income mix',
                description:
                    'We combine interest, dividends, and realised gains so distributions are steadier across changing market cycles.',
                icon: ChartNoAxesCombined,
            },
            {
                title: 'Governed payout decisions',
                description:
                    'Responsible Entity oversight sets clear payout guardrails, helping protect investors through transparent decisions.',
                icon: ShieldCheck,
            },
            {
                title: 'Cashflow-first policy',
                description:
                    'A practical distribution cadence supports dependable income without forcing short-term exits.',
                icon: HandCoins,
            },
        ],
        ctaHref: '/apply',
        ctaLabel: 'apply',
        accent: 'gold',
    },
    {
        id: 'property-opportunity',
        label: 'Commercial Property Alpha',
        title: 'Commercial Property With Pricing Edge',
        description:
            'We focus on Australian commercial assets where competition is often thinner and disciplined selection can improve entry quality.',
        strategyPairs: [
            {
                title: '$7m-$25m opportunity band',
                description:
                    'Targeting this range helps us access a less crowded segment where pricing can be more attractive.',
                icon: Landmark,
            },
            {
                title: 'Framework-led asset selection',
                description:
                    'We apply tested acquisition filters before deployment to strengthen downside control without losing upside.',
                icon: ShieldCheck,
            },
            {
                title: 'Lower-complexity operations',
                description:
                    'Favouring easier-to-run asset profiles can reduce operational drag and support more durable execution.',
                icon: TrendingUp,
            },
        ],
        ctaHref: '/portfolio',
        ctaLabel: 'Portfolio',
        accent: 'cyan-light',
    },
    {
        id: 'equities-approach',
        label: 'Efficient Asset Overlay',
        title: 'Liquid Overlay For Balance And Control',
        description:
            'Listed assets add liquidity and diversification around core property holdings, helping the portfolio stay adaptable.',
        strategyPairs: [
            {
                title: 'Systematic core exposure',
                description:
                    'A broad ETF-led base keeps market participation efficient while preserving daily liquidity.',
                icon: ChartNoAxesCombined,
            },
            {
                title: 'Quality-focused tilt',
                description:
                    'Selective exposure to profitable, durable businesses aims to lift return quality over time.',
                icon: ShieldCheck,
            },
            {
                title: 'Hedge and rebalance loop',
                description:
                    'Risk controls and disciplined rebalancing help reduce avoidable volatility while keeping allocation on plan.',
                icon: TrendingUp,
            },
        ],
        ctaHref: '/performance',
        ctaLabel: 'See Performance Method',
        accent: 'success',
    },
]


const accentHsl: Record<AccentColor, string> = {
    'cyan-light': 'hsl(var(--sogif-cyan-light))',
    'gold': 'hsl(var(--sogif-gold))',
    'success': 'hsl(var(--sogif-success))',
}

export function ValueCarousel() {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const activeSlide = slides[activeIndex] ?? slides[0]

    return (
        <section className="relative bg-sogif-navy">
            <div className="pointer-events-none absolute inset-0">
                {slides.map((slide, i) => (
                    <div
                        key={slide.id}
                        style={accentVar(slide.accent)}
                        className={cn(
                            'absolute inset-0 bg-gradient-to-br from-sogif-navy via-sogif-navy/90 to-[hsl(var(--slide-accent)_/_0.1)] transition-opacity duration-700 ease-out',
                            activeIndex === i ? 'opacity-100' : 'opacity-0'
                        )}
                    />
                ))}
            </div>

            <Swiper
                modules={[A11y, Autoplay, Keyboard]}
                slidesPerView={1}
                loop
                autoplay={{ delay: 6000, disableOnInteraction: true }}
                keyboard={{ enabled: true }}
                onSwiper={setSwiperInstance}
                onSlideChange={(s) => setActiveIndex(s.realIndex)}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} style={accentVar(slide.accent)}>
                        <article className="relative section-padding">
                            <Container className="relative grid gap-8 lg:grid-cols-12 lg:gap-12">
                                <div className="lg:col-span-5">
                                    <SectionHeader
                                        eyebrow={slide.label}
                                        title={slide.title}
                                        description={slide.description}
                                        eyebrowClassName="text-[hsl(var(--slide-accent))]"
                                        align="left"
                                        dark
                                    />
                                    <AppLink
                                        href={slide.ctaHref}
                                        variant="light"
                                        showArrow
                                        className="mt-5 hover:text-[hsl(var(--slide-accent))]"
                                    >
                                        {slide.ctaLabel}
                                    </AppLink>
                                </div>

                                <div className="space-y-3 lg:col-span-7">
                                    {slide.strategyPairs.map((pair) => {
                                        const PairIcon = pair.icon
                                        return (
                                            <div
                                                key={pair.title}
                                                className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                                            >
                                                <div className="mb-2 flex items-center gap-2">
                                                    <PairIcon className="size-6 text-[hsl(var(--slide-accent))]" />
                                                    <h4 className="type-support font-semibold text-white">{pair.title}</h4>
                                                </div>
                                                <p className="type-caption text-white/75">{pair.description}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Container>
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="relative z-10 pb-12 md:pb-14">
                <SwiperControls
                    swiper={swiperInstance}
                    activeIndex={activeIndex}
                    slideCount={slides.length}
                    accentColor={accentHsl[activeSlide.accent]}
                />
            </div>
        </section>
    )
}
