/* ---------------- MIDI ---------------- */
function midiStatus(t){$('#midiInfo').textContent=t}
function midiBind(){
  var n=0;
  midi.acc.inputs.forEach(function(inp){inp.onmidimessage=midiMsg;n++});
  midiStatus(n?n+' MIDI input(s) connected':'No MIDI inputs found');
}
function midiInit(){
  if(!navigator.requestMIDIAccess){midiStatus('Web MIDI is not supported in this browser');return}
  initAudio();
  navigator.requestMIDIAccess().then(function(a){
    midi.acc=a;a.onstatechange=midiBind;midiBind();$('#midiBtn').classList.add('on');
  }).catch(function(){midiStatus('MIDI access was denied')});
}
function midiMsg(e){
  var s=e.data[0]&240,a=e.data[1],b=e.data[2],k;
  if(s===144&&b>0){initAudio();held.set('m'+a,quant(clamp(a-60,-36,36)))}
  else if(s===128||(s===144&&b===0))held.delete('m'+a);
  else if(s===176){
    if(a===64){midi.sus=b>=64;return}
    if(midi.learn&&midi.learnK){midi.map[a]=midi.learnK;toast('CC '+a+' → '+D[midi.learnK].label);midi.learnK=null;sysSave();return}
    k=midi.map[a];
    if(k&&D[k])setParamN(k,b/127,false);
  }
  else if(s===224)midi.bend=(((b<<7)|a)-8192)/8192*2;
}
function buildMidi(){
  $('#midiBtn').addEventListener('click',midiInit);
  $('#learnBtn').addEventListener('click',function(){
    midi.learn=!midi.learn;midi.learnK=null;$('#learnBtn').classList.toggle('on',midi.learn);
    toast(midi.learn?'Touch a knob, then move a controller':'MIDI learn off');
  });
}

