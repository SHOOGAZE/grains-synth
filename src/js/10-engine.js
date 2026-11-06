/* ---------------- granular engine ---------------- */
var hold=false,octave=0,touching=0,next=0,lastTick=0,wasActive=false,relUntil=0,frozen=false;
var held=new Map(),grains=[],M={},modPrev={};
var lfoPh=[0,0],lfoSH=[0,0],lfoV=[0,0];
var seq={run:false,len:8,on:[1,0,1,1,0,1,0,1,1,0,1,1,0,1,1,0],n:[0,0,7,12,0,5,0,3,0,0,7,12,0,5,3,0]};
var gest={ev:[],len:0,yk:'spray',rec:0,play:0,t0:0,tp:0,idx:0,down:0};
var midi={acc:null,learn:false,learnK:null,bend:0,sus:false,map:{1:'pos',74:'cut',71:'res',72:'size',73:'dens',91:'verb',93:'delay',10:'width',7:'level'}};
var evs=[],stepping=false,stepT=0,stepI=0;
if(SYS.seq&&SYS.seq.on&&SYS.seq.n){
  seq.len=clamp(SYS.seq.len|0,2,16)||8;
  for(var si=0;si<16;si++){if(SYS.seq.on[si]!==undefined)seq.on[si]=SYS.seq.on[si]?1:0;if(typeof SYS.seq.n[si]==='number')seq.n[si]=clamp(Math.round(SYS.seq.n[si]),-12,12)}
}
if(SYS.map)midi.map=SYS.map;
if(SYS.gest&&SYS.gest.ev&&SYS.gest.ev.length>1){gest.ev=SYS.gest.ev;gest.len=SYS.gest.len||1;gest.yk=D[SYS.gest.yk]?SYS.gest.yk:'spray'}

function isActive(){return hold||midi.sus||frozen||held.size>0||touching>0||seq.run||!!gest.down}

/* values with the LFOs added on top of the knobs */
function fromNf(k,n){var d=D[k];return d.kind==='exp'?d.min*Math.pow(d.max/d.min,n):d.min+n*(d.max-d.min)}
function eff(k){
  var m=M[k];
  if(m===undefined)return P[k];
  if(k==='pos')return frozen?P.pos:((P.pos+m)%1+1)%1;
  return fromNf(k,clamp(toN(k,P[k])+m,0,1));
}
function applyEff(k,now){
  if(k==='cut')lp.frequency.setTargetAtTime(eff('cut'),now,.03);
  else if(k==='dens'||k==='size')bus.gain.setTargetAtTime(.9/Math.sqrt(Math.max(1,eff('dens')*eff('size'))),now,.04);
}
function lfoTick(dt,now){
  var cur={},keys={},i,n,f,dep,np,sh,v,k;
  for(i=0;i<2;i++){
    n=i+1;f=P['l'+n+'rate'];dep=P['l'+n+'depth'];np=lfoPh[i]+f*dt;
    if(np>=1){np-=Math.floor(np);lfoSH[i]=Math.random()*2-1}
    lfoPh[i]=np;sh=P['l'+n+'shape'];
    v=sh===0?Math.sin(np*6.2831853):sh===1?1-4*Math.abs(((np+.25)%1)-.5):sh===2?(np<.5?1:-1):sh===3?2*np-1:lfoSH[i];
    lfoV[i]=v;
    if(dep>.001){k=TGT[P['l'+n+'tgt']];cur[k]=(cur[k]||0)+v*dep*.5}
  }
  M=cur;
  for(k in cur)keys[k]=1;
  for(k in modPrev)keys[k]=1;
  for(k in keys)applyEff(k,now);
  modPrev=cur;
}

/* arpeggiator and sequencer: step events are scheduled slightly ahead, grains look up the event they belong to */
var DIVS=[4,8,16,32];
function arpList(){
  var a=Array.from(held.values()),out=[],o;
  if(!a.length)return out;
  if(P.amode!==4)a.sort(function(x,y){return x-y});
  for(o=0;o<P.aoct;o++)a.forEach(function(n){out.push(n+12*o)});
  if(P.amode===1)out.reverse();
  else if(P.amode===2&&out.length>2)out=out.concat(out.slice(1,-1).reverse());
  return out;
}
function evAt(t){
  var i;
  for(i=evs.length-1;i>=0;i--)if(evs[i].t<=t+1e-4)return evs[i];
  return null;
}
function stepTick(now){
  var on=seq.run||(P.aon>0&&held.size>0),sd,ev,i,l,tr;
  if(!on){stepping=false;return}
  sd=60/P.bpm*4/DIVS[P.div];
  if(!stepping){stepping=true;stepT=now+.03;stepI=0;evs.length=0}
  while(stepT<now+.12){
    ev={t:stepT,gate:Math.max(.02,sd*P.agate),notes:null,i:-1};
    if(seq.run){
      i=stepI%seq.len;ev.i=i;
      if(seq.on[i]){tr=held.size?Math.min.apply(null,Array.from(held.values())):0;ev.notes=[quant(seq.n[i]+tr)]}
    }else{
      l=arpList();
      if(l.length)ev.notes=[l[P.amode===3?(Math.random()*l.length)|0:stepI%l.length]];
    }
    evs.push(ev);if(evs.length>48)evs.shift();
    if(ev.notes)spawn(ev.t,ev.notes);
    stepT+=sd;stepI++;
  }
}

