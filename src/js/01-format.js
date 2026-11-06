/* ---------------- formatting ---------------- */
var fPct=function(v){return Math.round(v*100)+'%'};
var fTime=function(v){return v<1?Math.round(v*1000)+'ms':v.toFixed(2)+'s'};
var fHz=function(v){return v>=1000?(v/1000).toFixed(v>=10000?1:2)+'k':Math.round(v)+''};
var fPerS=function(v){return v.toFixed(v<10?1:0)+'/s'};
var fSt=function(v){return (v>0?'+':'')+Math.round(v)+'st'};
var fCt=function(v){return Math.round(v)+'c'};
var fSigned=function(v){return (v>0?'+':'')+Math.round(v*100)+'%'};
var fShape=function(v){return v<.25?'RECT':v<.6?'HANN':'PERC'};
var fRes=function(v){return v.toFixed(1)};

