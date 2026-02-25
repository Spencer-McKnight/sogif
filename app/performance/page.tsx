import { Header, Footer } from '@/components/layout'
import { SubpageHero } from '@/components/ui'
import { PerformancePageContent } from './PerformancePageContent'

export default function PerformancePage() {
  return (
    <>
      <Header />
      <SubpageHero
        title="Performance"
        description="Transparent monthly reporting on our pricing, capital allocation and capital return distributions."
      />
      <main>
        <PerformancePageContent />
      </main>
      <Footer />
    </>
  )
}
