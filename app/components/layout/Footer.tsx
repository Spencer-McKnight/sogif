import Link from 'next/link'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

// TODO: Replace with CMS content
const footerContent = {
  description: 'The Strategic Opportunities (Growth & Income) Fund is an Australian registered managed fund seeking to generate growth and income returns through diversified investment strategies.',
  contact: {
    email: 'admin@sogif.au',
    phone: '(03) 8592 0270',
    address: 'Suite 12, 333 Canterbury Rd, Canterbury, VIC 3126',
  },
  links: {
    invest: [
      { label: 'Why SOGIF', href: '/about' },
      { label: 'Performance', href: '/performance' },
      { label: 'Properties', href: '/properties' },
      { label: 'Apply Online', href: '/invest' },
    ],
    investors: [
      { label: 'Investor Portal', href: 'https://portal.sogif.au', external: true },
      { label: 'News & Updates', href: '/news' },
      { label: 'FAQs', href: '/investors#faqs' },
    ],
    legal: [
      { label: 'Disclosures', href: '/disclosures' },
      { label: 'Privacy Policy', href: '/disclosures#privacy' },
      { label: 'Target Market Determination', href: '/disclosures#tmd' },
      { label: 'Product Disclosure Statement', href: '/disclosures#pds' },
    ],
  },
  compliance: {
    re: 'Plantation Capital Limited',
    afsl: '339481',
    arsn: '668 357 837',
    abn: 'XX XXX XXX XXX', // TODO: Replace with actual ABN
  },
}

export function Footer() {
  return (
    <footer className="bg-sogif-navy text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-sogif-cyan to-sogif-gold flex items-center justify-center">
                <span className="font-bold text-sogif-navy text-lg">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg tracking-tight leading-none">SOGIF</span>
                <span className="text-white/60 text-[10px] tracking-wider uppercase">Growth & Income Fund</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              {footerContent.description}
            </p>
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={`mailto:${footerContent.contact.email}`}
                className="flex items-center gap-3 text-white/60 hover:text-sogif-cyan transition-colors text-sm"
              >
                <Mail className="h-4 w-4" />
                {footerContent.contact.email}
              </a>
              <a
                href={`tel:${footerContent.contact.phone.replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-3 text-white/60 hover:text-sogif-cyan transition-colors text-sm"
              >
                <Phone className="h-4 w-4" />
                {footerContent.contact.phone}
              </a>
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                {footerContent.contact.address}
              </div>
            </div>
          </div>

          {/* Invest Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">Invest</h4>
            <ul className="space-y-3">
              {footerContent.links.invest.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Investors Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">Investors</h4>
            <ul className="space-y-3">
              {footerContent.links.investors.map((link) => (
                <li key={link.label}>
                  {'external' in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/90">Legal</h4>
            <ul className="space-y-3">
              {footerContent.links.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Compliance Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="text-xs text-white/40 max-w-3xl">
              <p className="mb-2">
                <strong className="text-white/60">Responsible Entity:</strong> {footerContent.compliance.re} | 
                <strong className="text-white/60 ml-2">AFSL:</strong> {footerContent.compliance.afsl} | 
                <strong className="text-white/60 ml-2">ARSN:</strong> {footerContent.compliance.arsn}
              </p>
              <p>
                This website provides general information only and does not constitute financial advice. 
                Before investing, please read the Product Disclosure Statement (PDS) and Target Market Determination (TMD). 
                Past performance is not a reliable indicator of future performance.
              </p>
            </div>
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} SOGIF. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

