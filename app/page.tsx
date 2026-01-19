import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { PropertyPortfolio } from '@/components/sections/PropertyPortfolio'
import { MeetTheTeam } from '@/components/sections/MeetTheTeam'
import { Performance } from '@/components/sections/Performance'
import { InvestingSteps } from '@/components/sections/InvestingSteps'
import { RegisterInterest } from '@/components/sections/RegisterInterest'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section id="portfolio">
          <PropertyPortfolio />
        </section>
        <section id="team">
          <MeetTheTeam />
        </section>
        <section id="performance">
          <Performance />
        </section>
        <InvestingSteps />
        <section id="register">
          <RegisterInterest />
        </section>
      </main>
      <Footer />
    </>
  )
}
