'use client'

import { useState, type ComponentType } from 'react'
import { ChartNoAxesCombined, ChevronLeft, ChevronRight, HandCoins, Landmark, ShieldCheck, TrendingUp } from 'lucide-react'
import { A11y, Autoplay, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { AppLink, Container, SectionHeader } from '@/components/ui'
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
    icon: ComponentType<{ className?: string }>
    accent: AccentColor
}

const slides: ValueSlide[] = [
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
        ctaHref: '/properties',
        ctaLabel: 'Properties',
        icon: Landmark,
        accent: 'cyan-light',
    },
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
        ctaHref: '/invest',
        ctaLabel: 'See Income Approach',
        icon: HandCoins,
        accent: 'gold',
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
        icon: ChartNoAxesCombined,
        accent: 'success',
    },
]

const INDICATOR_WIDTH = 68 // 1×32px active + 2×8px inactive + 2×10px gap

function CarouselControls({
    swiper,
    activeIndex,
    slideCount,
    activeSlide,
}: {
    swiper: SwiperType | null
    activeIndex: number
    slideCount: number
    activeSlide: ValueSlide
}) {
    if (!swiper) return null

    return (
        <div className="flex items-center justify-center gap-1" style={accentVar(activeSlide.accent)}>
            <button
                onClick={() => swiper.slidePrev()}
                aria-label="Previous slide"
                className="group flex h-20 w-20 items-center justify-center text-white/30 transition-colors duration-200 hover:text-white focus-ring-inverse"
            >
                <ChevronLeft className="h-7 w-7 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </button>

            <div
                className="flex items-center justify-center gap-2.5"
                style={{ width: INDICATOR_WIDTH }}
                role="tablist"
                aria-label="Slide navigation"
            >
                {Array.from({ length: slideCount }).map((_, i) => (
                    <button
                        key={i}
                        role="tab"
                        aria-selected={activeIndex === i}
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => swiper.slideToLoop(i)}
                        className={cn(
                            'h-2 rounded-full transition-all duration-300 focus-ring-inverse',
                            activeIndex === i
                                ? 'w-8 bg-[hsl(var(--slide-accent))]'
                                : 'w-2 bg-white/30 hover:bg-white/70'
                        )}
                    />
                ))}
            </div>

            <button
                onClick={() => swiper.slideNext()}
                aria-label="Next slide"
                className="group flex h-[88px] w-[88px] items-center justify-center text-white/30 transition-colors duration-200 hover:text-white focus-ring-inverse"
            >
                <ChevronRight className="h-7 w-7 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
        </div>
    )
}

export function ValueCarousel() {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const activeSlide = slides[activeIndex] ?? slides[0]

    return (
        <section className="relative overflow-hidden bg-sogif-navy">
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
                className="[&_.swiper-slide]:!h-auto [&_.swiper-wrapper]:items-stretch"
            >
                {slides.map((slide) => {
                    return (
                        <SwiperSlide key={slide.id} className="flex h-auto w-full" style={accentVar(slide.accent)}>
                            <article className="relative section-padding flex h-full w-full items-center overflow-hidden">
                                <Container className="relative grid h-full gap-8 lg:grid-cols-12 lg:gap-9">
                                    <div className="flex h-full flex-col lg:col-span-5">
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
                                            className="mt-5 shrink-0 hover:text-[hsl(var(--slide-accent))]"
                                        >
                                            {slide.ctaLabel}
                                        </AppLink>
                                    </div>

                                    <div className="flex h-full lg:col-span-7">
                                        <div className="flex h-full w-full flex-col">
                                            <div className="flex-1 space-y-3">
                                                {slide.strategyPairs.map((pair) => {
                                                    const PairIcon = pair.icon

                                                    return (
                                                        <div
                                                            key={pair.title}
                                                            className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                                                        >
                                                            <div className="mb-2 flex items-center gap-2">
                                                                <PairIcon className="h-4 w-4 text-[hsl(var(--slide-accent))]" />
                                                                <h4 className="type-support font-semibold text-white">{pair.title}</h4>
                                                            </div>
                                                            <p className="type-caption text-white/75">{pair.description}</p>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                        </div>
                                    </div>
                                </Container>
                            </article>
                        </SwiperSlide>
                    )
                })}
            </Swiper>

            <div className="absolute bottom-7 left-0 right-0 z-10 md:bottom-8">
                <CarouselControls
                    swiper={swiperInstance}
                    activeIndex={activeIndex}
                    slideCount={slides.length}
                    activeSlide={activeSlide}
                />
            </div>
        </section>
    )
}
