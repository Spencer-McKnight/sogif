'use client'

import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

// TODO: Replace with CMS content
const STEPS_CONTENT = {
  eyebrow: 'Get Started',
  title: 'Start Investing in',
  titleAccent: 'Three Simple Steps',
  description: 'Our streamlined process gets you from registration to your first investment in minutes.',
  steps: [
    {
      number: '01',
      title: 'Register & Verify',
      description: 'Create your account and complete our quick digital verification process. Takes less than 5 minutes.',
      icon: 'user',
    },
    {
      number: '02',
      title: 'Choose Your Investment',
      description: 'Select your investment amount starting from $10,000. Review our portfolio and fund documents.',
      icon: 'chart',
    },
    {
      number: '03',
      title: 'Start Earning',
      description: 'Transfer funds securely and begin receiving quarterly distributions directly to your account.',
      icon: 'wallet',
    },
  ],
  cta: 'Begin Your Journey',
  minInvestment: '$10,000',
}

const icons = {
  user: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  chart: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  wallet: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
}

function StepCard({ step, isLast }: { step: typeof STEPS_CONTENT.steps[0]; isLast: boolean }) {
  const iconKey = step.icon as keyof typeof icons
  
  return (
    <div className="relative group">
      {/* Connection Line */}
      {!isLast && (
        <div className="hidden lg:block absolute top-16 left-full w-full h-px z-0">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 via-cyan-400/20 to-transparent" />
            {/* Animated dot */}
            <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse-slow" style={{ left: '40%' }} />
          </div>
        </div>
      )}
      
      {/* Card */}
      <div className="relative bg-white rounded-3xl p-8 shadow-lg shadow-navy-900/5 hover:shadow-xl hover:shadow-navy-900/10 transition-all duration-500 hover:-translate-y-2 h-full">
        {/* Step Number */}
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-navy-900 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
          <span className="text-cyan-400 font-serif text-xl">{step.number}</span>
        </div>
        
        {/* Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-cyan-400/5 rounded-2xl flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform duration-300">
          {icons[iconKey]}
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-semibold text-navy-900 mb-3">
          {step.title}
        </h3>
        <p className="text-slate-500 leading-relaxed">
          {step.description}
        </p>
        
        {/* Decorative Corner */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-slate-50 to-transparent rounded-tl-[60px]" />
      </div>
    </div>
  )
}

export function InvestingSteps() {
  return (
    <section className="relative py-24 md:py-32 bg-slate-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <svg className="absolute bottom-0 left-0 w-full h-1/2 text-navy-900/[0.02]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon fill="currentColor" points="0,100 100,60 100,100" />
        </svg>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 border-2 border-dashed border-cyan-400/20 rounded-full" />
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl" />
      
      <Container className="relative z-10">
        <SectionHeading
          eyebrow={STEPS_CONTENT.eyebrow}
          title={
            <>
              {STEPS_CONTENT.title}{' '}
              <span className="text-cyan-500">{STEPS_CONTENT.titleAccent}</span>
            </>
          }
          description={STEPS_CONTENT.description}
        />
        
        {/* Steps Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6 mb-16">
          {STEPS_CONTENT.steps.map((step, index) => (
            <StepCard 
              key={step.number} 
              step={step} 
              isLast={index === STEPS_CONTENT.steps.length - 1} 
            />
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-white rounded-2xl shadow-lg shadow-navy-900/5">
            <div className="text-left">
              <p className="text-sm text-slate-500">Minimum Investment</p>
              <p className="text-2xl font-serif text-navy-900">{STEPS_CONTENT.minInvestment}</p>
            </div>
            <div className="w-px h-12 bg-slate-200 hidden sm:block" />
            <Button size="lg">
              {STEPS_CONTENT.cta}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

