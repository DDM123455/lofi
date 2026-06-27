'use client'

export type CatVariant = 'typist' | 'mouse' | 'beanie' | 'wizard'

const CSS = `
.ccv-cat{transform-box:fill-box;transform-origin:center bottom;animation:ccv-bob 2.4s ease-in-out infinite}
.ccv-earL{transform-box:fill-box;transform-origin:bottom right;animation:ccv-ear 5s ease-in-out infinite}
.ccv-earR{transform-box:fill-box;transform-origin:bottom left;animation:ccv-ear 5s ease-in-out .7s infinite}
.ccv-eyes{transform-box:fill-box;transform-origin:center;animation:ccv-blink 4.8s ease-in-out infinite}
.ccv-tail{transform-box:fill-box;transform-origin:6px 232px;animation:ccv-tail 3s ease-in-out infinite}
.ccv-pawA{transform-box:fill-box;transform-origin:center;animation:ccv-pawA 1s ease-in-out infinite}
.ccv-pawB{transform-box:fill-box;transform-origin:center;animation:ccv-pawB 1s ease-in-out infinite}
.ccv-steam{transform-box:fill-box;transform-origin:bottom;animation:ccv-steam 3.2s ease-in-out infinite}
.ccv-glow{animation:ccv-glow 2.8s ease-in-out infinite}
.ccv-note{transform-box:fill-box;transform-origin:center;animation:ccv-note 4.2s ease-in-out infinite}
.ccv-wave{transform-box:fill-box;animation:ccv-wave 2.6s ease-in-out infinite}
.ccv-spark{animation:ccv-spark 1.6s ease-in-out infinite}
.ccv-twinkle{animation:ccv-twinkle 2.2s ease-in-out infinite}
@keyframes ccv-bob{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-6px) rotate(1deg)}}
@keyframes ccv-ear{0%,88%,100%{transform:rotate(0)}94%{transform:rotate(-10deg)}}
@keyframes ccv-blink{0%,92%,100%{transform:scaleY(1)}96%{transform:scaleY(.08)}}
@keyframes ccv-tail{0%,100%{transform:rotate(10deg)}50%{transform:rotate(-16deg)}}
@keyframes ccv-pawA{0%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
@keyframes ccv-pawB{0%,30%,100%{transform:translateY(0)}62%{transform:translateY(-5px)}}
@keyframes ccv-steam{0%{transform:translateY(0) scaleX(1);opacity:0}25%{opacity:.55}100%{transform:translateY(-26px) scaleX(1.5);opacity:0}}
@keyframes ccv-glow{0%,100%{opacity:.32}50%{opacity:.6}}
@keyframes ccv-note{0%{transform:translateY(0) translateX(0) rotate(0);opacity:0}15%{opacity:.9}100%{transform:translateY(-46px) translateX(10px) rotate(14deg);opacity:0}}
@keyframes ccv-wave{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(5deg)}}
@keyframes ccv-spark{0%,100%{opacity:0;transform:scale(.4)}50%{opacity:1;transform:scale(1)}}
@keyframes ccv-twinkle{0%,100%{opacity:.3}50%{opacity:1}}
`

