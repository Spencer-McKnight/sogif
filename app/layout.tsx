import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getConstants, ConstantsProvider } from '@/lib'
import './globals.css'

// Body + UI font: neutral, highly legible, excellent screen rendering
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

// Display/heading font: geometric, confident — strong at large scales
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
})

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
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        <ConstantsProvider constants={constants}>
          {children}
        </ConstantsProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
