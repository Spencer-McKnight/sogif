'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useConstants } from '@/lib'

// TODO: Replace with CMS-managed navigation items
const navItems = [
  { label: 'Performance', href: '/performance' },
  { label: 'Properties', href: '/properties' },
  { label: 'About', href: '/about' },
  { label: 'News', href: '/news' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const constants = useConstants()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sogif-navy/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-white font-semibold text-lg md:text-xl tracking-tight group-hover:text-sogif-cyan transition-colors">
              SOGIF
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-sogif-cyan transition-colors text-sm font-medium focus:outline-none focus-visible:text-sogif-cyan focus-visible:underline underline-offset-4"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={constants.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors text-sm font-medium focus:outline-none focus-visible:text-white focus-visible:underline underline-offset-4"
            >
              Investor Portal
            </a>
            <Link
              href="/invest"
              className="bg-sogif-cyan hover:bg-sogif-cyan/90 text-sogif-navy font-semibold px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-sogif-cyan/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sogif-navy"
            >
              Invest Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle menu"
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
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-sogif-navy border-t border-white/10"
          >
            <nav className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white/80 hover:text-sogif-cyan hover:bg-white/5 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <hr className="border-white/10 my-4" />
              <a
                href={constants.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Investor Portal
              </a>
              <Link
                href="/invest"
                onClick={() => setMobileMenuOpen(false)}
                className="block mx-4 mt-4 bg-sogif-cyan hover:bg-sogif-cyan/90 text-sogif-navy font-semibold px-5 py-3 rounded-lg text-center transition-all"
              >
                Invest Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
