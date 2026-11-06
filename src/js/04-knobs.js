/* ---------------- knobs ---------------- */
function arc(a0,a1,r){
  if(a1-a0<.6)return '';
  var p=function(a){var t=a*Math.PI/180;return [(32+r*Math.sin(t)).toFixed(2),(32-r*Math.cos(t)).toFixed(2)]};
  var s=p(a0),e=p(a1);
  return 'M'+s[0]+' '+s[1]+'A'+r+' '+r+' 0 '+((a1-a0)>180?1:0)+' 1 '+e[0]+' '+e[1];
}
var knobs={};
function makeKnob(d){
  var el=document.createElement('div');el.className='knob';el.tabIndex=0;
  el.innerHTML='<svg viewBox="0 0 64 64"><circle class="cap" cx="32" cy="32" r="16"/><line class="ind" x1="32" y1="32" x2="32" y2="20"/></svg><div class="lbl"></div><div class="vv"></div>';
  var ind=$('.ind',el),svg=$('svg',el),cap=$('.cap',el),dots=[],di,dc,da,NS='http://www.w3.org/2000/svg';
  /* the value ring is made of 21 grains: lit up to the value, from zero for bipolar params */
  for(di=0;di<21;di++){
    da=(-135+270*di/20)*Math.PI/180;
    dc=document.createElementNS(NS,'circle');dc.setAttribute('class','dot');
    dc.setAttribute('cx',(32+25*Math.sin(da)).toFixed(2));dc.setAttribute('cy',(32-25*Math.cos(da)).toFixed(2));
    dc.setAttribute('r',di%5===0?'2.2':'1.5');
    svg.insertBefore(dc,cap);dots.push(dc);
  }
  $('.lbl',el).textContent=d.label;
  var vv=$('.vv',el);
  var K={el:el,update:function(){
    var n=clamp(toN(d.k,P[d.k]),0,1),a=-135+270*n;
    var z=(d.min<0&&d.max>0)?clamp(toN(d.k,0),0,1):0,ni=n*20,zi=z*20,lo=Math.min(ni,zi),hi=Math.max(ni,zi),i,on;
    for(i=0;i<21;i++){
      on=i>=lo-.01&&i<=hi+.01;
      if(z===0&&ni<.5&&i===0)on=false;
      dots[i].setAttribute('class','dot'+(on?' on':''));
    }
    var t=a*Math.PI/180;
    ind.setAttribute('x2',(32+13*Math.sin(t)).toFixed(2));
    ind.setAttribute('y2',(32-13*Math.cos(t)).toFixed(2));
    var vs=d.fmt(P[d.k]);if(vv.textContent!==vs)vv.textContent=vs;
  }};
  var sy=0,sn=0,moved=false,lastTap=0;
  el.addEventListener('pointerdown',function(e){
    e.preventDefault();
    if(midi.learn){midi.learnK=d.k;toast('Move a MIDI controller');return}
    pushUndo();el.setPointerCapture(e.pointerId);sy=e.clientY;sn=toN(d.k,P[d.k]);moved=false;
  });
  el.addEventListener('pointermove',function(e){
    if(!el.hasPointerCapture(e.pointerId))return;
    var dy=sy-e.clientY;if(Math.abs(dy)>2)moved=true;
    setParam(d.k,fromN(d.k,sn+dy/200));
  });
  el.addEventListener('pointerup',function(){
    if(moved)return;
    var now=performance.now();
    if(now-lastTap<320){setParam(d.k,d.def);lastTap=0}else lastTap=now;
  });
  el.addEventListener('keydown',function(e){
    var s=e.key==='ArrowUp'||e.key==='ArrowRight'?.02:e.key==='ArrowDown'||e.key==='ArrowLeft'?-.02:0;
    if(s){setParam(d.k,fromN(d.k,toN(d.k,P[d.k])+s));e.preventDefault()}
  });
  knobs[d.k]=K;K.update();
  return el;
}
$$('.kgrid').forEach(function(g){var ks=g.dataset.k.split(',');g.style.setProperty('--n',ks.length);ks.forEach(function(k){g.appendChild(makeKnob(D[k]))})});

function setParam(k,v,quiet,force){
  var d=D[k];
  if(k==='pos'&&frozen&&!force)return;
  v=clamp(v,d.min,d.max);
  P[k]=v;
  if(knobs[k])knobs[k].update();
  apply(k);
  if(d.ui)d.ui();
  if(d.sys)sysSave();
  if(!quiet)readout(d.label,d.fmt(v));
}
var sysT=0;
function sysSave(){
  clearTimeout(sysT);
  sysT=setTimeout(function(){
    store('grains.sys.v1',{bpm:P.bpm,sroot:P.sroot,stype:P.stype,seq:{len:seq.len,on:seq.on,n:seq.n},map:midi.map,gest:gest.ev.length>1?{ev:gest.ev,len:gest.len,yk:gest.yk}:null});
  },400);
}
function setParamN(k,n,quiet){setParam(k,fromN(k,n),quiet)}

