'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import type { CSSProperties } from 'react'

export type CatState = 'idle' | 'sleep' | 'happy' | 'yawn' | 'work' | 'roll'
export type PomState = 'work' | 'break' | null

const BUBBLES: Record<CatState, string[]> = {
  idle:  ['(=^･ω･^=)', 'meow~', '*blinks*', '...'],
  sleep: ['zzz...', 'purrr~', '💤', 'zZz'],
  happy: ['nyaa~ ♡', '(≧◡≦)', '*purrs*', '♡♡'],
  yawn:  ['nyaaah~', '(ᵕ•ᴗ•ᵕ)', '*stretch*'],
  work:  ['*tap tap*', '⌨️ focus!'],
  roll:  ['wheee~', '(*≧ω≦)', '*rolls*'],
}
const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

// ─── Keyframes ────────────────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes kwFloat {
    0%,100% { transform: translateY(0px);  }
    50%      { transform: translateY(-5px); }
  }
  @keyframes kwShadowFloat {
    0%,100% { transform: scaleX(1);    opacity: .20; }
    50%      { transform: scaleX(0.55); opacity: .06; }
  }
  @keyframes kwTailSlow {
    0%   { transform: rotate(0deg);  }
    30%  { transform: rotate(12deg); }
    70%  { transform: rotate(-8deg); }
    100% { transform: rotate(0deg);  }
  }
  @keyframes kwTailFast {
    0%   { transform: rotate(0deg);  }
    25%  { transform: rotate(16deg); }
    75%  { transform: rotate(-11deg);}
    100% { transform: rotate(0deg);  }
  }
  @keyframes kwBlink {
    0%,77%,93%,100% { transform: scaleY(1);    }
    81%,89%          { transform: scaleY(0.06); }
  }
  @keyframes kwEarTwitch {
    0%,74%,90%,100% { transform: rotate(0deg);   }
    77%              { transform: rotate(-13deg); }
    82%              { transform: rotate(5deg);   }
    87%              { transform: rotate(-2deg);  }
  }
  @keyframes kwWhiskQ {
    0%,67%,83%,100% { transform: rotate(0deg);  }
    70%              { transform: rotate(-4deg); }
    74%              { transform: rotate(3deg);  }
    80%              { transform: rotate(-1deg); }
  }
  /* walking — diagonal gait, 0.5 s cycle */
  @keyframes kwLegA {
    0%,100% { transform: rotate(-18deg); }
    32%      { transform: rotate(0deg);  }
    50%,82%  { transform: rotate(14deg); }
  }
  @keyframes kwLegB {
    0%,35%   { transform: rotate(14deg);  }
    55%,100% { transform: rotate(-18deg); }
    87%       { transform: rotate(0deg);  }
  }
  @keyframes kwWalkBody {
    0%,100% { transform: translateY(0px) rotate(-1.2deg); }
    25%      { transform: translateY(-2px) rotate(-1.2deg); }
    50%      { transform: translateY(0px) rotate(1.2deg);  }
    75%      { transform: translateY(-2px) rotate(1.2deg); }
  }
  @keyframes kwWalkShadow {
    0%,100% { opacity: .18; transform: scaleX(1);    }
    25%,75%  { opacity: .11; transform: scaleX(0.86); }
  }
  @keyframes kwSpin {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }
  @keyframes kwBubble {
    from { opacity:0; transform:translateX(-50%) translateY(4px); }
    to   { opacity:1; transform:translateX(-50%) translateY(0);   }
  }
