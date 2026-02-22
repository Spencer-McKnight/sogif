import Image from 'next/image'
import {
  AppLink,
  Container,
  SectionHeader,
} from '@/components/ui'

type Director = {
  id: string
  name: string
  role: string
  credentials: string
  tagline: string
  image: string
}

// TODO: Replace with CMS-managed team data
const directors: Director[] = [
  {
    id: 'steve-mcknight',
    name: 'Steve McKnight',
    role: 'Chair',
    credentials: 'B.Bus (Accounting), DipFS, CA',
    tagline: 'Cashflow property strategist and best-selling author, building investor wealth since 1999.',
    image: 'https://www.datocms-assets.com/192130/1771332026-steve-mcknight.webp',
  },
  {
    id: 'paul-harper',
    name: 'Paul Harper',
    role: 'Director',
    credentials: 'B.Bus (Accounting), MEI',
    tagline: '25 years steering capital allocation across $1B+ in managed fund portfolios.',
    image: 'https://www.datocms-assets.com/192130/1771330956-paul-harper.webp',
  },
  {
    id: 'ewan-macdonald',
    name: 'Ewan MacDonald',
    role: 'Director',
    credentials: 'BA, DipLaw, DipPLT',
    tagline: 'Specialist in AFSL compliance, fund governance, and regulatory architecture.',
    image: 'https://www.datocms-assets.com/192130/1771330967-ewan-macdonald.webp',
  },
]

function DirectorCard({ director }: { director: Director }) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-start gap-4 sm:flex-col sm:items-stretch sm:gap-0">
        <div className="relative w-40 shrink-0 sm:mb-6 sm:w-full">
          <div className="relative aspect-square overflow-hidden rounded-lg sm:rounded-xl">
            <Image
              src={director.image}
              alt={director.name}
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="min-w-0 flex flex-col justify-center sm:justify-start">
          <h3 className="mb-1 text-left type-title text-gray-900">{director.name}</h3>
          <p className="mb-1 text-left type-overline font-bold tracking-[0.12em] text-sogif-cyan-dark">
            {director.role}
          </p>
          <p className="text-left text-gray-600 type-support">{director.credentials}</p>
          <p className="mt-3 text-left text-gray-600 type-support leading-relaxed">
            {director.tagline}
          </p>
        </div>
      </div>
    </div>
  )
}

export function TeamSection() {
  return (
    <section className="section-padding bg-sogif-silver-light">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <SectionHeader
              align="left"
              eyebrow="Team"
              title="Board of Directors"
              description="Supported by a team of passionate and intelligent analysts."
            />
          </div>
          <AppLink
            href="/about"
            showArrow
            variant="text"
            className="hidden md:inline-flex shrink-0"
          >
            Our Strategy
          </AppLink>
        </div>

        {/* Team Grid — 1 col mobile, 12-col grid desktop */}
        <div className="grid gap-8 sm:grid-cols-12">
          {directors.map((director) => (
            <div key={director.id} className="sm:col-span-4">
              <DirectorCard director={director} />
            </div>
          ))}
        </div>

        {/* Mobile page link */}
        <div className="mt-10 text-center md:hidden">
          <AppLink href="/strategy" showArrow variant="text">
            Our Strategy
          </AppLink>
        </div>
      </Container>
    </section>
  )
}
