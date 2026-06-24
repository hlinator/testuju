import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'FORGE — Trénuj jako profesionál',
  description: 'Instruktážní videa, neurovizuální minihry a ELO ranking pro hokejisty a florbalisty všech věkových kategorií. Stačí 10 minut denně.',
  keywords: ['hokej', 'florbal', 'trénink', 'neurovizuální', 'ELO ranking', 'skill development'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="cs"
      data-theme="dark"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
