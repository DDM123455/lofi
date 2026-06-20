'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

// ── Palette ───────────────────────────────────────────────────────────────
const P: Record<number, string> = {
  0: 'transparent',
  1: '#1a1108',  // dark outline
  2: '#d4956b',  // orange fur
  3: '#f5d3a0',  // light belly
  4: '#ff9eb5',  // pink (ear inner, nose)
  5: '#8b5e3c',  // dark stripe
  6: '#f0c040',  // eye gold
}
type Px = 0|1|2|3|4|5|6
type Frame = Px[][]
export type CatState = 'sleep'|'idle'|'happy'|'yawn'|'work'|'roll'
export type PomState = 'work'|'break'|null

// ── 12×12 Pixel frames ───────────────────────────────────────────────────
// Row 0-2:  ears (pointy triangles with pink inner ear)
// Row 3-5:  head & eyes (gold pupils)
// Row 6-7:  nose (pink) + cheeks
// Row 8-9:  belly
// Row 10-11: paws

const IDLE: Frame = [
  [0,0,1,0,0,0,0,0,0,1,0,0],
  [0,1,2,1,0,0,0,0,1,2,1,0],
  [1,2,4,2,1,1,1,1,2,4,2,1],
  [0,1,2,2,2,2,2,2,2,2,1,0],
  [0,1,2,2,6,2,2,6,2,2,1,0],  // open eyes (gold)
  [0,1,2,2,1,2,2,1,2,2,1,0],  // pupils (dark)
  [0,0,1,3,2,4,4,2,3,1,0,0],  // nose
  [0,0,1,3,3,3,3,3,3,1,0,0],
  [0,0,1,2,3,3,3,3,2,1,0,0],
  [0,0,1,2,2,3,3,2,2,1,0,0],
  [0,1,2,2,1,2,2,1,2,2,1,0],  // paws
  [0,0,1,1,0,1,1,0,1,1,0,0],
]

const SLEEP: Frame = [
  [0,0,1,0,0,0,0,0,0,1,0,0],
  [0,1,2,1,0,0,0,0,1,2,1,0],
  [1,2,4,2,1,1,1,1,2,4,2,1],
  [0,1,2,2,2,2,2,2,2,2,1,0],
  [0,1,2,2,5,5,5,5,2,2,1,0],  // closed eyes (dark lines)
  [0,1,2,2,2,2,2,2,2,2,1,0],
  [0,0,1,3,2,4,4,2,3,1,0,0],
  [0,0,1,3,3,3,3,3,3,1,0,0],
  [0,0,1,2,3,3,3,3,2,1,0,0],
  [0,0,1,2,2,3,3,2,2,1,0,0],
  [0,1,2,2,1,2,2,1,2,2,1,0],
  [0,0,1,1,0,1,1,0,1,1,0,0],
]

const HAPPY: Frame = [
  [0,0,1,0,0,0,0,0,0,1,0,0],
  [0,1,2,1,0,0,0,0,1,2,1,0],
  [1,2,4,2,1,1,1,1,2,4,2,1],
  [0,1,2,2,2,2,2,2,2,2,1,0],
  [0,1,2,2,6,6,6,6,2,2,1,0],  // big shiny eyes
  [0,1,2,2,6,1,1,6,2,2,1,0],  // highlight + pupils
  [0,0,1,3,2,4,4,2,3,1,0,0],
  [0,0,1,3,1,3,3,1,3,1,0,0],  // happy ω mouth
  [0,0,1,2,3,3,3,3,2,1,0,0],
  [0,0,1,2,2,3,3,2,2,1,0,0],
  [0,1,2,2,1,2,2,1,2,2,1,0],
  [0,0,1,1,0,1,1,0,1,1,0,0],
]

const YAWN: Frame = [
  [0,0,1,0,0,0,0,0,0,1,0,0],
  [0,1,2,1,0,0,0,0,1,2,1,0],
  [1,2,4,2,1,1,1,1,2,4,2,1],
  [0,1,2,2,2,2,2,2,2,2,1,0],
  [0,1,2,2,6,6,6,6,2,2,1,0],  // wide-open eyes
  [0,1,2,2,1,2,2,1,2,2,1,0],
  [0,0,1,3,1,1,1,1,3,1,0,0],  // mouth open (top)
  [0,0,1,3,1,4,4,1,3,1,0,0],  // pink inside mouth
  [0,0,0,1,3,3,3,3,1,0,0,0],  // chin stretched down
  [0,0,1,2,3,3,3,3,2,1,0,0],
  [0,1,2,2,1,2,2,1,2,2,1,0],
  [0,0,1,1,0,1,1,0,1,1,0,0],
]

