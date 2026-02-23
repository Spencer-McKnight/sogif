import type { Metadata } from 'next'
import { Header, Footer } from '@/components/layout'
import {
  HeroSection,
  PerformanceSnapshot,
  PropertyShowcase,
  InvestmentSteps,
  TeamSection,
  RegisterInterestCTA,
} from '@/components/home'
import { getConstants } from '@/lib/queries/constants'

export const metadata: Metadata = {
  title: 'SOGIF | Strategic Opportunities Growth & Income Fund',
  description:
    'Invest in a diversified Australian managed fund generating growth and income through commercial property, equities, and strategic assets. $10,000 minimum investment.',
  openGraph: {
    title: 'SOGIF | Strategic Opportunities Growth & Income Fund',
    description:
      'An Australian registered managed fund seeking to generate growth and income returns through diversified investment strategies.',
    type: 'website',
  },
}

export default async function Home() {
  const constants = await getConstants()

  return (
    <>
      <Header />
      <main>
        <HeroSection />

        <PerformanceSnapshot performanceData={constants.performanceData} />

        <PropertyShowcase />

        <TeamSection />

        <InvestmentSteps />

        <RegisterInterestCTA />
      </main>
      <Footer />
    </>
  )
}