function Shadow() {
  return <ellipse cx="200" cy="316" rx="150" ry="15" fill="#000" opacity=".28" style={{filter:'blur(9px)'}}/>
}
function Tail() {
  return <path className="ccv-tail" d="M286 232 q56 6 52 -52 q-3 -28 -28 -30" fill="none" stroke="#d98f4e" strokeWidth="20" strokeLinecap="round"/>
}
function Desk() {
  return <>
    <rect x="32" y="252" width="336" height="54" rx="9" fill="#a9713f"/>
    <rect x="32" y="252" width="336" height="9" rx="4.5" fill="#c89a64"/>
  </>
}
function CommonFace({ eyeRx=9.5, eyeRy=12.5, eyeCy=122 }: { eyeRx?:number; eyeRy?:number; eyeCy?:number }) {
  return <>
    <ellipse cx="200" cy="140" rx="36" ry="27" fill="#fde7cf"/>
    <g className="ccv-eyes">
      <ellipse cx="174" cy={eyeCy} rx={eyeRx} ry={eyeRy} fill="#322f3b"/>
      <ellipse cx="226" cy={eyeCy} rx={eyeRx} ry={eyeRy} fill="#322f3b"/>
      <circle cx="170.5" cy={eyeCy-4} r="3" fill="#fff"/>
      <circle cx="222.5" cy={eyeCy-4} r="3" fill="#fff"/>
    </g>
    <ellipse cx="150" cy="142" rx="15" ry="9" fill="#f4a39a" opacity=".55"/>
    <ellipse cx="250" cy="142" rx="15" ry="9" fill="#f4a39a" opacity=".55"/>
    <path d="M192 138 h16 l-8 8 z" fill="#e08a82"/>
    <path d="M200 146 V150 M200 150 q-7 6 -13 2 M200 150 q7 6 13 2" stroke="#c98a55" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
    <path d="M158 132 l-30 -6 M158 140 l-31 4 M242 132 l30 -6 M242 140 l31 4" stroke="#efdcc0" strokeWidth="2.4" strokeLinecap="round"/>
  </>
}
function CommonEars() {
  return <>
    <path className="ccv-earL" d="M150 60 L160 14 L198 50 Z" fill="#f0b271"/>
    <path className="ccv-earR" d="M250 60 L240 14 L202 50 Z" fill="#f0b271"/>
    <path d="M158 56 L164 28 L188 52 Z" fill="#f0a09a"/>
    <path d="M242 56 L236 28 L212 52 Z" fill="#f0a09a"/>
  </>
}
function LaptopScreen({ ac }: { ac: string }) {
  return <>
    <ellipse className="ccv-glow" cx="200" cy="196" rx="60" ry="22" fill={ac} style={{filter:'blur(10px)'}}/>
    <rect x="150" y="200" width="100" height="56" rx="13" fill={ac} opacity=".22" style={{filter:'blur(7px)'}}/>
    <rect x="156" y="202" width="88" height="50" rx="11" fill="#2a2f3c"/>
    <g className="ccv-glow" fill={ac}>
      <ellipse cx="200" cy="230" rx="8" ry="6.5"/><circle cx="191" cy="220" r="3"/><circle cx="200" cy="217" r="3.2"/><circle cx="209" cy="220" r="3"/>
    </g>
    <path d="M150 250 L250 250 L262 270 L138 270 Z" fill="#20242f"/>
    <g className="ccv-pawA">
      <ellipse cx="158" cy="252" rx="17" ry="12" fill="#fde7cf"/>
      <path d="M151 252 v6 M158 253 v6 M165 252 v6" stroke="#e6cda9" strokeWidth="1.8" strokeLinecap="round"/>
    </g>
    <g className="ccv-pawB">
      <ellipse cx="242" cy="252" rx="17" ry="12" fill="#fde7cf"/>
      <path d="M235 252 v6 M242 253 v6 M249 252 v6" stroke="#e6cda9" strokeWidth="1.8" strokeLinecap="round"/>
    </g>
  </>
}
function CoffeeCup({ ac }: { ac: string }) {
  return <g>
    <path d="M324 240 q12 0 12 9 t-12 9" fill="none" stroke="#d9cdbb" strokeWidth="4.5"/>
    <rect x="296" y="232" width="32" height="30" rx="7" fill="#ece2d4"/>
    <rect x="296" y="240" width="32" height="5" fill={ac} opacity=".8"/>
    <ellipse cx="312" cy="234" rx="14" ry="4" fill="#5b3a28"/>
    <path className="ccv-steam" d="M306 224 q-4 -7 0 -13 M316 224 q4 -7 0 -13" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity=".5"/>
  </g>
}

