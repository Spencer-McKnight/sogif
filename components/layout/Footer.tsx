import Link from 'next/link'
import { Container } from '@/components/ui/Container'

// TODO: Replace with CMS content
const FOOTER_CONTENT = {
  logo: 'SOGIF',
  tagline: 'Strategic Opportunities Growth Index Fund',
  description: 'Building wealth through strategic property investment since 2023.',
  links: {
    invest: {
      title: 'Invest',
      items: [
        { label: 'How It Works', href: '#' },
        { label: 'Portfolio', href: '#portfolio' },
        { label: 'Performance', href: '#performance' },
        { label: 'FAQs', href: '#' },
      ],
    },
    company: {
      title: 'Company',
      items: [
        { label: 'About Us', href: '#team' },
        { label: 'Our Team', href: '#team' },
        { label: 'Careers', href: '#' },
        { label: 'Contact', href: '#register' },
      ],
    },
    legal: {
      title: 'Legal',
      items: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Product Disclosure', href: '#' },
        { label: 'Financial Guide', href: '#' },
      ],
    },
  },
  contact: {
    email: 'invest@sogif.com.au',
    phone: '1300 SOGIF AU',
  },
  disclaimer: 'SOGIF Pty Ltd (ABN XX XXX XXX XXX) is a corporate authorised representative (CAR Number XXXXXX) of [Authorised Entity] (AFSL XXXXXX). The information provided is general advice only and does not take into account your personal objectives, financial situation, or needs. You should consider whether the advice is appropriate for you and read the relevant Product Disclosure Statement (PDS) before making any investment decision. Past performance is not indicative of future performance.',
  copyright: '© 2026 SOGIF. All rights reserved.',
}

function FooterLinkGroup({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-white font-semibold mb-4">{title}</h4>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            <Link 
              href={item.href} 
              className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-white/5">
      {/* Main Footer */}
      <Container className="py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-serif text-white tracking-tight">
                {FOOTER_CONTENT.logo}
              </span>
            </Link>
            <p className="text-cyan-400 text-sm font-medium mb-3">
              {FOOTER_CONTENT.tagline}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              {FOOTER_CONTENT.description}
            </p>
            
            {/* Contact */}
            <div className="space-y-2">
              <a 
                href={`mailto:${FOOTER_CONTENT.contact.email}`}
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {FOOTER_CONTENT.contact.email}
              </a>
              <a 
                href={`tel:${FOOTER_CONTENT.contact.phone}`}
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {FOOTER_CONTENT.contact.phone}
              </a>
            </div>
          </div>

          {/* Link Columns */}
          <FooterLinkGroup {...FOOTER_CONTENT.links.invest} />
          <FooterLinkGroup {...FOOTER_CONTENT.links.company} />
          <FooterLinkGroup {...FOOTER_CONTENT.links.legal} />
        </div>
      </Container>

      {/* Disclaimer */}
      <div className="border-t border-white/5">
        <Container className="py-6">
          <p className="text-xs text-slate-500 leading-relaxed">
            {FOOTER_CONTENT.disclaimer}
          </p>
        </Container>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5">
        <Container className="py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              {FOOTER_CONTENT.copyright}
            </p>
            <div className="flex items-center gap-4">
              {/* Social Links */}
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-cyan-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-cyan-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}

