import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AutoLifeGh - Find Your Next Car',
  description: 'Drive Your Dream Car with Confidence. Browse quality vehicles from trusted sellers across Ghana.',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
