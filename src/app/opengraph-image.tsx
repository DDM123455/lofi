import { ImageResponse } from 'next/og'
import { OG_SIZE, OG_CONTENT_TYPE } from '@/lib/ogImage'

export const alt = 'LofiSpace — Free Online Study Room, Focus Workspace & Pomodoro Timer'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0d0d14 0%, #1a1030 60%, #0d0d14 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 400,
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.25) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Top badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 28,
          background: 'rgba(124,58,237,0.15)',
          border: '1px solid rgba(124,58,237,0.3)',
          borderRadius: 100,
          padding: '8px 20px',
        }}>
          <span style={{ fontSize: 20 }}>🎵</span>
          <span style={{ color: '#a78bfa', fontSize: 18, fontWeight: 600 }}>focusworkspace.app</span>
        </div>

        {/* Main title */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}>
          <span style={{
            fontSize: 76,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-2px',
            lineHeight: 1,
          }}>
            LofiSpace
          </span>
          <span style={{
            fontSize: 28,
            color: '#a78bfa',
            fontWeight: 600,
            marginTop: 12,
            letterSpacing: '0.5px',
          }}>
            Free Online Study Room
          </span>
        </div>

        {/* Description */}
        <div style={{
          marginTop: 28,
          fontSize: 20,
          color: 'rgba(255,255,255,0.5)',
          textAlign: 'center',
          maxWidth: 700,
          lineHeight: 1.5,
          display: 'flex',
        }}>
          Lofi music · Ambient sounds · Pomodoro timer · XP streaks · No sign-up
        </div>

        {/* Feature pills */}
        <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
          {['📚 Study Rooms', '🌧️ Rain Sounds', '🍅 Pomodoro', '🎵 Lofi Music'].map(label => (
            <div key={label} style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              padding: '8px 16px',
              color: 'rgba(255,255,255,0.65)',
              fontSize: 16,
              display: 'flex',
            }}>
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
