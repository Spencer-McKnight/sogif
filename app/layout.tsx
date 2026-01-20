import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getConstants, ConstantsProvider } from '@/lib'
import { Header, Footer } from '@/components/layout'
import './globals.css'

/**
 * ISR Revalidation Configuration
 * Constants are cached and revalidated every hour (3600 seconds)
 */
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'SOGIF | Strategic Opportunities Growth & Income Fund',
  description: 'The Strategic Opportunities (Growth & Income) Fund - An Australian registered managed fund seeking to generate growth and income returns through diversified investment strategies.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A2540',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch global constants at the root level
  // This data is cached and deduplicated across all server components
  const constants = await getConstants()

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ConstantsProvider constants={constants}>
          <Header />
          <div className="flex-1 pt-16">
            {children}
          </div>
          <Footer />
        </ConstantsProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
