'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useConstants } from '@/lib'
import { AppLink, ButtonLink, Container } from '@/components/ui'

const navItems = [
  { label: 'Performance', href: '/performance' },
  { label: 'Properties', href: '/properties' },
  { label: 'Strategy', href: '/strategy' },
  { label: 'Updates', href: '/updates' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const constants = useConstants()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sogif-navy/95 backdrop-blur-md border-b border-white/10">
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="logo-outline" x="-10%" y="-10%" width="120%" height="120%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="0.3" result="expanded" />
            <feFlood floodColor="white" floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="expanded" operator="in" result="outline" />
            <feComposite in="SourceGraphic" in2="outline" operator="over" />
          </filter>
        </defs>
      </svg>
      <Container>
        <div className="flex justify-between lg:grid lg:grid-cols-12 lg:gap-8 items-center h-20 lg:h-[6.5rem]">

          {/* Logo — col 1–2 */}
          <Link href="/" className="lg:col-span-1">
            <div className="relative w-10 h-10 lg:w-14 lg:h-14">
              <Image
                src="https://www.datocms-assets.com/192130/1768821769-logo.webp?w=96&fit=max&auto=format"
                alt="SOGIF"
                fill
                className="object-contain"
                style={{ filter: 'url(#logo-outline)' }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav — col 3–9 */}
          <nav className="hidden lg:flex lg:col-span-7 items-center gap-4" aria-label="Primary navigation">
            {navItems.map((item) => (
              <AppLink
                key={item.href}
                href={item.href}
                variant="nav-expanded"
                className="type-body focus-visible:underline underline-offset-4"
              >
                <span className="hover-underline after:h-[3px]">{item.label}</span>
              </AppLink>
            ))}
          </nav>

          {/* Desktop CTAs + Mobile Menu Button — col 10–12 */}
          <div className="flex items-center justify-end lg:col-span-4">
            <div className="hidden lg:grid grid-cols-2 gap-6 w-full">
              <ButtonLink
                href={constants.portalUrl}
                external
                variant="cyan"
                size="md"
                fullWidth
                className="focus-ring-inverse"
              >
                Investors
              </ButtonLink>
              <ButtonLink
                href="/apply"
                variant="primary"
                size="md"
                glow="gold"
                fullWidth
              >
                Apply
              </ButtonLink>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white focus-ring-inverse rounded-md"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </Container>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] lg:hidden bg-sogif-navy backdrop-blur-sm"
          >
            {/* Mobile Menu Header */}
            <div className="fixed top-0 left-0 right-0 bg-sogif-navy/95 backdrop-blur-md border-b border-white/10 z-[70]">
              <Container>
                <div className="flex items-center justify-between h-20">
                  <Link href="/" className="flex items-center group shrink-0" onClick={() => setMobileMenuOpen(false)}>
                    <div className="relative w-10 h-10">
                      <Image
                        src="https://www.datocms-assets.com/192130/1768821769-logo.webp?w=96&fit=max&auto=format"
                        alt="SOGIF"
                        fill
                        className="object-contain"
                        style={{ filter: 'url(#logo-outline)' }}
                        priority
                      />
                    </div>
                  </Link>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-white focus-ring-inverse rounded-md"
                    aria-label="Close menu"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                    variant="cyan"
                    size="lg"
                    className="focus-ring-inverse"
                  >
                    Investors
                  </ButtonLink>
                  <ButtonLink
                    href="/apply"
                    variant="primary"
                    size="lg"
                    glow="gold"
                    onClick={() => setMobileMenuOpen(false)}
                    className="focus-ring-inverse"
                  >
                    Apply
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
