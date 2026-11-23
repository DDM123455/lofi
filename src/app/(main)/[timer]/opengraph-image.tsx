import { ImageResponse } from 'next/og'
import { OG_SIZE, OG_CONTENT_TYPE } from '@/lib/ogImage'
import { TIMERS, timerSlug } from '@/lib/timers'

export const alt = 'Free online countdown timer with alarm | LofiSpace'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return TIMERS.map(t => ({ timer: timerSlug(t.minutes) }))
}

export default async function Image({ params }: { params: Promise<{ timer: string }> }) {
  const m = parseInt((await params).timer, 10) || 0
  const clock = m >= 60 ? `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}:00` : `${String(m).padStart(2, '0')}:00`
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0d0d14 0%, #1a1233 60%, #0d0d14 100%)', position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 115, left: 250, width: 700, height: 400, display: 'flex', background: 'radial-gradient(ellipse, rgba(124,58,237,0.25) 0%, transparent 70%)' }} />
        <span style={{ fontSize: 170, fontWeight: 800, color: '#fff', letterSpacing: '-4px', lineHeight: 1, display: 'flex' }}>{clock}</span>
        <span style={{ fontSize: 60, fontWeight: 800, color: '#fff', marginTop: 26, display: 'flex' }}>{m} Minute Timer</span>
        <span style={{ fontSize: 26, color: '#c4b5fd', fontWeight: 600, marginTop: 14, display: 'flex' }}>
          Free · Alarm · Fullscreen · Works in background tabs
        </span>
        <div style={{ marginTop: 30, display: 'flex', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.35)', borderRadius: 100, padding: '8px 22px' }}>
          <span style={{ color: '#c4b5fd', fontSize: 18, display: 'flex' }}>focusworkspace.app/{m}-minute-timer</span>
        </div>
      </div>
    ),
    size,
  )
}
