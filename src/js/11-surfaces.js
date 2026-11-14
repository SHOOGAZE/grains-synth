/* ---------------- surfaces (waveform canvases) ---------------- */
var yTarget='spray';
function bindSurf(cv,yk,rec){
  var on=false,lx=0,ly=0;
  function f(e){
    var r=cv.getBoundingClientRect(),x=clamp((e.clientX-r.left)/r.width,0,1),y=clamp((e.clientY-r.top)/r.height,0,1),k=yk();
    lx=x;ly=y;
    setParam('pos',x,true);setYFromSurface(k,1-y);
    l2.textContent=T('POSITION')+' '+fPct(P.pos)+'  '+T(D[k].label)+' '+D[k].fmt(P[k]);
    clearTimeout(roT);roT=setTimeout(function(){l2.textContent=presetName},1400);
    if(rec)gPush(x,y,1);
  }
  cv.addEventListener('pointerdown',function(e){
    try{cv.setPointerCapture(e.pointerId)}catch(x){}
    if(!on){on=true;touching++;pushUndo();if(rec&&gest.rec===1)gStartRec(yk())}
    f(e);
  });
  cv.addEventListener('pointermove',function(e){if(on)f(e)});
  var up=function(){if(on){on=false;touching=Math.max(0,touching-1);if(rec)gPush(lx,ly,0)}};
  cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
}
bindSurf($('#cvMain'),function(){return 'spray'},false);
bindSurf($('#cvSurf'),function(){return yTarget},true);

var Y_OPTS=[['spray','SPRAY'],['size','SIZE'],['dens','DENSITY'],['cut','CUTOFF'],['pitch','PITCH']];
Y_OPTS.forEach(function(o){
  var c=document.createElement('button');c.type='button';c.className='chip'+(o[0]===yTarget?' on':'');c.textContent='Y: '+o[1];
  c.addEventListener('click',function(){yTarget=o[0];$$('#yChips .chip').forEach(function(x){x.classList.toggle('on',x===c)})});
  $('#yChips').appendChild(c);
});

