/* ---------------- sample model, undo / redo ---------------- */
var smp=null,reg={a:0,b:1},edView={v0:0,v1:1},edSnap=true;
var undoS=[],redoS=[],lastPush=0;
function snapState(){return {P:JSON.parse(JSON.stringify(P)),reg:{a:reg.a,b:reg.b},smp:smp}}
function updUR(){$('#undoBtn').disabled=!undoS.length;$('#redoBtn').disabled=!redoS.length}
function trimUndo(){
  var seen=[],i,s;
  for(i=undoS.length-1;i>=0;i--){s=undoS[i].smp;if(s&&seen.indexOf(s)<0){seen.push(s);if(seen.length>8){undoS.splice(0,i+1);break}}}
}
function pushUndo(force){
  var n=performance.now();
  if(!force&&n-lastPush<350)return;
  lastPush=n;undoS.push(snapState());if(undoS.length>40)undoS.shift();trimUndo();redoS.length=0;updUR();
}
function restoreState(s){
  Object.keys(s.P).forEach(function(k){if(D[k])setParam(k,s.P[k],true,true)});
  if(s.smp&&s.smp!==smp&&ctx)setSample(s.smp.ch,s.smp.rate,s.smp.name,true);
  reg.a=s.reg.a;reg.b=s.reg.b;computePeaks();sampleInfo();
}
function undo(){if(!undoS.length)return;redoS.push(snapState());restoreState(undoS.pop());updUR();toast('Undo')}
function redo(){if(!redoS.length)return;undoS.push(snapState());restoreState(redoS.pop());updUR();toast('Redo')}

