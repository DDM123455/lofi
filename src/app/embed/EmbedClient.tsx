'use client'

import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef, useCallback, useMemo, useContext, createContext } from 'react'
import { preconnect } from 'react-dom'
import { getDayNightConfig } from '@/hooks/useDayNight'
import { LOFI_STREAMS, AMBIENT_SOUNDS } from '@/lib/lofiStreams'
import { BG_PRESETS, getBgPresetByUrl } from '@/lib/backgrounds'
import { useGameStore, xpProgress, ACHIEVEMENT_DEFS, localDate } from '@/lib/gameStore'
import { AchievementToast, LevelUpOverlay } from '@/components/notifications/AchievementToast'
import { analytics } from '@/lib/analytics'
import { useLanguage } from '@/contexts/LanguageContext'
import { LANGS, isLang, localeOf } from '@/lib/i18n'
import { SupportModal } from '@/components/support/SupportModal'
import { LiveClock } from '@/components/workspace/LiveClock'
import type { HomeAudio } from '@/components/comehome/ComeHome'

// Come Home (evening) mode ships as its own chunk: focus-mode visitors never download it.
const ComeHome = dynamic(()=>import('@/components/comehome/ComeHome').then(m=>m.ComeHome),{
  ssr:false,
  loading:()=><div style={{position:'fixed',inset:0,zIndex:30,background:'rgba(8,5,12,.7)',transition:'opacity .6s'}}/>,
})
// The gentle default mix when entering Come Home, and its evening backdrop
const HOME_MIX:Record<string,number>={rain:30}
const HOME_BG='/video/lofi-bedroom.mp4'
const HOME_MASTER=70

type ClockStyle = 'digital'|'minimal'|'bold'|'analog'
type BgType = 'gif'|'youtube'|'video'
type PanelTab = 'music'|'sounds'|'more'
type MoreTab = 'widgets'|'weather'|'progress'|'share'
interface Todo { id:string; text:string; done:boolean; estimate?:number; actual:number }
interface WxData { city:string; temp:number; code:number; desc:string; emoji:string; feels:number|null; humidity:number|null; wind:number|null }

// TLS/DNS to YouTube's hosts is pre-negotiated so the first play doesn't pay for it on click.
// (The background clip itself is started from the HTML by BootBackdrop, before this JS runs.)
if(typeof window!=='undefined'){
  try{
    preconnect('https://www.youtube.com')
    preconnect('https://i.ytimg.com')
    preconnect('https://www.google.com')
  }catch{/* no-op */}
}

// Hover/focus tooltip for icon-only dock buttons. The bubble is rendered once at the top
// level as position:fixed (via TipCtx) so it isn't clipped by the dock's horizontal
// overflow container.
type TipState = { label: string; x: number; y: number } | null
const TipCtx = createContext<(t: TipState) => void>(() => {})
function Tip({label,children}:{label:string;children:React.ReactNode}){
  const setTip = useContext(TipCtx)
  const ref = useRef<HTMLSpanElement>(null)
  const show = () => {
    const r = ref.current?.getBoundingClientRect()
    if (r) setTip({ label, x: r.left + r.width / 2, y: r.top })
  }
  const hide = () => setTip(null)
  return (
    <span ref={ref} className="lf-tip" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
    </span>
  )
}

function bgTypeFromUrl(url:string):BgType {
  if(/\.(mp4|webm|mov)$/i.test(url)) return 'video'
  return 'gif'
}

const DEFAULT_YT='7NOSDKb0HlU'

// Loads YouTube's iframe_api once. If the script fails (flaky network, filter lists) the
// cached promise is dropped so the next call injects a fresh <script> instead of hanging.
let ytApiPromise:Promise<void>|null=null
function loadYtApi():Promise<void> {
  const w=window as any
  if(w.YT?.Player)return Promise.resolve()
  if(ytApiPromise)return ytApiPromise
  ytApiPromise=new Promise<void>((resolve,reject)=>{
    const prev=w.onYouTubeIframeAPIReady
    w.onYouTubeIframeAPIReady=()=>{ try{prev?.()}catch{/* ignore */} resolve() }
    document.getElementById('yt-api')?.remove()
    const el=document.createElement('script')
    el.id='yt-api';el.src='https://www.youtube.com/iframe_api';el.async=true
    el.onerror=()=>{ el.remove(); ytApiPromise=null; reject(new Error('yt-api')) }
    document.head.appendChild(el)
  })
  return ytApiPromise
}

function savedBgUrl():string|null {
  if(typeof window==='undefined')return null
  try{ const u=JSON.parse(localStorage.getItem('lofispace-settings')||'{}')?.bgUrl; return typeof u==='string'&&u?u:null }catch{ return null }
}

function parseYtId(s:string):string|null {
  const m = s.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/)
  if (m) return m[1]
  if (/^[a-zA-Z0-9_-]{11}$/.test(s.trim())) return s.trim()
  return null
}

function wxEmoji(code:number) {
  if (code>=95) return '⛈️'; if (code>=80) return '🌧️'; if (code>=71) return '❄️'
  if (code>=51) return '🌦️'; if (code===45||code===48) return '🌫️'; if (code>=2) return '☁️'
  return '☀️'
}

function useDraggable() {
  const [pos, setPos] = useState<{x:number;y:number}|null>(null)
  const posRef = useRef<{x:number;y:number}|null>(null)
  const d = useRef({on:false,ox:0,oy:0,sx:0,sy:0})
  useEffect(()=>{ posRef.current=pos },[pos])
  const onPointerDown = useCallback((e:React.PointerEvent)=>{
    const el = e.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    const cx = posRef.current?.x ?? rect.left
    const cy = posRef.current?.y ?? rect.top
    d.current = {on:true,ox:e.clientX-cx,oy:e.clientY-cy,sx:e.clientX,sy:e.clientY}
    if (!posRef.current) setPos({x:rect.left,y:rect.top})
    el.setPointerCapture(e.pointerId); e.stopPropagation()
  },[])
  const onPointerMove = useCallback((e:React.PointerEvent)=>{
    if (!d.current.on) return
    if (Math.abs(e.clientX-d.current.sx)+Math.abs(e.clientY-d.current.sy)<4) return
    setPos({x:e.clientX-d.current.ox,y:e.clientY-d.current.oy}); e.stopPropagation()
  },[])
  const onPointerUp = useCallback(()=>{ d.current.on=false },[])
  const reset = useCallback(()=>{ setPos(null); posRef.current=null },[])
  return { pos, reset, dp:{onPointerDown,onPointerMove,onPointerUp} }
}

// Live height of a conditionally-rendered panel (callback ref, so it works when the panel
// mounts later). Used to stack panels so they never overlap one another.
function useHeight():[(el:HTMLElement|null)=>void,number]{
  const [h,setH]=useState(0)
  const ro=useRef<ResizeObserver|null>(null)
  const ref=useCallback((el:HTMLElement|null)=>{
    ro.current?.disconnect()
    if(!el){setH(0);return}
    const upd=()=>setH(el.offsetHeight)
    ro.current=new ResizeObserver(upd); ro.current.observe(el); upd()
  },[])
  return [ref,h]
}

function makePinkBuffer(ctx:AudioContext,secs=8):AudioBuffer {
  const n=Math.floor(ctx.sampleRate*secs),buf=ctx.createBuffer(2,n,ctx.sampleRate)
  for(let ch=0;ch<2;ch++){
    const d=buf.getChannelData(ch); let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0
    for(let i=0;i<n;i++){
      const w=Math.random()*2-1
      b0=0.99886*b0+w*0.0555179;b1=0.99332*b1+w*0.0750759;b2=0.96900*b2+w*0.1538520
      b3=0.86650*b3+w*0.3104856;b4=0.55000*b4+w*0.5329522;b5=-0.7616*b5-w*0.0168980
      d[i]=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.11;b6=w*0.115926
    }
  }
  return buf
}

// One 8s pink-noise bed per AudioContext, shared by every ambient synth graph. Generating
// it is ~700k iterations on the main thread — doing that once (instead of per sound, per
// toggle) removes the click/jank when a sound is switched on. Each graph still gets its own
// BufferSource node reading this buffer, so playback is independent.
const pinkBufferCache = new WeakMap<AudioContext,AudioBuffer>()
export function getPinkBuffer(ctx:AudioContext):AudioBuffer {
  let b=pinkBufferCache.get(ctx)
  if(!b){ b=makePinkBuffer(ctx,8); pinkBufferCache.set(ctx,b) }
  return b
}

type SynthNode={gain:GainNode;stop:()=>void}
function buildSynthGraph(ctx:AudioContext,id:string,dest:AudioNode=ctx.destination):SynthNode {
  const master=ctx.createGain();master.gain.value=0;master.connect(dest)
  const stops:Array<()=>void>=[]
  const pink=getPinkBuffer(ctx)
  const ns=(_s?:number)=>{const src=ctx.createBufferSource();src.buffer=pink;src.loop=true;return src}
  const flt=(t:BiquadFilterType,f:number,q=1)=>{const n=ctx.createBiquadFilter();n.type=t;n.frequency.value=f;n.Q.value=q;return n}
  const gn=(v:number)=>{const g=ctx.createGain();g.gain.value=v;return g}
  const lfo=(r:number,dv:number,tgt:AudioParam)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=r;g.gain.value=dv;o.connect(g);g.connect(tgt);o.start();stops.push(()=>{try{o.stop()}catch(_){}})}
  const go=(src:AudioBufferSourceNode)=>{src.start();stops.push(()=>{try{src.stop()}catch(_){}})}
  if(id==='rain'){const s=ns(8),hp=flt('highpass',600),lp=flt('lowpass',8000);s.connect(hp);hp.connect(lp);lp.connect(master);go(s);const s2=ns(6),hp2=flt('highpass',4000),g2=gn(0.25);s2.connect(hp2);hp2.connect(g2);g2.connect(master);go(s2)}
  else if(id==='wave'){const s=ns(8),lp=flt('lowpass',420),cg=gn(0.65);s.connect(lp);lp.connect(cg);cg.connect(master);go(s);lfo(0.10,230,lp.frequency);lfo(0.07,130,lp.frequency);lfo(0.10,0.22,cg.gain)}
  else if(id==='cafe'){const cg=gn(0.7);cg.connect(master);const s1=ns(8),bp1=flt('bandpass',550,0.3),g1=gn(1.0);s1.connect(bp1);bp1.connect(g1);g1.connect(cg);go(s1);const s2=ns(7),bp2=flt('bandpass',2100,0.25),g2=gn(0.35);s2.connect(bp2);bp2.connect(g2);g2.connect(cg);go(s2);const s3=ns(5),hp3=flt('highpass',3800),g3=gn(0.0);s3.connect(hp3);hp3.connect(g3);g3.connect(cg);go(s3);lfo(0.35,0.06,g3.gain);lfo(0.13,0.18,cg.gain)}
  else if(id==='fire'){const cg=gn(0.65);cg.connect(master);const s1=ns(8),lp1=flt('lowpass',260);s1.connect(lp1);lp1.connect(cg);go(s1);const s2=ns(5),bp=flt('bandpass',1500,0.6),crk=gn(0.04);s2.connect(bp);bp.connect(crk);crk.connect(master);go(s2);lfo(8.7,0.18,crk.gain);lfo(13.1,0.11,crk.gain);lfo(0.18,0.20,cg.gain)}
  else if(id==='wind'){const s=ns(8),lp=flt('lowpass',520),cg=gn(0.6);s.connect(lp);lp.connect(cg);cg.connect(master);go(s);lfo(0.04,270,lp.frequency);lfo(0.03,160,lp.frequency);lfo(0.04,0.22,cg.gain)}
  else if(id==='thunder'){const s=ns(8),lp=flt('lowpass',140),cg=gn(0.5);s.connect(lp);lp.connect(cg);cg.connect(master);go(s);lfo(0.05,0.35,cg.gain);const s2=ns(6),lp2=flt('lowpass',80),g2=gn(0.3);s2.connect(lp2);lp2.connect(g2);g2.connect(master);go(s2)}
  else{const s=ns(8),bp=flt('bandpass',800,0.4),cg=gn(0.7);s.connect(bp);bp.connect(cg);cg.connect(master);go(s)}
  return{gain:master,stop:()=>stops.forEach(f=>f())}
}

type PomoPhase='work'|'break'|'long'
interface PomoCfg{workMin:number;breakMin:number;longMin:number;cyclesBeforeLong:number;autoStart:boolean}
const POMO_KEY='lofispace-pomodoro'
const phaseSecs=(p:PomoPhase,c:PomoCfg)=>(p==='work'?c.workMin:p==='break'?c.breakMin:c.longMin)*60

/**
 * Wall-clock (endsAt) based Pomodoro. The remaining time is always derived from a target
 * timestamp, so a throttled background tab never drifts. State survives reload via
 * localStorage: a still-running phase resumes at the correct remaining time; a phase that
 * elapsed while the tab was closed settles on the *next* phase, paused (no unattended XP).
 * `completions` is a session-only counter that drives the XP side-effect in the parent — it
 * is deliberately NOT persisted.
 */
