import Image from 'next/image'
import { AppLink, Container, SectionHeader } from '@/components/ui'

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

export function TeamSection() {
  return (
    <section className="section-padding bg-sogif-steel">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <SectionHeader
              align="left"
              eyebrow="Leadership Team"
              title="Master Leadership & Proven Results"
              description="Supported by a team of passionate and intelligent analysts."
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

        {/* Team Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {directors.map((director) => (
            <div
              key={director.id}
              className="group flex w-full flex-row items-start gap-8 lg:flex-col lg:gap-0"
            >
              {/* Image */}
              <div className="relative w-28 shrink-0 sm:w-36 lg:mb-6 lg:w-full">
                <div className="relative aspect-square overflow-hidden rounded-xl transition-all duration-base ease-standard">
                  <Image
                    src={director.image}
                    alt={director.name}
                    fill
                    className="object-cover object-top media-zoom-hover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <h3 className="mb-1 text-left type-title text-gray-900">{director.name}</h3>
                <p className="mb-3 text-left type-overline font-bold tracking-[0.12em] text-sogif-cyan-dark">
                  {director.role}
                </p>
                <p className="mb-3 text-left text-gray-600 type-support">{director.credentials}</p>
                <div className="space-y-2">
                  {director.description.map((paragraph) => (
                    <p key={paragraph} className="text-left text-gray-800 type-support leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
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
