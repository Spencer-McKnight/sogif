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
      <div className="relative px-6 py-5 text-center">
        {/* Value */}
        <motion.p
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className={`type-heading text-xl font-bold tracking-tight text-white`}
        >
          {stat.value}
        </motion.p>

        {/* Decorative line under value */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
          className={`mx-auto mt-2 mb-2 h-px w-12 origin-center bg-gradient-to-r from-transparent via-white/25 to-transparent'}`}
        />

        {/* Label */}
        <motion.p
          variants={fadeIn}
          transition={{ duration: 0.4 }}
          className="type-support text-white/75"
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
      className="grid gap-6"
    >
      {/* Stats container */}
      <div className="grid gap-5">
        {stats.map((stat, index) => (
          <StatItem key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </motion.div>
  )
}
