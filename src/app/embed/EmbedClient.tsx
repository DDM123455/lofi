'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { getDayNightConfig } from '@/hooks/useDayNight'
import { LOFI_STREAMS, AMBIENT_SOUNDS } from '@/lib/lofiStreams'
import { BG_PRESETS, getBgPresetByUrl } from '@/lib/backgrounds'
import { useGameStore, xpProgress, ACHIEVEMENT_DEFS } from '@/lib/gameStore'
import { CodingCatVariant, CAT_VARIANT_META, type CatVariant } from '@/components/companion/CodingCatVariants'
import { AchievementToast, LevelUpOverlay } from '@/components/notifications/AchievementToast'
import { analytics } from '@/lib/analytics'
import { useLanguage } from '@/contexts/LanguageContext'
import { SupportModal } from '@/components/support/SupportModal'

type ClockStyle = 'digital'|'minimal'|'bold'|'analog'
type BgType = 'gif'|'youtube'|'video'
type PanelTab = 'music'|'sounds'|'more'
type MoreTab = 'widgets'|'weather'|'pet'|'progress'|'share'
interface Todo { id:string; text:string; done:boolean; estimate?:number; actual:number }
interface WxData { city:string; temp:number; code:number; desc:string; emoji:string; feels:number|null; humidity:number|null; wind:number|null }

