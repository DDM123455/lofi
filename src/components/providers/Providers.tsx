'use client'

import { LanguageProvider } from '@/contexts/LanguageContext'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}
