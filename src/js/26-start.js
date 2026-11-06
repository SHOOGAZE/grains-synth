/* ---------------- start ---------------- */
$('#startBtn').addEventListener('click',function(){
  var hz=$('#startHz');hz.textContent='starting audio…';
  try{
    initAudio();
    if(window.dustGo)window.dustGo();
    $('#start').classList.add('out');
    setTimeout(function(){$('#start').style.display='none'},500);
    hold=true;$('#hold').classList.add('on');
    try{if(navigator.wakeLock)navigator.wakeLock.request('screen').catch(function(){})}catch(e){}
    toast('Audio running');
    setTimeout(function(){tourStart(false)},1300);
  }catch(e){hz.textContent='touch anywhere to start';startErr('Audio could not start: '+e.message)}
});
buildMod();buildSeq();buildSampleExtras();buildGesture();buildMidi();rebuildScale();
loadPreset(0);
buildSettings();
setLang(cfg.lang);
requestAnimationFrame(frame);
