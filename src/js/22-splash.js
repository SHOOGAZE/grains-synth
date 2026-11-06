/* ---------------- splash: dust that forms the title ---------------- */
(function(){
  var cv=$('#dust'),g=cv.getContext('2d'),pts=[],W=0,H=0,go=0,t0=performance.now(),dpr=1;
  function build(){
    dpr=Math.min(2,window.devicePixelRatio||1);
    W=cv.width=Math.floor(window.innerWidth*dpr);H=cv.height=Math.floor(window.innerHeight*dpr);
    var fs=Math.min(window.innerWidth*.09,window.innerHeight*.12,68)*dpr,oc=document.createElement('canvas'),o,i,x,y,ls=fs*.14,tx0,w=0,ch='GRAINS',wd=[];
    oc.width=W;oc.height=Math.ceil(fs*1.5);o=oc.getContext('2d');
    o.fillStyle='#fff';o.textAlign='left';o.textBaseline='middle';
    o.font='700 '+fs+'px "Helvetica Neue",Helvetica,Arial,sans-serif';
    for(i=0;i<ch.length;i++){wd[i]=o.measureText(ch[i]).width;w+=wd[i]+(i<ch.length-1?ls:0)}
    tx0=(W-w)/2;
    for(i=0;i<ch.length;i++){o.fillText(ch[i],tx0,oc.height/2);tx0+=wd[i]+ls}
    var im=o.getImageData(0,0,oc.width,oc.height).data,gap=Math.max(3,Math.round(fs/23)),oy=H*.46-oc.height/2;
    pts=[];
    for(y=0;y<oc.height;y+=gap)for(x=0;x<W;x+=gap)if(im[(y*W+x)*4+3]>128)pts.push({hx:x,hy:y+oy,x:Math.random()*W,y:Math.random()*H,vx:0,vy:0,ph:Math.random()*6.28,s:gap*(.4+Math.random()*.35),dust:0});
    for(i=0;i<160;i++)pts.push({hx:Math.random()*W,hy:Math.random()*H,x:Math.random()*W,y:Math.random()*H,vx:0,vy:0,ph:Math.random()*6.28,s:dpr*(1+Math.random()*1.5),dust:1});
  }
  function loop(){
    var st=$('#start');if(!st||st.style.display==='none')return;
    var t=(performance.now()-t0)/1000,i,p,a,k,tx,ty;
    g.clearRect(0,0,W,H);
    for(i=0;i<pts.length;i++){
      p=pts[i];
      if(go){p.x+=p.vx;p.y+=p.vy;p.vx*=1.02;p.vy*=1.02}
      else if(p.dust){p.hx+=Math.sin(t*.3+p.ph)*.3*dpr;p.hy+=Math.cos(t*.25+p.ph)*.3*dpr;p.x+=(p.hx-p.x)*.02;p.y+=(p.hy-p.y)*.02}
      else{tx=p.hx+Math.sin(t*.9+p.ph)*1.6*dpr;ty=p.hy+Math.cos(t*.7+p.ph)*1.6*dpr;k=Math.min(.05,.008+t*.01);p.x+=(tx-p.x)*k;p.y+=(ty-p.y)*k}
      a=p.dust?.25+.2*Math.sin(t+p.ph):.55+.35*Math.sin(t*1.3+p.ph);
      g.fillStyle='rgba('+ACC.r+','+ACC.g+','+ACC.b+','+Math.max(.05,a).toFixed(3)+')';
      g.fillRect(p.x,p.y,p.s,p.s);
    }
    requestAnimationFrame(loop);
  }
  window.dustGo=function(){
    go=1;
    for(var i=0;i<pts.length;i++){var p=pts[i],dx=p.x-W/2,dy=p.y-H/2,d=Math.sqrt(dx*dx+dy*dy)||1;p.vx=dx/d*(2+Math.random()*6)*dpr;p.vy=dy/d*(2+Math.random()*6)*dpr}
  };
  build();
  window.addEventListener('resize',function(){if(!go)build()});
  requestAnimationFrame(loop);
})();

