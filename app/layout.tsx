import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getConstants, constantsRevalidate, ConstantsProvider } from '@/lib'
import './globals.css'

/**
 * ISR Revalidation Configuration
 * Constants are cached and revalidated periodically for optimal performance
 */
export const revalidate = constantsRevalidate

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
