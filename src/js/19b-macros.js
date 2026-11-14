/* ---------------- two macro knobs: hold one to choose what it controls ---------------- */
var macroEl={};
function buildMacro(i){
  var host=$('#macros');if(!host)return;
  var old=macroEl[i],nel=makeKnob(D[MT[P['m'+i+'t']]],{macro:i});
  if(old&&old.parentNode)old.parentNode.replaceChild(nel,old);else host.appendChild(nel);
  macroEl[i]=nel;
}
function openMacroPick(i,anchor){
  closeMacroPick();
  var bg=document.createElement('div');bg.id='mpick';bg.className='mpick';
  var box=document.createElement('div');box.className='mpbox';
  var h=document.createElement('div');h.className='mph';h.textContent='Macro '+i+' controls';box.appendChild(h);
  var row=document.createElement('div');row.className='chips tight';
  MT.forEach(function(k,ix){
    var c=document.createElement('button');c.type='button';c.className='chip'+(P['m'+i+'t']===ix?' on':'');c.textContent=D[k].label;
    c.addEventListener('click',function(){setParam('m'+i+'t',ix,true);closeMacroPick();toast('Macro '+i+' → '+D[k].label)});
    row.appendChild(c);
  });
  box.appendChild(row);bg.appendChild(box);
  bg.addEventListener('pointerdown',function(e){if(e.target===bg)closeMacroPick()});
  document.body.appendChild(bg);
}
function closeMacroPick(){var e=$('#mpick');if(e)e.remove()}
buildMacro(1);buildMacro(2);
