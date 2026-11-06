/* ---------------- sample editor: finger-controlled region, zoom, selection ---------------- */
var prevSrc=null;
function zeroX(p){
  var x=smp.ch[0],N=x.length,i0=Math.round(p*(N-1)),R=Math.floor(smp.rate*.008),d,j;
  for(d=0;d<=R;d++){
    j=i0-d;if(j>=1&&j<N&&x[j-1]*x[j]<=0)return j/(N-1);
    j=i0+d;if(j>=1&&j<N&&x[j-1]*x[j]<=0)return j/(N-1);
  }
  return p;
}
function regChanged(){computePeaks();edInfoUpdate()}
function audition(a,b,maxd){
  if(!ctx||!buf)return;
  var s=ctx.createBufferSource(),gn=ctx.createGain(),t=ctx.currentTime,dur=buf.duration;
  s.buffer=buf;gn.gain.setValueAtTime(0,t);gn.gain.linearRampToValueAtTime(.8,t+.006);
  s.connect(gn);gn.connect(ctx.destination);
  s.start(t,a*dur,Math.max(.03,Math.min(maxd||.5,(b-a)*dur)));
}
function drawEdit(){
  var cv=$('#cvEdit');fitCv(cv);
  var g=cv.getContext('2d'),W=cv.width,H=cv.height,d=W/Math.max(1,cv.clientWidth),oy=Math.round(16*d),ih=H-oy-Math.round(4*d),cy=oy+ih/2,ox=Math.round(5*d),w=W-2*ox;
  var ink='rgb('+ACC.r+','+ACC.g+','+ACC.b+')',i,j,v,mn,mx,st,en,step;
  g.fillStyle='#070707';g.fillRect(0,0,W,H);
  g.fillStyle='#171717';g.fillRect(0,Math.round(cy),W,1);
  if(micRec){
    var r=micRec,nb=Math.floor(w/(3*d)),from=Math.max(0,r.lv.length-nb),bh;
    g.fillStyle=ink;
    for(i=from;i<r.lv.length;i++){bh=Math.max(2*d,Math.min(1,r.lv[i]*1.4)*ih);g.fillRect(ox+(i-from)*3*d,cy-bh/2,2*d,bh)}
    g.font='700 '+Math.round(11*d)+'px sans-serif';g.textBaseline='middle';g.textAlign='right';
    g.fillText(fmtClock((performance.now()-r.t0)/1000)+' / 0:30',W-ox,8*d);
    return;
  }
  if(!smp)return;
  var x=smp.ch[0],N=x.length,v0=edView.v0,v1=edView.v1,span=Math.max(1e-6,v1-v0),per=span*N/w;
  var X=function(p){return (p-v0)/span*w};
  g.save();g.translate(ox,0);
  g.fillStyle='#cfcfcf';
  for(i=0;i<w;i++){
    st=Math.floor(v0*N+i*per);en=Math.min(N,Math.max(st+1,Math.floor(v0*N+(i+1)*per)));
    mn=1;mx=-1;step=Math.max(1,(en-st)>>4);
    for(j=st;j<en;j+=step){v=x[j];if(v<mn)mn=v;if(v>mx)mx=v}
    if(mn>mx){mn=mx=0}
    g.fillRect(i,cy-mx*ih*.5,1,Math.max(1,(mx-mn)*ih*.5));
  }
  /* outside the loop region */
  var xa=X(reg.a),xb=X(reg.b);
  g.fillStyle='rgba(0,0,0,.66)';
  if(xa>0)g.fillRect(0,oy,Math.min(w,xa),ih);
  if(xb<w)g.fillRect(Math.max(0,xb),oy,w-Math.max(0,xb),ih);
  /* spray window and playhead */
  var pp=reg.a+eff('pos')*(reg.b-reg.a),sp=eff('spray')*.25*(reg.b-reg.a);
  g.fillStyle='rgba('+ACC.r+','+ACC.g+','+ACC.b+',.12)';g.fillRect(X(pp-sp),oy,Math.max(1,(X(pp+sp)-X(pp-sp))),ih);
  g.fillStyle=isActive()?ink:'#8c8c8c';
  var hx=X(pp);for(i=0;i<ih;i+=Math.round(6*d))g.fillRect(hx-d,oy+i,2*d,Math.round(3.5*d));
  /* handles with time labels */
  var dur=N/smp.rate,fs=Math.round(10*d);
  g.font='700 '+fs+'px sans-serif';g.textBaseline='middle';
  var handle=function(p,isB){
    var xx=X(p),tx,tw,side;
    if(xx<-20*d||xx>w+20*d)return;
    g.fillStyle=ink;g.fillRect(xx-d,oy-2*d,2*d,ih+4*d);
    g.beginPath();if(g.roundRect)g.roundRect(xx-(isB?14:2)*d,0,16*d,13*d,4*d);else g.rect(xx-(isB?14:2)*d,0,16*d,13*d);g.fill();
    tx=(p*dur).toFixed(span<.25?3:2)+'s';tw=g.measureText(tx).width;side=isB?1:-1;
    if(side<0&&xx-tw-16*d<-ox*.6)side=1;
    if(side>0&&xx+tw+16*d>w+ox*.6)side=-1;
    g.textAlign=side>0?'left':'right';
    g.fillText(tx,xx+(side>0?(isB?16:18):-(isB?18:16))*d,7*d);
  };
  handle(reg.a,false);handle(reg.b,true);
  if(span<.995){g.textAlign='right';g.fillStyle=ink;g.globalAlpha=.7;g.fillText('×'+(1/span).toFixed(span<.1?0:1),w-2*d,H-7*d);g.globalAlpha=1}
  g.restore();
}
function wireEdit(){
  var cv=$('#cvEdit'),Pm=new Map(),g=null,lastTap=0,OX=5;
  var W=function(){return Math.max(1,cv.getBoundingClientRect().width-2*OX)};
  var posAt=function(px){var r=cv.getBoundingClientRect();return clamp(edView.v0+(edView.v1-edView.v0)*((px-r.left-OX)/W()),0,1)};
  var pxOf=function(p){var r=cv.getBoundingClientRect();return r.left+OX+(p-edView.v0)/(edView.v1-edView.v0)*W()};
  var snapP=function(p){return edSnap&&smp?zeroX(p):p};
  var mg=function(){return smp?64/smp.ch[0].length:.001};
  cv.addEventListener('pointerdown',function(e){
    if(!smp||micRec)return;
    e.preventDefault();try{cv.setPointerCapture(e.pointerId)}catch(x){}
    Pm.set(e.pointerId,{x:e.clientX});
    if(Pm.size>=2){
      var ps=Array.from(Pm.values());
      g={m:'pinch',d0:Math.abs(ps[0].x-ps[1].x)||1,span0:edView.v1-edView.v0,anchor:posAt((ps[0].x+ps[1].x)/2)};
      return;
    }
    pushUndo();
    var da=Math.abs(e.clientX-pxOf(reg.a)),db=Math.abs(e.clientX-pxOf(reg.b));
    if(Math.min(da,db)<26)g={m:da<=db?'a':'b'};
    else g={m:'sel',x0:e.clientX,p0:posAt(e.clientX),moved:false};
  });
  cv.addEventListener('pointermove',function(e){
    if(!Pm.has(e.pointerId)||!g)return;
    Pm.get(e.pointerId).x=e.clientX;
    if(g.m==='pinch'&&Pm.size>=2){
      var ps=Array.from(Pm.values()),dd=Math.abs(ps[0].x-ps[1].x)||1,cx=(ps[0].x+ps[1].x)/2,r=cv.getBoundingClientRect();
      var ns=clamp(g.span0*g.d0/dd,Math.max(128/smp.ch[0].length,1e-5),1),f=clamp((cx-r.left-OX)/W(),0,1),a=clamp(g.anchor-f*ns,0,1-ns);
      edView.v0=a;edView.v1=a+ns;return;
    }
    if(g.m==='a'){reg.a=Math.max(0,Math.min(snapP(posAt(e.clientX)),reg.b-mg()));regChanged()}
    else if(g.m==='b'){reg.b=Math.min(1,Math.max(snapP(posAt(e.clientX)),reg.a+mg()));regChanged()}
    else if(g.m==='sel'){
      if(!g.moved&&Math.abs(e.clientX-g.x0)<7)return;
      g.moved=true;
      var q=posAt(e.clientX),a=snapP(Math.min(g.p0,q)),b=snapP(Math.max(g.p0,q));
      if(b-a<mg())b=Math.min(1,a+mg());
      reg.a=a;reg.b=b;regChanged();
    }
  });
  function end(e){
    if(!Pm.has(e.pointerId))return;
    Pm.delete(e.pointerId);
    if(!g)return;
    var gg=g,now;
    if(gg.m==='pinch'){if(Pm.size<2)g={m:'none'};return}
    if(Pm.size>0)return;
    g=null;
    if(gg.m==='a')audition(reg.a,reg.b);
    else if(gg.m==='b')audition(Math.max(reg.a,reg.b-.35),reg.b);
    else if(gg.m==='sel'){
      if(gg.moved)audition(reg.a,reg.b);
      else{
        now=performance.now();
        if(now-lastTap<330){edView.v0=0;edView.v1=1;lastTap=0}
        else{
          lastTap=now;
          if(gg.p0>=reg.a&&gg.p0<=reg.b)setParam('pos',(gg.p0-reg.a)/Math.max(1e-6,reg.b-reg.a),true);
        }
      }
    }
  }
  cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);
  cv.addEventListener('wheel',function(e){
    if(!smp)return;
    e.preventDefault();
    var span=edView.v1-edView.v0,a=posAt(e.clientX),f=(a-edView.v0)/span,ns=clamp(span*(e.deltaY>0?1.2:1/1.2),Math.max(128/smp.ch[0].length,1e-5),1),v0=clamp(a-f*ns,0,1-ns);
    edView.v0=v0;edView.v1=v0+ns;
  },{passive:false});
}
/* destructive edits: new arrays, old ones stay in the undo stack */
function edOp(fn,msg,keep,mirror){
  if(!smp)return;
  var ch=fn(smp.ch),t;
  if(!ch)return;
  pushUndo(true);
  setSample(ch,smp.rate,smp.name,keep);
  if(mirror){t=reg.a;reg.a=1-reg.b;reg.b=1-t;regChanged()}
  toast(msg);
}
function buildEditor(){
  var box=$('#edTools');
  function btn(label,fn,cls){
    var b=document.createElement('button');b.type='button';b.className='chip sm'+(cls?' '+cls:'');b.textContent=label;
    b.addEventListener('click',function(){fn(b)});box.appendChild(b);return b;
  }
  btn('PREVIEW',function(b){
    if(prevSrc){try{prevSrc.stop()}catch(e){}prevSrc=null;b.textContent='PREVIEW';return}
    if(!ctx||!buf)return;
    var s=ctx.createBufferSource(),gn=ctx.createGain(),d=buf.duration;
    s.buffer=buf;gn.gain.value=.8;s.connect(gn);gn.connect(ctx.destination);
    s.start(0,reg.a*d,Math.max(.03,(reg.b-reg.a)*d));prevSrc=s;b.textContent='■ STOP';
    s.onended=function(){if(prevSrc===s){prevSrc=null;b.textContent='PREVIEW'}};
  });
  btn('CROP',function(){
    edOp(function(ch){
      var L=ch[0].length,a=Math.floor(reg.a*L),b=Math.max(a+64,Math.floor(reg.b*L));
      if(a<=0&&b>=L){toast('Nothing to crop');return null}
      return ch.map(function(c){return c.slice(a,b)});
    },'Cropped',false);
  });
  btn('REMOVE',function(){
    edOp(function(ch){
      var L=ch[0].length,a=Math.floor(reg.a*L),b=Math.floor(reg.b*L);
      if(b-a<2||L-(b-a)<64){toast('Select a smaller region to cut');return null}
      return ch.map(function(c){var o=new Float32Array(c.length-(b-a));o.set(c.subarray(0,a));o.set(c.subarray(b),a);return o});
    },'Removed',false);
  });
  btn('TRIM SIL.',function(){
    edOp(function(ch){
      var th=.003,L=ch[0].length,f=L,l=-1,i,m=Math.floor(smp.rate*.005);
      ch.forEach(function(c){
        for(i=0;i<c.length;i++)if(Math.abs(c[i])>th){if(i<f)f=i;break}
        for(i=c.length-1;i>=0;i--)if(Math.abs(c[i])>th){if(i>l)l=i;break}
      });
      f=Math.max(0,f-m);l=Math.min(L-1,l+m);
      if(l<f||(f===0&&l===L-1)||l-f<64){toast('Nothing to trim');return null}
      return ch.map(function(c){return c.slice(f,l+1)});
    },'Silence trimmed',false);
  });
  btn('FULL',function(){pushUndo(true);reg.a=0;reg.b=1;edView.v0=0;edView.v1=1;regChanged()});
  btn('NORMALIZE',function(){
    edOp(function(ch){
      var pk=0,i,g;
      ch.forEach(function(c){for(i=0;i<c.length;i++){var v=Math.abs(c[i]);if(v>pk)pk=v}});
      if(pk<=0)return null;
      g=.95/pk;return ch.map(function(c){return c.map(function(x){return x*g})});
    },'Normalized',true);
  });
  btn('GAIN -',function(){edOp(function(ch){var g=Math.pow(10,-3/20);return ch.map(function(c){return c.map(function(x){return x*g})})},'-3 dB',true)});
  btn('GAIN +',function(){edOp(function(ch){var g=Math.pow(10,3/20);return ch.map(function(c){return c.map(function(x){return Math.max(-1,Math.min(1,x*g))})})},'+3 dB',true)});
  btn('REVERSE',function(){edOp(function(ch){return ch.map(function(c){return c.slice().reverse()})},'Reversed',true,true)});
  btn('FADE IN',function(){
    edOp(function(ch){return ch.map(function(c){var o=c.slice(),n=Math.min(o.length,Math.floor(smp.rate*.08)),i;for(i=0;i<n;i++)o[i]*=i/n;return o})},'Faded',true);
  });
  btn('FADE OUT',function(){
    edOp(function(ch){return ch.map(function(c){var o=c.slice(),n=Math.min(o.length,Math.floor(smp.rate*.08)),i;for(i=0;i<n;i++)o[o.length-1-i]*=i/n;return o})},'Faded',true);
  });
  var sn=btn('SNAP',function(b){edSnap=!edSnap;b.classList.toggle('on',edSnap)},'on');
  wireEdit();
}

