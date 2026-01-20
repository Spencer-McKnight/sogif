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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero: Primary value proposition and key metrics */}
        <HeroSection />
        
        {/* Value Props: Why choose SOGIF - benefits and trust signals */}
        <ValueProposition />
        
        {/* Performance: Data visualization and fund metrics */}
        <PerformanceSnapshot />
        
        {/* Properties: Portfolio showcase for tangibility */}
        <PropertyShowcase />
        
        {/* How It Works: Clear investment process for conversion */}
        <HowItWorks />
        
        {/* Team: Leadership credibility and experience */}
        <TeamSection />
        
        {/* CTA: Final conversion with dual paths */}
        <RegisterInterestCTA />
      </main>
      <Footer />
    </>
  )
}
