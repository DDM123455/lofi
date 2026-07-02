import { ImageResponse } from 'next/og'
import { OG_SIZE, OG_CONTENT_TYPE } from '@/lib/ogImage'

export const alt = 'Scene Gallery — 15+ Lofi Study Scenes | LofiSpace'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0d0d14 0%, #1a0d24 60%, #0d0d14 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(124,58,237,0.22) 0%, transparent 70%)', display: 'flex' }} />
        <div style={{ fontSize: 80, marginBottom: 20, display: 'flex' }}>🎬</div>
        <span style={{ fontSize: 62, fontWeight: 800, color: '#fff', letterSpacing: '-2px', lineHeight: 1, display: 'flex' }}>
          Scene Gallery
        </span>
        <span style={{ fontSize: 26, color: '#a78bfa', fontWeight: 600, marginTop: 14, display: 'flex' }}>
          15+ Lofi Study Scenes & Ambient Backgrounds
        </span>
        <div style={{ fontSize: 19, color: 'rgba(255,255,255,0.45)', marginTop: 24, maxWidth: 660, textAlign: 'center', display: 'flex', lineHeight: 1.5 }}>
          Browse 15+ lofi ambient scenes and open your study workspace instantly. Free.
        </div>
        <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 100, padding: '8px 20px' }}>
          <span style={{ color: '#a78bfa', fontSize: 17, display: 'flex' }}>focusworkspace.app/scenes</span>
        </div>
      </div>
    ),
    size,
  )
}
