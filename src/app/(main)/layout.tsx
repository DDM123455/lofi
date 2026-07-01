import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0d14]">
      <Header />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
