'use client'

import { useEffect, useState } from 'react'

/**
 * Company mode: the view from your window onto the building across the street. Other people
 * are winding down too — reading, making tea, a TV glowing — and lights slowly come on and
 * go off. The "company" is ambient presence, not a character that talks at you.
 */

type Life = 'reader' | 'tea' | 'desk' | 'tv' | 'plant' | 'curtain' | 'empty'
interface Win { lit: boolean; life: Life; hue: 'warm' | 'amber' | 'tv' }

const COLS = 5 // 4 rows: INITIAL holds 20 windows
const W = 150, H = 104, GX = 60, GY = 58, X0 = 250, Y0 = 150

// Starting state of the facade — a realistic mix of lit and dark windows.
const INITIAL: Win[] = [
  { lit: true, life: 'plant', hue: 'warm' }, { lit: false, life: 'empty', hue: 'warm' }, { lit: true, life: 'reader', hue: 'amber' }, { lit: false, life: 'curtain', hue: 'warm' }, { lit: true, life: 'curtain', hue: 'warm' },
  { lit: false, life: 'empty', hue: 'warm' }, { lit: true, life: 'tv', hue: 'tv' }, { lit: false, life: 'empty', hue: 'warm' }, { lit: true, life: 'tea', hue: 'warm' }, { lit: false, life: 'empty', hue: 'warm' },
  { lit: true, life: 'desk', hue: 'amber' }, { lit: false, life: 'plant', hue: 'warm' }, { lit: true, life: 'curtain', hue: 'warm' }, { lit: false, life: 'empty', hue: 'warm' }, { lit: true, life: 'reader', hue: 'warm' },
  { lit: false, life: 'empty', hue: 'warm' }, { lit: true, life: 'plant', hue: 'amber' }, { lit: false, life: 'tv', hue: 'tv' }, { lit: false, life: 'empty', hue: 'warm' }, { lit: true, life: 'tea', hue: 'warm' },
]

const FILL = { warm: '#f2c27c', amber: '#e9a45e', tv: '#8fa6e8' }
const SIL = '#3a2530'

function Silhouette({ life }: { life: Life }) {
  // drawn in window-local coordinates (0..W, 0..H)
  switch (life) {
    case 'reader':
      return <g fill={SIL}>
        <rect x="18" y="70" width="70" height="34" rx="10" opacity=".75" />
        <circle cx="52" cy="46" r="11" />
        <path d="M38 104 v-30 q14 -16 28 0 v30 Z" />
        <path className="nb-page" d="M60 64 l22 -6 l2 16 l-22 6 Z" fill="#5a3d44" />
      </g>
    case 'tea':
      return <g fill={SIL}>
        <rect x="0" y="80" width="150" height="24" opacity=".6" />
        <circle cx="96" cy="36" r="10" />
        <path d="M84 104 v-52 q12 -12 24 0 v52 Z" />
        <rect x="58" y="68" width="12" height="12" rx="2" />
        <path className="nb-steam" d="M62 64 q-5 -8 1 -16" stroke="#fff3e0" strokeWidth="2" fill="none" opacity=".5" />
      </g>
    case 'desk':
      return <g fill={SIL}>
        <rect x="10" y="74" width="130" height="8" />
        <path d="M110 74 l8 -26 l14 6" stroke={SIL} strokeWidth="4" fill="none" />
        <circle cx="60" cy="48" r="11" />
        <path d="M44 82 v-18 q16 -14 32 0 v18 Z" />
        <rect x="80" y="60" width="26" height="16" rx="2" fill="#4c3a48" />
      </g>
    case 'tv':
      return <g fill={SIL}>
        <rect x="14" y="70" width="96" height="34" rx="12" />
        <circle cx="44" cy="62" r="10" />
        <circle cx="72" cy="64" r="9" />
      </g>
    case 'plant':
      return <g fill={SIL}>
        <rect x="104" y="80" width="26" height="24" rx="3" />
        <path d="M117 82 q-24 -20 -14 -44 q10 16 14 44 q4 -30 22 -40 q2 26 -22 40" />
      </g>
    case 'curtain':
      return <g fill="#7a4a3e" opacity=".55">
        <path d="M0 0 h54 q-8 52 4 104 H0 Z" />
        <path d="M150 0 h-40 q8 52 -4 104 H150 Z" />
      </g>
    default:
      return null
  }
}

