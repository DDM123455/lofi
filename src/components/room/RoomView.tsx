'use client'

import { useEffect, useRef } from 'react'
import type { RoomTheme } from '@/lib/gameStore'

interface RoomViewProps {
  theme: RoomTheme
  activeDecorations: string[]
  accent?: string
}

// ── Rain canvas ────────────────────────────────────────────────────────
function RainCanvas({ opacity = 0.35 }: { opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drops: { x: number; y: number; speed: number; length: number; opacity: number }[] = []
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    for (let i = 0; i < 120; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 6 + Math.random() * 10,
        length: 12 + Math.random() * 20,
        opacity: 0.15 + Math.random() * 0.35,
      })
    }

    let raf = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drops.forEach(d => {
        ctx.beginPath()
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(d.x - 1, d.y + d.length)
        ctx.strokeStyle = `rgba(180,210,255,${d.opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
        d.y += d.speed
        if (d.y > canvas.height) { d.y = -d.length; d.x = Math.random() * canvas.width }
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity, pointerEvents: 'none', zIndex: 3,
      }}
    />
  )
}

// ── Room themes ────────────────────────────────────────────────────────
function RainyCafe({ decs }: { decs: string[] }) {
  const hasPlant    = decs.includes('desk-plant')
  const hasMechKb   = decs.includes('mech-keyboard')
  const hasMonitor2 = decs.includes('second-monitor')
  const hasCoffee   = decs.includes('coffee-mug')
  const hasBooks    = decs.includes('bookshelf')

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Wall */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #2a1a0e 0%, #3a2414 55%, #4a3020 100%)',
      }} />

      {/* Warm lamp glow on ceiling */}
      <div style={{
        position: 'absolute', top: -60, left: '30%',
        width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(255,180,60,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Window (top-left) */}
      <div style={{
        position: 'absolute', top: '8%', left: '6%',
        width: '26%', maxWidth: 220,
        aspectRatio: '3/4',
        border: '3px solid #5a3820',
        borderRadius: 4,
        background: 'rgba(40,60,90,0.6)',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.4)',
      }}>
        {/* Window panes */}
        <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 3, padding: 3 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ background: 'linear-gradient(145deg, rgba(50,80,120,0.8), rgba(30,50,80,0.9))', borderRadius: 2 }} />
          ))}
        </div>
        {/* Cross divider */}
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 3, background: '#5a3820', transform: 'translateY(-50%)' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 3, background: '#5a3820', transform: 'translateX(-50%)' }} />
        {/* Rain outside */}
        <RainCanvas opacity={0.6} />
        {/* City lights blur */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(255,120,40,0.08), transparent 60%)',
        }} />
      </div>

      {/* Bookshelf (top-right) */}
      {hasBooks && (
        <div style={{
          position: 'absolute', top: '8%', right: '6%',
          width: '22%', maxWidth: 180,
          height: '28%',
          background: '#3a2410',
          borderRadius: '3px 3px 0 0',
          border: '2px solid #4a3420',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', padding: '4px 6px',
          gap: 3,
          boxShadow: 'inset 0 0 12px rgba(0,0,0,0.4)',
        }}>
          {/* Book spines */}
          {['#7c3aed','#dc2626','#059669','#2563eb','#d97706','#be185d'].map((c, i) => (
            <div key={i} style={{
              height: `${14 + (i%3)*6}px`,
              background: c, borderRadius: 2,
              opacity: 0.85,
              boxShadow: 'inset 1px 0 2px rgba(0,0,0,0.4)',
            }} />
          ))}
        </div>
      )}

      {/* Hanging lamp */}
      <div style={{ position: 'absolute', top: 0, left: '35%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 2, height: '12%', background: '#5a3820', minHeight: 30 }} />
        <div style={{
          width: 50, height: 30,
          background: 'linear-gradient(180deg, #7a5020, #5a3810)',
          borderRadius: '4px 4px 50% 50%',
          boxShadow: '0 0 30px rgba(255,180,60,0.3), inset 0 -5px 10px rgba(255,200,80,0.3)',
          border: '1px solid #8a6030',
        }} />
        <div style={{
          marginTop: -4,
          width: 60, height: 20,
          background: 'radial-gradient(ellipse, rgba(255,200,80,0.25) 0%, transparent 70%)',
        }} />
      </div>

      {/* Floor */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '28%',
        background: 'linear-gradient(180deg, #1e1208 0%, #140c06 100%)',
        borderTop: '2px solid #3a2010',
      }} />

      {/* Desk (cafe table) */}
      <div style={{
        position: 'absolute',
        bottom: '22%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '55%',
        maxWidth: 420,
        height: 12,
        background: 'linear-gradient(180deg, #6b4020, #4a2c10)',
        borderRadius: 4,
        boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
      }}>
        {/* Desk legs */}
        <div style={{ position: 'absolute', bottom: -70, left: 18, width: 8, height: 70, background: '#4a2c10', borderRadius: '0 0 4px 4px' }} />
        <div style={{ position: 'absolute', bottom: -70, right: 18, width: 8, height: 70, background: '#4a2c10', borderRadius: '0 0 4px 4px' }} />
      </div>

      {/* Monitor on desk */}
      <div style={{
        position: 'absolute',
        bottom: 'calc(22% + 12px)',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 0,
      }}>
        {/* Screen */}
        <div style={{
          width: hasMonitor2 ? 320 : 200,
          height: hasMonitor2 ? 90 : 60,
          background: '#060810',
          borderRadius: '4px 4px 0 0',
          border: '3px solid #2a2a3a',
          boxShadow: '0 0 20px rgba(100,120,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {/* Screen content */}
          <div style={{ width: '90%', height: '80%', opacity: 0.6 }}>
            <div style={{ height: 3, background: '#4ade80', borderRadius: 2, width: '70%', marginBottom: 4 }} />
            <div style={{ height: 3, background: '#818cf8', borderRadius: 2, width: '50%', marginBottom: 4 }} />
            <div style={{ height: 3, background: '#4ade80', borderRadius: 2, width: '80%', marginBottom: 4 }} />
            <div style={{ height: 3, background: '#818cf8', borderRadius: 2, width: '40%' }} />
          </div>
        </div>
        {/* Monitor stand */}
        <div style={{ width: 20, height: 10, background: '#2a2a3a' }} />
        <div style={{ width: 40, height: 4, background: '#2a2a3a', borderRadius: 2 }} />
      </div>

      {/* Coffee mug */}
      {hasCoffee && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(22% + 16px)',
          right: '28%',
        }}>
          <div style={{ width: 20, height: 22, background: '#7c4a26', borderRadius: '2px 2px 4px 4px', border: '2px solid #a06432', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -4, left: -2, right: -2, height: 6, background: '#a06432', borderRadius: 3 }} />
            {/* Steam */}
            <div style={{ position: 'absolute', top: -14, left: 3, fontSize: 8, opacity: 0.5, animation: 'steam 2s ease-in-out infinite' }}>☁</div>
          </div>
        </div>
      )}

      {/* Desk plant */}
      {hasPlant && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(22% + 14px)',
          left: '26%',
          fontSize: 28,
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
        }}>
          🪴
        </div>
      )}

      {/* Mechanical keyboard */}
      {hasMechKb && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(22% + 16px)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 140, height: 14,
          background: 'linear-gradient(180deg, #1e2035, #16182a)',
          borderRadius: 4,
          border: '1px solid #2a2c40',
          boxShadow: '0 0 8px rgba(100,80,255,0.2)',
          display: 'grid',
          gridTemplateColumns: 'repeat(14, 1fr)',
          gap: 1.5,
          padding: '2px 3px',
        }}>
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} style={{ background: '#2a2c40', borderRadius: 1, height: '100%' }} />
          ))}
        </div>
      )}

      {/* Rain on whole room */}
      <RainCanvas opacity={0.12} />

      {/* Ambient fog overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

function ProgrammerSetup({ decs }: { decs: string[] }) {
  const hasPlant    = decs.includes('desk-plant')
  const hasMechKb   = decs.includes('mech-keyboard')
  const hasMonitor2 = decs.includes('second-monitor')
  const hasGaming   = decs.includes('gaming-setup')
  const hasCoffee   = decs.includes('coffee-mug')
  const hasBooks    = decs.includes('bookshelf')

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Wall */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #060814 0%, #090b1a 50%, #0c0e20 100%)',
      }} />

      {/* RGB ambient glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%',
        transform: 'translateX(-50%)',
        width: 600, height: 200,
        background: 'radial-gradient(ellipse, rgba(120,80,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* RGB strip behind desk */}
      <div style={{
        position: 'absolute', bottom: '28%', left: '15%', right: '15%',
        height: 4,
        background: `linear-gradient(90deg, #ff0080, #7928ca, #0080ff, #00d4ff, #00ff80)`,
        boxShadow: '0 0 20px rgba(120,80,255,0.6)',
        opacity: 0.7,
      }} />

      {/* Bookshelf right */}
      {hasBooks && (
        <div style={{
          position: 'absolute', top: '6%', right: '5%',
          width: '18%', maxWidth: 160, height: '30%',
          background: '#12121e', border: '1px solid #1e2035',
          borderRadius: 4, padding: '6px 8px',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 3,
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.6)',
        }}>
          {['#7c3aed','#1d4ed8','#0f766e','#b45309','#9d174d','#1e40af'].map((c, i) => (
            <div key={i} style={{ height: `${12 + (i%3)*5}px`, background: c, borderRadius: 2, opacity: 0.8 }} />
          ))}
        </div>
      )}

      {/* Action figures / gaming accessories */}
      {hasGaming && (
        <div style={{
          position: 'absolute', top: '10%', left: '6%',
          fontSize: 26, display: 'flex', flexDirection: 'column', gap: 8,
          filter: 'drop-shadow(0 0 8px rgba(120,80,255,0.4))',
        }}>
          <span>🎮</span>
          <span style={{ fontSize: 18 }}>🏆</span>
        </div>
      )}

      {/* Floor */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '26%',
        background: 'linear-gradient(180deg, #080810 0%, #050508 100%)',
        borderTop: '1px solid #1a1a2e',
      }} />

      {/* Desk */}
      <div style={{
        position: 'absolute', bottom: '22%', left: '50%',
        transform: 'translateX(-50%)',
        width: hasMonitor2 ? '70%' : '58%', maxWidth: 500,
        height: 10,
        background: 'linear-gradient(180deg, #1a1c2e, #0e0f1a)',
        borderRadius: 3,
        boxShadow: '0 4px 30px rgba(0,0,0,0.8), 0 0 0 1px rgba(100,80,255,0.15)',
      }}>
        <div style={{ position: 'absolute', bottom: -60, left: 20, width: 6, height: 60, background: '#1a1c2e' }} />
        <div style={{ position: 'absolute', bottom: -60, right: 20, width: 6, height: 60, background: '#1a1c2e' }} />
      </div>

      {/* Monitors */}
      <div style={{
        position: 'absolute', bottom: 'calc(22% + 10px)', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: hasMonitor2 ? 6 : 0, alignItems: 'flex-end',
      }}>
        {/* Main monitor */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: 220, height: 80,
            background: '#04050f',
            border: '3px solid #1a1c2e',
            borderRadius: '4px 4px 0 0',
            boxShadow: '0 0 25px rgba(100,80,255,0.2), inset 0 0 30px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: '88%', height: '80%' }}>
              <div style={{ fontSize: 7, color: '#4ade80', fontFamily: 'monospace', lineHeight: 1.6, opacity: 0.8 }}>
                <div>{'> npm run dev'}</div>
                <div style={{ color: '#818cf8' }}>{'  ▶ Ready in 420ms'}</div>
                <div style={{ color: '#4ade80' }}>{'  ✓ Compiled'}</div>
                <div style={{ color: '#6b7280' }}>{'  localhost:3000'}</div>
              </div>
            </div>
          </div>
          <div style={{ width: 16, height: 8, background: '#1a1c2e' }} />
          <div style={{ width: 36, height: 3, background: '#1a1c2e', borderRadius: 2 }} />
        </div>

        {/* Second monitor */}
        {hasMonitor2 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: 180, height: 68,
              background: '#04050f',
              border: '3px solid #1a1c2e',
              borderRadius: '4px 4px 0 0',
              boxShadow: '0 0 20px rgba(100,80,255,0.15)',
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: '88%', height: '80%', opacity: 0.7 }}>
                <div style={{ height: 4, background: '#818cf8', borderRadius: 2, width: '60%', marginBottom: 4 }} />
                <div style={{ height: 4, background: '#1d4ed8', borderRadius: 2, width: '80%', marginBottom: 4 }} />
                <div style={{ height: 4, background: '#7c3aed', borderRadius: 2, width: '45%' }} />
              </div>
            </div>
            <div style={{ width: 14, height: 7, background: '#1a1c2e' }} />
            <div style={{ width: 30, height: 3, background: '#1a1c2e', borderRadius: 2 }} />
          </div>
        )}
      </div>

      {/* Keyboard with RGB */}
      <div style={{
        position: 'absolute', bottom: 'calc(22% + 14px)', left: '50%',
        transform: 'translateX(-50%)',
        width: hasMechKb ? 160 : 120, height: 16,
        background: 'linear-gradient(180deg, #1a1c2e, #0e0f1a)',
        borderRadius: 4, border: '1px solid #2a2c40',
        boxShadow: hasMechKb ? '0 0 14px rgba(120,80,255,0.5), 0 0 30px rgba(0,100,255,0.2)' : 'none',
        display: 'grid', gridTemplateColumns: 'repeat(16, 1fr)', gap: 1.5, padding: '2px 4px',
      }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} style={{
            background: hasMechKb
              ? `hsl(${i * 22}, 80%, 55%)`
              : '#2a2c40',
            borderRadius: 1, opacity: 0.8,
          }} />
        ))}
      </div>

      {/* Coffee mug */}
      {hasCoffee && (
        <div style={{
          position: 'absolute', bottom: 'calc(22% + 14px)', right: '22%', fontSize: 20,
          filter: 'drop-shadow(0 0 6px rgba(255,180,60,0.3))',
        }}>
          ☕
        </div>
      )}

      {/* Desk plant */}
      {hasPlant && (
        <div style={{
          position: 'absolute', bottom: 'calc(22% + 12px)', left: '20%', fontSize: 24,
          filter: 'drop-shadow(0 0 8px rgba(74,222,128,0.3))',
        }}>
          🪴
        </div>
      )}
    </div>
  )
}

// ── Main export ────────────────────────────────────────────────────────
export function RoomView({ theme, activeDecorations, accent = '#a78bfa' }: RoomViewProps) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {theme === 'rainy-cafe'      && <RainyCafe      decs={activeDecorations} />}
      {theme === 'programmer-setup' && <ProgrammerSetup decs={activeDecorations} />}

      {/* Bottom gradient fade into dock */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 80,
        background: 'linear-gradient(to top, rgba(8,9,20,0.9), transparent)',
        pointerEvents: 'none', zIndex: 10,
      }} />
    </div>
  )
}
