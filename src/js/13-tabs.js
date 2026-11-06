/* ---------------- tabs ---------------- */
var curTab='grain';
function showTab(t){curTab=t;
  $$('#tabs button').forEach(function(b){b.classList.toggle('on',b.dataset.t===t)});
  $$('.view').forEach(function(v){v.classList.toggle('on',v.id==='v-'+t)});
  $('#views').scrollTop=0;
}
$$('#tabs button').forEach(function(b){b.addEventListener('click',function(){showTab(b.dataset.t);maybeTip(b.dataset.t)})});

