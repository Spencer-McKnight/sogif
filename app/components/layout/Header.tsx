'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

// TODO: Replace with CMS content
const navItems = [
  { label: 'Performance', href: '/performance' },
  { label: 'Properties', href: '/properties' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Our Story', href: '/about' },
      { label: 'Governance', href: '/about#governance' },
      { label: 'Disclosures', href: '/disclosures' },
    ],
  },
  { label: 'News', href: '/news' },
]

const ctaLinks = {
  portal: { label: 'Investor Portal', href: 'https://portal.sogif.au', external: true },
  invest: { label: 'Invest Now', href: '/invest' },
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-sogif-navy/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 rounded-lg bg-gradient-to-br from-sogif-cyan to-sogif-gold flex items-center justify-center overflow-hidden">
              <span className="font-bold text-sogif-navy text-lg tracking-tight">S</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-lg tracking-tight leading-none">SOGIF</span>
              <span className="text-white/60 text-[10px] tracking-wider uppercase">Growth & Income Fund</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 pt-2"
                    >
                      <div className="bg-sogif-navy-light/95 backdrop-blur-md rounded-xl border border-white/10 py-2 min-w-[180px] shadow-xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={ctaLinks.portal.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-sm text-white/80 hover:text-white transition-colors"
            >
              {ctaLinks.portal.label}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Link
              href={ctaLinks.invest.href}
              className="px-5 py-2.5 bg-gradient-to-r from-sogif-cyan to-cyan-400 text-sogif-navy font-semibold text-sm rounded-lg hover:shadow-lg hover:shadow-sogif-cyan/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              {ctaLinks.invest.label}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-sogif-navy/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 text-white/80 hover:text-white transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1.5 text-sm text-white/60 hover:text-white transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <a
                  href={ctaLinks.portal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2 text-white/80"
                >
                  {ctaLinks.portal.label}
                  <ExternalLink className="h-4 w-4" />
                </a>
                <Link
                  href={ctaLinks.invest.href}
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-5 py-3 bg-gradient-to-r from-sogif-cyan to-cyan-400 text-sogif-navy font-semibold rounded-lg"
                >
                  {ctaLinks.invest.label}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