/* recorded finger movement on the PLAY surface, replayed in a loop */
function setYFromSurface(k,n){
  if(k==='pitch')setParam('pitch',quant(Math.round(fromN('pitch',n))),true);
  else setParamN(k,n,true);
}
function gestTick(now){
  var ev=gest.ev,n=ev.length,t,i,a,b,f,x,y;
  if(!gest.play||n<2||!ctx){gest.down=0;return}
  t=(now-gest.tp)%gest.len;
  if(t>=ev[n-1].t){gest.down=0;return}
  i=gest.idx;
  if(i>=n-1||ev[i].t>t)i=0;
  while(i<n-2&&ev[i+1].t<=t)i++;
  gest.idx=i;a=ev[i];b=ev[i+1];
  gest.down=a.d?1:0;
  if(a.d&&touching===0){
    f=(b.d&&b.t>a.t)?clamp((t-a.t)/(b.t-a.t),0,1):0;
    x=a.x+(b.x-a.x)*f;y=a.y+(b.y-a.y)*f;
    setParam('pos',x,true);setYFromSurface(gest.yk,1-y);
  }
}
function gUI(){
  var r=$('#gRec'),l=$('#gLoop'),i=$('#gInfo');
  r.textContent=gest.rec===2?'■ STOP':gest.rec===1?'ARMED':'● REC';
  r.classList.toggle('rec',gest.rec===2);r.classList.toggle('on',gest.rec===1);
  l.textContent=gest.play?'■ LOOP':'▶ LOOP';l.classList.toggle('on',!!gest.play);
  i.textContent=gest.ev.length>1?'Gesture · '+gest.len.toFixed(1)+'s':'No gesture';
}
function gStartRec(k){gest.rec=2;gest.ev=[];gest.yk=k;gest.play=0;gest.down=0;gest.t0=performance.now()/1000;gUI()}
function gPush(x,y,d){
  if(gest.rec!==2)return;
  var t=performance.now()/1000-gest.t0;
  gest.ev.push({t:+t.toFixed(3),x:+x.toFixed(3),y:+y.toFixed(3),d:d});
  if(t>20)gStopRec();
}
function gStopRec(){
  var n=gest.ev.length,l;
  if(gest.rec!==2){gest.rec=0;gUI();return}
  gest.rec=0;
  if(n>1){
    l=gest.ev[n-1];
    if(l.d){gest.ev.push({t:+(l.t+.02).toFixed(3),x:l.x,y:l.y,d:0});l=gest.ev[n]}
    gest.len=Math.max(.4,l.t+.15);gest.play=1;gest.tp=ctx?ctx.currentTime:0;gest.idx=0;
  }else{gest.ev=[]}
  sysSave();gUI();
}

function tick(){
  if(!ctx||!buf)return;
  var now=ctx.currentTime,dt=Math.min(.1,now-lastTick||.025),act,dz;
  lastTick=now;
  gestTick(now);
  lfoTick(dt,now);
  stepTick(now);
  act=isActive();
  if(act!==wasActive){
    wasActive=act;
    gate.gain.cancelScheduledValues(now);
    if(act){gate.gain.setTargetAtTime(1,now,P.atk/3)}
    else{gate.gain.setTargetAtTime(0,now+.02,P.rel/3);relUntil=now+P.rel*1.5}
  }
  if(!act&&now>relUntil){next=now;return}
  if(act&&!frozen&&P.scan!==0){dz=Math.abs(P.scan)<.05?0:P.scan;if(dz)setParam('pos',(((P.pos+dz*.15*dt)%1)+1)%1,true)}
  if(next<now)next=now;
  while(next<now+.12){spawn(next);next+=(1/eff('dens'))*(.85+Math.random()*.3)}
}
function spawn(t,forced){
  var dur=buf.duration,notes,ev,nn,semi,rate,size,off,isRev,o,s,g,p,w=reg.b-reg.a;
  if(forced)notes=forced;
  else if(stepping){
    ev=evAt(t);
    if(!ev||!ev.notes||t-ev.t>ev.gate)return;
    notes=ev.notes;
  }else notes=held.size?Array.from(held.values()):[0];
  nn=notes[(Math.random()*notes.length)|0]+octave*12;
  semi=eff('pitch')+nn+midi.bend+(Math.random()*2-1)*P.detune/100;
  rate=Math.pow(2,semi/12);size=eff('size');
  off=eff('pos')+(Math.random()*2-1)*eff('spray')*.25;
  off=((off%1)+1)%1;
  isRev=Math.random()<eff('rev');
  o=(reg.a+off*w)*dur;
  if(isRev)o=dur-o;
  o=clamp(o,0,dur-.002);
  s=ctx.createBufferSource();
  s.buffer=isRev?rbuf:buf;
  s.playbackRate.value=rate;
  g=ctx.createGain();g.gain.value=0;
  p=ctx.createStereoPanner();p.pan.value=(Math.random()*2-1)*eff('width');
  g.gain.setValueCurveAtTime(win,t,size);
  s.connect(g);g.connect(p);p.connect(bus);
  s.start(t,o,size*rate+.01);
  s.onended=function(){try{p.disconnect();g.disconnect()}catch(e){}};
  grains.push({t:t,pos:off,w:size*rate/(dur*Math.max(.001,w)),y:Math.random()});
}

