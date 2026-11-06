/* ---------------- drawing ---------------- */
var ACC={r:240,g:240,b:240};
function fitCv(cv){
  var d=Math.min(3,window.devicePixelRatio||1),w=Math.floor(cv.clientWidth*d),h=Math.floor(cv.clientHeight*d);
  if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h}
}
function drawWave(cv){
  fitCv(cv);
  var g=cv.getContext('2d'),w=cv.width,h=cv.height;
  var cell=Math.max(4,Math.round(w/88)),cols=Math.floor(w/cell),rows=Math.floor(h/cell),cy=(rows-1)/2;
  var ox=(w-cols*cell)/2,oy=(h-rows*cell)/2,c,r,i,j;
  var ar=ACC.r+','+ACC.g+','+ACC.b,sp=eff('spray')*.25,pe=eff('pos');
  var pr=Math.max(1,cell*.14),px=Math.max(2,cell*.62);
  g.fillStyle='#070707';g.fillRect(0,0,w,h);
  /* pixel grid */
  g.fillStyle='#171717';
  for(c=0;c<cols;c++)for(r=0;r<rows;r++)g.fillRect(ox+c*cell+cell/2-pr,oy+r*cell+cell/2-pr,pr*2,pr*2);
  /* sample as a dot-matrix; grains inside the spray window are lit */
  if(peaks){
    for(c=0;c<cols;c++){
      var a0=Math.floor(c/cols*600),a1=Math.max(a0+1,Math.floor((c+1)/cols*600)),mx=-1,mn=1;
      for(j=a0;j<a1&&j<600;j++){if(peaks[j*2+1]>mx)mx=peaks[j*2+1];if(peaks[j*2]<mn)mn=peaks[j*2]}
      var xn=(c+.5)/cols,dist=Math.abs(((xn-pe+1.5)%1)-.5),inWin=dist<=sp+.5/cols;
      var top=cy-mx*cy*.92,bot=cy-mn*cy*.92;
      g.fillStyle=inWin?'rgba('+ar+',.9)':'#3d3d3d';
      for(r=Math.max(0,Math.floor(top));r<=Math.min(rows-1,Math.ceil(bot));r++)
        g.fillRect(ox+c*cell+(cell-px)/2,oy+r*cell+(cell-px)/2,px,px);
    }
  }
  /* spray window */
  g.fillStyle='rgba('+ar+',.07)';
  g.fillRect((pe-sp)*w,0,sp*2*w,h);
  if(pe-sp<0)g.fillRect((1+pe-sp)*w,0,(sp-pe)*w,h);
  if(pe+sp>1)g.fillRect(0,0,(pe+sp-1)*w,h);
  /* grains: pixels that flash and drift upward */
  var now=ctx?ctx.currentTime:0;
  for(i=grains.length-1;i>=0;i--){
    var gr=grains[i],age=now-gr.t;
    if(age<0||age>.45)continue;
    g.fillStyle='rgba('+ar+','+(.95*(1-age/.45)).toFixed(3)+')';
    var gx=ox+Math.floor(gr.pos*cols)*cell,gy=oy+Math.floor(clamp(gr.y*rows-age*rows*.35,0,rows-1))*cell,gw=Math.max(1,Math.round(gr.w*cols))*cell;
    g.fillRect(gx,gy+(cell-px)/2,gw,px);
  }
  /* playhead: dashed line */
  var hx=ox+Math.floor(pe*cols)*cell+cell/2;
  g.fillStyle=isActive()?'rgb('+ar+')':'#8c8c8c';
  for(r=0;r<rows;r++)g.fillRect(hx-1,oy+r*cell+cell*.2,2,cell*.6);
}
var scope=$('#scope');
function drawScope(){
  fitCv(scope);
  var g=scope.getContext('2d'),w=scope.width,h=scope.height;
  g.clearRect(0,0,w,h);
  g.strokeStyle='#161616';g.lineWidth=1;g.beginPath();g.moveTo(0,h/2+.5);g.lineTo(w,h/2+.5);g.stroke();
  if(!ana)return;
  ana.getFloatTimeDomainData(anaBuf);
  var n=anaBuf.length,i,start=0;
  for(i=1;i<n/2;i++)if(anaBuf[i-1]<0&&anaBuf[i]>=0){start=i;break}
  g.strokeStyle='rgb('+ACC.r+','+ACC.g+','+ACC.b+')';g.lineWidth=Math.max(1,w/118);
  g.beginPath();
  var cnt=Math.min(512,n-start);
  for(i=0;i<cnt;i++){var x=i/cnt*w,y=h/2-anaBuf[start+i]*h*.9;if(i)g.lineTo(x,y);else g.moveTo(x,y)}
  g.stroke();
}
function frame(){
  var now=ctx?ctx.currentTime:0;
  while(grains.length&&now-grains[0].t>.5)grains.shift();
  if(curTab==='grain')drawWave($('#cvMain'));
  else if(curTab==='play')drawWave($('#cvSurf'));
  else if(curTab==='sample')drawEdit();
  else if(curTab==='mod')drawLfo();
  else if(curTab==='seq')drawSeq();
  drawScope();
  requestAnimationFrame(frame);
}

