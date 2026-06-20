import { Suspense } from 'react'
import { EmbedClient } from './EmbedClient'

export const metadata = {
  title: 'LofiSpace Widget',
  robots: { index: false },
}

export default function EmbedPage() {
  return (
    <Suspense fallback={<div className="embed-root bg-[#0d0d14]" />}>
      <EmbedClient />
    </Suspense>
  )
}
