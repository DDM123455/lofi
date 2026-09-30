'use client'

import type { KeyboardEvent } from 'react'

/**
 * Illustrated evening apartment used by Rest + Company modes. Pure SVG + CSS (no images,
 * no animation library) so it ships inside the lazy Come Home chunk and costs nothing for
 * focus-mode users.
 */

function onActivate(fn: () => void) {
  return (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn() }
  }
}

interface Props {
  lampOn: boolean
  fireOn: boolean
  rain: boolean
  curtainsOpen: boolean
  teaHot: boolean
  labels: { lamp: string; window: string; curtain: string; tea: string; fire: string }
  /** Accessible name of the whole illustration. */
  label: string
  onLamp?: () => void
  onFire?: () => void
  onWindow?: () => void
  onCurtain?: () => void
  onTea?: () => void
}

// City windows: [x, y, w, h, delay] inside the window frame
const LIT = [
  [610, 452, 10, 14, 0], [634, 476, 10, 14, 3], [700, 430, 10, 14, 7], [718, 470, 10, 14, 1],
  [790, 490, 10, 12, 5], [812, 462, 10, 12, 9], [880, 420, 10, 14, 2], [900, 446, 10, 14, 6],
  [920, 498, 10, 14, 4], [964, 470, 10, 14, 8], [986, 500, 10, 12, 10], [760, 520, 10, 12, 11],
] as const

const DUST = Array.from({ length: 14 }, (_, i) => ({
  x: 1130 + ((i * 53) % 260), y: 380 + ((i * 97) % 300), r: 1.4 + (i % 3) * 0.8, d: 14 + (i % 5) * 3, delay: -i * 2.3,
}))

