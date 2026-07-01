import { ImageResponse } from 'next/og'
import { OG_SIZE, OG_CONTENT_TYPE } from '@/lib/ogImage'

export const alt = 'Free White Noise Online — Focus, Study & Sleep | LofiSpace'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0d0d14 0%, #111318 60%, #0d0d14 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(148,163,184,0.15) 0%, transparent 70%)', display: 'flex' }} />
        <div style={{ fontSize: 80, marginBottom: 20, display: 'flex' }}>⬜</div>
        <span style={{ fontSize: 66, fontWeight: 800, color: '#fff', letterSpacing: '-2px', lineHeight: 1, display: 'flex' }}>White Noise</span>
        <span style={{ fontSize: 26, color: '#94a3b8', fontWeight: 600, marginTop: 14, display: 'flex' }}>White · Pink · Brown — Free Online</span>
        <div style={{ fontSize: 19, color: 'rgba(255,255,255,0.45)', marginTop: 22, maxWidth: 660, textAlign: 'center', display: 'flex', lineHeight: 1.5 }}>
          Free white noise for focus, studying and sleep. Mix with lofi music in an interactive ambient sound mixer.
        </div>
        <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(148,163,184,0.1)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: 100, padding: '8px 20px' }}>
          <span style={{ color: '#94a3b8', fontSize: 17, display: 'flex' }}>focusworkspace.app/white-noise</span>
        </div>
      </div>
    ),
    size,
  )
}
