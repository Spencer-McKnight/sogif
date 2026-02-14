'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useConstants } from '@/lib'
import { AppLink, ButtonLink, Container } from '@/components/ui'

// TODO: Replace with CMS-managed navigation items
const navItems = [
  { label: 'Performance', href: '/performance' },
  { label: 'Properties', href: '/properties' },
  { label: 'About', href: '/about' },
  { label: 'Updates', href: '/updates' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const constants = useConstants()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sogif-navy/95 backdrop-blur-md border-b border-white/10">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src="https://www.datocms-assets.com/192130/1768821769-logo.webp?w=96&fit=max&auto=format"
                alt="SOGIF"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-white font-semibold type-title group-hover:text-sogif-cyan-light transition-colors">
              SOGIF
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <AppLink
                key={item.href}
                href={item.href}
                variant="nav-expanded"
                className="type-support focus-visible:underline underline-offset-4"
              >
                {item.label}
              </AppLink>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <ButtonLink
              href={constants.portalUrl}
              external
              variant="success"
              size="md"
              className="group focus-ring-inverse"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Investor Portal</span>
            </ButtonLink>
            <ButtonLink
              href="/invest"
              variant="primary"
              size="md"
              glow="gold"
            >
              Apply Now
            </ButtonLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white focus-ring-inverse rounded-md"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-sogif-navy border-t border-white/10"
          >
            <nav id="mobile-navigation" className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white/90 hover:text-sogif-cyan-light hover:bg-white/5 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <hr className="border-white/10 my-4" />
              <a
                href={constants.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between mx-4 bg-sogif-success/20 border border-sogif-success/40 text-sogif-success hover:bg-sogif-success hover:text-white px-4 py-3 rounded-lg transition-all"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">Investor Portal</span>
                </div>
                <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <Link
                href="/invest"
                onClick={() => setMobileMenuOpen(false)}
                className="block mx-4 mt-4 bg-sogif-gold hover:bg-sogif-gold/90 text-gray-900 font-semibold px-5 py-3 rounded-lg text-center transition-all"
              >
                Invest
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
