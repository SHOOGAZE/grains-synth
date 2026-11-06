/* ---------------- recording: microphone (raw PCM), output capture ---------------- */
var micRec=null;
function setRec(on){
  [$('#recBtn'),$('#recBtn2')].forEach(function(b){b.classList.toggle('rec',on);b.textContent=on?'■ STOP':'● REC'});
}
function toggleRec(){
  initAudio();
  if(micRec){stopMic();return}
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){toast('Recording is not available here');return}
  navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}}).then(function(st){
    var src=ctx.createMediaStreamSource(st),pr=ctx.createScriptProcessor(4096,1,1),mute=ctx.createGain(),r;
    mute.gain.value=0;
    r={st:st,src:src,pr:pr,mute:mute,ch:[],n:0,t0:performance.now(),lv:[],max:Math.floor(ctx.sampleRate*30)};
    pr.onaudioprocess=function(e){
      var x=e.inputBuffer.getChannelData(0),c=new Float32Array(x),m=0,i,a;
      r.ch.push(c);r.n+=c.length;
      for(i=0;i<c.length;i+=8){a=c[i]<0?-c[i]:c[i];if(a>m)m=a}
      r.lv.push(m);
      if(r.n>=r.max)setTimeout(stopMic,0);
    };
    src.connect(pr);pr.connect(mute);mute.connect(ctx.destination);
    micRec=r;setRec(true);toast('Recording… tap again to stop');
  }).catch(function(){micRec=null;toast('Microphone unavailable')});
}
function stopMic(){
  var r=micRec;if(!r)return;
  micRec=null;
  try{r.src.disconnect();r.pr.disconnect();r.mute.disconnect()}catch(e){}
  r.pr.onaudioprocess=null;
  r.st.getTracks().forEach(function(t){t.stop()});
  setRec(false);
  if(!r.n){toast('Nothing recorded');return}
  var d=new Float32Array(r.n),o=0;
  r.ch.forEach(function(c){d.set(c,o);o+=c.length});
  pushUndo(true);setSample([d],ctx.sampleRate,'REC');
  toast('Recorded '+(r.n/ctx.sampleRate).toFixed(1)+'s');
}
$('#recBtn').addEventListener('click',toggleRec);
$('#recBtn2').addEventListener('click',toggleRec);

/* the last 20 s of the output are always kept, so GRAB can resample them and REC OUTPUT can save a WAV */
var cap=null,outTimer=0;
function initCapture(node){
  var N=Math.floor(ctx.sampleRate*20),pr=ctx.createScriptProcessor(2048,2,2),mute=ctx.createGain();
  mute.gain.value=0;
  cap={L:new Float32Array(N),R:new Float32Array(N),w:0,N:N,out:null};
  pr.onaudioprocess=function(e){
    var a=e.inputBuffer.getChannelData(0),b=e.inputBuffer.numberOfChannels>1?e.inputBuffer.getChannelData(1):a,n=a.length,i,w=cap.w;
    for(i=0;i<n;i++){cap.L[w]=a[i];cap.R[w]=b[i];w++;if(w>=N)w=0}
    cap.w=w;
    if(cap.out){cap.out.L.push(new Float32Array(a));cap.out.R.push(new Float32Array(b));cap.out.n+=n}
  };
  node.connect(pr);pr.connect(mute);mute.connect(ctx.destination);
}
function grabLast(sec){
  initAudio();
  if(!cap){toast('Start the audio first');return}
  var n=Math.min(cap.N,Math.floor(sec*ctx.sampleRate)),L=new Float32Array(n),R=new Float32Array(n),r=(cap.w-n+cap.N)%cap.N,i;
  for(i=0;i<n;i++){L[i]=cap.L[(r+i)%cap.N];R[i]=cap.R[(r+i)%cap.N]}
  pushUndo(true);setSample([L,R],ctx.sampleRate,'GRAB '+sec+'S');
  toast('Grabbed the last '+sec+'s');
}
function fmtClock(s){s=Math.floor(s);return Math.floor(s/60)+':'+('0'+(s%60)).slice(-2)}
function outUI(){
  var b=$('#outBtn');if(!b)return;
  if(cap&&cap.out){b.classList.add('rec');b.textContent='■ STOP '+fmtClock((performance.now()-cap.out.t0)/1000)}
  else{b.classList.remove('rec');b.textContent='● REC OUTPUT'}
}
function toggleOut(){
  initAudio();
  if(!cap)return;
  if(cap.out){
    var o=cap.out;cap.out=null;clearInterval(outTimer);outUI();
    if(!o.n){toast('Nothing recorded');return}
    var L=new Float32Array(o.n),R=new Float32Array(o.n),p=0;
    o.L.forEach(function(c,i){L.set(c,p);R.set(o.R[i],p);p+=c.length});
    saveBlob('grains-'+stamp()+'.wav',encodeWav([L,R],ctx.sampleRate));
    return;
  }
  cap.out={L:[],R:[],n:0,t0:performance.now()};
  outTimer=setInterval(function(){outUI();if(cap.out&&performance.now()-cap.out.t0>300000)toggleOut()},250);
  outUI();toast('Recording the output…');
}
function stamp(){var d=new Date(),z=function(n){return ('0'+n).slice(-2)};return d.getFullYear()+z(d.getMonth()+1)+z(d.getDate())+'-'+z(d.getHours())+z(d.getMinutes())+z(d.getSeconds())}
function encodeWav(chs,rate){
  var nc=chs.length,n=chs[0].length,bytes=44+n*nc*2,ab=new ArrayBuffer(bytes),v=new DataView(ab),i,c,o=44,s;
  function str(p,t){for(var k=0;k<t.length;k++)v.setUint8(p+k,t.charCodeAt(k))}
  str(0,'RIFF');v.setUint32(4,bytes-8,true);str(8,'WAVE');str(12,'fmt ');
  v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,nc,true);v.setUint32(24,rate,true);
  v.setUint32(28,rate*nc*2,true);v.setUint16(32,nc*2,true);v.setUint16(34,16,true);
  str(36,'data');v.setUint32(40,n*nc*2,true);
  for(i=0;i<n;i++)for(c=0;c<nc;c++){s=chs[c][i];s=s>1?1:s<-1?-1:s;v.setInt16(o,s<0?s*32768:s*32767,true);o+=2}
  return new Blob([ab],{type:'audio/wav'});
}
function anchorSave(name,blob){
  var url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();
  setTimeout(function(){URL.revokeObjectURL(url)},4000);
  toast('Saved '+name);
}
/* phones get the share sheet (Save to Files); desktops get a normal download */
function saveBlob(name,blob){
  try{
    if(navigator.canShare&&window.matchMedia&&matchMedia('(pointer:coarse)').matches){
      var f=new File([blob],name,{type:blob.type});
      if(navigator.canShare({files:[f]})){
        navigator.share({files:[f]}).catch(function(e){if(!e||e.name!=='AbortError')anchorSave(name,blob)});
        return;
      }
    }
  }catch(e){}
  anchorSave(name,blob);
}
function saveSample(){
  if(!smp){toast('No sample loaded.');return}
  saveBlob('grains-'+smp.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')+'.wav',encodeWav(smp.ch,smp.rate));
}

