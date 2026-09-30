// Come Home styles. Plain CSS in a string (same approach as the workspace's inline <style>
// blocks) so the whole mode stays inside its lazy chunk. Everything is scoped under .ch-root.
export const COME_HOME_CSS = `
@property --burn{syntax:'<percentage>';inherits:false;initial-value:0%}
.ch-root{
  --ch-text:#f4ece4;--ch-dim:rgba(244,236,228,.62);--ch-dim2:rgba(244,236,228,.4);
  --ch-line:rgba(255,236,220,.14);--ch-glass:rgba(22,16,22,.55);--ch-accent:#f0b88a;--ch-accent-soft:rgba(240,184,138,.16);
  --accent:#f0b88a;--track:rgba(255,240,230,.12);
  position:fixed;inset:0;z-index:30;color:var(--ch-text);font-family:'Outfit',system-ui,sans-serif;
  animation:ch-enter 1.4s ease both;transition:opacity .7s ease;overflow:hidden;
}
.ch-root.is-leaving{opacity:0}
.ch-veil{position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 30%,rgba(46,26,32,.42) 0%,rgba(14,8,16,.72) 60%,rgba(6,4,10,.86) 100%);pointer-events:none}
.ch-root button{font-family:inherit}
.ch-root textarea{user-select:text;-webkit-user-select:text}
.ch-root button:focus-visible,.ch-root textarea:focus-visible,.ch-root input:focus-visible,.ch-root a:focus-visible{outline:2px solid var(--ch-accent);outline-offset:3px}
.ch-root [tabindex="-1"]:focus{outline:none}
.ch-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}

/* top chrome */
.ch-top{position:absolute;top:0;left:0;right:0;z-index:6;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:16px 18px;transition:opacity 1.4s ease}
.ch-top.is-idle{opacity:0}
.ch-top.is-idle:focus-within{opacity:1}
.ch-switch{display:flex;padding:4px;border-radius:999px;background:var(--ch-glass);border:1px solid var(--ch-line);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.ch-switch button{display:flex;align-items:center;gap:6px;padding:7px 14px;border:none;border-radius:999px;background:transparent;color:var(--ch-dim);font-size:13px;font-weight:500;cursor:pointer;transition:background .3s,color .3s}
.ch-switch button.is-on{background:var(--ch-accent-soft);color:var(--ch-accent)}
.ch-switch button:not(.is-on):hover{color:var(--ch-text)}
.ch-top-left,.ch-top-right{display:flex;gap:8px;align-items:center;flex:1}
.ch-top-right{justify-content:flex-end}
.ch-where{margin:0;flex:0 1 auto;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--ch-dim2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ch-pill-sun{padding:8px 10px}
.ch-pill{display:flex;align-items:center;gap:6px;padding:8px 13px;border-radius:999px;border:1px solid var(--ch-line);background:var(--ch-glass);color:var(--ch-dim);font-size:12.5px;cursor:pointer;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);transition:color .3s,background .3s}
.ch-pill:hover{color:var(--ch-text)}
.ch-pill.is-on{color:var(--ch-accent)}

/* screens */
.ch-stage{position:absolute;inset:0}
.ch-screen{position:absolute;inset:0;animation:ch-screen-in 1.1s ease both}
.ch-center{display:flex;align-items:center;justify-content:center;padding:92px 20px 80px;overflow-y:auto}
.ch-fill{overflow:hidden}
.ch-col{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;text-align:center;gap:14px;width:100%;max-width:640px;margin:auto}
.ch-wide{max-width:780px}
.ch-h1{margin:0;font-size:clamp(30px,5vw,48px);font-weight:500;letter-spacing:-.01em;line-height:1.15}
.ch-h2{margin:0;font-size:clamp(22px,3.4vw,31px);font-weight:500;line-height:1.3}
.ch-soft{color:#fbe9d8}
.ch-sub{margin:0;font-size:16px;color:var(--ch-dim);line-height:1.6}
.ch-q{margin:30px 0 4px;font-size:18px}
.ch-reply{font-style:italic;margin-bottom:4px}
.ch-dim{color:var(--ch-dim)}
.ch-fine{margin:4px 0 0;font-size:12px;color:var(--ch-dim2)}
.ch-row{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;align-items:center}
.ch-moon{font-size:44px;line-height:1;margin:8px 0;animation:ch-float 9s ease-in-out infinite}

/* buttons */
.ch-btn{padding:12px 22px;border-radius:999px;border:1px solid var(--ch-line);background:rgba(255,240,230,.06);color:var(--ch-text);font-size:15px;cursor:pointer;transition:background .35s,border-color .35s,opacity .35s}
.ch-btn:hover:not(:disabled){background:rgba(255,240,230,.12)}
.ch-btn:disabled{opacity:.38;cursor:default}
.ch-btn-main{background:rgba(240,184,138,.2);border-color:rgba(240,184,138,.42);color:#ffe6cf}
.ch-btn-main:hover:not(:disabled){background:rgba(240,184,138,.3)}
.ch-btn-ghost{background:transparent;border-color:transparent;color:var(--ch-dim)}
.ch-link{background:none;border:none;color:var(--ch-dim);font-size:14px;cursor:pointer;text-decoration:underline;text-underline-offset:4px;text-decoration-color:rgba(244,236,228,.25);padding:6px}
.ch-link:hover{color:var(--ch-text)}
.ch-link.is-warm{color:var(--ch-accent)}
.ch-chip{padding:6px 12px;border-radius:999px;border:1px solid var(--ch-line);background:transparent;color:var(--ch-dim);font-size:13px;cursor:pointer}
.ch-chip.is-on{background:var(--ch-accent-soft);color:var(--ch-accent);border-color:rgba(240,184,138,.35)}
.ch-end{position:absolute;left:50%;bottom:22px;white-space:nowrap;transform:translateX(-50%);z-index:5;background:rgba(14,10,16,.4);border:1px solid var(--ch-line);color:var(--ch-dim);border-radius:999px;padding:8px 16px;font-size:12.5px;cursor:pointer;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.ch-end:hover{color:var(--ch-text)}

/* welcome + menu */
.ch-moods{display:flex;gap:14px;flex-wrap:wrap;justify-content:center}
.ch-mood{display:flex;flex-direction:column;align-items:center;gap:8px;width:92px;padding:16px 6px 12px;border-radius:20px;border:1px solid transparent;background:transparent;color:var(--ch-dim);font-size:13px;cursor:pointer;transition:background .4s,border-color .4s,color .4s}
.ch-mood:hover{background:rgba(255,240,230,.06);border-color:var(--ch-line);color:var(--ch-text)}
.ch-mood-emoji{font-size:34px;line-height:1}
.ch-hub .ch-col{gap:10px}
.ch-group{width:100%;margin-top:14px;text-align:left}
.ch-group-title{margin:0 0 8px 4px;font-size:11.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--ch-dim2)}
.ch-cardgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}
.ch-need{position:relative;display:flex;align-items:center;gap:14px;min-height:74px;padding:14px 16px;border-radius:18px;border:1px solid var(--ch-line);background:rgba(255,240,230,.045);color:var(--ch-text);text-align:left;cursor:pointer;transition:background .4s,border-color .4s,transform .4s}
.ch-need:hover{background:rgba(255,240,230,.1);border-color:rgba(240,184,138,.3);transform:translateY(-1px)}
.ch-need.is-suggested{border-color:rgba(240,184,138,.45);background:linear-gradient(135deg,rgba(240,184,138,.14),rgba(255,240,230,.04))}
.ch-need-emoji{flex:none;display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:rgba(255,240,230,.07);font-size:20px}
.ch-need-text{display:flex;flex-direction:column;gap:3px;min-width:0}
.ch-need-title{font-size:15px;font-weight:500}
.ch-need-desc{font-size:12.5px;color:var(--ch-dim);line-height:1.4}
.ch-count{color:var(--ch-accent)}
.ch-badge{position:absolute;top:-9px;right:12px;padding:2px 9px;border-radius:999px;background:#3a2622;border:1px solid rgba(240,184,138,.45);color:var(--ch-accent);font-size:10.5px;letter-spacing:.06em}

/* writing */
.ch-textarea{width:100%;min-height:210px;margin-top:10px;padding:16px 18px;border-radius:18px;border:1px solid var(--ch-line);background:rgba(255,244,232,.06);color:var(--ch-text);font:16px/1.65 'Outfit',system-ui,sans-serif;resize:vertical;outline:none}
.ch-textarea::placeholder{color:rgba(244,236,228,.32)}
.ch-steps{display:flex;gap:6px;margin:0 0 6px;padding:0;list-style:none;font-size:12px;color:var(--ch-dim2)}
.ch-steps li{display:flex;align-items:center;gap:6px;padding:4px 10px 4px 5px;border-radius:999px;border:1px solid transparent;transition:all .4s}
.ch-steps li span{display:grid;place-items:center;width:18px;height:18px;border-radius:50%;background:rgba(255,240,230,.08);font-size:10px}
.ch-steps li.is-now{color:var(--ch-text);border-color:var(--ch-line);background:rgba(255,240,230,.05)}
.ch-steps li.is-now span{background:var(--ch-accent-soft);color:var(--ch-accent)}
.ch-steps li.is-done{color:var(--ch-dim)}
.ch-rituals{display:grid;grid-template-columns:repeat(auto-fit,minmax(138px,1fr));gap:10px;width:100%;margin:6px 0 4px}
.ch-ritual{display:flex;flex-direction:column;align-items:center;gap:6px;padding:16px 12px 14px;border-radius:18px;border:1px solid var(--ch-line);background:rgba(255,240,230,.04);color:var(--ch-text);cursor:pointer;transition:background .4s,border-color .4s,transform .4s}
.ch-ritual:hover{background:rgba(255,240,230,.09);transform:translateY(-2px)}
.ch-ritual.is-on{border-color:rgba(240,184,138,.55);background:linear-gradient(160deg,rgba(240,184,138,.18),rgba(255,240,230,.04));box-shadow:0 10px 30px rgba(240,160,110,.12)}
.ch-ritual-emoji{font-size:28px;line-height:1.1}
.ch-ritual-name{font-size:14.5px;font-weight:500}
.ch-ritual-desc{font-size:12px;line-height:1.4;color:var(--ch-dim)}
.ch-keep{display:grid;grid-template-columns:auto 1fr;column-gap:14px;row-gap:2px;text-align:left;width:100%;max-width:520px;padding:16px 18px;border-color:rgba(240,184,138,.42);background:linear-gradient(135deg,rgba(240,184,138,.16),rgba(255,240,230,.04))}
.ch-keep .ch-ritual-emoji{grid-row:span 2;align-self:center;color:#ffe6b8}
.ch-quote{max-width:520px;padding:12px 18px;border-radius:6px;background:#f3e7d3;color:#3b2e29;font-size:15px;line-height:1.5;box-shadow:0 10px 30px rgba(0,0,0,.3);transform:rotate(-1deg)}
.ch-or{margin:4px 0 0;font-size:13px}
.ch-ritual-row{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.ch-one-input{width:100%;text-align:left;margin-top:8px}
.ch-one-prefix{display:block;font-size:15px;color:var(--ch-accent);margin:0 0 6px 4px}
.ch-one-area{min-height:110px;margin-top:0}

/* release */
.ch-release{position:absolute;inset:0;overflow:hidden}
.ch-cards{position:absolute;inset:0;display:flex;flex-wrap:wrap;align-content:center;justify-content:center;gap:12px;padding:100px 24px}
.ch-card{max-width:260px;padding:10px 14px;border-radius:6px;background:#f3e7d3;color:#3b2e29;font-size:14px;line-height:1.45;box-shadow:0 10px 30px rgba(0,0,0,.35);will-change:transform,opacity;
  animation:ch-card-in .9s ease calc(var(--i,0) * .09s) both,ch-sky-away 5.2s cubic-bezier(.45,0,.3,1) calc(1.5s + var(--i,0) * .42s) forwards}
.ch-rit-river .ch-card{animation:ch-card-in .9s ease calc(var(--i,0) * .09s) both,ch-river-away 7.4s cubic-bezier(.4,0,.3,1) calc(1.5s + var(--i,0) * .42s) forwards}
.ch-rit-burn .ch-card{animation:ch-card-in .9s ease calc(var(--i,0) * .09s) both,ch-burn 4.6s cubic-bezier(.5,0,.6,1) calc(1.5s + var(--i,0) * .42s) forwards}
.ch-rit-wind .ch-card{animation:ch-card-in .9s ease calc(var(--i,0) * .09s) both,ch-wind-away 4.2s cubic-bezier(.55,0,.4,1) calc(1.5s + var(--i,0) * .42s) forwards}
.ch-rit-rain .ch-card{animation:ch-card-in .9s ease calc(var(--i,0) * .09s) both,ch-rain-away 4.8s ease-in calc(1.5s + var(--i,0) * .42s) forwards}
/* burn: the paper chars from the bottom up - a glowing edge climbs, below it is gone */
.ch-rit-burn .ch-card{
  -webkit-mask-image:linear-gradient(to top,transparent calc(var(--burn) - 4%),#000 calc(var(--burn) + 6%));
  mask-image:linear-gradient(to top,transparent calc(var(--burn) - 4%),#000 calc(var(--burn) + 6%));
  background-image:linear-gradient(to top,#1d100b calc(var(--burn) - 2%),#ff7a2e var(--burn),#ffc36b calc(var(--burn) + 2%),#6b3a22 calc(var(--burn) + 5%),#f3e7d3 calc(var(--burn) + 12%))}
.ch-burn-scene{position:absolute;inset:0;pointer-events:none}
.ch-burn-glow{position:absolute;left:50%;top:50%;width:80vmin;height:60vmin;transform:translate(-50%,-40%);border-radius:50%;background:radial-gradient(circle,rgba(255,140,60,.28),rgba(255,90,30,.08) 45%,transparent 70%);opacity:0;animation:ch-glow 5.5s ease 1.4s forwards}
.ch-ember{position:absolute;top:58%;width:4px;height:4px;border-radius:50%;background:#ffb25e;box-shadow:0 0 8px 2px rgba(255,140,50,.8);opacity:0;animation:ch-ember 3.6s ease-out infinite}
/* river: the note drops to the water, folds into a paper boat and floats off */
.ch-rit-river .ch-cards{align-content:flex-start;padding-top:18vh}
/* wind */
.ch-wind{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.ch-wind span{position:absolute;left:-40%;height:1.5px;border-radius:2px;background:linear-gradient(90deg,transparent,rgba(230,225,255,.28),transparent);animation:ch-gust 3.2s ease-in infinite}
.ch-wind i{position:absolute;left:-6%;font-style:normal;font-size:18px;opacity:0;animation:ch-leaf 4.5s ease-in-out infinite}
/* rain */
.ch-rainfall{position:absolute;inset:-10% 0 0;pointer-events:none;background-image:repeating-linear-gradient(104deg,transparent 0 22px,rgba(190,205,255,.16) 22px 23px,transparent 23px 46px);background-size:100% 120px;opacity:0;animation:ch-rainfall .5s linear infinite,ch-fade-in 2s ease forwards}
.ch-one-keep{animation:ch-card-in .9s ease both,ch-keep 3.2s cubic-bezier(.45,0,.3,1) 1s forwards}
.ch-starfield{position:absolute;inset:0;pointer-events:none}
.ch-starfield span{position:absolute;width:2px;height:2px;border-radius:50%;background:#fff6e0;opacity:.3;animation:ch-twinkle 7s ease-in-out infinite}
.ch-river{position:absolute;left:0;right:0;bottom:0;height:40vh;background:linear-gradient(180deg,rgba(20,30,60,0),rgba(40,60,110,.3) 22%,rgba(20,30,70,.55));pointer-events:none;border-top:1px solid rgba(190,210,255,.08)}
.ch-river span{position:absolute;left:-40%;width:40%;height:2px;border-radius:2px;background:linear-gradient(90deg,transparent,rgba(190,210,255,.35),transparent);animation:ch-shimmer 10s linear infinite}
.ch-clouds{position:absolute;left:0;right:0;top:0;height:42vh;pointer-events:none}
.ch-clouds span{position:absolute;top:8vh;width:46vw;height:20vh;border-radius:50%;background:rgba(210,195,225,.12);filter:blur(24px);animation:ch-cloudmove 46s linear infinite}

/* memory sky */
.ch-sky-head{position:absolute;top:84px;left:0;right:0;z-index:2;pointer-events:none;text-align:center;padding:0 20px;display:flex;flex-direction:column;gap:8px;align-items:center}
.ch-sky-list{position:absolute;inset:0;margin:0;padding:0;list-style:none}
.ch-sky-list li{position:absolute;transform:translate(-50%,-50%)}
.ch-memstar{position:relative;display:block;width:14px;height:14px;padding:0;border:none;border-radius:50%;background:#fff3cf;box-shadow:0 0 14px 4px rgba(255,236,190,.55);cursor:pointer;transform:scale(var(--s,1));animation:ch-twinkle-strong 6s ease-in-out infinite;transition:box-shadow .4s}
.ch-memstar::before{content:'';position:absolute;inset:-14px;border-radius:50%}
.ch-memstar.is-born{animation:ch-born 2.4s cubic-bezier(.2,.8,.2,1) both}
.ch-sky-add{position:absolute;left:50%;bottom:24px;transform:translateX(-50%);z-index:5;display:flex;gap:8px;width:min(520px,calc(100vw - 32px));padding:6px;border-radius:999px;background:var(--ch-glass);border:1px solid var(--ch-line);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.ch-sky-add input{flex:1;min-width:0;padding:0 14px;border:none;background:transparent;color:var(--ch-text);font:15px 'Outfit',system-ui,sans-serif;outline:none;user-select:text;-webkit-user-select:text}
.ch-sky-add input::placeholder{color:rgba(244,236,228,.35)}
.ch-sky-add .ch-btn{padding:10px 18px;white-space:nowrap}
.ch-memstar:hover,.ch-memstar.is-open{box-shadow:0 0 22px 9px rgba(255,236,190,.8)}
.ch-memcard{position:absolute;left:50%;bottom:92px;translate:-50% 0;z-index:4;width:min(360px,calc(100vw - 32px));padding:16px 18px;border-radius:18px;background:var(--ch-glass);border:1px solid var(--ch-line);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);animation:ch-screen-in .6s ease both;text-align:left}

/* rooms */
.ch-clock{position:absolute;top:74px;left:50%;transform:translateX(-50%);z-index:3;display:flex;gap:10px;align-items:center;font-size:13px;letter-spacing:.22em;color:var(--ch-dim);pointer-events:none}
.ch-hint{position:absolute;left:50%;top:104px;transform:translateX(-50%);z-index:3;margin:0;width:max-content;max-width:calc(100vw - 32px);text-align:center;font-size:13px;color:var(--ch-dim);pointer-events:none;animation:ch-hint 10s ease forwards}
.ch-bubble-wrap{position:absolute;left:50%;bottom:32vh;transform:translateX(-50%);z-index:3;pointer-events:none}
.ch-bubble{padding:9px 16px;border-radius:16px;background:rgba(30,20,26,.6);border:1px solid var(--ch-line);font-size:14.5px;color:#fbe9d8;white-space:nowrap;animation:ch-bubble 6.5s ease both}

/* calm */
.ch-calm{overflow:hidden}
.ch-orb{position:absolute;left:50%;top:44%;width:44vmin;height:44vmin;margin:-22vmin 0 0 -22vmin;border-radius:50%;background:radial-gradient(circle,rgba(255,214,170,.34) 0%,rgba(170,170,230,.14) 45%,rgba(120,130,200,0) 70%);animation:ch-breath 10s ease-in-out infinite;pointer-events:none}
.ch-waves{position:absolute;left:0;right:0;bottom:0;width:100%;height:26vh;pointer-events:none}
.ch-waves .w1{fill:rgba(96,120,190,.2);animation:ch-wave 10s ease-in-out infinite}
.ch-waves .w2{fill:rgba(56,78,140,.32);animation:ch-wave 10s ease-in-out -.6s infinite}
.ch-calm-curtain{position:absolute;top:0;bottom:0;width:20vw;pointer-events:none;animation:ch-sway 10s ease-in-out infinite}
.ch-calm-curtain.l{left:0;background:linear-gradient(90deg,rgba(80,36,48,.35),transparent);transform-origin:left}
.ch-calm-curtain.r{right:0;background:linear-gradient(270deg,rgba(80,36,48,.35),transparent);transform-origin:right}
.ch-line{animation:ch-line-in 2.6s ease both}
.ch-breath-label{margin:22px 0 0;font-size:12px;letter-spacing:.35em;text-transform:uppercase;color:var(--ch-dim2)}
.ch-progress{position:absolute;left:50%;bottom:26px;transform:translateX(-50%);width:120px;height:2px;border-radius:2px;background:rgba(255,240,230,.08);overflow:hidden}
.ch-progress span{display:block;height:100%;background:rgba(240,184,138,.5);transition:width .3s linear}

/* quiet */
.ch-quiet{max-width:520px}
.ch-mixer{list-style:none;margin:10px 0 0;padding:0;width:100%;display:flex;flex-direction:column;gap:8px}
.ch-mixer li{display:grid;grid-template-columns:160px 1fr;gap:14px;align-items:center;padding:8px 12px;border-radius:14px;border:1px solid transparent;transition:background .4s,border-color .4s}
.ch-mixer li.is-on{background:rgba(255,240,230,.05);border-color:var(--ch-line)}
.ch-snd{display:flex;align-items:center;gap:10px;padding:6px 4px;border:none;background:none;color:var(--ch-dim);font-size:14.5px;cursor:pointer;text-align:left}
.ch-mixer li.is-on .ch-snd{color:var(--ch-text)}
.ch-snd span:first-child{font-size:19px}
.ch-mixer input[type=range]:disabled{opacity:.3}
.ch-master{display:grid;grid-template-columns:160px 1fr;gap:14px;align-items:center;width:100%;padding:14px 12px 4px;border-top:1px solid var(--ch-line);margin-top:6px;font-size:13px;color:var(--ch-dim);text-align:left}

/* sleep */
.ch-dimmer{position:absolute;inset:0;background:#000;transition:opacity 9s linear;pointer-events:none;z-index:1}

@keyframes ch-enter{from{opacity:0}to{opacity:1}}
@keyframes ch-screen-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes ch-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes ch-twinkle{0%,100%{opacity:.18}50%{opacity:.7}}
@keyframes ch-twinkle-strong{0%,100%{opacity:.75}50%{opacity:1}}
@keyframes ch-card-in{from{opacity:0;transform:translateY(14px) scale(.96)}to{opacity:1;transform:none}}
@keyframes ch-sky-away{
  0%{transform:translate(0,0) rotate(0) scale(1);opacity:1}
  35%{transform:translate(calc(var(--dx) * .3),-18vh) rotate(var(--rot)) scale(.8);border-radius:6px}
  70%{transform:translate(calc(var(--dx) * .7),-50vh) rotate(var(--rot)) scale(.1);border-radius:50%;background:#fff6d8;color:transparent;box-shadow:0 0 34px 14px rgba(255,240,200,.75)}
  100%{transform:translate(var(--dx),-60vh) scale(.05);border-radius:50%;background:#fff6d8;color:transparent;opacity:0}}
@keyframes ch-cloud-away{
  0%{transform:none;filter:blur(0);opacity:1}
  60%{transform:translate(calc(var(--dx,0px) * .4),-30vh) scale(1.1);filter:blur(6px);opacity:.5}
  100%{transform:translate(calc(var(--dx,0px) * .6),-46vh) scale(1.25);filter:blur(14px);opacity:0}}
@keyframes ch-river-away{
  0%{transform:none;opacity:1;clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}
  22%{transform:translate(0,46vh) rotate(var(--rot)) scale(.62);clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}
  32%{transform:translate(0,48vh) rotate(0) scale(.5);clip-path:polygon(0 38%,100% 38%,80% 100%,20% 100%);background:#f7efe2;color:transparent}
  48%{transform:translate(calc(var(--dx) * .3 + 14vw),47vh) rotate(-3deg) scale(.46);clip-path:polygon(0 38%,100% 38%,80% 100%,20% 100%);background:#f7efe2;color:transparent}
  64%{transform:translate(calc(var(--dx) * .5 + 32vw),49vh) rotate(3deg) scale(.4);clip-path:polygon(0 38%,100% 38%,80% 100%,20% 100%);background:#f7efe2;color:transparent;opacity:1}
  82%{transform:translate(calc(var(--dx) * .7 + 52vw),48vh) rotate(-2deg) scale(.33);clip-path:polygon(0 38%,100% 38%,80% 100%,20% 100%);background:#f7efe2;color:transparent;opacity:.8}
  100%{transform:translate(calc(var(--dx) + 76vw),50vh) rotate(2deg) scale(.26);clip-path:polygon(0 38%,100% 38%,80% 100%,20% 100%);background:#f7efe2;color:transparent;opacity:0}}
@keyframes ch-burn{
  0%{--burn:0%;transform:none;opacity:1}
  12%{--burn:0%;transform:rotate(calc(var(--rot) * .2)) translateY(-2px)}
  85%{--burn:100%;transform:rotate(calc(var(--rot) * .4)) translateY(-10px) scale(.97);opacity:1}
  100%{--burn:116%;transform:translateY(-16px) scale(.95);opacity:0}}
@keyframes ch-wind-away{
  0%{transform:none;opacity:1}
  18%{transform:translate(-2vw,0) rotate(calc(var(--rot) * -.6))}
  100%{transform:translate(calc(110vw + var(--dx) * .3),calc(-20vh + var(--dx) * .2)) rotate(calc(var(--rot) * 12)) scale(.6);opacity:0;filter:blur(3px)}}
@keyframes ch-rain-away{
  0%{transform:none;opacity:1;filter:blur(0);color:#3b2e29}
  40%{filter:blur(1.5px);color:rgba(59,46,41,.45)}
  75%{transform:translateY(6vh) scaleY(1.08);filter:blur(5px);color:transparent;opacity:.6}
  100%{transform:translateY(16vh) scaleY(1.25);filter:blur(10px);color:transparent;opacity:0}}
@keyframes ch-glow{0%{opacity:0}25%{opacity:1}80%{opacity:.8}100%{opacity:0}}
@keyframes ch-ember{0%{transform:translate(0,0);opacity:0}10%{opacity:1}100%{transform:translate(var(--ex,0),-46vh);opacity:0}}
@keyframes ch-gust{from{transform:translateX(0)}to{transform:translateX(260vw)}}
@keyframes ch-leaf{0%{transform:translate(0,0) rotate(0);opacity:0}10%{opacity:.8}100%{transform:translate(115vw,-12vh) rotate(540deg);opacity:0}}
@keyframes ch-rainfall{from{background-position:0 0}to{background-position:-26px 120px}}
@keyframes ch-fade-in{from{opacity:0}to{opacity:1}}
@keyframes ch-born{0%{transform:translateY(40vh) scale(.2);opacity:0;box-shadow:0 0 0 0 rgba(255,236,190,0)}55%{transform:translateY(0) scale(calc(var(--s,1) * 1.9));opacity:1;box-shadow:0 0 40px 18px rgba(255,236,190,.9)}100%{transform:scale(var(--s,1));box-shadow:0 0 14px 4px rgba(255,236,190,.55)}}
@keyframes ch-keep{
  0%{transform:none}
  60%{transform:translate(12vw,-26vh) scale(.12);border-radius:50%;background:#fff6d8;color:transparent;box-shadow:0 0 34px 14px rgba(255,240,200,.8)}
  100%{transform:translate(18vw,-38vh) scale(.08);border-radius:50%;background:#fff6d8;color:transparent;box-shadow:0 0 24px 10px rgba(255,240,200,.9)}}
@keyframes ch-shimmer{from{transform:translateX(0)}to{transform:translateX(250vw)}}
@keyframes ch-cloudmove{from{transform:translateX(-10vw)}to{transform:translateX(30vw)}}
@keyframes ch-hint{0%{opacity:0}12%{opacity:.8}75%{opacity:.8}100%{opacity:0}}
@keyframes ch-bubble{0%{opacity:0;transform:translateY(6px)}15%{opacity:1;transform:none}80%{opacity:1}100%{opacity:0}}
@keyframes ch-breath{0%,100%{transform:scale(.82);opacity:.55}40%{transform:scale(1.12);opacity:.95}}
@keyframes ch-wave{0%,100%{transform:translateY(0)}40%{transform:translateY(-14px)}}
@keyframes ch-sway{0%,100%{transform:scaleX(1)}40%{transform:scaleX(1.12)}}
@keyframes ch-line-in{from{opacity:0;filter:blur(3px)}to{opacity:1;filter:blur(0)}}
@keyframes ch-fade-out{0%{opacity:0}25%{opacity:1}100%{opacity:0}}

@media (max-width:600px){
  .ch-hide-sm{display:none}
  .ch-top{padding:12px}
  .ch-switch button{padding:7px 11px}
  .ch-cardgrid{grid-template-columns:1fr}
  .ch-where{display:none}
  .ch-rituals{grid-template-columns:1fr 1fr}
  .ch-steps{font-size:11px}
  .ch-moods{gap:6px}
  .ch-mood{width:76px}
  .ch-mixer li,.ch-master{grid-template-columns:120px 1fr}
}
/* Reduced motion: keep the meaning (text, fades), drop the movement. */
.ch-root.is-reduced{animation-duration:.01s}
.is-reduced .ch-card,.is-reduced .ch-one-keep{animation:ch-fade-out 1.2s ease forwards!important;-webkit-mask-image:none!important;mask-image:none!important}
.is-reduced .ch-ember,.is-reduced .ch-wind span,.is-reduced .ch-wind i,.is-reduced .ch-rainfall,.is-reduced .ch-memstar.is-born{animation:none!important}
.is-reduced .ch-orb,.is-reduced .ch-waves path,.is-reduced .ch-calm-curtain,.is-reduced .ch-starfield span,.is-reduced .ch-memstar,
.is-reduced .ch-moon,.is-reduced .ch-river span,.is-reduced .ch-clouds span{animation:none!important}
.is-reduced .ch-screen,.is-reduced .ch-line{animation-duration:.4s}
`
