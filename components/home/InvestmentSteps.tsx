import { ButtonLink, Container, SectionHeader } from '@/components/ui'

type Step = {
    number: string
    title: string
    description: string
}

// TODO: Replace with CMS-managed content
const steps: Step[] = [
    {
        number: '1',
        title: 'Read',
        description: 'Read the offer documents to make an informed decision.',
    },
    {
        number: '2',
        title: 'Register',
        description: 'Complete the online application form and identification check.',
    },
    {
        number: '3',
        title: 'Remit',
        description: 'Transfer funds to complete your application.',
    },
]


export function InvestmentSteps() {
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
                        eyebrow="How it works"
                        title="Three Easy Steps to Investing"
                        align="center-to-left"
                    />
                </div>

                <div className="relative">
                    <div className="grid gap-8 lg:grid-cols-3 max-w-sm mx-auto lg:max-w-none lg:mx-0 justify-items-center lg:justify-items-start">
                        {steps.map((step) => (
                            <div key={step.number} className="relative flex flex-col items-center lg:items-start w-full">
                                <div className="group flex items-start gap-3 sm:gap-4 w-full">
                                    <span
                                        className="shrink-0 w-14 sm:w-[4.5rem] lg:w-auto text-right lg:text-left font-black leading-[0.85] text-sogif-navy-light/25 group-hover:text-sogif-navy-light/90 text-[6rem] sm:text-[8rem] lg:text-[9rem] select-none tracking-tighter transition-colors duration-300 ease-standard"
                                        aria-hidden="true"
                                    >
                                        {step.number}
                                    </span>
                                    <div className="pt-4 sm:pt-6 lg:pt-8">
                                        <h3 className="relative w-fit type-title font-bold text-sogif-navy after:content-[''] after:absolute after:-bottom-px after:left-0 after:h-[2px] after:w-0 after:bg-sogif-gold/80 after:transition-all after:duration-300 group-hover:after:w-full">
                                            {step.title}
                                        </h3>
                                        <p className="mt-4 type-support text-gray-600 max-w-prose">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Button right-aligned on desktop — sits at the ascending peak */}
                <div className="mt-14 lg:mt-8 flex justify-center lg:justify-end">
                    <ButtonLink
                        href="/apply"
                        variant="primary"
                        size="lg"
                        glow="gold"
                        fullWidth="sm"
                        className="group focus-ring"
                    >
                        Start Your Application Here
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
