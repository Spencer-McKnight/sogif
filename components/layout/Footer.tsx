import Link from 'next/link'

// TODO: Replace with CMS content
const FOOTER_NAV = {
  invest: [
    { label: 'How to Invest', href: '/invest' },
    { label: 'Performance', href: '/performance' },
    { label: 'Properties', href: '/properties' },
    { label: 'FAQs', href: '/#faqs' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'News', href: '/news' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Product Disclosure Statement', href: '/documents/pds' },
    { label: 'Target Market Determination', href: '/documents/tmd' },
    { label: 'Privacy Policy', href: '/disclosures/privacy' },
    { label: 'Disclosures', href: '/disclosures' },
  ],
}

const CONTACT = {
  email: 'admin@sogif.au',
  phone: '(03) 8592 0270',
  address: 'Suite 12, 333 Canterbury Rd, Canterbury, VIC 3126',
  postal: 'PO Box 532, Canterbury, VIC 3126',
}

const REGULATORY = {
  fundName: 'Strategic Opportunities (Growth & Income) Fund',
  arsn: '668 357 837',
  responsibleEntity: 'Plantation Capital Limited',
  afsl: '339481',
  abn: 'ABN [To be updated]',
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight text-sogif-cyan">
                SOGIF
              </span>
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/70 max-w-sm">
              The Strategic Opportunities (Growth & Income) Fund is an Australian registered managed fund seeking to generate growth and income returns through diversified investment strategies.
            </p>
            <div className="mt-6 space-y-2 text-sm text-primary-foreground/70">
              <p>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-sogif-cyan transition-colors">
                  {CONTACT.email}
                </a>
              </p>
              <p>
                <a href={`tel:${CONTACT.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-sogif-cyan transition-colors">
                  {CONTACT.phone}
                </a>
              </p>
            </div>
          </div>

          {/* Invest Column */}
          <div>
            <h3 className="text-sm font-semibold text-sogif-cyan uppercase tracking-wider">
              Invest
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_NAV.invest.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/70 hover:text-sogif-cyan transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold text-sogif-cyan uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_NAV.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/70 hover:text-sogif-cyan transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-sm font-semibold text-sogif-cyan uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_NAV.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/70 hover:text-sogif-cyan transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Regulatory Footer */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-4 text-xs text-primary-foreground/50">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="font-medium text-primary-foreground/70">
                ARSN {REGULATORY.arsn}
              </span>
              <span>|</span>
              <span>
                {REGULATORY.responsibleEntity} (AFSL {REGULATORY.afsl})
              </span>
            </div>
            <p className="leading-relaxed">
              This website is issued by {REGULATORY.responsibleEntity}, the responsible entity for the {REGULATORY.fundName} (ARSN {REGULATORY.arsn}). 
              Before making an investment decision, please read the Product Disclosure Statement (PDS) and Target Market Determination (TMD) available on this website. 
              Past performance is not a reliable indicator of future performance. Investment returns are not guaranteed.
            </p>
            <p className="leading-relaxed">
              The information on this website is general information only and does not take into account your personal objectives, financial situation, or needs. 
              You should consider seeking independent financial advice before making any investment decisions.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p>© {new Date().getFullYear()} {REGULATORY.responsibleEntity}. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link href="/disclosures/privacy" className="hover:text-sogif-cyan transition-colors">
                  Privacy
                </Link>
                <Link href="/disclosures/terms" className="hover:text-sogif-cyan transition-colors">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

