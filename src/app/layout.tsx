import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'LofiSpace — Ambient Sound Widget for Notion & Blog',
  description:
    'Create beautiful ambient sound widgets with lofi music and animated backgrounds. Embed directly into Notion, blog, or any webpage.',
  keywords: ['lofi', 'ambient sound', 'notion widget', 'study music', 'pixel art background'],
  openGraph: {
    title: 'LofiSpace — Ambient Sound Widget',
    description: 'Create & embed lofi ambient widgets into Notion or your blog.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#0d0d14] text-white">{children}</body>
    </html>
  )
}
