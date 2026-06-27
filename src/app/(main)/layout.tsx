import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    template: '%s | LofiSpace',
    default: 'LofiSpace — Free Online Study Room',
  },
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0d14]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
