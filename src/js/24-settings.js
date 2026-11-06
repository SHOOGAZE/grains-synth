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
}

