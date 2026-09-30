import { Suspense } from 'react'
import { EmbedClient } from './EmbedClient'
import { BootBackdrop } from '@/components/workspace/BootBackdrop'

export const metadata = {
  title: 'LofiSpace Widget',
  robots: { index: false },
}

export default function EmbedPage() {
  return (
    <Suspense fallback={<BootBackdrop />}>
      <EmbedClient />
    </Suspense>
  )
}
