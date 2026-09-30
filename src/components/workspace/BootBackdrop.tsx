// Server-rendered Suspense fallback for /workspace and /embed.
//
// EmbedClient reads useSearchParams(), so on these static routes the whole client tree
// bails out of prerendering — the HTML only contains this fallback, and the real
// <video> background used to appear only after the (large) workspace JS had downloaded
// and executed. This fallback closes that gap: a tiny inline script picks the same
// background EmbedClient will pick (?bgv= / Come Home / saved settings / default) and
// starts painting its poster + playing the clip straight from the HTML. By the time
// React mounts, the clip is already in the HTTP cache, so the real player starts instantly.
const BOOT = `(function(){try{
var d=document.getElementById('lf-boot');if(!d)return;
var q=new URLSearchParams(location.search),u=q.get('bgv'),s={};
try{s=JSON.parse(localStorage.getItem('lofispace-settings')||'{}')||{}}catch(e){}
if(q.get('mode')==='home')u='/video/lofi-bedroom.mp4';
if(!u)u=s.bgUrl||'/video/street-scene.mp4';
var o=parseInt(q.get('bgo')||(s.bgOpacity!=null?s.bgOpacity:35),10);
d.lastChild.style.opacity=String(Math.min(90,Math.max(0,o||0))/100);
if(!/^\\/video\\/[\\w-]+\\.mp4$/.test(u))return;
var p=u.replace(/\\.mp4$/,'-poster.jpg');
d.style.backgroundImage='url('+p+')';
var v=document.createElement('video');
v.muted=true;v.defaultMuted=true;v.loop=true;v.autoplay=true;v.playsInline=true;
v.setAttribute('muted','');v.setAttribute('playsinline','');v.setAttribute('aria-hidden','true');
v.preload='auto';v.poster=p;v.src=u;
v.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover';
d.insertBefore(v,d.lastChild);
}catch(e){}})()`

export function BootBackdrop() {
  return (
    <>
      <div
        id="lf-boot"
        suppressHydrationWarning
        style={{ position: 'fixed', inset: 0, background: '#0d0d14 center/cover no-repeat' }}
      >
        <div style={{ position: 'absolute', inset: 0, background: '#000', opacity: 0.35 }} />
      </div>
      <script dangerouslySetInnerHTML={{ __html: BOOT }} />
    </>
  )
}