const WORK: Frame = [
  [0,0,1,0,0,0,0,0,0,1,0,0],
  [0,1,2,1,0,0,0,0,1,2,1,0],
  [1,2,4,2,1,1,1,1,2,4,2,1],
  [0,1,2,2,2,2,2,2,2,2,1,0],
  [0,1,2,2,5,2,2,5,2,2,1,0],  // furrowed brow (dark stripe)
  [0,1,2,2,1,1,1,1,2,2,1,0],  // squinting eyes
  [0,0,1,3,2,4,4,2,3,1,0,0],
  [0,0,1,3,3,3,3,3,3,1,0,0],
  [0,0,1,2,3,3,3,3,2,1,0,0],
  [0,1,2,2,2,3,3,2,2,1,0,0],
  [0,1,2,2,1,2,2,2,2,1,1,0],  // right paw raised
  [0,0,1,1,0,1,1,0,0,0,1,0],
]

// Compact ball for rolling — symmetric circle shape
const ROLL: Frame = [
  [0,0,0,1,1,1,1,1,1,0,0,0],
  [0,0,1,2,2,5,5,2,2,1,0,0],
  [0,1,2,5,2,2,2,2,5,2,1,0],
  [1,2,2,2,3,3,3,3,2,2,2,1],
  [1,2,5,2,3,3,3,3,2,5,2,1],
  [1,2,2,2,3,3,3,3,2,2,2,1],
  [1,2,5,2,3,3,3,3,2,5,2,1],
  [1,2,2,2,3,3,3,3,2,2,2,1],
  [0,1,2,5,2,2,2,2,5,2,1,0],
  [0,0,1,2,2,5,5,2,2,1,0,0],
  [0,0,0,1,1,1,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
]

export const FRAMES: Record<CatState, Frame> = {
  idle: IDLE, sleep: SLEEP, happy: HAPPY, yawn: YAWN, work: WORK, roll: ROLL,
}

// ── Sprite renderer (exported for preview use) ────────────────────────────
export function CatSprite({ frame, size = 8 }: { frame: Frame; size?: number }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${frame[0].length}, ${size}px)`,
      imageRendering: 'pixelated',
      gap: 0,
    }}>
      {frame.flatMap((row, y) =>
        row.map((px, x) => (
          <div key={`${y}-${x}`} style={{ width: size, height: size, background: P[px] }}/>
        ))
      )}
    </div>
  )
}

// ── Bubble text ───────────────────────────────────────────────────────────
const BUBBLES: Record<CatState, string[]> = {
  idle:   ['(=^･ω･^=)', 'meow~', '*blinks*', '...'],
  sleep:  ['zzz...', 'purrr~', '💤', 'zZz'],
  happy:  ['nyaa~ ♡', '(≧◡≦)', '*purrs*', '♡♡', 'purrr~'],
  yawn:   ['nyaaah~', '(ᵕ•ᴗ•ᵕ)', '*stretch*', 'uwaah~'],
  work:   ['*tap tap*', '⌨️ focus!', 'concentrated~'],
  roll:   ['wheee~', '(*≧ω≦)', '*rolls*', 'yippee!'],
}
const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

// ── Full autonomous PixelPet ──────────────────────────────────────────────
export function PixelPet({ pomState, accent = '#a78bfa' }: { pomState?: PomState; accent?: string }) {
  const [state, setState]   = useState<CatState>('idle')
  const [bubble, setBubble] = useState<string|null>(null)
  const [pos,    setPos]    = useState({ x: 20, y: 300 })
  const [flip,   setFlip]   = useState(false)

  const sRef  = useRef<CatState>('idle')
  const posR  = useRef({ x: 20, y: 300 })
  const tgtR  = useRef({ x: 20, y: 300 })
  const mseR  = useRef({ x: -9999, y: -9999 })
  const rafR  = useRef<number|null>(null)
  const btR   = useRef<ReturnType<typeof setTimeout>|null>(null)
  const actR  = useRef<ReturnType<typeof setTimeout>|null>(null)

  const popBubble = useCallback((msg: string, ms = 2200) => {
    setBubble(msg)
    if (btR.current) clearTimeout(btR.current)
    btR.current = setTimeout(() => setBubble(null), ms)
  }, [])

  const setS = useCallback((s: CatState) => { sRef.current = s; setState(s) }, [])

  // Pomodoro sync
  useEffect(() => {
    if (pomState === 'work')  { setS('work');  popBubble('*tap tap*', 3000) }
    else if (pomState === 'break') { setS('sleep'); popBubble('purrr~', 3000) }
    else if (!pomState)            { setS('idle') }
  }, [pomState, setS, popBubble])

  // Track mouse globally
  useEffect(() => {
    const h = (e: MouseEvent) => { mseR.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])

  // Init position after mount (client-only)
  useEffect(() => {
    const x = 20
    const y = Math.max(80, (window.innerHeight || 600) - 180)
    posR.current = { x, y }
    tgtR.current = { x: 120, y }
    setPos({ x, y })
  }, [])

  // Autonomous wander loop (disabled during pomodoro)
  useEffect(() => {
    if (pomState) {
      if (rafR.current) cancelAnimationFrame(rafR.current)
      return
    }

    const VW = () => window.innerWidth  || 800
    const VH = () => window.innerHeight || 600
    const newTgt = () => ({
      x: 30 + Math.random() * Math.max(0, VW() - 140),
      y: 60 + Math.random() * Math.max(0, VH() - 200),
    })

    let lastT  = Date.now()
    let nextD  = 3000 + Math.random() * 3000

    const tick = () => {
      const now = Date.now()
      const cat = posR.current
      const m   = mseR.current

      // Mouse proximity → happy
      const mdx = m.x - (cat.x + 48)
      const mdy = m.y - (cat.y + 48)
      const md  = Math.sqrt(mdx * mdx + mdy * mdy)

      if (md < 80 && sRef.current !== 'happy' && sRef.current !== 'yawn') {
        setS('happy')
        popBubble(pick(BUBBLES.happy))
        tgtR.current = { x: cat.x, y: cat.y } // pause
        lastT = now; nextD = 2500
      }
      if (md >= 80 && sRef.current === 'happy') {
        setS('idle')
        tgtR.current = newTgt()
        lastT = now; nextD = 2000
      }

      // Pick next autonomous action
      if (now - lastT > nextD && sRef.current !== 'happy' && sRef.current !== 'yawn') {
        const r = Math.random()
        if (r < 0.18) {
          setS('sleep'); tgtR.current = { x: cat.x, y: cat.y }
          nextD = 7000 + Math.random() * 5000
        } else if (r < 0.50) {
          setS('idle'); tgtR.current = newTgt()
          nextD = 5000 + Math.random() * 3000
        } else if (r < 0.78) {
          setS('roll'); tgtR.current = newTgt()
          nextD = 4000 + Math.random() * 2000
        } else {
          setS('idle')
          popBubble(pick(BUBBLES.idle), 1800)
          tgtR.current = newTgt()
          nextD = 4000 + Math.random() * 2000
        }
        lastT = now
      }

      // Move toward target
      const spd = sRef.current === 'roll' ? 2.2 : sRef.current === 'idle' ? 0.7 : 0
      if (spd > 0) {
        const tdx = tgtR.current.x - cat.x
        const tdy = tgtR.current.y - cat.y
        const td  = Math.sqrt(tdx * tdx + tdy * tdy)
        if (td > 3) {
          const nx = cat.x + (tdx / td) * spd
          const ny = cat.y + (tdy / td) * spd
          posR.current = { x: nx, y: ny }
          setPos({ x: nx, y: ny })
          if (Math.abs(tdx) > 2) setFlip(tdx < 0)
        }
      }

      rafR.current = requestAnimationFrame(tick)
    }

    rafR.current = requestAnimationFrame(tick)
    return () => { if (rafR.current) cancelAnimationFrame(rafR.current) }
  }, [pomState, setS, popBubble])

  // Click to yawn/meow
  const handleClick = useCallback(() => {
    if (sRef.current === 'roll') return
    setS('yawn')
    popBubble(pick(BUBBLES.yawn), 2500)
    if (actR.current) clearTimeout(actR.current)
    actR.current = setTimeout(() => setS(pomState === 'work' ? 'work' : 'idle'), 2500)
  }, [pomState, setS, popBubble])

  // Cleanup
  useEffect(() => () => {
    if (rafR.current) cancelAnimationFrame(rafR.current)
    if (btR.current)  clearTimeout(btR.current)
    if (actR.current) clearTimeout(actR.current)
  }, [])

  const isRoll = state === 'roll'

  return (
    <div style={{ position: 'absolute', left: pos.x, top: pos.y, zIndex: 20, pointerEvents: 'none', width: 96 }}>
      {/* Speech bubble */}
      {bubble && (
        <div style={{
          position: 'absolute', bottom: '100%', left: '50%',
          transform: 'translateX(-50%)', marginBottom: 6,
          background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(8px)',
          border: `1px solid ${accent}70`, borderRadius: 8,
          padding: '3px 9px', whiteSpace: 'nowrap', fontSize: 11, color: '#fff',
          pointerEvents: 'none', animation: 'petBubble .2s ease-out',
        }}>
          {bubble}
          <div style={{
            position: 'absolute', top: '100%', left: '50%',
            transform: 'translateX(-50%)', width: 0, height: 0,
            borderLeft: '4px solid transparent', borderRight: '4px solid transparent',
            borderTop: `4px solid ${accent}70`,
          }}/>
        </div>
      )}

      {/* Cat sprite — outer div handles flip, inner handles roll spin */}
      <div style={{ display: 'inline-block', transform: isRoll ? undefined : `scaleX(${flip ? -1 : 1})`, transformOrigin: 'center' }}>
        <div
          onClick={handleClick}
          style={{
            cursor: 'pointer', pointerEvents: 'all', display: 'inline-block',
            animation: isRoll ? 'catRoll .65s linear infinite' : undefined,
          }}
        >
          <CatSprite frame={FRAMES[state]} size={8}/>
        </div>
      </div>

      <style>{`
        @keyframes catRoll {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes petBubble {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  )
}
