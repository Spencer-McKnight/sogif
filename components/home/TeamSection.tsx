'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  AppLink,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Container,
  SectionHeader,
} from '@/components/ui'

type Director = {
  id: string
  name: string
  role: string
  credentials: string
  description: [string, string, string]
  image: string
}

// TODO: Replace with CMS-managed team data
const directors: Director[] = [
  {
    id: 'steve-mcknight',
    name: 'Steve McKnight',
    role: 'Chair',
    credentials: 'B.Bus (Accounting), DipFS, CA',
    description: [
      'Recognised property investment authority helping Australians build wealth with positive cash flow property since 1999.',
      'CEO of PropertyInvesting.com.',
      'Author of "Money Magnet" and "From 0 to 130 Properties in 3.5 Years" series. 200,000 copies sold.',
    ],
    image: 'https://www.datocms-assets.com/192130/1771332026-steve-mcknight.webp',
  },
  {
    id: 'paul-harper',
    name: 'Paul Harper',
    role: 'Director',
    credentials: 'B.Bus (Accounting), MEI',
    description: [
      'Brings 25+ years of experience helping individuals and families build long-term wealth.',
      'Served as responsible manager for a $600M fund and chaired an investment committee overseeing $500M+ capital.',
      'Key contributor to the Passive Income (USA Commercial Property) Fund.',
    ],
    image: 'https://www.datocms-assets.com/192130/1771330956-paul-harper.webp',
  },
  {
    id: 'ewan-macdonald',
    name: 'Ewan MacDonald',
    role: 'Director',
    credentials: 'BA, DipLaw, DipPLT',
    description: [
      'Highly experienced financial services and managed funds adviser and establishment expert.',
      'Specialises in AFSL compliance, governance frameworks, and regulatory implementation.',
      'PCL Compliance member, supporting legal integrity across all operations.',
    ],
    image: 'https://www.datocms-assets.com/192130/1771330967-ewan-macdonald.webp',
  },
]

function DirectorCard({ director }: { director: Director }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="group flex w-full flex-col">
      {/* Top section: horizontal on mobile, vertical on tablet+ */}
      <div className="flex items-start gap-4 sm:flex-col sm:items-stretch sm:gap-0">
        {/* Image — thumbnail on mobile, card image on tablet+ */}
        <div className="relative w-40 shrink-0 sm:mb-6 sm:w-full">
          <div className="relative aspect-square overflow-hidden rounded-lg sm:rounded-xl">
            <Image
              src={director.image}
              alt={director.name}
              fill
              className="object-cover object-top lg:transition-transform lg:duration-700 lg:ease-standard lg:group-hover:scale-105"
            />

            {/* Gradient overlay — desktop hover only */}
            <div
              className="absolute inset-0 hidden bg-gradient-to-t from-sogif-navy via-sogif-navy/85 to-sogif-navy/40 opacity-0 transition-opacity duration-500 ease-standard group-hover:opacity-100 lg:block"
              aria-hidden="true"
            />

            {/* Description content — desktop hover only */}
            <div className="absolute inset-0 hidden flex-col justify-end p-8 lg:flex">
              <div className="translate-y-4 space-y-2.5 opacity-0 transition-all duration-500 ease-standard group-hover:translate-y-0 group-hover:opacity-100 [transition-delay:120ms]">
                {director.description.map((paragraph, i) => (
                  <p
                    key={paragraph}
                    className="text-left text-white/90 type-support leading-relaxed"
                    style={{ transitionDelay: `${150 + i * 80}ms` }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Info — beside image on mobile, below image on tablet+ */}
        <div className="min-w-0 flex flex-col justify-center sm:justify-start">
          <h3 className="mb-1 text-left type-title text-gray-900">{director.name}</h3>
          <p className="mb-1 text-left type-overline font-bold tracking-[0.12em] text-sogif-cyan-dark">
            {director.role}
          </p>
          <p className="text-left text-gray-600 type-support">{director.credentials}</p>
          {/* Expandable description — mobile/tablet only */}
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="mt-3 lg:hidden"
          >
            <CollapsibleTrigger asChild>
              <button
                className="inline-flex items-center gap-1.5 type-support font-semibold text-sogif-cyan-dark transition-colors duration-fast hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sogif-cyan-dark focus-visible:ring-offset-2 rounded-sm"
                aria-label={
                  isOpen
                    ? `Show less about ${director.name}`
                    : `Read more about ${director.name}`
                }
              >
                {isOpen ? 'Show less' : 'Read more'}
                <svg
                  className={`h-4 w-4 transition-transform duration-base ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
                </svg>
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
              <div className="space-y-2.5 pt-3">
                {director.description.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-left text-gray-700 type-support leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  )
}

export function TeamSection() {
  return (
    <section className="section-padding bg-sogif-steel">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <SectionHeader
              align="left"
              eyebrow="Meet the Team"
              title="Board of Directors"
              description="Master investors and businessment with proven success. Supported by a team of passionate and intelligent analysts."
            />
          </div>
          <AppLink
            href="/about"
            showArrow
            variant="text"
            className="hidden md:inline-flex shrink-0"
          >
            About the Fund
          </AppLink>
        </div>

        {/* Team Grid — 1 col mobile, 3 col tablet+ */}
        <div className="grid gap-8 lg:gap-16 sm:grid-cols-3">
          {directors.map((director) => (
            <DirectorCard key={director.id} director={director} />
          ))}
        </div>

        {/* Mobile page link */}
        <div className="mt-10 text-center md:hidden">
          <AppLink href="/about" showArrow variant="text">
            About the Fund
          </AppLink>
        </div>
      </Container>
    </section>
  )
}
