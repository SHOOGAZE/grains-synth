/* ---------------- LFO and sequencer drawing ---------------- */
function lfoShapeV(sh,ph,n){
  if(sh===0)return Math.sin(ph*6.2831853);
  if(sh===1)return 1-4*Math.abs(((ph+.25)%1)-.5);
  if(sh===2)return ph<.5?1:-1;
  if(sh===3)return 2*ph-1;
  var s=Math.sin((Math.floor(ph*8)+1)*12.9898+n*78.233)*43758.5453;
  return (s-Math.floor(s))*2-1;
}
function drawLfo(){
  [1,2].forEach(function(n){
    var cv=$('#lfoCv'+n);fitCv(cv);
    var g=cv.getContext('2d'),w=cv.width,h=cv.height,sh=P['l'+n+'shape'],dep=P['l'+n+'depth'],amp=(.4+.6*dep)*h*.38,x,y,ph=lfoPh[n-1],on=dep>.001;
    g.fillStyle='#070707';g.fillRect(0,0,w,h);
    g.fillStyle='#1b1b1b';g.fillRect(0,Math.round(h/2),w,1);
    g.strokeStyle=on?'rgb('+ACC.r+','+ACC.g+','+ACC.b+')':'#444';g.lineWidth=Math.max(1,w/260);g.beginPath();
    for(x=0;x<=w;x+=2){y=h/2-lfoShapeV(sh,x/w,n)*amp;if(x)g.lineTo(x,y);else g.moveTo(x,y)}
    g.stroke();
    if(on){
      x=ph*w;y=h/2-(sh===4?lfoShapeV(4,ph,n):lfoV[n-1])*amp;
      g.fillStyle='#fff';g.beginPath();g.arc(x,y,Math.max(3,w/90),0,6.2832);g.fill();
    }
  });
}
function drawSeq(){
  var cv=$('#cvSeq');fitCv(cv);
  var g=cv.getContext('2d'),W=cv.width,H=cv.height,cw=W/16,rh=H/25,c,r,n,x,yy,act,cur=-1,now=ctx?ctx.currentTime:0,i,btns=$$('#steps .step');
  g.fillStyle='#070707';g.fillRect(0,0,W,H);
  if(P.stype!==0){g.fillStyle='#111';for(r=0;r<25;r++){n=12-r;if(scaleSet[((n%12)+12)%12])g.fillRect(0,r*rh,W,rh)}}
  g.fillStyle='#262626';g.fillRect(0,12*rh+rh/2-1,W,1);
  if(seq.run)for(i=evs.length-1;i>=0;i--){if(evs[i].i>=0&&evs[i].t<=now){cur=evs[i].i;break}}
  for(c=0;c<16;c++){
    x=c*cw;act=c<seq.len;
    if(c===cur){g.fillStyle='rgba(255,255,255,.09)';g.fillRect(x,0,cw,H)}
    g.fillStyle=act?'#1b1b1b':'#0d0d0d';g.fillRect(x+cw-1,0,1,H);
    yy=(12-seq.n[c])*rh;
    g.fillStyle=!act?'#202020':seq.on[c]?'rgb('+ACC.r+','+ACC.g+','+ACC.b+')':'#3a3a3a';
    g.fillRect(x+cw*.15,yy+1,cw*.7,Math.max(2,rh-2));
    if(btns[c]){btns[c].classList.toggle('on',!!seq.on[c]&&act);btns[c].classList.toggle('dim',!act);btns[c].classList.toggle('cur',c===cur)}
  }
}
function wireSeq(){
  var cv=$('#cvSeq'),on=false;
  function paint(e){
    var r=cv.getBoundingClientRect(),c=clamp(Math.floor((e.clientX-r.left)/r.width*16),0,15),n=clamp(Math.round((.5-(e.clientY-r.top)/r.height)*24),-12,12);
    if(c>=seq.len)return;
    seq.n[c]=clamp(quant(n),-12,12);seq.on[c]=1;sysSave();
  }
  cv.addEventListener('pointerdown',function(e){e.preventDefault();try{cv.setPointerCapture(e.pointerId)}catch(x){};on=true;paint(e)});
  cv.addEventListener('pointermove',function(e){if(on)paint(e)});
  var up=function(){on=false};
  cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
}

