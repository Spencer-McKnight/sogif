import { Header, Footer } from '@/components/layout'
import {
  HeroSection,
  ValueCarousel,
  PerformanceSnapshot,
  PropertyShowcase,
  InvestmentSteps,
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
        <HeroSection />

        <PerformanceSnapshot performanceData={constants.performanceData} />

        <ValueCarousel />

        <PropertyShowcase />

        <TeamSection />

        <InvestmentSteps />

        <RegisterInterestCTA />
      </main>
      <Footer />
    </>
  )
}
