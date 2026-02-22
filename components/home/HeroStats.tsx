interface Stat {
  value: string
  label: string
}

interface HeroStatsProps {
  stats: Stat[]
}

function StatItem({ stat }: { stat: Stat }) {
  return (
    <div className="relative group">
      {/* Content */}
      <div className="relative px-3 md:px-4 lg:px-5 py-1.5 md:py-4 lg:py-5 text-center">
        {/* Value */}
        <p className="type-display font-semibold tracking-tight text-white">
          {stat.value}
        </p>

        {/* Decorative line under value */}
        <div className="mx-auto mt-1 mb-1 md:mt-2 md:mb-2 h-px w-8 md:w-10 lg:w-12 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Label */}
        <p className="type-caption text-white/70">
          {stat.label}
        </p>
      </div>
    </div>
  )
}

export function HeroStats({ stats }: HeroStatsProps) {
  return (
    <div className="max-w-sm mx-auto lg:max-w-none lg:mx-0">
      {/* Stats container - vertical stack on mobile, horizontal row on tablet, vertical on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-0 md:gap-3 lg:gap-2 rounded-2xl p-2 md:p-5 lg:p-3">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </div>
    </div>
  )
}
