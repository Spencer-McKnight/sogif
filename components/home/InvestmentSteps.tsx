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
        title: 'Analyse',
        description: 'Read the PDS and consider the investment amount that suits your goals.',
    },
    {
        number: '2',
        title: 'Apply',
        description: 'Complete the online application form and deposit your funds.',
    },
    {
        number: '3',
        title: 'Access',
        description: 'Gain access to the investor portal to track your investment.',
    },
]

/* Ascending stagger: step 1 sits lowest, step 3 highest on lg */
const stagger = ['lg:mt-16', 'lg:mt-8', 'lg:mt-0']

export function InvestmentSteps() {
    return (
        <section className="section-padding bg-sogif-silver-light relative overflow-hidden">
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
                <div className="mb-16">
                    <SectionHeader
                        eyebrow="Where do I start?"
                        title="Easy Steps to Invest"
                    />
                </div>

                <div className="relative">
                    <div className="grid gap-8 md:grid-cols-3">
                        {steps.map((step, i) => (
                            <div key={step.number} className={`relative ${stagger[i]}`}>
                                <div className="group flex items-start gap-3 sm:gap-4">
                                    <span
                                        className="shrink-0 font-black leading-[0.85] text-sogif-navy/[0.07] text-[6rem] sm:text-[8rem] lg:text-[9rem] select-none tracking-tighter"
                                        aria-hidden="true"
                                    >
                                        {step.number}
                                    </span>
                                    <div className="pt-4 sm:pt-6 lg:pt-8">
                                        <h3 className="relative w-fit type-title font-bold text-sogif-navy after:content-[''] after:absolute after:-bottom-px after:left-0 after:h-[2px] after:w-0 after:bg-sogif-gold/80 after:transition-all after:duration-300 group-hover:after:w-full">
                                            {step.title}
                                        </h3>
                                        <p className="mt-4 type-support text-gray-600 max-w-[16rem]">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                                {/* Connector arc — bridges gap to the next step */}
                                {i < steps.length - 1 && (
                                    <svg
                                        className="hidden md:block absolute right-0 translate-x-1/2 top-[2.5rem] sm:top-[3.5rem] lg:top-[4rem] w-8 h-6 pointer-events-none"
                                        viewBox="0 0 32 24"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M 4 20 C 12 19, 16 5, 28 4"
                                            stroke="hsl(41, 98%, 65%)"
                                            strokeWidth="1.5"
                                            strokeOpacity="0.22"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Button right-aligned on desktop — sits at the ascending peak */}
                <div className="mt-14 lg:mt-6 flex justify-center lg:justify-end">
                    <ButtonLink
                        href="/invest"
                        variant="primary"
                        size="lg"
                        glow="gold"
                        fullWidth="sm"
                        className="group focus-ring"
                    >
                        Start Investing
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
