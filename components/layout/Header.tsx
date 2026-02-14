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
        <div className="flex items-center justify-between h-20 md:h-[6.5rem]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 md:w-14 md:h-14">
              <Image
                src="https://www.datocms-assets.com/192130/1768821769-logo.webp?w=96&fit=max&auto=format"
                alt="SOGIF"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="hidden lg:block text-white font-semibold type-title group-hover:text-sogif-cyan-light transition-colors">
              SOGIF
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-between">
            {navItems.map((item) => (
              <AppLink
                key={item.href}
                href={item.href}
                variant="nav-expanded"
                className="type-body lg:mx-3 xl:mx-4 visited:text-white focus-visible:underline underline-offset-4"
              >
                {item.label}
              </AppLink>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex shrink-0 items-center gap-5 pl-4">
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
              <span className="hidden lg:block">Investor Portal</span>
            </ButtonLink>
            <ButtonLink
              href="/invest"
              variant="primary"
              size="md"
              glow="gold"
            >
              Invest Now
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
              className="w-8 h-8"
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

      {/* Mobile Menu - Full Screen Modal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] md:hidden bg-sogif-navy backdrop-blur-sm"
          >
            {/* Mobile Menu Header */}
            <div className="fixed top-0 left-0 right-0 bg-sogif-navy/95 backdrop-blur-md border-b border-white/10 z-[70]">
              <Container>
                <div className="flex items-center justify-between h-20">
                  {/* Logo */}
                  <Link href="/" className="flex items-center gap-3 group shrink-0" onClick={() => setMobileMenuOpen(false)}>
                    <div className="relative w-10 h-10">
                      <Image
                        src="https://www.datocms-assets.com/192130/1768821769-logo.webp?w=96&fit=max&auto=format"
                        alt="SOGIF"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </Link>

                  {/* Close Button */}
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-white focus-ring-inverse rounded-md"
                    aria-label="Close menu"
                  >
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </Container>
            </div>

            <div className="flex flex-col items-center justify-center min-h-screen px-6 pt-20 bg-sogif-navy">
              <nav
                id="mobile-navigation"
                className="flex flex-col items-center w-full max-w-sm"
                aria-label="Mobile navigation"
              >
                <div className="flex flex-col items-center w-full space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center px-6 py-4 text-white/90 hover:text-sogif-cyan-light hover:bg-white/5 rounded-lg transition-colors type-title w-full"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <hr className="border-white/10 w-full mt-4 mb-6" />
                <div className="flex flex-col items-center gap-4 w-full">
                  <ButtonLink
                    href={constants.portalUrl}
                    external
                    variant="success"
                    size="lg"
                    className="focus-ring-inverse"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Investor Portal
                    <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </ButtonLink>
                  <ButtonLink
                    href="/invest"
                    variant="primary"
                    size="lg"
                    glow="gold"
                    onClick={() => setMobileMenuOpen(false)}
                    className="focus-ring-inverse"
                  >
                    Invest Now
                  </ButtonLink>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
