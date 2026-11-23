// Synthesised ambient sounds (rain, waves, café, fire, wind, thunder…) — no audio files.
// Shared by the workspace mixer (EmbedClient) and the standalone timer pages.

export function makePinkBuffer(ctx:AudioContext,secs=8):AudioBuffer {
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

export type SynthNode={gain:GainNode;stop:()=>void}
export function buildSynthGraph(ctx:AudioContext,id:string,dest:AudioNode=ctx.destination):SynthNode {
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
