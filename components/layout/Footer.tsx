import Link from 'next/link'
import Image from 'next/image'
import { Container, DisclaimerText } from '@/components/ui'

// TODO: Replace with CMS-managed content
const footerContent = {
  description: 'The Strategic Opportunities (Growth & Income) Fund is an Australian registered managed fund seeking to generate growth and income returns through diversified investment strategies.',
  contact: {
    email: 'admin@sogif.au',
    phone: '(03) 8592 0270',
    address: 'Suite 12, 333 Canterbury Rd, Canterbury, VIC 3126',
  },
  legal: {
    arsn: 'ARSN 668 357 837',
    afsl: 'AFSL No 339481',
    responsibleEntity: 'Plantation Capital Limited',
  },
}

const footerLinks = {
  pages: [
    { label: 'Performance', href: '/performance' },
    { label: 'Properties', href: '/properties' },
    { label: 'About', href: '/about' },
    { label: 'Updates', href: '/updates' },
    { label: 'Invest', href: '/invest' },
  ],
  legal: [
    { label: 'Disclosures', href: '/disclosures' },
    { label: 'Privacy Policy', href: '/disclosures#privacy' },
    { label: 'Target Market Determination', href: '/disclosures#tmd' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-sogif-navy text-white">
      {/* Main Footer */}
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <Image
                  src="https://www.datocms-assets.com/192130/1768821769-logo.webp?w=80&fit=max&auto=format"
                  alt="SOGIF"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-semibold text-xl">SOGIF</span>
            </Link>
            <p className="text-white/90 text-sm leading-relaxed max-w-sm mb-6">
              {footerContent.description}
            </p>
            <div className="space-y-2 text-sm text-white/80">
              <p>{footerContent.legal.responsibleEntity}</p>
              <p>{footerContent.legal.arsn}</p>
              <p>{footerContent.legal.afsl}</p>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-sogif-cyan-light font-semibold mb-4 text-sm uppercase tracking-wider">
              Pages
            </h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {footerLinks.pages.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/90 hover:text-white transition-colors text-sm focus-ring-inverse rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sogif-cyan-light font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${footerContent.contact.email}`}
                  className="text-white/90 hover:text-white transition-colors focus-ring-inverse rounded-sm"
                >
                  {footerContent.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${footerContent.contact.phone.replace(/\s/g, '')}`}
                  className="text-white/90 hover:text-white transition-colors focus-ring-inverse rounded-sm"
                >
                  {footerContent.contact.phone}
                </a>
              </li>
              <li className="text-white/80">
                {footerContent.contact.address}
              </li>
              <li className="text-white/80 text-xs">
                Phone hours: 10am–4pm Melbourne time, business days
              </li>
            </ul>
            
            {/* Investor Portal CTA */}
            <a
              href="https://portal.sogif.au"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 flex items-center gap-2 bg-sogif-success/15 border border-sogif-success/30 hover:bg-sogif-success/25 rounded-lg px-3 py-2 transition-all focus-ring-inverse"
            >
              <div className="w-6 h-6 bg-sogif-success/20 rounded flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-sogif-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <span className="text-sogif-success text-xs font-medium block">Existing Investor?</span>
                <span className="text-white/80 text-xs">Login to Portal →</span>
              </div>
            </a>
          </div>
        </div>
      </Container>

      {/* Disclaimer Bar */}
      <div className="border-t border-white/10">
        <Container className="py-6">
          <DisclaimerText tone="footer" className="mb-4">
            <strong className="text-white/80">Important:</strong> This website provides general information only and does not constitute financial advice. 
            Before making any investment decision, you should read the Product Disclosure Statement (PDS) and Target Market Determination (TMD) 
            available on this website, and consider whether the Fund is appropriate for you. Past performance is not a reliable indicator of future performance. 
            Investment returns are not guaranteed. Your capital is at risk.
          </DisclaimerText>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-white/75">
            <p>© {new Date().getFullYear()} Plantation Capital Limited. All rights reserved.</p>
            <div className="flex gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-white/90 transition-colors focus-ring-inverse rounded-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
