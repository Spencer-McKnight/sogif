'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Wallet, 
  TrendingUp, 
  Shield, 
  Building2, 
  Users, 
  Clock,
  CheckCircle2
} from 'lucide-react'

// TODO: Replace with CMS content
const benefitsContent = {
  headline: 'Why Invest with SOGIF?',
  subheadline: 'A strategic blend of growth potential and income generation, backed by experienced fund management and diversified assets.',
  benefits: [
    {
      icon: Wallet,
      title: 'Quarterly Distributions',
      description: 'Regular income payments every quarter, providing reliable cash flow for investors.',
      color: 'cyan',
    },
    {
      icon: TrendingUp,
      title: 'Long-term Growth',
      description: 'Strategic asset allocation targeting capital appreciation alongside income returns.',
      color: 'gold',
    },
    {
      icon: Building2,
      title: 'Property-Backed Security',
      description: 'Diversified portfolio including commercial property investments in Australia and abroad.',
      color: 'success',
    },
    {
      icon: Shield,
      title: 'AFSL Regulated',
      description: 'Fully compliant with Australian financial services regulations and ASIC requirements.',
      color: 'navy',
    },
    {
      icon: Users,
      title: 'Expert Management',
      description: 'Managed by experienced directors with decades of investment and fund management expertise.',
      color: 'cyan',
    },
    {
      icon: Clock,
      title: 'Flexible Investment',
      description: 'Start with $5,000 minimum, with options for automatic investment plans from $250/month.',
      color: 'gold',
    },
  ],
  highlights: [
    'Australian Registered Managed Fund (ARSN 668 357 837)',
    'Responsible Entity: Plantation Capital Limited (AFSL 339481)',
    'Diversified across cash, bonds, property and strategic opportunities',
    'Online investor portal for real-time portfolio tracking',
  ],
}

const colorMap = {
  cyan: { bg: 'bg-sogif-cyan/10', text: 'text-sogif-cyan', border: 'border-sogif-cyan/20' },
  gold: { bg: 'bg-sogif-gold/10', text: 'text-sogif-gold', border: 'border-sogif-gold/20' },
  success: { bg: 'bg-sogif-success/10', text: 'text-sogif-success', border: 'border-sogif-success/20' },
  navy: { bg: 'bg-sogif-navy/10', text: 'text-sogif-navy', border: 'border-sogif-navy/20' },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

export function BenefitsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-sogif-navy relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-sogif-cyan/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-sogif-gold/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            {benefitsContent.headline}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {benefitsContent.subheadline}
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {benefitsContent.benefits.map((benefit) => {
            const colors = colorMap[benefit.color as keyof typeof colorMap]
            return (
              <motion.div
                key={benefit.title}
                variants={fadeInUp}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className={`h-7 w-7 ${colors.text}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/60 leading-relaxed">{benefit.description}</p>

                {/* Hover Accent */}
                <div className={`absolute inset-x-0 bottom-0 h-1 ${colors.bg} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Highlights Strip */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-8"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            {benefitsContent.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-sogif-success shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">{highlight}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

