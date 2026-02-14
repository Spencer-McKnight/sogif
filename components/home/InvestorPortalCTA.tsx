'use client'

import { useConstants } from '@/lib'
import { ButtonLink, DisclaimerText } from '@/components/ui'

export function InvestorPortalCTA() {
  const constants = useConstants()

  return (
    <div className="p-5 bg-sogif-success/10 border-2 border-sogif-success/40 rounded-xl relative overflow-hidden">
      {/* Subtle glow effect */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-sogif-success/20 rounded-full blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-sogif-success/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-sogif-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-sogif-success font-semibold type-support">Already an investor?</p>
        </div>
        <ButtonLink
          href={constants.portalUrl}
          external
          variant="success"
          size="md"
          fullWidth
          className="group justify-between"
        >
          <span>Access Investor Portal</span>
          <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </ButtonLink>
        <DisclaimerText tone="hero" className="text-white/50 mt-2">
          View your holdings, distributions & statements
        </DisclaimerText>
      </div>
    </div>
  )
}
