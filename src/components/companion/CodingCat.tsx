'use client'

import type { CompanionMood } from '@/lib/gameStore'

interface CodingCatProps {
  mood?: CompanionMood
  size?: number
  accent?: string
}

export function CodingCat({ mood = 'idle', size = 160, accent = '#a78bfa' }: CodingCatProps) {
  const isHappy   = mood === 'happy' || mood === 'excited' || mood === 'level_up'
  const isSleepy  = mood === 'sleeping'
  const isTyping  = mood === 'typing'
  const hasCoffee = mood === 'coffee'

  return (
    <div style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}>
      <style>{`
        @keyframes fl_float  { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-7px)}  }
        @keyframes fl_bounce { 0%,100%{transform:translateY(0)}   40%{transform:translateY(-14px)} }
        @keyframes fl_wagL   { 0%,100%{transform:rotate(0deg) translateX(0)}   50%{transform:rotate(-18deg) translateX(-3px)} }
        @keyframes fl_wagR   { 0%,100%{transform:rotate(0deg) translateX(0)}   50%{transform:rotate(18deg)  translateX(3px)}  }
        @keyframes fl_pawL   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes fl_pawR   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes fl_blink  { 0%,88%,100%{transform:scaleY(1)} 92%{transform:scaleY(0.08)} }
        @keyframes fl_zzz    { 0%{opacity:1;transform:translate(0,0) scale(0.8)} 100%{opacity:0;transform:translate(8px,-22px) scale(1.2)} }
        @keyframes fl_spark  { 0%,100%{opacity:0;transform:scale(0) rotate(0deg)} 50%{opacity:1;transform:scale(1) rotate(180deg)} }
        @keyframes fl_orbit  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fl_steam  { 0%,100%{opacity:0;transform:translateY(0) scaleX(1)}  50%{opacity:0.7;transform:translateY(-8px) scaleX(1.3)} }
        @keyframes fl_cursor { 0%,100%{opacity:1} 50%{opacity:0} }
        .cat-body-idle    { animation: fl_float  3s ease-in-out infinite; }
        .cat-body-typing  { animation: fl_float  2s ease-in-out infinite; }
        .cat-body-happy   { animation: fl_bounce 0.55s ease-in-out infinite; }
        .cat-body-excited { animation: fl_bounce 0.35s ease-in-out infinite; }
        .cat-body-level_up{ animation: fl_bounce 0.42s ease-in-out infinite; }
        .cat-body-sleeping{ animation: fl_float  5s ease-in-out infinite; }
        .cat-body-coffee  { animation: fl_float  4s ease-in-out infinite; }
        .cat-tail-idle    { animation: fl_wagL   3s ease-in-out infinite; transform-origin:8px 8px; }
        .cat-tail-happy   { animation: fl_wagR   0.5s ease-in-out infinite; transform-origin:8px 8px; }
        .cat-tail-excited { animation: fl_wagR   0.3s ease-in-out infinite; transform-origin:8px 8px; }
        .cat-pawL-typing  { animation: fl_pawL   0.22s ease-in-out infinite; }
        .cat-pawR-typing  { animation: fl_pawR   0.22s ease-in-out infinite 0.11s; }
        .cat-eyes         { animation: fl_blink  4.5s ease-in-out infinite; }
        .zzz1 { animation: fl_zzz 2.2s ease-in-out infinite; }
        .zzz2 { animation: fl_zzz 2.2s ease-in-out infinite 0.74s; }
        .zzz3 { animation: fl_zzz 2.2s ease-in-out infinite 1.48s; }
        .spark-orbit { animation: fl_orbit 2.2s linear infinite; transform-origin:50% 50%; }
        .spark1 { animation: fl_spark 0.7s ease-in-out infinite; }
        .spark2 { animation: fl_spark 0.7s ease-in-out infinite 0.23s; }
        .spark3 { animation: fl_spark 0.7s ease-in-out infinite 0.46s; }
        .steam1 { animation: fl_steam 1.8s ease-in-out infinite; }
        .steam2 { animation: fl_steam 1.8s ease-in-out infinite 0.6s; }
        .cursor { animation: fl_cursor 1.1s step-end infinite; }
      `}</style>

      <svg viewBox="0 0 110 130" width={size} height={size} style={{ overflow: 'visible' }}>

        {/* ── Sparkle orbit (level_up) ── */}
        {mood === 'level_up' && (
          <g className="spark-orbit" style={{ transformOrigin: '55px 62px' }}>
            <circle className="spark1" cx="55" cy="18" r="5"  fill={accent} />
            <circle className="spark2" cx="92" cy="62" r="4"  fill="#fbbf24" />
            <circle className="spark3" cx="55" cy="106" r="5" fill={accent} />
            <circle className="spark1" cx="18" cy="62" r="4"  fill="#fbbf24" />
          </g>
        )}

        {/* ── Cat body group (animated by mood) ── */}
        <g className={`cat-body-${mood}`}>

          {/* Tail */}
          <g className={`cat-tail-${isHappy ? 'happy' : 'idle'}`}
            style={{ transformOrigin: '82px 88px' }}>
            <path d="M82 90 Q105 78 100 56" stroke="#5c5c70" strokeWidth="10" fill="none" strokeLinecap="round"/>
            <circle cx="100" cy="54" r="7" fill="#6e6e82"/>
          </g>

          {/* Body */}
          <ellipse cx="55" cy="90" rx="30" ry="26" fill="#4a4a5e"/>

          {/* Laptop base (keyboard) */}
          <rect x="14" y="113" rx="4" ry="4" width="82" height="13" fill="#22223a"/>
          {/* Laptop hinge / screen back */}
          <rect x="20" y="100" rx="3" ry="3" width="70" height="15" fill="#1a1a2e"/>
          {/* Screen glow */}
          <rect x="22" y="102" rx="2" ry="2" width="66" height="11" fill="#0d1130" opacity="0.9"/>

          {/* Screen content when typing */}
          {isTyping && (
            <g>
              <rect x="25" y="104" rx="1" width="28" height="2" fill="#4ade80" opacity="0.7"/>
              <rect x="25" y="108" rx="1" width="18" height="2" fill="#4ade80" opacity="0.5"/>
              <rect x="44" y="108" rx="1" width="2" height="2" fill="white" className="cursor"/>
            </g>
          )}

          {/* Left paw */}
          <g className={isTyping ? 'cat-pawL-typing' : ''}>
            <ellipse cx="34" cy="115" rx="14" ry="8" fill="#5a5a6e"/>
            <line x1="27" y1="120" x2="29" y2="123" stroke="#7a7a8e" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="34" y1="121" x2="34" y2="124" stroke="#7a7a8e" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="41" y1="120" x2="39" y2="123" stroke="#7a7a8e" strokeWidth="1.5" strokeLinecap="round"/>
          </g>

          {/* Right paw */}
          <g className={isTyping ? 'cat-pawR-typing' : ''}>
            <ellipse cx="76" cy="115" rx="14" ry="8" fill="#5a5a6e"/>
            <line x1="69" y1="120" x2="71" y2="123" stroke="#7a7a8e" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="76" y1="121" x2="76" y2="124" stroke="#7a7a8e" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="83" y1="120" x2="81" y2="123" stroke="#7a7a8e" strokeWidth="1.5" strokeLinecap="round"/>
          </g>

          {/* Head */}
          <circle cx="55" cy="50" r="28" fill="#4a4a5e"/>

          {/* Left ear */}
          <polygon points="30,36 34,8 48,32"  fill="#4a4a5e"/>
          <polygon points="32,34 35,12 46,31" fill="#d4829a"/>
          {/* Right ear */}
          <polygon points="80,36 76,8 62,32"  fill="#4a4a5e"/>
          <polygon points="78,34 75,12 64,31" fill="#d4829a"/>

          {/* Eyes */}
          {isSleepy ? (
            <>
              <path d="M42 48 Q49 44 56 48" stroke="#777790" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <path d="M54 48 Q61 44 68 48" stroke="#777790" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            </>
          ) : isHappy ? (
            <>
              <path d="M41 52 Q48 44 55 52" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M55 52 Q62 44 69 52" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </>
          ) : (
            <g className="cat-eyes">
              <ellipse cx="46" cy="49" rx="9"  ry="10" fill="white"/>
              <ellipse cx="64" cy="49" rx="9"  ry="10" fill="white"/>
              <circle  cx="47" cy="50" r="6"   fill="#1a1a2e"/>
              <circle  cx="65" cy="50" r="6"   fill="#1a1a2e"/>
              {/* Iris */}
              <circle  cx="47" cy="50" r="4"   fill={accent} opacity="0.6"/>
              <circle  cx="65" cy="50" r="4"   fill={accent} opacity="0.6"/>
              {/* Shine */}
              <circle  cx="50" cy="47" r="2.2" fill="white"/>
              <circle  cx="68" cy="47" r="2.2" fill="white"/>
            </g>
          )}

          {/* Nose */}
          <ellipse cx="55" cy="60" rx="4" ry="3" fill="#d4829a"/>
          {/* Mouth */}
          {isSleepy
            ? <path d="M51 64 Q55 67 59 64" stroke="#9a7a80" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            : isHappy
            ? <path d="M50 63 Q55 68 60 63" stroke="#9a7a80" strokeWidth="2"   fill="none" strokeLinecap="round"/>
            : <path d="M51 64 Q55 67 59 64" stroke="#9a7a80" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          }

          {/* Whiskers */}
          <line x1="16" y1="57" x2="42" y2="60" stroke="#aaa" strokeWidth="1"   opacity="0.6"/>
          <line x1="16" y1="62" x2="42" y2="62" stroke="#aaa" strokeWidth="1"   opacity="0.6"/>
          <line x1="16" y1="67" x2="42" y2="64" stroke="#aaa" strokeWidth="0.8" opacity="0.5"/>
          <line x1="94" y1="57" x2="68" y2="60" stroke="#aaa" strokeWidth="1"   opacity="0.6"/>
          <line x1="94" y1="62" x2="68" y2="62" stroke="#aaa" strokeWidth="1"   opacity="0.6"/>
          <line x1="94" y1="67" x2="68" y2="64" stroke="#aaa" strokeWidth="0.8" opacity="0.5"/>

          {/* Coffee cup (coffee mood) */}
          {hasCoffee && (
            <g>
              {/* Cup */}
              <rect x="62" y="68" rx="3" ry="3" width="24" height="22" fill="#7c4a26"/>
              <rect x="64" y="66" rx="2" ry="2" width="20" height="5"  fill="#a06432"/>
              {/* Handle */}
              <path d="M86 76 Q93 76 93 82 Q93 88 86 88" stroke="#a06432" strokeWidth="3" fill="none" strokeLinecap="round"/>
              {/* Steam */}
              <path className="steam1" d="M68 64 Q70 58 68 52" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path className="steam2" d="M74 62 Q76 56 74 50" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path className="steam1" d="M80 64 Q82 58 80 52" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </g>
          )}

          {/* Headband when level_up */}
          {mood === 'level_up' && (
            <rect x="30" y="30" rx="3" ry="3" width="50" height="6" fill={accent} opacity="0.85"/>
          )}

        </g>

        {/* ── ZZZ bubbles (sleeping) — outside main group ── */}
        {isSleepy && (
          <>
            <text className="zzz1" x="79" y="42" fill="#9090a8" fontSize="13" fontWeight="bold" fontFamily="system-ui">z</text>
            <text className="zzz2" x="89" y="28" fill="#9090a8" fontSize="17" fontWeight="bold" fontFamily="system-ui">z</text>
            <text className="zzz3" x="97" y="14" fill="#9090a8" fontSize="21" fontWeight="bold" fontFamily="system-ui">Z</text>
          </>
        )}

        {/* ── Star emojis (level_up) ── */}
        {mood === 'level_up' && (
          <>
            <text x="6"  y="30" fontSize="15" className="zzz1">⭐</text>
            <text x="88" y="28" fontSize="13" className="zzz2">✨</text>
            <text x="90" y="100" fontSize="11" className="zzz3">⭐</text>
          </>
        )}
      </svg>
    </div>
  )
}
