'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, ExternalLink, FileText, UserPlus, Wallet } from 'lucide-react'

// TODO: Replace with CMS content
const ctaContent = {
  prospective: {
    headline: 'Ready to Invest?',
    description: 'Join a growing community of investors benefiting from strategic growth opportunities and quarterly income distributions.',
    ctas: [
      {
        icon: UserPlus,
        label: 'Register Interest',
        description: 'Get updates and early access',
        href: '/invest#register',
        primary: false,
      },
      {
        icon: Wallet,
        label: 'Apply Online',
        description: 'Start investing in minutes',
        href: '/invest',
        primary: true,
      },
      {
        icon: FileText,
        label: 'Download PDS',
        description: 'Review fund details',
        href: '/disclosures#pds',
        primary: false,
      },
    ],
    minInvestment: '$5,000 minimum investment',
  },
  existing: {
    headline: 'Existing Investor?',
    description: 'Access your portfolio, view statements, and manage your investment through our secure investor portal.',
    cta: {
      label: 'Access Investor Portal',
      href: 'https://portal.sogif.au',
      external: true,
    },
    features: [
      'Real-time portfolio valuations',
      'Download statements & reports',
      'Manage distribution preferences',
      'Update your details',
    ],
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-sogif-navy relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-sogif-cyan/10 to-sogif-gold/10 blur-3xl" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Prospective Investors */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 lg:p-10 h-full">
              {/* Accent line */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-sogif-cyan to-cyan-400 rounded-full" />
              
              <h3 className="text-2xl lg:text-3xl font-bold text-sogif-navy mb-3">
                {ctaContent.prospective.headline}
              </h3>
              <p className="text-muted-foreground mb-8">
                {ctaContent.prospective.description}
              </p>

              {/* CTA Options */}
              <div className="space-y-4 mb-8">
                {ctaContent.prospective.ctas.map((cta) => (
                  <Link
                    key={cta.label}
                    href={cta.href}
                    className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                      cta.primary
                        ? 'bg-sogif-navy hover:bg-sogif-navy-light'
                        : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      cta.primary
                        ? 'bg-sogif-cyan'
                        : 'bg-white'
                    }`}>
                      <cta.icon className={`h-6 w-6 ${
                        cta.primary
                          ? 'text-sogif-navy'
                          : 'text-sogif-navy'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${
                        cta.primary ? 'text-white' : 'text-sogif-navy'
                      }`}>
                        {cta.label}
                      </p>
                      <p className={`text-sm ${
                        cta.primary ? 'text-white/60' : 'text-muted-foreground'
                      }`}>
                        {cta.description}
                      </p>
                    </div>
                    <ArrowRight className={`h-5 w-5 group-hover:translate-x-1 transition-transform ${
                      cta.primary ? 'text-white/60' : 'text-slate-400'
                    }`} />
                  </Link>
                ))}
              </div>

              <p className="text-sm text-muted-foreground text-center">
                {ctaContent.prospective.minInvestment}
              </p>
            </div>
          </motion.div>

          {/* Existing Investors */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-10 h-full">
              {/* Accent line */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-sogif-gold to-amber-400 rounded-full" />
              
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                {ctaContent.existing.headline}
              </h3>
              <p className="text-white/60 mb-8">
                {ctaContent.existing.description}
              </p>

              {/* Portal Features */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {ctaContent.existing.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-white/70 text-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-sogif-gold" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Portal CTA */}
              <a
                href={ctaContent.existing.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 w-full px-8 py-4 bg-gradient-to-r from-sogif-gold to-amber-400 text-sogif-navy font-semibold rounded-xl hover:shadow-xl hover:shadow-sogif-gold/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                {ctaContent.existing.cta.label}
                <ExternalLink className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Support Note */}
              <p className="text-center text-white/40 text-sm mt-6">
                Need help? Contact us at{' '}
                <a href="mailto:admin@sogif.au" className="text-sogif-cyan hover:underline">
                  admin@sogif.au
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

