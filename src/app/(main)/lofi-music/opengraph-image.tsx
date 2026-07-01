import { ImageResponse } from 'next/og'
import { OG_SIZE, OG_CONTENT_TYPE } from '@/lib/ogImage'

export const alt = 'Free Lofi Music for Studying — Lofi Hip Hop, Chillhop, Synthwave | LofiSpace'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0d0d14 0%, #160d1f 60%, #0d0d14 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700, height: 400,
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.22) 0%, transparent 70%)',
          display: 'flex',
        }} />
        <div style={{ fontSize: 80, marginBottom: 20, display: 'flex' }}>🎵</div>
        <span style={{ fontSize: 66, fontWeight: 800, color: '#fff', letterSpacing: '-2px', lineHeight: 1, display: 'flex' }}>
          Lofi Music
        </span>
        <span style={{ fontSize: 26, color: '#a78bfa', fontWeight: 600, marginTop: 14, display: 'flex' }}>
          Free · No Ads · No Sign-up
        </span>
        <div style={{ fontSize: 19, color: 'rgba(255,255,255,0.45)', marginTop: 22, maxWidth: 660, textAlign: 'center', display: 'flex', lineHeight: 1.5 }}>
          Lofi Hip Hop · Chillhop · Synthwave · Ambient — mix with rain sounds for the perfect study environment.
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 30 }}>
          {['🎵 Lofi Hip Hop', '🎷 Chillhop', '🌆 Synthwave', '🌊 Ambient'].map(label => (
            <div key={label} style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 8, padding: '7px 14px', color: '#c4b5fd', fontSize: 15, display: 'flex' }}>
              {label}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: 100, padding: '8px 20px' }}>
          <span style={{ color: '#a78bfa', fontSize: 17, display: 'flex' }}>focusworkspace.app/lofi-music</span>
        </div>
      </div>
    ),
    size,
  )
}
