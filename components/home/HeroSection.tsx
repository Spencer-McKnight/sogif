'use client'

import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ButtonLink, Container } from '@/components/ui'
import { HeroStats } from './HeroStats'

// TODO: Replace with CMS-managed content
const heroContent = {
    headlineTop: 'Patient Capital',
    headlineBottom: 'Actively Managed',
    subheadline: 'Gain access to Steve McKnight’s selected Australian commercial property as we analyse and acquire. Amplify growth and strategically diversify with actively managed shares. Recieve quarterly distributions for passive income.',
    stats: [
        { value: '6.7%', label: 'Historical Annual Return*', highlight: true },
        { value: '$170M+', label: 'Funds Under Management' },
        { value: '$10,000', label: 'Minimum Investment' },
    ],
    ctaPrimary: { label: 'Join the Fund', href: '/invest' },
    ctaSecondary: { label: 'Performance', href: '#performance' },
}

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
}

export function HeroSection() {
    const shouldReduceMotion = useReducedMotion()
    const { scrollY } = useScroll()
    const backgroundY = useTransform(
        scrollY,
        [0, 600],
        shouldReduceMotion ? [0, 0] : [0, 68]
    )

    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-sogif-navy">
            {/* Background Image */}
            <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
                <Image
                    src="https://www.datocms-assets.com/192130/1768821769-background.webp?w=1920&fit=max&auto=format"
                    alt=""
                    fill
                    className="object-cover object-[center_10%] opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-sogif-navy/90 via-sogif-navy/70 to-sogif-navy/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-sogif-navy/90 via-sogif-navy/60 to-sogif-navy/20" />
            </motion.div>

            {/* Content - flex-1 to fill available space, centered vertically */}
            <Container className="relative z-10 flex-1 flex items-center w-full pt-24 pb-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Text Content */}
                    <motion.div
                        initial="initial"
                        animate="animate"
                        transition={{ staggerChildren: 0.1 }}
                    >
                        <motion.div
                            variants={fadeInUp}
                            transition={{ duration: 0.5 }}
                            className="mb-6"
                        >
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            transition={{ duration: 0.5 }}
                            className="type-display font-bold text-white mb-6"
                        >
                            <span className="relative inline-block">
                                {heroContent.headlineTop}
                                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-sogif-gold/80 to-sogif-gold/20 rounded-full" />
                            </span>
                            <br />
                            <span className="text-sogif-cyan-light">{heroContent.headlineBottom}</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            transition={{ duration: 0.5 }}
                            className="type-body text-white/90 mb-8 max-w-xl"
                        >
                            {heroContent.subheadline}
                        </motion.p>

                        <motion.div
                            variants={fadeInUp}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 mb-12"
                        >
                            <ButtonLink
                                href={heroContent.ctaPrimary.href}
                                variant="primary"
                                size="lg"
                                glow="gold"
                                className="group focus-ring-inverse"
                            >
                                {heroContent.ctaPrimary.label}
                            </ButtonLink>
                            <ButtonLink
                                href={heroContent.ctaSecondary.href}
                                variant="outline"
                                size="lg"
                            >
                                {heroContent.ctaSecondary.label}
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </ButtonLink>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Stats Display */}
                    <HeroStats stats={heroContent.stats} />
                </div>
            </Container>
        </section>
    )
}
