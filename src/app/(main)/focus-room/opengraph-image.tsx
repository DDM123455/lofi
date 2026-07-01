import { ImageResponse } from 'next/og'
import { OG_SIZE, OG_CONTENT_TYPE } from '@/lib/ogImage'

export const alt = 'Focus Room — Deep Work Workspace with Pomodoro Timer | LofiSpace'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0d0d14 0%, #0d0f1a 60%, #0d0d14 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(99,102,241,0.2) 0%, transparent 70%)', display: 'flex' }} />
        <div style={{ fontSize: 80, marginBottom: 20, display: 'flex' }}>🎯</div>
        <span style={{ fontSize: 66, fontWeight: 800, color: '#fff', letterSpacing: '-2px', lineHeight: 1, display: 'flex' }}>Focus Room</span>
        <span style={{ fontSize: 26, color: '#818cf8', fontWeight: 600, marginTop: 14, display: 'flex' }}>Deep Work · Pomodoro · Flow State · Free</span>
        <div style={{ fontSize: 19, color: 'rgba(255,255,255,0.45)', marginTop: 22, maxWidth: 660, textAlign: 'center', display: 'flex', lineHeight: 1.5 }}>
          Distraction-free focus workspace with ambient soundscapes, Pomodoro timer and XP tracking.
        </div>
        <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 100, padding: '8px 20px' }}>
          <span style={{ color: '#a5b4fc', fontSize: 17, display: 'flex' }}>focusworkspace.app/focus-room</span>
        </div>
      </div>
    ),
    size,
  )
}
