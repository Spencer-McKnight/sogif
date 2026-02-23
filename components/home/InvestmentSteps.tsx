import type { ReactNode } from 'react'
import { StructuredText } from 'react-datocms'
import { ButtonLink, Container, SectionHeader } from '@/components/ui'
import type { HomePageData } from '@/lib'

interface InvestmentStepsProps {
    cms: HomePageData
}

export function InvestmentSteps({ cms }: InvestmentStepsProps) {
    const {
        stepsEyebrow: eyebrow,
        stepsTitle: title,
        stepsCtaLabel: ctaLabel,
        stepsCtaHref: ctaHref,
        steps: cmsSteps,
    } = cms

    const steps = cmsSteps.map((step, index) => ({
            number: String(index + 1),
            title: step.title,
            description: (step.description?.value
                ? <StructuredText data={step.description} />
                : null) as ReactNode,
        }))

    return (
        <section className="section-padding bg-sogif-silver relative overflow-hidden">
            {/* Faint gold radial glow anchoring the destination corner */}
            <div
                className="absolute bottom-0 right-0 w-2/3 h-2/3 pointer-events-none hidden lg:block"
                style={{
                    background:
                        'radial-gradient(ellipse at 85% 75%, hsl(41 98% 65% / 0.045), transparent 55%)',
                }}
                aria-hidden="true"
            />

            <Container className="relative">
                <div className="mb-12">
                    <SectionHeader
                        eyebrow={eyebrow}
                        title={title}
                        align="center-to-left"
                    />
                </div>

                <div className="relative">
                    <div className="grid gap-8 lg:grid-cols-3 max-w-sm mx-auto lg:max-w-none lg:mx-0 justify-items-center lg:justify-items-start">
                        {steps.map((step) => (
                            <div key={step.number} className="relative flex flex-col items-center lg:items-start w-full">
                                <div className="group flex items-end gap-3 sm:gap-4 w-full">
                                    <span
                                        className="shrink-0 w-14 sm:w-[4.5rem] lg:w-auto text-right lg:text-left font-black leading-[0.85] text-sogif-navy-light/30 group-hover:text-sogif-navy-light/90 text-[6rem] sm:text-[8rem] lg:text-[9rem] select-none tracking-tighter transition-colors duration-300 ease-standard"
                                        aria-hidden="true"
                                    >
                                        {step.number}
                                    </span>
                                    <div className="pb-1">
                                        <h3 className="relative w-fit type-title font-bold text-sogif-navy after:content-[''] after:absolute after:-bottom-px after:left-0 after:h-[2px] after:w-0 after:bg-sogif-gold/80 after:transition-all after:duration-300 group-hover:after:w-full">
                                            {step.title}
                                        </h3>
                                        <div className="mt-4 type-support text-gray-600 max-w-prose [&_p]:m-0">
                                            {step.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Button right-aligned on desktop — sits at the ascending peak */}
                <div className="mt-14 lg:mt-8 flex justify-center lg:justify-end">
                    <ButtonLink
                        href={ctaHref}
                        variant="primary"
                        size="lg"
                        glow="gold"
                        fullWidth="sm"
                        className="group focus-ring"
                    >
                        {ctaLabel}
                        <svg
                            className="w-4 h-4 transition-transform duration-base ease-standard group-hover:translate-x-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </ButtonLink>
                </div>
            </Container>
        </section>
    )
}
