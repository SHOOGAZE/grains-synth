/* ---------------- toast / display ---------------- */
var toastT=0;
function toast(t){var el=$('#toast');el.textContent=t;el.classList.add('on');clearTimeout(toastT);toastT=setTimeout(function(){el.classList.remove('on')},1800)}
var l1=$('#l1'),l2=$('#l2'),l3=$('#l3'),roT=0,presetName='CLOUD';
function readout(label,text){l2.textContent=T(label)+'  '+text;clearTimeout(roT);roT=setTimeout(function(){l2.textContent=presetName},1400)}

