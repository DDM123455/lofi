'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { LOFI_STREAMS } from '@/lib/lofiStreams'

// ── Pink noise synth (Voss-McCartney) ──────────────────────────────────
function makePinkBuffer(ctx: AudioContext, secs = 8): AudioBuffer {
  const n = Math.floor(ctx.sampleRate * secs)
  const buf = ctx.createBuffer(2, n, ctx.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch)
    let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1
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
  const master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination)
  const stops: Array<() => void> = []
  const ns = (s=8) => { const src=ctx.createBufferSource(); src.buffer=makePinkBuffer(ctx,s); src.loop=true; return src }
  const flt = (t: BiquadFilterType, f: number, q=1) => { const n=ctx.createBiquadFilter(); n.type=t; n.frequency.value=f; n.Q.value=q; return n }
  const gn = (v: number) => { const g=ctx.createGain(); g.gain.value=v; return g }
  const lfo = (r: number, d: number, tgt: AudioParam) => { const o=ctx.createOscillator(),g=ctx.createGain(); o.frequency.value=r; g.gain.value=d; o.connect(g); g.connect(tgt); o.start(); stops.push(()=>{try{o.stop()}catch(_){}}) }
  const go = (src: AudioBufferSourceNode) => { src.start(); stops.push(()=>{try{src.stop()}catch(_){}}) }

  if (id==='rain') {
    const s1=ns(8),hp=flt('highpass',600),lp=flt('lowpass',8000)
    s1.connect(hp); hp.connect(lp); lp.connect(master); go(s1)
    const s2=ns(6),hp2=flt('highpass',4000),g2=gn(0.25)
    s2.connect(hp2); hp2.connect(g2); g2.connect(master); go(s2)
  } else if (id==='wave') {
    const s=ns(8),lp=flt('lowpass',420),cg=gn(0.65)
    s.connect(lp); lp.connect(cg); cg.connect(master); go(s)
    lfo(0.10,230,lp.frequency); lfo(0.07,130,lp.frequency); lfo(0.10,0.22,cg.gain)
  } else if (id==='cafe') {
    const cg=gn(0.7); cg.connect(master)
    const s1=ns(8),bp1=flt('bandpass',550,0.3),g1=gn(1.0); s1.connect(bp1); bp1.connect(g1); g1.connect(cg); go(s1)
    const s2=ns(7),bp2=flt('bandpass',2100,0.25),g2=gn(0.35); s2.connect(bp2); bp2.connect(g2); g2.connect(cg); go(s2)
    const s3=ns(5),hp3=flt('highpass',3800),g3=gn(0.0); s3.connect(hp3); hp3.connect(g3); g3.connect(cg); go(s3)
    lfo(0.35,0.06,g3.gain); lfo(0.13,0.18,cg.gain)
  } else if (id==='fire') {
    const cg=gn(0.65); cg.connect(master)
    const s1=ns(8),lp1=flt('lowpass',260); s1.connect(lp1); lp1.connect(cg); go(s1)
    const s2=ns(5),bp=flt('bandpass',1500,0.6),crk=gn(0.04); s2.connect(bp); bp.connect(crk); crk.connect(master); go(s2)
    lfo(8.7,0.18,crk.gain); lfo(13.1,0.11,crk.gain); lfo(0.18,0.20,cg.gain)
  } else if (id==='wind') {
    const s=ns(8),lp=flt('lowpass',520),cg=gn(0.6)
    s.connect(lp); lp.connect(cg); cg.connect(master); go(s)
    lfo(0.04,270,lp.frequency); lfo(0.03,160,lp.frequency); lfo(0.04,0.22,cg.gain)
  } else if (id==='thunder') {
    const s=ns(8),lp=flt('lowpass',140),cg=gn(0.5); s.connect(lp); lp.connect(cg); cg.connect(master); go(s)
    lfo(0.05,0.35,cg.gain)
    const s2=ns(6),lp2=flt('lowpass',80),g2=gn(0.3); s2.connect(lp2); lp2.connect(g2); g2.connect(master); go(s2)
  } else {
    const s=ns(8),bp=flt('bandpass',800,0.4),cg=gn(0.7)
    s.connect(bp); bp.connect(cg); cg.connect(master); go(s)
  }

  return { gain: master, stop: () => stops.forEach(f => f()) }
}

// ── Hook ───────────────────────────────────────────────────────────────

export type YtStatus = 'idle' | 'loading' | 'ready' | 'blocked'

export interface AudioEngine {
  // Lofi
  lofiId: string
  lofiVol: number
  lofiOn: boolean
  ytStatus: YtStatus
  ytRef: React.RefObject<HTMLDivElement | null>
  setLofiId: (id: string) => void
  setLofiVol: (v: number) => void
  toggleLofi: () => void

  // Ambient
  ambVols: Record<string, number>
  toggleAmbient: (id: string) => void
  setAmbVol: (id: string, vol: number) => void

  // Global
  masterStarted: boolean
  doMasterStart: () => void
}

