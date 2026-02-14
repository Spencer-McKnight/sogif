import { Header, Footer } from '@/components/layout'
import {
  HeroSection,
  ValueProposition,
  PerformanceSnapshot,
  PropertyShowcase,
  HowItWorks,
  TeamSection,
  RegisterInterestCTA,
} from '@/components/home'
import { getConstants } from '@/lib/queries/constants'

export default async function Home() {
  const constants = await getConstants()

  return (
    <>
      <Header />
      <main>
        {/* Hero: Primary value proposition and key metrics */}
        <HeroSection />

        {/* Performance: Data visualization and fund metrics */}
        <PerformanceSnapshot performanceData={constants.performanceData} />

        {/* Properties: Portfolio showcase for tangibility */}
        <PropertyShowcase />

        {/* Team: Leadership credibility and experience */}
        <TeamSection />

        {/* Value Props: Why choose SOGIF - benefits and trust signals */}
        <ValueProposition />

        {/* How It Works: Clear investment process for conversion */}
        <HowItWorks />

        {/* CTA: Final conversion with dual paths */}
        <RegisterInterestCTA />
      </main>
      <Footer />
    </>
  )
}
