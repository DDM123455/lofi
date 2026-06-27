'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { analytics } from '@/lib/analytics'

interface Props {
  open: boolean
  onClose: () => void
}

const BANK_ACCOUNT = '5303205160929'
const BANK_NAME = 'Agribank'
const ACCOUNT_NAME = 'NGUYEN VAN A' // ← đổi thành tên thật của bạn

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

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="mt-1 rounded-lg border border-violet-500/30 bg-violet-900/20 px-3 py-1.5 text-xs font-semibold text-violet-300 transition-all hover:bg-violet-900/40 active:scale-95"
    >
      {copied ? '✓ Đã copy!' : '📋 Copy số TK'}
    </button>
  )
}

export function SupportModal({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [qrZoom, setQrZoom] = useState(false)

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

  /* ── QR lightbox ── */
  if (qrZoom) return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)' }}
      onClick={() => setQrZoom(false)}
    >
      <div className="flex flex-col items-center gap-4" onClick={e => e.stopPropagation()}>
        <Image
          src="/qr.png"
          alt="QR chuyển khoản Agribank"
          width={300}
          height={300}
          className="rounded-2xl shadow-2xl"
        />
        <div className="text-center">
          <p className="text-sm font-semibold text-white">{BANK_NAME} · {BANK_ACCOUNT}</p>
          <p className="mt-1 text-xs text-white/50">Nhấp ra ngoài để đóng</p>
        </div>
        <button
          onClick={() => setQrZoom(false)}
          className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/20"
        >
          Đóng
        </button>
      </div>
    </div>
  )

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
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/30">
            🇻🇳 Vietnam — Chuyển khoản ngân hàng
          </p>
          <div className="flex gap-4 rounded-2xl border border-white/8 bg-white/5 p-4">
            {/* QR — click to zoom */}
            <div className="flex-shrink-0">
              <button
                onClick={() => setQrZoom(true)}
                className="group relative block rounded-xl ring-0 transition-all hover:ring-2 hover:ring-violet-400/60 focus:outline-none"
                title="Nhấp để phóng to"
              >
                <Image
                  src="/qr.png"
                  alt="QR chuyển khoản"
                  width={110}
                  height={110}
                  className="rounded-xl"
                />
                <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/0 transition-all group-hover:bg-black/30">
                  <svg className="opacity-0 transition-opacity group-hover:opacity-100" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                </span>
              </button>
            </div>
            {/* Info */}
            <div className="flex flex-col justify-center gap-2 min-w-0">
              <div>
                <p className="text-xs text-white/40 mb-0.5">Ngân hàng</p>
                <p className="text-sm font-semibold text-white">{BANK_NAME}</p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-0.5">Số tài khoản</p>
                <p className="text-sm font-mono font-semibold text-white tracking-wide">{BANK_ACCOUNT}</p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-0.5">Chủ tài khoản</p>
                <p className="text-sm font-semibold text-white">{ACCOUNT_NAME}</p>
              </div>
              <CopyButton text={BANK_ACCOUNT} />
            </div>
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
