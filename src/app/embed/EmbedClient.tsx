'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { getDayNightConfig } from '@/hooks/useDayNight'
import { KawaiiCat, CatSVG } from '@/components/widget/KawaiiCat'
import { LOFI_STREAMS, AMBIENT_SOUNDS } from '@/lib/lofiStreams'
import { BG_PRESETS } from '@/lib/backgrounds'

const WMO: Record<number,string> = {
  0:'Trời quang',1:'Ít mây',2:'Có mây',3:'Nhiều mây',
  45:'Sương mù',48:'Sương đá',51:'Mưa phùn nhẹ',53:'Mưa phùn',55:'Mưa phùn nặng',
  61:'Mưa nhẹ',63:'Mưa vừa',65:'Mưa to',71:'Tuyết nhẹ',73:'Tuyết vừa',75:'Tuyết to',
  80:'Mưa rào nhẹ',81:'Mưa rào',82:'Mưa rào nặng',95:'Giông bão',96:'Giông mưa đá',99:'Giông to',
}

// ─── Types ─────────────────────────────────────────────────────────────
type ClockStyle = 'digital'|'minimal'|'bold'|'analog'
type BgType = 'gif'|'youtube'
type PanelTab = 'lofi'|'ambient'|'bg'|'widgets'|'weather'|'share'|'pet'
interface Todo { id:string; text:string; done:boolean }
interface WxData { city:string; temp:number; code:number; desc:string; emoji:string; feels:number|null; humidity:number|null; wind:number|null }

// ─── Utilities ─────────────────────────────────────────────────────────
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

// ─── useDraggable ──────────────────────────────────────────────────────
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
    d.current = {on:true, ox:e.clientX-cx, oy:e.clientY-cy, sx:e.clientX, sy:e.clientY}
    if (!posRef.current) setPos({x:rect.left, y:rect.top})
    el.setPointerCapture(e.pointerId)
    e.stopPropagation()
  },[])

  const onPointerMove = useCallback((e:React.PointerEvent)=>{
    if (!d.current.on) return
    if (Math.abs(e.clientX-d.current.sx)+Math.abs(e.clientY-d.current.sy)<4) return
    setPos({x:e.clientX-d.current.ox, y:e.clientY-d.current.oy})
    e.stopPropagation()
  },[])

  const onPointerUp = useCallback(()=>{ d.current.on=false },[])
  const reset = useCallback(()=>{ setPos(null); posRef.current=null },[])

  return { pos, reset, dp:{onPointerDown,onPointerMove,onPointerUp} }
}

// ─── Pink Noise ─────────────────────────────────────────────────────────
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

// ─── Pomodoro ──────────────────────────────────────────────────────────
function usePomodoro(){
  const[phase,setPhase]=useState<'work'|'break'>('work')
  const[secs,setSecs]=useState(25*60)
  const[on,setOn]=useState(false)
  const total=phase==='work'?25*60:5*60
  useEffect(()=>{
    if(!on)return
    const id=setInterval(()=>setSecs(s=>{if(s<=1){setPhase(p=>p==='work'?'break':'work');return phase==='work'?5*60:25*60}return s-1}),1000)
    return()=>clearInterval(id)
  },[on,phase])
  return{mm:String(Math.floor(secs/60)).padStart(2,'0'),ss:String(secs%60).padStart(2,'0'),on,toggle:()=>setOn(v=>!v),phase,progress:secs/total,reset:()=>{setOn(false);setPhase('work');setSecs(25*60)}}
}

// ─── Analog Clock ──────────────────────────────────────────────────────
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

