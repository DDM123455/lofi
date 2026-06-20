'use client'

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { SCENES, getSceneById } from '@/lib/scenes'
import { WeatherMode, type DetectedWeather } from '@/components/workspace/WeatherMode'
import { getDayNightConfig } from '@/hooks/useDayNight'
import { BG_PRESETS, type BgPreset } from '@/lib/backgrounds'
import { LOFI_STREAMS, AMBIENT_SOUNDS, AMBIENT_ICONS } from '@/lib/lofiStreams'

// ─────────────────────────────────────────────────────────────────────
// DATA — imported from shared libs
// ─────────────────────────────────────────────────────────────────────

const ACCENT_COLORS = [
  { id: 'violet', label: 'Violet', hex: '#a78bfa' },
  { id: 'pink',   label: 'Pink',   hex: '#f472b6' },
  { id: 'cyan',   label: 'Cyan',   hex: '#22d3ee' },
  { id: 'amber',  label: 'Amber',  hex: '#fbbf24' },
  { id: 'green',  label: 'Green',  hex: '#4ade80' },
  { id: 'rose',   label: 'Rose',   hex: '#fb7185' },
]

const AFFILIATE_LINKS = [
  { label: 'Đèn LED Lofi bàn làm việc', href: '#', icon: '💡', badge: 'Hot' },
  { label: 'Template Notion Premium',    href: '#', icon: '📓', badge: 'New' },
  { label: 'Tai nghe Studio chất lượng', href: '#', icon: '🎧', badge: null  },
  { label: 'Sàn Crypto — Nhận thưởng',  href: '#', icon: '₿',  badge: '$25' },
]

// ─────────────────────────────────────────────────────────────────────
// PINK NOISE (Voss-McCartney) — fallback khi không có file .mp3
// ─────────────────────────────────────────────────────────────────────

function makePinkBuffer(ctx: AudioContext, secs = 8): AudioBuffer {
  const n = Math.floor(ctx.sampleRate * secs)
  const buf = ctx.createBuffer(2, n, ctx.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch)
    let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0
    for (let i = 0; i < n; i++) {
      const w = Math.random()*2-1
      b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759
      b2=0.96900*b2+w*0.1538520; b3=0.86650*b3+w*0.3104856
      b4=0.55000*b4+w*0.5329522; b5=-0.7616*b5-w*0.0168980
      d[i]=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.11; b6=w*0.115926
    }
  }
  return buf
}

type SynthNode = { gain: GainNode; stop: () => void }

function buildSynthGraph(ctx: AudioContext, id: string): SynthNode {
  const masterGain = ctx.createGain(); masterGain.gain.value = 0; masterGain.connect(ctx.destination)
  const stops: Array<() => void> = []

  const ns = (s=8) => { const src=ctx.createBufferSource(); src.buffer=makePinkBuffer(ctx,s); src.loop=true; return src }
  const flt = (t: BiquadFilterType, f: number, q=1) => { const n=ctx.createBiquadFilter(); n.type=t; n.frequency.value=f; n.Q.value=q; return n }
  const gn = (v: number) => { const g=ctx.createGain(); g.gain.value=v; return g }
  const lfo = (r: number, d: number, tgt: AudioParam) => { const o=ctx.createOscillator(),g=ctx.createGain(); o.frequency.value=r; g.gain.value=d; o.connect(g); g.connect(tgt); o.start(); stops.push(()=>{try{o.stop()}catch(_){}}) }
  const go = (src: AudioBufferSourceNode) => { src.start(); stops.push(()=>{try{src.stop()}catch(_){}}) }

  if (id==='rain') {
    const s1=ns(8),hp=flt('highpass',600),lp=flt('lowpass',8000)
    s1.connect(hp); hp.connect(lp); lp.connect(masterGain); go(s1)
    const s2=ns(6),hp2=flt('highpass',4000),g2=gn(0.25)
    s2.connect(hp2); hp2.connect(g2); g2.connect(masterGain); go(s2)
  } else if (id==='wave') {
    const s=ns(8),lp=flt('lowpass',420),cg=gn(0.65)
    s.connect(lp); lp.connect(cg); cg.connect(masterGain); go(s)
    lfo(0.10,230,lp.frequency); lfo(0.07,130,lp.frequency); lfo(0.10,0.22,cg.gain)
  } else if (id==='cafe') {
    const cg=gn(0.7); cg.connect(masterGain)
    const s1=ns(8),bp1=flt('bandpass',550,0.3),g1=gn(1.0); s1.connect(bp1); bp1.connect(g1); g1.connect(cg); go(s1)
    const s2=ns(7),bp2=flt('bandpass',2100,0.25),g2=gn(0.35); s2.connect(bp2); bp2.connect(g2); g2.connect(cg); go(s2)
    const s3=ns(5),hp3=flt('highpass',3800),g3=gn(0.0); s3.connect(hp3); hp3.connect(g3); g3.connect(cg); go(s3); lfo(0.35,0.06,g3.gain)
    lfo(0.13,0.18,cg.gain)
  } else if (id==='fire') {
    const cg=gn(0.65); cg.connect(masterGain)
    const s1=ns(8),lp1=flt('lowpass',260); s1.connect(lp1); lp1.connect(cg); go(s1)
    const s2=ns(5),bp=flt('bandpass',1500,0.6),crk=gn(0.04); s2.connect(bp); bp.connect(crk); crk.connect(masterGain); go(s2)
    lfo(8.7,0.18,crk.gain); lfo(13.1,0.11,crk.gain); lfo(0.18,0.20,cg.gain)
  } else if (id==='wind') {
    const s=ns(8),lp=flt('lowpass',520),cg=gn(0.6)
    s.connect(lp); lp.connect(cg); cg.connect(masterGain); go(s)
    lfo(0.04,270,lp.frequency); lfo(0.03,160,lp.frequency); lfo(0.04,0.22,cg.gain)
  } else if (id==='thunder') {
    const s=ns(8),lp=flt('lowpass',140),cg=gn(0.5); s.connect(lp); lp.connect(cg); cg.connect(masterGain); go(s)
    lfo(0.05,0.35,cg.gain)
    const s2=ns(6),lp2=flt('lowpass',80),g2=gn(0.3); s2.connect(lp2); lp2.connect(g2); g2.connect(masterGain); go(s2)
  } else {
    // forest / city / generic: bandpass pink noise
    const s=ns(8),bp=flt('bandpass',800,0.4),cg=gn(0.7)
    s.connect(bp); bp.connect(cg); cg.connect(masterGain); go(s)
  }

  return { gain: masterGain, stop: () => stops.forEach(f=>f()) }
}

// ─────────────────────────────────────────────────────────────────────
// HYBRID AUDIO ENGINE: HTML5 Audio (real files) + Synth fallback
// ─────────────────────────────────────────────────────────────────────

