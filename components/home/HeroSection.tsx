'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Badge, ButtonLink, Container, DisclaimerText } from '@/components/ui'

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
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-sogif-navy">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://www.datocms-assets.com/192130/1768821769-background.webp?w=1920&fit=max&auto=format"
          alt=""
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sogif-navy/90 via-sogif-navy/60 to-sogif-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-sogif-navy/80 via-transparent to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-sogif-cyan-light/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-sogif-gold/10 rounded-full blur-3xl" />

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
              <Badge variant="announcementCyan" className="gap-2">
                <span className="w-2 h-2 bg-sogif-success rounded-full animate-pulse" />
                <span>Now accepting new investors</span>
              </Badge>
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

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
            >
              <DisclaimerText tone="hero">
                *Past performance is not a reliable indicator of future performance
              </DisclaimerText>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid gap-4"
          >
            {heroContent.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 backdrop-blur-sm ${stat.highlight
                  ? 'bg-gradient-to-br from-sogif-cyan-light/25 to-sogif-cyan-light/[0.07] border border-sogif-cyan-light/35'
                  : 'bg-white/[0.07] border border-white/[0.12]'
                  }`}
              >
                {stat.highlight && (
                  <div className="absolute top-0 right-0 bg-sogif-cyan-light text-sogif-navy type-overline font-bold px-3 py-1 rounded-bl-lg">
                    KEY METRIC
                  </div>
                )}
                <p
                  className={`type-metric font-bold mb-2 ${stat.highlight ? 'text-sogif-cyan-light' : 'text-white'
                    }`}
                >
                  {stat.value}
                </p>
                <p className="text-white/90 type-support">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator - in document flow, pushed to bottom by flex */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="relative z-10 flex justify-center pb-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/75"
        >
          <svg className="w-5 h-5 text-sogif-gold/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
