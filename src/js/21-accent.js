/* ---------------- accent ---------------- */
var ACCENTS=[['WHITE','#f0f0f0'],['SILVER','#b4b4b4'],['DIM','#868686']];
function applyAccent(hex){
  var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
  ACC={r:r,g:g,b:b};
  var s=document.documentElement.style;
  s.setProperty('--accent',hex);
  s.setProperty('--accent-fg','rgb('+Math.min(255,r+30)+','+Math.min(255,g+30)+','+Math.min(255,b+30)+')');
  s.setProperty('--accent-glow','rgba('+r+','+g+','+b+',.45)');
}
var cfg=store('grains.cfg.v1')||{acc:0};
cfg.lang=cfg.lang||'en';cfg.tips=cfg.tips||'on';
ACCENTS.forEach(function(a,i){
  var c=document.createElement('button');c.type='button';c.className='chip'+(i===cfg.acc?' on':'');c.textContent=a[0];
  c.addEventListener('click',function(){cfg.acc=i;store('grains.cfg.v1',cfg);applyAccent(a[1]);$$('#accChips .chip').forEach(function(x){x.classList.toggle('on',x===c)})});
  $('#accChips').appendChild(c);
});
applyAccent(ACCENTS[cfg.acc]?ACCENTS[cfg.acc][1]:ACCENTS[0][1]);