// ─── Clock Renderer ────────────────────────────────────────────────────
function ClockWidget({now,style,mounted,accent}:{now:Date;style:ClockStyle;mounted:boolean;accent:string}){
  const hm=mounted?now.toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'}):'--:--'
  const date=mounted?now.toLocaleDateString('vi-VN',{weekday:'short',day:'numeric',month:'short'}):''
  if(style==='analog') return <AnalogClock now={now} size={100} accent={accent}/>
  if(style==='minimal') return(
    <div style={{fontFamily:"'SF Mono',monospace",fontWeight:200,fontSize:'clamp(15px,3.5vw,24px)',letterSpacing:'0.12em',opacity:0.8,textShadow:'0 1px 10px rgba(0,0,0,0.9)'}}>
      {hm}
    </div>
  )
  if(style==='bold') return(
    <div style={{fontFamily:"system-ui,sans-serif",fontWeight:900,fontSize:'clamp(46px,12vw,90px)',lineHeight:0.9,letterSpacing:'-0.03em',textShadow:'0 4px 28px rgba(0,0,0,0.5)'}}>
      {hm}
    </div>
  )
  return(
    <div style={{textShadow:'0 2px 18px rgba(0,0,0,0.8)'}}>
      <div style={{fontFamily:"'SF Mono',monospace",fontWeight:300,fontSize:'clamp(28px,7vw,50px)',letterSpacing:'0.03em',lineHeight:1}}>{hm}</div>
      {date&&<div style={{fontSize:'clamp(10px,1.8vw,13px)',color:'rgba(255,255,255,0.38)',marginTop:3,letterSpacing:'0.07em'}}>{date}</div>}
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────
export function EmbedClient() {
  const sp = useSearchParams()

  // Day/Night auto-config (used as defaults when no URL params)
  const dn = getDayNightConfig()
  const hasBgParam = sp.has('bgv')

  // URL initial values — fall back to day/night defaults when freshly opened
  const initBgUrl  = hasBgParam
    ? decodeURIComponent(sp.get('bgv')!)
    : dn.bgUrl
  const initBgOp   = Math.min(90, Math.max(0, parseInt(sp.get('bgo') ?? String(dn.overlay))))
  const initBlur   = Math.min(20, Math.max(0, parseInt(sp.get('bl') ?? '0')))
  const accent     = '#' + (sp.get('ac') ?? dn.accent.replace('#', ''))
  const urlWx:WxData|null = (sp.get('city')&&sp.get('temp'))
    ? {city:sp.get('city')!,temp:parseInt(sp.get('temp')!),code:0,desc:sp.get('wdesc')??'',emoji:sp.get('wemoji')??'🌤️',feels:null,humidity:null,wind:null}
    : null

  // Background
  const [bgType,    setBgType]    = useState<BgType>('gif')
  const [bgUrl,     setBgUrl]     = useState(initBgUrl)
  const [bgOpacity, setBgOpacity] = useState(initBgOp)
  const [bgBlur,    setBgBlur]    = useState(initBlur)
  const [bgYtInput, setBgYtInput] = useState('')
  const [bgYtId,    setBgYtId]    = useState('')

  // Clock
  const [showClock,  setShowClock]  = useState(sp.get('clk')!=='0')
  const [clockStyle, setClockStyle] = useState<ClockStyle>('digital')
  const clockDrag = useDraggable()

  // Weather
  const [showWx,   setShowWx]   = useState(!!urlWx)
  const [wxState,  setWxState]  = useState<'idle'|'loading'|'done'|'error'>('idle')
  const [wxData,   setWxData]   = useState<WxData|null>(urlWx)
  const wxDrag = useDraggable()

  // Pomodoro
  const [showPom, setShowPom] = useState(sp.get('pom')==='1')
  const pomDrag = useDraggable()
  const pom = usePomodoro()

  // Note / Todo
  const [showNote,   setShowNote]   = useState(false)
  const [todos,      setTodos]      = useState<Todo[]>([])
  const [todoInput,  setTodoInput]  = useState('')
  const noteDrag = useDraggable()

  // Pixel Pet
  const [showPet, setShowPet] = useState(false)

  // Audio — use day/night lofi defaults when no URL param
  const [lofiId,   setLofiId]   = useState(sp.get('ls') ?? dn.lofiId)
  const [lofiVol,  setLofiVol]  = useState(Math.min(100, Math.max(0, parseInt(sp.get('lv') ?? '60'))))
  const [ambVols,  setAmbVols]  = useState<Record<string,number>>(() => {
    const at = sp.get('at') ?? ''
    if (at) return Object.fromEntries(at.split(',').flatMap(e => { const [id,v]=e.split(':'); return id ? [[id,Math.min(100,Math.max(0,parseInt(v)||50))]] : [] }))
    // No URL params — use day/night ambient defaults
    if (!hasBgParam) return Object.fromEntries(Object.entries(dn.ambVols).map(([id,v])=>[id,v]))
    return {}
  })
  const [customLofiInput, setCustomLofiInput] = useState('')
  const [customLofiId,    setCustomLofiId]    = useState('')

  // UI
  const [started,  setStarted]  = useState(false)
  const [playing,  setPlaying]  = useState(false)
  const [panel,    setPanel]    = useState(false)
  const [panelTab, setPanelTab] = useState<PanelTab>('lofi')
  const [now,      setNow]      = useState(new Date())
  const [mounted,  setMounted]  = useState(false)
  const [ytStatus, setYtStatus] = useState<'idle'|'loading'|'ready'|'blocked'>('idle')
  const [customBg, setCustomBg] = useState('')
  const [copied,   setCopied]   = useState(false)

  // Refs
  const ctxRef     = useRef<AudioContext|null>(null)
  const synthRef   = useRef<Record<string,SynthNode>>({})
  const html5Ref   = useRef<Record<string,HTMLAudioElement>>({})
  const ytRef      = useRef<HTMLDivElement>(null)
  const ytPlayer   = useRef<any>(null)
  const ytTimer    = useRef<ReturnType<typeof setTimeout>|null>(null)
  const noteTimer  = useRef<ReturnType<typeof setTimeout>|null>(null)

  // Init
  useEffect(()=>{ setMounted(true) },[])
  useEffect(()=>{
    if(typeof window!=='undefined'){
      try{ const t=JSON.parse(localStorage.getItem('lofispace-todos')||'[]'); setTodos(t) }catch(_){}
    }
  },[])
  useEffect(()=>{ const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t) },[])
  useEffect(()=>{
    if(typeof window==='undefined'||document.getElementById('yt-api'))return
    const s=document.createElement('script');s.id='yt-api';s.src='https://www.youtube.com/iframe_api';s.async=true
    document.head.appendChild(s)
  },[])

  // Audio
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
    setYtStatus('loading')
    if(ytTimer.current)clearTimeout(ytTimer.current)
    ytTimer.current=setTimeout(()=>setYtStatus('blocked'),10000)
    const create=()=>{
      if(!ytRef.current)return
      ytPlayer.current=new(window as any).YT.Player(ytRef.current,{
        height:'1',width:'1',videoId:ytId,
        playerVars:{autoplay:1,controls:0,disablekb:1,playsinline:1},
        events:{
          onReady:(e:any)=>{if(ytTimer.current)clearTimeout(ytTimer.current);setYtStatus('ready');e.target.setVolume(vol);e.target.playVideo()},
          onError:()=>{if(ytTimer.current)clearTimeout(ytTimer.current);setYtStatus('blocked')},
        },
      })
    }
    if((window as any).YT?.Player){create()}
    else{const prev=(window as any).onYouTubeIframeAPIReady;(window as any).onYouTubeIframeAPIReady=()=>{prev?.();create()}}
  },[])

  const activeYtId = lofiId==='custom' ? customLofiId : (LOFI_STREAMS.find(s=>s.id===lofiId)?.youtubeId??'jfKfPfyJRdk')

  const doStart = useCallback(()=>{
    if(started)return
    const ctx=ensureCtx();ctx.resume().catch(()=>{})
    Object.entries(ambVols).forEach(([id,vol])=>startAmbient(id,vol))
    initYT(activeYtId,lofiVol)
    setStarted(true);setPlaying(true)
  },[started,ensureCtx,ambVols,lofiVol,startAmbient,initYT,activeYtId])

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

  const handleLofiVol=(v:number)=>{setLofiVol(v);ytPlayer.current?.setVolume(v)}
  const handleLofiChange=(id:string)=>{
    setLofiId(id);try{ytPlayer.current?.destroy()}catch(_){}; ytPlayer.current=null
    if(started&&playing){const ytId=id==='custom'?customLofiId:(LOFI_STREAMS.find(s=>s.id===id)?.youtubeId??'jfKfPfyJRdk');setTimeout(()=>initYT(ytId,lofiVol),80)}
  }
  const applyCustomLofi=()=>{
    const id=parseYtId(customLofiInput);if(!id)return
    setCustomLofiId(id);setLofiId('custom')
    try{ytPlayer.current?.destroy()}catch(_){};ytPlayer.current=null
    if(started&&playing)setTimeout(()=>initYT(id,lofiVol),80)
  }

  const toggleAmbient=(id:string)=>{
    if(ambVols[id]!==undefined){if(started)stopAmbient(id);setAmbVols(prev=>{const n={...prev};delete n[id];return n})}
    else{if(started&&playing)startAmbient(id,50);setAmbVols(prev=>({...prev,[id]:50}))}
  }
  const handleAmbVol=(id:string,v:number)=>{setAmbVols(prev=>({...prev,[id]:v}));if(started)setAmbVol(id,v)}

  // Todos
  const saveTodos=(list:Todo[])=>{
    setTodos(list)
    if(noteTimer.current)clearTimeout(noteTimer.current)
    noteTimer.current=setTimeout(()=>localStorage.setItem('lofispace-todos',JSON.stringify(list)),500)
  }
  const addTodo=()=>{if(!todoInput.trim())return;saveTodos([...todos,{id:Date.now().toString(),text:todoInput.trim(),done:false}]);setTodoInput('')}
  const toggleTodo=(id:string)=>saveTodos(todos.map(t=>t.id===id?{...t,done:!t.done}:t))
  const removeTodo=(id:string)=>saveTodos(todos.filter(t=>t.id!==id))

  // Weather
  const detectWeather=useCallback(async()=>{
    setWxState('loading')
    try{
      const pos=await new Promise<GeolocationPosition>((res,rej)=>navigator.geolocation.getCurrentPosition(res,rej,{timeout:8000}))
      const{latitude:lat,longitude:lon}=pos.coords
      const[wRes,gRes]=await Promise.all([
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m&timezone=auto`),
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=vi`),
      ])
      const wj=await wRes.json(),gj=await gRes.json()
      const code:number=wj.current.weather_code
      const temp=Math.round(wj.current.temperature_2m)
      const feels=Math.round(wj.current.apparent_temperature)
      const humidity=Math.round(wj.current.relative_humidity_2m)
      const wind=Math.round(wj.current.wind_speed_10m)
      const city:string=gj.address?.city||gj.address?.town||gj.address?.state||'Vị trí của bạn'
      setWxData({city,temp,code,desc:WMO[code]??'Thời tiết đặc biệt',emoji:wxEmoji(code),feels,humidity,wind})
      setWxState('done');setShowWx(true)
    }catch(_){setWxState('error')}
  },[])

  // Share URL
  const shareUrl=useMemo(()=>{
    if(!mounted)return''
    const p=new URLSearchParams()
    p.set('bgv',encodeURIComponent(bgUrl));p.set('bgo',String(bgOpacity))
    if(bgBlur>0)p.set('bl',String(bgBlur))
    p.set('ls',lofiId);p.set('lv',String(lofiVol));p.set('ac',accent.slice(1))
    p.set('clk',showClock?'1':'0');p.set('pom',showPom?'1':'0')
    const at=Object.entries(ambVols).map(([id,v])=>`${id}:${v}`).join(',');if(at)p.set('at',at)
    if(wxData){p.set('city',wxData.city);p.set('temp',String(wxData.temp));p.set('wdesc',wxData.desc);p.set('wemoji',wxData.emoji)}
    return`${window.location.origin}/embed?${p.toString()}`
  },[mounted,bgUrl,bgOpacity,bgBlur,lofiId,lofiVol,accent,showClock,showPom,ambVols,wxData])

  const handleShare=async()=>{try{await navigator.clipboard.writeText(shareUrl);setCopied(true);setTimeout(()=>setCopied(false),2000)}catch(_){}}

  // Cleanup
  useEffect(()=>()=>{
    Object.values(html5Ref.current).forEach(a=>{a.pause();a.src=''})
    Object.values(synthRef.current).forEach(n=>n.stop())
    ctxRef.current?.close();try{ytPlayer.current?.destroy()}catch(_){}
    if(ytTimer.current)clearTimeout(ytTimer.current)
    if(noteTimer.current)clearTimeout(noteTimer.current)
  },[])

  const timeStr=mounted?now.toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'}):'--:--'
  const pomCirc=2*Math.PI*18
  const ambCount=Object.keys(ambVols).length
  const doneTodos=todos.filter(t=>t.done).length

  const TABS:{id:PanelTab;icon:string}[]=[
    {id:'lofi',icon:'🎵'},{id:'ambient',icon:'🎚️'},{id:'bg',icon:'🖼️'},
    {id:'widgets',icon:'🧩'},{id:'weather',icon:'🌤️'},{id:'pet',icon:'🐱'},{id:'share',icon:'🔗'},
  ]

  // Draggable widget style helpers
  const wStyle=(drag:{pos:{x:number;y:number}|null},def:React.CSSProperties):React.CSSProperties=>({
    position:'absolute', touchAction:'none', userSelect:'none',
    ...(drag.pos ? {left:drag.pos.x,top:drag.pos.y} : def),
  })

  return (
    <div style={{position:'fixed',inset:0,overflow:'hidden',fontFamily:"'Inter',system-ui,sans-serif",color:'#fff'}}>

      {/* ── Background ── */}
      {bgType==='gif'
        ? <img src={bgUrl} alt="" aria-hidden style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/> // eslint-disable-line @next/next/no-img-element
        : <iframe src={`https://www.youtube-nocookie.com/embed/${bgYtId}?autoplay=1&mute=1&loop=1&playlist=${bgYtId}&controls=0&playsinline=1&rel=0`}
            style={{position:'absolute',inset:'-10%',width:'120%',height:'120%',border:'none',pointerEvents:'none'}} allow="autoplay" />
      }
      <div style={{position:'absolute',inset:0,background:'#000',opacity:bgOpacity/100}}/>
      {bgBlur>0&&<div style={{position:'absolute',inset:0,backdropFilter:`blur(${bgBlur}px)`}}/>}

      {/* ── Clock (draggable) ── */}
      {showClock&&(
        <div {...clockDrag.dp} style={{...wStyle(clockDrag,{left:20,top:18}),cursor:'grab',zIndex:20}}>
          <ClockWidget now={now} style={clockStyle} mounted={mounted} accent={accent}/>
          <div style={{position:'absolute',top:-2,right:-18,fontSize:8,color:'rgba(255,255,255,0.2)',cursor:'grab'}}>⠿</div>
        </div>
      )}

      {/* ── Weather (draggable) ── */}
      {showWx&&wxData&&(
        <div {...wxDrag.dp} style={{...wStyle(wxDrag,{left:20,top:showClock?80:18}),cursor:'grab',zIndex:20,minWidth:140}}>
          <div style={{display:'flex',flexDirection:'column',gap:3,background:'rgba(0,0,0,0.5)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:14,padding:'8px 12px'}}>
            <div style={{display:'flex',alignItems:'center',gap:7}}>
              <span style={{fontSize:22}}>{wxData.emoji}</span>
              <div>
                <div style={{fontSize:12,fontWeight:600}}>{wxData.city}</div>
                <div style={{fontSize:11,color:'rgba(255,255,255,0.6)'}}>{wxData.temp}°C · {wxData.desc}</div>
              </div>
              <button onPointerDown={e=>e.stopPropagation()} onClick={()=>setShowWx(false)}
                style={{marginLeft:4,background:'none',border:'none',color:'rgba(255,255,255,0.3)',cursor:'pointer',fontSize:14,padding:0,lineHeight:1,flexShrink:0}}>×</button>
            </div>
            {(wxData.feels!==null||wxData.humidity!==null||wxData.wind!==null)&&(
              <div style={{display:'flex',gap:8,fontSize:10,color:'rgba(255,255,255,0.45)',paddingTop:3,borderTop:'1px solid rgba(255,255,255,0.07)'}}>
                {wxData.feels!==null&&<span>🌡 {wxData.feels}°C</span>}
                {wxData.humidity!==null&&<span>💧 {wxData.humidity}%</span>}
                {wxData.wind!==null&&<span>🌬 {wxData.wind}km/h</span>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Pomodoro (draggable) ── */}
      {showPom&&(
        <div {...pomDrag.dp} style={{position:'absolute',cursor:'grab',zIndex:20,touchAction:'none',userSelect:'none',...(pomDrag.pos?{left:pomDrag.pos.x,top:pomDrag.pos.y}:{right:14,top:14})}}>
          <PomWidget pom={pom} accent={accent} pomCirc={pomCirc}/>
        </div>
      )}

      {/* ── Note / Todo (draggable) ── */}
      {showNote&&(
        <div style={{position:'absolute',zIndex:60,...(noteDrag.pos?{left:noteDrag.pos.x,top:noteDrag.pos.y}:{right:14,bottom:74})}}>
          <div style={{width:230,background:'rgba(10,11,22,0.97)',backdropFilter:'blur(16px)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:14,overflow:'hidden'}}>
            {/* Drag handle = header */}
            <div {...noteDrag.dp} style={{cursor:'grab',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'9px 12px',borderBottom:'1px solid rgba(255,255,255,0.06)',background:'rgba(255,255,255,0.03)'}}>
              <span style={{fontSize:10,color:'rgba(255,255,255,0.4)',fontWeight:600,letterSpacing:'0.07em',textTransform:'uppercase'}}>
                📝 Ghi chú · {doneTodos}/{todos.length}
              </span>
              <button onPointerDown={e=>e.stopPropagation()} onClick={()=>setShowNote(false)}
                style={{background:'none',border:'none',color:'rgba(255,255,255,0.3)',cursor:'pointer',fontSize:16,padding:0,lineHeight:1}}>×</button>
            </div>
            {/* Todo list */}
            <div style={{padding:'8px 10px',maxHeight:220,overflowY:'auto'}}>
              {todos.length===0&&<p style={{fontSize:11,color:'rgba(255,255,255,0.2)',textAlign:'center',padding:'8px 0',margin:0}}>Chưa có mục nào</p>}
              {todos.map(t=>(
                <div key={t.id} style={{display:'flex',alignItems:'center',gap:7,padding:'4px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                  <button onPointerDown={e=>e.stopPropagation()} onClick={()=>toggleTodo(t.id)}
                    style={{width:16,height:16,borderRadius:4,border:`1.5px solid ${t.done?'#4ade80':accent}`,background:t.done?'#4ade80':'transparent',cursor:'pointer',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9}}>
                    {t.done?'✓':''}
                  </button>
                  <span style={{flex:1,fontSize:12,color:t.done?'rgba(255,255,255,0.25)':'rgba(255,255,255,0.8)',textDecoration:t.done?'line-through':'none',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                    {t.text}
                  </span>
                  <button onPointerDown={e=>e.stopPropagation()} onClick={()=>removeTodo(t.id)}
                    style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.2)',fontSize:13,padding:0,lineHeight:1,flexShrink:0}}>×</button>
                </div>
              ))}
            </div>
            {/* Add input */}
            <div style={{display:'flex',gap:5,padding:'7px 10px',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
              <input value={todoInput} onChange={e=>setTodoInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')addTodo()}} placeholder="Thêm mục..."
                onPointerDown={e=>e.stopPropagation()}
                style={{flex:1,background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:6,color:'#fff',fontSize:11,padding:'5px 7px',outline:'none'}}/>
              <button onPointerDown={e=>e.stopPropagation()} onClick={addTodo}
                style={{width:26,height:26,borderRadius:6,border:'none',background:accent,color:'#fff',fontSize:16,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>+</button>
            </div>
            {todos.some(t=>t.done)&&(
              <button onPointerDown={e=>e.stopPropagation()} onClick={()=>saveTodos(todos.filter(t=>!t.done))}
                style={{width:'100%',fontSize:10,color:'rgba(255,255,255,0.25)',background:'none',border:'none',cursor:'pointer',padding:'4px 0 7px',borderTop:'1px solid rgba(255,255,255,0.04)'}}>
                🗑 Xóa đã hoàn thành
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Pixel Pet (autonomous roaming) ── */}
      {showPet&&<KawaiiCat pomState={pom.on ? pom.phase : null} accent={accent}/>}

      {/* ── Day/Night badge (top-right corner, fades after 4s) ── */}
      {mounted&&!started&&(
        <div style={{position:'absolute',top:14,right:14,background:'rgba(0,0,0,0.55)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:20,padding:'4px 10px',display:'flex',alignItems:'center',gap:5,zIndex:5,pointerEvents:'none',animation:'dnFade 4s ease forwards'}}>
          <span style={{fontSize:13}}>{dn.emoji}</span>
          <span style={{fontSize:10,color:'rgba(255,255,255,0.5)'}}>{dn.label}</span>
        </div>
      )}

      {/* ── Click to start ── */}
      {!started&&(
        <div onClick={doStart} style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14,background:'rgba(0,0,0,0.38)',backdropFilter:'blur(4px)',cursor:'pointer',zIndex:10}}>
          <div style={{width:68,height:68,borderRadius:'50%',background:accent,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 0 40px ${accent}80`}}>
            <svg viewBox="0 0 24 24" fill="white" width="30" height="30"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <p style={{fontSize:13,color:'rgba(255,255,255,0.75)',letterSpacing:'0.04em'}}>Nhấn để bắt đầu</p>
        </div>
      )}

      {/* ── Settings Panel ── */}
      {panel&&(
        <div onClick={e=>e.stopPropagation()} style={{position:'absolute',bottom:74,left:'50%',transform:'translateX(-50%)',width:'min(390px,calc(100vw - 24px))',maxHeight:'65vh',background:'rgba(6,7,17,0.97)',backdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:16,overflow:'hidden',display:'flex',flexDirection:'column',zIndex:50}}>
          {/* Tabs */}
          <div style={{display:'flex',alignItems:'center',padding:'10px 12px 0',gap:2,borderBottom:'1px solid rgba(255,255,255,0.06)',paddingBottom:2}}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setPanelTab(t.id)} title={t.id} style={{flex:1,padding:'7px 2px',borderRadius:8,border:'none',cursor:'pointer',fontSize:15,background:panelTab===t.id?'#1e2035':'transparent',color:panelTab===t.id?accent:'rgba(255,255,255,0.3)',transition:'all .15s'}}>
                {t.icon}
              </button>
            ))}
            <button onClick={()=>setPanel(false)} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.3)',fontSize:20,padding:'0 0 0 8px',lineHeight:1}}>×</button>
          </div>

          <div style={{overflowY:'auto',padding:'12px 14px 16px',flex:1}}>

            {/* 🎵 Lofi */}
            {panelTab==='lofi'&&<>
              <div style={{display:'flex',flexDirection:'column',gap:4,marginBottom:12}}>
                {LOFI_STREAMS.map(s=>(
                  <button key={s.id} onClick={()=>handleLofiChange(s.id)} style={{display:'flex',alignItems:'center',gap:8,padding:'8px 10px',borderRadius:8,border:lofiId===s.id?`1px solid ${accent}50`:'1px solid #1e2035',background:lofiId===s.id?`${accent}18`:'transparent',color:lofiId===s.id?'#fff':'rgba(255,255,255,0.4)',fontSize:12,cursor:'pointer',textAlign:'left'}}>
                    <span style={{width:6,height:6,borderRadius:'50%',flexShrink:0,background:lofiId===s.id?accent:'transparent',border:lofiId===s.id?'none':`1px solid rgba(255,255,255,0.15)`}}/>
                    {s.label}
                    {lofiId===s.id&&ytStatus==='loading'&&<span style={{marginLeft:'auto',fontSize:10,color:'rgba(255,255,255,0.35)'}}>đang kết nối…</span>}
                    {lofiId===s.id&&ytStatus==='ready'&&<span style={{marginLeft:'auto',fontSize:10,color:'#4ade80'}}>● live</span>}
                  </button>
                ))}
                {lofiId==='custom'&&(
                  <div style={{padding:'8px 10px',borderRadius:8,border:`1px solid ${accent}50`,background:`${accent}18`,fontSize:12,color:'#fff',display:'flex',alignItems:'center',gap:8}}>
                    <span style={{width:6,height:6,borderRadius:'50%',background:accent,flexShrink:0}}/>
                    <span style={{flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>YouTube: {customLofiId}</span>
                    {ytStatus==='ready'&&<span style={{fontSize:10,color:'#4ade80'}}>● live</span>}
                  </div>
                )}
              </div>
              <p style={{fontSize:10,letterSpacing:'0.06em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',margin:'0 0 5px',fontWeight:600}}>YouTube tùy chỉnh</p>
              <div style={{display:'flex',gap:5,marginBottom:10}}>
                <input type="text" value={customLofiInput} onChange={e=>setCustomLofiInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')applyCustomLofi()}} placeholder="URL hoặc video ID…"
                  style={{flex:1,background:'#0a0b18',border:'1px solid #1e2035',borderRadius:7,color:'#fff',fontSize:11,padding:'7px 9px',outline:'none'}}/>
                <button onClick={applyCustomLofi} style={{padding:'7px 11px',borderRadius:7,border:'none',background:accent,color:'#fff',fontSize:11,fontWeight:600,cursor:'pointer',flexShrink:0}}>Phát</button>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <span style={{fontSize:13}}>🔊</span>
                <input type="range" min="0" max="100" value={lofiVol} onChange={e=>handleLofiVol(+e.target.value)} style={{flex:1,accentColor:accent,cursor:'pointer'}}/>
                <span style={{fontSize:11,color:'rgba(255,255,255,0.4)',minWidth:32,textAlign:'right'}}>{lofiVol}%</span>
              </div>
              {ytStatus==='blocked'&&<p style={{fontSize:10,color:'#f97316',marginTop:8,lineHeight:1.5,background:'rgba(249,115,22,0.1)',padding:'6px 8px',borderRadius:6}}>⚠ YouTube chưa sẵn sàng. Âm thanh tổng hợp đang hoạt động.</p>}
            </>}

            {/* 🎚️ Ambient */}
            {panelTab==='ambient'&&<>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:5,marginBottom:12}}>
                {AMBIENT_SOUNDS.map(s=>{const active=ambVols[s.id]!==undefined;return(
                  <button key={s.id} onClick={()=>toggleAmbient(s.id)} style={{display:'flex',alignItems:'center',gap:6,padding:'8px 10px',borderRadius:8,border:active?`1px solid ${accent}40`:'1px solid #1e2035',background:active?`${accent}18`:'#0a0b18',color:active?'#fff':'rgba(255,255,255,0.35)',fontSize:11,cursor:'pointer',textAlign:'left',transition:'all .15s'}}>
                    <span style={{fontSize:15}}>{s.icon}</span><span>{s.label}</span>
                  </button>
                )})}
              </div>
              {ambCount>0?<div style={{display:'flex',flexDirection:'column',gap:7}}>
                <p style={{fontSize:10,letterSpacing:'0.06em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',margin:'0 0 2px',fontWeight:600}}>Âm lượng</p>
                {Object.entries(ambVols).map(([id,vol])=>{const s=AMBIENT_SOUNDS.find(s=>s.id===id);if(!s)return null;return(
                  <div key={id} style={{display:'flex',alignItems:'center',gap:8}}>
                    <span style={{fontSize:15,minWidth:22}}>{s.icon}</span>
                    <input type="range" min="0" max="100" value={vol} onChange={e=>handleAmbVol(id,+e.target.value)} style={{flex:1,accentColor:accent,cursor:'pointer'}}/>
                    <span style={{fontSize:10,color:'rgba(255,255,255,0.3)',minWidth:28,textAlign:'right'}}>{vol}%</span>
                  </div>
                )})}
              </div>:<p style={{textAlign:'center',fontSize:11,color:'rgba(255,255,255,0.2)',padding:'8px 0'}}>Chọn âm thanh bên trên để bật</p>}
            </>}

            {/* 🖼️ Background */}
            {panelTab==='bg'&&<>
              <p style={{fontSize:10,letterSpacing:'0.06em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',margin:'0 0 8px',fontWeight:600}}>Hình nền GIF</p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:5,marginBottom:12}}>
                {BG_PRESETS.map(g=>(
                  <button key={g.id} onClick={()=>{setBgUrl(g.url);setBgType('gif')}} style={{padding:'7px 4px',borderRadius:8,border:bgUrl===g.url&&bgType==='gif'?`1px solid ${accent}60`:'1px solid #1e2035',background:bgUrl===g.url&&bgType==='gif'?`${accent}18`:'#0a0b18',color:bgUrl===g.url&&bgType==='gif'?'#fff':'rgba(255,255,255,0.4)',fontSize:11,cursor:'pointer',textAlign:'center',transition:'all .15s',display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
                    <span style={{fontSize:18}}>{g.emoji}</span>
                    <span style={{fontSize:9,lineHeight:1.2}}>{g.label}</span>
                  </button>
                ))}
              </div>
              <p style={{fontSize:10,letterSpacing:'0.06em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',margin:'0 0 5px',fontWeight:600}}>URL GIF tùy chỉnh</p>
              <div style={{display:'flex',gap:5,marginBottom:12}}>
                <input type="text" value={customBg} onChange={e=>setCustomBg(e.target.value)} placeholder="https://… .gif"
                  style={{flex:1,background:'#0a0b18',border:'1px solid #1e2035',borderRadius:7,color:'#fff',fontSize:11,padding:'7px 9px',outline:'none'}}/>
                <button onClick={()=>{if(customBg.trim()){setBgUrl(customBg.trim());setBgType('gif')}}} style={{padding:'7px 11px',borderRadius:7,border:'none',background:accent,color:'#fff',fontSize:11,fontWeight:600,cursor:'pointer',flexShrink:0}}>Dùng</button>
              </div>
              <p style={{fontSize:10,letterSpacing:'0.06em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',margin:'0 0 5px',fontWeight:600}}>Video YouTube làm nền</p>
              <div style={{display:'flex',gap:5,marginBottom:12}}>
                <input type="text" value={bgYtInput} onChange={e=>setBgYtInput(e.target.value)} placeholder="URL hoặc video ID YouTube…"
                  style={{flex:1,background:'#0a0b18',border:'1px solid #1e2035',borderRadius:7,color:'#fff',fontSize:11,padding:'7px 9px',outline:'none'}}/>
                <button onClick={()=>{const id=parseYtId(bgYtInput);if(id){setBgYtId(id);setBgType('youtube')}}} style={{padding:'7px 11px',borderRadius:7,border:'none',background:'#dc2626',color:'#fff',fontSize:11,fontWeight:600,cursor:'pointer',flexShrink:0}}>▶ Nền</button>
              </div>
              {bgType==='youtube'&&<div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12,background:'rgba(220,38,38,0.1)',borderRadius:8,padding:'6px 10px',border:'1px solid rgba(220,38,38,0.3)'}}>
                <span style={{fontSize:11,color:'#fca5a5'}}>🎬 Video YouTube đang làm nền</span>
                <button onClick={()=>setBgType('gif')} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,0.4)',fontSize:12,padding:0}}>Tắt ×</button>
              </div>}
              <p style={{fontSize:10,letterSpacing:'0.06em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',margin:'0 0 5px',fontWeight:600}}>Độ tối nền</p>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
                <span style={{fontSize:11}}>☀️</span>
                <input type="range" min="0" max="90" value={bgOpacity} onChange={e=>setBgOpacity(+e.target.value)} style={{flex:1,accentColor:accent,cursor:'pointer'}}/>
                <span style={{fontSize:11}}>🌑</span>
                <span style={{fontSize:10,color:'rgba(255,255,255,0.4)',minWidth:28,textAlign:'right'}}>{bgOpacity}%</span>
              </div>
              <p style={{fontSize:10,letterSpacing:'0.06em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',margin:'0 0 5px',fontWeight:600}}>Blur nền</p>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:11}}>🔍</span>
                <input type="range" min="0" max="20" value={bgBlur} onChange={e=>setBgBlur(+e.target.value)} style={{flex:1,accentColor:accent,cursor:'pointer'}}/>
                <span style={{fontSize:10,color:'rgba(255,255,255,0.4)',minWidth:36,textAlign:'right'}}>{bgBlur}px</span>
              </div>
            </>}

            {/* 🧩 Widgets */}
            {panelTab==='widgets'&&<>
              <p style={{fontSize:10,letterSpacing:'0.06em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',margin:'0 0 8px',fontWeight:600}}>Bật / Tắt</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:5,marginBottom:14}}>
                {[
                  {key:'clock',  label:'🕐 Đồng hồ',   on:showClock, toggle:()=>setShowClock(v=>!v)},
                  {key:'wx',     label:'🌤️ Thời tiết',  on:showWx&&!!wxData, toggle:()=>setShowWx(v=>!v)},
                  {key:'pom',    label:'🍅 Pomodoro',   on:showPom, toggle:()=>setShowPom(v=>!v)},
                  {key:'note',   label:'📝 Ghi chú',    on:showNote, toggle:()=>setShowNote(v=>!v)},
                ].map(w=>(
                  <button key={w.key} onClick={w.toggle} style={{padding:'8px 10px',borderRadius:8,border:w.on?`1px solid ${accent}50`:'1px solid #1e2035',background:w.on?`${accent}18`:'#0a0b18',color:w.on?accent:'rgba(255,255,255,0.3)',fontSize:11,cursor:'pointer',textAlign:'left',transition:'all .15s'}}>
                    {w.label}
                  </button>
                ))}
              </div>
              <p style={{fontSize:10,letterSpacing:'0.06em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',margin:'0 0 8px',fontWeight:600}}>Kiểu đồng hồ</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:5,marginBottom:14}}>
                {([['digital','🔢 Digital'],['minimal','✦ Minimal'],['bold','𝗕 Bold'],['analog','⟳ Analog']] as [ClockStyle,string][]).map(([s,label])=>(
                  <button key={s} onClick={()=>setClockStyle(s)} style={{padding:'8px 10px',borderRadius:8,border:clockStyle===s?`1px solid ${accent}50`:'1px solid #1e2035',background:clockStyle===s?`${accent}18`:'#0a0b18',color:clockStyle===s?accent:'rgba(255,255,255,0.3)',fontSize:11,cursor:'pointer',textAlign:'left',transition:'all .15s'}}>
                    {label}
                  </button>
                ))}
              </div>
              <p style={{fontSize:10,letterSpacing:'0.06em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',margin:'0 0 8px',fontWeight:600}}>Đặt lại vị trí</p>
              <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                {[['🕐',clockDrag.reset],['🌤️',wxDrag.reset],['🍅',pomDrag.reset],['📝',noteDrag.reset]].map(([icon,fn],i)=>(
                  <button key={i} onClick={fn as ()=>void} style={{padding:'5px 10px',borderRadius:6,border:'1px solid #1e2035',background:'#0a0b18',color:'rgba(255,255,255,0.4)',fontSize:12,cursor:'pointer'}}>
                    {icon as string} Reset
                  </button>
                ))}
              </div>
            </>}

            {/* 🌤️ Weather */}
            {panelTab==='weather'&&<>
              {!wxData&&wxState==='idle'&&<>
                <p style={{fontSize:11,color:'rgba(255,255,255,0.3)',margin:'0 0 10px',lineHeight:1.5}}>Tự động phát hiện thời tiết và hiển thị trên màn hình với đầy đủ thông tin.</p>
                <button onClick={detectWeather} style={{width:'100%',padding:'10px 0',borderRadius:8,border:`1px solid ${accent}40`,background:`${accent}15`,color:accent,fontSize:12,fontWeight:600,cursor:'pointer'}}>📍 Phát hiện thời tiết của tôi</button>
              </>}
              {wxState==='loading'&&<div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 0'}}>
                <div style={{width:14,height:14,borderRadius:'50%',border:`2px solid ${accent}40`,borderTopColor:accent,animation:'spin 0.8s linear infinite',flexShrink:0}}/>
                <span style={{fontSize:12,color:'rgba(255,255,255,0.4)'}}>Đang đọc vị trí…</span>
              </div>}
              {wxState==='error'&&<div>
                <p style={{fontSize:11,color:'#f97316',margin:'0 0 8px',lineHeight:1.5}}>⚠ Không thể truy cập vị trí. Cho phép GPS và thử lại.</p>
                <button onClick={()=>setWxState('idle')} style={{fontSize:11,color:'rgba(255,255,255,0.4)',background:'none',border:'none',cursor:'pointer',padding:0,textDecoration:'underline'}}>Thử lại</button>
              </div>}
              {wxData&&<div style={{display:'flex',flexDirection:'column',gap:8}}>
                <div style={{display:'flex',alignItems:'center',gap:10,background:'#060810',borderRadius:10,padding:'10px 12px',border:'1px solid #12142a'}}>
                  <span style={{fontSize:28,flexShrink:0}}>{wxData.emoji}</span>
                  <div>
                    <div style={{fontSize:13,fontWeight:600,color:'#fff'}}>{wxData.city} · {wxData.temp}°C</div>
                    <div style={{fontSize:11,color:'rgba(255,255,255,0.4)',marginTop:2}}>{wxData.desc}</div>
                    {(wxData.feels!==null||wxData.humidity!==null||wxData.wind!==null)&&(
                      <div style={{display:'flex',gap:10,fontSize:10,color:'rgba(255,255,255,0.35)',marginTop:4}}>
                        {wxData.feels!==null&&<span>🌡 Cảm giác {wxData.feels}°C</span>}
                        {wxData.humidity!==null&&<span>💧 {wxData.humidity}%</span>}
                        {wxData.wind!==null&&<span>🌬 {wxData.wind} km/h</span>}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{display:'flex',gap:6}}>
                  <button onClick={detectWeather} style={{flex:1,padding:'7px 0',borderRadius:7,border:'none',background:`${accent}20`,color:accent,fontSize:11,fontWeight:600,cursor:'pointer'}}>↺ Làm mới</button>
                  <button onClick={()=>{setWxData(null);setWxState('idle');setShowWx(false)}} style={{padding:'7px 12px',borderRadius:7,border:'1px solid #1e2035',background:'transparent',color:'rgba(255,255,255,0.3)',fontSize:11,cursor:'pointer'}}>Xóa</button>
                </div>
              </div>}
            </>}

            {/* 🐱 Pet */}
            {panelTab==='pet'&&<>
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12,padding:'8px 0'}}>
                <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:14,padding:'16px 24px',display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
                  <CatSVG state={pom.on ? pom.phase === 'work' ? 'work' : 'sleep' : 'idle'} size={52}/>
                  <span style={{fontSize:10,color:'rgba(255,255,255,0.25)'}}>
                    {pom.on ? pom.phase === 'work' ? '⌨️ đang tập trung' : '💤 nghỉ ngơi' : '(=^･ω･^=)'}
                  </span>
                </div>
                <button onClick={()=>setShowPet(v=>!v)} style={{width:'100%',padding:'10px 0',borderRadius:8,border:`1px solid ${showPet?accent+'50':'rgba(255,255,255,0.1)'}`,background:showPet?`${accent}20`:'transparent',color:showPet?accent:'rgba(255,255,255,0.5)',fontSize:12,fontWeight:600,cursor:'pointer',transition:'all .2s'}}>
                  {showPet?'🐱 Ẩn mèo':'🐱 Thả mèo ra màn hình'}
                </button>
                <p style={{fontSize:10,color:'rgba(255,255,255,0.2)',textAlign:'center',lineHeight:1.6,margin:0}}>
                  Mèo sẽ tự đi lang thang, lăn tròn &amp; làm nũng.<br/>
                  Đưa chuột lại gần để mèo vui lên! Click = meow~ 🐱
                </p>
              </div>
            </>}

            {/* 🔗 Share */}
            {panelTab==='share'&&<>
              <p style={{fontSize:11,color:'rgba(255,255,255,0.3)',margin:'0 0 10px',lineHeight:1.5}}>Chia sẻ vibe hiện tại qua một link embed.</p>
              <div style={{background:'#060810',borderRadius:8,padding:'8px 10px',fontSize:10,color:'rgba(255,255,255,0.3)',wordBreak:'break-all',lineHeight:1.5,border:'1px solid #12142a',marginBottom:10,maxHeight:58,overflowY:'auto'}}>
                {mounted?shareUrl:'…'}
              </div>
              <button onClick={handleShare} style={{width:'100%',padding:'10px 0',borderRadius:8,border:'none',background:copied?'#1a3a20':accent,color:copied?'#4ade80':'#fff',fontSize:12,fontWeight:600,cursor:'pointer',transition:'all .2s'}}>
                {copied?'✓ Đã sao chép!':'📋 Sao chép link embed'}
              </button>
              <p style={{fontSize:10,color:'rgba(255,255,255,0.18)',marginTop:8,lineHeight:1.5,textAlign:'center'}}>Dán vào Notion, blog, hoặc bất kỳ trang web nào</p>
            </>}

          </div>
        </div>
      )}

      {/* ── Control bar ── */}
      <div style={{position:'absolute',bottom:18,left:16,right:16,display:'flex',justifyContent:'center',zIndex:40}}>
        <div style={{background:'rgba(0,0,0,0.58)',backdropFilter:'blur(14px)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:44,padding:'8px 14px',display:'flex',alignItems:'center',gap:10}}>
          <button onClick={togglePlay} style={{width:36,height:36,borderRadius:'50%',border:'none',background:accent,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:`0 0 14px ${accent}60`}}>
            {started&&playing
              ?<svg viewBox="0 0 24 24" fill="white" width="16" height="16"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>
              :<svg viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M8 5v14l11-7z"/></svg>}
          </button>
          {started&&playing&&ytStatus==='loading'&&<div style={{display:'flex',alignItems:'center',gap:5}}><div style={{width:10,height:10,borderRadius:'50%',border:`2px solid ${accent}50`,borderTopColor:accent,animation:'spin 0.7s linear infinite'}}/><span style={{fontSize:10,color:'rgba(255,255,255,0.4)'}}>Đang tải…</span></div>}
          {started&&playing&&ytStatus==='ready'&&<div style={{display:'flex',alignItems:'flex-end',gap:2,height:16}}>{[4,7,5,9,6,4,7].map((h,i)=><div key={i} style={{width:3,borderRadius:2,background:accent,height:h*2,animation:`eqB ${0.4+i*0.08}s ease-in-out infinite alternate`}}/>)}</div>}
          {ambCount>0&&<div style={{display:'flex',gap:3,fontSize:13}}>{Object.keys(ambVols).slice(0,4).map(id=>{const s=AMBIENT_SOUNDS.find(s=>s.id===id);return<span key={id}>{s?.icon}</span>})}{ambCount>4&&<span style={{fontSize:10,color:'rgba(255,255,255,0.4)'}}>+{ambCount-4}</span>}</div>}
          <div style={{width:1,height:18,background:'rgba(255,255,255,0.1)'}}/>
          <button onClick={()=>setShowNote(v=>!v)} style={{width:30,height:30,borderRadius:'50%',cursor:'pointer',border:showNote?`1px solid ${accent}50`:'1px solid rgba(255,255,255,0.12)',background:showNote?`${accent}20`:'rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,position:'relative'}}>
            📝{todos.length>0&&<span style={{position:'absolute',top:-3,right:-3,width:14,height:14,borderRadius:'50%',background:accent,fontSize:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:600}}>{todos.length}</span>}
          </button>
          <button onClick={()=>setPanel(v=>!v)} style={{width:30,height:30,borderRadius:'50%',cursor:'pointer',border:panel?`1px solid ${accent}50`:'1px solid rgba(255,255,255,0.12)',background:panel?`${accent}20`:'rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>⚙️</button>
        </div>
      </div>

      {/* Branding */}
      <a href="/" target="_blank" rel="noopener noreferrer" style={{position:'absolute',bottom:5,right:10,fontSize:9,color:'rgba(255,255,255,0.18)',textDecoration:'none',zIndex:5}} onMouseEnter={e=>(e.currentTarget.style.color='rgba(255,255,255,0.5)')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.18)')}>
        Powered by LofiSpace
      </a>

      {/* Hidden YT player */}
      <div style={{position:'fixed',bottom:0,right:0,width:1,height:1,opacity:0,overflow:'hidden'}}><div ref={ytRef}/></div>

      <style>{`
        @keyframes eqB{from{transform:scaleY(0.3)}to{transform:scaleY(1.2)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes dnFade{0%{opacity:1}70%{opacity:1}100%{opacity:0;pointer-events:none}}
        input[type=range]{-webkit-appearance:none;height:3px;border-radius:2px;outline:none;cursor:pointer;background:#1e2035}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;cursor:pointer}
        textarea::placeholder,input::placeholder{color:rgba(255,255,255,0.2)}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#1e2035;border-radius:2px}
      `}</style>
    </div>
  )
}

// Extracted to avoid huge inline JSX for Pomodoro
function PomWidget({pom,accent,pomCirc}:{pom:ReturnType<typeof usePomodoro>;accent:string;pomCirc:number}){
  return(
    <div style={{background:'rgba(0,0,0,0.52)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:14,padding:'9px 13px',display:'flex',alignItems:'center',gap:9}}>
      <svg width="42" height="42" viewBox="0 0 44 44" style={{transform:'rotate(-90deg)',flexShrink:0}}>
        <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3"/>
        <circle cx="22" cy="22" r="18" fill="none" stroke={pom.phase==='work'?accent:'#6ee7b7'} strokeWidth="3" strokeLinecap="round"
          strokeDasharray={pomCirc} strokeDashoffset={pomCirc*(1-pom.progress)} style={{transition:'stroke-dashoffset 1s linear'}}/>
      </svg>
      <div>
        <div style={{fontSize:19,fontWeight:600,fontFamily:'monospace',lineHeight:1}}>{pom.mm}:{pom.ss}</div>
        <div style={{display:'flex',gap:6,marginTop:3}}>
          <button onPointerDown={e=>e.stopPropagation()} onClick={pom.toggle}
            style={{fontSize:9,padding:'2px 6px',borderRadius:4,border:'none',background:'rgba(255,255,255,0.1)',color:'#fff',cursor:'pointer'}}>
            {pom.on?'⏸':'▶'}
          </button>
          <button onPointerDown={e=>e.stopPropagation()} onClick={pom.reset}
            style={{fontSize:9,padding:'2px 6px',borderRadius:4,border:'none',background:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.5)',cursor:'pointer'}}>
            ↺
          </button>
        </div>
      </div>
    </div>
  )
}