function useAmbientEngine() {
  const ctxRef    = useRef<AudioContext | null>(null)
  const html5Ref  = useRef<Record<string, HTMLAudioElement>>({})
  const synthRef  = useRef<Record<string, SynthNode>>({})
  const modeRef   = useRef<Record<string, 'html5'|'synth'>>({})

  const ensureCtx = () => {
    if (!ctxRef.current)
      ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    return ctxRef.current
  }

  const start = (id: string, filePath: string) => {
    if (synthRef.current[id]) return

    // MUST create AudioContext here, synchronously within user gesture
    const ctx = ensureCtx()
    ctx.resume().catch(() => {})

    // Start synthesis immediately — sound plays right now
    synthRef.current[id] = buildSynthGraph(ctx, id)
    modeRef.current[id] = 'synth'

    // Also try HTML5 in background; if file exists, cross-fade and switch
    const audio = new Audio(filePath)
    audio.loop = true; audio.volume = 0; audio.preload = 'auto'
    audio.addEventListener('canplaythrough', () => {
      const node = synthRef.current[id]
      if (node) {
        node.gain.gain.setTargetAtTime(0, ctx.currentTime, 0.3)
        setTimeout(() => { try { node.stop() } catch(_){} ; delete synthRef.current[id] }, 600)
      }
      modeRef.current[id] = 'html5'
      html5Ref.current[id] = audio
      audio.play().catch(() => {})
    }, { once: true })
    audio.load()
  }

  const setVolume = (id: string, vol: number) => {
    const scaled = vol * 0.6
    if (html5Ref.current[id]) { html5Ref.current[id].volume = scaled; return }
    const node = synthRef.current[id]
    const ctx  = ctxRef.current
    if (node && ctx) node.gain.gain.setTargetAtTime(scaled, ctx.currentTime, 0.08)
  }

  const stop = (id: string) => {
    if (html5Ref.current[id]) {
      html5Ref.current[id].pause()
      html5Ref.current[id].src = ''
      delete html5Ref.current[id]
    }
    if (synthRef.current[id]) {
      const ctx = ctxRef.current
      if (ctx) {
        synthRef.current[id].gain.gain.setTargetAtTime(0, ctx.currentTime, 0.08)
        setTimeout(() => { synthRef.current[id]?.stop(); delete synthRef.current[id] }, 300)
      } else {
        synthRef.current[id].stop(); delete synthRef.current[id]
      }
    }
  }

  const resume = () => ctxRef.current?.state === 'suspended' && ctxRef.current.resume()

  const getMode = (id: string) => modeRef.current[id]

  useEffect(() => () => {
    Object.values(html5Ref.current).forEach(a => { a.pause(); a.src='' })
    Object.values(synthRef.current).forEach(n => n.stop())
    ctxRef.current?.close()
  }, [])

  return { start, stop, setVolume, resume, getMode }
}

// ─────────────────────────────────────────────────────────────────────
// YOUTUBE HOOK
// ─────────────────────────────────────────────────────────────────────

function useYouTube(videoId: string, enabled: boolean, volume: number) {
  const ref    = useRef<HTMLDivElement>(null)
  const player = useRef<any>(null)
  const [status, setStatus] = useState<'idle'|'loading'|'ready'|'blocked'>('idle')

  useEffect(() => {
    if (!enabled) { try { player.current?.destroy() } catch(_){} ; player.current = null; setStatus('idle'); return }
    setStatus('loading')
    let dead = false
    const tid = setTimeout(() => { if (!dead) setStatus('blocked') }, 8000)

    const create = () => {
      if (dead || !ref.current) return
      try {
        player.current = new (window as any).YT.Player(ref.current, {
          height:'1', width:'1', videoId,
          playerVars: { autoplay:1, controls:0, disablekb:1, playsinline:1 },
          events: {
            onReady: (e:any) => { clearTimeout(tid); setStatus('ready'); e.target.setVolume(volume*100); e.target.playVideo() },
            onError: () => { clearTimeout(tid); setStatus('blocked') },
          },
        })
      } catch(_) { setStatus('blocked') }
    }

    if ((window as any).YT?.Player) { create() }
    else {
      if (!document.getElementById('yt-api')) {
        const s = document.createElement('script'); s.id='yt-api'; s.src='https://www.youtube.com/iframe_api'
        s.onerror = () => setStatus('blocked'); document.head.appendChild(s)
      }
      const prev = (window as any).onYouTubeIframeAPIReady
      ;(window as any).onYouTubeIframeAPIReady = () => { prev?.(); create() }
    }
    return () => { dead=true; clearTimeout(tid) }
  }, [enabled, videoId]) // eslint-disable-line

  useEffect(() => {
    if (player.current?.setVolume && status==='ready') player.current.setVolume(volume*100)
  }, [volume, status])

  return { ref, status }
}

// ─────────────────────────────────────────────────────────────────────
// POMODORO HOOK
// ─────────────────────────────────────────────────────────────────────

function usePomodoro(workMins=25, breakMins=5) {
  const [phase, setPhase] = useState<'work'|'break'>('work')
  const [secs, setSecs]   = useState(workMins*60)
  const [on, setOn]       = useState(false)

  const total = phase==='work' ? workMins*60 : breakMins*60
  const mm = String(Math.floor(secs/60)).padStart(2,'0')
  const ss = String(secs%60).padStart(2,'0')
  const progress = secs/total

  useEffect(() => {
    if (!on) return
    const id = setInterval(() => setSecs(s => {
      if (s<=1) { setPhase(p=>p==='work'?'break':'work'); setSecs(phase==='work'?breakMins*60:workMins*60); return 0 }
      return s-1
    }), 1000)
    return () => clearInterval(id)
  }, [on, phase, workMins, breakMins])

  const reset = () => { setOn(false); setPhase('work'); setSecs(workMins*60) }

  return { mm, ss, on, toggle:()=>setOn(v=>!v), reset, phase, progress, total }
}

// ─────────────────────────────────────────────────────────────────────
// CLOCK HELPERS
// ─────────────────────────────────────────────────────────────────────
function AnalogClockPreview({ now, size = 80, accent }: { now: Date; size?: number; accent: string }) {
  const cx=size/2,cy=size/2,r=size/2-3
  const h=(now.getHours()%12+now.getMinutes()/60)/12*2*Math.PI-Math.PI/2
  const m=(now.getMinutes()+now.getSeconds()/60)/60*2*Math.PI-Math.PI/2
  const s=now.getSeconds()/60*2*Math.PI-Math.PI/2
  return(
    <svg width={size} height={size}>
      <circle cx={cx} cy={cy} r={r} fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.15)" strokeWidth={1.5}/>
      {Array.from({length:12},(_,i)=>{const a=i/12*2*Math.PI;return<line key={i} x1={cx+Math.cos(a)*(r-4)} y1={cy+Math.sin(a)*(r-4)} x2={cx+Math.cos(a)*(r-1)} y2={cy+Math.sin(a)*(r-1)} stroke="rgba(255,255,255,0.3)" strokeWidth={i%3===0?1.5:0.7}/>})}
      <line x1={cx} y1={cy} x2={cx+Math.cos(h)*r*0.52} y2={cy+Math.sin(h)*r*0.52} stroke="white" strokeWidth={2.5} strokeLinecap="round"/>
      <line x1={cx} y1={cy} x2={cx+Math.cos(m)*r*0.76} y2={cy+Math.sin(m)*r*0.76} stroke="white" strokeWidth={1.5} strokeLinecap="round"/>
      <line x1={cx} y1={cy} x2={cx+Math.cos(s)*r*0.86} y2={cy+Math.sin(s)*r*0.86} stroke={accent} strokeWidth={1} strokeLinecap="round"/>
      <circle cx={cx} cy={cy} r={2.5} fill={accent}/>
    </svg>
  )
}

function parseYtIdWorkspace(s: string): string | null {
  const m = s.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/)
  if (m) return m[1]
  if (/^[a-zA-Z0-9_-]{11}$/.test(s.trim())) return s.trim()
  return null
}

// ─────────────────────────────────────────────────────────────────────
// WORKSPACE PAGE
// ─────────────────────────────────────────────────────────────────────

