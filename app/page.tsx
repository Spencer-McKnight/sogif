import { Header, Footer } from '@/components/layout'
import {
  HeroSection,
  PerformanceSnapshot,
  PropertyShowcase,
  InvestmentSteps,
  TeamSection,
  RegisterInterestCTA,
  StrategyOverview,
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

        <TeamSection />

        <StrategyOverview />

        <PropertyShowcase />

        <InvestmentSteps />

        <RegisterInterestCTA />
      </main>
      <Footer />
    </>
  )
}
