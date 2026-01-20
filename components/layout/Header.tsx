'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

// TODO: Replace with CMS content
const NAV_CONTENT = {
  logo: 'SOGIF',
  links: [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Performance', href: '#performance' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#register' },
  ],
  cta: 'Start Investing',
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-navy-900/95 backdrop-blur-lg shadow-lg shadow-navy-900/20' 
          : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="relative group">
            <span className="text-2xl font-serif text-white tracking-tight">
              {NAV_CONTENT.logo}
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_CONTENT.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-slate-300 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button size="sm">
              {NAV_CONTENT.cta}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <span 
                className={`absolute left-0 w-full h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'
                }`} 
              />
              <span 
                className={`absolute left-0 top-2 w-full h-0.5 bg-white transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} 
              />
              <span 
                className={`absolute left-0 w-full h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'
                }`} 
              />
            </div>
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-20 left-0 right-0 bg-navy-900/98 backdrop-blur-lg border-t border-white/10 transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible -translate-y-4'
        }`}
      >
        <Container className="py-6">
          <div className="flex flex-col gap-4">
            {NAV_CONTENT.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-300 hover:text-white transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10">
              <Button className="w-full">
                {NAV_CONTENT.cta}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </header>
  )
}

