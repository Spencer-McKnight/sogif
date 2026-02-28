'use client'

import Link from 'next/link'
import Image from 'next/image'
import { AppLink, Container, DisclaimerText } from '@/components/ui'
import { useConstants } from '@/lib/contexts/ConstantsContext'

const footerLinks = {
  pages: [
    { label: 'Performance', href: '/performance' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Strategy', href: '/strategy' },
    { label: 'News', href: '/news' },
    { label: 'Apply', href: '/apply' },
  ],
  legal: [
    { label: 'Disclosures', href: '/disclosures' },
    { label: 'Privacy Policy', href: '/disclosures#privacy' },
    { label: 'Terms and Conditions', href: '/disclosures#tmd' },
  ],
}

export function Footer() {
  const constants = useConstants()

  return (
    <footer className="bg-sogif-navy text-white">
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
      {/* Main Footer */}
      <Container className="py-8 md:py-16">
        {/*
          3-column footer grid with CSS subgrid rows.
          Each column is split into 2 children: [header, body].
          lg:grid-rows-[auto_1fr] defines 2 shared row tracks.
          Each column spans both rows (lg:row-span-2) and uses
          grid-template-rows:subgrid so all three columns share
          the same row heights — logo aligns with headings (row 1),
          description aligns with links (row 2).
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_1fr] gap-x-8 gap-y-4 lg:gap-y-6">

          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-2 grid gap-y-4 lg:row-span-2 lg:[grid-template-rows:subgrid]">
            {/* Row 1: logo — aligns with PAGES / CONTACT headings */}
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <Image
                    src="/images/logo-icon.svg"
                    alt="SOGIF"
                    fill
                    className="object-contain"
                    style={{ filter: 'url(#logo-outline)' }}
                  />
                </div>
                <span className="font-semibold type-title">SOGIF</span>
              </Link>
            </div>
            {/* Row 2: description + legal — aligns with link lists */}
            <div>
              <p className="text-white/90 type-support max-w-sm mb-3">
                The Strategic Opportunities<br />(Growth &amp; Income) Fund
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 md:flex-col md:space-y-2 md:gap-0 type-support text-white/80">
                <p>{constants.responsibleEntity}</p>
                <p className="before:content-['·'] before:mr-2 md:before:content-none">ARSN {constants.arsn}</p>
                <p className="before:content-['·'] before:mr-2 md:before:content-none">AFSL No {constants.afsl}</p>
              </div>
            </div>
          </div>

          {/* Pages Column */}
          <div className="grid gap-y-3 md:gap-y-4 lg:row-span-2 lg:[grid-template-rows:subgrid]">
            {/* Row 1: heading — self-end pins it to the bottom of the logo-height track */}
            <div className="lg:self-end">
              <h4 className="text-sogif-cyan-light font-semibold type-overline">
                Pages
              </h4>
            </div>
            {/* Row 2: links */}
            <div>
              <ul className="flex flex-wrap gap-x-5 gap-y-1.5 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-3">
                {footerLinks.pages.map((link) => (
                  <li key={link.href}>
                    <AppLink
                      href={link.href}
                      variant="nav"
                      className="type-support focus-visible:underline underline-offset-4"
                    >
                      <span className="hover-underline">{link.label}</span>
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Column */}
          <div className="grid gap-y-3 md:gap-y-4 lg:row-span-2 lg:[grid-template-rows:subgrid]">
            {/* Row 1: heading — self-end pins it to the bottom of the logo-height track */}
            <div className="lg:self-end">
              <h4 className="text-sogif-cyan-light font-semibold type-overline">
                Contact
              </h4>
            </div>
            {/* Row 2: links */}
            <div>
              <ul className="flex flex-col gap-y-1.5 md:gap-y-3 type-support">
                <li>
                  <AppLink
                    href={`mailto:${constants.contactEmail}`}
                    external
                    variant="nav"
                  >
                    <span className="hover-underline">{constants.contactEmail}</span>
                  </AppLink>
                </li>
                <li>
                  <AppLink
                    href={`tel:${constants.contactPhone.replace(/\s/g, '')}`}
                    external
                    variant="nav"
                  >
                    <span className="hover-underline">{constants.contactPhone}</span>
                  </AppLink>
                </li>
                <li className="text-white/80">
                  {constants.address}
                </li>
                <li className="text-white/80">
                  Phone hours: 10am–4pm Melbourne time, business days
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* Disclaimer Bar */}
      <div className="border-t border-white/10">
        <Container className="py-4 md:py-6">
          <DisclaimerText tone="footer" className="mb-4">
            <strong className="text-white/80">Important:</strong> This website provides general information only and does not constitute financial advice.
            Before making any investment decision, you should read the Product Disclosure Statement (PDS) and Target Market Determination (TMD)
            available on this website, and consider whether the Fund is appropriate for you. Past performance is not a reliable indicator of future performance.
            Investment returns are not guaranteed. Your capital is at risk.
          </DisclaimerText>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 type-support text-white/75">
            <p>© {new Date().getFullYear()} {constants.responsibleEntity}. All rights reserved.</p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <AppLink
                  key={link.href}
                  href={link.href}
                  variant="nav"
                  className="focus-visible:underline underline-offset-4"
                >
                  <span className="hover-underline">{link.label}</span>
                </AppLink>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