function WorkspaceInner() {
  const searchParams = useSearchParams()

  // Load scene from URL param (?bgv=...&at=... from scenes page OR ?scene=id)
  const initialScene = useMemo(() => {
    const sceneId = searchParams.get('scene')
    if (sceneId) return getSceneById(sceneId)
    // Also support scene loaded via full workspace params (from sceneToWorkspaceUrl)
    return null
  }, [searchParams])

  // Audio state
  const [lofiOn, setLofiOn]   = useState(false)
  const [lofiId, setLofiId]   = useState(initialScene?.lofiStreamId ?? searchParams.get('ls') ?? 'lofi1')
  const [lofiVol, setLofiVol] = useState(initialScene?.lofiVolume ?? parseInt(searchParams.get('lv') ?? '60') / 100)
  const [ambVols, setAmbVols] = useState<Record<string,number>>(() => {
    if (initialScene) return Object.fromEntries(initialScene.ambientTracks.map(t => [t.id, t.volume]))
    const at = searchParams.get('at')
    if (!at) return {}
    return Object.fromEntries(at.split(',').map(e => { const [id,v]=e.split(':'); return [id, parseInt(v)/100] }))
  })
  // Must declare before activeYtId to avoid TDZ error
  const [customLofiInput, setCustomLofiInput] = useState('')
  const [customLofiId, setCustomLofiId] = useState('')
  const engine = useAmbientEngine()
  const activeYtId = lofiId === 'custom' ? customLofiId : (LOFI_STREAMS.find(t=>t.id===lofiId)?.youtubeId ?? 'jfKfPfyJRdk')
  const yt = useYouTube(activeYtId, lofiOn, lofiVol)

  // Visual state
  const initGif = initialScene?.gifUrl ?? decodeURIComponent(searchParams.get('bgv') ?? '')
  const initPreset = BG_PRESETS.find(g => g.url === initGif) ?? BG_PRESETS[0]
  const [bgPreset, setBgPreset]   = useState(initPreset)
  const [customGif, setCustomGif] = useState(initGif && !BG_PRESETS.find(g=>g.url===initGif) ? initGif : '')
  const [useCustom, setUseCustom] = useState(!!(initGif && !BG_PRESETS.find(g=>g.url===initGif)))
  const [overlay, setOverlay]     = useState(initialScene?.overlay ?? parseInt(searchParams.get('bgo') ?? '35'))
  const [blur, setBlur]           = useState(initialScene?.blur ?? 0)
  const [accent, setAccent]       = useState(initialScene?.accentColor ?? ('#' + (searchParams.get('ac') ?? 'a78bfa')))

  // Widgets
  const [showClock, setShowClock]   = useState(initialScene?.showClock ?? searchParams.get('clk') !== '0')
  const [clockSecs, setClockSecs]   = useState(false)
  const [clockStyle, setClockStyle] = useState<'digital'|'minimal'|'bold'|'analog'>('digital')
  const [showPom, setShowPom]       = useState(initialScene?.showPomodoro ?? searchParams.get('pom') === '1')
  const pom = usePomodoro()

  // UI state
  const [now, setNow]       = useState(new Date())
  const [copied, setCopied] = useState(false)
  const [tab, setTab]       = useState<'sounds'|'visual'|'widgets'|'scenes'>('sounds')
  const [sceneFlash, setSceneFlash] = useState<string|null>(null)

  // Focus Timer (full-screen countdown)
  const [focusMode, setFocusMode]   = useState(false)
  const [focusMins, setFocusMins]   = useState(25)
  const [focusSecs, setFocusSecs]   = useState(25 * 60)
  const [focusOn, setFocusOn]       = useState(false)
  const [focusDone, setFocusDone]   = useState(false)
  const focusTotal = focusMins * 60
  const audioCtxRef = useRef<AudioContext | null>(null)

  const playChime = useCallback(() => {
    try {
      const ctx = audioCtxRef.current ?? new (window.AudioContext || (window as any).webkitAudioContext)()
      audioCtxRef.current = ctx
      const freqs = [523, 659, 784, 1047]
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator(), g = ctx.createGain()
        osc.frequency.value = f; osc.type = 'sine'
        g.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.25)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.25 + 0.8)
        osc.connect(g); g.connect(ctx.destination)
        osc.start(ctx.currentTime + i * 0.25)
        osc.stop(ctx.currentTime + i * 0.25 + 0.8)
      })
    } catch(_) {}
  }, [])

  useEffect(() => {
    if (!focusOn) return
    if (focusSecs <= 0) { setFocusOn(false); setFocusDone(true); playChime(); return }
    const id = setInterval(() => setFocusSecs(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [focusOn, focusSecs, playChime])

  const resetFocus = () => { setFocusOn(false); setFocusSecs(focusMins * 60); setFocusDone(false) }

  // Task List
  const [showTasks, setShowTasks]   = useState(false)
  const [tasks, setTasks]           = useState<Array<{ id: number; text: string; done: boolean }>>([])
  const [taskInput, setTaskInput]   = useState('')
  const taskIdRef = useRef(1)

  const addTask = (text: string) => {
    if (!text.trim()) return
    setTasks(prev => [...prev, { id: taskIdRef.current++, text: text.trim(), done: false }])
    setTaskInput('')
  }
  const toggleTask = (id: number) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const removeTask = (id: number) => setTasks(prev => prev.filter(t => t.id !== id))

  // Apply a full scene by ID (used by Weather Mode)
  const applyScene = useCallback((sceneId: string) => {
    const scene = getSceneById(sceneId)
    if (!scene) return

    // Stop all current ambient
    Object.keys(ambVols).forEach(id => engine.stop(id))

    setLofiId(scene.lofiStreamId)
    setLofiVol(scene.lofiVolume)
    setOverlay(scene.overlay)
    setBlur(scene.blur)
    setAccent(scene.accentColor)
    setShowClock(scene.showClock)
    setShowPom(scene.showPomodoro)

    const preset = BG_PRESETS.find(g => g.url === scene.gifUrl)
    if (preset) { setBgPreset(preset); setUseCustom(false) }
    else { setCustomGif(scene.gifUrl); setUseCustom(true) }

    const newAmbs = Object.fromEntries(scene.ambientTracks.map(t => [t.id, t.volume]))
    setAmbVols(newAmbs)
    scene.ambientTracks.forEach(t => {
      const sound = AMBIENT_SOUNDS.find(s => s.id === t.id)
      if (sound) { engine.start(t.id, sound.file); setTimeout(() => engine.setVolume(t.id, t.volume), 100) }
    })

    setSceneFlash(scene.nameVi)
    setTimeout(() => setSceneFlash(null), 2500)
  }, [ambVols, engine])

  const [mounted, setMounted]           = useState(false)
  const [weatherDisplay, setWeatherDisplay] = useState<DetectedWeather|null>(null)
  const [dayNightDismissed, setDayNightDismissed] = useState(false)
  const dayNight = useMemo(() => getDayNightConfig(), [])
  const isFirstVisit = !searchParams.has('bgv') && !searchParams.has('scene') && !initialScene
  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { const t = setInterval(()=>setNow(new Date()),1000); return ()=>clearInterval(t) }, [])

  const toggleAmb = (id: string, file: string) => {
    if (ambVols[id] !== undefined) {
      // stopping — safe to call inside or outside setState
      engine.stop(id)
      setAmbVols(prev => { const n = {...prev}; delete n[id]; return n })
    } else {
      // starting — engine.start MUST be called directly here (user gesture context)
      engine.start(id, file)
      setTimeout(() => engine.setVolume(id, 0.5), 50)
      setAmbVols(prev => ({...prev, [id]: 0.5}))
    }
  }

  const setAmbVol = (id: string, vol: number) => {
    setAmbVols(prev=>({...prev,[id]:vol})); engine.setVolume(id,vol)
  }

  const activeGif = useCustom && customGif.trim() ? customGif.trim() : bgPreset.url

  const embedUrl = useMemo(() => {
    if (!mounted) return ''
    const p = new URLSearchParams()
    p.set('bgv', encodeURIComponent(activeGif))
    p.set('bgo', String(overlay))
    p.set('ls', lofiId); p.set('lv', String(Math.round(lofiVol*100)))
    if (blur > 0) p.set('bl', String(blur))
    const at = Object.entries(ambVols).map(([id,v])=>`${id}:${Math.round(v*100)}`).join(',')
    if (at) p.set('at', at)
    if (showClock) p.set('clk','1')
    if (showPom) p.set('pom','1')
    p.set('ac', accent.replace('#',''))
    if (weatherDisplay) {
      p.set('city', weatherDisplay.city)
      p.set('temp', String(weatherDisplay.temp))
      p.set('wdesc', weatherDisplay.desc)
      p.set('wemoji', weatherDisplay.emoji)
    }
    return `${window.location.origin}/embed?${p.toString()}`
  }, [mounted, activeGif, overlay, lofiOn, lofiId, lofiVol, ambVols, showClock, showPom, accent, weatherDisplay])

  const copyUrl = () => {
    navigator.clipboard?.writeText(embedUrl).then(()=>{setCopied(true); setTimeout(()=>setCopied(false),2000)})
  }

  const timeStr = mounted ? now.toLocaleTimeString('vi-VN', {
    hour:'2-digit', minute:'2-digit', ...(clockSecs ? { second:'2-digit' } : {})
  }) : '--:--'

  const pomCircum = 2*Math.PI*18
  const activeCount = Object.keys(ambVols).length

  return (
    <div style={{ fontFamily:"'Inter',system-ui,sans-serif", background:'#0a0b13', color:'#EDEDF4', minHeight:'100%' }}>
      <div style={{ maxWidth:1240, margin:'0 auto', padding:'20px 16px' }}>

        {/* ── HEADER ── */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18, flexWrap:'wrap', gap:10 }}>
          <div>
            <h1 style={{ margin:0, fontSize:20, fontWeight:600 }}>Widget Workspace</h1>
            <p style={{ margin:'3px 0 0', fontSize:12, color:'#6B6E80' }}>Tùy chỉnh → Xem trước → Sao chép link nhúng Notion</p>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <a href={embedUrl} target="_blank" rel="noreferrer" style={{ ...outlineBtn, fontSize:12, padding:'6px 12px', textDecoration:'none', display:'flex', alignItems:'center', gap:5 }}>
              🔗 Mở Widget
            </a>
            <button onClick={copyUrl} style={{ ...primaryBtn(copied), fontSize:12, padding:'6px 14px' }}>
              {copied ? '✓ Đã sao chép!' : '📋 Copy Link Nhúng'}
            </button>
          </div>
        </div>

        {/* ── Day/Night suggestion banner ── */}
        {mounted && isFirstVisit && !dayNightDismissed && (
          <div style={{ marginBottom:14, background:'linear-gradient(90deg,rgba(167,139,250,0.12),rgba(129,140,248,0.08))', border:'1px solid rgba(167,139,250,0.25)', borderRadius:12, padding:'10px 14px', display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
            <span style={{ fontSize:20 }}>{dayNight.emoji}</span>
            <div style={{ flex:1 }}>
              <span style={{ fontSize:12, fontWeight:600, color:'#c4b5fd' }}>{dayNight.label} </span>
              <span style={{ fontSize:12, color:'#6B6E80' }}>— Áp dụng vibe phù hợp với thời điểm {new Date().getHours()}h ngay bây giờ?</span>
            </div>
            <button
              onClick={() => {
                const c = dayNight
                Object.keys(ambVols).forEach(id => engine.stop(id))
                setLofiId(c.lofiId)
                setAccent(c.accent)
                setOverlay(c.overlay)
                const preset = BG_PRESETS.find(g => g.url === c.bgUrl)
                if (preset) { setBgPreset(preset); setUseCustom(false) }
                else { setCustomGif(c.bgUrl); setUseCustom(true) }
                const newAmbs = Object.fromEntries(Object.entries(c.ambVols).map(([id,v])=>[id,v/100]))
                setAmbVols(newAmbs)
                setDayNightDismissed(true)
              }}
              style={{ fontSize:11, padding:'5px 12px', borderRadius:8, border:'1px solid rgba(167,139,250,0.4)', background:'rgba(167,139,250,0.15)', color:'#c4b5fd', cursor:'pointer', whiteSpace:'nowrap' }}
            >
              ✨ Áp dụng
            </button>
            <button onClick={() => setDayNightDismissed(true)} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.25)', cursor:'pointer', fontSize:16, padding:'0 2px', lineHeight:1 }}>×</button>
          </div>
        )}

        <div style={{ display:'grid', gridTemplateColumns:'300px 1fr', gap:16 }}>

          {/* ══ CỘT TRÁI ══ */}
          <div style={{ display:'flex', flexDirection:'column', gap:12, minWidth:0 }}>

            {/* Tab navigation */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:4, background:'#111220', borderRadius:10, padding:4 }}>
              {(['sounds','visual','widgets','scenes'] as const).map(t=>(
                <button key={t} onClick={()=>setTab(t)} style={{
                  padding:'7px 0', borderRadius:8, border:'none', cursor:'pointer', fontSize:11, fontWeight:500, transition:'all .15s',
                  background: tab===t ? '#1e2035' : 'transparent',
                  color: tab===t ? '#a78bfa' : '#6B6E80',
                }}>
                  {t==='sounds'?'🎚️ Âm thanh':t==='visual'?'🖼️ Hình nền':t==='widgets'?'⏱️ Tiện ích':'🎬 Scenes'}
                </button>
              ))}
            </div>

            {/* ── TAB: SOUNDS ── */}
            {tab==='sounds' && <>
              {/* Lofi Music */}
              <div style={card}>
                <Label>🎵 Nhạc Lofi</Label>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {LOFI_STREAMS.map(t=>(
                    <button key={t.id} onClick={()=>setLofiId(t.id)} style={{
                      display:'flex', alignItems:'center', gap:8, padding:'8px 10px', borderRadius:8,
                      border: lofiId===t.id ? `1px solid ${accent}40` : '1px solid #1e2035',
                      background: lofiId===t.id ? `${accent}15` : 'transparent',
                      color: lofiId===t.id ? '#fff' : '#8a8ca0',
                      fontSize:12, cursor:'pointer', textAlign:'left',
                    }}>
                      <span style={{ fontSize:14 }}>🎵</span>
                      <span style={{ flex:1 }}>{t.label}</span>
                      {lofiId===t.id && <span style={{ width:6, height:6, borderRadius:'50%', background:accent, flexShrink:0 }} />}
                    </button>
                  ))}
                </div>

                <div style={{ marginTop:12, display:'flex', gap:8, alignItems:'center' }}>
                  <button onClick={()=>setLofiOn(v=>!v)} style={{ ...primaryBtn(lofiOn), flex:1, padding:'8px 0' }}>
                    {lofiOn ? '⏸ Dừng' : '▶ Phát'}
                  </button>
                  <div style={{ width:8, height:8, borderRadius:'50%', background: lofiOn&&yt.status==='ready'?'#4ade80':lofiOn&&yt.status==='blocked'?'#f97316':'#2a2c40', flexShrink:0 }} />
                </div>

                <div style={{ marginTop:8 }}>
                  <VolSlider value={lofiVol} onChange={setLofiVol} disabled={!lofiOn} color={accent} label="Âm lượng nhạc" />
                </div>

                {lofiOn && yt.status==='blocked' && (
                  <div style={{ marginTop:8, background:'#1a1206', borderRadius:8, padding:'8px 10px', border:'1px solid #3d2a08' }}>
                    <p style={{ fontSize:11, color:'#e8a44a', margin:0, lineHeight:1.5 }}>
                      ⚠ YouTube chặn iframe trên localhost. Sẽ hoạt động bình thường khi deploy lên Vercel.
                    </p>
                  </div>
                )}
                <div style={{ marginTop:10 }}>
                  <p style={{ fontSize:10, color:'#6B6E80', margin:'0 0 5px' }}>YouTube tùy chỉnh</p>
                  <div style={{ display:'flex', gap:6 }}>
                    <input type="text" placeholder="URL hoặc video ID…" value={customLofiInput} onChange={e=>setCustomLofiInput(e.target.value)}
                      onKeyDown={e=>{if(e.key==='Enter'){const id=parseYtIdWorkspace(customLofiInput);if(id){setCustomLofiId(id);setLofiId('custom')}}}}
                      style={{ ...inputStyle, flex:1, fontSize:11 }} />
                    <button onClick={()=>{const id=parseYtIdWorkspace(customLofiInput);if(id){setCustomLofiId(id);setLofiId('custom')}}}
                      style={{ ...primaryBtn(lofiId==='custom'), padding:'6px 10px', fontSize:11, flexShrink:0 }}>Phát</button>
                  </div>
                  {lofiId==='custom' && customLofiId && (
                    <p style={{ fontSize:10, color:'#4ade80', margin:'4px 0 0' }}>▶ Custom: {customLofiId}</p>
                  )}
                </div>
              </div>

              {/* Ambient Mixer */}
              <div style={card}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                  <Label style={{ margin:0 }}>🎚️ Ambient Mixer</Label>
                  {activeCount>0 && (
                    <span style={{ fontSize:10, background:`${accent}20`, color:accent, padding:'2px 8px', borderRadius:20, border:`1px solid ${accent}30` }}>
                      {activeCount} đang bật
                    </span>
                  )}
                </div>

                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {AMBIENT_SOUNDS.map(s=>{
                    const active = ambVols[s.id]!==undefined
                    const vol = ambVols[s.id]??0
                    return (
                      <div key={s.id} style={{ background: active?'#141627':'#0e0f1a', borderRadius:10, padding:'8px 10px', border:`1px solid ${active?accent+'30':'#1a1c2e'}`, transition:'all .2s' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <button onClick={()=>toggleAmb(s.id,s.file)} style={{
                            width:32, height:32, borderRadius:8, border:'none', cursor:'pointer',
                            background: active?accent:'#1e2035',
                            fontSize:15, display:'flex', alignItems:'center', justifyContent:'center',
                            flexShrink:0, transition:'all .15s',
                            boxShadow: active?`0 0 10px ${accent}40`:'none',
                          }}>
                            {s.icon}
                          </button>
                          <span style={{ fontSize:12, flex:1, color: active?'#fff':'#6B6E80' }}>{s.label}</span>
                          <span style={{ fontSize:10, color:'#3a3c50', minWidth:26, textAlign:'right' }}>
                            {active ? `${Math.round(vol*100)}%` : '--'}
                          </span>
                        </div>
                        {active && (
                          <div style={{ marginTop:6, paddingLeft:40 }}>
                            <VolSlider value={vol} onChange={v=>setAmbVol(s.id,v)} color={accent} />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                <p style={{ fontSize:10, color:'#2e3050', marginTop:10, lineHeight:1.5 }}>
                  💡 Thêm file .mp3 vào <code style={{color:'#3a3c60'}}>/public/sounds/</code> để có âm thanh thật hơn.{' '}
                  <a href="https://pixabay.com/sound-effects/" target="_blank" rel="noreferrer" style={{ color:'#4a4c70', textDecoration:'underline' }}>
                    Tải CC0 tại Pixabay →
                  </a>
                </p>
              </div>
            </>}

            {/* ── TAB: VISUAL ── */}
            {tab==='visual' && <>
              <div style={card}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                  <Label style={{ margin:0 }}>🖼️ Hình nền</Label>
                  <span style={{ fontSize:9, color:'#6B6E80', background:'#12132a', padding:'2px 8px', borderRadius:10, border:'1px solid #1e2035' }}>🎨 Pixel Art có sẵn</span>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6 }}>
                  {BG_PRESETS.map(g=>(
                    <button key={g.id} onClick={()=>{setBgPreset(g);setUseCustom(false)}} style={{
                      height:60, borderRadius:8, cursor:'pointer', position:'relative',
                      border: !useCustom&&bgPreset.id===g.id ? `2px solid ${accent}` : '1px solid #1e2035',
                      background:`linear-gradient(135deg,${g.gradient[0]},${g.gradient[1]})`,
                      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:3,
                      transition:'all .15s', overflow:'hidden',
                    }}>
                      <span style={{ fontSize:20 }}>{g.emoji}</span>
                      <span style={{ fontSize:9, color:'rgba(255,255,255,0.6)' }}>{g.label}</span>
                      {g.pixel && (
                        <span style={{ position:'absolute', top:3, right:3, fontSize:8, background:'#7c3aed', color:'#fff', padding:'1px 4px', borderRadius:4 }}>
                          PX
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <div style={{ marginTop:10 }}>
                  <p style={{ fontSize:11, color:'#6B6E80', margin:'0 0 5px' }}>URL GIF tùy chỉnh (Giphy, tenor...)</p>
                  <div style={{ display:'flex', gap:6 }}>
                    <input
                      type="text" placeholder="https://media.giphy.com/..."
                      value={customGif} onChange={e=>setCustomGif(e.target.value)}
                      style={{ ...inputStyle, flex:1, fontSize:11 }}
                    />
                    <button onClick={()=>setUseCustom(true)} disabled={!customGif.trim()}
                      style={{ ...primaryBtn(useCustom), padding:'6px 10px', fontSize:11, flexShrink:0 }}>
                      Dùng
                    </button>
                  </div>
                </div>
              </div>

              <div style={card}>
                <Label>🎨 Hiệu ứng lớp phủ</Label>
                <VolSlider value={overlay/100} onChange={v=>setOverlay(Math.round(v*100))} label={`Độ tối — ${overlay}%`} color={accent} />
                <VolSlider value={blur/20} onChange={v=>setBlur(Math.round(v*20))} label={`Blur nền — ${blur}px`} color={accent} />
              </div>

              <div style={card}>
                <Label>✨ Màu Accent</Label>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {ACCENT_COLORS.map(c=>(
                    <button key={c.id} onClick={()=>setAccent(c.hex)} title={c.label} style={{
                      width:28, height:28, borderRadius:'50%', border:'none', cursor:'pointer',
                      background:c.hex, transition:'transform .15s',
                      outline: accent===c.hex ? `2px solid ${c.hex}` : 'none',
                      outlineOffset:2,
                      transform: accent===c.hex ? 'scale(1.2)' : 'scale(1)',
                    }} />
                  ))}
                  <label style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, color:'#6B6E80', cursor:'pointer' }}>
                    <input type="color" value={accent} onChange={e=>setAccent(e.target.value)}
                      style={{ width:28, height:28, borderRadius:'50%', border:'none', padding:0, cursor:'pointer' }} />
                    Tùy chọn
                  </label>
                </div>
              </div>
            </>}

            {/* ── TAB: WIDGETS ── */}
            {tab==='widgets' && <>
              <div style={card}>
                <Label>🕐 Đồng hồ</Label>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <label style={chkRow}>
                    <input type="checkbox" checked={showClock} onChange={e=>setShowClock(e.target.checked)} />
                    <span>Hiện đồng hồ</span>
                  </label>
                  {showClock && clockStyle==='digital' && (
                    <label style={chkRow}>
                      <input type="checkbox" checked={clockSecs} onChange={e=>setClockSecs(e.target.checked)} />
                      <span>Hiện giây</span>
                    </label>
                  )}
                </div>
                {showClock && (
                  <div style={{ marginTop:10 }}>
                    <p style={{ fontSize:10, color:'#6B6E80', margin:'0 0 6px' }}>Kiểu đồng hồ</p>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:5 }}>
                      {([['digital','🔢 Digital'],['minimal','✦ Minimal'],['bold','𝗕 Bold'],['analog','⟳ Analog']] as ['digital'|'minimal'|'bold'|'analog', string][]).map(([s,label])=>(
                        <button key={s} onClick={()=>setClockStyle(s)} style={{
                          padding:'6px 8px', borderRadius:7, fontSize:11, cursor:'pointer',
                          border: clockStyle===s ? `1px solid ${accent}50` : '1px solid #1e2035',
                          background: clockStyle===s ? `${accent}18` : 'transparent',
                          color: clockStyle===s ? '#fff' : '#6B6E80', textAlign:'left',
                        }}>{label}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div style={card}>
                <Label>🍅 Pomodoro Timer</Label>
                <label style={{ ...chkRow, marginBottom:10 }}>
                  <input type="checkbox" checked={showPom} onChange={e=>setShowPom(e.target.checked)} />
                  <span>Bật Pomodoro</span>
                </label>
                {showPom && (
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                      <button onClick={pom.toggle} style={{ ...primaryBtn(pom.on), flex:1, padding:'7px 0', fontSize:12 }}>
                        {pom.on ? '⏸ Dừng' : '▶ Bắt đầu'}
                      </button>
                      <button onClick={pom.reset} style={{ ...outlineBtn, padding:'7px 12px', fontSize:12 }}>↺</button>
                    </div>
                    <div style={{ textAlign:'center', fontSize:28, fontWeight:300, fontFamily:'monospace', color:accent }}>
                      {pom.mm}:{pom.ss}
                    </div>
                    <div style={{ textAlign:'center', fontSize:11, color:'#6B6E80' }}>
                      {pom.phase==='work' ? '🎯 Tập trung' : '☕ Nghỉ ngơi'}
                    </div>
                  </div>
                )}
              </div>

              {/* Focus Timer */}
              <div style={card}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                  <Label style={{ margin:0 }}>⏳ Focus Timer Toàn màn hình</Label>
                  <button
                    onClick={() => setFocusMode(v => !v)}
                    style={{ fontSize:11, padding:'3px 10px', borderRadius:8, border:`1px solid ${accent}40`, background:`${accent}15`, color:accent, cursor:'pointer' }}
                  >
                    {focusMode ? 'Ẩn' : 'Mở'}
                  </button>
                </div>
                {focusMode && (
                  <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                    <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                      <span style={{ fontSize:11, color:'#6B6E80', whiteSpace:'nowrap' }}>Thời gian:</span>
                      {[15, 25, 45, 60].map(m => (
                        <button key={m} onClick={() => { setFocusMins(m); setFocusSecs(m * 60); setFocusOn(false); setFocusDone(false) }}
                          style={{ flex:1, padding:'5px 0', borderRadius:6, border: focusMins===m ? `1px solid ${accent}` : '1px solid #1e2035', background: focusMins===m ? `${accent}20` : '#0e0f1a', color: focusMins===m ? '#fff' : '#6B6E80', fontSize:11, cursor:'pointer' }}>
                          {m}m
                        </button>
                      ))}
                    </div>
                    <div style={{ textAlign:'center', fontSize:40, fontWeight:200, fontFamily:'monospace', color: focusDone ? '#4ade80' : accent, letterSpacing:'0.05em' }}>
                      {String(Math.floor(focusSecs/60)).padStart(2,'0')}:{String(focusSecs%60).padStart(2,'0')}
                    </div>
                    {focusDone && <div style={{ textAlign:'center', fontSize:13, color:'#4ade80', fontWeight:600 }}>🎉 Hoàn thành! Nghỉ ngơi nhé.</div>}
                    <div style={{ display:'flex', gap:6 }}>
                      <button onClick={() => { setFocusOn(v => !v); setFocusDone(false) }} style={{ ...primaryBtn(!focusDone && focusOn), flex:1, padding:'8px 0', fontSize:13 }}>
                        {focusOn ? '⏸ Tạm dừng' : '▶ Bắt đầu'}
                      </button>
                      <button onClick={resetFocus} style={{ ...outlineBtn, padding:'8px 12px' }}>↺</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Task List */}
              <div style={card}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                  <Label style={{ margin:0 }}>✅ Danh sách việc cần làm</Label>
                  <button
                    onClick={() => setShowTasks(v => !v)}
                    style={{ fontSize:11, padding:'3px 10px', borderRadius:8, border:`1px solid ${accent}40`, background:`${accent}15`, color:accent, cursor:'pointer' }}
                  >
                    {showTasks ? 'Ẩn overlay' : 'Hiện overlay'}
                  </button>
                </div>
                <div style={{ display:'flex', gap:6, marginBottom:8 }}>
                  <input
                    type="text" placeholder="Thêm việc cần làm..."
                    value={taskInput} onChange={e => setTaskInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addTask(taskInput)}
                    style={{ ...inputStyle, flex:1, fontSize:11 }}
                  />
                  <button onClick={() => addTask(taskInput)} style={{ ...primaryBtn(false), padding:'6px 10px', fontSize:12 }}>+</button>
                </div>
                {tasks.length === 0 ? (
                  <p style={{ fontSize:11, color:'#2e3050', textAlign:'center', padding:'8px 0' }}>Chưa có task nào. Thêm vào nhé!</p>
                ) : (
                  <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                    {tasks.map(t => (
                      <div key={t.id} style={{ display:'flex', alignItems:'center', gap:8, padding:'6px 8px', borderRadius:8, background: t.done ? '#060810' : '#0e0f1a', border:`1px solid ${t.done ? '#1a1c2e' : accent + '20'}`, transition:'all .2s' }}>
                        <button onClick={() => toggleTask(t.id)} style={{ width:18, height:18, borderRadius:4, border:`2px solid ${t.done ? '#4ade80' : accent}`, background: t.done ? '#4ade80' : 'transparent', cursor:'pointer', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10 }}>
                          {t.done ? '✓' : ''}
                        </button>
                        <span style={{ flex:1, fontSize:12, color: t.done ? '#3a3c50' : '#C8C9D8', textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>
                        <button onClick={() => removeTask(t.id)} style={{ background:'none', border:'none', cursor:'pointer', color:'#3a3c50', fontSize:14, padding:0, lineHeight:1 }}>×</button>
                      </div>
                    ))}
                    {tasks.some(t => t.done) && (
                      <button onClick={() => setTasks(prev => prev.filter(t => !t.done))} style={{ fontSize:10, color:'#4a4c70', background:'none', border:'none', cursor:'pointer', textAlign:'left', padding:'4px 8px' }}>
                        🗑 Xóa các task đã hoàn thành
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Weather Mode */}
              <WeatherMode
                onApplyScene={applyScene}
                accentColor={accent}
                onDetected={setWeatherDisplay}
              />

              {/* Affiliate Links */}
              <div style={card}>
                <Label>🛒 Gợi ý cho Setup Lofi</Label>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {AFFILIATE_LINKS.map(lnk=>(
                    <a key={lnk.label} href={lnk.href} target="_blank" rel="noopener noreferrer"
                      style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 10px', borderRadius:8, border:'1px solid #1a1c2e', background:'#0e0f1a', textDecoration:'none', color:'#c8cae0', fontSize:12, transition:'border-color .15s' }}
                      onMouseEnter={e=>(e.currentTarget.style.borderColor='#2a2c40')}
                      onMouseLeave={e=>(e.currentTarget.style.borderColor='#1a1c2e')}
                    >
                      <span style={{ fontSize:16 }}>{lnk.icon}</span>
                      <span style={{ flex:1 }}>{lnk.label}</span>
                      {lnk.badge && (
                        <span style={{ fontSize:9, background:accent+'30', color:accent, padding:'2px 6px', borderRadius:10, border:`1px solid ${accent}40` }}>
                          {lnk.badge}
                        </span>
                      )}
                      <span style={{ fontSize:10, color:'#3a3c50' }}>→</span>
                    </a>
                  ))}
                </div>
              </div>
            </>}

            {/* ── TAB: SCENES ── */}
            {tab==='scenes' && (
              <div style={card}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                  <Label style={{ margin:0 }}>🎬 Bộ cảnh sẵn có</Label>
                  <span style={{ fontSize:10, color:'#6B6E80' }}>Click để áp dụng</span>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
                  {SCENES.map(scene=>(
                    <button key={scene.id} onClick={()=>applyScene(scene.id)} style={{
                      height:76, borderRadius:10, cursor:'pointer', position:'relative',
                      border: '1px solid #1e2035',
                      backgroundImage:`url(${scene.gifUrl})`,
                      backgroundSize:'cover', backgroundPosition:'center',
                      display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end',
                      padding:'6px 8px', transition:'all .15s', overflow:'hidden',
                    }}
                    onMouseEnter={e=>(e.currentTarget.style.border=`1px solid ${accent}80`)}
                    onMouseLeave={e=>(e.currentTarget.style.border='1px solid #1e2035')}
                    >
                      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.45)' }}/>
                      <span style={{ position:'relative', fontSize:9, color:'rgba(255,255,255,0.85)', fontWeight:600, lineHeight:1.4 }}>
                        {scene.emoji} {scene.nameVi}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ══ CỘT PHẢI ══ */}
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <Label>Live Preview</Label>

            {/* Preview canvas */}
            <div style={{ position:'relative', width:'100%', aspectRatio:'16/10', borderRadius:16, overflow:'hidden', border:'1px solid #1e2035' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={activeGif} alt="" aria-hidden
                style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
              />
              {/* Overlay */}
              <div style={{ position:'absolute', inset:0, background:'#000', opacity:overlay/100 }} />
              {/* Blur */}
              {blur>0 && <div style={{ position:'absolute', inset:0, backdropFilter:`blur(${blur}px)` }} />}

              {/* Clock */}
              {showClock && !focusMode && (
                <div style={{ position:'absolute', top:18, left:20, color:'#fff' }}>
                  {clockStyle==='analog' && <AnalogClockPreview now={now} size={80} accent={accent}/>}
                  {clockStyle==='minimal' && <div style={{fontFamily:"'SF Mono',monospace",fontWeight:200,fontSize:'clamp(14px,3vw,22px)',letterSpacing:'0.12em',opacity:0.8,textShadow:'0 1px 10px rgba(0,0,0,0.9)'}}>{timeStr}</div>}
                  {clockStyle==='bold' && <div style={{fontFamily:'system-ui,sans-serif',fontWeight:900,fontSize:'clamp(32px,6vw,56px)',lineHeight:0.9,letterSpacing:'-0.03em',textShadow:'0 4px 24px rgba(0,0,0,0.5)'}}>{timeStr}</div>}
                  {clockStyle==='digital' && (
                    <div style={{textShadow:'0 2px 16px rgba(0,0,0,0.7)'}}>
                      <div style={{fontSize:'clamp(22px,3.5vw,38px)',fontWeight:300,fontFamily:"'SF Mono',monospace",letterSpacing:'0.04em'}}>{timeStr}</div>
                      {mounted&&<div style={{fontSize:10,color:'rgba(255,255,255,0.35)',marginTop:2,letterSpacing:'0.06em'}}>{now.toLocaleDateString('vi-VN',{weekday:'short',day:'numeric',month:'short'})}</div>}
                    </div>
                  )}
                </div>
              )}

              {/* Pomodoro */}
              {showPom && !focusMode && (
                <div style={{ position:'absolute', top:16, right:16, background:'rgba(0,0,0,0.55)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:14, padding:'8px 12px', display:'flex', alignItems:'center', gap:10 }}>
                  <svg width="42" height="42" viewBox="0 0 44 44" style={{ transform:'rotate(-90deg)', flexShrink:0 }}>
                    <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3"/>
                    <circle cx="22" cy="22" r="18" fill="none" stroke={pom.phase==='work'?accent:'#4ade80'}
                      strokeWidth="3" strokeLinecap="round"
                      strokeDasharray={pomCircum} strokeDashoffset={pomCircum*(1-pom.progress)}
                      style={{ transition:'stroke-dashoffset 1s linear' }}
                    />
                  </svg>
                  <div>
                    <div style={{ fontSize:18, fontWeight:600, color:'#fff', fontFamily:'monospace', lineHeight:1 }}>{pom.mm}:{pom.ss}</div>
                    <div style={{ fontSize:9, color:'rgba(255,255,255,0.35)', marginTop:2, textTransform:'uppercase', letterSpacing:'0.08em' }}>
                      {pom.phase==='work'?'Tập trung':'Nghỉ'}
                    </div>
                  </div>
                </div>
              )}

              {/* Focus Timer overlay on preview */}
              {focusMode && (
                <div style={{
                  position:'absolute', inset:0,
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                  background:'rgba(0,0,0,0.65)', backdropFilter:'blur(4px)',
                }}>
                  <div style={{ fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:8 }}>
                    {focusDone ? '✅ Đã hoàn thành' : focusOn ? '🎯 Đang tập trung' : '⏳ Focus Timer'}
                  </div>
                  {/* Circular progress */}
                  <div style={{ position:'relative', width:120, height:120, marginBottom:12 }}>
                    <svg viewBox="0 0 44 44" style={{ position:'absolute', inset:0, width:'100%', height:'100%', transform:'rotate(-90deg)' }}>
                      <circle cx="22" cy="22" r="19" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="2.5"/>
                      <circle cx="22" cy="22" r="19" fill="none" stroke={focusDone ? '#4ade80' : accent}
                        strokeWidth="2.5" strokeLinecap="round"
                        strokeDasharray={2*Math.PI*19}
                        strokeDashoffset={2*Math.PI*19 * (1 - (focusTotal - focusSecs) / focusTotal)}
                        style={{ transition:'stroke-dashoffset 1s linear' }}
                      />
                    </svg>
                    <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                      <div style={{ fontSize:'clamp(20px,4vw,28px)', fontWeight:200, fontFamily:'monospace', color: focusDone ? '#4ade80' : '#fff', letterSpacing:'0.05em' }}>
                        {String(Math.floor(focusSecs/60)).padStart(2,'0')}:{String(focusSecs%60).padStart(2,'0')}
                      </div>
                    </div>
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    <button onClick={() => { setFocusOn(v => !v); setFocusDone(false) }}
                      style={{ padding:'8px 24px', borderRadius:24, border:'none', background: focusOn ? 'rgba(255,255,255,0.15)' : accent, color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer' }}>
                      {focusOn ? '⏸ Dừng' : '▶ Bắt đầu'}
                    </button>
                    <button onClick={resetFocus} style={{ padding:'8px 14px', borderRadius:24, border:'1px solid rgba(255,255,255,0.15)', background:'transparent', color:'rgba(255,255,255,0.6)', fontSize:13, cursor:'pointer' }}>↺</button>
                    <button onClick={() => setFocusMode(false)} style={{ padding:'8px 14px', borderRadius:24, border:'1px solid rgba(255,255,255,0.1)', background:'transparent', color:'rgba(255,255,255,0.4)', fontSize:13, cursor:'pointer' }}>✕</button>
                  </div>
                </div>
              )}

              {/* Task List overlay */}
              {showTasks && tasks.length > 0 && !focusMode && (
                <div style={{
                  position:'absolute', top:16, right:16,
                  background:'rgba(0,0,0,0.70)', backdropFilter:'blur(12px)',
                  border:'1px solid rgba(255,255,255,0.08)', borderRadius:12,
                  padding:'10px 14px', minWidth:180, maxWidth:220,
                }}>
                  <div style={{ fontSize:10, letterSpacing:'0.08em', color:'rgba(255,255,255,0.35)', textTransform:'uppercase', marginBottom:8 }}>
                    Tasks · {tasks.filter(t=>t.done).length}/{tasks.length}
                  </div>
                  {tasks.map(t => (
                    <div key={t.id} onClick={() => toggleTask(t.id)} style={{ display:'flex', alignItems:'center', gap:7, marginBottom:5, cursor:'pointer' }}>
                      <div style={{ width:14, height:14, borderRadius:3, border:`1.5px solid ${t.done ? '#4ade80' : accent}`, background: t.done ? '#4ade80' : 'transparent', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9 }}>
                        {t.done ? '✓' : ''}
                      </div>
                      <span style={{ fontSize:11, color: t.done ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.8)', textDecoration: t.done ? 'line-through' : 'none', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        {t.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Equalizer animation */}
              {lofiOn && yt.status==='ready' && !focusMode && (
                <div style={{ position:'absolute', top:18, right:16, display:'flex', alignItems:'flex-end', gap:2, height:20 }}>
                  {[4,7,5,9,6,4,7].map((h,i)=>(
                    <div key={i} style={{ width:3, borderRadius:2, background:accent, height:h*2, animation:`eqBounce ${0.4+i*0.08}s ease-in-out infinite alternate` }} />
                  ))}
                </div>
              )}

              {/* Control bar */}
              {!focusMode && (
                <div style={{ position:'absolute', bottom:16, left:16, right:16 }}>
                  <div style={{ background:'rgba(0,0,0,0.55)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:40, padding:'8px 14px', display:'flex', alignItems:'center', gap:10, maxWidth:360 }}>
                    <div style={{ width:32, height:32, borderRadius:'50%', background:accent, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      {lofiOn
                        ? <svg viewBox="0 0 24 24" fill="white" width="14" height="14"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>
                        : <svg viewBox="0 0 24 24" fill="white" width="14" height="14"><path d="M8 5v14l11-7z"/></svg>
                      }
                    </div>
                    <div style={{ flex:1, overflow:'hidden' }}>
                      <div style={{ fontSize:11, color:'rgba(255,255,255,0.8)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        {lofiOn ? LOFI_STREAMS.find(t=>t.id===lofiId)?.label : 'Chưa phát'}
                      </div>
                      {activeCount>0 && (
                        <div style={{ fontSize:12, marginTop:2 }}>
                          {Object.keys(ambVols).map(id=>AMBIENT_SOUNDS.find(s=>s.id===id)?.icon).join('')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Scene applied flash */}
              {sceneFlash && (
                <div style={{
                  position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
                  background:'rgba(0,0,0,0.75)', backdropFilter:'blur(16px)',
                  border:'1px solid rgba(255,255,255,0.12)', borderRadius:14,
                  padding:'12px 22px', textAlign:'center', pointerEvents:'none',
                  animation:'fadeIn 0.3s ease',
                }}>
                  <div style={{ fontSize:22, marginBottom:4 }}>✨</div>
                  <div style={{ fontSize:13, fontWeight:600, color:'#fff' }}>{sceneFlash}</div>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)', marginTop:2 }}>Scene đã áp dụng</div>
                </div>
              )}

              {/* Branding */}
              <div style={{ position:'absolute', bottom:5, right:10, fontSize:9, color:'rgba(255,255,255,0.25)' }}>
                Powered by LofiSpace · Create your own
              </div>

              {/* YT hidden player */}
              <div style={{ position:'absolute', width:1, height:1, opacity:0, overflow:'hidden', bottom:0, right:0 }}>
                <div ref={yt.ref} />
              </div>
            </div>

            {/* Embed URL */}
            <div style={{ ...card }}>
              <Label>🔗 Link nhúng Notion / Blog</Label>
              <div style={{ display:'flex', gap:8 }}>
                <input readOnly value={embedUrl}
                  onClick={e=>(e.target as HTMLInputElement).select()}
                  style={{ ...inputStyle, flex:1, fontFamily:'monospace', fontSize:10, color:accent }}
                />
                <button onClick={copyUrl} style={{ ...primaryBtn(copied), whiteSpace:'nowrap', padding:'8px 14px' }}>
                  {copied ? '✓ Đã chép' : '📋 Sao chép'}
                </button>
              </div>
              <div style={{ marginTop:8, display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
                <div style={{ background:'#0a0b14', borderRadius:8, padding:'8px 10px', border:'1px solid #1a1c2e' }}>
                  <p style={{ fontSize:10, color:'#6B6E80', margin:'0 0 3px' }}>Notion</p>
                  <p style={{ fontSize:11, color:'#9a9cc0', margin:0 }}>Gõ <code style={{ color:accent }}>/embed</code> → paste link</p>
                </div>
                <div style={{ background:'#0a0b14', borderRadius:8, padding:'8px 10px', border:'1px solid #1a1c2e' }}>
                  <p style={{ fontSize:10, color:'#6B6E80', margin:'0 0 3px' }}>Blog / HTML</p>
                  <p style={{ fontSize:11, color:'#9a9cc0', margin:0, wordBreak:'break-all' }}>
                    <code style={{ color:accent }}>&lt;iframe src="..." /&gt;</code>
                  </p>
                </div>
              </div>
            </div>

            {/* AdSense slot */}
            <div style={{ height:72, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:10, border:'1px dashed #1a1c2e', fontSize:11, color:'#202230' }}>
              Google AdSense — 728×90
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes eqBounce { from{transform:scaleY(0.3)} to{transform:scaleY(1.2)} }
        @keyframes fadeIn { from{opacity:0;transform:translate(-50%,-50%) scale(0.9)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }
        input[type=range] { -webkit-appearance:none; height:3px; border-radius:2px; outline:none; cursor:pointer }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:12px; height:12px; border-radius:50%; cursor:pointer }
      `}</style>
    </div>
  )
}

export default function WorkspacePage() {
  return (
    <Suspense fallback={<div style={{ minHeight:'100vh', background:'#0a0b13' }} />}>
      <WorkspaceInner />
    </Suspense>
  )
}

// ─── Shared style helpers ─────────────────────────────────────────────

function Label({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <p style={{ fontSize:11, letterSpacing:'0.06em', textTransform:'uppercase', color:'#6B6E80', margin:'0 0 10px', fontWeight:600, ...style }}>{children}</p>
}

function VolSlider({ value, onChange, disabled, color='#a78bfa', label }: { value:number; onChange:(v:number)=>void; disabled?:boolean; color?:string; label?:string }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
      {label && <p style={{ fontSize:10, color:'#6B6E80', margin:0 }}>{label}</p>}
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <input type="range" min="0" max="100" value={Math.round(value*100)}
          disabled={disabled}
          onChange={e=>onChange(Number(e.target.value)/100)}
          style={{ flex:1, opacity:disabled?.4:1, accentColor:color, background:`linear-gradient(to right, ${color} ${Math.round(value*100)}%, #1e2035 ${Math.round(value*100)}%)` }}
        />
        <span style={{ fontSize:10, color:'#4a4c70', minWidth:28, textAlign:'right' }}>
          {disabled ? '--' : `${Math.round(value*100)}%`}
        </span>
      </div>
    </div>
  )
}

const card: React.CSSProperties = {
  background:'#0e0f1a', border:'1px solid #1a1c2e', borderRadius:12, padding:'14px 14px',
}
const inputStyle: React.CSSProperties = {
  padding:'8px 10px', borderRadius:8, border:'1px solid #1e2035', background:'#080912',
  color:'#EDEDF4', fontSize:12, outline:'none',
}
const chkRow: React.CSSProperties = {
  display:'flex', alignItems:'center', gap:8, fontSize:12, color:'#C8C9D8', cursor:'pointer',
}

function primaryBtn(active: boolean): React.CSSProperties {
  return {
    padding:'8px 14px', borderRadius:8, border:'none', cursor:'pointer', fontWeight:500,
    background: active ? '#7c3aed' : '#4c1d95',
    color: '#fff', transition:'all .15s',
  }
}

const outlineBtn: React.CSSProperties = {
  padding:'8px 12px', borderRadius:8, border:'1px solid #1e2035',
  background:'transparent', color:'#9496A8', cursor:'pointer', fontWeight:500,
}
