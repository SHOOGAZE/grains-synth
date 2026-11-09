/* ---------------- presets ---------------- */
var FACTORY=[
 {n:'CLOUD',v:{spray:.35,size:.18,dens:24,pitch:0,detune:18,rev:.1,shape:.5,scan:0,width:.8,delay:.25,verb:.45}},
 {n:'STRETCH',v:{spray:.04,size:.22,dens:32,pitch:0,detune:6,scan:.4,verb:.4,delay:.15,shape:.5,rev:0}},
 {n:'FREEZE',v:{spray:.02,size:.09,dens:45,scan:0,detune:4,verb:.55,delay:.2,cut:9000}},
 {n:'SHIMMER',v:{pitch:12,detune:14,spray:.2,size:.2,dens:30,verb:.7,delay:.3,rev:.2,width:1,cut:14000}},
 {n:'GLITCH',v:{spray:.5,size:.03,dens:12,rev:.4,shape:.15,delay:.45,dfb:.55,width:.9}},
 {n:'RAIN',v:{spray:.8,size:.025,dens:70,pitch:7,shape:.9,width:1,verb:.5,rev:.1}},
 {n:'SUB DRIFT',v:{pitch:-12,spray:.1,size:.14,dens:20,detune:8,scan:-.2,cut:1200,res:2,verb:.3}},
 {n:'DUST',v:{spray:.9,size:.008,dens:90,shape:.2,detune:60,verb:.35,width:1}},
 {n:'DRIFT',v:{spray:.25,size:.2,dens:28,verb:.5,delay:.3,l1rate:.12,l1depth:.5,l1tgt:0,l1shape:0,l2rate:.31,l2depth:.35,l2tgt:1,l2shape:1}},
 {n:'WOBBLE',v:{pitch:-12,size:.1,dens:30,spray:.1,cut:2500,res:3,verb:.35,l1rate:3,l1depth:.55,l1tgt:5,l1shape:0}},
 {n:'SWARM',v:{spray:.6,size:.05,dens:60,pitch:12,width:1,verb:.5,l1rate:5,l1depth:.4,l1tgt:3,l1shape:4}}
];
var userPresets=store('grains.user.v1')||[];
var curPreset=0,curPresetLoaded=false;
function allPresets(){return FACTORY.map(function(p){return {n:p.n,v:p.v,user:false}}).concat(userPresets.map(function(p){return {n:p.n,v:p.v,user:true}}))}
function loadPreset(i){
  var list=allPresets();if(!list.length)return;
  curPreset=(i+list.length)%list.length;
  var p=list[curPreset];
  if(curPresetLoaded)pushUndo(true);curPresetLoaded=true;
  DEFS.forEach(function(d){if(d.k!=='pos'&&d.k!=='level'&&!d.sys)setParam(d.k,d.def,true)});
  Object.keys(p.v).forEach(function(k){if(D[k])setParam(k,p.v[k],true)});
  presetName=p.n;$('#pName').textContent=p.n;l2.textContent=p.n;
}
$('#pPrev').addEventListener('click',function(){loadPreset(curPreset-1)});
$('#pNext').addEventListener('click',function(){loadPreset(curPreset+1)});
function openSheet(){buildList();$('#sbg').classList.add('on');$('#sheet').classList.add('on')}
function closeSheet(){$('#sbg').classList.remove('on');$('#sheet').classList.remove('on')}
$('#presetBtn').addEventListener('click',openSheet);
$('#sbg').addEventListener('click',closeSheet);
$('#sClose').addEventListener('click',closeSheet);
function buildList(){
  var box=$('#plist');box.innerHTML='';
  allPresets().forEach(function(p,i){
    var el=document.createElement('div');el.className='pi'+(i===curPreset?' cur':'');
    el.innerHTML='<span></span><small>'+(p.user?'USER':'FACTORY')+'</small>';
    el.firstChild.textContent=p.n;
    if(p.user){
      var del=document.createElement('span');del.className='del';del.textContent='×';
      del.addEventListener('click',function(e){
        e.stopPropagation();
        userPresets.splice(i-FACTORY.length,1);store('grains.user.v1',userPresets);
        if(curPreset>=i)curPreset=Math.max(0,curPreset-1);
        buildList();
      });
      el.appendChild(del);
    }
    el.addEventListener('click',function(){loadPreset(i);closeSheet()});
    box.appendChild(el);
  });
}
$('#pSave').addEventListener('click',function(){
  var name=($('#pnameIn').value||'').trim().toUpperCase()||('USER '+(userPresets.length+1));
  var v={};DEFS.forEach(function(d){if(!d.sys)v[d.k]=P[d.k]});
  userPresets.push({n:name,v:v});store('grains.user.v1',userPresets);
  curPreset=FACTORY.length+userPresets.length-1;presetName=name;$('#pName').textContent=name;
  $('#pnameIn').value='';buildList();toast('Saved '+name);
});


/* export / import of the user presets as one .json file (share sheet on phones) */
function cleanPreset(p){
  if(!p||typeof p.n!=='string'||!p.v||typeof p.v!=='object')return null;
  var v={},n=0;
  Object.keys(p.v).forEach(function(k){
    var d=D[k],x=p.v[k];
    if(!d||d.sys||k==='pos'||k==='level'||typeof x!=='number'||!isFinite(x))return;
    v[k]=clamp(d.kind==='int'?Math.round(x):x,d.min,d.max);n++;
  });
  var name=p.n.replace(/[\u0000-\u001f]/g,'').trim().toUpperCase().slice(0,24);
  return n&&name?{n:name,v:v}:null;
}
$('#pExport').addEventListener('click',function(){
  if(!userPresets.length){toast('No user presets to export');return}
  var blob=new Blob([JSON.stringify({app:'GRAINS',format:1,presets:userPresets},null,1)],{type:'application/json'});
  saveBlob('grains-presets.json',blob);
});
$('#pImport').addEventListener('click',function(){$('#pFile').click()});
$('#pFile').addEventListener('change',function(e){
  var f=e.target.files&&e.target.files[0];e.target.value='';
  if(!f)return;
  if(f.size>2e6){toast('Not a GRAINS preset file');return}
  var r=new FileReader();
  r.onload=function(){
    var j,list,added=0;
    try{j=JSON.parse(r.result)}catch(x){j=null}
    list=j&&j.app==='GRAINS'&&Array.isArray(j.presets)?j.presets:null;
    if(!list){toast('Not a GRAINS preset file');return}
    list.slice(0,200).forEach(function(p){
      var c=cleanPreset(p);if(!c||userPresets.length>=200)return;
      var same=userPresets.some(function(u){return u.n===c.n&&JSON.stringify(u.v)===JSON.stringify(c.v)});
      if(same)return;
      userPresets.push(c);added++;
    });
    store('grains.user.v1',userPresets);buildList();
    toast('Imported '+added+(added===1?' preset':' presets'));
  };
  r.onerror=function(){toast('Not a GRAINS preset file')};
  r.readAsText(f);
});
