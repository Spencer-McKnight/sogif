'use client'

import { motion } from 'framer-motion'

interface Stat {
  value: string
  label: string
}

interface HeroStatsProps {
  stats: Stat[]
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={{ staggerChildren: 0.08, delayChildren: 0.3 + index * 0.12 }}
      className="relative group"
    >
      {/* Content */}
      <div className="relative px-3 md:px-4 lg:px-5 py-1.5 md:py-4 lg:py-5 text-center">
        {/* Value */}
        <motion.p
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="type-title md:type-metric font-bold tracking-tight text-white"
        >
          {stat.value}
        </motion.p>

        {/* Decorative line under value */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
          className="mx-auto mt-1 mb-1 md:mt-2 md:mb-2 h-px w-8 md:w-10 lg:w-12 origin-center bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />

        {/* Label */}
        <motion.p
          variants={fadeIn}
          transition={{ duration: 0.4 }}
          className="type-caption text-white/70"
        >
          {stat.label}
        </motion.p>
      </div>
    </motion.div>
  )
}

export function HeroStats({ stats }: HeroStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full lg:w-auto lg:ml-auto max-w-md md:max-w-2xl lg:max-w-none mx-auto lg:mx-0"
    >
      {/* Stats container - vertical stack on mobile, horizontal row on tablet, vertical on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-0 md:gap-3 lg:gap-2 rounded-2xl p-2 md:p-5 lg:p-3">
        {stats.map((stat, index) => (
          <StatItem key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </motion.div>
  )
}
