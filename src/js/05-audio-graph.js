/* ---------------- audio graph ---------------- */
var ctx=null,bus,lp,gate,master,dWet,vWet,dly,fb,ana,anaBuf,drvPre,drvPost,drvDry;
var buf=null,rbuf=null,peaks=null;
var win=new Float32Array(64);
function mkWin(){
  var s=P.shape,i,t,hann,rect,perc,v,k;
  for(i=0;i<64;i++){
    t=i/63;
    hann=Math.pow(Math.sin(Math.PI*t),2);
    rect=Math.min(1,t*8,(1-t)*8);
    perc=Math.min(1,t*40)*Math.pow(1-t,2.5)*2.2;
    if(s<.5){k=s*2;v=rect*(1-k)+hann*k}else{k=(s-.5)*2;v=hann*(1-k)+perc*k}
    win[i]=Math.min(1,v);
  }
  win[0]=0;win[63]=0;
}
mkWin();
function apply(k){
  if(k==='shape')mkWin();
  if(k==='sroot'||k==='stype')rebuildScale();
  if(!ctx)return;
  var t=ctx.currentTime;
  if(k==='dens'||k==='size')bus.gain.value=.9/Math.sqrt(Math.max(1,P.dens*P.size));
  else if(k==='cut')lp.frequency.setTargetAtTime(P.cut,t,.02);
  else if(k==='res')lp.Q.setTargetAtTime(P.res,t,.02);
  else if(k==='dtime')dly.delayTime.setTargetAtTime(P.dtime,t,.05);
  else if(k==='dfb')fb.gain.setTargetAtTime(P.dfb,t,.02);
  else if(k==='delay')dWet.gain.setTargetAtTime(P.delay*.8,t,.02);
  else if(k==='verb')vWet.gain.setTargetAtTime(P.verb,t,.02);
  else if(k==='level')master.gain.setTargetAtTime(P.level*P.level*1.2,t,.02);
  else if(k==='drive'){drvPre.gain.setTargetAtTime(1+P.drive*9,t,.02);drvPost.gain.setTargetAtTime(P.drive/(1+P.drive*2.2),t,.02);drvDry.gain.setTargetAtTime(1-P.drive*.6,t,.02)}
}
function startErr(t){$('#startErr').textContent=t}

function initAudio(){
  if(ctx){if(ctx.state!=='running')ctx.resume();return}
  try{if(navigator.audioSession)navigator.audioSession.type='playback'}catch(e){}
  var AC=window.AudioContext||window.webkitAudioContext;
  ctx=new AC({latencyHint:'interactive'});
  bus=ctx.createGain();
  lp=ctx.createBiquadFilter();lp.type='lowpass';
  gate=ctx.createGain();gate.gain.value=0;
  /* drive: soft-clip (tanh) run in parallel with the clean signal, so DRIVE 0 is fully transparent */
  drvPre=ctx.createGain();drvPost=ctx.createGain();drvDry=ctx.createGain();
  var shp=ctx.createWaveShaper(),crv=new Float32Array(2049),ci;
  for(ci=0;ci<2049;ci++){var cx=ci/1024-1;crv[ci]=Math.tanh(cx*2.2)/Math.tanh(2.2)}
  shp.curve=crv;shp.oversample='2x';
  master=ctx.createGain();
  var dry=ctx.createGain();
  dly=ctx.createDelay(2);
  var dlp=ctx.createBiquadFilter();dlp.type='lowpass';dlp.frequency.value=3200;
  fb=ctx.createGain();
  dWet=ctx.createGain();
  var conv=ctx.createConvolver();
  vWet=ctx.createGain();
  var comp=ctx.createDynamicsCompressor();
  comp.threshold.value=-10;comp.ratio.value=8;comp.attack.value=.005;comp.release.value=.2;
  ana=ctx.createAnalyser();ana.fftSize=1024;anaBuf=new Float32Array(ana.fftSize);
  var sr=ctx.sampleRate,len=Math.floor(sr*2.8),ir=ctx.createBuffer(2,len,sr),c,i,d;
  for(c=0;c<2;c++){d=ir.getChannelData(c);for(i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3)}
  conv.buffer=ir;
  bus.connect(lp);lp.connect(drvDry);drvDry.connect(gate);lp.connect(drvPre);drvPre.connect(shp);shp.connect(drvPost);drvPost.connect(gate);
  gate.connect(dry);dry.connect(master);
  gate.connect(dly);dly.connect(dlp);dlp.connect(fb);fb.connect(dly);dlp.connect(dWet);dWet.connect(master);
  gate.connect(conv);conv.connect(vWet);vWet.connect(master);
  /* safety limiter after the compressor: straight up to 0.8, then a soft knee, so nothing above full scale reaches the speakers or a recording */
  var lim=ctx.createWaveShaper(),lc=new Float32Array(2049),li,lx,la;
  for(li=0;li<2049;li++){lx=li/1024-1;la=Math.abs(lx);lc[li]=la<=.8?lx:(lx<0?-1:1)*(.8+.18*Math.tanh((la-.8)/.18))}
  lim.curve=lc;lim.oversample='2x';
  master.connect(comp);comp.connect(lim);lim.connect(ana);ana.connect(ctx.destination);
  initCapture(lim);
  DEFS.forEach(function(d){apply(d.k)});
  ctx.resume();
  setInterval(tick,25);
  if(!buf)makeDemo(0);
}


/* coming back from the background, a phone call or a locked screen: the browser may leave the audio context suspended or "interrupted"; wake it on return and on the next touch */
function wakeAudio(){if(ctx&&ctx.state!=='running'){try{var p=ctx.resume();if(p&&p.catch)p.catch(function(){})}catch(e){}}}
document.addEventListener('visibilitychange',function(){if(!document.hidden)wakeAudio()});
window.addEventListener('pageshow',wakeAudio);
document.addEventListener('pointerdown',wakeAudio,true);
