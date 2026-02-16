import { Header, Footer } from '@/components/layout'
import {
  HeroSection,
  ValueCarousel,
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

        <ValueCarousel />

        {/* Properties: Portfolio showcase for tangibility */}
        <PropertyShowcase />

        {/* Performance: Data visualization and fund metrics */}
        <PerformanceSnapshot performanceData={constants.performanceData} />

        {/* Team: Leadership credibility and experience */}
        <TeamSection />

        {/* How It Works: Clear investment process for conversion */}
        <HowItWorks />

        {/* CTA: Final conversion with dual paths */}
        <RegisterInterestCTA />
      </main>
      <Footer />
    </>
  )
}
