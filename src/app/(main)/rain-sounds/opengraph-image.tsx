import { ImageResponse } from 'next/og'
import { OG_SIZE, OG_CONTENT_TYPE } from '@/lib/ogImage'

export const alt = 'Free Rain Sounds for Studying & Focus | LofiSpace'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0d0d14 0%, #0d1220 60%, #0d0d14 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700, height: 400,
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.2) 0%, transparent 70%)',
          display: 'flex',
        }} />
        <div style={{ fontSize: 80, marginBottom: 20, display: 'flex' }}>🌧️</div>
        <span style={{ fontSize: 64, fontWeight: 800, color: '#fff', letterSpacing: '-2px', lineHeight: 1, display: 'flex' }}>
          Rain Sounds
        </span>
        <span style={{ fontSize: 26, color: '#60a5fa', fontWeight: 600, marginTop: 14, display: 'flex' }}>
          For Studying, Focus & Relaxation
        </span>
        <div style={{ fontSize: 19, color: 'rgba(255,255,255,0.45)', marginTop: 22, maxWidth: 660, textAlign: 'center', display: 'flex', lineHeight: 1.5 }}>
          Free rain sound mixer — layer with lofi music, café noise, and thunderstorm. No sign-up.
        </div>
        <div style={{ marginTop: 30, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: 100, padding: '8px 20px' }}>
          <span style={{ color: '#93c5fd', fontSize: 17, display: 'flex' }}>focusworkspace.app/rain-sounds</span>
        </div>
      </div>
    ),
    size,
  )
}
