/* ---------------- tutorial: spotlight tour + one-time tips per screen ---------------- */
var TOUR=[
 {title:'Welcome',text:'GRAINS is a granular sampler. It plays thousands of tiny grains of a sound to build clouds, textures and frozen moments. This short tour shows the essentials. Replay it any time from SAMPLE → Tutorial.'},
 {sel:'#cvMain',tab:'grain',title:'Sample',text:'The sample, drawn as dots. Drag across it: left and right move the position grains are taken from, up and down widen the spray. The bright dots are the part being played.'},
 {sel:'#v-grain .kgrid',tab:'grain',title:'Grain settings',text:'SIZE is how long each grain lasts, DENSITY how many play per second. Short grains and high density give smooth textures, long and sparse ones stay recognisable. Drag a knob up or down, double-tap to reset it.'},
 {sel:'#dock',title:'Keys',text:'Tap the keys to play pitches, hold several for a chord cloud. HOLD keeps the cloud going by itself, FREEZE also locks the position, OCT shifts the octave and RND randomises the grain settings. The arrows at the top undo and redo.'},
 {sel:'#presetBtn',title:'Presets',text:'Tap the name to browse presets or save your own, or use the arrows to step through them.'},
 {sel:'#tabs',title:'Screens',text:'GRAIN shapes the cloud. TONE adds scan, filter, envelope, echo and reverb. MOD has two LFOs. PLAY is a big touch surface with snapshots and gesture loops. SEQ has the scale, arpeggiator and sequencer. SAMPLE loads, records, edits and exports sound and holds the settings.'},
 {sel:'#v-tone .knob',tab:'tone',title:'Scan',text:'SCAN moves the position through the sample by itself. Slow values stretch the sound in time, zero freezes the cloud in place.'},
 {sel:'#v-mod .card',tab:'mod',title:'Modulation',text:'Two LFOs move the grain settings by themselves. Pick a shape and a target, then raise DEPTH. RATE sets how fast it moves.'},
 {sel:'#cvSurf',tab:'play',title:'Surface',text:'Touch the surface to play. X is the position, Y controls the parameter chosen below it. Hold a SNAP pad to store all settings, tap it to recall them.'},
 {sel:'#gRow',tab:'play',title:'Gesture',text:'REC arms the recorder: touch the surface, move around, then tap STOP. LOOP replays your movement, so your hands are free for the knobs.'},
 {sel:'#rootChips',tab:'seq',title:'Scale',text:'Pick a root and a scale: the keys, MIDI and Y: PITCH snap to it, so every cloud stays in tune.'},
 {sel:'#steps',tab:'seq',title:'Arp and sequencer',text:'Hold keys with ARP on to arpeggiate them, or start SEQ: tap a step to switch it, drag in the grid to set its note. Keys transpose the pattern. TEMPO and RATE are shared.'},
 {sel:'#cvEdit',tab:'sample',title:'Edit sample',text:'The loop region is where the grains are read from. Drag its two handles, swipe on empty space to select a region, pinch to zoom, double-tap to reset the zoom. CROP, REMOVE and the other tools change the sample itself, and the arrows at the top undo them.'},
 {sel:'#recBtn',title:'Sound source',text:'LOAD brings in any audio file, REC records from the microphone. GRAB keeps the last seconds of what you hear and turns them into a new sample.'},
 {title:'Landscape',text:'Turn the phone sideways for the wide layout: the screens move to a rail on the left and the keys stay under the sample.'}
];
var tourEl=null;
function tourStart(force){
  if(tourEl||(!force&&store('grains.tour')))return;
  hideTip();
  var i=0,veil=document.createElement('div');veil.id='tour';
  veil.innerHTML='<div class="tspot"></div><div class="tcard"><b></b><p></p><div class="tdots"></div><div class="btns"><button class="btn" type="button" id="tSkip">Skip</button><button class="btn" type="button" id="tBack">Back</button><button class="btn pri" type="button" id="tNext">Next</button></div></div>';
  tourEl=veil;document.body.appendChild(veil);
  var sp=$('.tspot',veil),card=$('.tcard',veil);
  function done(){veil.remove();tourEl=null;store('grains.tour',1);showTab(curTab)}
  function go(d){i+=d;if(i>=TOUR.length){done();return}if(i<0)i=0;show(d)}
  function show(dir){
    var t=TOUR[i];
    if(t.tab&&curTab!==t.tab)showTab(t.tab);
    setTimeout(function(){
      var el=t.sel?$(t.sel):null;
      if(t.sel&&(!el||el.offsetParent===null)){go(dir||1);return}
      if(el){
        var sc=el.closest('#views');
        if(sc){var er=el.getBoundingClientRect(),sr=sc.getBoundingClientRect();if(er.top<sr.top+6||er.bottom>sr.bottom-6)sc.scrollTop+=er.top-sr.top-40}
      }
      var r=el?el.getBoundingClientRect():null,pad=6;
      sp.style.cssText=r?'left:'+(r.left-pad)+'px;top:'+(r.top-pad)+'px;width:'+(r.width+pad*2)+'px;height:'+(r.height+pad*2)+'px':'left:50%;top:40%;width:0;height:0';
      $('b',card).textContent=(i+1)+'/'+TOUR.length+' · '+t.title;
      $('p',card).textContent=t.text;
      $('.tdots',card).innerHTML=TOUR.map(function(_,k){return '<i'+(k===i?' class="on"':'')+'></i>'}).join('');
      $('#tBack',veil).style.visibility=i?'visible':'hidden';
      $('#tNext',veil).textContent=i===TOUR.length-1?'Done':'Next';
      var vh=window.innerHeight,below=!r||r.top<vh/2;
      card.style.top=below?(r?Math.min(vh-250,r.bottom+16):Math.round(vh*.28))+'px':'auto';
      card.style.bottom=below?'auto':(vh-r.top+16)+'px';
    },t.tab?140:0);
  }
  $('#tSkip',veil).addEventListener('click',done);
  $('#tBack',veil).addEventListener('click',function(){go(-1)});
  $('#tNext',veil).addEventListener('click',function(){go(1)});
  show(1);
}
var TIPS={
 grain:'Drag the sample to choose where grains come from. Short SIZE and high DENSITY make smooth clouds; add SPRAY for texture.',
 tone:'SCAN drifts through the sample on its own. The filter, echo and reverb then shape the cloud.',
 mod:'Raise DEPTH to wake an LFO up. Slow rates make the cloud breathe, fast ones make it flutter.',
 play:'Touch the surface to play. REC records a gesture you can loop. Hold a SNAP pad to store the current sound, tap it to recall.',
 seq:'Pick a scale to keep everything in tune. Hold keys with ARP on, or start SEQ. Keys transpose the sequence.',
 sample:'Load an audio file, record your own or generate a demo. Drag the handles on the waveform to choose the loop region.'
};
var tipEl=null,tipT=0;
function hideTip(){clearTimeout(tipT);if(tipEl){tipEl.remove();tipEl=null}}
function maybeTip(n){
  hideTip();
  if(cfg.tips==='off'||tourEl||!store('grains.tour')||!TIPS[n])return;
  var seen=store('grains.tipsSeen')||{};if(seen[n])return;
  tipEl=document.createElement('div');tipEl.id='tip';
  tipEl.innerHTML='<p></p><div class="tbtns"><button class="btn pri" type="button" id="tipOk">Got it</button><button class="btn" type="button" id="tipOff">Turn off tips</button></div>';
  $('p',tipEl).textContent=TIPS[n];
  document.body.appendChild(tipEl);
  $('#tipOk').addEventListener('click',function(){seen[n]=1;store('grains.tipsSeen',seen);hideTip()});
  $('#tipOff').addEventListener('click',function(){
    cfg.tips='off';store('grains.cfg.v1',cfg);hideTip();toast('Tips off — turn them on in SAMPLE');
    $$('#tipsChips .chip').forEach(function(x,k){x.classList.toggle('on',k===1)});
  });
  tipT=setTimeout(hideTip,14000);
}

