import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import { ClarityScript } from '@/components/analytics/ClarityScript'
import { Providers } from '@/components/providers/Providers'
import './globals.css'

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const BASE = 'https://focusworkspace.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'LofiSpace — Free Online Study Room & Focus Workspace',
    template: '%s | LofiSpace',
  },
  description:
    'Free online study room with lofi music, ambient sounds mixer, Pomodoro timer, to-do list and XP system. No sign-up. Study smarter for free.',
  keywords: [
    'online study room', 'virtual study room', 'focus workspace', 'lofi music',
    'pomodoro timer', 'ambient sounds', 'anime study room', 'study with me',
    'productivity workspace', 'deep work room',
  ],
  authors: [{ name: 'LofiSpace', url: BASE }],
  creator: 'LofiSpace',
  publisher: 'LofiSpace',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    siteName: 'LofiSpace',
    title: 'LofiSpace — Free Online Study Room',
    description: 'Lofi music, ambient sounds, Pomodoro timer & XP system. Study smarter for free.',
    url: BASE,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@lofispace',
    title: 'LofiSpace — Free Online Study Room',
    description: 'Lofi music, ambient sounds, Pomodoro timer & XP system. Study smarter for free.',
  },
  alternates: { canonical: BASE },
  verification: {
    google: 'PASTE_YOUR_VERIFICATION_CODE_HERE',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d0d14',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* ── Google Analytics 4 — must be in <head> for Search Console GA verification ── */}
        {GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname,send_page_view:true});`,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen bg-[#0d0d14] text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-white focus:no-underline">
          Skip to content
        </a>
        <Providers>

        {/* ── Microsoft Clarity ───────────────────────────────────── */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <ClarityScript clarityId={process.env.NEXT_PUBLIC_CLARITY_ID} />
        )}

        {children}

        {/* ── Google AdSense ──────────────────────────────────────── */}

        {process.env.NEXT_PUBLIC_ADSENSE_PUB_ID && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        </Providers>
      </body>
    </html>
  )
}
