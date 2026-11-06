/* ---------------- demo sounds, generated in code ---------------- */
function normD(d,pk){var m=0,i,a,g;for(i=0;i<d.length;i++){a=d[i]<0?-d[i]:d[i];if(a>m)m=a}if(m>0){g=pk/m;for(i=0;i<d.length;i++)d[i]*=g}return d}
var DEMOS=[
['PAD',function(sr){
  var n=Math.floor(sr*6),d=new Float32Array(n),chord=[110,164.81,220,261.63,329.63,392],TAU=6.2831853,i,k,h,t,v,bt,bn,bf,e,f;
  for(i=0;i<n;i++){
    t=i/sr;v=0;
    for(k=0;k<chord.length;k++){f=chord[k]*(1+(k%2?.002:-.002));for(h=1;h<=5;h++)v+=Math.sin(TAU*f*h*t+k)/(h*h)*.12}
    v*=.6+.4*Math.sin(TAU*.4*t);
    bt=t%.75;bn=Math.floor(t/.75);bf=[523.25,659.25,783.99,587.33][bn%4];e=Math.exp(-bt*6);
    v+=Math.sin(TAU*bf*t+3*e*Math.sin(TAU*bf*2.01*t))*e*.35;
    v+=(Math.random()*2-1)*.01*Math.exp(-bt*30);
    d[i]=v;
  }
  return normD(d,.9);
}],
['GLASS',function(sr){
  var n=Math.floor(sr*6),d=new Float32Array(n),notes=[523.25,659.25,783.99,987.77,880,659.25,1046.5],rat=[1,2.76,5.4,8.93,13.3],amp=[1,.55,.3,.18,.1],dec=[1.6,1.1,.7,.45,.3],TAU=6.2831853,k,p,i,t,t0,env,v;
  for(k=0;k<notes.length;k++){
    t0=Math.floor(k*sr*.8);
    for(i=t0;i<n;i++){
      t=(i-t0)/sr;if(t>4)break;
      env=Math.min(1,t*400);v=0;
      for(p=0;p<5;p++)v+=Math.sin(TAU*notes[k]*rat[p]*t)*amp[p]*Math.exp(-t/dec[p]);
      d[i]+=v*env*.25;
    }
  }
  return normD(d,.9);
}],
['CHOIR',function(sr){
  var n=Math.floor(sr*6),d=new Float32Array(n),f0=[130.81,164.81,196,246.94],TAU=6.2831853,H=18,vow=[[700,1100],[450,1700],[350,800]],amps=new Float32Array(H),v,h,i,t,fo,ph,F1,F2,m,x,fr,vib,s,w;
  for(v=0;v<f0.length;v++){
    ph=Math.random()*6.28;
    for(i=0;i<n;i++){
      t=i/sr;
      if(i%441===0){
        m=t/2;x=Math.floor(m)%3;fr=m-Math.floor(m);fr=fr*fr*(3-2*fr);
        F1=vow[x][0]+(vow[(x+1)%3][0]-vow[x][0])*fr;F2=vow[x][1]+(vow[(x+1)%3][1]-vow[x][1])*fr;
        fo=f0[v];
        for(h=1;h<=H;h++){w=h*fo;amps[h-1]=(Math.exp(-Math.pow((w-F1)/220,2))+.6*Math.exp(-Math.pow((w-F2)/300,2))+.05)/h}
      }
      vib=1+.005*Math.sin(TAU*5.3*t+v);
      ph+=TAU*f0[v]*(v%2?1.002:.998)*vib/sr;
      s=0;for(h=1;h<=H;h++)s+=Math.sin(ph*h)*amps[h-1];
      d[i]+=s*.12;
    }
  }
  return normD(d,.9);
}],
['WIND',function(sr){
  var n=Math.floor(sr*6),d=new Float32Array(n),i,t,x,f1,f2,a1,a2,lo1=0,bp1=0,lo2=0,bp2=0,hi,q=.1,TAU=6.2831853;
  for(i=0;i<n;i++){
    t=i/sr;x=Math.random()*2-1;
    f1=320+260*Math.sin(TAU*.17*t)+120*Math.sin(TAU*.43*t+1);f2=950+520*Math.sin(TAU*.11*t+2);
    a1=2*Math.sin(Math.PI*f1/sr);a2=2*Math.sin(Math.PI*f2/sr);
    lo1+=a1*bp1;hi=x-lo1-q*bp1;bp1+=a1*hi;
    lo2+=a2*bp2;hi=x-lo2-q*bp2;bp2+=a2*hi;
    d[i]=(bp1+.6*bp2)*(.6+.4*Math.sin(TAU*.23*t));
  }
  return normD(d,.9);
}],
['KEYS',function(sr){
  var n=Math.floor(sr*6),d=new Float32Array(n),seq=[261.63,329.63,392,493.88,392,329.63,440,349.23],TAU=6.2831853,k,i,t0,t,f,e,m;
  for(k=0;k<seq.length;k++){
    t0=Math.floor(k*.75*sr);f=seq[k];
    for(i=t0;i<n;i++){
      t=(i-t0)/sr;if(t>2.4)break;
      e=Math.exp(-t*2.2);
      m=Math.sin(TAU*f*t+2.2*Math.exp(-t*5)*Math.sin(TAU*f*t))*e+.25*Math.sin(TAU*f*4*t)*Math.exp(-t*9);
      d[i]+=m*.4*Math.min(1,t*300);
    }
  }
  return normD(d,.9);
}],
['PLUCK',function(sr){
  var n=Math.floor(sr*6),d=new Float32Array(n),notes=[196,246.94,293.66,392,293.66,246.94,329.63,261.63],k,i,N,b,idx,t0,e,cur,nx,v;
  for(k=0;k<notes.length;k++){
    t0=Math.floor(k*.72*sr);N=Math.max(2,Math.round(sr/notes[k]));b=new Float32Array(N);
    for(i=0;i<N;i++)b[i]=Math.random()*2-1;
    idx=0;e=Math.min(n,t0+Math.floor(sr*2.4));
    for(i=t0;i<e;i++){cur=b[idx];nx=b[(idx+1)%N];v=(cur+nx)*.5*.9965;b[idx]=v;idx=(idx+1)%N;d[i]+=cur*.5}
  }
  return normD(d,.9);
}]
];
function makeDemo(i){
  if(!ctx)return;
  var sr=ctx.sampleRate,dm=DEMOS[i||0];
  if(smp)pushUndo(true);
  setSample([dm[1](sr)],sr,dm[0]);
}
function decode(ab,name){
  if(!ctx)return;
  var p=new Promise(function(res,rej){var q=ctx.decodeAudioData(ab,res,rej);if(q&&q.catch)q.catch(rej)});
  p.then(function(b){
    var ch=[],c,mx=Math.floor(b.sampleRate*60),x;
    for(c=0;c<Math.min(2,b.numberOfChannels);c++){x=b.getChannelData(c);ch.push(x.length>mx?x.subarray(0,mx):x)}
    pushUndo(true);setSample(ch,b.sampleRate,name);toast('Loaded '+name);
  }).catch(function(){toast('Could not decode that file')});
}
$('#file').addEventListener('change',function(e){
  var f=e.target.files[0];if(!f)return;
  initAudio();
  f.arrayBuffer().then(function(ab){decode(ab,f.name.replace(/\.[^.]+$/,'').slice(0,24).toUpperCase())});
  e.target.value='';
});

