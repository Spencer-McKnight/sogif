'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Shield, Building2, Wallet } from 'lucide-react'

// TODO: Replace with CMS content
const heroContent = {
  badge: 'Australian Registered Managed Fund',
  headline: {
    line1: 'Strategic Growth.',
    line2: 'Reliable Income.',
  },
  subheadline: 'Diversified investment strategies delivering quarterly distributions and long-term capital appreciation for Australian investors.',
  cta: {
    primary: { label: 'Start Investing', href: '/invest' },
    secondary: { label: 'View Performance', href: '/performance' },
  },
  trustBadges: [
    { icon: Shield, label: 'AFSL Regulated' },
    { icon: TrendingUp, label: 'Quarterly Distributions' },
    { icon: Building2, label: 'Property Backed' },
    { icon: Wallet, label: 'From $5,000' },
  ],
  stats: [
    { value: '$50M+', label: 'Assets Under Management' },
    { value: '6%+', label: 'Target Annual Return' },
    { value: '24', label: 'Months Track Record' },
  ],
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-sogif-navy">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sogif-navy-light via-sogif-navy to-sogif-navy" />
        
        {/* Floating Orbs */}
        <motion.div
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-sogif-cyan/5 blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-sogif-gold/5 blur-3xl"
        />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-sogif-success animate-pulse" />
              <span className="text-sm text-white/70">{heroContent.badge}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              <span className="text-white">{heroContent.headline.line1}</span>
              <br />
              <span className="bg-gradient-to-r from-sogif-cyan via-cyan-300 to-sogif-gold bg-clip-text text-transparent">
                {heroContent.headline.line2}
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeInUp}
              className="text-lg text-white/60 max-w-lg mb-10 leading-relaxed"
            >
              {heroContent.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href={heroContent.cta.primary.href}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-sogif-cyan to-cyan-400 text-sogif-navy font-semibold rounded-xl hover:shadow-xl hover:shadow-sogif-cyan/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                {heroContent.cta.primary.label}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={heroContent.cta.secondary.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                {heroContent.cta.secondary.label}
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-6"
            >
              {heroContent.trustBadges.map((badge, index) => (
                <motion.div
                  key={badge.label}
                  variants={fadeInUp}
                  custom={index}
                  className="flex items-center gap-2 text-white/50"
                >
                  <badge.icon className="h-4 w-4 text-sogif-cyan" />
                  <span className="text-sm">{badge.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Stats Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Decorative Ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-sogif-cyan/20 via-transparent to-sogif-gold/20 rounded-3xl blur-xl" />
            
            {/* Stats Card */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 lg:p-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                <div>
                  <p className="text-white/50 text-sm mb-1">Current Unit Price</p>
                  <p className="text-3xl font-bold text-white">$1.0562</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-sogif-success/20 rounded-full">
                  <TrendingUp className="h-4 w-4 text-sogif-success" />
                  <span className="text-sm font-medium text-sogif-success">+5.62%</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {heroContent.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Mini Chart Placeholder */}
              <div className="relative h-24 mb-6 overflow-hidden rounded-xl bg-white/5">
                <svg viewBox="0 0 400 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                    d="M0,80 Q50,75 100,60 T200,50 T300,35 T400,20"
                    fill="none"
                    stroke="#00D9FF"
                    strokeWidth="2"
                  />
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    d="M0,80 Q50,75 100,60 T200,50 T300,35 T400,20 V100 H0 Z"
                    fill="url(#chartGradient)"
                  />
                </svg>
                <div className="absolute bottom-2 right-3 text-xs text-white/40">24-month performance</div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between px-4 py-3 bg-white/5 rounded-lg">
                  <span className="text-white/50">Next Distribution</span>
                  <span className="text-white font-medium">Mar 2026</span>
                </div>
                <div className="flex justify-between px-4 py-3 bg-white/5 rounded-lg">
                  <span className="text-white/50">Min. Investment</span>
                  <span className="text-white font-medium">$5,000</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

