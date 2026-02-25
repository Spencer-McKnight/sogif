import { Container } from './container'

interface SubpageHeroProps {
  title: string
  description?: string
}

export function SubpageHero({ title, description }: SubpageHeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-sogif-navy h-[300px] lg:h-[390px] flex flex-col items-start"
      aria-label={`${title} page header`}
    >
      {/* Ambient radial glow — top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, hsl(189 100% 65% / 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Ambient radial glow — bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-[320px] w-[320px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, hsl(41 98% 67% / 0.05) 0%, transparent 70%)',
        }}
      />

      {/* Decorative angled rule marks — top-right corner */}
      <div aria-hidden className="pointer-events-none absolute right-0 inset-y-0 w-72 overflow-hidden opacity-30">
        <div className="absolute right-16 top-0 h-[120%] w-px rotate-[18deg] origin-top bg-sogif-cyan" />
        <div className="absolute right-28 top-0 h-[120%] w-px rotate-[18deg] origin-top bg-sogif-cyan" />
        <div className="absolute right-40 top-0 h-[120%] w-px rotate-[18deg] origin-top bg-sogif-cyan" />
      </div>

      {/* Left-edge cyan glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 inset-y-0 w-[700px]"
        style={{
          background:
            'radial-gradient(ellipse at left center, hsl(189 100% 65% / 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Bottom edge separator */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, hsl(189 100% 65% / 0.25) 30%, hsl(189 100% 65% / 0.25) 70%, transparent)',
        }}
      />

      <Container className="relative mt-auto pb-14 lg:pb-20">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-6 flex flex-col items-start">
            <h1 className="type-heading font-display text-white">
              {title}
            </h1>

            {description && (
              <p className="mt-4 type-body text-white/70">
                {description}
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