// ── A: Lo-Fi Typist ────────────────────────────────────────────────────────
function Typist({ ac }: { ac: string }) {
  return <>
    <Shadow/>
    {/* music notes */}
    <g fill={ac}>
      <g className="ccv-note"><g transform="translate(132,82)"><ellipse cx="0" cy="10" rx="5" ry="3.6" transform="rotate(-18 0 10)"/><rect x="3.4" y="-12" width="2.4" height="22" rx="1.2"/><path d="M5.8 -12 q9 2 6.5 12 q3.5 -11 -6.5 -16 z"/></g></g>
      <g className="ccv-note" style={{animationDelay:'1.4s'}}><g transform="translate(262,74) scale(.82)"><ellipse cx="0" cy="10" rx="5" ry="3.6" transform="rotate(-18 0 10)"/><rect x="3.4" y="-12" width="2.4" height="22" rx="1.2"/><path d="M5.8 -12 q9 2 6.5 12 q3.5 -11 -6.5 -16 z"/></g></g>
    </g>
    <Tail/>
    <g className="ccv-cat">
      <path d="M168 196 C150 214 146 236 158 252" fill="none" stroke="#f0b271" strokeWidth="24" strokeLinecap="round"/>
      <path d="M232 196 C250 214 254 236 242 252" fill="none" stroke="#f0b271" strokeWidth="24" strokeLinecap="round"/>
      <ellipse cx="200" cy="208" rx="92" ry="76" fill="#f0b271"/>
      <ellipse cx="200" cy="224" rx="58" ry="54" fill="#fde7cf"/>
      <path d="M200 162 v22 M170 172 q6 14 10 24 M230 172 q-6 14 -10 24" stroke="#d98f4e" strokeWidth="6" strokeLinecap="round" fill="none" opacity=".8"/>
      <CommonEars/>
      <circle cx="200" cy="120" r="72" fill="#f0b271"/>
      {/* headphones */}
      <path d="M134 110 Q200 34 266 110" fill="none" stroke="#3a4150" strokeWidth="13" strokeLinecap="round"/>
      <path d="M200 54 V78 M174 60 l7 18 M226 60 l-7 18" stroke="#d98f4e" strokeWidth="6" strokeLinecap="round" fill="none"/>
      <CommonFace/>
      {/* headphone ear pads */}
      <ellipse cx="132" cy="128" rx="18" ry="24" fill="#343b49"/>
      <ellipse cx="132" cy="128" rx="10" ry="15" fill={ac} opacity=".85"/>
      <ellipse cx="268" cy="128" rx="18" ry="24" fill="#343b49"/>
      <ellipse cx="268" cy="128" rx="10" ry="15" fill={ac} opacity=".85"/>
    </g>
    <Desk/>
    <LaptopScreen ac={ac}/>
    <CoffeeCup ac={ac}/>
  </>
}

// ── B: Mouse Wrangler ──────────────────────────────────────────────────────
function MouseWrangler({ ac }: { ac: string }) {
  return <>
    <Shadow/>
    <Tail/>
    <g className="ccv-cat">
      <ellipse cx="200" cy="208" rx="92" ry="76" fill="#f0b271"/>
      <ellipse cx="200" cy="224" rx="58" ry="54" fill="#fde7cf"/>
      <path d="M200 162 v22 M170 172 q6 14 10 24 M230 172 q-6 14 -10 24" stroke="#d98f4e" strokeWidth="6" strokeLinecap="round" fill="none" opacity=".8"/>
      <CommonEars/>
      <circle cx="200" cy="120" r="72" fill="#f0b271"/>
      <path d="M200 54 V78 M174 60 l7 18 M226 60 l-7 18" stroke="#d98f4e" strokeWidth="6" strokeLinecap="round" fill="none"/>
      <CommonFace eyeRx={10.5} eyeRy={13.5} eyeCy={120}/>
    </g>
    <Desk/>
    {/* mouse cable */}
    <path d="M210 246 q-30 -16 -58 -4" fill="none" stroke="#b9b0c2" strokeWidth="3" strokeLinecap="round" opacity=".7"/>
    {/* mouse body */}
    <ellipse cx="212" cy="252" rx="25" ry="16" fill="#ece6ee"/>
    <path d="M212 237 a25 16 0 0 0 -15 6 L212 252 Z" fill="#dcd4e2"/>
    <rect x="209.5" y="240" width="5" height="9" rx="2.5" fill={ac}/>
    {/* right arm */}
    <path d="M236 198 C250 222 234 246 232 250" fill="none" stroke="#f0b271" strokeWidth="22" strokeLinecap="round"/>
    <g><ellipse cx="232" cy="250" rx="15" ry="10.5" fill="#fde7cf"/><path d="M226 250 v6 M232 251 v6 M238 250 v6" stroke="#e6cda9" strokeWidth="1.8" strokeLinecap="round"/></g>
    {/* left arm */}
    <path d="M164 198 C150 222 170 246 192 250" fill="none" stroke="#f0b271" strokeWidth="22" strokeLinecap="round"/>
    <g><ellipse cx="192" cy="250" rx="15" ry="10.5" fill="#fde7cf"/><path d="M186 250 v6 M192 251 v6 M198 250 v6" stroke="#e6cda9" strokeWidth="1.8" strokeLinecap="round"/></g>
    {/* motion arc */}
    <path className="ccv-spark" d="M196 230 q10 -9 22 -5" fill="none" stroke={ac} strokeWidth="3" strokeLinecap="round" opacity=".6"/>
  </>
}

