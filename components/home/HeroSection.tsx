'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

// TODO: Replace with CMS-managed content
const heroContent = {
  headline: 'Strategic Growth. Reliable Income.',
  subheadline: 'A diversified Australian managed fund delivering consistent quarterly returns through strategic property and asset investments.',
  stats: [
    { value: '8.3%', label: 'Historical Annual Return*', highlight: true },
    { value: '$130M+', label: 'Funds Under Management' },
    { value: '$10,000', label: 'Minimum Investment' },
  ],
  ctaPrimary: { label: 'Start Investing', href: '/invest' },
  ctaSecondary: { label: 'Register Interest', href: '#register' },
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-sogif-navy">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://www.datocms-assets.com/192130/1768821769-background.webp?w=1920&fit=max&auto=format"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sogif-navy via-sogif-navy/95 to-sogif-navy/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-sogif-navy via-transparent to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-sogif-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-sogif-gold/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
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
              className="inline-flex items-center gap-2 bg-sogif-cyan/10 border border-sogif-cyan/30 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 bg-sogif-success rounded-full animate-pulse" />
              <span className="text-sogif-cyan text-sm font-medium">
                Now accepting new investors
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              {heroContent.headline.split('. ').map((part, i) => (
                <span key={i}>
                  {i === 1 ? (
                    <span className="text-sogif-cyan">{part}</span>
                  ) : (
                    <>{part}. </>
                  )}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-lg sm:text-xl text-white/70 mb-8 max-w-xl leading-relaxed"
            >
              {heroContent.subheadline}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href={heroContent.ctaPrimary.href}
                className="group inline-flex items-center justify-center gap-2 bg-sogif-cyan hover:bg-sogif-cyan/90 text-sogif-navy font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-sogif-cyan/25 text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sogif-navy"
              >
                {heroContent.ctaPrimary.label}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href={heroContent.ctaSecondary.href}
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 hover:border-white/60 hover:bg-white/5 text-white font-semibold px-8 py-4 rounded-xl transition-all text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sogif-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-sogif-navy"
              >
                {heroContent.ctaSecondary.label}
              </Link>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-white/40 text-xs"
            >
              *Past performance is not a reliable indicator of future performance
            </motion.p>
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
                className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 ${
                  stat.highlight
                    ? 'bg-gradient-to-br from-sogif-cyan/20 to-sogif-cyan/5 border border-sogif-cyan/30'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                {stat.highlight && (
                  <div className="absolute top-0 right-0 bg-sogif-cyan text-sogif-navy text-xs font-bold px-3 py-1 rounded-bl-lg">
                    KEY METRIC
                  </div>
                )}
                <p
                  className={`text-4xl sm:text-5xl font-bold mb-2 ${
                    stat.highlight ? 'text-sogif-cyan' : 'text-white'
                  }`}
                >
                  {stat.value}
                </p>
                <p className="text-white/60 text-sm sm:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs uppercase tracking-wider">Discover More</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
