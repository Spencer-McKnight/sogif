import { Header, Footer } from '@/app/components/layout'
import { 
  HeroSection, 
  PerformanceSection, 
  BenefitsSection, 
  TeamSection, 
  CTASection 
} from '@/app/components/home'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PerformanceSection />
        <BenefitsSection />
        <TeamSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
