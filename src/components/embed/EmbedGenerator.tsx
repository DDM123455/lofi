'use client'

import { useMemo, useState } from 'react'
import { BG_PRESETS } from '@/lib/backgrounds'
import { LOFI_STREAMS } from '@/lib/lofiStreams'

const BASE = 'https://www.focusworkspace.app'

const ACCENTS = [
  { label: 'Violet', hex: 'a78bfa' },
  { label: 'Cyan', hex: '22d3ee' },
  { label: 'Amber', hex: 'f59e0b' },
  { label: 'Pink', hex: 'db2777' },
  { label: 'Indigo', hex: '818cf8' },
]

export function EmbedGenerator() {
  const [bgId, setBgId] = useState(BG_PRESETS[0].id)
  const [lofiId, setLofiId] = useState(LOFI_STREAMS[0].id)
  const [accent, setAccent] = useState(ACCENTS[0].hex)
  const [showPom, setShowPom] = useState(true)
  const [showClock, setShowClock] = useState(true)
  const [workMin, setWorkMin] = useState(25)
  const [breakMin, setBreakMin] = useState(5)
  const [copied, setCopied] = useState(false)

  const bgPreset = BG_PRESETS.find(b => b.id === bgId) ?? BG_PRESETS[0]

  const query = useMemo(() => {
    const params = new URLSearchParams({
      bgv: bgPreset.url,
      ls: lofiId,
      lv: '65',
      ac: accent,
      pom: showPom ? '1' : '0',
      clk: showClock ? '1' : '0',
      pw: String(workMin),
      pb: String(breakMin),
    })
    return params.toString()
  }, [bgPreset.url, lofiId, accent, showPom, showClock, workMin, breakMin])

  // /workspace (not /embed — that's a legacy 308 redirect) is the canonical
  // iframe target: it's the only route with ALLOWALL frame headers set in next.config.ts
  const embedPath = `/workspace?${query}`
  const embedCode = `<iframe src="${BASE}${embedPath}" width="400" height="300" style="border:0;border-radius:12px" allow="autoplay" loading="lazy"></iframe>`

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {}
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      {/* Controls */}
      <div className="space-y-5 rounded-xl border border-white/10 bg-white/3 p-5">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/40">Background</label>
          <select
            value={bgId}
            onChange={e => setBgId(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#14121f] px-3 py-2 text-sm text-white/85 focus:border-violet-500/50 focus:outline-none"
          >
            {BG_PRESETS.map(b => (
              <option key={b.id} value={b.id}>{b.emoji} {b.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/40">Lofi Stream</label>
          <select
            value={lofiId}
            onChange={e => setLofiId(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#14121f] px-3 py-2 text-sm text-white/85 focus:border-violet-500/50 focus:outline-none"
          >
            {LOFI_STREAMS.map(s => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/40">Accent Color</label>
          <div className="flex flex-wrap gap-2">
            {ACCENTS.map(a => (
              <button
                key={a.hex}
                type="button"
                onClick={() => setAccent(a.hex)}
                title={a.label}
                className="h-8 w-8 rounded-full transition-all"
                style={{
                  background: `#${a.hex}`,
                  outline: accent === a.hex ? '2px solid white' : '2px solid transparent',
                  outlineOffset: 2,
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/40">Focus (min)</label>
            <input
              type="number" min={1} max={60} value={workMin}
              onChange={e => setWorkMin(Math.min(60, Math.max(1, parseInt(e.target.value) || 25)))}
              className="w-full rounded-lg border border-white/10 bg-[#14121f] px-3 py-2 text-sm text-white/85 focus:border-violet-500/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/40">Break (min)</label>
            <input
              type="number" min={1} max={30} value={breakMin}
              onChange={e => setBreakMin(Math.min(30, Math.max(1, parseInt(e.target.value) || 5)))}
              className="w-full rounded-lg border border-white/10 bg-[#14121f] px-3 py-2 text-sm text-white/85 focus:border-violet-500/50 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-sm text-white/70">
            <input type="checkbox" checked={showPom} onChange={e => setShowPom(e.target.checked)} className="accent-violet-500" />
            Show Pomodoro timer
          </label>
          <label className="flex items-center gap-2 text-sm text-white/70">
            <input type="checkbox" checked={showClock} onChange={e => setShowClock(e.target.checked)} className="accent-violet-500" />
            Show clock
          </label>
        </div>
      </div>

      {/* Preview + code */}
      <div className="space-y-4 min-w-0">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40" style={{ aspectRatio: '4 / 3' }}>
          <iframe
            key={embedPath}
            src={embedPath}
            className="h-full w-full"
            style={{ border: 0 }}
            loading="lazy"
            allow="autoplay"
            title="LofiSpace embed preview"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Embed Code</span>
            <button
              type="button"
              onClick={copyCode}
              className="rounded-full bg-violet-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-violet-500 transition-colors"
            >
              {copied ? 'Copied ✓' : 'Copy Code'}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-lg border border-white/10 bg-[#0a0912] p-3 text-xs text-violet-200/80">
            <code>{embedCode}</code>
          </pre>
          <p className="mt-2 text-xs text-white/30">Paste this into Notion&apos;s /embed block, or any page that accepts an iframe.</p>
        </div>
      </div>
    </div>
  )
}