// ── C: Beanie Coder ────────────────────────────────────────────────────────
function BeanieCoder({ ac }: { ac: string }) {
  return <>
    <Shadow/>
    <Tail/>
    <g className="ccv-cat">
      <path d="M168 196 C150 214 146 236 158 252" fill="none" stroke="#f0b271" strokeWidth="24" strokeLinecap="round"/>
      <path d="M232 196 C250 214 254 236 242 252" fill="none" stroke="#f0b271" strokeWidth="24" strokeLinecap="round"/>
      <ellipse cx="200" cy="208" rx="92" ry="76" fill="#f0b271"/>
      <ellipse cx="200" cy="224" rx="58" ry="54" fill="#fde7cf"/>
      {/* scarf */}
      <path d="M150 176 q50 26 100 0 l-4 16 q-46 22 -92 0 Z" fill={ac}/>
      <path d="M236 190 q10 18 4 34 l16 -2 q4 -18 -4 -32 Z" fill="#897bdf"/>
      <path d="M200 162 v16" stroke="#d98f4e" strokeWidth="6" strokeLinecap="round" fill="none" opacity=".7"/>
      <CommonEars/>
      <circle cx="200" cy="120" r="72" fill="#f0b271"/>
      {/* beanie hat */}
      <path d="M160 72 Q200 26 240 72 Q200 86 160 72 Z" fill={ac}/>
      <path d="M165 66 Q200 36 235 66" fill="none" stroke="#b3a8f7" strokeWidth="3" opacity=".7"/>
      <path d="M183 60 Q200 40 217 60" fill="none" stroke="#b3a8f7" strokeWidth="3" opacity=".7"/>
      <circle cx="200" cy="34" r="10" fill="#c3bafa"/>
      <path d="M146 92 Q200 112 254 92 L254 104 Q200 126 146 104 Z" fill="#7d6ee0"/>
      <CommonFace/>
    </g>
    <Desk/>
    <LaptopScreen ac={ac}/>
    <CoffeeCup ac={ac}/>
  </>
}

// ── D: Wizard Debugger ─────────────────────────────────────────────────────
function WizardDebugger({ ac }: { ac: string }) {
  return <>
    <Shadow/>
    {/* background stars */}
    <g fill="#f5cf6b">
      <circle className="ccv-twinkle" cx="92" cy="70" r="2.4"/>
      <circle className="ccv-twinkle" cx="320" cy="58" r="2.8" style={{animationDelay:'.7s'}}/>
      <circle className="ccv-twinkle" cx="300" cy="120" r="2" style={{animationDelay:'1.3s'}}/>
      <circle className="ccv-twinkle" cx="80" cy="140" r="2" style={{animationDelay:'1s'}}/>
    </g>
    <Tail/>
    <g className="ccv-cat">
      <ellipse cx="200" cy="208" rx="92" ry="76" fill="#f0b271"/>
      <ellipse cx="200" cy="224" rx="58" ry="54" fill="#fde7cf"/>
      {/* robe collar */}
      <path d="M150 176 q50 24 100 0 l-6 18 q-44 20 -88 0 Z" fill="#3a2f6e"/>
      <circle cx="180" cy="186" r="2.2" fill="#f5cf6b"/>
      <circle cx="200" cy="192" r="2.2" fill="#f5cf6b"/>
      <circle cx="220" cy="186" r="2.2" fill="#f5cf6b"/>
      <CommonEars/>
      <circle cx="200" cy="120" r="72" fill="#f0b271"/>
      {/* wizard hat */}
      <path d="M158 78 Q200 90 242 76 L210 -12 Q202 -16 196 -8 Z" fill="#5b3f9e"/>
      <path d="M178 30 l5 -10 5 10 -5 6 z" fill="#f5cf6b"/>
      <circle cx="196" cy="54" r="3" fill="#f5cf6b"/>
      <circle cx="214" cy="40" r="2.4" fill="#f5cf6b"/>
      <ellipse cx="200" cy="78" rx="60" ry="13" fill="#34285a"/>
      <circle className="ccv-twinkle" cx="205" cy="-13" r="6" fill="#f5cf6b"/>
      <CommonFace/>
    </g>
    <Desk/>
    {/* glow + screen */}
    <ellipse className="ccv-glow" cx="200" cy="196" rx="60" ry="22" fill={ac} style={{filter:'blur(10px)'}}/>
    <rect x="150" y="200" width="100" height="56" rx="13" fill={ac} opacity=".22" style={{filter:'blur(7px)'}}/>
    <rect x="156" y="202" width="88" height="50" rx="11" fill="#2a2f3c"/>
    {/* bug on screen */}
    <g>
      <ellipse cx="200" cy="226" rx="9" ry="7" fill="#ef6b7b"/>
      <path d="M200 219 v-4 M191 222 l-5 -3 M209 222 l5 -3 M191 230 l-5 3 M209 230 l5 3 M200 233 v4" stroke="#ef6b7b" strokeWidth="2" strokeLinecap="round"/>
    </g>
    {/* sparkle on screen */}
    <path className="ccv-spark" d="M176 210 l2 -6 2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 z" fill="#f5cf6b"/>
    <path className="ccv-spark" d="M96 92 l1.8 -6 1.8 6 6 1.8 -6 1.8 -1.8 6 -1.8 -6 -6 -1.8 z" fill="#f5cf6b" style={{animationDelay:'.8s'}}/>
    <path d="M150 250 L250 250 L262 270 L138 270 Z" fill="#20242f"/>
    {/* right arm on laptop */}
    <path d="M236 200 C252 222 250 244 234 250" fill="none" stroke="#f0b271" strokeWidth="22" strokeLinecap="round"/>
    <g className="ccv-pawA" style={{transformOrigin:'234px 250px'}}>
      <ellipse cx="234" cy="250" rx="16" ry="11" fill="#fde7cf"/>
      <path d="M227 250 v6 M234 251 v6 M241 250 v6" stroke="#e6cda9" strokeWidth="1.8" strokeLinecap="round"/>
    </g>
    {/* wand arm */}
    <g className="ccv-wave" style={{transformOrigin:'170px 200px'}}>
      <path d="M170 200 C150 182 138 166 130 152" fill="none" stroke="#f0b271" strokeWidth="22" strokeLinecap="round"/>
      <ellipse cx="128" cy="150" rx="15" ry="11" fill="#fde7cf"/>
      <path d="M124 146 L104 112" stroke="#7a5a36" strokeWidth="5" strokeLinecap="round"/>
      <path d="M104 112 l4 -12 4 12 12 4 -12 4 -4 12 -4 -12 -12 -4 z" fill="#f5cf6b"/>
    </g>
  </>
}