function usePomodoro(init:PomoCfg){
  const[cfg,setCfg]=useState<PomoCfg>(init)
  const[phase,setPhase]=useState<PomoPhase>('work')
  const[on,setOn]=useState(false)
  const[completions,setCompletions]=useState(0)
  const[cycleCount,setCycleCount]=useState(0)
  const[endsAt,setEndsAt]=useState<number|null>(null)
  const[remaining,setRemaining]=useState(()=>phaseSecs('work',init))
  const[hydrated,setHydrated]=useState(false)

  const cfgRef=useRef(cfg);   useEffect(()=>{cfgRef.current=cfg},[cfg])
  const onRef=useRef(on);     useEffect(()=>{onRef.current=on},[on])
  const phaseRef=useRef(phase);useEffect(()=>{phaseRef.current=phase},[phase])
  const cycleRef=useRef(cycleCount);useEffect(()=>{cycleRef.current=cycleCount},[cycleCount])

  // finished -> next phase. `countWork` gates whether a finished work phase increments the
  // session completions counter (true for a natural finish, false for an explicit skip).
  const advance=useCallback((finished:PomoPhase,{run,countWork}:{run:boolean;countWork:boolean})=>{
    const c=cfgRef.current
    let next:PomoPhase, nc=cycleRef.current
    if(finished==='work'){
      if(countWork)setCompletions(x=>x+1)
      nc=cycleRef.current+1
      if(nc>=c.cyclesBeforeLong){next='long';nc=0}else next='break'
    }else next='work'
    setCycleCount(nc); setPhase(next)
    const dur=phaseSecs(next,c)
    setRemaining(dur)
    setEndsAt(run?Date.now()+dur*1000:null)
    setOn(run)
  },[])
  const advanceRef=useRef(advance); useEffect(()=>{advanceRef.current=advance},[advance])

  // Rehydrate once on mount
  useEffect(()=>{
    try{
      const raw=localStorage.getItem(POMO_KEY)
      if(raw){
        const s=JSON.parse(raw)
        const nc:PomoCfg=s.cfg?{...init,...s.cfg}:init
        setCfg(nc)
        const ph:PomoPhase=(s.phase==='work'||s.phase==='break'||s.phase==='long')?s.phase:'work'
        setPhase(ph)
        setCycleCount(typeof s.cycleCount==='number'?s.cycleCount:0)
        if(s.on&&typeof s.endsAt==='number'&&s.endsAt>Date.now()){
          setEndsAt(s.endsAt); setOn(true)
          setRemaining(Math.max(1,Math.round((s.endsAt-Date.now())/1000)))
        }else if(s.on&&typeof s.endsAt==='number'){
          // elapsed while away — move to the next phase, paused, without crediting XP
          let nx:PomoPhase, ncy=(typeof s.cycleCount==='number'?s.cycleCount:0)
          if(ph==='work'){ncy+=1; if(ncy>=nc.cyclesBeforeLong){nx='long';ncy=0}else nx='break'}else nx='work'
          setPhase(nx); setCycleCount(ncy); setOn(false); setEndsAt(null)
          setRemaining(phaseSecs(nx,nc))
        }else{
          setOn(false); setEndsAt(null)
          setRemaining(typeof s.remaining==='number'?s.remaining:phaseSecs(ph,nc))
        }
      }
    }catch{/* ignore */}
    setHydrated(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // Persist (after hydration so we never clobber saved state with the initial defaults)
  useEffect(()=>{
    if(!hydrated)return
    try{localStorage.setItem(POMO_KEY,JSON.stringify({cfg,phase,on,endsAt,remaining,cycleCount}))}catch{/* ignore */}
  },[hydrated,cfg,phase,on,endsAt,remaining,cycleCount])

  // Ticker — derives `remaining` from `endsAt`; flips phase when it hits zero
  useEffect(()=>{
    if(!on||endsAt==null)return
    const tick=()=>{
      const rem=Math.round((endsAt-Date.now())/1000)
      if(rem<=0) advanceRef.current(phase,{run:cfgRef.current.autoStart,countWork:true})
      else setRemaining(rem)
    }
    tick()
    const id=setInterval(tick,250)
    return()=>clearInterval(id)
  },[on,endsAt,phase])

  const toggle=useCallback(()=>{
    if(onRef.current){
      if(endsAt)setRemaining(Math.max(0,Math.round((endsAt-Date.now())/1000)))
      setEndsAt(null); setOn(false)
    }else{
      setRemaining(r=>{ setEndsAt(Date.now()+r*1000); return r })
      setOn(true)
    }
  },[endsAt])
  const reset=useCallback(()=>{
    setOn(false); setPhase('work'); setCycleCount(0); setEndsAt(null)
    setRemaining(phaseSecs('work',cfgRef.current))
  },[])
  const setMode=useCallback((m:'work'|'break')=>{
    setOn(false); setPhase(m); setEndsAt(null)
    setRemaining(phaseSecs(m,cfgRef.current))
  },[])
  const skip=useCallback(()=>{
    advanceRef.current(phaseRef.current,{run:onRef.current,countWork:false})
  },[])
  const patchCfg=useCallback((p:Partial<PomoCfg>)=>{
    setCfg(c=>{
      const nc={...c,...p}
      if(!onRef.current)setRemaining(phaseSecs(phaseRef.current,nc))
      return nc
    })
  },[])

  const total=phaseSecs(phase,cfg)
  return{
    mm:String(Math.floor(Math.max(0,remaining)/60)).padStart(2,'0'),
    ss:String(Math.max(0,remaining)%60).padStart(2,'0'),
    on,toggle,phase,completions,cycleCount,
    progress:Math.max(0,Math.min(1,remaining/total)),
    workMin:cfg.workMin,cfg,
    reset,setMode,skip,patchCfg,
  }
}

export function EmbedClient() {
  const sp = useSearchParams()
  const dn = getDayNightConfig()
  const { lang, setLang, t } = useLanguage()
  const hasBgParam = sp.has('bgv')

  // Resolve the saved background on the very first render (instead of in a post-mount effect)
  // so the default clip is never fetched just to be swapped out a frame later. Safe: this
  // tree always client-renders (useSearchParams bails the route out of prerendering).
  const [initBgUrl] = useState(()=>hasBgParam ? decodeURIComponent(sp.get('bgv')!) : (savedBgUrl() ?? '/video/street-scene.mp4'))
  const initBgOp   = Math.min(90, Math.max(0, parseInt(sp.get('bgo') ?? String(dn.overlay))))
  const initBlur   = Math.min(20, Math.max(0, parseInt(sp.get('bl') ?? '0')))
  const initWorkMin  = Math.min(90, Math.max(1, parseInt(sp.get('pw') ?? '25') || 25))
  const initBreakMin = Math.min(30, Math.max(1, parseInt(sp.get('pb') ?? '5') || 5))
  const initLongMin  = Math.min(60, Math.max(1, parseInt(sp.get('plb') ?? '15') || 15))
  const initCycles   = Math.min(8,  Math.max(2, parseInt(sp.get('pc') ?? '4') || 4))
  const initAutoStart= sp.get('pas')!=='0'
  const urlAccent  = '#' + (sp.get('ac') ?? dn.accent.replace('#',''))
  const urlWx:WxData|null = (sp.get('city')&&sp.get('temp'))
    ? {city:sp.get('city')!,temp:parseInt(sp.get('temp')!),code:0,desc:sp.get('wdesc')??'',emoji:sp.get('wemoji')??'🌤️',feels:null,humidity:null,wind:null}
    : null

  // Theme
  const [theme,       setTheme]       = useState<'glass'|'warm'>('glass')

  // Background
  const [bgType,      setBgType]      = useState<BgType>(()=>bgTypeFromUrl(initBgUrl))
  const [bgUrl,       setBgUrl]       = useState(initBgUrl)
  const [bgOpacity,   setBgOpacity]   = useState(initBgOp)
  const [bgBlur,      setBgBlur]      = useState(initBlur)
  // Presets paint their poster instantly, so start visible (no fade-in over the boot backdrop)
  const [bgReady,     setBgReady]     = useState(()=>!!getBgPresetByUrl(initBgUrl)?.poster)
  const [showBgSpinner, setShowBgSpinner] = useState(false)
  const [prevBg,      setPrevBg]      = useState<{url:string;type:BgType}|null>(null)
  const [bgYtInput,   setBgYtInput]   = useState('')
  const [bgYtId,      setBgYtId]      = useState('')
  const [customBg,    setCustomBg]    = useState('')

  // Clock
  const [showClock,   setShowClock]   = useState(sp.get('clk')!=='0')
  const [clockStyle,  setClockStyle]  = useState<ClockStyle>('digital')
  const clockDrag = useDraggable()

  // Weather
  const [showWx,      setShowWx]      = useState(!!urlWx)
  const [wxState,     setWxState]     = useState<'idle'|'loading'|'done'|'error'>('idle')
  const [wxData,      setWxData]      = useState<WxData|null>(urlWx)
  const wxDrag = useDraggable()

  // Pomodoro
  const [showPom,     setShowPom]     = useState(sp.get('pom')!=='0')
  const pom = usePomodoro({workMin:initWorkMin,breakMin:initBreakMin,longMin:initLongMin,cyclesBeforeLong:initCycles,autoStart:initAutoStart})

  // Note / Todo
  const [showNote,    setShowNote]    = useState(sp.get('note')!=='0')
  const [todos,       setTodos]       = useState<Todo[]>([])
  const [todoInput,   setTodoInput]   = useState('')
  const [todoEstInput,setTodoEstInput]= useState('')
  const [activeTodoId,setActiveTodoId]= useState<string|null>(null)
  const noteDrag      = useDraggable()
  const pomDrag       = useDraggable()
  const progressDrag  = useDraggable()

  const [showStreak,  setShowStreak]  = useState(true)

  // Atmosphere overlay
  const [atmosphere,  setAtmosphere]  = useState<'none'|'day'|'dusk'|'night'|'dim'>('none')

  // Calendar
  const [showCal,     setShowCal]     = useState(false)
  const [calMonth,    setCalMonth]    = useState({y:new Date().getFullYear(),m:new Date().getMonth()})
  const [calSelected, setCalSelected] = useState('')
  const [calNotes,    setCalNotes]    = useState<Record<string,{id:number;text:string}[]>>({})
  const [calInput,    setCalInput]    = useState('')

  // Audio
  const [lofiId,      setLofiId]      = useState(sp.get('ls') ?? dn.lofiId)
  const [lofiVol,     setLofiVol]     = useState(Math.min(100, Math.max(0, parseInt(sp.get('lv') ?? '60'))))
  const [ambVols,     setAmbVols]     = useState<Record<string,number>>(()=>{
    const at=sp.get('at')??''
    if(at) return Object.fromEntries(at.split(',').flatMap(e=>{const[id,v]=e.split(':');return id?[[id,Math.min(100,Math.max(0,parseInt(v)||50))]]:[] }))
    if(!hasBgParam) return Object.fromEntries(Object.entries(dn.ambVols).map(([id,v])=>[id,v]))
    return {}
  })
  const [customLofiInput, setCustomLofiInput] = useState('')
  const [customLofiId,    setCustomLofiId]    = useState('')

  // UI
  const [started,     setStarted]     = useState(false)
  const [playing,     setPlaying]     = useState(false)
  const [panel,       setPanel]       = useState(false)
  const [panelTab,    setPanelTab]    = useState<PanelTab>('music')
  const [moreTab,     setMoreTab]     = useState<MoreTab>('widgets')
  const [openPopover, setOpenPopover] = useState<'youtube'|'background'|'more'|null>(null)
  const [pomRef,  pomH]    = useHeight()
  const [noteRef, noteH]   = useHeight()
  const [streakRef,streakH]= useHeight()
  const [wxRef,   wxH]     = useHeight()
  const [mounted,     setMounted]     = useState(false)
  const [ytStatus,    setYtStatus]    = useState<'idle'|'loading'|'ready'|'blocked'|'tap'|'unavailable'>('idle')
  const [copied,      setCopied]      = useState(false)
  const [vw,          setVw]          = useState(1280)
  const [showSupport,  setShowSupport]  = useState(false)
  const [showOnboard,  setShowOnboard]  = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zen,          setZen]          = useState(false)
  const [showShortcuts,setShowShortcuts]= useState(false)
  const [showPomCfg,   setShowPomCfg]   = useState(false)
  const [tip,          setTip]          = useState<TipState>(null)

  // Come Home (evening decompression) mode. Everything focus-related stays mounted but hidden,
  // so switching back is instant and no timer/todo/audio state is lost.
  const [mode,         setMode]         = useState<'focus'|'home'>('focus')
  const [masterVol,    setMasterVol]    = useState(100)
  const home = mode==='home'

  // Refs
  const ctxRef    = useRef<AudioContext|null>(null)
  const synthRef  = useRef<Record<string,SynthNode>>({})
  const ytRef     = useRef<HTMLDivElement>(null)
  const ytPlayer  = useRef<any>(null)
  const ytTimer   = useRef<ReturnType<typeof setTimeout>|null>(null)
  const manualYtInit = useRef(false) // true once a real (user-driven) player init has started — stops the silent pre-init from racing it
  const ytAutoRetriedRef = useRef(false) // one free automatic re-init before we surface the manual Retry UI
  const ytWarmRef = useRef<(()=>void)|null>(null) // pulls the silent pre-init forward on start-overlay hover
  const ytReadyRef  = useRef(false)             // current player fired onReady
  const ytWantRef   = useRef(false)             // we want sound right now (vs. silent pre-init / paused)
  const ytVidRef    = useRef<string|null>(null) // video the player is on
  const ytTargetRef = useRef<string|null>(null) // video we want it on (applied in onReady if still booting)
  const ytDeadRef   = useRef<Set<string>>(new Set()) // ids that errored as removed / not embeddable
  const ytErrorRef  = useRef<(code:number,id?:string)=>void>(()=>{})
  const ytStatusRef = useRef<string>('idle')
  const noteTimer = useRef<ReturnType<typeof setTimeout>|null>(null)
  const shownBgRef  = useRef<{url:string;type:BgType}|null>(null)
  const prevBgTimer = useRef<ReturnType<typeof setTimeout>|null>(null)
  const bgElRef     = useRef<HTMLVideoElement|HTMLImageElement|null>(null)
  const bgPrefetchedRef = useRef(false)
  const masterGainRef = useRef<GainNode|null>(null) // every ambient synth routes through this
  const masterVolRef  = useRef(100)
  const initialHomeRef = useRef(sp.get('mode')==='home')
  // What focus mode looked like when Come Home was entered — restored exactly on the way back
  const homeSnap = useRef<{ambVols:Record<string,number>;started:boolean;playing:boolean;bgUrl:string;bgType:BgType;bgOpacity:number;bgBlur:number;atmosphere:typeof atmosphere;masterVol:number;pomWasOn:boolean}|null>(null)

  // ── Game store ──────────────────────────────────────────────────────────
  const {
    streak, bestStreak, xp, level, coins, totalPomodoros,
    pendingAchievements, newLevelReached,
    completePomodoro, recordActivity, dismissAchievement, dismissLevelUp,
    unlockedAchievements, dailyStats, dailyGoalPomodoros, setDailyGoal,
  } = useGameStore()
  const todayPoms = dailyStats[localDate()]?.pomodoros ?? 0
  const [xpToast, setXpToast] = useState<{xp:number;key:number}|null>(null)
  const [goalToast, setGoalToast] = useState<number|null>(null)

  useEffect(()=>{ setMounted(true); analytics.workspaceOpen() },[])
  useEffect(()=>{
    const upd=()=>setVw(window.innerWidth)
    upd(); window.addEventListener('resize',upd)
    return()=>window.removeEventListener('resize',upd)
  },[])
  // On mobile the floating panels stack vertically in one column (see mobTop below) and the
  // root canvas is overflow:hidden (keeps the fixed background pinned, so it can't scroll).
  // Progress/Streak is the least essential of the default-open panels, so skip it by default
  // on first mobile load to keep Pomodoro + To-Do reachable without exceeding the viewport.
  useEffect(()=>{
    if(window.innerWidth<640) setShowStreak(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  // Fullscreen sync
  useEffect(()=>{
    const h=()=>setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange',h)
    return()=>document.removeEventListener('fullscreenchange',h)
  },[])
  // Restore settings from localStorage (URL params take priority)
  useEffect(()=>{
    try{
      const s=JSON.parse(localStorage.getItem('lofispace-settings')||'{}')
      if(!sp.has('bgo')&&s.bgOpacity!=null)setBgOpacity(s.bgOpacity)
      if(!sp.has('bl')&&s.bgBlur!=null)setBgBlur(s.bgBlur)
      if(!sp.has('ls')&&s.lofiId)setLofiId(s.lofiId)
      if(typeof s.customLofiId==='string'&&/^[\w-]{11}$/.test(s.customLofiId))setCustomLofiId(s.customLofiId)
      if(!sp.has('lv')&&s.lofiVol!=null)setLofiVol(s.lofiVol)
      if(!sp.has('at')&&s.ambVols)setAmbVols(s.ambVols)
      if(s.theme)setTheme(s.theme)
      if(s.clockStyle)setClockStyle(s.clockStyle)
      if(s.atmosphere)setAtmosphere(s.atmosphere)
    }catch(_){}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  // Save settings to localStorage on change (gated on mounted to skip first render)
  useEffect(()=>{
    // Come Home temporarily swaps background/sounds — never persist those as focus settings
    if(!mounted||mode==='home')return
    try{localStorage.setItem('lofispace-settings',JSON.stringify({bgUrl,bgOpacity,bgBlur,lofiId,customLofiId,lofiVol,ambVols,theme,clockStyle,atmosphere}))}catch(_){}
  },[mounted,mode,bgUrl,bgOpacity,bgBlur,lofiId,customLofiId,lofiVol,ambVols,theme,clockStyle,atmosphere])
  useEffect(()=>{ recordActivity() },[recordActivity])
  const handleBgReady=useCallback(()=>{
    setBgReady(true)
    setShowBgSpinner(false)
    shownBgRef.current={url:bgUrl,type:bgType}
    if(prevBgTimer.current)clearTimeout(prevBgTimer.current)
    prevBgTimer.current=setTimeout(()=>setPrevBg(null),550)
  },[bgUrl,bgType])
  // Keep the last-shown background visible (crossfade base) until the new one has loaded,
  // so switching backgrounds never drops to the bare gradient placeholder mid-transition
  useEffect(()=>{
    setShowBgSpinner(false)
    // The <video> element is now reused (no key) — its src prop was just updated by React,
    // but a bare src swap doesn't reliably kick off a fresh load in every browser, so do it
    // explicitly. (Harmless for the <img> path, which reloads on src change by itself.)
    const vel=bgElRef.current
    // Skipped when the element is already on this clip (first mount) — a redundant load()
    // would abort the in-flight fetch and restart it.
    if(vel instanceof HTMLVideoElement&&vel.currentSrc&&!vel.currentSrc.endsWith(bgUrl)){ try{ vel.load() }catch{/* no-op */} }
    // Known presets ship a pre-generated first-frame poster (tiny JPG) — the <video poster>
    // attribute paints it immediately, well before the clip itself buffers, so there's no
    // reason to keep showing the old background while we wait: that's what made switching
    // feel slow/frozen. Skip the crossfade wait entirely for these.
    if(getBgPresetByUrl(bgUrl)?.poster){
      setBgReady(true)
      shownBgRef.current={url:bgUrl,type:bgType}
      if(prevBgTimer.current)clearTimeout(prevBgTimer.current)
      setPrevBg(null)
      return
    }
    setBgReady(false)
    // Large/custom backgrounds (no poster) can take a while to buffer on a cold cache —
    // don't flash a spinner on the common fast/cached case, only surface it once the wait
    // is long enough that the switch would otherwise look frozen.
    const spinnerTimer=setTimeout(()=>setShowBgSpinner(true),350)
    if(shownBgRef.current&&shownBgRef.current.url!==bgUrl){
      setPrevBg(shownBgRef.current)
      if(prevBgTimer.current)clearTimeout(prevBgTimer.current)
    }
    // The server-rendered <video autoplay>/<img> may start loading before this effect's
    // listeners attach, so 'canplay'/'load' can fire and be missed — check current state too.
    const el=bgElRef.current
    if(el instanceof HTMLVideoElement && el.readyState>=3) handleBgReady()
    else if(el instanceof HTMLImageElement && el.complete && el.naturalWidth>0) handleBgReady()
    return ()=>clearTimeout(spinnerTimer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[bgUrl])
  // When the user opens the Background popover, warm only the tiny poster JPGs so every
  // preset shows an instant preview frame the moment it's picked. The heavy clips are NOT
  // bulk-downloaded here any more (that was ~9 MB just for opening the popover, contending
  // with the live audio stream) — each full clip is fetched on demand when its button is
  // hovered/focused, via prefetchScene() below. The guard flips only after the posters
  // actually resolve, so a flaky first attempt can retry on the next open.
  useEffect(()=>{
    if(openPopover!=='background'||bgPrefetchedRef.current)return
    const conn=(navigator as any).connection
    if(conn?.saveData||conn?.effectiveType==='2g'||conn?.effectiveType==='slow-2g')return
    const posters=BG_PRESETS.filter(p=>p.url!==bgUrl).map(p=>p.poster)
    Promise.allSettled(posters.map(u=>fetch(u,{credentials:'omit'})))
      .then(()=>{ bgPrefetchedRef.current=true })
  },[openPopover,bgUrl])
  // Pull a single scene's full clip into the HTTP cache when the user hovers/focuses its
  // button, so the click that follows resolves instantly. Skipped on constrained connections.
  const prefetchScene=useCallback((url:string)=>{
    const conn=(navigator as any).connection
    if(conn?.saveData||conn?.effectiveType==='2g'||conn?.effectiveType==='slow-2g')return
    fetch(url,{credentials:'omit',priority:'low'} as RequestInit).catch(()=>{})
  },[])
  useEffect(()=>{
    if(pom.completions===0) return
    const activeTodo = activeTodoId ? todos.find(x=>x.id===activeTodoId) : undefined
    completePomodoro(pom.workMin, activeTodo ? {id:activeTodo.id, title:activeTodo.text} : undefined)
    setXpToast({xp:pom.workMin,key:Date.now()})
    setTimeout(()=>setXpToast(null),2800)
    if(activeTodoId){
      setTodos(prev=>{
        const next=prev.map(x=>x.id===activeTodoId?{...x,actual:(x.actual??0)+1}:x)
        if(noteTimer.current)clearTimeout(noteTimer.current)
        localStorage.setItem('lofispace-todos',JSON.stringify(next))
        return next
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pom.completions])
  useEffect(()=>{
    if(typeof window!=='undefined'){
      try{
        const t=JSON.parse(localStorage.getItem('lofispace-todos')||'[]')
        setTodos(Array.isArray(t)?t.map((x:Todo)=>({...x,actual:x.actual??0})):[])
      }catch(_){}
      try{ setActiveTodoId(localStorage.getItem('lofispace-active-todo')) }catch(_){}
    }
  },[])
  useEffect(()=>{
    try{const cn=JSON.parse(localStorage.getItem('lofispace-calNotes')||'{}');if(cn&&typeof cn==='object')setCalNotes(cn)}catch(_){}
    const t=new Date();setCalSelected(`${t.getFullYear()}-${t.getMonth()}-${t.getDate()}`)
  },[])
  useEffect(()=>{ loadYtApi().catch(()=>{/* retried on first play */}) },[])
  // Show onboarding tip on first visit, auto-dismiss after 6s
  useEffect(()=>{
    if(localStorage.getItem('lofispace-onboarded'))return
    const show=setTimeout(()=>setShowOnboard(true),1800)
    const hide=setTimeout(()=>{setShowOnboard(false);localStorage.setItem('lofispace-onboarded','1')},7800)
    return()=>{clearTimeout(show);clearTimeout(hide)}
  },[])

  // Pre-build the YT player silently (no sound) so first play only needs playVideo().
  useEffect(()=>{
    const pre=()=>{ if(!ytPlayer.current&&!manualYtInit.current)createYtRef.current(activeYtIdRef.current) }
    // Also let an explicit hover/focus over the "Click to start" overlay pull the pre-init
    // forward — by the time the user's pointer reaches the button the player is usually warm.
    ytWarmRef.current=pre
    // Constructing the YT.Player pulls in YouTube's own embed JS/CSS (~1MB) — on a cold load
    // that competes with the app's own JS and the background clip. Wait for the page's load
    // event, then an idle slot, so it never fights the critical first paint for bandwidth.
    const idle=(cb:()=>void)=>{
      if('requestIdleCallback' in window)(window as any).requestIdleCallback(cb,{timeout:4000})
      else setTimeout(cb,1200)
    }
    if(document.readyState==='complete')idle(pre)
    else window.addEventListener('load',()=>idle(pre),{once:true})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  // Auto-detect weather — deferred until the user has actually entered the workspace
  // (clicked "start"), so geolocation + two cross-origin fetches never contend with the
  // cold-load critical path. Skipped if the URL already carries weather data.
  useEffect(()=>{
    if(urlWx||!started)return
    const t=setTimeout(()=>detectWeather(),1200)
    return()=>clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[started])

  // ── Audio ──────────────────────────────────────────────────────────────
  const ensureCtx = useCallback(()=>{
    if(!ctxRef.current){
      const ctx=new(window.AudioContext||(window as any).webkitAudioContext)()
      const mg=ctx.createGain(); mg.gain.value=masterVolRef.current/100; mg.connect(ctx.destination)
      ctxRef.current=ctx; masterGainRef.current=mg
    }
    return ctxRef.current
  },[])
  // YouTube volume scaled by the master level (100 in focus mode unless changed in Come Home)
  const effYt=(v:number)=>Math.round(v*masterVolRef.current/100)

  const startAmbient = useCallback((id:string,vol:number)=>{
    if(synthRef.current[id])return
    const ctx=ensureCtx();ctx.resume().catch(()=>{})
    const node=buildSynthGraph(ctx,id,masterGainRef.current??ctx.destination)
    node.gain.gain.setTargetAtTime((vol/100)*0.6,ctx.currentTime,0.1)
    synthRef.current[id]=node
  },[ensureCtx])

  const stopAmbient = useCallback((id:string)=>{
    const node=synthRef.current[id]
    if(node&&ctxRef.current){
      // Detach from the map immediately so a quick re-enable builds a fresh graph instead of
      // being swallowed by this one's pending teardown.
      delete synthRef.current[id]
      node.gain.gain.setTargetAtTime(0,ctxRef.current.currentTime,0.15)
      setTimeout(()=>{try{node.stop()}catch(_){}},300)
    }
  },[])

  const setAmbVol = useCallback((id:string,vol:number)=>{
    const s=(vol/100)*0.6
    if(synthRef.current[id]&&ctxRef.current)synthRef.current[id].gain.gain.setTargetAtTime(s,ctxRef.current.currentTime,0.05)
  },[])

  // ── YouTube ────────────────────────────────────────────────────────────
  // One long-lived player. It's built once (silently, before "start" when possible) and
  // re-pointed with loadVideoById() on track changes — rebuilding it meant a fresh ~1MB embed
  // and iframe handshake on every switch. Every play request arms a watchdog that tells
  // apart the ways it can fail:
  //   • player ready but not playing  → the browser refused autoplay (iOS/Safari) → 'tap'
  //   • player never became ready     → embed blocked/slow → rebuild once, then 'blocked'
  //   • onError 2/100/101/150         → video gone or embedding disabled → next preset stream
  const activeYtId = (lofiId==='custom'&&customLofiId) ? customLofiId : (LOFI_STREAMS.find(s=>s.id===lofiId)?.youtubeId??DEFAULT_YT)
  const activeYtIdRef=useRef(activeYtId)
  const lofiVolRef=useRef(lofiVol)
  const lofiIdRef=useRef(lofiId)
  useEffect(()=>{ activeYtIdRef.current=activeYtId; lofiVolRef.current=lofiVol; lofiIdRef.current=lofiId })

  const clearYtWatch=()=>{ if(ytTimer.current){clearTimeout(ytTimer.current);ytTimer.current=null} }

  const createYt=useCallback((ytId:string)=>{
    if(!ytRef.current)return
    clearYtWatch()
    try{ytPlayer.current?.destroy()}catch{/* ignore */}
    ytPlayer.current=null
    ytReadyRef.current=false
    ytVidRef.current=ytId
    if(!ytTargetRef.current)ytTargetRef.current=ytId
    ytRef.current.innerHTML=''
    const container=document.createElement('div')
    ytRef.current.appendChild(container)
    loadYtApi().then(()=>{
      if(!container.isConnected)return // superseded by a newer rebuild
      ytPlayer.current=new(window as any).YT.Player(container,{
        height:'180',width:'320',videoId:ytId,
        playerVars:{autoplay:0,controls:0,disablekb:1,playsinline:1,enablejsapi:1,origin:window.location.origin},
        events:{
          onReady:(e:any)=>{
            ytReadyRef.current=true
            const p=e.target
            if(!ytWantRef.current){ try{p.mute();p.setVolume(0)}catch{/* ignore */} return }
            try{
              p.unMute();p.setVolume(effYt(lofiVolRef.current))
              const want=ytTargetRef.current
              if(want&&want!==ytVidRef.current){ytVidRef.current=want;p.loadVideoById(want)}else p.playVideo()
            }catch{/* ignore */}
          },
          onStateChange:(e:any)=>{
            if(e.data===1){ clearYtWatch(); ytAutoRetriedRef.current=false; setYtStatus('ready') }
            // Live streams occasionally report ENDED on a reconnect — pick them back up.
            else if(e.data===0&&ytWantRef.current){ try{e.target.loadVideoById(ytVidRef.current)}catch{/* ignore */} }
          },
          onError:(e:any)=>ytErrorRef.current(e.data),
        },
      })
    }).catch(()=>{ /* API script failed to load — the watchdog rebuilds / surfaces Retry */ })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const createYtRef=useRef(createYt)

  const armYtWatch=useCallback(()=>{
    clearYtWatch()
    const check=(waited:number)=>{
      ytTimer.current=null
      if(!ytWantRef.current)return
      const p=ytPlayer.current
      let st:number|null=null
      try{ st=ytReadyRef.current&&p?.getPlayerState?p.getPlayerState():null }catch{/* ignore */}
      if(st===1)return
      // Live streams can sit in BUFFERING for a while on a slow link — keep waiting.
      if(st===3&&waited<24000){ ytTimer.current=setTimeout(()=>check(waited+4000),4000); return }
      if(ytReadyRef.current){ setYtStatus('tap'); return }
      if(!ytAutoRetriedRef.current){
        ytAutoRetriedRef.current=true
        createYtRef.current(ytTargetRef.current??activeYtIdRef.current)
        ytTimer.current=setTimeout(()=>check(0),10000)
      }else setYtStatus('blocked')
    }
    ytTimer.current=setTimeout(()=>check(8000),8000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  /** Start (or switch to) a stream. Call straight from a click handler where possible —
   *  on iOS the playVideo() has to happen inside the user gesture. */
  const playYt=useCallback((ytId:string,userInitiated=false)=>{
    manualYtInit.current=true
    ytWantRef.current=true
    ytTargetRef.current=ytId
    if(userInitiated)ytAutoRetriedRef.current=false
    // Already known to be removed / not embeddable — don't make the person wait for a timeout.
    if(ytDeadRef.current.has(ytId)){ ytErrorRef.current(150,ytId); return }
    const p=ytPlayer.current
    if(p&&ytReadyRef.current){
      try{
        p.unMute();p.setVolume(effYt(lofiVolRef.current))
        if(ytVidRef.current!==ytId){ytVidRef.current=ytId;p.loadVideoById(ytId);setYtStatus('loading')}
        else{ p.playVideo(); if(p.getPlayerState?.()!==1)setYtStatus('loading') }
        armYtWatch()
        return
      }catch{/* broken player — rebuild below */}
    }
    setYtStatus('loading')
    // A player that's still booting picks up ytTargetRef in its onReady; only a Retry after
    // a failure (or a missing player) forces a rebuild.
    if(!ytRef.current?.firstChild||(userInitiated&&ytStatusRef.current==='blocked'))createYt(ytId)
    armYtWatch()
  },[armYtWatch,createYt])

  const pauseYt=useCallback(()=>{
    ytWantRef.current=false
    clearYtWatch()
    setYtStatus(s=>s==='tap'||s==='loading'?'idle':s)
    try{ytPlayer.current?.pauseVideo()}catch{/* ignore */}
  },[])

  // Dead video (removed, private, embedding disabled): retrying can't help. For preset
  // streams fall through to the next one that hasn't failed yet; a custom link surfaces Retry.
  useEffect(()=>{
    ytErrorRef.current=(code:number,id?:string)=>{
      console.warn('YT error code:',code)
      if([2,100,101,150].includes(code)){
        ytDeadRef.current.add(id??ytVidRef.current??'')
        // Found during the silent pre-init: just remember it — playYt() reroutes on start.
        if(!ytWantRef.current)return
        clearYtWatch()
        if(lofiIdRef.current!=='custom'){
          const next=LOFI_STREAMS.find(x=>!ytDeadRef.current.has(x.youtubeId))
          if(next){ setLofiId(next.id); playYt(next.youtubeId); return }
        }
        setYtStatus('unavailable'); return
      }
      clearYtWatch()
      // Transient (5 = HTML5 player error): one silent rebuild, then Retry.
      if(!ytAutoRetriedRef.current&&ytWantRef.current){ ytAutoRetriedRef.current=true; createYt(ytVidRef.current??activeYtIdRef.current); armYtWatch() }
      else setYtStatus('blocked')
    }
  },[playYt,createYt,armYtWatch])
  useEffect(()=>{ ytStatusRef.current=ytStatus },[ytStatus])

  const doStart = useCallback(()=>{
    if(started)return
    const ctx=ensureCtx();ctx.resume().catch(()=>{})
    // Ask for notification permission here — this is a genuine user gesture, so the prompt
    // is allowed; used for the Pomodoro phase-change nudge when the tab is in the background.
    try{ if(typeof Notification!=='undefined'&&Notification.permission==='default') Notification.requestPermission().catch(()=>{}) }catch{/* ignore */}
    Object.entries(ambVols).forEach(([id,vol])=>startAmbient(id,vol))
    playYt(activeYtId,true)
    setStarted(true);setPlaying(true)
  },[started,ensureCtx,ambVols,startAmbient,playYt,activeYtId])

  const togglePlay = useCallback(()=>{
    if(!started){doStart();return}
    const next=!playing;setPlaying(next)
    if(next){
      ctxRef.current?.resume();playYt(activeYtId)
      const ctx=ctxRef.current
      if(ctx)Object.entries(synthRef.current).forEach(([id,n])=>n.gain.gain.setTargetAtTime((ambVols[id]??50)/100*0.6,ctx.currentTime,0.1))
    }else{
      pauseYt()
      const ctx=ctxRef.current
      if(ctx)Object.values(synthRef.current).forEach(n=>n.gain.gain.setTargetAtTime(0,ctx.currentTime,0.1))
    }
  },[started,playing,doStart,ambVols,playYt,pauseYt,activeYtId])

  const handleLofiVol=(v:number)=>{setLofiVol(v);if(started)try{ytPlayer.current?.setVolume(effYt(v))}catch(_){}}
  const handleLofiChange=(id:string)=>{
    setLofiId(id)
    if(started){const ytId=(id==='custom'&&customLofiId)?customLofiId:(LOFI_STREAMS.find(s=>s.id===id)?.youtubeId??DEFAULT_YT);setPlaying(true);playYt(ytId,true)}
  }
  const applyCustomLofi=()=>{
    const id=parseYtId(customLofiInput);if(!id)return
    ytDeadRef.current.delete(id)
    setCustomLofiId(id);setLofiId('custom')
    if(started){setPlaying(true);playYt(id,true)}
  }
  const retryYT=useCallback(()=>{
    if(!started)return
    ytDeadRef.current.delete(activeYtId)
    setPlaying(true);playYt(activeYtId,true)
  },[started,playYt,activeYtId])
  const dismissOnboard=()=>{
    setShowOnboard(false)
    localStorage.setItem('lofispace-onboarded','1')
  }
  const toggleAmbient=(id:string)=>{
    if(ambVols[id]!==undefined){if(started)stopAmbient(id);setAmbVols(prev=>{const n={...prev};delete n[id];return n})}
    else{if(started&&playing)startAmbient(id,50);setAmbVols(prev=>({...prev,[id]:50}))}
  }
  // Only touch the live gain while audible — paused layers sit at 0 and must stay silent
  const handleAmbVol=(id:string,v:number)=>{setAmbVols(prev=>({...prev,[id]:v}));if(started&&playing)setAmbVol(id,v)}

  // ── Come Home mode ─────────────────────────────────────────────────────
  // Master level: scales every ambient layer (via masterGain) and the YouTube stream.
  useEffect(()=>{
    masterVolRef.current=masterVol
    const ctx=ctxRef.current,mg=masterGainRef.current
    if(ctx&&mg)mg.gain.setTargetAtTime(masterVol/100,ctx.currentTime,0.4)
    if(started&&playing&&!home)try{ytPlayer.current?.setVolume(effYt(lofiVol))}catch{/* ignore */}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[masterVol])

  // Crossfade the running synth graphs to `next`. Layers only start if `live`.
  const applyMix=useCallback((next:Record<string,number>,live:boolean)=>{
    Object.keys(synthRef.current).forEach(id=>{ if(!(id in next))stopAmbient(id) })
    if(live)Object.entries(next).forEach(([id,v])=>{ if(synthRef.current[id])setAmbVol(id,v); else startAmbient(id,v) })
    setAmbVols(next)
  },[stopAmbient,setAmbVol,startAmbient])
  const muteAllSynths=useCallback(()=>{
    const ctx=ctxRef.current
    if(ctx)Object.values(synthRef.current).forEach(n=>n.gain.gain.setTargetAtTime(0,ctx.currentTime,0.3))
  },[])

  // Explicit user gesture only (browser autoplay policy + "no surprise audio" rule).
  const homeSoundOn=useCallback((mix:Record<string,number>)=>{
    const ctx=ensureCtx();ctx.resume().catch(()=>{})
    Object.entries(mix).forEach(([id,v])=>{
      const n=synthRef.current[id]
      if(n)n.gain.gain.setTargetAtTime((v/100)*0.6,ctx.currentTime,0.5); else startAmbient(id,v)
    })
    setStarted(true);setPlaying(true)
  },[ensureCtx,startAmbient])

  const setBackdrop=useCallback((id:string)=>{
    const p=BG_PRESETS.find(b=>b.id===id)
    if(p&&p.url!==bgUrl){setBgUrl(p.url);setBgType(bgTypeFromUrl(p.url))}
  },[bgUrl])

  const enterHome=useCallback(()=>{
    if(mode==='home')return
    homeSnap.current={ambVols,started,playing,bgUrl,bgType,bgOpacity,bgBlur,atmosphere,masterVol,pomWasOn:pom.on}
    if(pom.on)pom.toggle() // no phase chimes or notifications while decompressing
    pauseYt()
    // If audio was already running the person has opted in — keep it, just much softer.
    applyMix(HOME_MIX,started&&playing)
    setMasterVol(HOME_MASTER)
    if(bgUrl!==HOME_BG){setBgUrl(HOME_BG);setBgType('video')}
    setBgOpacity(40);setBgBlur(0);setAtmosphere('night')
    setPanel(false);setOpenPopover(null);setZen(false);setShowShortcuts(false);setShowCal(false);setShowOnboard(false)
    setMode('home')
    try{const u=new URL(window.location.href);if(u.searchParams.get('mode')!=='home'){u.searchParams.set('mode','home');window.history.replaceState(window.history.state,'',u)}}catch{/* ignore */}
  },[mode,ambVols,started,playing,bgUrl,bgType,bgOpacity,bgBlur,atmosphere,masterVol,pom,applyMix,pauseYt])

  const exitHome=useCallback(()=>{
    const snap=homeSnap.current
    homeSnap.current=null
    setMode('focus')
    try{const u=new URL(window.location.href);u.searchParams.delete('mode');window.history.replaceState(window.history.state,'',u)}catch{/* ignore */}
    if(!snap)return
    setMasterVol(snap.masterVol)
    setBgUrl(snap.bgUrl);setBgType(snap.bgType);setBgOpacity(snap.bgOpacity);setBgBlur(snap.bgBlur);setAtmosphere(snap.atmosphere)
    if(!snap.started){
      // Came straight from the start overlay: put everything back so "Click to start" works as before.
      Object.keys(synthRef.current).forEach(id=>stopAmbient(id))
      setAmbVols(snap.ambVols);setStarted(false);setPlaying(false)
    }else if(snap.playing){
      applyMix(snap.ambVols,true)
      masterVolRef.current=snap.masterVol // so playYt() applies the focus-mode level, not home's
      playYt(activeYtId,true)
      setPlaying(true)
    }else{
      applyMix(snap.ambVols,false);muteAllSynths();setPlaying(false)
    }
    if(snap.pomWasOn&&!pom.on)pom.toggle()
  },[applyMix,stopAmbient,muteAllSynths,playYt,activeYtId,pom])

  // Opened via /workspace?mode=home (blog + landing CTAs). Runs after the saved-settings
  // restore has landed in state, so the snapshot holds the person's real focus setup.
  useEffect(()=>{
    if(mounted&&initialHomeRef.current){initialHomeRef.current=false;enterHome()}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[mounted])

  const homeAudio:HomeAudio={
    soundOn:home&&started&&playing,
    enableSound:()=>{
      const mix=Object.keys(ambVols).length?ambVols:HOME_MIX
      if(mix!==ambVols)setAmbVols(mix) // keep the mixer UI in sync with what actually plays
      homeSoundOn(mix)
    },
    disableSound:()=>{muteAllSynths();setPlaying(false)},
    vols:ambVols,
    toggle:(id:string)=>{
      if(ambVols[id]!==undefined){stopAmbient(id);setAmbVols(prev=>{const n={...prev};delete n[id];return n})}
      else{const next={...ambVols,[id]:30};setAmbVols(next);homeSoundOn(next)} // choosing a sound is consent to hear it
    },
    setVol:(id:string,v:number)=>{setAmbVols(prev=>({...prev,[id]:v}));if(started&&playing)setAmbVol(id,v)},
    master:masterVol,
    setMaster:setMasterVol,
    setMix:(mix:Record<string,number>)=>applyMix(mix,started&&playing),
  }

  // ── Todos ──────────────────────────────────────────────────────────────
  const saveTodos=(list:Todo[])=>{
    setTodos(list)
    if(noteTimer.current)clearTimeout(noteTimer.current)
    noteTimer.current=setTimeout(()=>localStorage.setItem('lofispace-todos',JSON.stringify(list)),500)
  }
  const addTodo=()=>{
    if(!todoInput.trim())return
    const est=parseInt(todoEstInput,10)
    saveTodos([...todos,{id:Date.now().toString(),text:todoInput.trim(),done:false,actual:0,estimate:est>0?est:undefined}])
    setTodoInput('');setTodoEstInput('')
  }
  const setActiveTodo=(id:string)=>{
    const next=activeTodoId===id?null:id
    setActiveTodoId(next)
    try{if(next)localStorage.setItem('lofispace-active-todo',next);else localStorage.removeItem('lofispace-active-todo')}catch(_){}
  }
  const toggleTodo=(id:string)=>{
    const todo=todos.find(t=>t.id===id);if(!todo)return
    const newDone=!todo.done
    saveTodos(todos.map(t=>t.id===id?{...t,done:newDone}:t))
    if(newDone&&activeTodoId===id)setActiveTodo(id)
    // Sync to calendar: tick adds ✅ entry, untick removes it
    const d=new Date();const calKey=`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    const doneText=`✅ ${todo.text}`
    if(newDone){
      const arr=[...(calNotes[calKey]||[]).filter(n=>n.text!==doneText),{id:Date.now(),text:doneText}]
      const cn={...calNotes,[calKey]:arr};saveCalFn(cn);setCalNotes(cn)
    }else{
      const arr=(calNotes[calKey]||[]).filter(n=>n.text!==doneText)
      const cn={...calNotes,[calKey]:arr};if(!arr.length)delete cn[calKey];saveCalFn(cn);setCalNotes(cn)
    }
  }
  const removeTodo=(id:string)=>{
    saveTodos(todos.filter(t=>t.id!==id))
    if(activeTodoId===id){setActiveTodoId(null);try{localStorage.removeItem('lofispace-active-todo')}catch(_){}}
  }

  // ── Weather ────────────────────────────────────────────────────────────
  const detectWeather=useCallback(async()=>{
    setWxState('loading')
    try{
      const pos=await new Promise<GeolocationPosition>((res,rej)=>navigator.geolocation.getCurrentPosition(res,rej,{timeout:8000}))
      const{latitude:lat,longitude:lon}=pos.coords
      const[wRes,gRes]=await Promise.all([
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m&timezone=auto`),
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=${lang}`),
      ])
      const wj=await wRes.json(),gj=await gRes.json()
      const code:number=wj.current.weather_code
      const temp=Math.round(wj.current.temperature_2m)
      const feels=Math.round(wj.current.apparent_temperature)
      const humidity=Math.round(wj.current.relative_humidity_2m)
      const wind=Math.round(wj.current.wind_speed_10m)
      const city:string=gj.address?.city||gj.address?.town||gj.address?.state||t.wx_location_fallback
      setWxData({city,temp,code,desc:t.wmo[code]??t.wmo_fallback,emoji:wxEmoji(code),feels,humidity,wind})
      setWxState('done');setShowWx(true)
    }catch(_){setWxState('error')}
  },[])

  const handleShare=async()=>{try{await navigator.clipboard.writeText(shareUrl);setCopied(true);setTimeout(()=>setCopied(false),2000);analytics.shareClick()}catch(_){}}
  const toggleFullscreen=useCallback(()=>{
    if(!document.fullscreenElement)document.documentElement.requestFullscreen().catch(()=>{})
    else document.exitFullscreen().catch(()=>{})
  },[])

  // ── Global keyboard shortcuts ──────────────────────────────────────────
  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{
      if(home)return // Come Home has its own (Esc-only) handling and no productivity shortcuts
      if(e.metaKey||e.ctrlKey||e.altKey)return
      const el=e.target as HTMLElement|null
      if(el&&(el.tagName==='INPUT'||el.tagName==='TEXTAREA'||el.isContentEditable))return
      switch(e.key){
        case ' ': e.preventDefault(); togglePlay(); break
        case 'f': case 'F': toggleFullscreen(); break
        case 'p': case 'P': setShowPom(v=>!v); break
        case 'n': case 'N': setShowNote(v=>!v); break
        case 'z': case 'Z': setZen(v=>!v); break
        case '?': setShowShortcuts(v=>!v); break
        case 'Escape':
          setShowShortcuts(false); setOpenPopover(null); setPanel(false)
          setZen(false); setShowCal(false); setShowSupport(false)
          break
      }
    }
    window.addEventListener('keydown',onKey)
    return ()=>window.removeEventListener('keydown',onKey)
  },[togglePlay,toggleFullscreen,home])

  // ── Pomodoro phase-change feedback (chime + notification + tab title) ────
  const playChime=useCallback((rising:boolean)=>{
    try{
      const ctx=ensureCtx(); ctx.resume().catch(()=>{})
      const now=ctx.currentTime
      const g=ctx.createGain(); g.connect(ctx.destination)
      g.gain.setValueAtTime(0.0001,now)
      g.gain.exponentialRampToValueAtTime(0.22,now+0.03)
      g.gain.exponentialRampToValueAtTime(0.0001,now+1.1)
      const notes=rising?[587.33,880]:[880,587.33]
      notes.forEach((f,i)=>{
        const o=ctx.createOscillator(); o.type='sine'; o.frequency.value=f
        o.connect(g); o.start(now+i*0.16); o.stop(now+i*0.16+0.5)
      })
    }catch{/* audio not ready — non-critical */}
  },[ensureCtx])

  const phaseInitRef=useRef(true)
  useEffect(()=>{
    if(phaseInitRef.current){ phaseInitRef.current=false; return }
    const toFocus=pom.phase==='work'
    playChime(!toFocus)
    // Only nudge with a system notification when the tab isn't focused — otherwise the
    // in-app UI + chime are enough and a popup would be noise.
    if(typeof Notification!=='undefined' && Notification.permission==='granted' && document.visibilityState!=='visible'){
      try{
        const title=toFocus?t.notif_focus_title:(pom.phase==='long'?t.notif_long_title:t.notif_break_title)
        const body=toFocus?t.notif_focus_body:t.notif_break_body
        new Notification(title,{body,icon:'/logo.png',tag:'lofispace-pomodoro',silent:true})
      }catch{/* ignore */}
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pom.phase])

  // Tab-title countdown while the timer runs
  useEffect(()=>{
    const base='LofiSpace — Focus Workspace'
    if(home){
      // Next re-applies the route's metadata title after hydration — set it again once that's done
      document.title='Come Home — LofiSpace'
      const id=setTimeout(()=>{document.title='Come Home — LofiSpace'},400)
      return ()=>{clearTimeout(id);document.title=base}
    }else if(pom.on){
      const label=pom.phase==='work'?t.pom_phase_focus:pom.phase==='long'?t.pom_phase_long:t.pom_phase_break
      document.title=`${pom.mm}:${pom.ss} · ${label}`
    }else{
      document.title=base
    }
    return ()=>{ document.title=base }
  },[pom.on,pom.phase,pom.mm,pom.ss,t,home])

  // Warn before an accidental tab close mid focus-session
  useEffect(()=>{
    if(!(pom.on&&pom.phase==='work'))return
    const h=(e:BeforeUnloadEvent)=>{ e.preventDefault(); e.returnValue='' }
    window.addEventListener('beforeunload',h)
    return ()=>window.removeEventListener('beforeunload',h)
  },[pom.on,pom.phase])

  // Celebrate the moment today's pomodoro goal is met (once per calendar day)
  const goalCelebratedRef=useRef('')
  useEffect(()=>{
    const today=localDate()
    if(todayPoms>=dailyGoalPomodoros && todayPoms>0 && goalCelebratedRef.current!==today){
      goalCelebratedRef.current=today
      playChime(true)
      setGoalToast(Date.now())
      setTimeout(()=>setGoalToast(null),3200)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[todayPoms,dailyGoalPomodoros])

  const saveCalFn=(cn:Record<string,{id:number;text:string}[]>)=>{try{localStorage.setItem('lofispace-calNotes',JSON.stringify(cn))}catch(_){}}
  const addCalNote=()=>{const t=calInput.trim();if(!t)return;const arr=[...(calNotes[calSelected]||[]),{id:Date.now(),text:t}];const cn={...calNotes,[calSelected]:arr};saveCalFn(cn);setCalNotes(cn);setCalInput('')}
  const delCalNote=(key:string,nid:number)=>{const arr=(calNotes[key]||[]).filter(x=>x.id!==nid);const cn={...calNotes,[key]:arr};if(!arr.length)delete cn[key];saveCalFn(cn);setCalNotes(cn)}

  useEffect(()=>()=>{
    Object.values(synthRef.current).forEach(n=>n.stop())
    ctxRef.current?.close();try{ytPlayer.current?.destroy()}catch(_){}
    if(ytTimer.current)clearTimeout(ytTimer.current)
    if(noteTimer.current)clearTimeout(noteTimer.current)
    if(prevBgTimer.current)clearTimeout(prevBgTimer.current)
  },[])

  // ── Theme tokens ───────────────────────────────────────────────────────
  const accent    = theme==='glass' ? urlAccent : '#f0a868'
  const accent2   = theme==='glass' ? '#6ee7d7' : '#e8849e'
  const hexToRgba = (hex:string,a:number)=>{
    let h=hex.replace('#','')
    if(h.length===3)h=h.split('').map(c=>c+c).join('')
    const n=parseInt(h||'a78bfa',16)
    return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`
  }
  const accentSoft = hexToRgba(accent,0.16)
  const accentGlow = hexToRgba(accent,0.45)

  // ── Share URL ──────────────────────────────────────────────────────────
  const shareUrl=useMemo(()=>{
    if(!mounted)return''
    const p=new URLSearchParams()
    p.set('bgv',encodeURIComponent(bgUrl));p.set('bgo',String(bgOpacity))
    if(bgBlur>0)p.set('bl',String(bgBlur))
    p.set('ls',lofiId);p.set('lv',String(lofiVol));p.set('ac',accent.replace('#',''))
    if(!showClock)p.set('clk','0');if(!showPom)p.set('pom','0');if(!showNote)p.set('note','0')
    const at=Object.entries(ambVols).map(([id,v])=>`${id}:${v}`).join(',');if(at)p.set('at',at)
    if(wxData){p.set('city',wxData.city);p.set('temp',String(wxData.temp));p.set('wdesc',wxData.desc);p.set('wemoji',wxData.emoji)}
    return`${window.location.origin}/embed?${p.toString()}`
  },[mounted,bgUrl,bgOpacity,bgBlur,lofiId,lofiVol,theme,urlAccent,showClock,showPom,showNote,ambVols,wxData])

  const atmOverlay:Record<string,string>={
    'none':'','day':'linear-gradient(rgba(255,250,245,.04),rgba(255,235,245,.07))',
    'dusk':'linear-gradient(180deg,rgba(70,25,35,.28),rgba(130,55,30,.34))',
    'night':'linear-gradient(180deg,rgba(8,10,28,.5),rgba(18,18,46,.56))',
    'dim':'rgba(0,0,0,.5)',
  }

  const cssVars:React.CSSProperties = (theme==='glass'
    ? {'--text':'#f3f3f8','--dim':'rgba(243,243,248,.58)','--dim2':'rgba(243,243,248,.4)','--panel':'rgba(18,20,32,.62)','--panel2':'rgba(0,0,0,.16)','--border':'rgba(255,255,255,.12)','--input':'rgba(255,255,255,.05)','--track':'rgba(255,255,255,.08)'}
    : {'--text':'#fbf2ea','--dim':'rgba(251,242,234,.6)','--dim2':'rgba(251,242,234,.42)','--panel':'rgba(36,25,25,.62)','--panel2':'rgba(0,0,0,.14)','--border':'rgba(255,224,206,.15)','--input':'rgba(255,240,230,.06)','--track':'rgba(255,240,230,.1)'}
  ) as React.CSSProperties

  // ── Computed values ────────────────────────────────────────────────────
  const pomCirc=2*Math.PI*62
  const pomDash=pomCirc*(1-pom.progress)
  const ambCount=Object.keys(ambVols).length
  const doneTodos=todos.filter(t=>t.done).length
  const activeName=(LOFI_STREAMS.find(x=>x.id===lofiId)||{label:'—'} as any).label
  const xp2=xpProgress(xp,level)
  const weekDots=Array.from({length:6},(_,i)=>i>=(6-Math.min(streak,6)))

  // ── Style helpers ──────────────────────────────────────────────────────
  const glassPanel:React.CSSProperties = {
    background:'var(--panel)',
    border:'1px solid var(--border)',
    backdropFilter:'blur(24px) saturate(140%)',
    WebkitBackdropFilter:'blur(24px) saturate(140%)',
  }
  const tabBtn=(active:boolean):React.CSSProperties=>({
    display:'flex',width:38,height:38,alignItems:'center',justifyContent:'center',
    border:'none',borderRadius:11,cursor:'pointer',transition:'all .16s ease',
    background:active?accentSoft:'transparent',
    color:active?accent:'var(--dim)',
  })
  const dockBtn=(active:boolean):React.CSSProperties=>({
    display:'flex',width:dbSz,height:dbSz,flexShrink:0,alignItems:'center',justifyContent:'center',
    border:'none',borderRadius:'50%',cursor:'pointer',transition:'all .16s ease',
    background:active?accentSoft:'transparent',
    color:active?accent:'var(--dim)',
  })
  const chip=(active:boolean):React.CSSProperties=>({
    display:'flex',flexDirection:'column',alignItems:'center',gap:2,flexShrink:0,
    padding:mob?'6px 9px':'8px 13px',border:'none',borderRadius:14,cursor:'pointer',transition:'all .16s ease',
    background:active?accent:'var(--input)',color:active?'#16121f':'var(--text)',
  })
  const wStyle=(drag:{pos:{x:number;y:number}|null},def:React.CSSProperties):React.CSSProperties=>({
    position:'absolute',touchAction:'none',userSelect:'none',
    ...(drag.pos?{left:drag.pos.x,top:drag.pos.y}:def),
  })
  const seg=(active:boolean):React.CSSProperties=>({
    flex:1,padding:'8px 0',border:'none',borderRadius:9,fontSize:12.5,fontWeight:600,cursor:'pointer',transition:'all .16s ease',
    background:active?accent:'var(--input)',color:active?'#16121f':'var(--dim)',
  })
  const mob=vw<640
  const dbSz=mob?32:40
  const divider:React.CSSProperties={width:1,height:26,background:'var(--border)',margin:'0 2px',flexShrink:0}
  // Nudge a focused input above the mobile keyboard — panels are absolutely positioned inside
  // a scrollable root, so browsers don't always auto-scroll them into the visible viewport.
  const focusScroll=(e:React.FocusEvent<HTMLInputElement>)=>{
    if(!mob)return
    const el=e.currentTarget
    setTimeout(()=>el.scrollIntoView({block:'center',behavior:'smooth'}),300)
  }
  const bgGradient=getBgPresetByUrl(bgUrl)?.gradient ?? ['#0d0d14','#1a1a24']
  const bgPoster=getBgPresetByUrl(bgUrl)?.poster

  // On mobile, panel widths grow to near-full-viewport (see width:Math.min(N,vw-M) below),
  // so the desktop two-column left/right placement collides. Stack them in one column instead.
  const mobTop:Record<string,number>={}
  let mobEnd=0
  if(mob){
    const GAP=12
    let cursor=132
    if(showWx&&wxData&&!zen){mobTop.wx=cursor;cursor+=(wxH||80)+GAP}
    if(showStreak&&!zen){mobTop.streak=cursor;cursor+=(streakH||190)+GAP}
    if(showPom){mobTop.pom=cursor;cursor+=(pomH||390)+GAP}
    if(showNote&&!zen){mobTop.note=cursor;cursor+=(noteH||290)+GAP}
    mobEnd=cursor
  }
  // Desktop: To-Do sits beside the Pomodoro on wide screens, directly under it otherwise -
  // previously it was pinned to the bottom and slid under the timer on shorter screens.
  const pomW=Math.min(236,vw-48)
  const noteDefault:React.CSSProperties=!showPom?{right:32,top:96}
    :vw>=1100?{right:32+pomW+16,top:96}
    :{right:32,top:96+(pomH||400)+14}

  return (
    <div lang={lang} style={{position:'fixed',inset:0,overflowY:mob?'auto':'hidden',overflowX:'hidden',WebkitOverflowScrolling:'touch',fontFamily:"'Outfit',system-ui,sans-serif",color:'var(--text,#f3f3f8)',userSelect:'none',...cssVars,['--accent' as any]:accent,['--accent2' as any]:accent2,['--accentSoft' as any]:accentSoft,['--accentGlow' as any]:accentGlow}}>

      {/* ── Background (fixed to the real viewport so it never scrolls with the stacked panels below) ── */}
      <div style={{position:'fixed',inset:0,background:`linear-gradient(160deg,${bgGradient[0]},${bgGradient[1]})`}}/>
      {/* Crossfade base: last-shown background stays visible until the new one finishes loading */}
      {prevBg&&(prevBg.type==='video'
        ?<video key={`prev-${prevBg.url}`} src={prevBg.url} autoPlay loop muted playsInline aria-hidden
            style={{position:'fixed',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
        :prevBg.type==='gif'
          // eslint-disable-next-line @next/next/no-img-element
          ?<img src={prevBg.url} alt="" aria-hidden
              style={{position:'fixed',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
          :null)}
      {bgType==='video'
        // No React key: the element is reused across scene switches (src swapped + .load()ed
        // imperatively in the bgUrl effect) so the decoder/buffer isn't torn down and rebuilt
        // on every change. The <prevBg> layer above covers the visual gap while the new clip buffers.
        ?<video ref={bgElRef as React.RefObject<HTMLVideoElement>} src={bgUrl} poster={bgPoster} autoPlay loop muted playsInline preload="auto" aria-hidden
            onCanPlay={handleBgReady}
            style={{position:'fixed',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:bgReady?1:0,transition:'opacity .5s ease'}}/>
        :bgType==='gif'
          // eslint-disable-next-line @next/next/no-img-element
          ?<img ref={bgElRef as React.RefObject<HTMLImageElement>} src={bgUrl} alt="" aria-hidden onLoad={handleBgReady}
              style={{position:'fixed',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:bgReady?1:0,transition:'opacity .5s ease'}}/>
          :<iframe src={`https://www.youtube-nocookie.com/embed/${bgYtId}?autoplay=1&mute=1&loop=1&playlist=${bgYtId}&controls=0&playsinline=1&rel=0`} onLoad={handleBgReady} style={{position:'fixed',inset:'-10%',width:'120%',height:'120%',border:'none',pointerEvents:'none',opacity:bgReady?1:0,transition:'opacity .5s ease'}} allow="autoplay"/>
      }
      <div style={{position:'fixed',inset:0,background:'#000',opacity:bgOpacity/100}}/>
      {bgBlur>0&&<div style={{position:'fixed',inset:0,backdropFilter:`blur(${bgBlur}px)`}}/>}
      {atmosphere!=='none'&&<div style={{position:'fixed',inset:0,background:atmOverlay[atmosphere],pointerEvents:'none'}}/>}
      {showBgSpinner&&!bgReady&&(
        <div style={{position:'fixed',top:64,left:'50%',transform:'translateX(-50%)',zIndex:6,display:'flex',alignItems:'center',gap:8,padding:'8px 14px',borderRadius:999,background:'rgba(0,0,0,.5)',backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',color:'#fff',fontSize:12,fontWeight:600,pointerEvents:'none'}}>
          <span style={{width:13,height:13,borderRadius:'50%',border:'2px solid rgba(255,255,255,.3)',borderTopColor:'#fff',animation:'spin .8s linear infinite'}}/>
          {t.bg_loading}
        </div>
      )}

      {/* ── Hidden YT player — off-screen (opacity:0 causes Chrome to pause media). Kept outside the
          focus-only wrapper below so it survives Come Home mode. ── */}
      <div style={{position:'fixed',left:'-400px',top:0,width:'320px',height:'180px',pointerEvents:'none'}}><div ref={ytRef}/></div>

      {/* Focus-mode UI. `display:contents` keeps the existing absolute layout untouched; in Come
          Home it's hidden (not unmounted), so timers, todos and panel state survive the round trip. */}
      <div style={{display:home?'none':'contents'}}>

      {/* ── Clock (draggable, top-left) ── */}
      {showClock&&(
        <div {...clockDrag.dp} style={{...wStyle(clockDrag,{left:36,top:30}),zIndex:5,cursor:'grab',position:'absolute'}}>
          <div style={{position:'relative'}}>
            <button onPointerDown={e=>e.stopPropagation()} onClick={()=>setShowClock(false)} style={{position:'absolute',top:-8,right:-10,width:20,height:20,display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid rgba(255,255,255,.18)',borderRadius:'50%',background:'rgba(0,0,0,.45)',color:'rgba(255,255,255,.7)',cursor:'pointer',fontSize:11,lineHeight:1,zIndex:1,padding:0}}>×</button>
            <LiveClock clockStyle={clockStyle} accent={accent}/>
          </div>
        </div>
      )}

      {/* Theme (Glass/Warm) is still switchable from the round icon button in the dock below —
          the top-center pill selector was removed since /embed permanently redirects to
          /workspace (see next.config.ts), so this is the only surface the app ever renders on. */}

      {/* ── Pomodoro panel (draggable, top-right) ── */}
      {showPom&&(
        <div ref={pomRef} style={{...wStyle(pomDrag,mob?{left:16,top:mobTop.pom}:{right:32,top:96}),zIndex:5,width:pomW,padding:'20px 20px 22px',...glassPanel,borderRadius:20,boxShadow:'0 18px 50px rgba(0,0,0,.38)'}}>
          <div {...pomDrag.dp} style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14,cursor:'grab'}}>
            <span style={{fontSize:11,fontWeight:600,letterSpacing:1.4,textTransform:'uppercase',color:'var(--dim)'}}>Pomodoro</span>
            <div style={{display:'flex',alignItems:'center',gap:2}}>
              <button onPointerDown={e=>e.stopPropagation()} onClick={()=>setShowPomCfg(v=>!v)} title={t.pom_timer_settings} style={{display:'flex',width:24,height:24,alignItems:'center',justifyContent:'center',border:'none',background:showPomCfg?accentSoft:'transparent',color:showPomCfg?accent:'var(--dim)',borderRadius:7,cursor:'pointer'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 3.6 15a1.65 1.65 0 0 0-1.51-1H2a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 3.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.36.14.7.35 1 .61l.06.06A2 2 0 0 1 22 12z"/></svg>
              </button>
              <button onPointerDown={e=>e.stopPropagation()} onClick={()=>setShowPom(false)} style={{display:'flex',width:24,height:24,alignItems:'center',justifyContent:'center',border:'none',background:'transparent',color:'var(--dim)',borderRadius:7,cursor:'pointer'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
          {showPomCfg&&(
            <div onPointerDown={e=>e.stopPropagation()} style={{display:'flex',flexDirection:'column',gap:9,marginBottom:14,padding:'12px',borderRadius:12,background:'var(--input)',border:'1px solid var(--border)'}}>
              {([
                [t.pom_work_len, pom.cfg.workMin, (n:number)=>pom.patchCfg({workMin:Math.min(90,Math.max(1,n))}), 5],
                [t.pom_break_len, pom.cfg.breakMin, (n:number)=>pom.patchCfg({breakMin:Math.min(30,Math.max(1,n))}), 1],
                [t.pom_long_len, pom.cfg.longMin, (n:number)=>pom.patchCfg({longMin:Math.min(60,Math.max(1,n))}), 5],
                [t.pom_cycles, pom.cfg.cyclesBeforeLong, (n:number)=>pom.patchCfg({cyclesBeforeLong:Math.min(8,Math.max(2,n))}), 1],
              ] as [string,number,(n:number)=>void,number][]).map(([label,val,set,step])=>(
                <div key={label} style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
                  <span style={{fontSize:10.5,color:'var(--dim)',lineHeight:1.3,flex:1}}>{label}</span>
                  <div style={{display:'flex',alignItems:'center',gap:6,flexShrink:0}}>
                    <button onClick={()=>set(val-step)} style={{width:22,height:22,borderRadius:7,border:'1px solid var(--border)',background:'var(--panel2)',color:'var(--text)',cursor:'pointer',fontSize:14,lineHeight:1}}>−</button>
                    <span style={{fontSize:12,fontWeight:700,minWidth:20,textAlign:'center'}}>{val}</span>
                    <button onClick={()=>set(val+step)} style={{width:22,height:22,borderRadius:7,border:'1px solid var(--border)',background:'var(--panel2)',color:'var(--text)',cursor:'pointer',fontSize:14,lineHeight:1}}>+</button>
                  </div>
                </div>
              ))}
              <button onClick={()=>pom.patchCfg({autoStart:!pom.cfg.autoStart})} style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8,padding:0,border:'none',background:'transparent',cursor:'pointer'}}>
                <span style={{fontSize:10.5,color:'var(--dim)'}}>{t.pom_autostart}</span>
                <span style={{width:34,height:20,padding:2,borderRadius:999,background:pom.cfg.autoStart?accent:'var(--track)',display:'flex',justifyContent:pom.cfg.autoStart?'flex-end':'flex-start',flexShrink:0}}>
                  <span style={{width:16,height:16,borderRadius:'50%',background:'#fff'}}/>
                </span>
              </button>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8,borderTop:'1px solid var(--border)',paddingTop:9}}>
                <span style={{fontSize:10.5,color:'var(--dim)'}}>{t.pom_goal}</span>
                <div style={{display:'flex',alignItems:'center',gap:6,flexShrink:0}}>
                  <button onClick={()=>setDailyGoal(dailyGoalPomodoros-1)} style={{width:22,height:22,borderRadius:7,border:'1px solid var(--border)',background:'var(--panel2)',color:'var(--text)',cursor:'pointer',fontSize:14,lineHeight:1}}>−</button>
                  <span style={{fontSize:12,fontWeight:700,minWidth:20,textAlign:'center'}}>{dailyGoalPomodoros}</span>
                  <button onClick={()=>setDailyGoal(dailyGoalPomodoros+1)} style={{width:22,height:22,borderRadius:7,border:'1px solid var(--border)',background:'var(--panel2)',color:'var(--text)',cursor:'pointer',fontSize:14,lineHeight:1}}>+</button>
                </div>
              </div>
            </div>
          )}
          <div style={{display:'flex',gap:5,marginBottom:16}}>
            <button onClick={()=>pom.phase!=='work'&&pom.setMode('work')} style={seg(pom.phase==='work')}>{t.pom_focus}</button>
            <button onClick={()=>pom.phase==='work'&&pom.setMode('break')} style={seg(pom.phase!=='work')}>{pom.phase==='long'?t.pom_long:t.pom_break}</button>
          </div>
          {activeTodoId&&todos.find(x=>x.id===activeTodoId)&&(
            <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:14,padding:'7px 10px',borderRadius:10,background:accentSoft,fontSize:11.5,color:accent,fontWeight:600,overflow:'hidden'}}>
              <span style={{flexShrink:0}}>🎯</span>
              <span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{todos.find(x=>x.id===activeTodoId)?.text}</span>
            </div>
          )}
          <div style={{position:'relative',width:148,height:148,margin:'0 auto 16px'}}>
            <svg width="148" height="148" viewBox="0 0 148 148" style={{transform:'rotate(-90deg)'}}>
              <circle cx="74" cy="74" r="62" fill="none" stroke="var(--track)" strokeWidth="9"/>
              <circle cx="74" cy="74" r="62" fill="none" stroke={accent} strokeWidth="9" strokeLinecap="round"
                strokeDasharray={pomCirc} strokeDashoffset={pomDash}
                style={{transition:'stroke-dashoffset 1s linear',filter:`drop-shadow(0 0 6px ${accentGlow})`}}/>
            </svg>
            <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:36,letterSpacing:-1}}>{pom.mm}:{pom.ss}</span>
              <span style={{fontSize:11,fontWeight:500,letterSpacing:1,textTransform:'uppercase',color:'var(--dim)'}}>{pom.phase==='work'?t.pom_phase_focus:pom.phase==='long'?t.pom_phase_long:t.pom_phase_break}</span>
            </div>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button onClick={pom.toggle} style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:7,padding:11,border:'none',borderRadius:12,background:accent,color:'#16121f',fontWeight:600,fontSize:14,cursor:'pointer',boxShadow:`0 6px 18px ${accentGlow}`}}>
              {pom.on
                ?<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
                :<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5v14l12-7z"/></svg>}
              {pom.on?t.pom_pause:t.pom_start}
            </button>
            <button onClick={pom.skip} title={t.pom_skip} style={{display:'flex',width:42,alignItems:'center',justifyContent:'center',border:'1px solid var(--border)',borderRadius:12,background:'var(--input)',color:'var(--text)',cursor:'pointer'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 5v14l9-7zM15 5h3v14h-3z"/></svg>
            </button>
            <button onClick={pom.reset} title="Reset" style={{display:'flex',width:42,alignItems:'center',justifyContent:'center',border:'1px solid var(--border)',borderRadius:12,background:'var(--input)',color:'var(--text)',cursor:'pointer'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>
            </button>
          </div>
          {/* Today's progress toward the daily goal */}
          <div style={{marginTop:14}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'var(--dim2)',marginBottom:4}}>
              <span>🍅 {todayPoms} {t.pom_today_done}</span><span>{todayPoms}/{dailyGoalPomodoros}</span>
            </div>
            <div style={{height:5,borderRadius:3,background:'var(--track)',overflow:'hidden'}}>
              <div style={{height:'100%',width:`${Math.min(100,(todayPoms/Math.max(1,dailyGoalPomodoros))*100)}%`,background:`linear-gradient(90deg,${accent},${accentGlow})`,borderRadius:3,transition:'width .4s'}}/>
            </div>
          </div>
        </div>
      )}

      {/* ── Weather (draggable) ── */}
      {showWx&&wxData&&!zen&&(
        <div ref={wxRef} {...wxDrag.dp} style={{...wStyle(wxDrag,mob?{left:16,top:mobTop.wx}:{left:20,top:showClock&&clockStyle==='digital'?130:80}),cursor:'grab',zIndex:20,minWidth:160}}>
          <div style={{display:'flex',flexDirection:'column',gap:4,...glassPanel,borderRadius:16,padding:'10px 14px',boxShadow:'0 10px 28px rgba(0,0,0,.3)'}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontSize:24}}>{wxData.emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:600}}>{wxData.city}</div>
                <div style={{fontSize:11,color:'var(--dim)'}}>{wxData.temp}°C · {wxData.desc}</div>
              </div>
              <button onPointerDown={e=>e.stopPropagation()} onClick={()=>setShowWx(false)} style={{background:'none',border:'none',color:'var(--dim2)',cursor:'pointer',fontSize:16,padding:0,lineHeight:1,flexShrink:0}}>×</button>
            </div>
            {(wxData.feels!==null||wxData.humidity!==null||wxData.wind!==null)&&(
              <div style={{display:'flex',gap:8,fontSize:10,color:'var(--dim2)',paddingTop:4,borderTop:'1px solid var(--border)'}}>
                {wxData.feels!==null&&<span>🌡 {wxData.feels}°C</span>}
                {wxData.humidity!==null&&<span>💧 {wxData.humidity}%</span>}
                {wxData.wind!==null&&<span>🌬 {wxData.wind}km/h</span>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Progress card (left) ── */}
      {showStreak&&!zen&&(
        <div ref={streakRef} style={{...wStyle(progressDrag,mob?{left:16,top:mobTop.streak}:{left:20,top:showWx&&wxData?290:showClock&&clockStyle==='digital'?172:90}),zIndex:5,width:Math.min(244,vw-40),padding:16,borderRadius:18,background:'rgba(26,23,44,0.55)',backdropFilter:'blur(18px)',WebkitBackdropFilter:'blur(18px)',border:'1px solid rgba(255,255,255,0.10)',color:'#fff',boxShadow:'0 14px 40px rgba(0,0,0,.34)'}}>
          {/* Header — drag handle */}
          <div {...progressDrag.dp} style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12,cursor:'grab'}}>
            <span style={{fontSize:10,fontWeight:700,letterSpacing:'0.1em',color:'rgba(255,255,255,0.5)'}}>{t.progress_title}</span>
            <button onPointerDown={e=>e.stopPropagation()} onClick={()=>setShowStreak(false)} style={{display:'flex',width:20,height:20,alignItems:'center',justifyContent:'center',border:'none',background:'transparent',color:'rgba(255,255,255,0.35)',borderRadius:6,cursor:'pointer',fontSize:14,lineHeight:1,padding:0}}>×</button>
          </div>

          {/* Level + XP */}
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
            {/* Conic ring */}
            <div style={{position:'relative',width:46,height:46,flexShrink:0}}>
              <div style={{position:'absolute',inset:0,borderRadius:'50%',background:`conic-gradient(${accent} 0% ${xp2.pct}%, rgba(255,255,255,0.14) ${xp2.pct}% 100%)`}}/>
              <div style={{position:'absolute',inset:3,borderRadius:'50%',background:'#2a2540',display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,fontWeight:800}}>{level}</div>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:800,marginBottom:6}}>Level {level}</div>
              <div style={{height:6,borderRadius:4,background:'rgba(255,255,255,0.14)',overflow:'hidden',marginBottom:4}}>
                <div style={{width:`${xp2.pct}%`,height:'100%',background:`linear-gradient(90deg,${accent},${accentGlow})`,borderRadius:4,transition:'width .4s'}}/>
              </div>
              <div style={{fontSize:10,color:'rgba(255,255,255,0.55)'}}>{xp2.current} / {xp2.max} XP</div>
            </div>
          </div>

          {/* Divider */}
          <div style={{height:1,background:'rgba(255,255,255,0.08)',marginBottom:12}}/>

          {/* Streak */}
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:11}}>
            <span style={{fontSize:22,display:'inline-block',animation:'lf-flame 1.6s ease-in-out infinite'}}>🔥</span>
            <div style={{flex:1}}>
              <div style={{fontSize:16,fontWeight:800,lineHeight:1}}>
                {streak} <span style={{fontSize:11,fontWeight:600,color:'rgba(255,255,255,0.55)'}}>{t.progress_days}</span>
              </div>
              <div style={{fontSize:10,color:'rgba(255,255,255,0.5)',marginTop:2}}>{t.progress_best} {bestStreak} {t.progress_days}</div>
            </div>
          </div>

          {/* 6-day dots */}
          <div style={{display:'flex',gap:5}}>
            {weekDots.map((active,i)=>(
              <div key={i} style={{flex:1,height:18,borderRadius:5,background:active?'rgba(255,140,80,0.85)':'rgba(255,255,255,0.06)',transition:'background .3s'}}/>
            ))}
          </div>
        </div>
      )}

      {/* ── Notes panel (bottom-right) ── */}
      {showNote&&!zen&&(
        <div ref={noteRef} style={{position:'absolute',zIndex:5,width:Math.min(264,vw-48),touchAction:'none',userSelect:'none',...(noteDrag.pos?{left:noteDrag.pos.x,top:noteDrag.pos.y}:mob?{left:16,top:mobTop.note}:noteDefault),...glassPanel,borderRadius:20,boxShadow:'0 18px 50px rgba(0,0,0,.38)',overflow:'hidden'}}>
          <div {...noteDrag.dp} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'13px 15px',borderBottom:'1px solid var(--border)',cursor:'grab'}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              <span style={{fontSize:11,fontWeight:600,letterSpacing:1.2,textTransform:'uppercase',color:'var(--dim)'}}>{t.todo_title}</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontSize:12,fontWeight:600,color:accent}}>{doneTodos}/{todos.length}</span>
              <button onPointerDown={e=>e.stopPropagation()} onClick={()=>setShowNote(false)} style={{display:'flex',width:24,height:24,flexShrink:0,alignItems:'center',justifyContent:'center',border:'none',background:'transparent',color:'var(--dim)',borderRadius:7,cursor:'pointer'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
          <div style={{padding:'8px 15px 0',fontSize:10.5,color:'var(--dim2)',lineHeight:1.4}}>
            {activeTodoId&&todos.find(x=>x.id===activeTodoId)
              ?<span>🎯 {t.todo_active_label}: <strong style={{color:accent}}>{todos.find(x=>x.id===activeTodoId)?.text}</strong></span>
              :<span>{t.todo_active_hint}</span>}
          </div>
          <div style={{maxHeight:188,overflowY:'auto',padding:'8px 8px 4px'}}>
            {todos.length===0&&<div style={{padding:'26px 12px',textAlign:'center',fontSize:13,color:'var(--dim2)'}}>{t.todo_empty}</div>}
            {todos.map(td=>{
              const isActive=activeTodoId===td.id
              return (
              <div key={td.id} onClick={()=>!td.done&&setActiveTodo(td.id)} title={td.done?undefined:t.todo_set_active} style={{display:'flex',alignItems:'center',gap:10,padding:'8px',borderRadius:10,cursor:td.done?'default':'pointer',background:isActive?accentSoft:'transparent',border:`1px solid ${isActive?accent:'transparent'}`,transition:'all .16s ease'}}>
                <button onPointerDown={e=>e.stopPropagation()} onClick={e=>{e.stopPropagation();toggleTodo(td.id)}} style={{display:'flex',width:20,height:20,flexShrink:0,alignItems:'center',justifyContent:'center',borderRadius:6,cursor:'pointer',transition:'all .16s ease',border:td.done?`1px solid ${accent}`:'1.5px solid var(--dim2)',background:td.done?accent:'transparent'}}>
                  {td.done&&<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16121f" strokeWidth="3.2" strokeLinecap="round"><path d="M5 12l5 5L20 6"/></svg>}
                </button>
                <span style={{flex:1,fontSize:13.5,minWidth:0,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',color:td.done?'var(--dim2)':'var(--text)',textDecoration:td.done?'line-through':'none'}}>{td.text}</span>
                {(td.actual>0||td.estimate)&&(
                  <span style={{flexShrink:0,fontSize:10.5,fontWeight:600,color:isActive?accent:'var(--dim2)',whiteSpace:'nowrap'}}>🍅 {td.actual}{td.estimate?`/${td.estimate}`:''}</span>
                )}
                <button onPointerDown={e=>e.stopPropagation()} onClick={e=>{e.stopPropagation();removeTodo(td.id)}} title={t.todo_remove} style={{display:'flex',width:24,height:24,flexShrink:0,alignItems:'center',justifyContent:'center',border:'none',background:'transparent',color:'var(--dim2)',borderRadius:6,cursor:'pointer',opacity:.7}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>
              )
            })}
          </div>
          <div onPointerDown={e=>e.stopPropagation()} style={{display:'flex',gap:8,padding:'11px 12px',borderTop:'1px solid var(--border)'}}>
            <input value={todoInput} onChange={e=>setTodoInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')addTodo()}} onFocus={focusScroll} placeholder={t.todo_placeholder}
              style={{flex:1,minWidth:0,padding:'9px 11px',border:'1px solid var(--border)',background:'var(--input)',color:'var(--text)',borderRadius:10,fontSize:13,outline:'none',fontFamily:'inherit'}}/>
            <input value={todoEstInput} onChange={e=>setTodoEstInput(e.target.value.replace(/\D/g,'').slice(0,2))} onKeyDown={e=>{if(e.key==='Enter')addTodo()}} onFocus={focusScroll} placeholder={t.todo_estimate_placeholder} inputMode="numeric" title={t.todo_estimate_placeholder}
              style={{width:36,flexShrink:0,padding:'9px 6px',border:'1px solid var(--border)',background:'var(--input)',color:'var(--text)',borderRadius:10,fontSize:13,outline:'none',textAlign:'center',fontFamily:'inherit'}}/>
            <button onClick={addTodo} style={{display:'flex',width:36,flexShrink:0,alignItems:'center',justifyContent:'center',border:'none',borderRadius:10,background:accent,color:'#16121f',cursor:'pointer'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Main player panel (bottom-center) ── */}
      {panel&&!zen&&(
        <div onClick={e=>e.stopPropagation()} style={{position:'fixed',left:'50%',bottom:118,transform:'translateX(-50%)',zIndex:5,width:'min(472px,calc(100vw - 24px))',...glassPanel,borderRadius:22,boxShadow:'0 22px 60px rgba(0,0,0,.42)',overflow:'hidden'}}>

          {/* Tabs header */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 14px',borderBottom:'1px solid var(--border)'}}>
            <div style={{display:'flex',gap:4}}>
              <button onClick={()=>setPanelTab('music')} style={tabBtn(panelTab==='music')} title={t.tab_music}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
              </button>
              <button onClick={()=>setPanelTab('sounds')} style={tabBtn(panelTab==='sounds')} title={t.tab_sounds}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 13c1.5 0 1.5-4 3-4s1.5 8 3 8 1.5-10 3-10 1.5 6 3 6 1.5-3 3-3"/></svg>
              </button>
              <button onClick={()=>setPanelTab('more')} style={tabBtn(panelTab==='more')} title={t.tab_settings}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
              </button>
            </div>
            <button onClick={()=>setPanel(false)} style={{display:'flex',width:30,height:30,alignItems:'center',justifyContent:'center',border:'none',background:'transparent',color:'var(--dim)',borderRadius:9,cursor:'pointer'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>

          {/* Panel body */}
          <div style={{padding:'14px 16px',minHeight:248,maxHeight:'45vh',overflowY:'auto'}}>

            {/* ── MUSIC ── */}
            {panelTab==='music'&&(
              <div>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  {LOFI_STREAMS.map(s=>{
                    const active=lofiId===s.id
                    const live=active&&playing&&started
                    return(
                      <div key={s.id} onClick={()=>handleLofiChange(s.id)} style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10,padding:'11px 13px',borderRadius:12,cursor:'pointer',transition:'all .16s ease',border:`1px solid ${active?accentSoft:'transparent'}`,background:active?accentSoft:'transparent'}}>
                        <div style={{display:'flex',alignItems:'center',gap:11,minWidth:0}}>
                          <span style={{flexShrink:0,width:8,height:8,borderRadius:'50%',background:active?accent2:'transparent',border:active?'none':'1.5px solid var(--dim2)',boxShadow:active?`0 0 8px ${accent2}`:'none'}}/>
                          <span style={{fontSize:14,fontWeight:active?600:500,color:active?'var(--text)':'var(--dim)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{s.label}</span>
                        </div>
                        {live&&<span style={{display:'flex',alignItems:'center',gap:5,fontSize:11,fontWeight:600,letterSpacing:.5,color:accent2,flexShrink:0}}><span style={{width:6,height:6,borderRadius:'50%',background:accent2,animation:'lf-pulse 1.4s ease-in-out infinite'}}/>LIVE</span>}
                        {active&&ytStatus==='loading'&&<span style={{fontSize:10,color:'var(--dim2)',flexShrink:0}}>{t.music_connecting}</span>}
                        {active&&ytStatus==='blocked'&&(
                          <button onClick={e=>{e.stopPropagation();retryYT()}} style={{fontSize:10,fontWeight:600,color:'#f97316',background:'rgba(249,115,22,0.12)',border:'none',borderRadius:7,padding:'3px 8px',cursor:'pointer',flexShrink:0}}>{t.music_retry_btn}</button>
                        )}
                      </div>
                    )
                  })}
                  {lofiId==='custom'&&(
                    <div style={{display:'flex',alignItems:'center',gap:11,padding:'11px 13px',borderRadius:12,border:`1px solid ${accentSoft}`,background:accentSoft}}>
                      <span style={{width:8,height:8,borderRadius:'50%',background:accent2,flexShrink:0,boxShadow:`0 0 8px ${accent2}`}}/>
                      <span style={{fontSize:14,fontWeight:600,flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.music_custom_yt}: {customLofiId}</span>
                      {ytStatus==='ready'&&<span style={{fontSize:11,fontWeight:600,color:accent2}}>LIVE</span>}
                      {ytStatus==='loading'&&<span style={{fontSize:10,color:'var(--dim2)',flexShrink:0}}>{t.music_connecting}</span>}
                      {ytStatus==='blocked'&&(
                        <button onClick={retryYT} style={{fontSize:10,fontWeight:600,color:'#f97316',background:'rgba(249,115,22,0.12)',border:'none',borderRadius:7,padding:'3px 8px',cursor:'pointer',flexShrink:0}}>{t.music_retry_btn}</button>
                      )}
                    </div>
                  )}
                  {ytStatus==='blocked'&&(
                    <p style={{fontSize:10.5,color:'#f97316',margin:'2px 0 0',lineHeight:1.5,background:'rgba(249,115,22,0.1)',padding:'7px 9px',borderRadius:8}}>{t.music_yt_blocked}</p>
                  )}
                  {ytStatus==='unavailable'&&(
                    <p style={{fontSize:10.5,color:'#f97316',margin:'2px 0 0',lineHeight:1.5,background:'rgba(249,115,22,0.1)',padding:'7px 9px',borderRadius:8}}>{t.music_yt_unavailable}</p>
                  )}
                  {ytStatus==='tap'&&(
                    <button onClick={retryYT} style={{marginTop:2,padding:'9px 12px',border:'none',borderRadius:10,background:accent,color:'#16121f',fontWeight:600,fontSize:12.5,cursor:'pointer'}}>▶ {t.music_tap_play}</button>
                  )}
                  <div style={{marginTop:10,padding:'9px 12px',borderRadius:11,background:'var(--input)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
                    <span style={{fontSize:11.5,color:'var(--dim)'}}>{t.music_custom_yt}</span>
                    <button onClick={()=>setOpenPopover('youtube')} style={{padding:'5px 12px',border:'none',borderRadius:8,background:accentSoft,color:accent,fontWeight:600,fontSize:12,cursor:'pointer',flexShrink:0}}>YouTube</button>
                  </div>
                </div>
              </div>
            )}

            {/* ── SOUNDS ── */}
            {panelTab==='sounds'&&(
              <div>
                <div style={{fontSize:10,fontWeight:600,letterSpacing:1.2,textTransform:'uppercase',color:'var(--dim2)',marginBottom:10}}>{t.sounds_title}</div>
                <div style={{display:'flex',flexDirection:'column',gap:11}}>
                  {AMBIENT_SOUNDS.map(s=>{
                    const on=ambVols[s.id]!==undefined
                    const vol=ambVols[s.id]??50
                    return(
                      <div key={s.id} style={{display:'flex',alignItems:'center',gap:12}}>
                        <button onClick={()=>toggleAmbient(s.id)} style={{display:'flex',width:38,height:38,flexShrink:0,alignItems:'center',justifyContent:'center',border:'1px solid var(--border)',borderRadius:11,fontSize:17,cursor:'pointer',transition:'all .16s ease',background:on?accentSoft:'var(--input)',filter:on?'none':'grayscale(.6)',opacity:on?1:.7}}>{s.icon}</button>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:13.5,fontWeight:500,marginBottom:5,color:on?'var(--text)':'var(--dim)'}}>{t.ambient[s.id]||s.label}</div>
                          <input type="range" min="0" max="100" value={vol} onChange={e=>handleAmbVol(s.id,+e.target.value)} disabled={!on} style={{width:'100%',height:4,cursor:'pointer',opacity:on?1:.4,pointerEvents:on?'auto':'none'}}/>
                        </div>
                        <button onClick={()=>toggleAmbient(s.id)} style={{display:'flex',flexShrink:0,width:40,height:23,padding:2,border:'none',borderRadius:999,cursor:'pointer',transition:'all .18s ease',justifyContent:on?'flex-end':'flex-start',background:on?accent:'var(--track)'}}>
                          <span style={{width:19,height:19,borderRadius:'50%',background:'#fff',boxShadow:'0 1px 3px rgba(0,0,0,.3)'}}/>
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ── MORE ── */}
            {panelTab==='more'&&(
              <div>
                {/* Sub-tabs */}
                <div style={{display:'flex',gap:5,marginBottom:14,overflowX:'auto',paddingBottom:2}}>
                  {([['widgets',t.more_widgets],['weather',t.more_weather],['progress',t.more_xp],['share',t.more_share]] as [MoreTab,string][]).map(([id,label])=>(
                    <button key={id} onClick={()=>setMoreTab(id)} style={{flexShrink:0,padding:'6px 12px',borderRadius:9,border:'none',cursor:'pointer',fontSize:12,fontWeight:500,transition:'all .15s',
                      background:moreTab===id?accentSoft:'var(--input)',color:moreTab===id?accent:'var(--dim)'}}>
                      {label}
                    </button>
                  ))}
                </div>

                {/* Widgets */}
                {moreTab==='widgets'&&(
                  <div>
                    <div style={{fontSize:10,fontWeight:600,letterSpacing:1.2,textTransform:'uppercase',color:'var(--dim2)',marginBottom:10}}>{t.widgets_toggle}</div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:14}}>
                      {[
                        {key:'clock',label:t.widgets_clock,on:showClock,toggle:()=>setShowClock(v=>!v)},
                        {key:'wx',label:t.widgets_weather,on:showWx&&!!wxData,toggle:()=>setShowWx(v=>!v)},
                        {key:'pom',label:t.widgets_pom,on:showPom,toggle:()=>setShowPom(v=>!v)},
                        {key:'note',label:t.widgets_notes,on:showNote,toggle:()=>setShowNote(v=>!v)},
                        {key:'streak',label:t.widgets_progress,on:showStreak,toggle:()=>setShowStreak(v=>!v)},
                      ].map(w=>(
                        <button key={w.key} onClick={w.toggle} style={{padding:'10px',borderRadius:12,border:`1px solid ${w.on?accentSoft:'var(--border)'}`,background:w.on?accentSoft:'var(--input)',color:w.on?accent:'var(--dim)',fontSize:13,cursor:'pointer',textAlign:'left',transition:'all .15s'}}>
                          {w.label}
                        </button>
                      ))}
                    </div>
                    <div style={{fontSize:10,fontWeight:600,letterSpacing:1.2,textTransform:'uppercase',color:'var(--dim2)',marginBottom:10}}>{t.widgets_clock_style}</div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:14}}>
                      {([['digital','🔢 Digital'],['minimal','✦ Minimal'],['bold','𝗕 Bold'],['analog','⟳ Analog']] as [ClockStyle,string][]).map(([s,label])=>(
                        <button key={s} onClick={()=>setClockStyle(s)} style={{padding:'10px',borderRadius:12,border:`1px solid ${clockStyle===s?accentSoft:'var(--border)'}`,background:clockStyle===s?accentSoft:'var(--input)',color:clockStyle===s?accent:'var(--dim)',fontSize:12,cursor:'pointer',textAlign:'left',transition:'all .15s'}}>
                          {label}
                        </button>
                      ))}
                    </div>
                    <div style={{fontSize:10,fontWeight:600,letterSpacing:1.2,textTransform:'uppercase',color:'var(--dim2)',marginBottom:8}}>{t.widgets_reset_pos}</div>
                    <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                      {([['🕐',clockDrag.reset],['🌤️',wxDrag.reset],['📝',noteDrag.reset],['🍅',pomDrag.reset],['📊',progressDrag.reset]] as [string,()=>void][]).map(([icon,fn],i)=>(
                        <button key={i} onClick={fn} style={{padding:'6px 12px',borderRadius:8,border:'1px solid var(--border)',background:'var(--input)',color:'var(--dim)',fontSize:12,cursor:'pointer'}}>{icon} {t.widgets_reset}</button>
                      ))}
                    </div>
                    <div style={{marginTop:14,paddingTop:14,borderTop:'1px solid var(--border)'}}>
                      <div style={{fontSize:10,fontWeight:600,letterSpacing:1.2,textTransform:'uppercase',color:'var(--dim2)',marginBottom:8}}>{t.widgets_music_vol}</div>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--dim)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/></svg>
                        <input type="range" min="0" max="100" value={lofiVol} onChange={e=>handleLofiVol(+e.target.value)} style={{flex:1,cursor:'pointer'}}/>
                        <span style={{fontSize:12,fontWeight:600,color:'var(--dim)',width:34,textAlign:'right'}}>{lofiVol}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Weather */}
                {moreTab==='weather'&&(
                  <div>
                    {!wxData&&wxState==='idle'&&(
                      <>
                        <p style={{fontSize:11,color:'var(--dim)',margin:'0 0 12px',lineHeight:1.5}}>{t.wx_desc}</p>
                        <button onClick={detectWeather} style={{width:'100%',padding:'11px 0',borderRadius:12,border:`1px solid ${accentSoft}`,background:accentSoft,color:accent,fontSize:13,fontWeight:600,cursor:'pointer'}}>{t.wx_detect_btn}</button>
                      </>
                    )}
                    {wxState==='loading'&&<div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 0'}}>
                      <div style={{width:14,height:14,borderRadius:'50%',border:`2px solid ${accentSoft}`,borderTopColor:accent,animation:'spin 0.8s linear infinite',flexShrink:0}}/>
                      <span style={{fontSize:12,color:'var(--dim)'}}>{t.wx_loading}</span>
                    </div>}
                    {wxState==='error'&&<div>
                      <p style={{fontSize:11,color:'#f97316',margin:'0 0 8px',lineHeight:1.5}}>{t.wx_error}</p>
                      <button onClick={()=>setWxState('idle')} style={{fontSize:11,color:'var(--dim)',background:'none',border:'none',cursor:'pointer',padding:0,textDecoration:'underline'}}>{t.wx_retry}</button>
                    </div>}
                    {wxData&&<div style={{display:'flex',flexDirection:'column',gap:10}}>
                      <div style={{display:'flex',alignItems:'center',gap:10,background:'var(--input)',borderRadius:14,padding:'12px 14px',border:'1px solid var(--border)'}}>
                        <span style={{fontSize:30,flexShrink:0}}>{wxData.emoji}</span>
                        <div>
                          <div style={{fontSize:14,fontWeight:600}}>{wxData.city} · {wxData.temp}°C</div>
                          <div style={{fontSize:11,color:'var(--dim)',marginTop:2}}>{wxData.desc}</div>
                          {(wxData.feels!==null||wxData.humidity!==null||wxData.wind!==null)&&(
                            <div style={{display:'flex',gap:10,fontSize:10,color:'var(--dim2)',marginTop:4}}>
                              {wxData.feels!==null&&<span>🌡 {wxData.feels}°C</span>}
                              {wxData.humidity!==null&&<span>💧 {wxData.humidity}%</span>}
                              {wxData.wind!==null&&<span>🌬 {wxData.wind} km/h</span>}
                            </div>
                          )}
                        </div>
                      </div>
                      <div style={{display:'flex',gap:8}}>
                        <button onClick={detectWeather} style={{flex:1,padding:'8px 0',borderRadius:10,border:'none',background:accentSoft,color:accent,fontSize:12,fontWeight:600,cursor:'pointer'}}>{t.wx_refresh}</button>
                        <button onClick={()=>{setWxData(null);setWxState('idle');setShowWx(false)}} style={{padding:'8px 14px',borderRadius:10,border:'1px solid var(--border)',background:'transparent',color:'var(--dim)',fontSize:12,cursor:'pointer'}}>{t.wx_clear}</button>
                      </div>
                    </div>}
                  </div>
                )}

                {/* Progress / XP */}
                {moreTab==='progress'&&(()=>{
                  const xp2=xpProgress(xp,level)
                  const unlockedCount=unlockedAchievements.length
                  return(
                    <div style={{display:'flex',flexDirection:'column',gap:14}}>
                      {/* Level + XP */}
                      <div style={{background:'var(--input)',border:'1px solid var(--border)',borderRadius:14,padding:'14px 16px'}}>
                        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
                          <div style={{width:42,height:42,borderRadius:'50%',background:`linear-gradient(135deg,${accent},${accent}80)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:700,color:'#16121f',flexShrink:0}}>{level}</div>
                          <div style={{flex:1}}>
                            <div style={{fontSize:13,fontWeight:600,marginBottom:6}}>Level {level}</div>
                            <div style={{height:5,background:'var(--track)',borderRadius:3,overflow:'hidden'}}>
                              <div style={{height:'100%',width:`${xp2.pct}%`,background:accent,borderRadius:3,transition:'width .4s'}}/>
                            </div>
                            <div style={{fontSize:10,color:'var(--dim2)',marginTop:4}}>{xp2.current} / {xp2.max} XP</div>
                          </div>
                        </div>
                        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,textAlign:'center'}}>
                          <div style={{background:'var(--panel2)',borderRadius:10,padding:'8px 4px'}}>
                            <div style={{fontSize:18}}>🔥</div>
                            <div style={{fontSize:14,fontWeight:700}}>{streak}</div>
                            <div style={{fontSize:9,color:'var(--dim2)'}}>Streak</div>
                          </div>
                          <div style={{background:'var(--panel2)',borderRadius:10,padding:'8px 4px'}}>
                            <div style={{fontSize:18}}>🎯</div>
                            <div style={{fontSize:14,fontWeight:700}}>{totalPomodoros}</div>
                            <div style={{fontSize:9,color:'var(--dim2)'}}>Sessions</div>
                          </div>
                          <div style={{background:'var(--panel2)',borderRadius:10,padding:'8px 4px'}}>
                            <div style={{fontSize:18}}>🪙</div>
                            <div style={{fontSize:14,fontWeight:700}}>{coins}</div>
                            <div style={{fontSize:9,color:'var(--dim2)'}}>Coins</div>
                          </div>
                        </div>
                        {bestStreak>0&&<div style={{fontSize:10,color:'var(--dim2)',marginTop:8,textAlign:'center'}}>🏅 Best streak: {bestStreak} days</div>}
                      </div>
                      {/* Achievements */}
                      <div>
                        <div style={{fontSize:10,fontWeight:600,letterSpacing:1.2,textTransform:'uppercase',color:'var(--dim2)',marginBottom:8}}>
                          {t.progress_achievements} ({unlockedCount}/{ACHIEVEMENT_DEFS.length})
                        </div>
                        <div style={{display:'flex',flexDirection:'column',gap:6}}>
                          {ACHIEVEMENT_DEFS.map((def)=>{
                            const unlocked=unlockedAchievements.includes(def.id)
                            return(
                              <div key={def.id} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 10px',borderRadius:10,background:'var(--input)',opacity:unlocked?1:0.5,border:`1px solid ${unlocked?accent+'30':'var(--border)'}`}}>
                                <span style={{fontSize:18,filter:unlocked?'none':'grayscale(1)'}}>{def.emoji}</span>
                                <div style={{flex:1,minWidth:0}}>
                                  <div style={{fontSize:12,fontWeight:600,color:unlocked?'var(--text)':'var(--dim)'}}>{def.title}</div>
                                  <div style={{fontSize:10,color:'var(--dim2)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{def.desc}</div>
                                </div>
                                {unlocked&&<span style={{fontSize:9,color:'#4ade80',background:'rgba(74,222,128,0.15)',padding:'2px 6px',borderRadius:4,flexShrink:0}}>✓</span>}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                })()}

                {/* Share */}
                {moreTab==='share'&&(
                  <div>
                    <p style={{fontSize:11,color:'var(--dim)',margin:'0 0 12px',lineHeight:1.5}}>{t.share_desc}</p>
                    <div style={{background:'var(--input)',borderRadius:12,padding:'10px 12px',fontSize:10,color:'var(--dim2)',wordBreak:'break-all',lineHeight:1.5,border:'1px solid var(--border)',marginBottom:12,maxHeight:60,overflowY:'auto'}}>
                      {mounted?shareUrl:'…'}
                    </div>
                    <button onClick={handleShare} style={{width:'100%',padding:'11px 0',borderRadius:12,border:'none',background:copied?'#1a3a20':accent,color:copied?'#4ade80':'#16121f',fontSize:13,fontWeight:600,cursor:'pointer',transition:'all .2s'}}>
                      {copied?t.share_copied:t.share_copy}
                    </button>
                    <p style={{fontSize:10,color:'var(--dim2)',marginTop:10,lineHeight:1.5,textAlign:'center'}}>{t.share_hint}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer player */}
          <div style={{display:'flex',alignItems:'center',gap:13,padding:'13px 16px',borderTop:'1px solid var(--border)',background:'var(--panel2)'}}>
            <button onClick={togglePlay} style={{display:'flex',width:42,height:42,flexShrink:0,alignItems:'center',justifyContent:'center',border:'none',borderRadius:'50%',background:accent,color:'#16121f',cursor:'pointer',boxShadow:`0 6px 18px ${accentGlow}`}}>
              {started&&playing
                ?<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
                :<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5v14l12-7z"/></svg>}
            </button>
            <div style={{minWidth:0,width:128}}>
              <div style={{fontSize:10,fontWeight:600,letterSpacing:.6,textTransform:'uppercase',color:'var(--dim2)'}}>{started&&playing?t.music_now_playing:t.music_paused}</div>
              <div style={{fontSize:14,fontWeight:600,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{lofiId==='custom'?t.music_custom_yt:activeName}</div>
            </div>
            <div style={{flex:1,display:'flex',alignItems:'center',gap:9}}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--dim)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/></svg>
              <input type="range" min="0" max="100" value={lofiVol} onChange={e=>handleLofiVol(+e.target.value)} style={{flex:1,height:4,cursor:'pointer'}}/>
              <span style={{fontSize:12,fontWeight:600,color:'var(--dim)',width:34,textAlign:'right'}}>{lofiVol}%</span>
            </div>
          </div>
        </div>
      )}

      {/* ── YouTube popover (custom audio track, triggered from the dock) ── */}
      {/* ── "More" menu: the dock's rarely-used utilities ── */}
      {openPopover==='more'&&!zen&&(()=>{
        const row:React.CSSProperties={display:'flex',alignItems:'center',gap:11,width:'100%',padding:'10px 12px',border:'none',borderRadius:11,background:'transparent',color:'var(--text)',fontSize:13,fontWeight:500,cursor:'pointer',textAlign:'left',textDecoration:'none',fontFamily:'inherit'}
        const ic={width:17,height:17,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:2,strokeLinecap:'round' as const,strokeLinejoin:'round' as const,style:{flexShrink:0,color:'var(--dim)'}}
        return(
        <div onClick={e=>e.stopPropagation()} style={{position:'fixed',left:'50%',bottom:mob?72:108,transform:'translateX(-50%)',zIndex:9,width:'min(300px,calc(100vw - 24px))',padding:8,...glassPanel,borderRadius:18,boxShadow:'0 22px 60px rgba(0,0,0,.42)'}}>
          <button onClick={handleShare} style={row}>
            <svg {...ic}><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/></svg>
            <span style={{flex:1}}>{copied?t.share_copied:t.share_copy}</span>
          </button>
          <button onClick={()=>setTheme(th=>th==='glass'?'warm':'glass')} style={row}>
            <svg {...ic}><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22"/></svg>
            <span style={{flex:1}}>{t.switch_theme}</span>
            <span style={{fontSize:11,color:'var(--dim2)'}}>{theme==='glass'?'Glass':'Warm'}</span>
          </button>
          <div style={{...row,cursor:'default'}}>
            <svg {...ic}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>
            <span style={{flex:1}}>{t.tip_lang}</span>
            <select value={lang} aria-label={t.tip_lang} onChange={e=>{if(isLang(e.target.value))setLang(e.target.value)}}
              style={{padding:'4px 8px',border:'none',borderRadius:7,cursor:'pointer',fontSize:11.5,fontWeight:600,background:accentSoft,color:accent,fontFamily:'inherit',outline:'none',maxWidth:130}}>
              {LANGS.map(l=><option key={l.code} value={l.code} style={{background:'#16121f',color:'#f3f3f8'}}>{l.label}</option>)}
            </select>
          </div>
          <button onClick={()=>{setOpenPopover(null);setShowShortcuts(true)}} style={row}>
            <svg {...ic}><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/></svg>
            <span style={{flex:1}}>{t.shortcuts_title}</span>
            <kbd style={{fontSize:10,color:'var(--dim2)'}}>?</kbd>
          </button>
          <a href="/blog" target="_blank" rel="noopener noreferrer" style={row}>
            <svg {...ic}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            <span style={{flex:1}}>Blog</span><span style={{fontSize:11,color:'var(--dim2)'}}>↗</span>
          </a>
          <div style={{height:1,background:'var(--border)',margin:'4px 6px'}}/>
          <button onClick={()=>{setOpenPopover(null);setShowSupport(true)}} style={{...row,color:'#f472b6'}}>
            <svg {...ic} style={{flexShrink:0,color:'#f472b6'}}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span style={{flex:1}}>{t.tip_support}</span>
          </button>
        </div>
        )
      })()}

      {/* Browser refused to autoplay the stream (iOS/Safari, strict autoplay settings) —
          one tap here calls playVideo() inside a real user gesture. */}
      {ytStatus==='tap'&&started&&playing&&!home&&(
        <button onClick={retryYT} style={{position:'fixed',top:mob?60:64,left:'50%',transform:'translateX(-50%)',zIndex:12,display:'flex',alignItems:'center',gap:8,padding:'9px 16px',border:'none',borderRadius:999,background:accent,color:'#16121f',fontWeight:700,fontSize:13,cursor:'pointer',boxShadow:'0 8px 24px rgba(0,0,0,.35)',fontFamily:'inherit'}}>
          ▶ {t.music_tap_play}
        </button>
      )}

      {/* ── Mode switch: Focus / Come Home. Above the start overlay so evening visitors can
          go straight to Come Home without starting the focus audio first. ── */}
      <div role="radiogroup" aria-label={t.mode_switch_label} style={{position:'fixed',top:14,...(mob?{right:12}:{left:'50%',transform:'translateX(-50%)'}),zIndex:11,display:'flex',gap:2,padding:4,borderRadius:999,...glassPanel,boxShadow:'0 10px 30px rgba(0,0,0,.3)'}}>
        <button role="radio" aria-checked style={{display:'flex',alignItems:'center',gap:6,padding:mob?'6px 10px':'7px 14px',border:'none',borderRadius:999,background:accentSoft,color:accent,fontSize:12.5,fontWeight:600,cursor:'default',fontFamily:'inherit'}}>
          <span aria-hidden>☀️</span>{mob?<span className="lf-sr">{t.mode_focus}</span>:t.mode_focus}
        </button>
        <button role="radio" aria-checked={false} onClick={enterHome} style={{display:'flex',alignItems:'center',gap:6,padding:mob?'6px 11px':'7px 14px',border:'none',borderRadius:999,background:'transparent',color:'#f3c49b',fontSize:12.5,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>
          <span aria-hidden>🌙</span>{t.mode_home}
        </button>
      </div>

      {/* keeps the last stacked panel scrollable above the dock on mobile */}
      {mob&&mobEnd>0&&<div aria-hidden style={{position:'absolute',top:mobEnd,left:0,width:1,height:90,pointerEvents:'none'}}/>}

      {openPopover==='youtube'&&!zen&&(
        <div onClick={e=>e.stopPropagation()} style={{position:'fixed',left:'50%',bottom:118,transform:'translateX(-50%)',zIndex:9,width:'min(320px,calc(100vw - 24px))',padding:16,...glassPanel,borderRadius:20,boxShadow:'0 22px 60px rgba(0,0,0,.42)'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
            <span style={{fontSize:13,fontWeight:700}}>{t.music_custom_yt}</span>
            <button onClick={()=>setOpenPopover(null)} style={{display:'flex',width:24,height:24,alignItems:'center',justifyContent:'center',border:'none',background:'transparent',color:'var(--dim)',borderRadius:7,cursor:'pointer'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
          {lofiId==='custom'&&(
            <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:10,padding:'9px 12px',borderRadius:11,border:`1px solid ${accentSoft}`,background:accentSoft}}>
              <span style={{width:8,height:8,borderRadius:'50%',background:accent2,flexShrink:0,boxShadow:`0 0 8px ${accent2}`}}/>
              <span style={{fontSize:13,fontWeight:600,flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{customLofiId}</span>
              {ytStatus==='ready'&&<span style={{fontSize:11,fontWeight:600,color:accent2}}>LIVE</span>}
            </div>
          )}
          <div style={{display:'flex',gap:8}}>
            <input autoFocus value={customLofiInput} onChange={e=>setCustomLofiInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')applyCustomLofi()}} onFocus={focusScroll} placeholder={t.music_custom_placeholder}
              style={{flex:1,padding:'10px 12px',border:'1px solid var(--border)',background:'var(--input)',color:'var(--text)',borderRadius:11,fontSize:13,outline:'none',fontFamily:'inherit'}}/>
            <button onClick={applyCustomLofi} style={{padding:'0 18px',border:'none',borderRadius:11,background:accent,color:'#16121f',fontWeight:600,fontSize:13,cursor:'pointer'}}>{t.music_play_btn}</button>
          </div>
          {ytStatus==='unavailable'&&lofiId==='custom'&&(
            <p style={{fontSize:10.5,color:'#f97316',margin:'8px 0 0',lineHeight:1.5,background:'rgba(249,115,22,0.1)',padding:'7px 9px',borderRadius:8}}>{t.music_yt_unavailable}</p>
          )}
          {ytStatus==='blocked'&&(
            <div style={{display:'flex',alignItems:'center',gap:8,marginTop:8,padding:'6px 8px',borderRadius:6,background:'rgba(249,115,22,0.1)'}}>
              <p style={{flex:1,fontSize:10,color:'#f97316',margin:0,lineHeight:1.5}}>{t.music_yt_blocked}</p>
              <button onClick={retryYT} style={{fontSize:10,fontWeight:600,color:'#f97316',background:'rgba(249,115,22,0.18)',border:'none',borderRadius:7,padding:'4px 9px',cursor:'pointer',flexShrink:0}}>{t.music_retry_btn}</button>
            </div>
          )}
        </div>
      )}

      {/* ── Background ("Nền") popover — presets, custom GIF/YouTube background, atmosphere, opacity, blur ── */}
      {openPopover==='background'&&!zen&&(
        <div onClick={e=>e.stopPropagation()} style={{position:'fixed',left:'50%',bottom:118,transform:'translateX(-50%)',zIndex:9,width:'min(472px,calc(100vw - 24px))',...glassPanel,borderRadius:22,boxShadow:'0 22px 60px rgba(0,0,0,.42)',overflow:'hidden'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',borderBottom:'1px solid var(--border)'}}>
            <span style={{fontSize:13,fontWeight:700}}>{t.tab_scene}</span>
            <button onClick={()=>setOpenPopover(null)} style={{display:'flex',width:28,height:28,alignItems:'center',justifyContent:'center',border:'none',background:'transparent',color:'var(--dim)',borderRadius:8,cursor:'pointer'}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div style={{padding:'14px 16px',maxHeight:'60vh',overflowY:'auto'}}>
            <div style={{fontSize:10,fontWeight:600,letterSpacing:1.2,textTransform:'uppercase',color:'var(--dim2)',marginBottom:10}}>{t.scene_atm_title}</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:16}}>
              {([
                ['none','🌐',t.atm_none_label,t.atm_none_note],
                ['day','🌸',t.atm_day_label,t.atm_day_note],
                ['dusk','🌇',t.atm_dusk_label,t.atm_dusk_note],
                ['night','🌙',t.atm_night_label,t.atm_night_note],
                ['dim','🌑',t.atm_dim_label,t.atm_dim_note],
              ] as [string,string,string,string][]).map(([id,emoji,label,note])=>(
                <button key={id} onClick={()=>setAtmosphere(id as any)} style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:4,padding:12,border:`1px solid ${atmosphere===id?accent:'var(--border)'}`,borderRadius:12,background:atmosphere===id?accentSoft:'var(--input)',color:'var(--text)',cursor:'pointer',transition:'all .16s ease',textAlign:'left'}}>
                  <div style={{display:'flex',alignItems:'center',gap:6}}><span style={{fontSize:18}}>{emoji}</span><span style={{fontSize:12,fontWeight:600}}>{label}</span></div>
                  <span style={{fontSize:10,color:'var(--dim)'}}>{note}</span>
                </button>
              ))}
            </div>
            <div style={{fontSize:10,fontWeight:600,letterSpacing:1.2,textTransform:'uppercase',color:'var(--dim2)',marginBottom:10}}>{t.scene_bg_title}</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:14}}>
              {BG_PRESETS.map(g=>(
                <button key={g.id} onClick={()=>{setBgUrl(g.url);setBgType(bgTypeFromUrl(g.url))}} onPointerEnter={()=>prefetchScene(g.url)} onFocus={()=>prefetchScene(g.url)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:5,padding:'14px 8px',border:`1px solid ${bgUrl===g.url&&bgType!=='youtube'?accent:'var(--border)'}`,borderRadius:14,background:bgUrl===g.url&&bgType!=='youtube'?accentSoft:'var(--input)',color:'var(--text)',cursor:'pointer',transition:'all .16s ease'}}>
                  <span style={{fontSize:22,lineHeight:1}}>{g.emoji}</span>
                  <span style={{fontSize:11,fontWeight:600}}>{g.label}</span>
                </button>
              ))}
            </div>
            <div style={{fontSize:10,fontWeight:600,letterSpacing:1.2,textTransform:'uppercase',color:'var(--dim2)',marginBottom:6}}>{t.scene_gif_title}</div>
            <div style={{display:'flex',gap:8,marginBottom:12}}>
              <input type="text" value={customBg} onChange={e=>setCustomBg(e.target.value)} onFocus={focusScroll} placeholder="https://… .gif"
                style={{flex:1,padding:'9px 11px',border:'1px solid var(--border)',background:'var(--input)',color:'var(--text)',borderRadius:11,fontSize:13,outline:'none',fontFamily:'inherit'}}/>
              <button onClick={()=>{const u=customBg.trim();if(u){setBgUrl(u);setBgType(bgTypeFromUrl(u))}}} style={{padding:'0 16px',border:'none',borderRadius:11,background:accent,color:'#16121f',fontWeight:600,fontSize:13,cursor:'pointer'}}>{t.scene_gif_use}</button>
            </div>
            <div style={{fontSize:10,fontWeight:600,letterSpacing:1.2,textTransform:'uppercase',color:'var(--dim2)',marginBottom:6}}>{t.scene_yt_title}</div>
            <div style={{display:'flex',gap:8,marginBottom:10}}>
              <input type="text" value={bgYtInput} onChange={e=>setBgYtInput(e.target.value)} onFocus={focusScroll} placeholder={t.scene_yt_placeholder}
                style={{flex:1,padding:'9px 11px',border:'1px solid var(--border)',background:'var(--input)',color:'var(--text)',borderRadius:11,fontSize:13,outline:'none',fontFamily:'inherit'}}/>
              <button onClick={()=>{const id=parseYtId(bgYtInput);if(id){setBgYtId(id);setBgType('youtube')}}} style={{padding:'0 12px',border:'none',borderRadius:11,background:'#dc2626',color:'#fff',fontWeight:600,fontSize:13,cursor:'pointer'}}>{t.scene_yt_btn}</button>
            </div>
            {bgType==='youtube'&&(
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10,background:'rgba(220,38,38,0.1)',borderRadius:10,padding:'7px 12px',border:'1px solid rgba(220,38,38,0.3)'}}>
                <span style={{fontSize:11,color:'#fca5a5'}}>{t.scene_yt_active}</span>
                <button onClick={()=>setBgType('gif')} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.4)',fontSize:12,padding:0}}>{t.scene_yt_off}</button>
              </div>
            )}
            <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:4,marginBottom:14}}>
              <div>
                <div style={{fontSize:10,fontWeight:600,letterSpacing:1.2,textTransform:'uppercase',color:'var(--dim2)',marginBottom:6}}>{t.scene_dark_title}</div>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontSize:11}}>☀️</span>
                  <input type="range" min="0" max="90" value={bgOpacity} onChange={e=>setBgOpacity(+e.target.value)} style={{flex:1,cursor:'pointer'}}/>
                  <span style={{fontSize:11}}>🌑</span>
                  <span style={{fontSize:10,color:'var(--dim2)',minWidth:28,textAlign:'right'}}>{bgOpacity}%</span>
                </div>
              </div>
              <div>
                <div style={{fontSize:10,fontWeight:600,letterSpacing:1.2,textTransform:'uppercase',color:'var(--dim2)',marginBottom:6}}>{t.scene_blur_title}</div>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <input type="range" min="0" max="20" value={bgBlur} onChange={e=>setBgBlur(+e.target.value)} style={{flex:1,cursor:'pointer'}}/>
                  <span style={{fontSize:10,color:'var(--dim2)',minWidth:36,textAlign:'right'}}>{bgBlur}px</span>
                </div>
              </div>
            </div>
            <a href="/scenes" target="_blank" rel="noopener noreferrer" style={{display:'block',textAlign:'center',fontSize:12,fontWeight:600,color:'var(--dim)',textDecoration:'underline'}}>{t.scene_view_all}</a>
          </div>
        </div>
      )}

      {/* ── Day/Night badge ── */}
      {mounted&&!started&&!mob&&(
        <div style={{position:'absolute',top:14,right:14,background:'rgba(0,0,0,0.55)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:20,padding:'4px 10px',display:'flex',alignItems:'center',gap:5,zIndex:5,pointerEvents:'none',animation:'dnFade 4s ease forwards'}}>
          <span style={{fontSize:13}}>{dn.emoji}</span>
          <span style={{fontSize:10,color:'rgba(255,255,255,0.5)'}}>{t.dn_labels[dn.period]||dn.label}</span>
        </div>
      )}

      {/* ── Click to start ──
          Rendered on the very first paint (not gated on `mounted`) so it isn't a layout
          shift, but its onClick only does anything once React has hydrated. Before that,
          a tap here used to be silently swallowed — on a slow/cold load that's what made
          "no music, had to reload a few times" happen. Show it as an obviously non-
          interactive loading state until `mounted` flips true, then swap to the real
          clickable prompt, so there's never a dead-looking-clickable tap target. */}
      {!started&&(
        <div onClick={mounted?doStart:undefined} onPointerOver={()=>ytWarmRef.current?.()} style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14,background:'rgba(0,0,0,0.38)',backdropFilter:'blur(4px)',cursor:mounted?'pointer':'default',zIndex:10}}>
          <div style={{width:68,height:68,borderRadius:'50%',background:accent,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 0 40px ${accentGlow}`,opacity:mounted?1:0.55,transition:'opacity .2s ease'}}>
            {mounted
              ?<svg viewBox="0 0 24 24" fill="white" width="30" height="30"><path d="M8 5v14l11-7z"/></svg>
              :<div style={{width:22,height:22,border:'2.5px solid rgba(255,255,255,0.35)',borderTopColor:'#fff',borderRadius:'50%',animation:'spin .8s linear infinite'}}/>}
          </div>
          <p style={{fontSize:13,color:'rgba(255,255,255,0.75)',letterSpacing:'0.04em',margin:0}}>{mounted?t.click_to_start:t.app_loading}</p>
        </div>
      )}

      {/* ── Calendar Modal ── */}
      {showCal&&(
        <div onClick={()=>setShowCal(false)} style={{position:'fixed',inset:0,zIndex:20,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,.42)',backdropFilter:'blur(3px)',WebkitBackdropFilter:'blur(3px)'}}>
          <div onClick={e=>e.stopPropagation()} style={{display:'flex',width:'min(660px,92vw)',maxHeight:'90vh',...glassPanel,borderRadius:24,boxShadow:'0 30px 80px rgba(0,0,0,.5)',overflow:'hidden'}}>
            {/* Calendar grid */}
            <div style={{flex:1,padding:'22px 24px',overflowY:'auto'}}>
              {(()=>{
                const monthNames=t.cal_months
                const {y,m}=calMonth
                const firstDow=new Date(y,m,1).getDay()
                const daysInMonth=new Date(y,m+1,0).getDate()
                const _td=new Date();const todayKey=`${_td.getFullYear()}-${_td.getMonth()}-${_td.getDate()}`
                const wdShort=t.cal_days_short
                const cells:React.ReactNode[]=[]
                for(let i=0;i<firstDow;i++)cells.push(<div key={`e${i}`}/>)
                for(let dd=1;dd<=daysInMonth;dd++){
                  const key=`${y}-${m}-${dd}`
                  const has=!!(calNotes[key]?.length)
                  const isToday=key===todayKey,isSel=key===calSelected
                  let bg='transparent',bd='1px solid transparent',col='var(--text)',fw='500'
                  if(isSel){bg=accent;col='#16121f';fw='700'}
                  else if(isToday){bd=`1px solid ${accent}`;col=accent;fw='700'}
                  cells.push(
                    <button key={key} onClick={()=>setCalSelected(key)}
                      style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:38,border:bd,borderRadius:10,background:bg,color:col,fontSize:13,fontWeight:fw as any,cursor:'pointer',transition:'all .14s ease'}}>
                      <span>{dd}</span>
                      {has&&<span style={{position:'absolute',bottom:4,width:4,height:4,borderRadius:'50%',background:isSel?'#16121f':accent2}}/>}
                    </button>
                  )
                }
                return(
                  <>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:18}}>
                      <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:19}}>{monthNames[m]}, {y}</span>
                      <div style={{display:'flex',gap:6}}>
                        <button onClick={()=>setCalMonth(cm=>{const nm=cm.m-1;return nm<0?{y:cm.y-1,m:11}:{y:cm.y,m:nm}})}
                          style={{display:'flex',width:32,height:32,alignItems:'center',justifyContent:'center',border:'1px solid var(--border)',borderRadius:9,background:'var(--input)',color:'var(--text)',cursor:'pointer'}}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                        </button>
                        <button onClick={()=>{const t=new Date();setCalMonth({y:t.getFullYear(),m:t.getMonth()});setCalSelected(`${t.getFullYear()}-${t.getMonth()}-${t.getDate()}`)}}
                          style={{padding:'0 12px',height:32,border:'1px solid var(--border)',borderRadius:9,background:'var(--input)',color:'var(--text)',cursor:'pointer',fontSize:12,fontWeight:600}}>{t.cal_today}</button>
                        <button onClick={()=>setCalMonth(cm=>{const nm=cm.m+1;return nm>11?{y:cm.y+1,m:0}:{y:cm.y,m:nm}})}
                          style={{display:'flex',width:32,height:32,alignItems:'center',justifyContent:'center',border:'1px solid var(--border)',borderRadius:9,background:'var(--input)',color:'var(--text)',cursor:'pointer'}}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                        </button>
                      </div>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:4,marginBottom:6}}>
                      {wdShort.map(w=><div key={w} style={{textAlign:'center',fontSize:10.5,fontWeight:600,letterSpacing:.4,color:'var(--dim2)',padding:'4px 0'}}>{w}</div>)}
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:4}}>{cells}</div>
                  </>
                )
              })()}
            </div>
            {/* Day notes side */}
            <div style={{width:266,flexShrink:0,display:'flex',flexDirection:'column',borderLeft:'1px solid var(--border)',background:'var(--panel2)'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'18px 18px 14px'}}>
                <div>
                  <div style={{fontSize:10,fontWeight:600,letterSpacing:1.2,textTransform:'uppercase',color:'var(--dim2)'}}>{t.cal_day_notes}</div>
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:17,marginTop:2}}>
                    {(()=>{const p=calSelected.split('-').map(Number);const d=new Date(p[0],p[1],p[2]);if(isNaN(d.getTime()))return'—';return d.toLocaleDateString(localeOf(lang),{month:'short',day:'numeric'})})()}
                  </div>
                </div>
                <button onClick={()=>setShowCal(false)} style={{display:'flex',width:28,height:28,alignItems:'center',justifyContent:'center',border:'none',background:'transparent',color:'var(--dim)',borderRadius:8,cursor:'pointer'}}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>
              <div style={{flex:1,maxHeight:300,overflowY:'auto',padding:'0 12px'}}>
                {(calNotes[calSelected]||[]).length===0&&<div style={{padding:'30px 14px',textAlign:'center',fontSize:12.5,color:'var(--dim2)'}}>{t.cal_empty}</div>}
                {(calNotes[calSelected]||[]).map(dn=>(
                  <div key={dn.id} style={{display:'flex',alignItems:'flex-start',gap:9,padding:'9px 10px',marginBottom:6,borderRadius:11,background:'var(--input)',border:'1px solid var(--border)'}}>
                    <span style={{flexShrink:0,width:6,height:6,marginTop:6,borderRadius:'50%',background:accent}}/>
                    <span style={{flex:1,fontSize:13,lineHeight:1.4,wordBreak:'break-word'}}>{dn.text}</span>
                    <button onClick={()=>delCalNote(calSelected,dn.id)} style={{display:'flex',width:20,height:20,flexShrink:0,alignItems:'center',justifyContent:'center',border:'none',background:'transparent',color:'var(--dim2)',borderRadius:6,cursor:'pointer'}}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>
                    </button>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',gap:8,padding:12,borderTop:'1px solid var(--border)'}}>
                <input value={calInput} onChange={e=>setCalInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')addCalNote()}} onFocus={focusScroll} placeholder={t.cal_placeholder}
                  style={{flex:1,padding:'9px 11px',border:'1px solid var(--border)',background:'var(--input)',color:'var(--text)',borderRadius:10,fontSize:13,outline:'none',fontFamily:'inherit'}}/>
                <button onClick={addCalNote} style={{display:'flex',width:36,flexShrink:0,alignItems:'center',justifyContent:'center',border:'none',borderRadius:10,background:accent,color:'#16121f',cursor:'pointer'}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── DOCK — grouped clusters: Play · Content (labeled chips) · Explore · Utility ── */}
      {zen&&(
        <button onClick={()=>setZen(false)} title={t.zen_hint} style={{position:'fixed',bottom:mob?14:24,left:'50%',transform:'translateX(-50%)',zIndex:8,display:'flex',alignItems:'center',gap:7,padding:'8px 16px',border:'1px solid var(--border)',borderRadius:999,...glassPanel,color:'var(--dim)',fontSize:12,fontWeight:600,cursor:'pointer'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
          {t.zen_label} · Esc
        </button>
      )}
      <TipCtx.Provider value={setTip}>
      {tip&&(
        <div style={{position:'fixed',left:tip.x,top:tip.y-10,transform:'translate(-50%,-100%)',zIndex:40,background:'rgba(20,17,40,.97)',color:'#fff',fontSize:11,fontWeight:600,letterSpacing:.2,whiteSpace:'nowrap',padding:'5px 9px',borderRadius:8,border:'1px solid rgba(255,255,255,.14)',boxShadow:'0 6px 20px rgba(0,0,0,.4)',pointerEvents:'none'}}>
          {tip.label}
        </div>
      )}
      <div className="lf-dock" style={{position:'fixed',left:'50%',bottom:mob?12:28,transform:'translateX(-50%)',zIndex:7,maxWidth:'calc(100vw - 16px)',overflowX:'auto',borderRadius:999,...glassPanel,boxShadow:'0 16px 44px rgba(0,0,0,.4)',display:zen?'none':undefined}}>
      <div style={{display:'flex',alignItems:'center',gap:mob?3:6,padding:mob?5:7,width:'max-content'}}>

        {/* Play/Pause */}
        <Tip label={t.tip_playpause}>
        <button onClick={togglePlay} style={{display:'flex',width:mob?40:48,height:mob?40:48,flexShrink:0,alignItems:'center',justifyContent:'center',border:'none',borderRadius:'50%',background:accent,color:'#16121f',cursor:'pointer',boxShadow:`0 6px 18px ${accentGlow}`}}>
          {started&&playing
            ?<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
            :<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5v14l12-7z"/></svg>}
        </button>
        </Tip>

        {/* Ambient icons preview */}
        {ambCount>0&&(
          <div style={{display:'flex',gap:2,fontSize:14,padding:'0 2px'}}>
            {Object.keys(ambVols).slice(0,3).map(id=>{const s=AMBIENT_SOUNDS.find(s=>s.id===id);return<span key={id}>{s?.icon}</span>})}
            {ambCount>3&&<span style={{fontSize:10,color:'var(--dim)',lineHeight:'28px'}}>+{ambCount-3}</span>}
          </div>
        )}

        <div style={divider}/>

        {/* Content cluster */}
        <div style={{display:'flex',alignItems:'center',gap:mob?1:2}}>
          <button onClick={()=>setPanel(v=>!v)} style={chip(panel)} title={t.tab_music}>
            <svg width={mob?16:18} height={mob?16:18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
            <span style={{fontSize:mob?9.5:11,fontWeight:600,whiteSpace:'nowrap'}}>{t.dock_music}</span>
          </button>

          <button onClick={()=>setOpenPopover(v=>v==='youtube'?null:'youtube')} style={chip(openPopover==='youtube')} title={t.music_custom_yt}>
            <svg width={mob?16:18} height={mob?16:18} viewBox="0 0 24 24" fill="none"><rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.8"/><path d="M10.5 9.2v5.6l5-2.8-5-2.8z" fill="currentColor"/></svg>
            <span style={{fontSize:mob?9.5:11,fontWeight:600,whiteSpace:'nowrap'}}>YouTube</span>
          </button>

          <button onClick={()=>setOpenPopover(v=>v==='background'?null:'background')} style={chip(openPopover==='background')} title={t.tab_scene}>
            <svg width={mob?16:18} height={mob?16:18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="M21 16l-4.5-4.5L7 21"/></svg>
            <span style={{fontSize:mob?9.5:11,fontWeight:600,whiteSpace:'nowrap'}}>{t.dock_background}</span>
          </button>

          <button onClick={()=>setShowPom(v=>!v)} style={chip(showPom)} title="Pomodoro">
            <svg width={mob?16:18} height={mob?16:18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/></svg>
            <span style={{fontSize:mob?9.5:11,fontWeight:600,whiteSpace:'nowrap'}}>Pomodoro</span>
          </button>

          <button onClick={()=>setShowNote(v=>!v)} style={{...chip(showNote),position:'relative'}} title={t.todo_title}>
            <svg width={mob?16:18} height={mob?16:18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            <span style={{fontSize:mob?9.5:11,fontWeight:600,whiteSpace:'nowrap'}}>{t.dock_todo}</span>
            {todos.length>0&&<span style={{position:'absolute',top:-2,right:-2,width:14,height:14,borderRadius:'50%',background:'#f0563e',fontSize:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,color:'#fff'}}>{todos.length}</span>}
          </button>

          <button onClick={()=>setShowCal(v=>!v)} style={chip(showCal)} title={t.cal_day_notes}>
            <svg width={mob?16:18} height={mob?16:18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/></svg>
            <span style={{fontSize:mob?9.5:11,fontWeight:600,whiteSpace:'nowrap'}}>{t.dock_calendar}</span>
          </button>
        </div>

        <div style={divider}/>

        {/* Explore cluster */}
        <a href="/dashboard" target="_blank" rel="noopener noreferrer" style={{...chip(false),position:'relative',textDecoration:'none'}} title="Focus Dashboard">
          <svg width={mob?16:18} height={mob?16:18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="12" width="4" height="8" rx="1"/><rect x="10" y="7" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="17" rx="1"/></svg>
          <span style={{fontSize:mob?9.5:11,fontWeight:600,whiteSpace:'nowrap'}}>Dashboard</span>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{position:'absolute',right:5,top:5,opacity:.6}}><path d="M7 17L17 7M9 7h8v8"/></svg>
        </a>

        <div style={divider}/>

        {/* Utility cluster */}
        <div style={{display:'flex',alignItems:'center',gap:1}}>
          <Tip label={zen?t.zen_hint:`${t.zen_label} (Z)`}>
          <button onClick={()=>setZen(v=>!v)} style={{...dockBtn(zen),flexShrink:0}} title={zen?t.zen_hint:`${t.zen_label} (Z)`}>
            {/* leaf — "hide everything but the timer" */}
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
          </button>
          </Tip>

          <Tip label={isFullscreen?t.tip_fullscreen_exit:t.tip_fullscreen}>
          <button onClick={toggleFullscreen} style={{...dockBtn(isFullscreen),flexShrink:0}} title={isFullscreen?t.tip_fullscreen_exit:t.tip_fullscreen}>
            {isFullscreen
              ?<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 0 2 2v3M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
              :<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>}
          </button>
          </Tip>

          <Tip label={t.more}>
          <button onClick={()=>setOpenPopover(v=>v==='more'?null:'more')} aria-expanded={openPopover==='more'} style={{...dockBtn(openPopover==='more'),flexShrink:0}} title={t.more}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="19" cy="12" r="1.9"/></svg>
          </button>
          </Tip>
        </div>
      </div>{/* end inner flex */}
      </div>{/* end dock */}
      </TipCtx.Provider>

      {/* ── Branding ── */}
      <a href="/" target="_blank" rel="noopener noreferrer" style={{position:'fixed',bottom:5,right:10,fontSize:9,color:'rgba(255,255,255,0.18)',textDecoration:'none',zIndex:5}}>
        Powered by LofiSpace
      </a>


      {/* ── Onboarding tip (first visit only) ── */}
      {showOnboard&&(
        <div onClick={dismissOnboard} style={{position:'fixed',bottom:mob?76:96,left:'50%',zIndex:30,cursor:'pointer',animation:'onboardIn 0.35s ease forwards',pointerEvents:'all'}}>
          <div style={{display:'flex',alignItems:'center',gap:10,padding:'10px 16px',borderRadius:14,background:'rgba(20,17,40,0.92)',backdropFilter:'blur(16px)',WebkitBackdropFilter:'blur(16px)',border:`1px solid ${accent}55`,boxShadow:`0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${accent}22`,whiteSpace:'nowrap',maxWidth:'calc(100vw - 32px)'}}>
            <span style={{fontSize:18,flexShrink:0}}>🎵</span>
            <div style={{minWidth:0}}>
              <p style={{margin:0,fontSize:13,fontWeight:600,color:'#fff',lineHeight:1.3}}>Paste a YouTube link to listen to</p>
              <p style={{margin:'2px 0 0',fontSize:11,color:'var(--dim)',lineHeight:1.3}}>Tap the music button → paste URL in Custom YouTube</p>
            </div>
            <div style={{flexShrink:0,width:20,height:20,borderRadius:'50%',background:'rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'var(--dim)'}}>✕</div>
          </div>
          {/* Arrow pointing down to dock */}
          <div style={{display:'flex',justifyContent:'center',marginTop:4}}>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M6 8L0 0h12L6 8z" fill={`${accent}88`}/></svg>
          </div>
        </div>
      )}

      {/* ── Support modal ── */}
      <SupportModal open={showSupport} onClose={()=>setShowSupport(false)} />

      {/* ── XP toast ── */}
      {xpToast&&(
        <div key={xpToast.key} style={{position:'fixed',left:'50%',bottom:mob?72:96,zIndex:20,pointerEvents:'none',animation:'xpFloat 2.8s ease forwards',whiteSpace:'nowrap'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,padding:'7px 16px',borderRadius:999,background:'rgba(26,23,44,0.85)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',border:`1px solid ${accent}44`,boxShadow:`0 4px 20px ${accentGlow}`,color:'#fff',fontSize:14,fontWeight:700,letterSpacing:.3}}>
            <span style={{fontSize:16}}>⚡</span>
            <span style={{color:accent}}>+{xpToast.xp} XP</span>
            <span style={{color:'rgba(255,255,255,0.5)',fontSize:11,fontWeight:500}}>{t.pom_done_toast}</span>
          </div>
        </div>
      )}

      {/* ── Daily goal toast ── */}
      {goalToast&&(
        <div key={goalToast} style={{position:'fixed',left:'50%',bottom:mob?72:96,zIndex:20,pointerEvents:'none',animation:'xpFloat 3.2s ease forwards',whiteSpace:'nowrap'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'8px 18px',borderRadius:999,background:'rgba(26,23,44,0.9)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',border:`1px solid ${accent}55`,boxShadow:`0 4px 24px ${accentGlow}`,color:'#fff',fontSize:14,fontWeight:700}}>
            {t.pom_goal_reached}
          </div>
        </div>
      )}

      {/* ── Keyboard shortcuts cheatsheet ── */}
      {showShortcuts&&(
        <div onClick={()=>setShowShortcuts(false)} style={{position:'fixed',inset:0,zIndex:40,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,.42)',backdropFilter:'blur(3px)',WebkitBackdropFilter:'blur(3px)'}}>
          <div onClick={e=>e.stopPropagation()} style={{width:'min(320px,90vw)',padding:'18px 20px',...glassPanel,borderRadius:18,boxShadow:'0 24px 60px rgba(0,0,0,.5)'}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>{t.shortcuts_title}</div>
            {([['Space','▶ / ⏸'],['F','Fullscreen'],['P','Pomodoro'],['N','To-Do'],['Z','Zen mode'],['Esc','Close / exit']] as [string,string][]).map(([k,d])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',fontSize:12,color:'var(--dim)'}}>
                <span>{d}</span>
                <kbd style={{fontFamily:'monospace',fontSize:11,fontWeight:700,padding:'2px 8px',borderRadius:6,background:'var(--input)',border:'1px solid var(--border)',color:'var(--text)'}}>{k}</kbd>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Game notifications ── */}
      {pendingAchievements.length>0&&(
        <AchievementToast key={pendingAchievements[0]} achievementId={pendingAchievements[0]} onDismiss={dismissAchievement} accent={accent}/>
      )}
      {newLevelReached&&(
        <LevelUpOverlay key={newLevelReached} level={newLevelReached} onDismiss={dismissLevelUp} accent={accent}/>
      )}
      </div>{/* end focus-only UI */}

      {home&&<ComeHome audio={homeAudio} lang={lang} onExit={exitHome} setBackdrop={setBackdrop}/>}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
        @keyframes lf-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.82)}}
        @keyframes lf-flame{0%,100%{transform:scale(1) rotate(-2deg)}50%{transform:scale(1.12) rotate(2deg)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes dnFade{0%{opacity:1}70%{opacity:1}100%{opacity:0;pointer-events:none}}
        @keyframes xpFloat{0%{opacity:0;transform:translate(-50%,0) scale(.7)}15%{opacity:1;transform:translate(-50%,-8px) scale(1)}80%{opacity:1;transform:translate(-50%,-24px) scale(1)}100%{opacity:0;transform:translate(-50%,-36px) scale(.9)}}
        @keyframes onboardIn{0%{opacity:0;transform:translateX(-50%) translateY(10px)}100%{opacity:1;transform:translateX(-50%) translateY(0)}}
        *{box-sizing:border-box}
        input[type=range]{-webkit-appearance:none;height:4px;border-radius:2px;outline:none;cursor:pointer;background:var(--track,rgba(255,255,255,.1))}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;cursor:pointer;background:var(--accent,#a78bfa)}
        input::placeholder,textarea::placeholder{color:var(--dim2,rgba(255,255,255,.3))}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--track);border-radius:2px}
        .lf-dock::-webkit-scrollbar{display:none}.lf-dock{scrollbar-width:none;-ms-overflow-style:none}
        .lf-tip{display:inline-flex;flex-shrink:0}
        .lf-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
        @media (max-width:639px){.lf-dock{mask-image:linear-gradient(to right,#000 calc(100% - 28px),transparent);-webkit-mask-image:linear-gradient(to right,#000 calc(100% - 28px),transparent)}}
      `}</style>
    </div>
  )
}
