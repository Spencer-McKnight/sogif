import {
  Hero,
  TrustStrip,
  PropertyPortfolio,
  Performance,
  Team,
  HowToInvest,
  RegisterInterest,
  FAQ,
} from '@/components/home'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <PropertyPortfolio />
      <Performance />
      <Team />
      <HowToInvest />
      <RegisterInterest />
      <FAQ />
    </main>
  )
}
