/* ---------------- builders for the MOD, SEQ, SAMPLE and PLAY extras ---------------- */
function bindChips(box,key,labels,base){
  base=base||0;
  labels.forEach(function(lab,i){
    var c=document.createElement('button');c.type='button';c.className='chip sm';c.textContent=lab;
    c.addEventListener('click',function(){pushUndo(true);setParam(key,i+base,true)});
    box.appendChild(c);
  });
  var upd=function(){$$('.chip',box).forEach(function(c,i){c.classList.toggle('on',i+base===P[key])})};
  D[key].ui=upd;upd();
}
function toggleChip(el,labels,get,set){
  var upd=function(){el.textContent=labels[get()?1:0];el.classList.toggle('on',!!get())};
  el.addEventListener('click',function(){set(!get());upd()});
  upd();return upd;
}
function buildMod(){
  bindChips($('#l1shape'),'l1shape',LFO_SH);bindChips($('#l2shape'),'l2shape',LFO_SH);
  bindChips($('#l1tgt'),'l1tgt',TGT_L);bindChips($('#l2tgt'),'l2tgt',TGT_L);
}
function buildSeq(){
  var roots=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  bindChips($('#rootChips'),'sroot',roots);
  bindChips($('#scaleChips'),'stype',SCALES.map(function(s){return s[0]}));
  bindChips($('#divChips'),'div',['1/4','1/8','1/16','1/32']);
  bindChips($('#arpMode'),'amode',['UP','DOWN','UP-DN','RAND','ORDER']);
  bindChips($('#arpOct'),'aoct',['1 OCT','2 OCT','3 OCT'],1);
  var arp=$('#arpOn');
  D.aon.ui=toggleChip(arp,['ARP OFF','ARP ON'],function(){return P.aon>0},function(v){pushUndo(true);setParam('aon',v?1:0,true)});
  /* sequencer bar */
  var bar=$('#seqBar'),run=document.createElement('button'),rnd=document.createElement('button'),clr=document.createElement('button');
  [run,rnd,clr].forEach(function(b){b.type='button';b.className='chip';bar.appendChild(b)});
  rnd.textContent='RND';clr.textContent='CLEAR';
  toggleChip(run,['SEQ OFF','SEQ ON'],function(){return seq.run},function(v){initAudio();seq.run=v});
  rnd.addEventListener('click',function(){
    var i;for(i=0;i<16;i++){seq.on[i]=Math.random()<.68?1:0;seq.n[i]=clamp(quant(Math.round((Math.random()*2-1)*(Math.random()<.5?7:12))),-12,12)}
    seq.on[0]=1;sysSave();
  });
  clr.addEventListener('click',function(){var i;for(i=0;i<16;i++){seq.on[i]=0;seq.n[i]=0}sysSave()});
  var len=$('#seqLen');
  [4,8,12,16].forEach(function(v){
    var c=document.createElement('button');c.type='button';c.className='chip sm';c.textContent=v;
    c.addEventListener('click',function(){seq.len=v;sysSave();updLen()});len.appendChild(c);
  });
  function updLen(){$$('.chip',len).forEach(function(c,i){c.classList.toggle('on',[4,8,12,16][i]===seq.len)})}
  updLen();
  var st=$('#steps'),i;
  for(i=0;i<16;i++)(function(i){
    var b=document.createElement('button');b.type='button';b.className='step';b.textContent=i+1;
    b.addEventListener('click',function(){seq.on[i]=seq.on[i]?0:1;sysSave()});st.appendChild(b);
  })(i);
  wireSeq();
}
function buildSampleExtras(){
  var gb=$('#grabChips'),db=$('#demoChips');
  [2,5,10].forEach(function(s){
    var c=document.createElement('button');c.type='button';c.className='chip sm';c.textContent=s+'s';
    c.addEventListener('click',function(){grabLast(s)});gb.appendChild(c);
  });
  DEMOS.forEach(function(d,i){
    var c=document.createElement('button');c.type='button';c.className='chip sm';c.textContent=d[0];c.dataset.n=d[0];
    c.addEventListener('click',function(){initAudio();toast('Generating…');setTimeout(function(){makeDemo(i)},40)});
    db.appendChild(c);
  });
  $('#outBtn').addEventListener('click',toggleOut);
  $('#wavBtn').addEventListener('click',saveSample);
  buildEditor();
}
function buildGesture(){
  $('#gRec').addEventListener('click',function(){
    initAudio();
    if(gest.rec===0){gest.rec=1;gest.play=0;gest.down=0}
    else if(gest.rec===1)gest.rec=0;
    else gStopRec();
    gUI();
  });
  $('#gLoop').addEventListener('click',function(){
    initAudio();
    if(gest.ev.length<2){toast('Record a gesture first');return}
    gest.play=gest.play?0:1;gest.tp=ctx.currentTime;gest.idx=0;gUI();
  });
  $('#gUndo').addEventListener('click',gUndoTake);
  $('#gClr').addEventListener('click',function(){gKeep();gest.ev=[];gest.len=0;gest.play=0;gest.rec=0;gest.down=0;sysSave();gUI()});
  gUI();
}

