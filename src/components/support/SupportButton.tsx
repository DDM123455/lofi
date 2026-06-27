'use client'

import { useState } from 'react'
import { SupportModal } from './SupportModal'
import { analytics } from '@/lib/analytics'

export function SupportButton() {
  const [open, setOpen] = useState(false)

  function handleClick() {
    analytics.supportClick()
    setOpen(true)
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="text-xs text-white/30 transition-colors hover:text-violet-400"
      >
        ☕ Support Future Development
      </button>
      <SupportModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
