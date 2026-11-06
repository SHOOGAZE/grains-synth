/* ---------------- sample handling ---------------- */
function edInfoUpdate(){
  var el=$('#edInfo');if(!el||!smp)return;
  var d=smp.ch[0].length/smp.rate;
  el.textContent=smp.name+' · '+d.toFixed(2)+'s · Region '+(reg.a*d).toFixed(2)+'–'+(reg.b*d).toFixed(2)+'s';
}
function sampleInfo(){
  if(!smp||!buf)return;
  var t=smp.name+' · '+buf.duration.toFixed(1)+'s';
  l1.textContent=t.toUpperCase();
  l3.textContent=(smp.rate/1000).toFixed(1)+'K · '+(smp.ch.length>1?'STEREO':'MONO');
  $('#sinfo').textContent=t;
  $$('#demoChips .chip').forEach(function(c){c.classList.toggle('on',c.dataset.n===smp.name)});
  edInfoUpdate();
}
function computePeaks(){
  if(!smp)return;
  var x=smp.ch[0],N=x.length,a=Math.floor(reg.a*N),b=Math.max(a+2,Math.floor(reg.b*N)),cols=600,step=(b-a)/cols,i,j,mn,mx,s0,e,inc,v;
  peaks=new Float32Array(cols*2);
  for(i=0;i<cols;i++){
    mn=1;mx=-1;s0=a+Math.floor(i*step);e=Math.min(N,a+Math.floor((i+1)*step));
    if(e<=s0)e=s0+1;
    inc=Math.max(1,Math.floor((e-s0)/64));
    for(j=s0;j<e&&j<N;j+=inc){v=x[j];if(v<mn)mn=v;if(v>mx)mx=v}
    if(mn>mx){mn=mx=0}
    peaks[i*2]=mn;peaks[i*2+1]=mx;
  }
}
/* the sample lives as plain Float32Arrays (never edited in place, so undo only keeps references) */
function setSample(ch,rate,name,keep){
  if(!ctx||!ch.length||!ch[0].length)return;
  smp={ch:ch,rate:rate,name:name};
  var n=ch[0].length,nc=ch.length,c,i,s,d;
  buf=ctx.createBuffer(nc,n,rate);rbuf=ctx.createBuffer(nc,n,rate);
  for(c=0;c<nc;c++){buf.getChannelData(c).set(ch[c]);d=rbuf.getChannelData(c);s=ch[c];for(i=0;i<n;i++)d[i]=s[n-1-i]}
  if(!keep){reg.a=0;reg.b=1;edView.v0=0;edView.v1=1}
  computePeaks();sampleInfo();
}

