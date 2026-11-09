/* ---------------- settings: language, tips, tutorial ---------------- */
function buildSettings(){
  [['auto','Auto'],['en','English'],['ru','Русский'],['es','Español']].forEach(function(l){
    var c=document.createElement('button');c.type='button';c.className='chip'+(cfg.lang===l[0]?' on':'');c.textContent=l[1];
    c.addEventListener('click',function(){
      cfg.lang=l[0];store('grains.cfg.v1',cfg);setLang(cfg.lang);
      $$('#langChips .chip').forEach(function(x){x.classList.toggle('on',x===c)});
    });
    $('#langChips').appendChild(c);
  });
  [['on','On'],['off','Off']].forEach(function(o){
    var c=document.createElement('button');c.type='button';c.className='chip'+(cfg.tips===o[0]?' on':'');c.textContent=o[1];
    c.addEventListener('click',function(){cfg.tips=o[0];store('grains.cfg.v1',cfg);$$('#tipsChips .chip').forEach(function(x){x.classList.toggle('on',x===c)})});
    $('#tipsChips').appendChild(c);
  });
  $('#tourBtn').addEventListener('click',function(){tourStart(true)});
  function chips(id,key,opts){
    $$('#'+id+' .chip').forEach(function(x){x.remove()});
    opts.forEach(function(o){
      var c=document.createElement('button');c.type='button';c.className='chip'+(cfg[key]===o[0]?' on':'');c.textContent=o[1];
      c.addEventListener('click',function(){
        cfg[key]=o[0];store('grains.cfg.v1',cfg);applyCfg();
        $$('#'+id+' .chip').forEach(function(x){x.classList.toggle('on',x===c)});
      });
      $('#'+id).appendChild(c);
    });
  }
  function uiChips(){
    chips('textChips','text',[['m','Normal'],['l','Large']]);
    chips('contrastChips','contrast',[['normal','Normal'],['high','High']]);
  }
  uiChips();
  $('#uiReset').addEventListener('click',function(){
    cfg.text='m';cfg.contrast='normal';
    store('grains.cfg.v1',cfg);applyCfg();uiChips();toast('Interface reset');
  });
}


/* ≡ menu: language, tips, display, interface, MIDI */
function openMenu(){$('#mbg').classList.add('on');$('#msheet').classList.add('on')}
function closeMenu(){$('#mbg').classList.remove('on');$('#msheet').classList.remove('on')}
$('#menuBtn').addEventListener('click',openMenu);
$('#mbg').addEventListener('click',closeMenu);
$('#mClose').addEventListener('click',closeMenu);
$('#tourBtn').addEventListener('click',closeMenu);