export function NightRoom({ lampOn, fireOn, rain, curtainsOpen, teaHot, labels, label, onLamp, onFire, onWindow, onCurtain, onTea }: Props) {
  const interactive = (fn?: () => void, label?: string) => fn ? {
    role: 'button' as const, tabIndex: 0, 'aria-label': label, className: 'nr-obj', onClick: fn, onKeyDown: onActivate(fn),
  } : {}

  return (
    <svg className="nr-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
      <defs>
        <linearGradient id="nr-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d1522" /><stop offset="1" stopColor="#140e18" />
        </linearGradient>
        <linearGradient id="nr-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a0f24" /><stop offset="1" stopColor="#23203f" />
        </linearGradient>
        <radialGradient id="nr-lamp" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffcf8a" stopOpacity=".55" /><stop offset=".45" stopColor="#ff9f5a" stopOpacity=".16" /><stop offset="1" stopColor="#ff9f5a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nr-fire" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff9a4d" stopOpacity=".5" /><stop offset="1" stopColor="#ff6a2b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nr-moon" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff4d6" stopOpacity=".5" /><stop offset="1" stopColor="#fff4d6" stopOpacity="0" />
        </radialGradient>
        <clipPath id="nr-win"><rect x="560" y="140" width="480" height="420" rx="6" /></clipPath>
        <pattern id="nr-rainpat" width="40" height="80" patternUnits="userSpaceOnUse">
          <path d="M10 0 l-6 24 M30 40 l-6 24" stroke="#b8c7ff" strokeOpacity=".35" strokeWidth="1.6" strokeLinecap="round" />
        </pattern>
      </defs>

      {/* room */}
      <rect width="1600" height="900" fill="url(#nr-wall)" />
      <rect y="730" width="1600" height="170" fill="#130c0b" />
      <rect y="730" width="1600" height="6" fill="#241814" />
      <ellipse cx="800" cy="835" rx="420" ry="60" fill="#2a1c26" opacity=".85" />
      <ellipse cx="800" cy="835" rx="360" ry="46" fill="none" stroke="#3a2833" strokeWidth="4" opacity=".7" />

      {/* window */}
      <g {...interactive(onWindow, labels.window)}>
        <g clipPath="url(#nr-win)">
          <rect x="560" y="140" width="480" height="420" fill="url(#nr-sky)" />
          <circle cx="930" cy="230" r="90" fill="url(#nr-moon)" />
          <circle cx="930" cy="230" r="30" fill="#fbeccb" opacity=".92" />
          {[[610, 190], [700, 170], [780, 230], [1000, 300], [660, 280], [860, 180]].map(([x, y], i) => (
            <circle key={i} className="nr-twinkle" style={{ animationDelay: `${i * 1.3}s` }} cx={x} cy={y} r="1.8" fill="#fff" />
          ))}
          <path d="M560 560 V430 h40 v-30 h50 v60 h40 V410 h60 v70 h30 v-40 h50 v120 h20 V400 h60 v60 h30 v-40 h60 v160 Z" fill="#0d0c1a" />
          {LIT.map(([x, y, w, h, d], i) => (
            <rect key={i} className="nr-lit" style={{ animationDelay: `${d * 1.7}s` }} x={x} y={y} width={w} height={h} rx="1.5" fill="#f6c77a" />
          ))}
          <rect className="nr-rain" x="540" y="60" width="520" height="580" fill="url(#nr-rainpat)" style={{ opacity: rain ? 1 : 0 }} />
        </g>
        <rect x="552" y="132" width="496" height="436" rx="10" fill="none" stroke="#3a2a26" strokeWidth="16" />
        <path d="M800 140 V560 M560 350 H1040" stroke="#3a2a26" strokeWidth="10" />
        <rect x="530" y="562" width="540" height="18" rx="4" fill="#3d2c27" />
      </g>

      {/* curtains */}
      <g {...interactive(onCurtain, labels.curtain)}>
        <g className="nr-curtain" style={{ transformOrigin: '500px 120px', transform: `scaleX(${curtainsOpen ? 1 : 2.9})` }}>
          <path d="M500 118 h110 q-18 150 6 300 q16 110 -6 180 h-110 Z" fill="#5a2f3a" />
          <path d="M530 118 q-10 220 6 480 M570 118 q-6 220 10 480" stroke="#48242f" strokeWidth="6" fill="none" />
        </g>
        <g className="nr-curtain" style={{ transformOrigin: '1100px 120px', transform: `scaleX(${curtainsOpen ? 1 : 2.9})` }}>
          <path d="M1100 118 h-110 q18 150 -6 300 q-16 110 6 180 h110 Z" fill="#5a2f3a" />
          <path d="M1070 118 q10 220 -6 480 M1030 118 q6 220 -10 480" stroke="#48242f" strokeWidth="6" fill="none" />
        </g>
        <rect x="480" y="108" width="640" height="12" rx="6" fill="#2d201c" />
      </g>

      {/* shelf + books */}
      <rect x="150" y="300" width="300" height="10" rx="3" fill="#3a2a24" />
      {[[165, 238, 22, 62, '#6b4a5e'], [190, 250, 18, 50, '#445a6b'], [211, 244, 20, 56, '#7a5b3a'], [236, 256, 16, 44, '#5b3a45'], [380, 266, 44, 34, '#3a4b3f']].map(([x, y, w, h, c], i) => (
        <rect key={i} x={x as number} y={y as number} width={w as number} height={h as number} rx="2" fill={c as string} />
      ))}

      {/* fireplace */}
      <g {...interactive(onFire, labels.fire)}>
        <rect x="140" y="470" width="320" height="262" rx="8" fill="#2e2320" />
        <rect x="124" y="456" width="352" height="24" rx="5" fill="#3d2e29" />
        <path d="M190 732 V580 q110 -70 220 0 V732 Z" fill="#0c0808" />
        <g style={{ opacity: fireOn ? 1 : 0, transition: 'opacity 1.4s ease' }}>
          <ellipse cx="300" cy="700" rx="230" ry="130" fill="url(#nr-fire)" />
          <path className="nr-flame" d="M250 726 q-10 -60 30 -100 q-6 40 20 60 q10 -40 40 -60 q4 50 -10 100 Z" fill="#ff8c3a" />
          <path className="nr-flame nr-flame2" d="M275 726 q0 -40 25 -64 q4 30 20 40 q8 -20 20 -30 q0 34 -12 54 Z" fill="#ffc15e" />
        </g>
        <rect x="230" y="718" width="140" height="14" rx="6" fill="#4a2e22" />
      </g>

      {/* side table + lamp */}
      <rect x="1180" y="600" width="190" height="16" rx="5" fill="#3d2c26" />
      <rect x="1196" y="616" width="12" height="114" fill="#2e211c" />
      <rect x="1342" y="616" width="12" height="114" fill="#2e211c" />
      <rect x="1216" y="572" width="30" height="28" rx="4" fill="#5b4a6b" opacity=".85" />
      <g {...interactive(onLamp, labels.lamp)}>
        <ellipse cx="1300" cy="598" rx="34" ry="8" fill="#241915" />
        <rect x="1296" y="500" width="8" height="98" fill="#3a2a22" />
        <path d="M1244 500 h112 l-22 -80 h-68 Z" fill={lampOn ? '#f4c689' : '#6b5646'} style={{ transition: 'fill 1.2s ease' }} />
      </g>

      {/* cushion */}
      <ellipse cx="820" cy="800" rx="120" ry="30" fill="#4a3346" />
      <ellipse cx="820" cy="792" rx="104" ry="22" fill="#5a3f55" />

      {/* blanket on the cushion */}
      <path d="M740 792 q40 -30 96 -18 q50 10 70 22 q-60 14 -166 -4 Z" fill="#7a5a6e" opacity=".9" />
      <path d="M760 786 q40 -16 90 -8" stroke="#8d6b80" strokeWidth="3" fill="none" />

      {/* low tray + tea */}
      <g {...interactive(onTea, labels.tea)}>
        <ellipse cx="1000" cy="812" rx="92" ry="16" fill="#2c1f1b" />
        <rect x="912" y="790" width="176" height="18" rx="8" fill="#4a332a" />
        <rect x="934" y="744" width="46" height="48" rx="8" fill="#e9d8c3" />
        <path d="M980 756 q22 2 20 16 q-2 12 -20 12" fill="none" stroke="#e9d8c3" strokeWidth="7" />
        <rect x="938" y="748" width="38" height="8" rx="3" fill="#b0754a" opacity=".85" />
        <g style={{ opacity: teaHot ? 1 : 0, transition: 'opacity 2.4s ease' }}>
          <path className="nr-steam" d="M948 736 q-10 -18 2 -34 q10 -14 0 -30" fill="none" stroke="#fff4e4" strokeWidth="3.5" strokeLinecap="round" opacity=".5" />
          <path className="nr-steam nr-steam2" d="M964 736 q10 -18 -2 -36 q-8 -12 2 -28" fill="none" stroke="#fff4e4" strokeWidth="3" strokeLinecap="round" opacity=".4" />
        </g>
        <rect x="1010" y="776" width="64" height="14" rx="2" fill="#5b6b7a" />
        <rect x="1014" y="766" width="58" height="11" rx="2" fill="#8a5a4a" />
      </g>

      {/* darkness + light */}
      <rect width="1600" height="900" fill="#07040c" style={{ opacity: lampOn ? 0.18 : 0.5, transition: 'opacity 1.6s ease', pointerEvents: 'none' }} />
      <circle cx="1300" cy="470" r="520" fill="url(#nr-lamp)" style={{ opacity: lampOn ? 1 : 0, transition: 'opacity 1.6s ease', pointerEvents: 'none', mixBlendMode: 'screen' }} />
      <g style={{ opacity: lampOn ? 1 : 0.3, transition: 'opacity 1.6s ease', pointerEvents: 'none' }}>
        {DUST.map((p, i) => (
          <circle key={i} className="nr-dust" cx={p.x} cy={p.y} r={p.r} fill="#ffe2b0" style={{ animationDuration: `${p.d}s`, animationDelay: `${p.delay}s` }} />
        ))}
      </g>
    </svg>
  )
}

