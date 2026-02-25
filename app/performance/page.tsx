import type { Metadata } from 'next'
import { Header, Footer } from '@/components/layout'
import { SubpageHero } from '@/components/ui'
import { PerformancePageContent } from '@/components/performance'

export const metadata: Metadata = {
  title: 'Performance | SOGIF',
  description:
    'Transparent monthly reporting on SOGIF pricing, capital allocation, distributions, and fund performance history.',
}

export default function PerformancePage() {
  return (
    <>
      <Header />
      <main>
        <SubpageHero
          title="Performance"
          description="Transparent monthly reporting on our pricing, capital allocation and capital return distributions."
        />
        <PerformancePageContent />
      </main>
      <Footer />
    </>
  )
}
