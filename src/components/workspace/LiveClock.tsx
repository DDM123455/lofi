'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export type ClockStyle = 'digital' | 'minimal' | 'bold' | 'analog'

function AnalogClock({ now, size = 100, accent }: { now: Date; size?: number; accent: string }) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 4
  const h = (now.getHours() % 12 + now.getMinutes() / 60) / 12 * 2 * Math.PI - Math.PI / 2
  const m = (now.getMinutes() + now.getSeconds() / 60) / 60 * 2 * Math.PI - Math.PI / 2
  const s = now.getSeconds() / 60 * 2 * Math.PI - Math.PI / 2
  return (
    <svg width={size} height={size} style={{ filter: 'drop-shadow(0 2px 14px rgba(0,0,0,0.7))' }}>
      <circle cx={cx} cy={cy} r={r} fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.15)" strokeWidth={1.5} />
      {Array.from({ length: 12 }, (_, i) => { const a = i / 12 * 2 * Math.PI; return <line key={i} x1={cx + Math.cos(a) * (r - 5)} y1={cy + Math.sin(a) * (r - 5)} x2={cx + Math.cos(a) * (r - 1)} y2={cy + Math.sin(a) * (r - 1)} stroke="rgba(255,255,255,0.3)" strokeWidth={i % 3 === 0 ? 1.5 : 0.7} /> })}
      <line x1={cx} y1={cy} x2={cx + Math.cos(h) * r * 0.52} y2={cy + Math.sin(h) * r * 0.52} stroke="white" strokeWidth={3} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + Math.cos(m) * r * 0.76} y2={cy + Math.sin(m) * r * 0.76} stroke="white" strokeWidth={2} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + Math.cos(s) * r * 0.86} y2={cy + Math.sin(s) * r * 0.86} stroke={accent} strokeWidth={1.2} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={3} fill={accent} />
    </svg>
  )
}

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Self-contained wall clock. Owns its own 1s ticker so the once-per-second re-render
 * stays scoped to this ~30-node subtree instead of re-rendering the whole workspace.
 * `now` starts null to avoid an SSR/hydration time mismatch.
 */
export function LiveClock({ clockStyle, accent }: { clockStyle: ClockStyle; accent: string }) {
  const { lang, t } = useLanguage()
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const timeStr = now ? `${pad(now.getHours())}:${pad(now.getMinutes())}` : '--:--'
  const secStr = now ? pad(now.getSeconds()) : '00'
  const dateStr = now
    ? lang === 'vi'
      ? `${t.cal_days_long[now.getDay()]}, ${now.getDate()} tháng ${now.getMonth() + 1}`
      : `${t.cal_days_long[now.getDay()]}, ${t.cal_months[now.getMonth()].slice(0, 3)} ${now.getDate()}`
    : ''

  if (clockStyle === 'analog') return <AnalogClock now={now ?? new Date(0)} size={110} accent={accent} />
  if (clockStyle === 'minimal') return <div style={{ fontFamily: "'SF Mono',monospace", fontWeight: 200, fontSize: 'clamp(15px,3.5vw,24px)', letterSpacing: '0.12em', opacity: .8, textShadow: '0 1px 10px rgba(0,0,0,.9)' }}>{timeStr}</div>
  if (clockStyle === 'bold') return <div style={{ fontFamily: 'system-ui,sans-serif', fontWeight: 900, fontSize: 'clamp(46px,12vw,90px)', lineHeight: .9, letterSpacing: '-0.03em', textShadow: '0 4px 28px rgba(0,0,0,.5)' }}>{timeStr}</div>
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 'clamp(34px,10vw,74px)', lineHeight: .9, letterSpacing: -2, textShadow: '0 3px 22px rgba(0,0,0,.45)' }}>{timeStr}</span>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 'clamp(14px,4vw,24px)', color: accent, textShadow: '0 2px 14px rgba(0,0,0,.4)' }}>{secStr}</span>
      </div>
      <div style={{ marginTop: 4, fontSize: 14, fontWeight: 500, letterSpacing: .3, opacity: .92, textShadow: '0 2px 10px rgba(0,0,0,.5)', textTransform: 'capitalize' }}>{dateStr}</div>
    </div>
  )
}