function bgTypeFromUrl(url:string):BgType {
  if(/\.(mp4|webm|mov)$/i.test(url)) return 'video'
  return 'gif'
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

type SynthNode={gain:GainNode;stop:()=>void}
function buildSynthGraph(ctx:AudioContext,id:string):SynthNode {
  const master=ctx.createGain();master.gain.value=0;master.connect(ctx.destination)
  const stops:Array<()=>void>=[]
  const ns=(s=8)=>{const src=ctx.createBufferSource();src.buffer=makePinkBuffer(ctx,s);src.loop=true;return src}
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

function usePomodoro(workMin=25,breakMin=5){
  const[phase,setPhase]=useState<'work'|'break'>('work')
  const[secs,setSecs]=useState(workMin*60)
  const[on,setOn]=useState(false)
  const[completions,setCompletions]=useState(0)
  const total=phase==='work'?workMin*60:breakMin*60
  useEffect(()=>{
    if(!on)return
    const id=setInterval(()=>setSecs(s=>{
      if(s<=1){
        if(phase==='work') setCompletions(c=>c+1)
        setPhase(p=>p==='work'?'break':'work')
        return phase==='work'?breakMin*60:workMin*60
      }
      return s-1
    }),1000)
    return()=>clearInterval(id)
  },[on,phase,workMin,breakMin])
  const setMode=(mode:'work'|'break')=>{setOn(false);setPhase(mode);setSecs(mode==='work'?workMin*60:breakMin*60)}
  return{
    mm:String(Math.floor(secs/60)).padStart(2,'0'),
    ss:String(secs%60).padStart(2,'0'),
    on,toggle:()=>setOn(v=>!v),phase,completions,
    progress:secs/total,
    workMin,
    reset:()=>{setOn(false);setPhase('work');setSecs(workMin*60)},
    setMode,
  }
}

function AnalogClock({now,size=100,accent}:{now:Date;size?:number;accent:string}){
  const cx=size/2,cy=size/2,r=size/2-4
  const h=(now.getHours()%12+now.getMinutes()/60)/12*2*Math.PI-Math.PI/2
  const m=(now.getMinutes()+now.getSeconds()/60)/60*2*Math.PI-Math.PI/2
  const s=now.getSeconds()/60*2*Math.PI-Math.PI/2
  return(
    <svg width={size} height={size} style={{filter:'drop-shadow(0 2px 14px rgba(0,0,0,0.7))'}}>
      <circle cx={cx} cy={cy} r={r} fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.15)" strokeWidth={1.5}/>
      {Array.from({length:12},(_,i)=>{const a=i/12*2*Math.PI;return<line key={i} x1={cx+Math.cos(a)*(r-5)} y1={cy+Math.sin(a)*(r-5)} x2={cx+Math.cos(a)*(r-1)} y2={cy+Math.sin(a)*(r-1)} stroke="rgba(255,255,255,0.3)" strokeWidth={i%3===0?1.5:0.7}/>})}
      <line x1={cx} y1={cy} x2={cx+Math.cos(h)*r*0.52} y2={cy+Math.sin(h)*r*0.52} stroke="white" strokeWidth={3} strokeLinecap="round"/>
      <line x1={cx} y1={cy} x2={cx+Math.cos(m)*r*0.76} y2={cy+Math.sin(m)*r*0.76} stroke="white" strokeWidth={2} strokeLinecap="round"/>
      <line x1={cx} y1={cy} x2={cx+Math.cos(s)*r*0.86} y2={cy+Math.sin(s)*r*0.86} stroke={accent} strokeWidth={1.2} strokeLinecap="round"/>
      <circle cx={cx} cy={cy} r={3} fill={accent}/>
    </svg>
  )
}

export function EmbedClient() {
  const sp = useSearchParams()
  const dn = getDayNightConfig()
  const { lang, setLang, t } = useLanguage()
  const hasBgParam = sp.has('bgv')

  const initBgUrl  = hasBgParam ? decodeURIComponent(sp.get('bgv')!) : '/video/street-scene.mp4'
  const initBgOp   = Math.min(90, Math.max(0, parseInt(sp.get('bgo') ?? String(dn.overlay))))
  const initBlur   = Math.min(20, Math.max(0, parseInt(sp.get('bl') ?? '0')))
  const initWorkMin  = Math.min(60, Math.max(1, parseInt(sp.get('pw') ?? '25') || 25))
  const initBreakMin = Math.min(30, Math.max(1, parseInt(sp.get('pb') ?? '5') || 5))
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
  const [bgReady,     setBgReady]     = useState(false)
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
  const pom = usePomodoro(initWorkMin, initBreakMin)

  // Note / Todo
  const [showNote,    setShowNote]    = useState(sp.get('note')!=='0')
  const [todos,       setTodos]       = useState<Todo[]>([])
  const [todoInput,   setTodoInput]   = useState('')
  const [todoEstInput,setTodoEstInput]= useState('')
  const [activeTodoId,setActiveTodoId]= useState<string|null>(null)
  const noteDrag      = useDraggable()
  const pomDrag       = useDraggable()
  const catDrag       = useDraggable()
  const progressDrag  = useDraggable()

  // Pet / Companion
  const [companionType, setCompanionType] = useState<'none'|'coding'>('coding')
  const [catVariant,    setCatVariant]    = useState<CatVariant>('typist')
  const [catSize,       setCatSize]       = useState(160)
  const [catHovered,    setCatHovered]    = useState(false)
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
  const [openPopover, setOpenPopover] = useState<'youtube'|'background'|null>(null)
  const [now,         setNow]         = useState(new Date())
  const [mounted,     setMounted]     = useState(false)
  const [ytStatus,    setYtStatus]    = useState<'idle'|'loading'|'ready'|'blocked'>('idle')
  const [copied,      setCopied]      = useState(false)
  const [vw,          setVw]          = useState(1280)
  const [showSupport,  setShowSupport]  = useState(false)
  const [showOnboard,  setShowOnboard]  = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Refs
  const ctxRef    = useRef<AudioContext|null>(null)
  const synthRef  = useRef<Record<string,SynthNode>>({})
  const html5Ref  = useRef<Record<string,HTMLAudioElement>>({})
  const ytRef     = useRef<HTMLDivElement>(null)
  const ytPlayer  = useRef<any>(null)
  const ytTimer   = useRef<ReturnType<typeof setTimeout>|null>(null)
  const noteTimer = useRef<ReturnType<typeof setTimeout>|null>(null)
  const shownBgRef  = useRef<{url:string;type:BgType}|null>(null)
  const prevBgTimer = useRef<ReturnType<typeof setTimeout>|null>(null)
  const bgElRef     = useRef<HTMLVideoElement|HTMLImageElement|null>(null)
  const bgPrefetchedRef = useRef(false)

  // ── Game store ──────────────────────────────────────────────────────────
  const {
    streak, bestStreak, xp, level, coins, totalPomodoros,
    companionMood, pendingAchievements, newLevelReached,
    completePomodoro, recordActivity, dismissAchievement, dismissLevelUp,
    unlockedAchievements,
  } = useGameStore()
  const [xpToast, setXpToast] = useState<{xp:number;key:number}|null>(null)

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
      if(!hasBgParam&&s.bgUrl){setBgUrl(s.bgUrl);setBgType(bgTypeFromUrl(s.bgUrl))}
      if(!sp.has('bgo')&&s.bgOpacity!=null)setBgOpacity(s.bgOpacity)
      if(!sp.has('bl')&&s.bgBlur!=null)setBgBlur(s.bgBlur)
      if(!sp.has('ls')&&s.lofiId)setLofiId(s.lofiId)
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
    if(!mounted)return
    try{localStorage.setItem('lofispace-settings',JSON.stringify({bgUrl,bgOpacity,bgBlur,lofiId,lofiVol,ambVols,theme,clockStyle,atmosphere}))}catch(_){}
  },[mounted,bgUrl,bgOpacity,bgBlur,lofiId,lofiVol,ambVols,theme,clockStyle,atmosphere])
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
    setBgReady(false)
    // Large (multi-MB) preset videos can take a while to buffer on a cold cache — don't
    // flash a spinner on the common fast/cached case, only surface it once the wait is
    // long enough that the switch would otherwise look frozen.
    setShowBgSpinner(false)
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
  // Warm the HTTP cache for the other preset videos as soon as the user shows intent to
  // switch (opens the Background popover), so the actual click resolves from cache instead
  // of a cold multi-MB download. One-shot per session; skipped on constrained connections.
  useEffect(()=>{
    if(openPopover!=='background'||bgPrefetchedRef.current)return
    bgPrefetchedRef.current=true
    const conn=(navigator as any).connection
    if(conn?.saveData||conn?.effectiveType==='2g'||conn?.effectiveType==='slow-2g')return
    BG_PRESETS.forEach(p=>{ if(p.url!==bgUrl) fetch(p.url,{credentials:'omit'}).catch(()=>{}) })
  },[openPopover,bgUrl])
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
  useEffect(()=>{ const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t) },[])
  useEffect(()=>{
    if(typeof window==='undefined'||document.getElementById('yt-api'))return
    const s=document.createElement('script');s.id='yt-api';s.src='https://www.youtube.com/iframe_api';s.async=true
    document.head.appendChild(s)
  },[])
  // Show onboarding tip on first visit, auto-dismiss after 6s
  useEffect(()=>{
    if(localStorage.getItem('lofispace-onboarded'))return
    const show=setTimeout(()=>setShowOnboard(true),1800)
    const hide=setTimeout(()=>{setShowOnboard(false);localStorage.setItem('lofispace-onboarded','1')},7800)
    return()=>{clearTimeout(show);clearTimeout(hide)}
  },[])

  // Pre-init YT player silently so first-play is instant
  useEffect(()=>{
    const tryPre=()=>{
      if(!ytRef.current||ytPlayer.current)return
      const container=document.createElement('div')
      ytRef.current.appendChild(container)
      ytPlayer.current=new(window as any).YT.Player(container,{
        height:'180',width:'320',videoId:activeYtId,
        playerVars:{autoplay:0,controls:0,disablekb:1,playsinline:1,enablejsapi:1,origin:window.location.origin},
        events:{
          onReady:(e:any)=>{e.target.setVolume(0);setYtStatus('ready')},
          onError:()=>{ /* pre-init fail is silent, initYT will retry on play */ },
        },
      })
    }
    // No artificial delay: start as soon as this effect runs (post-hydration) so the
    // player is ready by the time a user actually clicks "Tap to start"
    if((window as any).YT?.Player)tryPre()
    else{const p=(window as any).onYouTubeIframeAPIReady;(window as any).onYouTubeIframeAPIReady=()=>{p?.();tryPre()}}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  // Auto-detect weather on mount (skip if URL already has data)
  useEffect(()=>{
    if(urlWx)return
    const t=setTimeout(()=>detectWeather(),1200)
    return()=>clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // ── Audio ──────────────────────────────────────────────────────────────
  const ensureCtx = useCallback(()=>{
    if(!ctxRef.current) ctxRef.current=new(window.AudioContext||(window as any).webkitAudioContext)()
    return ctxRef.current
  },[])

  const startAmbient = useCallback((id:string,vol:number)=>{
    if(synthRef.current[id])return
    const ctx=ensureCtx();ctx.resume().catch(()=>{})
    const node=buildSynthGraph(ctx,id)
    node.gain.gain.setTargetAtTime((vol/100)*0.6,ctx.currentTime,0.1)
    synthRef.current[id]=node
    const sound=AMBIENT_SOUNDS.find(s=>s.id===id)
    if(sound?.file){
      const audio=new Audio(sound.file);audio.loop=true;audio.volume=0
      audio.addEventListener('canplaythrough',()=>{
        const n=synthRef.current[id]
        if(n&&ctxRef.current){n.gain.gain.setTargetAtTime(0,ctxRef.current.currentTime,0.3);setTimeout(()=>{try{n.stop()}catch(_){}; delete synthRef.current[id]},600)}
        html5Ref.current[id]=audio;audio.volume=(vol/100)*0.6;audio.play().catch(()=>{})
      },{once:true});audio.load()
    }
  },[ensureCtx])

  const stopAmbient = useCallback((id:string)=>{
    if(html5Ref.current[id]){html5Ref.current[id].pause();html5Ref.current[id].src='';delete html5Ref.current[id]}
    if(synthRef.current[id]&&ctxRef.current){
      synthRef.current[id].gain.gain.setTargetAtTime(0,ctxRef.current.currentTime,0.15)
      setTimeout(()=>{try{synthRef.current[id]?.stop()}catch(_){};delete synthRef.current[id]},300)
    }
  },[])

  const setAmbVol = useCallback((id:string,vol:number)=>{
    const s=(vol/100)*0.6
    if(html5Ref.current[id])html5Ref.current[id].volume=s
    if(synthRef.current[id]&&ctxRef.current)synthRef.current[id].gain.gain.setTargetAtTime(s,ctxRef.current.currentTime,0.05)
  },[])

  const initYT = useCallback((ytId:string,vol:number)=>{
    if(!ytRef.current)return
    // Destroy existing player and reset container before creating new one
    try{ytPlayer.current?.destroy()}catch(_){}
    ytPlayer.current=null
    ytRef.current.innerHTML=''
    const container=document.createElement('div')
    ytRef.current.appendChild(container)
    setYtStatus('loading')
    if(ytTimer.current)clearTimeout(ytTimer.current)
    ytTimer.current=setTimeout(()=>setYtStatus('blocked'),18000)
    const create=()=>{
      if(!container)return
      ytPlayer.current=new(window as any).YT.Player(container,{
        height:'180',width:'320',videoId:ytId,
        playerVars:{autoplay:1,controls:0,disablekb:1,playsinline:1,enablejsapi:1,origin:window.location.origin},
        events:{
          onReady:(e:any)=>{if(ytTimer.current)clearTimeout(ytTimer.current);setYtStatus('ready');e.target.setVolume(vol);e.target.playVideo()},
          onError:(e:any)=>{if(ytTimer.current)clearTimeout(ytTimer.current);console.warn('YT error code:',e.data);setYtStatus('blocked')},
        },
      })
    }
    if((window as any).YT?.Player){create()}
    else{const prev=(window as any).onYouTubeIframeAPIReady;(window as any).onYouTubeIframeAPIReady=()=>{prev?.();create()}}
  },[])

  const activeYtId = lofiId==='custom' ? customLofiId : (LOFI_STREAMS.find(s=>s.id===lofiId)?.youtubeId??'7NOSDKb0HlU')

  const doStart = useCallback(()=>{
    if(started)return
    const ctx=ensureCtx();ctx.resume().catch(()=>{})
    Object.entries(ambVols).forEach(([id,vol])=>startAmbient(id,vol))
    if(ytPlayer.current&&ytStatus==='ready'){
      try{ytPlayer.current.unMute();ytPlayer.current.setVolume(lofiVol);ytPlayer.current.playVideo()}catch(_){}
      if(ytTimer.current)clearTimeout(ytTimer.current)
    }else{
      initYT(activeYtId,lofiVol)
    }
    setStarted(true);setPlaying(true)
  },[started,ensureCtx,ambVols,lofiVol,startAmbient,initYT,activeYtId,ytStatus])

  const togglePlay = useCallback(()=>{
    if(!started){doStart();return}
    const next=!playing;setPlaying(next)
    if(next){
      ctxRef.current?.resume();ytPlayer.current?.playVideo()
      Object.keys(html5Ref.current).forEach(id=>html5Ref.current[id]?.play())
      const ctx=ctxRef.current
      if(ctx)Object.entries(synthRef.current).forEach(([id,n])=>n.gain.gain.setTargetAtTime((ambVols[id]??50)/100*0.6,ctx.currentTime,0.1))
    }else{
      try{ytPlayer.current?.pauseVideo()}catch(_){}
      Object.keys(html5Ref.current).forEach(id=>html5Ref.current[id]?.pause())
      const ctx=ctxRef.current
      if(ctx)Object.values(synthRef.current).forEach(n=>n.gain.gain.setTargetAtTime(0,ctx.currentTime,0.1))
    }
  },[started,playing,doStart,ambVols])

  const handleLofiVol=(v:number)=>{setLofiVol(v);if(started)try{ytPlayer.current?.setVolume(v)}catch(_){}}
  const handleLofiChange=(id:string)=>{
    setLofiId(id);try{ytPlayer.current?.destroy()}catch(_){}; ytPlayer.current=null
    if(started){const ytId=id==='custom'?customLofiId:(LOFI_STREAMS.find(s=>s.id===id)?.youtubeId??'7NOSDKb0HlU');setPlaying(true);setTimeout(()=>initYT(ytId,lofiVol),80)}
  }
  const applyCustomLofi=()=>{
    const id=parseYtId(customLofiInput);if(!id)return
    setCustomLofiId(id);setLofiId('custom')
    try{ytPlayer.current?.destroy()}catch(_){};ytPlayer.current=null
    if(started){setPlaying(true);setTimeout(()=>initYT(id,lofiVol),80)}
  }
  const dismissOnboard=()=>{
    setShowOnboard(false)
    localStorage.setItem('lofispace-onboarded','1')
  }
  const toggleAmbient=(id:string)=>{
    if(ambVols[id]!==undefined){if(started)stopAmbient(id);setAmbVols(prev=>{const n={...prev};delete n[id];return n})}
    else{if(started&&playing)startAmbient(id,50);setAmbVols(prev=>({...prev,[id]:50}))}
  }
  const handleAmbVol=(id:string,v:number)=>{setAmbVols(prev=>({...prev,[id]:v}));if(started)setAmbVol(id,v)}

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

  const saveCalFn=(cn:Record<string,{id:number;text:string}[]>)=>{try{localStorage.setItem('lofispace-calNotes',JSON.stringify(cn))}catch(_){}}
  const addCalNote=()=>{const t=calInput.trim();if(!t)return;const arr=[...(calNotes[calSelected]||[]),{id:Date.now(),text:t}];const cn={...calNotes,[calSelected]:arr};saveCalFn(cn);setCalNotes(cn);setCalInput('')}
  const delCalNote=(key:string,nid:number)=>{const arr=(calNotes[key]||[]).filter(x=>x.id!==nid);const cn={...calNotes,[key]:arr};if(!arr.length)delete cn[key];saveCalFn(cn);setCalNotes(cn)}

  useEffect(()=>()=>{
    Object.values(html5Ref.current).forEach(a=>{a.pause();a.src=''})
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
  const pad=(n:number)=>String(n).padStart(2,'0')
  const timeStr=mounted?`${pad(now.getHours())}:${pad(now.getMinutes())}`:'--:--'
  const secStr=mounted?pad(now.getSeconds()):'00'
  const dateStr=mounted
    ? lang==='vi'
      ? `${t.cal_days_long[now.getDay()]}, ${now.getDate()} tháng ${now.getMonth()+1}`
      : `${t.cal_days_long[now.getDay()]}, ${t.cal_months[now.getMonth()].slice(0,3)} ${now.getDate()}`
    : ''
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

  // On mobile, panel widths grow to near-full-viewport (see width:Math.min(N,vw-M) below),
  // so the desktop two-column left/right placement collides. Stack them in one column instead.
  const mobTop:Record<string,number>={}
  if(mob){
    let cursor=132
    if(showWx&&wxData){mobTop.wx=cursor;cursor+=92}
    if(showStreak){mobTop.streak=cursor;cursor+=196}
    if(showPom){mobTop.pom=cursor;cursor+=352}
    if(showNote){mobTop.note=cursor;cursor+=300}
  }

  return (
    <div style={{position:'fixed',inset:0,overflowY:mob?'auto':'hidden',overflowX:'hidden',WebkitOverflowScrolling:'touch',fontFamily:"'Outfit',system-ui,sans-serif",color:'var(--text,#f3f3f8)',userSelect:'none',...cssVars,['--accent' as any]:accent,['--accent2' as any]:accent2,['--accentSoft' as any]:accentSoft,['--accentGlow' as any]:accentGlow}}>

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
        ?<video ref={bgElRef as React.RefObject<HTMLVideoElement>} key={bgUrl} src={bgUrl} autoPlay loop muted playsInline preload="auto" aria-hidden
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
        <div style={{position:'fixed',top:20,left:'50%',transform:'translateX(-50%)',zIndex:6,display:'flex',alignItems:'center',gap:8,padding:'8px 14px',borderRadius:999,background:'rgba(0,0,0,.5)',backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',color:'#fff',fontSize:12,fontWeight:600,pointerEvents:'none'}}>
          <span style={{width:13,height:13,borderRadius:'50%',border:'2px solid rgba(255,255,255,.3)',borderTopColor:'#fff',animation:'spin .8s linear infinite'}}/>
          {t.bg_loading}
        </div>
      )}

      {/* ── Clock (draggable, top-left) ── */}
      {showClock&&(
        <div {...clockDrag.dp} style={{...wStyle(clockDrag,{left:36,top:30}),zIndex:5,cursor:'grab',position:'absolute'}}>
          <div style={{position:'relative'}}>
            <button onPointerDown={e=>e.stopPropagation()} onClick={()=>setShowClock(false)} style={{position:'absolute',top:-8,right:-10,width:20,height:20,display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid rgba(255,255,255,.18)',borderRadius:'50%',background:'rgba(0,0,0,.45)',color:'rgba(255,255,255,.7)',cursor:'pointer',fontSize:11,lineHeight:1,zIndex:1,padding:0}}>×</button>
            {clockStyle==='analog'
              ?<AnalogClock now={now} size={110} accent={accent}/>
              :clockStyle==='minimal'
              ?<div style={{fontFamily:"'SF Mono',monospace",fontWeight:200,fontSize:'clamp(15px,3.5vw,24px)',letterSpacing:'0.12em',opacity:.8,textShadow:'0 1px 10px rgba(0,0,0,.9)'}}>{timeStr}</div>
              :clockStyle==='bold'
              ?<div style={{fontFamily:'system-ui,sans-serif',fontWeight:900,fontSize:'clamp(46px,12vw,90px)',lineHeight:.9,letterSpacing:'-0.03em',textShadow:'0 4px 28px rgba(0,0,0,.5)'}}>{timeStr}</div>
              :<div>
                <div style={{display:'flex',alignItems:'baseline',gap:8}}>
                  <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:'clamp(34px,10vw,74px)',lineHeight:.9,letterSpacing:-2,textShadow:'0 3px 22px rgba(0,0,0,.45)'}}>{timeStr}</span>
                  <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,fontSize:'clamp(14px,4vw,24px)',color:accent,textShadow:'0 2px 14px rgba(0,0,0,.4)'}}>{secStr}</span>
                </div>
                <div style={{marginTop:4,fontSize:14,fontWeight:500,letterSpacing:.3,opacity:.92,textShadow:'0 2px 10px rgba(0,0,0,.5)',textTransform:'capitalize'}}>{dateStr}</div>
              </div>
            }
          </div>
        </div>
      )}

      {/* Theme (Glass/Warm) is still switchable from the round icon button in the dock below —
          the top-center pill selector was removed since /embed permanently redirects to
          /workspace (see next.config.ts), so this is the only surface the app ever renders on. */}

      {/* ── Pomodoro panel (draggable, top-right) ── */}
      {showPom&&(
        <div style={{...wStyle(pomDrag,mob?{left:16,top:mobTop.pom}:{right:32,top:96}),zIndex:5,width:Math.min(236,vw-48),padding:'20px 20px 22px',...glassPanel,borderRadius:20,boxShadow:'0 18px 50px rgba(0,0,0,.38)'}}>
          <div {...pomDrag.dp} style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14,cursor:'grab'}}>
            <span style={{fontSize:11,fontWeight:600,letterSpacing:1.4,textTransform:'uppercase',color:'var(--dim)'}}>Pomodoro</span>
            <button onPointerDown={e=>e.stopPropagation()} onClick={()=>setShowPom(false)} style={{display:'flex',width:24,height:24,alignItems:'center',justifyContent:'center',border:'none',background:'transparent',color:'var(--dim)',borderRadius:7,cursor:'pointer'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div style={{display:'flex',gap:5,marginBottom:16}}>
            <button onClick={()=>pom.phase!=='work'&&pom.setMode('work')} style={seg(pom.phase==='work')}>{t.pom_focus}</button>
            <button onClick={()=>pom.phase!=='break'&&pom.setMode('break')} style={seg(pom.phase==='break')}>{t.pom_break}</button>
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
              <span style={{fontSize:11,fontWeight:500,letterSpacing:1,textTransform:'uppercase',color:'var(--dim)'}}>{pom.phase==='work'?t.pom_phase_focus:t.pom_phase_break}</span>
            </div>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button onClick={pom.toggle} style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:7,padding:11,border:'none',borderRadius:12,background:accent,color:'#16121f',fontWeight:600,fontSize:14,cursor:'pointer',boxShadow:`0 6px 18px ${accentGlow}`}}>
              {pom.on
                ?<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
                :<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5v14l12-7z"/></svg>}
              {pom.on?t.pom_pause:t.pom_start}
            </button>
            <button onClick={pom.reset} style={{display:'flex',width:42,alignItems:'center',justifyContent:'center',border:'1px solid var(--border)',borderRadius:12,background:'var(--input)',color:'var(--text)',cursor:'pointer'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Weather (draggable) ── */}
      {showWx&&wxData&&(
        <div {...wxDrag.dp} style={{...wStyle(wxDrag,mob?{left:16,top:mobTop.wx}:{left:20,top:showClock&&clockStyle==='digital'?130:80}),cursor:'grab',zIndex:20,minWidth:160}}>
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
      {showStreak&&(
        <div style={{...wStyle(progressDrag,mob?{left:16,top:mobTop.streak}:{left:20,top:showWx&&wxData?290:showClock&&clockStyle==='digital'?172:90}),zIndex:5,width:Math.min(244,vw-40),padding:16,borderRadius:18,background:'rgba(26,23,44,0.55)',backdropFilter:'blur(18px)',WebkitBackdropFilter:'blur(18px)',border:'1px solid rgba(255,255,255,0.10)',color:'#fff',boxShadow:'0 14px 40px rgba(0,0,0,.34)'}}>
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
      {showNote&&(
        <div style={{position:'absolute',zIndex:5,width:Math.min(264,vw-48),touchAction:'none',userSelect:'none',...(noteDrag.pos?{left:noteDrag.pos.x,top:noteDrag.pos.y}:mob?{left:16,top:mobTop.note}:{right:32,bottom:118}),...glassPanel,borderRadius:20,boxShadow:'0 18px 50px rgba(0,0,0,.38)',overflow:'hidden'}}>
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
      {panel&&(
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
                      </div>
                    )
                  })}
                  {lofiId==='custom'&&(
                    <div style={{display:'flex',alignItems:'center',gap:11,padding:'11px 13px',borderRadius:12,border:`1px solid ${accentSoft}`,background:accentSoft}}>
                      <span style={{width:8,height:8,borderRadius:'50%',background:accent2,flexShrink:0,boxShadow:`0 0 8px ${accent2}`}}/>
                      <span style={{fontSize:14,fontWeight:600,flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.music_custom_yt}: {customLofiId}</span>
                      {ytStatus==='ready'&&<span style={{fontSize:11,fontWeight:600,color:accent2}}>LIVE</span>}
                    </div>
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
                  {([['widgets',t.more_widgets],['weather',t.more_weather],['pet',t.more_pet],['progress',t.more_xp],['share',t.more_share]] as [MoreTab,string][]).map(([id,label])=>(
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

                {/* Pet */}
                {moreTab==='pet'&&(
                  <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:14,padding:'8px 0'}}>
                    <div style={{background:'var(--input)',border:'1px solid var(--border)',borderRadius:16,padding:'18px 28px',display:'flex',flexDirection:'column',alignItems:'center',gap:10}}>
                      <CodingCatVariant variant={catVariant} size={90}/>
                      <span style={{fontSize:10,color:'var(--dim2)'}}>{pom.on ? pom.phase==='work' ? t.pet_focused : t.pet_break : '(=^･ω･^=)'}</span>
                      <div style={{display:'flex',gap:14,fontSize:12,color:'var(--dim)'}}>
                        <span>🔥 {streak} {t.progress_days}</span>
                        <span>Lv.{level}</span>
                        <span>🪙 {coins}</span>
                      </div>
                      {(()=>{const xp2=xpProgress(xp,level);return(
                        <div style={{width:'100%',maxWidth:160}}>
                          <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:'var(--dim2)',marginBottom:4}}>
                            <span>XP {xp2.current}/{xp2.max}</span><span>{Math.round(xp2.pct)}%</span>
                          </div>
                          <div style={{height:4,background:'var(--track)',borderRadius:2,overflow:'hidden'}}>
                            <div style={{height:'100%',width:`${xp2.pct}%`,background:accent,borderRadius:2,transition:'width .4s'}}/>
                          </div>
                        </div>
                      )})()}
                    </div>
                    <div style={{fontSize:10,fontWeight:600,letterSpacing:1.2,textTransform:'uppercase',color:'var(--dim2)',marginBottom:8,marginTop:4}}>{t.pet_choose}</div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:10}}>
                      {(['typist','mouse','beanie','wizard'] as CatVariant[]).map(v=>{
                        const meta=CAT_VARIANT_META[v]
                        const active=companionType==='coding'&&catVariant===v
                        return(
                          <button key={v} onClick={()=>{setCatVariant(v);setCompanionType('coding')}} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6,padding:'10px 8px',border:`1px solid ${active?accent:'var(--border)'}`,borderRadius:14,background:active?accentSoft:'var(--input)',cursor:'pointer',transition:'all .16s ease',fontFamily:'inherit'}}>
                            <CodingCatVariant variant={v} size={72}/>
                            <span style={{fontSize:11,fontWeight:700,color:active?accent:'var(--text)'}}>{meta.label}</span>
                            <span style={{fontSize:9,color:'var(--dim2)',textAlign:'center',lineHeight:1.4}}>{meta.desc}</span>
                          </button>
                        )
                      })}
                    </div>
                    <button onClick={()=>setCompanionType(companionType==='coding'?'none':'coding')} style={{width:'100%',padding:'10px 0',borderRadius:12,border:`1px solid ${companionType==='coding'?accentSoft:'var(--border)'}`,background:companionType==='coding'?accentSoft:'transparent',color:companionType==='coding'?accent:'var(--dim)',fontSize:13,fontWeight:600,cursor:'pointer',transition:'all .2s',fontFamily:'inherit'}}>
                      {companionType==='coding'?t.pet_hide:t.pet_show}
                    </button>
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
      {openPopover==='youtube'&&(
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
          {ytStatus==='blocked'&&<p style={{fontSize:10,color:'#f97316',marginTop:8,lineHeight:1.5,background:'rgba(249,115,22,0.1)',padding:'6px 8px',borderRadius:6}}>{t.music_yt_blocked}</p>}
        </div>
      )}

      {/* ── Background ("Nền") popover — presets, custom GIF/YouTube background, atmosphere, opacity, blur ── */}
      {openPopover==='background'&&(
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
                <button key={g.id} onClick={()=>{setBgUrl(g.url);setBgType(bgTypeFromUrl(g.url))}} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:5,padding:'14px 8px',border:`1px solid ${bgUrl===g.url&&bgType!=='youtube'?accent:'var(--border)'}`,borderRadius:14,background:bgUrl===g.url&&bgType!=='youtube'?accentSoft:'var(--input)',color:'var(--text)',cursor:'pointer',transition:'all .16s ease'}}>
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

      {/* ── Companion (draggable) ── */}
      {companionType==='coding'&&(
        <div
          {...catDrag.dp}
          style={{...wStyle(catDrag,mob?{right:12,bottom:76}:{left:32,bottom:88}),zIndex:5,cursor:'grab',lineHeight:0}}
          onMouseEnter={()=>setCatHovered(true)}
          onMouseLeave={()=>setCatHovered(false)}
        >
          <CodingCatVariant variant={catVariant} size={mob?Math.min(catSize,100):catSize} accent={accent}/>

          {catHovered&&(
            <>
              {/* Close — top right */}
              <button
                onPointerDown={e=>e.stopPropagation()}
                onClick={()=>setCompanionType('none')}
                title={t.pet_hide_btn}
                style={{position:'absolute',top:6,right:6,width:22,height:22,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'50%',border:'1px solid rgba(255,255,255,.25)',background:'rgba(0,0,0,.58)',backdropFilter:'blur(4px)',color:'rgba(255,255,255,.9)',cursor:'pointer',fontSize:13,lineHeight:1,padding:0,zIndex:2}}
              >×</button>

              {/* Size controls — bottom right, pill stacked */}
              <div
                onPointerDown={e=>e.stopPropagation()}
                style={{position:'absolute',bottom:10,right:6,display:'flex',flexDirection:'column',gap:3,zIndex:2}}
              >
                {[
                  {label:'+',title:t.pet_enlarge, action:()=>setCatSize(s=>Math.min(280,s+20))},
                  {label:'−',title:t.pet_shrink,  action:()=>setCatSize(s=>Math.max(80, s-20))},
                ].map(({label,title,action})=>(
                  <button key={label} onClick={action} title={title}
                    style={{width:22,height:22,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:7,border:'1px solid rgba(255,255,255,.22)',background:'rgba(0,0,0,.55)',backdropFilter:'blur(4px)',color:'rgba(255,255,255,.85)',cursor:'pointer',fontSize:15,fontWeight:700,lineHeight:1,padding:0,fontFamily:'inherit'}}
                  >{label}</button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Day/Night badge ── */}
      {mounted&&!started&&(
        <div style={{position:'absolute',top:14,right:14,background:'rgba(0,0,0,0.55)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:20,padding:'4px 10px',display:'flex',alignItems:'center',gap:5,zIndex:5,pointerEvents:'none',animation:'dnFade 4s ease forwards'}}>
          <span style={{fontSize:13}}>{dn.emoji}</span>
          <span style={{fontSize:10,color:'rgba(255,255,255,0.5)'}}>{t.dn_labels[dn.period]||dn.label}</span>
        </div>
      )}

      {/* ── Click to start ── */}
      {!started&&(
        <div onClick={doStart} style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14,background:'rgba(0,0,0,0.38)',backdropFilter:'blur(4px)',cursor:'pointer',zIndex:10}}>
          <div style={{width:68,height:68,borderRadius:'50%',background:accent,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 0 40px ${accentGlow}`}}>
            <svg viewBox="0 0 24 24" fill="white" width="30" height="30"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <p style={{fontSize:13,color:'rgba(255,255,255,0.75)',letterSpacing:'0.04em',margin:0}}>{t.click_to_start}</p>
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
                const todayKey=`${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`
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
                    {(()=>{const p=calSelected.split('-').map(Number);const d=new Date(p[0],p[1],p[2]);if(isNaN(d.getTime()))return'—';return lang==='vi'?`${p[2]} thg ${p[1]+1}`:`${t.cal_months[p[1]].slice(0,3)} ${p[2]}`})()}
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
      <div className="lf-dock" style={{position:'fixed',left:'50%',bottom:mob?12:28,transform:'translateX(-50%)',zIndex:7,maxWidth:'calc(100vw - 16px)',overflowX:'auto',borderRadius:999,...glassPanel,boxShadow:'0 16px 44px rgba(0,0,0,.4)'}}>
      <div style={{display:'flex',alignItems:'center',gap:mob?3:6,padding:mob?5:7,width:'max-content'}}>

        {/* Play/Pause */}
        <button onClick={togglePlay} style={{display:'flex',width:mob?40:48,height:mob?40:48,flexShrink:0,alignItems:'center',justifyContent:'center',border:'none',borderRadius:'50%',background:accent,color:'#16121f',cursor:'pointer',boxShadow:`0 6px 18px ${accentGlow}`}}>
          {started&&playing
            ?<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
            :<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5v14l12-7z"/></svg>}
        </button>

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

        <a href="/blog" target="_blank" rel="noopener noreferrer" style={{...chip(false),position:'relative',textDecoration:'none'}} title="Blog">
          <svg width={mob?16:18} height={mob?16:18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span style={{fontSize:mob?9.5:11,fontWeight:600,whiteSpace:'nowrap'}}>Blog</span>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{position:'absolute',right:5,top:5,opacity:.6}}><path d="M7 17L17 7M9 7h8v8"/></svg>
        </a>

        <div style={divider}/>

        {/* Utility cluster */}
        <div style={{display:'flex',alignItems:'center',gap:1}}>
          <button onClick={handleShare} style={{...dockBtn(copied),flexShrink:0}} title={t.share_copy}>
            {copied
              ?<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              :<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/></svg>}
          </button>

          <button onClick={()=>setTheme(th=>th==='glass'?'warm':'glass')} style={{display:'flex',width:dbSz,height:dbSz,flexShrink:0,alignItems:'center',justifyContent:'center',border:'none',borderRadius:'50%',background:'transparent',color:'var(--dim)',cursor:'pointer'}} title={t.switch_theme}>
            {theme==='glass'
              ?<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
              :<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8"/></svg>}
          </button>

          <div style={{display:'flex',gap:2,padding:'0 2px',flexShrink:0}}>
            {(['en','vi'] as const).map(l=>(
              <button key={l} onClick={()=>setLang(l)} style={{display:'flex',height:dbSz,padding:'0 8px',alignItems:'center',justifyContent:'center',border:'none',borderRadius:8,cursor:'pointer',transition:'all .16s ease',fontSize:11,fontWeight:700,letterSpacing:.5,
                background:lang===l?accentSoft:'transparent',color:lang===l?accent:'var(--dim)'}}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button onClick={()=>setShowSupport(true)} style={{...dockBtn(false),flexShrink:0,color:'#f472b6'}} title="Support LofiSpace 💜">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>

          <button onClick={toggleFullscreen} style={{...dockBtn(isFullscreen),flexShrink:0}} title={isFullscreen?'Exit Fullscreen':'Fullscreen (F)'}>
            {isFullscreen
              ?<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 0 2 2v3M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
              :<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>}
          </button>
        </div>
      </div>{/* end inner flex */}
      </div>{/* end dock */}

      {/* ── Branding ── */}
      <a href="/" target="_blank" rel="noopener noreferrer" style={{position:'fixed',bottom:5,right:10,fontSize:9,color:'rgba(255,255,255,0.18)',textDecoration:'none',zIndex:5}}>
        Powered by LofiSpace
      </a>

      {/* ── Hidden YT player — off-screen (opacity:0 causes Chrome to pause media) ── */}
      <div style={{position:'fixed',left:'-400px',top:0,width:'320px',height:'180px',pointerEvents:'none'}}><div ref={ytRef}/></div>

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

      {/* ── Game notifications ── */}
      {pendingAchievements.length>0&&(
        <AchievementToast key={pendingAchievements[0]} achievementId={pendingAchievements[0]} onDismiss={dismissAchievement} accent={accent}/>
      )}
      {newLevelReached&&(
        <LevelUpOverlay key={newLevelReached} level={newLevelReached} onDismiss={dismissLevelUp} accent={accent}/>
      )}

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
        @media (max-width:639px){.lf-dock{mask-image:linear-gradient(to right,#000 calc(100% - 28px),transparent);-webkit-mask-image:linear-gradient(to right,#000 calc(100% - 28px),transparent)}}
      `}</style>
    </div>
  )
}
