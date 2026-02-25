'use client'

import { useMemo } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion' // kept for parallax only
import { StructuredText } from 'react-datocms'
import { ButtonLink, Container, DatoImage } from '@/components/ui'
import { usePerformanceSafe } from '@/lib'
import type { HomePageData } from '@/lib'
import { HeroStats } from './HeroStats'

interface HeroSectionProps {
    cms: HomePageData
}

export function HeroSection({ cms }: HeroSectionProps) {
    const shouldReduceMotion = useReducedMotion()
    const { scrollY } = useScroll()
    const backgroundY = useTransform(
        scrollY,
        [0, 800],
        shouldReduceMotion ? [0, 0] : [0, 90]
    )

    // Get dynamic performance data
    const performanceData = usePerformanceSafe()

    const {
        heroHeadlineTop: headlineTop,
        heroHeadlineBottom: headlineBottom,
        heroSubheadline,
        heroStaticStats,
        heroCtaLabel: ctaLabel,
        heroCtaHref: ctaHref,
        heroBackgroundImage,
        heroDisclaimer: disclaimer,
    } = cms

    const staticStats = heroStaticStats.map((stat) => ({
        value: stat.value,
        label: stat.label,
    }))

    // Build stats array with dynamic performance metrics
    const stats = useMemo(() => {
        const trailingReturn = performanceData
            ? `${performanceData.stats.cumulativePrevYear.toFixed(2)}%`
            : '—'

        return [
            { value: trailingReturn, label: 'Return in last 12 Months*', highlight: true },
            ...staticStats,
        ]
    }, [performanceData, staticStats])

    return (
        <section className="relative sm:min-h-[90vh] md:min-h-[80vh] lg:min-h-[70vh] flex flex-col overflow-hidden bg-sogif-navy">
            {/* Background Image */}
            <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
                <DatoImage
                    data={heroBackgroundImage}
                    className="h-full w-full"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center 10%"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-sogif-navy/55" />
                <div className="absolute inset-0 bg-gradient-to-r from-sogif-navy/70 via-sogif-navy/30 to-sogif-navy/25" />
                <div className="absolute inset-0 bg-gradient-to-t from-sogif-navy/60 via-sogif-navy/30 to-sogif-navy/25" />
            </motion.div>

            {/* Content - flex-1 to fill available space, centered vertically */}
            <Container className="relative z-10 flex-1 flex items-center w-full pb-12 pt-36 md:pb-12 lg:pb-20">
                <div className="w-full grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                    {/* Left Column - Text Content (7/12) */}
                    <div className="lg:col-span-8 xl:col-span-7 text-center lg:text-left w-full max-w-2xl lg:max-w-none mx-auto lg:mx-0">
                        <h1 className="type-display text-white mb-5 md:mb-6">
                            <span className="relative inline-block">
                                {headlineTop}
                                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-sogif-gold/80 to-sogif-gold/35 rounded-full" />
                            </span>
                            <br />
                            <span className="text-sogif-cyan-light">{headlineBottom}</span>
                        </h1>

                        {Boolean(heroSubheadline?.value) && (
                            <div className="type-body text-white/90 mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 [&_p]:m-0">
                                <StructuredText data={heroSubheadline} />
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                            <ButtonLink
                                href={ctaHref}
                                variant="primary"
                                size="lg"
                                glow="gold"
                                className="group focus-ring-inverse"
                            >
                                {ctaLabel}
                            </ButtonLink>
                        </div>
                    </div>

                    {/* Right Column - Stats Display (5/12) */}
                    <div className="lg:col-span-4 lg:col-start-9">
                        <HeroStats stats={stats} />
                    </div>
                </div>
            </Container>

            {/* Past performance disclaimer */}
            {disclaimer && (
                <p className="relative type-caption text-white/70 text-center pb-4 px-4">
                    {disclaimer}
                </p>
            )}

            {/* Bottom edge separator */}
            <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
                style={{
                    background:
                        'linear-gradient(to right, transparent, hsl(189 100% 65% / 0.25) 30%, hsl(189 100% 65% / 0.25) 70%, transparent)',
                }}
            />
        </section>
    )
}
