import type { ReactNode } from 'react'
import { StructuredText } from 'react-datocms'
import {
  AppLink,
  Container,
  DatoImage,
  SectionHeader,
} from '@/components/ui'
import type { HomePageData, CmsImageField } from '@/lib'

interface TeamSectionProps {
  cms: HomePageData
}

function DirectorCard({ name, role, credentials, tagline, imageData }: {
  name: string
  role: string
  credentials: string
  tagline: ReactNode
  imageData: CmsImageField
}) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-start gap-4 sm:flex-col sm:items-stretch sm:gap-0">
        <div className="relative w-40 shrink-0 sm:mb-6 sm:w-full">
          <div className="relative aspect-square md:max-w-72 overflow-hidden rounded-lg sm:rounded-xl">
            <DatoImage
              data={imageData}
              className="h-full w-full rounded-lg sm:rounded-xl"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              sizes="(min-width: 640px) 33vw, 160px"
            />
          </div>
        </div>

        <div className="min-w-0 flex flex-col justify-center sm:justify-start">
          <h3 className="mb-1 text-left type-title text-gray-900">{name}</h3>
          <p className="mb-1 text-left type-overline font-semibold tracking-[0.12em] text-sogif-cyan-dark">
            {role}
          </p>
          <p className="text-left text-gray-600 type-support">{credentials}</p>
          <div className="mt-3 text-left text-gray-600 type-support leading-relaxed [&_p]:m-0">
            {tagline}
          </div>
        </div>
      </div>
    </div>
  )
}

export function TeamSection({ cms }: TeamSectionProps) {
  const {
    teamEyebrow: eyebrow,
    teamTitle: title,
    teamDescription: description,
    teamMembers,
    teamLinkLabel: linkLabel,
  } = cms

  const members = teamMembers.map((member) => ({
    id: member.id,
    name: member.name,
    role: member.role,
    credentials: member.credentials,
    tagline: <StructuredText data={member.tagline} /> as ReactNode,
    imageData: member.image,
  }))

  return (
    <section className="section-padding bg-sogif-silver-light">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <SectionHeader
              align="left"
              eyebrow={eyebrow}
              title={title}
              description={description}
            />
          </div>
          {linkLabel && (
            <AppLink
              href="/about"
              showArrow
              variant="text"
              className="hidden md:inline-flex shrink-0"
            >
              {linkLabel}
            </AppLink>
          )}
        </div>

        {/* Team Grid — 1 col mobile, 12-col grid desktop */}
        <div className="grid gap-8 sm:grid-cols-12">
          {members.map((member) => (
            <div key={member.id} className="sm:col-span-4">
              <DirectorCard
                name={member.name}
                role={member.role}
                credentials={member.credentials}
                tagline={member.tagline}
                imageData={member.imageData}
              />
            </div>
          ))}
        </div>

        {/* Mobile page link */}
        {linkLabel && (
          <div className="mt-10 text-center md:hidden">
            <AppLink href="/strategy" showArrow variant="text">
              {linkLabel}
            </AppLink>
          </div>
        )}
      </Container>
    </section>
  )
}
