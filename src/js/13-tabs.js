/* ---------------- tabs ---------------- */
var curTab='grain';
var merged=false;
/* interface level: simple keeps GRAIN, TONE and PLAY; full adds MOD, SEQ and SAMPLE */
var SIMPLE_OFF=['mod','seq','sample'];
function isSimple(){return !!cfg&&cfg.ui!=='full'}
function applyLevel(){document.body.classList.toggle('simple',isSimple());if(isSimple()&&SIMPLE_OFF.indexOf(curTab)>=0)showTab('grain')}
function showTab(t){if(merged&&t==='tone')t='grain';if(isSimple()&&SIMPLE_OFF.indexOf(t)>=0)t='grain';curTab=t;
  $$('#tabs button').forEach(function(b){var on=b.dataset.t===t;b.classList.toggle('on',on);b.setAttribute('role','tab');b.setAttribute('aria-selected',on?'true':'false')});
  $$('.view').forEach(function(v){v.classList.toggle('on',v.id==='v-'+t)});
  $('#views').scrollTop=0;
}
$$('#tabs button').forEach(function(b){b.addEventListener('click',function(){showTab(b.dataset.t);maybeTip(b.dataset.t)})});


/* tablets and desktops: the TONE cards sit under GRAIN, one screen for the whole voice */
(function(){
  var mq=window.matchMedia('(min-width:700px) and (min-height:600px)');
  function apply(){
    var tone=$('#v-tone'),grain=$('#v-grain'),views=$('#views');
    if(mq.matches===merged)return;
    merged=mq.matches;
    document.body.classList.toggle('merged',merged);
    if(merged){grain.appendChild(tone);if(curTab==='tone')showTab('grain')}
    else{views.insertBefore(tone,$('#v-mod'))}
  }
  apply();
  if(mq.addEventListener)mq.addEventListener('change',apply);else mq.addListener(apply);
})();
$$('#tabs button').forEach(function(b){b.setAttribute('role','tab');b.setAttribute('aria-selected',b.classList.contains('on')?'true':'false')});
