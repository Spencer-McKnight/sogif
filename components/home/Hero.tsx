'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

// TODO: Replace with CMS content
const HERO_CONTENT = {
  stat: '8.3%',
  statLabel: 'Historical Annual Return',
  headline: 'Strategic Property Returns. Quarterly Income.',
  subheadline: '$130M+ invested across Australia\'s growth corridors.',
  primaryCta: { label: 'Apply Now', href: '/invest' },
  secondaryCta: { label: 'Investor Portal', href: 'https://portal.sogif.au' },
  urgency: 'Closing to new investment June 2026',
  disclaimer: '*Past performance is not indicative of future results.',
}

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sogif-cyan/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-sogif-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Performance Stat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-baseline gap-2">
              <span className="text-7xl sm:text-8xl lg:text-9xl font-bold text-sogif-cyan tracking-tight">
                {HERO_CONTENT.stat}
              </span>
              <span className="text-lg sm:text-xl text-primary-foreground/70 font-medium">
                {HERO_CONTENT.statLabel}*
              </span>
            </span>
          </motion.div>

          {/* Headlines */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary-foreground tracking-tight mb-4"
          >
            {HERO_CONTENT.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10"
          >
            {HERO_CONTENT.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Link
              href={HERO_CONTENT.primaryCta.href}
              className="inline-flex items-center justify-center rounded-md bg-sogif-cyan px-8 py-3.5 text-base font-semibold text-sogif-navy shadow-lg shadow-sogif-cyan/25 hover:bg-sogif-cyan/90 hover:shadow-sogif-cyan/40 transition-all"
            >
              {HERO_CONTENT.primaryCta.label}
            </Link>
            <a
              href={HERO_CONTENT.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-base font-medium text-primary-foreground/80 hover:text-sogif-cyan transition-colors group"
            >
              {HERO_CONTENT.secondaryCta.label}
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>

          {/* Urgency Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-sogif-gold/20 border border-sogif-gold/30 px-4 py-1.5 text-sm font-medium text-sogif-gold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sogif-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sogif-gold" />
              </span>
              {HERO_CONTENT.urgency}
            </span>
          </motion.div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xs text-primary-foreground/40"
          >
            {HERO_CONTENT.disclaimer}
          </motion.p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-primary-foreground/40">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