export const NIGHT_ROOM_CSS = `
.nr-svg{position:absolute;inset:0;width:100%;height:100%;display:block}
.nr-obj{cursor:pointer;outline:none}
.nr-obj:focus-visible{filter:drop-shadow(0 0 10px rgba(255,217,160,.9))}
.nr-obj:hover{filter:brightness(1.12)}
.nr-curtain{transition:transform 2.2s cubic-bezier(.4,0,.2,1)}
.nr-rain{transition:opacity 2s ease;animation:nr-rainfall 1.1s linear infinite}
.nr-twinkle{animation:nr-tw 6s ease-in-out infinite}
.nr-lit{animation:nr-lit 14s ease-in-out infinite}
.nr-flame{transform-box:fill-box;transform-origin:center bottom;animation:nr-flick 2.6s ease-in-out infinite}
.nr-flame2{animation-duration:1.9s;animation-delay:-.6s}
.nr-dust{animation:nr-dust 18s linear infinite}
.nr-steam{transform-box:fill-box;transform-origin:center bottom;animation:nr-steam 4.5s ease-in-out infinite}
.nr-steam2{animation-delay:-2.2s}
@keyframes nr-rainfall{from{transform:translateY(0)}to{transform:translateY(80px)}}
@keyframes nr-tw{0%,100%{opacity:.25}50%{opacity:.9}}
@keyframes nr-lit{0%,100%{opacity:.85}45%{opacity:.85}50%{opacity:.25}70%{opacity:.25}75%{opacity:.85}}
@keyframes nr-flick{0%,100%{transform:scale(1,1)}30%{transform:scale(.96,1.06)}60%{transform:scale(1.03,.95)}}
@keyframes nr-dust{0%{transform:translate(0,0);opacity:0}15%{opacity:.8}85%{opacity:.6}100%{transform:translate(-40px,-90px);opacity:0}}
@keyframes nr-steam{0%{transform:translateY(6px) scaleX(1);opacity:0}30%{opacity:.55}100%{transform:translateY(-22px) scaleX(1.4);opacity:0}}
@media (prefers-reduced-motion: reduce){
  .nr-rain,.nr-twinkle,.nr-lit,.nr-flame,.nr-dust,.nr-steam{animation:none!important}
  .nr-curtain{transition-duration:.01s}
}
`
