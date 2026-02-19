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

        <PropertyShowcase />

        <StrategyOverview />

        <TeamSection />

        <InvestmentSteps />

        <RegisterInterestCTA />
      </main>
      <Footer />
    </>
  )
}
