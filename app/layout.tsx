import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gerald Ezena | Senior Frontend Developer',
  description: 'Portfolio and CMS for Gerald Ezena, Senior Frontend Developer specializing in Next.js, React, and modern web applications.',
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0f172a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-slate-950">
      <body className="bg-slate-950 text-slate-50 antialiased">
        {children}
      </body>
    </html>
  )
}
