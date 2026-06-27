'use client'

import { useEffect, useRef } from 'react'
import { analytics } from '@/lib/analytics'

interface Props {
  open: boolean
  onClose: () => void
}

const VIETNAM_METHODS = [
  {
    id: 'vietqr',
    label: 'VietQR',
    icon: '🏦',
    desc: 'Scan QR với bất kỳ app ngân hàng',
    action: 'Xem QR',
    href: '#',
  },
  {
    id: 'bank-transfer',
    label: 'Chuyển khoản',
    icon: '💳',
    desc: 'MB Bank · 1234 5678 · Nguyễn Văn A',
    action: 'Copy số TK',
    href: '#',
    copyText: '1234567890',
  },
]

const INTL_METHODS = [
  {
    id: 'buymeacoffee',
    label: 'Buy Me a Coffee',
    icon: '☕',
    desc: 'One-click support via card or PayPal',
    action: 'Support →',
    href: 'https://buymeacoffee.com/manhdd',
  },
]

const AMOUNTS = [
  { label: '☕ Buy me a coffee', value: '$3' },
  { label: '🍜 Late-night coding meal', value: '$10' },
  { label: '🚀 Help build new features', value: '$20' },
]

export function SupportModal({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  function handleMethod(id: string, href: string, copyText?: string) {
    analytics.donationMethodClick(id)
    if (copyText) {
      navigator.clipboard.writeText(copyText).catch(() => {})
      return
    }
    if (href !== '#') window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(5,5,10,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === overlayRef.current) onClose() }}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border border-white/10 p-8 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(13,13,20,0.95) 60%)',
          backdropFilter: 'blur(24px)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-3 text-4xl">💜</div>
          <h2 className="mb-2 text-xl font-bold text-white">Support Future Development</h2>
          <p className="text-sm text-white/50 leading-relaxed">
            If LofiSpace helps you stay focused, study or code more effectively,
            consider supporting future development.
          </p>
        </div>

        {/* Suggested amounts */}
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {AMOUNTS.map(a => (
            <span
              key={a.value}
              className="rounded-full border border-violet-500/25 bg-violet-900/20 px-3 py-1 text-xs text-violet-300"
            >
              {a.label} · <span className="font-semibold">{a.value}</span>
            </span>
          ))}
        </div>

        {/* Vietnam */}
        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/30">
            🇻🇳 Vietnam
          </p>
          <div className="grid grid-cols-2 gap-2">
            {VIETNAM_METHODS.map(m => (
              <button
                key={m.id}
                onClick={() => handleMethod(m.id, m.href, m.copyText)}
                className="flex flex-col gap-1 rounded-xl border border-white/8 bg-white/5 p-4 text-left transition-all hover:border-violet-500/40 hover:bg-white/10"
              >
                <span className="text-xl">{m.icon}</span>
                <span className="text-sm font-semibold text-white">{m.label}</span>
                <span className="text-xs text-white/40 leading-snug">{m.desc}</span>
                <span className="mt-1 text-xs font-medium text-violet-400">{m.action}</span>
              </button>
            ))}
          </div>
        </div>

        {/* International */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/30">
            🌍 International
          </p>
          <div className="grid grid-cols-2 gap-2">
            {INTL_METHODS.map(m => (
              <button
                key={m.id}
                onClick={() => handleMethod(m.id, m.href)}
                className="flex flex-col gap-1 rounded-xl border border-white/8 bg-white/5 p-4 text-left transition-all hover:border-violet-500/40 hover:bg-white/10"
              >
                <span className="text-xl">{m.icon}</span>
                <span className="text-sm font-semibold text-white">{m.label}</span>
                <span className="text-xs text-white/40 leading-snug">{m.desc}</span>
                <span className="mt-1 text-xs font-medium text-violet-400">{m.action}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-white/20">
          Thank you — every contribution keeps LofiSpace free for everyone 💜
        </p>
      </div>
    </div>
  )
}
