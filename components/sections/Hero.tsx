'use client'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

// TODO: Replace with CMS content
const HERO_CONTENT = {
  eyebrow: 'Strategic Opportunities Growth Index Fund',
  headline: 'Build Wealth Through',
  headlineAccent: 'Strategic Opportunities',
  subheadline: 'Access institutional-grade property investments with as little as $10,000. Join sophisticated investors earning consistent returns.',
  primaryCta: 'Start Investing',
  secondaryCta: 'View Performance',
  stats: [
    { value: '12.4%', label: 'Avg. Annual Return' },
    { value: '$48M+', label: 'Assets Under Management' },
    { value: '340+', label: 'Active Investors' },
  ],
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-400/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
        
        {/* Diagonal Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonal" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0" stroke="#00D9FF" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal)" />
        </svg>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute top-20 right-[15%] w-20 h-20 border border-cyan-400/20 rotate-45 animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-32 left-[10%] w-12 h-12 bg-cyan-400/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-[8%] w-3 h-3 bg-cyan-400 rounded-full animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-[25%] w-2 h-2 bg-cyan-300 rounded-full animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

      <Container className="relative z-10 py-20 md:py-32">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-8 animate-fade-in">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
              {HERO_CONTENT.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-6 animate-slide-up">
            {HERO_CONTENT.headline}
            <br />
            <span className="relative inline-block">
              <span className="text-cyan-400">{HERO_CONTENT.headlineAccent}</span>
              <svg 
                className="absolute -bottom-2 left-0 w-full" 
                viewBox="0 0 300 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M2 8C50 4 100 2 150 4C200 6 250 10 298 6" 
                  stroke="url(#underline-gradient)" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="300" y2="0">
                    <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#00D9FF" />
                    <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {HERO_CONTENT.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button size="lg">
              {HERO_CONTENT.primaryCta}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
              {HERO_CONTENT.secondaryCta}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 pt-8 border-t border-white/10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {HERO_CONTENT.stats.map((stat, index) => (
              <div key={index} className="text-center md:text-left">
                <div className="text-2xl md:text-4xl font-serif text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
    </section>
  )
}

