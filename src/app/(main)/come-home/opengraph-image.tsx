import { ImageResponse } from 'next/og'
import { OG_SIZE, OG_CONTENT_TYPE } from '@/lib/ogImage'

export const alt = 'Come Home — A quiet place between work and sleep | LofiSpace'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(160deg, #221620 0%, #140e18 60%, #0d0a12 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '42%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 760, height: 420,
          background: 'radial-gradient(ellipse, rgba(240,184,138,0.18) 0%, transparent 70%)',
          display: 'flex',
        }} />
        <div style={{ fontSize: 84, marginBottom: 18, display: 'flex' }}>🌙</div>
        <span style={{ fontSize: 66, fontWeight: 700, color: '#f6ebe0', letterSpacing: '-1.5px', lineHeight: 1, display: 'flex' }}>
          Come Home
        </span>
        <span style={{ fontSize: 28, color: '#f0b88a', fontWeight: 500, marginTop: 16, display: 'flex' }}>
          A quiet place between work and sleep
        </span>
        <div style={{ fontSize: 20, color: 'rgba(255,240,230,0.45)', marginTop: 22, maxWidth: 680, textAlign: 'center', display: 'flex', lineHeight: 1.5 }}>
          You did enough today. You don’t have to solve everything tonight.
        </div>
        <div style={{ marginTop: 30, display: 'flex', alignItems: 'center', background: 'rgba(240,184,138,0.12)', border: '1px solid rgba(240,184,138,0.3)', borderRadius: 100, padding: '8px 20px' }}>
          <span style={{ color: '#f6d7bb', fontSize: 17, display: 'flex' }}>focusworkspace.app/come-home</span>
        </div>
      </div>
    ),
    size,
  )
}
