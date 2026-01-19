import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SOGIF | Strategic Opportunities Growth Index Fund',
  description: 'Access institutional-grade property investments with SOGIF. Build wealth through strategic property investment with consistent returns and a diversified portfolio.',
  keywords: ['property investment', 'real estate fund', 'investment fund', 'property portfolio', 'Australian investment'],
  authors: [{ name: 'SOGIF' }],
  openGraph: {
    title: 'SOGIF | Strategic Opportunities Growth Index Fund',
    description: 'Access institutional-grade property investments with SOGIF. Build wealth through strategic property investment.',
    type: 'website',
    locale: 'en_AU',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A2540',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
