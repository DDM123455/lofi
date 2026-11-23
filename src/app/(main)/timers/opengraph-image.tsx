import { ImageResponse } from 'next/og'
import { OG_SIZE, OG_CONTENT_TYPE } from '@/lib/ogImage'

export const alt = 'Free online timers with alarm, 1 minute to 2 hours | LofiSpace'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

const CHIPS = ['5', '10', '15', '25', '30', '45', '60', '90']

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0d0d14 0%, #1a1233 60%, #0d0d14 100%)',
      }}>
        <span style={{ fontSize: 90, display: 'flex' }}>⏱️</span>
        <span style={{ fontSize: 72, fontWeight: 800, color: '#fff', marginTop: 16, display: 'flex' }}>Online Timers</span>
        <span style={{ fontSize: 28, color: '#c4b5fd', fontWeight: 600, marginTop: 14, display: 'flex' }}>Free countdown timers with alarm · 1 minute to 2 hours</span>
        <div style={{ display: 'flex', gap: 14, marginTop: 36 }}>
          {CHIPS.map(c => (
            <div key={c} style={{ display: 'flex', padding: '10px 20px', borderRadius: 100, background: 'rgba(124,58,237,0.18)', border: '1px solid rgba(124,58,237,0.4)', color: '#fff', fontSize: 24, fontWeight: 700 }}>{c} min</div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
