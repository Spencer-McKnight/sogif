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
    image: 'https://www.datocms-assets.com/192130/1768821769-steve-mcknight.webp?w=400&fit=max&auto=format',
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
    image: 'https://www.datocms-assets.com/192130/1768821769-paul-harper.webp?w=400&fit=max&auto=format',
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
    image: 'https://www.datocms-assets.com/192130/1768871746-ewan-macdonald.webp?w=400&fit=max&auto=format',
  },
]

export function TeamSection() {
  return (
    <section className="section-padding bg-sogif-steel">
      <Container>
        {/* Section Header */}
        <div className="mb-16">
          <SectionHeader
            align="left"
            eyebrow="Leadership Team"
            title="Master Leadership & Proven Results"
            description="Supported by a team of passionate and intelligent analysts."
          />
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
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-white transition-all duration-base ease-standard group-hover:shadow-lg group-hover:shadow-sogif-cyan-dark/15">
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
                <h3 className="mb-1 text-left type-title font-bold text-gray-900">{director.name}</h3>
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
        {/* CTA */}
        <div className="mt-12 text-center">
          <AppLink
            href="/about"
            showArrow
          >
            Learn more about the fund
          </AppLink>
        </div>
      </Container>
    </section>
  )
}
