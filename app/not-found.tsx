import type { Metadata } from 'next'
import { Header, Footer } from '@/components/layout'
import { ButtonLink, Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Page Not Found | SOGIF',
}

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-sogif-navy min-h-[70vh] flex items-center">
        <Container className="text-center py-32">
          <p className="type-overline text-sogif-cyan-light mb-4">404</p>
          <h1 className="type-heading text-white mb-4">Page Not Found</h1>
          <p className="type-body text-white/75 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <ButtonLink href="/" variant="primary" size="lg" glow="gold">
            Return Home
          </ButtonLink>
        </Container>
      </main>
      <Footer />
    </>
  )
}