export function Neighbors({ rain, lines, label, reduced }: { rain: boolean; lines: string[]; label: string; reduced: boolean }) {
  const [wins, setWins] = useState<Win[]>(INITIAL)
  const [line, setLine] = useState<string | null>(null)

  // Every so often one window changes: someone switches a light on, someone goes to bed.
  // Keep between 7 and 12 windows lit so the building never feels empty or busy.
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setWins(prev => {
        const lit = prev.filter(w => w.lit).length
        const wantOn = lit < 7 ? true : lit > 11 ? false : Math.random() < 0.5
        const pool = prev.map((w, i) => ({ w, i })).filter(({ w }) => w.lit !== wantOn)
        if (!pool.length) return prev
        const { i } = pool[Math.floor(Math.random() * pool.length)]
        return prev.map((w, k) => (k === i ? { ...w, lit: wantOn } : w))
      })
    }, 14000)
    return () => clearInterval(id)
  }, [reduced])

  // A few quiet lines, far apart. Never more than four per visit.
  useEffect(() => {
    let said = 0
    let hide: ReturnType<typeof setTimeout>
    const speak = () => {
      if (said >= 4) return
      const text = said === 0 ? lines[0] : lines[1 + Math.floor(Math.random() * (lines.length - 1))]
      said += 1
      setLine(text)
      hide = setTimeout(() => setLine(null), 7000)
    }
    const first = setTimeout(speak, 9000)
    const every = setInterval(speak, 80000)
    return () => { clearTimeout(first); clearInterval(every); clearTimeout(hide) }
  }, [lines])

  return (
    <>
      <svg className="nr-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
        <defs>
          <linearGradient id="nb-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0b0f22" /><stop offset="1" stopColor="#1c1a33" />
          </linearGradient>
          <linearGradient id="nb-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1e1822" /><stop offset="1" stopColor="#150f18" />
          </linearGradient>
          <radialGradient id="nb-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffc983" stopOpacity=".35" /><stop offset="1" stopColor="#ffc983" stopOpacity="0" />
          </radialGradient>
          <pattern id="nb-rain" width="40" height="80" patternUnits="userSpaceOnUse">
            <path d="M10 0 l-5 22 M30 40 l-5 22" stroke="#b8c7ff" strokeOpacity=".28" strokeWidth="1.5" strokeLinecap="round" />
          </pattern>
        </defs>

        {/* outside */}
        <rect width="1600" height="900" fill="url(#nb-sky)" />
        {[[120, 90], [380, 60], [1260, 80], [1480, 130], [900, 50]].map(([x, y], i) => (
          <circle key={i} className="nr-twinkle" style={{ animationDelay: `${i * 1.4}s` }} cx={x} cy={y} r="1.6" fill="#fff" />
        ))}
        {/* the building across the street */}
        <rect x="200" y="110" width="1200" height="820" fill="url(#nb-wall)" />
        <rect x="200" y="104" width="1200" height="12" fill="#2a2029" />
        {wins.map((w, i) => {
          const c = i % COLS, r = Math.floor(i / COLS)
          const x = X0 + c * (W + GX), y = Y0 + r * (H + GY)
          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              <rect width={W} height={H} rx="3" fill="#0e0b12" />
              <g style={{ opacity: w.lit ? 1 : 0, transition: 'opacity 3.5s ease' }}>
                <circle cx={W / 2} cy={H / 2} r="130" fill="url(#nb-glow)" />
                <rect width={W} height={H} rx="3" fill={FILL[w.hue]} className={w.hue === 'tv' ? 'nb-tv' : undefined} opacity=".9" />
                <Silhouette life={w.life} />
              </g>
              <rect x="-6" y={H} width={W + 12} height="7" rx="2" fill="#2a2029" />
            </g>
          )
        })}
        {/* street glow */}
        <rect y="820" width="1600" height="80" fill="#0c0a10" />
        <ellipse cx="800" cy="840" rx="700" ry="40" fill="#f2b56b" opacity=".06" />

        {/* your own window: frame, rain on the glass, sill */}
        <rect className="nr-rain" x="0" y="-80" width="1600" height="1060" fill="url(#nb-rain)" style={{ opacity: rain ? 1 : 0 }} />
        <path d="M0 0 H1600 V900 H0 Z M90 60 V800 H1510 V60 Z" fill="#1a1216" fillRule="evenodd" />
        <path d="M800 60 V800" stroke="#1a1216" strokeWidth="18" />
        <rect x="40" y="790" width="1520" height="34" rx="6" fill="#2e211d" />
        {/* a mug on your sill — you're here too */}
        <rect x="1260" y="748" width="38" height="44" rx="7" fill="#d9c6ae" />
        <path d="M1298 758 q18 2 16 14 q-2 10 -16 10" fill="none" stroke="#d9c6ae" strokeWidth="6" />
        <path className="nr-steam" d="M1272 740 q-8 -14 2 -28" fill="none" stroke="#fff4e4" strokeWidth="3" strokeLinecap="round" opacity=".45" />
      </svg>
      <div className="ch-bubble-wrap" aria-live="polite">
        {line && <div key={line} className="ch-bubble">{line}</div>}
      </div>
    </>
  )
}

export const NEIGHBORS_CSS = `
.nb-tv{animation:nb-tv 3.2s steps(6) infinite}
.nb-page{transform-box:fill-box;transform-origin:left center;animation:nb-page 16s ease-in-out infinite}
.nb-steam{animation:nr-steam 4s ease-in-out infinite}
@keyframes nb-tv{0%,100%{opacity:.75}20%{opacity:.95}40%{opacity:.7}60%{opacity:.9}80%{opacity:.8}}
@keyframes nb-page{0%,92%,100%{transform:scaleX(1)}96%{transform:scaleX(-.2)}}
@media (prefers-reduced-motion: reduce){.nb-tv,.nb-page,.nb-steam{animation:none!important}}
`