`

// ─── Side-profile eye (one visible eye) ───────────────────────────────────
// Head circle: cx=87 cy=36 r=16  →  eye area around (95, 31)
function SideEye({ s }: { s: CatState }) {
  if (s === 'sleep') return (
    <path d="M 89 31 Q 95 26 101 31"
      stroke="#444" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
  )
  if (s === 'happy') return (
    // Bigger, sparklier eye when head "turns" toward viewer
    <g>
      <circle cx="92" cy="30" r="8.5" fill="white"/>
      <circle cx="93.5" cy="31.5" r="5.5" fill="#111"/>
      <circle cx="97" cy="27.5" r="2.5" fill="white"/>
      <circle cx="90.5" cy="34.5" r="1.5" fill="white"/>
    </g>
  )
  if (s === 'yawn') return (
    <g>
      <circle cx="93" cy="30" r="8" fill="white"/>
      <circle cx="94" cy="31.5" r="5.5" fill="#111"/>
      <circle cx="97" cy="27.5" r="2.2" fill="white"/>
    </g>
  )
  if (s === 'work') return (
    <g>
      <ellipse cx="95" cy="31" rx="7" ry="3.5" fill="white"/>
      <ellipse cx="96" cy="31.5" rx="4.5" ry="2.5" fill="#111"/>
      <line x1="89" y1="25" x2="100" y2="28"
        stroke="#555" strokeWidth="1.8" strokeLinecap="round"/>
    </g>
  )
  return (
    <g>
      <circle cx="95" cy="31" r="7" fill="white"/>
      <circle cx="96.5" cy="32" r="4.5" fill="#111"/>
      <circle cx="99" cy="29" r="2" fill="white"/>
    </g>
  )
}

// ─── Side-profile mouth ────────────────────────────────────────────────────
function SideMouth({ s }: { s: CatState }) {
  if (s === 'yawn') return (
    <g>
      <ellipse cx="108" cy="43" rx="5.5" ry="5" fill="#b33"/>
      <ellipse cx="108" cy="43" rx="4"   ry="4" fill="#e77"/>
    </g>
  )
  if (s === 'happy') return (
    <path d="M 104 41 Q 108 45 112 41"
      stroke="pink" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
  )
  return (
    <path d="M 105 41 Q 108 43 111 41"
      stroke="pink" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  )
}

// ─── SVG side-view cat sprite ─────────────────────────────────────────────
// viewBox 0 0 120 78  — cat faces RIGHT, flip wrapper for left
// size = rendered height in px; width = size * 1.54
export function CatSVG({
  state  = 'idle',
  moving = false,
  size   = 80,
}: {
  state?:  CatState
  moving?: boolean
  size?:   number
}) {
  const idle     = state === 'idle'
  const roll     = state === 'roll'
  const walking  = idle && moving
  const standing = idle && !moving
  const turned   = state === 'happy' || state === 'yawn'

  const legBase: CSSProperties = { transformBox: 'fill-box', transformOrigin: '50% 0%' }

  const bodyG: CSSProperties = walking
    ? { animation: 'kwWalkBody .5s ease-in-out infinite' }
    : standing
      ? { animation: 'kwFloat 4s ease-in-out infinite' }
      : {}

  const shadowS: CSSProperties = {
    transformBox: 'fill-box', transformOrigin: '50% 50%',
    animation: walking
      ? 'kwWalkShadow .5s ease-in-out infinite'
      : standing ? 'kwShadowFloat 4s ease-in-out infinite' : undefined,
  }

  const tailS: CSSProperties = {
    transformBox: 'fill-box', transformOrigin: '100% 100%',
    animation: walking || state === 'happy'
      ? 'kwTailFast .5s ease-in-out infinite'
      : idle ? 'kwTailSlow 2.5s ease-in-out infinite' : undefined,
  }

  const earS: CSSProperties = standing
    ? { transformBox: 'fill-box', transformOrigin: '50% 100%', animation: 'kwEarTwitch 7s ease-in-out infinite' }
    : {}

  const whiskS: CSSProperties = standing
    ? { transformBox: 'fill-box', transformOrigin: '50% 50%', animation: 'kwWhiskQ 5s .4s ease-in-out infinite' }
    : {}

  const blinkS: CSSProperties = idle && !turned
    ? { transformBox: 'fill-box', transformOrigin: '50% 50%', animation: 'kwBlink 5s ease-in-out infinite' }
    : {}

  // Diagonal leg pairs: A = near-front + far-back; B = near-back + far-front
  const legA: CSSProperties = { ...legBase, animation: walking ? 'kwLegA .5s ease-in-out infinite' : undefined }
  const legB: CSSProperties = { ...legBase, animation: walking ? 'kwLegB .5s ease-in-out infinite' : undefined }

  // Head "turns toward viewer" on happy/yawn: compress scaleX + slight tilt
  const headTurnS: CSSProperties = {
    transformBox: 'fill-box', transformOrigin: '8% 60%',
    transform: turned ? 'scaleX(0.72) rotate(5deg)' : 'scaleX(1) rotate(0deg)',
    transition: 'transform 0.35s ease',
  }

  return (
    <svg
      viewBox="0 0 120 78"
      width={size * 1.54}
      height={size}
      style={{ overflow: 'visible', animation: roll ? 'kwSpin .65s linear infinite' : undefined }}
    >
      <defs><style>{KEYFRAMES}</style></defs>

      {/* Shadow stays grounded */}
      <ellipse cx="53" cy="84" rx="30" ry="5" fill="rgba(0,0,0,0.2)" style={shadowS}/>

      {/* Main body group: floats or sways */}
      <g style={bodyG}>

        {/* Tail */}
        <g style={tailS}>
          <path d="M 26 50 C 10 46, 4 30, 14 16"
            stroke="#111" strokeWidth="6.5" fill="none" strokeLinecap="round"/>
          <circle cx="14" cy="14" r="5" fill="#111"/>
        </g>

        {/* Far legs — drawn BEFORE body so they appear behind */}
        <g style={legA}>{/* far-back: phase A — paired with near-front */}
          <ellipse cx="38" cy="63" rx="3.5" ry="8.5" fill="#1a1a1a"/>
          <ellipse cx="38" cy="73"  rx="5"   ry="3.2" fill="#161616"/>
        </g>
        <g style={legB}>{/* far-front: phase B — paired with near-back */}
          <ellipse cx="72" cy="61" rx="3.5" ry="8.5" fill="#1a1a1a"/>
          <ellipse cx="72" cy="71"  rx="5"   ry="3.2" fill="#161616"/>
        </g>

        {/* Body */}
        <ellipse cx="52" cy="46" rx="27" ry="15" fill="#222"/>
        <ellipse cx="52" cy="49" rx="15" ry="8"  fill="#2a2a2a"/>

        {/* Near legs — drawn AFTER body so they appear in front */}
        <g style={legB}>{/* near-back: phase B */}
          <ellipse cx="36" cy="61" rx="4"   ry="9.5" fill="#2c2c2c"/>
          <ellipse cx="36" cy="72" rx="5.5" ry="3.5" fill="#242424"/>
        </g>
        <g style={legA}>{/* near-front: phase A */}
          <ellipse cx="70" cy="59" rx="4"   ry="9.5" fill="#2c2c2c"/>
          <ellipse cx="70" cy="70" rx="5.5" ry="3.5" fill="#242424"/>
        </g>

        {/* Raised paw when working */}
        {state === 'work' && (
          <ellipse cx="70" cy="52" rx="5.5" ry="3.5" fill="#2c2c2c"
            style={{ transformBox: 'fill-box', transformOrigin: '50% 50%', transform: 'rotate(-35deg)' }}/>
        )}

        {/* Head group — squishes to simulate turning toward viewer */}
        <g style={headTurnS}>
          <circle cx="87" cy="36" r="16" fill="#222"/>

          {/* Ear */}
          <g style={earS}>
            <polygon points="80,23 89,6 100,22" fill="#222"/>
            <polygon points="83,22 89,10 97,21" fill="pink" opacity={0.88}/>
          </g>

          {/* Whiskers */}
          <g style={whiskS}>
            <line x1="105" y1="37" x2="120" y2="34" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
            <line x1="105" y1="40" x2="120" y2="42" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
            <line x1="102" y1="37" x2="86"  y2="35" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
            <line x1="102" y1="40" x2="86"  y2="41" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
          </g>

          {/* Eye (blinkable in idle non-turned) */}
          <g style={blinkS}><SideEye s={state}/></g>

          {/* Nose */}
          <ellipse cx="105" cy="40" rx="2.2" ry="1.8" fill="pink"/>

          {/* Mouth */}
          <SideMouth s={state}/>
        </g>

      </g>
    </svg>
  )
}

// ─── Full autonomous KawaiiCat ────────────────────────────────────────────
export function KawaiiCat({ pomState, accent = '#a78bfa' }: {
  pomState?: PomState
  accent?: string
}) {
  const [state,  setState]  = useState<CatState>('idle')
  const [bubble, setBubble] = useState<string | null>(null)
  const [pos,    setPos]    = useState({ x: 20, y: 300 })
  const [flip,   setFlip]   = useState(false)
  const [moving, setMoving] = useState(false)

  const sRef = useRef<CatState>('idle')
  const posR = useRef({ x: 20, y: 300 })
  const tgtR = useRef({ x: 20, y: 300 })
  const mseR = useRef({ x: -9999, y: -9999 })
  const movR = useRef(false)
  const rafR = useRef<number | null>(null)
  const btR  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const actR = useRef<ReturnType<typeof setTimeout> | null>(null)

  const popBubble = useCallback((msg: string, ms = 2200) => {
    setBubble(msg)
    if (btR.current) clearTimeout(btR.current)
    btR.current = setTimeout(() => setBubble(null), ms)
  }, [])

  const setS = useCallback((s: CatState) => { sRef.current = s; setState(s) }, [])

  useEffect(() => {
    if (pomState === 'work')       { setS('work');  popBubble('*tap tap*', 3000) }
    else if (pomState === 'break') { setS('sleep'); popBubble('purrr~', 3000) }
    else if (!pomState)            { setS('idle') }
  }, [pomState, setS, popBubble])

  useEffect(() => {
    const h = (e: MouseEvent) => { mseR.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])

  useEffect(() => {
    const x = 20
    const y = Math.max(80, (window.innerHeight || 600) - 140)
    posR.current = { x, y }
    tgtR.current = { x: 140, y }
    setPos({ x, y })
  }, [])

  useEffect(() => {
    if (pomState) {
      if (rafR.current) cancelAnimationFrame(rafR.current)
      return
    }
    const VW = () => window.innerWidth  || 800
    const VH = () => window.innerHeight || 600
    const newTgt = () => ({
      x: 30 + Math.random() * Math.max(0, VW() - 160),
      y: 60 + Math.random() * Math.max(0, VH() - 180),
    })

    let lastT = Date.now()
    let nextD = 3000 + Math.random() * 3000

    const tick = () => {
      const now = Date.now()
      const cat = posR.current
      const m   = mseR.current

      // Mouse proximity check (use cat center)
      const mdx = m.x - (cat.x + 62)
      const mdy = m.y - (cat.y + 40)
      const md  = Math.sqrt(mdx * mdx + mdy * mdy)

      if (md < 90 && sRef.current !== 'happy' && sRef.current !== 'yawn') {
        setS('happy')
        popBubble(pick(BUBBLES.happy))
        tgtR.current = { x: cat.x, y: cat.y }
        lastT = now; nextD = 2500
      }
      if (md >= 90 && sRef.current === 'happy') {
        setS('idle')
        tgtR.current = newTgt()
        lastT = now; nextD = 2000
      }

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
          const nowMoving = sRef.current === 'idle'
          if (nowMoving !== movR.current) { movR.current = nowMoving; setMoving(nowMoving) }
        } else {
          if (movR.current) { movR.current = false; setMoving(false) }
        }
      } else {
        if (movR.current) { movR.current = false; setMoving(false) }
      }

      rafR.current = requestAnimationFrame(tick)
    }

    rafR.current = requestAnimationFrame(tick)
    return () => { if (rafR.current) cancelAnimationFrame(rafR.current) }
  }, [pomState, setS, popBubble])

  const handleClick = useCallback(() => {
    if (sRef.current === 'roll') return
    setS('yawn')
    popBubble(pick(BUBBLES.yawn), 2500)
    if (actR.current) clearTimeout(actR.current)
    actR.current = setTimeout(() => setS(pomState === 'work' ? 'work' : 'idle'), 2500)
  }, [pomState, setS, popBubble])

  useEffect(() => () => {
    if (rafR.current) cancelAnimationFrame(rafR.current)
    if (btR.current)  clearTimeout(btR.current)
    if (actR.current) clearTimeout(actR.current)
  }, [])

  const isRoll = state === 'roll'

  return (
    <div style={{ position: 'absolute', left: pos.x, top: pos.y, zIndex: 20, pointerEvents: 'none', width: 123 }}>
      <style>{KEYFRAMES}</style>

      {bubble && (
        <div style={{
          position: 'absolute', bottom: '100%', left: '50%',
          transform: 'translateX(-50%)', marginBottom: 6,
          background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(8px)',
          border: `1px solid ${accent}70`, borderRadius: 8,
          padding: '3px 9px', whiteSpace: 'nowrap', fontSize: 11, color: '#fff',
          pointerEvents: 'none', animation: 'kwBubble .2s ease-out',
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

      <div style={{
        display: 'inline-block',
        transform: isRoll ? undefined : `scaleX(${flip ? -1 : 1})`,
        transformOrigin: 'center',
      }}>
        <div onClick={handleClick} style={{ cursor: 'pointer', pointerEvents: 'all', display: 'inline-block' }}>
          <CatSVG state={state} moving={moving} size={80}/>
        </div>
      </div>
    </div>
  )
}
