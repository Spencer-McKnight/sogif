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
import { getHomePage, getProperties } from '@/lib/queries/homepage'

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
  const [constants, homePage, properties] = await Promise.all([
    getConstants(),
    getHomePage(),
    getProperties(),
  ])

  if (!homePage) {
    return (
      <>
        <Header />
        <main />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <HeroSection cms={homePage} />

        <PerformanceSnapshot performanceData={constants.performanceData} cms={homePage} />

        <PropertyShowcase cms={homePage} properties={properties} />

        <TeamSection cms={homePage} />

        <InvestmentSteps cms={homePage} />

        <RegisterInterestCTA cms={homePage} />
      </main>
      <Footer />
    </>
  )
}
