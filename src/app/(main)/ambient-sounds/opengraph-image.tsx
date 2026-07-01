import { ImageResponse } from 'next/og'
import { OG_SIZE, OG_CONTENT_TYPE } from '@/lib/ogImage'

export const alt = 'Free Ambient Sounds Mixer — Study, Focus & Relax | LofiSpace'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0d0d14 0%, #0d1a1a 60%, #0d0d14 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(13,148,136,0.2) 0%, transparent 70%)', display: 'flex' }} />
        <div style={{ fontSize: 80, marginBottom: 20, display: 'flex' }}>🎚️</div>
        <span style={{ fontSize: 62, fontWeight: 800, color: '#fff', letterSpacing: '-2px', lineHeight: 1, display: 'flex' }}>Ambient Sounds</span>
        <span style={{ fontSize: 26, color: '#2dd4bf', fontWeight: 600, marginTop: 14, display: 'flex' }}>Free Mixer · 8+ Sounds · No Sign-up</span>
        <div style={{ fontSize: 19, color: 'rgba(255,255,255,0.45)', marginTop: 22, maxWidth: 660, textAlign: 'center', display: 'flex', lineHeight: 1.5 }}>
          Layer rain, café, fire, ocean, forest and more with independent volume control and lofi music.
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
          {['🌧️ Rain', '☕ Café', '🔥 Fire', '🌊 Ocean', '🌿 Forest'].map(label => (
            <div key={label} style={{ background: 'rgba(13,148,136,0.15)', border: '1px solid rgba(13,148,136,0.3)', borderRadius: 8, padding: '7px 14px', color: '#5eead4', fontSize: 15, display: 'flex' }}>{label}</div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