// ── Public component ───────────────────────────────────────────────────────

interface CodingCatVariantProps {
  variant: CatVariant
  size?: number
  accent?: string
}

const DEFAULT_ACCENTS: Record<CatVariant, string> = {
  typist: '#5cc3aa',
  mouse:  '#f0936e',
  beanie: '#9a8cf0',
  wizard: '#b07ff0',
}

export const CAT_VARIANT_META: Record<CatVariant, { label: string; desc: string; bg: string }> = {
  typist: { label: 'Lo-Fi Typist',     desc: 'Đội tai nghe, gõ code theo beat ☕', bg: 'radial-gradient(120% 110% at 50% 28%,#2a2740 0%,#1a1826 58%,#14121c 100%)' },
  mouse:  { label: 'Mouse Wrangler',   desc: 'Mải nghịch... con chuột 🖱️',         bg: 'radial-gradient(120% 110% at 50% 28%,#3a2530 0%,#211722 58%,#15101a 100%)' },
  beanie: { label: 'Beanie Coder',     desc: 'Đội mũ len, ấm cúng 🧶',            bg: 'radial-gradient(120% 110% at 50% 28%,#2b2840 0%,#1b1828 58%,#14121c 100%)' },
  wizard: { label: 'Wizard Debugger',  desc: 'Vung đũa phép, diệt bug 🐛✨',       bg: 'radial-gradient(120% 110% at 50% 28%,#2c2350 0%,#1a1530 58%,#120f1f 100%)' },
}

export function CodingCatVariant({ variant, size = 200, accent }: CodingCatVariantProps) {
  const ac = accent ?? DEFAULT_ACCENTS[variant]
  return (
    <div style={{ position: 'relative' }}>
      <style>{CSS}</style>
      <svg width={size} viewBox="0 0 400 360" style={{ display: 'block', overflow: 'visible' }}>
        {variant === 'typist' && <Typist ac={ac} />}
        {variant === 'mouse'  && <MouseWrangler ac={ac} />}
        {variant === 'beanie' && <BeanieCoder ac={ac} />}
        {variant === 'wizard' && <WizardDebugger ac={ac} />}
      </svg>
    </div>
  )
}
