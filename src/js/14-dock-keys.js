/* ---------------- dock: hold, freeze, octave, keys, scale ---------------- */
$('#hold').addEventListener('click',function(){initAudio();hold=!hold;$('#hold').classList.toggle('on',hold)});
$('#freeze').addEventListener('click',function(){
  initAudio();frozen=!frozen;$('#freeze').classList.toggle('on',frozen);
  toast(frozen?'Frozen: position locked':'Unfrozen');
});
$('#undoBtn').addEventListener('click',undo);
$('#redoBtn').addEventListener('click',redo);
updUR();
function setOct(o){octave=clamp(o,-2,2);$('#octV').textContent='OCT '+(octave>0?'+':'')+octave}
$('#octM').addEventListener('click',function(){setOct(octave-1)});
$('#octP').addEventListener('click',function(){setOct(octave+1)});
$('#rnd').addEventListener('click',function(){
  var r=function(a,b){return a+Math.random()*(b-a)};
  pushUndo(true);
  setParamN('spray',r(0,.6),true);setParamN('size',r(.25,.85),true);setParamN('dens',r(.35,.85),true);
  setParamN('detune',r(0,.35),true);setParamN('rev',Math.random()<.5?0:r(0,.5),true);setParamN('shape',r(.2,.8),true);
  setParamN('width',r(.3,1),true);setParamN('pos',Math.random(),true);
  presetName='RANDOM';readout('RANDOM','');
});

var NOTE_NAMES=['C','','D','','E','F','','G','','A','','B','C'];
var WHITE=[0,2,4,5,7,9,11,12],BLACK={1:1,3:2,6:4,8:5,10:6};
var kb=$('#kbd');
WHITE.forEach(function(n,i){var k=document.createElement('div');k.className='wk';k.dataset.n=n;k.textContent=NOTE_NAMES[n];kb.appendChild(k)});
Object.keys(BLACK).forEach(function(n){var k=document.createElement('div');k.className='bk';k.dataset.n=n;k.style.left=(BLACK[n]*12.5)+'%';kb.appendChild(k)});

/* scales: notes snap to the nearest note of the scale (chromatic = off) */
var SCALES=[['CHROM',[0,1,2,3,4,5,6,7,8,9,10,11]],['MAJOR',[0,2,4,5,7,9,11]],['MINOR',[0,2,3,5,7,8,10]],['DORIAN',[0,2,3,5,7,9,10]],['PENT',[0,2,4,7,9]],['MIN PENT',[0,3,5,7,10]],['WHOLE',[0,2,4,6,8,10]],['BLUES',[0,3,5,6,7,10]]];
var scaleSet=[];
function rebuildScale(){
  var i;
  for(i=0;i<12;i++)scaleSet[i]=false;
  SCALES[P.stype][1].forEach(function(d){scaleSet[(d+P.sroot)%12]=true});
  $$('[data-n]',kb).forEach(function(k){k.classList.toggle('out',P.stype!==0&&!scaleSet[(+k.dataset.n)%12])});
}
function quant(n){
  var i,u,d;
  if(P.stype===0)return n;
  for(i=0;i<=6;i++){
    u=(((n+i)%12)+12)%12;if(scaleSet[u])return n+i;
    d=(((n-i)%12)+12)%12;if(scaleSet[d])return n-i;
  }
  return n;
}

var ptr=new Map();
function keyAt(x,y){var el=document.elementFromPoint(x,y);return el&&el.closest?el.closest('[data-n]'):null}
function press(id,k){
  var old=ptr.get(id);
  if(old===k)return;
  if(old){old.classList.remove('on');held.delete(id)}
  if(k){k.classList.add('on');held.set(id,quant(+k.dataset.n))}
  ptr.set(id,k||null);
}
kb.addEventListener('pointerdown',function(e){e.preventDefault();initAudio();kb.setPointerCapture(e.pointerId);press(e.pointerId,keyAt(e.clientX,e.clientY))});
kb.addEventListener('pointermove',function(e){if(ptr.has(e.pointerId))press(e.pointerId,keyAt(e.clientX,e.clientY))});
var kup=function(e){press(e.pointerId,null);ptr.delete(e.pointerId)};
kb.addEventListener('pointerup',kup);kb.addEventListener('pointercancel',kup);