export function useAudioEngine(): AudioEngine {
  const ctxRef   = useRef<AudioContext | null>(null)
  const synthRef = useRef<Record<string, SynthNode>>({})
  const html5Ref = useRef<Record<string, HTMLAudioElement>>({})
  const ytRef    = useRef<HTMLDivElement | null>(null)
  const ytPlayer = useRef<any>(null)
  const ytTimer  = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [lofiId, setLofiIdState]  = useState('lofi1')
  const [lofiVol, setLofiVolState] = useState(0.6)
  const [lofiOn, setLofiOn]        = useState(false)
  const [ytStatus, setYtStatus]    = useState<YtStatus>('idle')
  const [ambVols, setAmbVols]      = useState<Record<string, number>>({})
  const [masterStarted, setMasterStarted] = useState(false)

  // Inject YouTube API once
  useEffect(() => {
    if (typeof window === 'undefined' || document.getElementById('yt-api')) return
    const s = document.createElement('script')
    s.id='yt-api'; s.src='https://www.youtube.com/iframe_api'; s.async=true
    document.head.appendChild(s)
  }, [])

  const ensureCtx = useCallback(() => {
    if (!ctxRef.current)
      ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    return ctxRef.current
  }, [])

  const startAmbient = useCallback((id: string, vol: number) => {
    if (synthRef.current[id]) return
    const ctx = ensureCtx(); ctx.resume().catch(() => {})
    const node = buildSynthGraph(ctx, id)
    node.gain.gain.setTargetAtTime(vol * 0.6, ctx.currentTime, 0.1)
    synthRef.current[id] = node
  }, [ensureCtx])

  const stopAmbient = useCallback((id: string) => {
    if (html5Ref.current[id]) { html5Ref.current[id].pause(); html5Ref.current[id].src=''; delete html5Ref.current[id] }
    if (synthRef.current[id] && ctxRef.current) {
      synthRef.current[id].gain.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.15)
      setTimeout(() => { try{synthRef.current[id]?.stop()}catch(_){}; delete synthRef.current[id] }, 300)
    }
  }, [])

  const setAmbVolInternal = useCallback((id: string, vol: number) => {
    const scaled = vol * 0.6
    if (html5Ref.current[id]) html5Ref.current[id].volume = scaled
    if (synthRef.current[id] && ctxRef.current) synthRef.current[id].gain.gain.setTargetAtTime(scaled, ctxRef.current.currentTime, 0.05)
  }, [])

  const initYT = useCallback((ytId: string, vol: number) => {
    if (!ytRef.current) return
    setYtStatus('loading')
    if (ytTimer.current) clearTimeout(ytTimer.current)
    ytTimer.current = setTimeout(() => setYtStatus('blocked'), 10000)
    const create = () => {
      if (!ytRef.current) return
      try {
        ytPlayer.current = new (window as any).YT.Player(ytRef.current, {
          height:'1', width:'1', videoId: ytId,
          playerVars: { autoplay:1, controls:0, disablekb:1, playsinline:1 },
          events: {
            onReady: (e: any) => { if(ytTimer.current) clearTimeout(ytTimer.current); setYtStatus('ready'); e.target.setVolume(vol*100); e.target.playVideo() },
            onError: () => { if(ytTimer.current) clearTimeout(ytTimer.current); setYtStatus('blocked') },
          },
        })
      } catch(_) { setYtStatus('blocked') }
    }
    if ((window as any).YT?.Player) { create() }
    else {
      const prev = (window as any).onYouTubeIframeAPIReady
      ;(window as any).onYouTubeIframeAPIReady = () => { prev?.(); create() }
    }
  }, [])

  const doMasterStart = useCallback(() => {
    if (masterStarted) return
    ensureCtx().resume().catch(() => {})
    setMasterStarted(true)
  }, [masterStarted, ensureCtx])

  const toggleLofi = useCallback(() => {
    if (!masterStarted) return
    const next = !lofiOn
    setLofiOn(next)
    if (next) {
      const ytId = LOFI_STREAMS.find(s => s.id === lofiId)?.youtubeId ?? 'jfKfPfyJRdk'
      initYT(ytId, lofiVol)
    } else {
      try { ytPlayer.current?.pauseVideo() } catch(_) {}
    }
  }, [masterStarted, lofiOn, lofiId, lofiVol, initYT])

  const setLofiId = useCallback((id: string) => {
    setLofiIdState(id)
    try { ytPlayer.current?.destroy() } catch(_) {}; ytPlayer.current = null
    if (lofiOn && masterStarted) {
      const ytId = LOFI_STREAMS.find(s => s.id === id)?.youtubeId ?? 'jfKfPfyJRdk'
      setTimeout(() => initYT(ytId, lofiVol), 80)
    }
  }, [lofiOn, masterStarted, lofiVol, initYT])

  const setLofiVol = useCallback((v: number) => {
    setLofiVolState(v)
    ytPlayer.current?.setVolume?.(v * 100)
  }, [])

  const toggleAmbient = useCallback((id: string) => {
    if (!masterStarted) return
    setAmbVols(prev => {
      if (prev[id] !== undefined) { stopAmbient(id); const n={...prev}; delete n[id]; return n }
      startAmbient(id, 0.5)
      return { ...prev, [id]: 0.5 }
    })
  }, [masterStarted, startAmbient, stopAmbient])

  const setAmbVol = useCallback((id: string, vol: number) => {
    setAmbVols(prev => ({ ...prev, [id]: vol }))
    setAmbVolInternal(id, vol)
  }, [setAmbVolInternal])

  // Cleanup
  useEffect(() => () => {
    Object.values(html5Ref.current).forEach(a => { a.pause(); a.src='' })
    Object.values(synthRef.current).forEach(n => n.stop())
    ctxRef.current?.close()
    try { ytPlayer.current?.destroy() } catch(_) {}
    if (ytTimer.current) clearTimeout(ytTimer.current)
  }, [])

  return { lofiId, lofiVol, lofiOn, ytStatus, ytRef, setLofiId, setLofiVol, toggleLofi, ambVols, toggleAmbient, setAmbVol, masterStarted, doMasterStart }
}
