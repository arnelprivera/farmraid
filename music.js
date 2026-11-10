// background music: a looping chiptune made live with Web Audio (no audio files)
(function(){
let ctx,master,timer,on=false,step=0,next=0;
const hz=n=>440*Math.pow(2,(n-69)/12),E=60/96/2;
const bass=[48,45,53,55],arp=[[60,64,67,72],[57,60,64,69],[57,60,65,69],[59,62,67,71]],pat=[0,1,2,3,2,1,2,1],
mel=[[76,0,79,0,76,0,72,0],[76,0,74,72,0,0,69,0],[72,0,77,0,76,74,72,0],[74,0,0,71,74,0,67,0]];
function tone(n,t,d,type,v){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=hz(n);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(master);o.start(t);o.stop(t+d+.05)}
function sched(){while(next<ctx.currentTime+.4){const s=step%32,bar=(s>>3)%4,i=s%8;
tone(arp[bar][pat[i]],next,E*1.6,'triangle',.5);
if(i==0||i==4)tone(bass[bar]-12,next,E*3,'triangle',.7);
if(mel[bar][i])tone(mel[bar][i],next,E*2.2,'square',.16);
next+=E;step++}}
function start(){if(!ctx){ctx=new (window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();master.gain.value=0;master.connect(ctx.destination)}
ctx.resume().catch(()=>{});clearInterval(timer);next=ctx.currentTime+.1;master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setValueAtTime(master.gain.value,ctx.currentTime);master.gain.linearRampToValueAtTime(.22,ctx.currentTime+1.5);timer=setInterval(sched,100)}
function stop(){if(!ctx)return;master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setValueAtTime(master.gain.value,ctx.currentTime);master.gain.linearRampToValueAtTime(0,ctx.currentTime+.5);clearInterval(timer);setTimeout(()=>{if(!on)ctx.suspend()},600)}
const evs=['pointerdown','keydown','touchend','click'];
function go(){if(on)return;on=true;start();evs.forEach(e=>removeEventListener(e,go,true))}
evs.forEach(e=>addEventListener(e,go,true));
try{start();setTimeout(()=>{if(ctx.state=='running'&&!on){on=true;evs.forEach(e=>removeEventListener(e,go,true))}},300)}catch(e){}
document.addEventListener('visibilitychange',()=>{if(!on||!ctx)return;if(document.hidden){clearInterval(timer);ctx.suspend()}else start()});
})();
