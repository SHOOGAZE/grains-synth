/* ---------------- parameters ---------------- */
var SYS=store('grains.sys.v1')||{};
var LFO_SH=['SIN','TRI','SQR','SAW','S&H'],TGT=['pos','spray','size','dens','pitch','cut','width','rev'],TGT_L=['POS','SPRAY','SIZE','DENS','PITCH','CUT','WIDTH','REV'];
var fHzs=function(v){return v<1?v.toFixed(2)+'Hz':v.toFixed(1)+'Hz'};
var fDiv=function(v){return '1/'+[4,8,16,32][v]};
var fBpm=function(v){return Math.round(v)+' bpm'};
var DEFS=[
 {k:'pos',  label:'POSITION',def:.3, min:0,max:1,fmt:fPct},
 {k:'spray',label:'SPRAY',   def:.12,min:0,max:1,fmt:fPct},
 {k:'size', label:'SIZE',    def:.12,min:.005,max:.8,kind:'exp',fmt:fTime},
 {k:'dens', label:'DENSITY', def:24, min:1,max:100,kind:'exp',fmt:fPerS},
 {k:'pitch',label:'PITCH',   def:0,  min:-24,max:24,kind:'int',fmt:fSt},
 {k:'detune',label:'DETUNE', def:10, min:0,max:200,fmt:fCt},
 {k:'rev',  label:'REVERSE', def:0,  min:0,max:1,fmt:fPct},
 {k:'shape',label:'SHAPE',   def:.5, min:0,max:1,fmt:fShape},
 {k:'scan', label:'SCAN',    def:0,  min:-1,max:1,fmt:fSigned},
 {k:'width',label:'WIDTH',   def:.6, min:0,max:1,fmt:fPct},
 {k:'atk',  label:'ATTACK',  def:.05,min:.005,max:2,kind:'exp',fmt:fTime},
 {k:'rel',  label:'RELEASE', def:.4, min:.02,max:4,kind:'exp',fmt:fTime},
 {k:'cut',  label:'CUTOFF',  def:18000,min:120,max:18000,kind:'exp',fmt:fHz},
 {k:'res',  label:'RESO',    def:.7, min:.5,max:12,kind:'exp',fmt:fRes},
 {k:'level',label:'LEVEL',   def:.7, min:0,max:1,fmt:fPct},
 {k:'drive',label:'DRIVE',   def:0,  min:0,max:1,fmt:fPct},
 {k:'dtime',label:'D.TIME',  def:.37,min:.05,max:1.2,kind:'exp',fmt:fTime},
 {k:'dfb',  label:'D.FEEDB', def:.45,min:0,max:.92,fmt:fPct},
 {k:'delay',label:'DELAY',   def:.2, min:0,max:1,fmt:fPct},
 {k:'verb', label:'REVERB',  def:.3, min:0,max:1,fmt:fPct},
 {k:'l1rate', label:'LFO1 RATE', def:.4,min:.03,max:20,kind:'exp',fmt:fHzs},
 {k:'l1depth',label:'LFO1 DEPTH',def:0, min:0,max:1,fmt:fPct},
 {k:'l1shape',label:'LFO1 SHAPE',def:0, min:0,max:4,kind:'int',fmt:function(v){return LFO_SH[v]}},
 {k:'l1tgt',  label:'LFO1 TARGET',def:0,min:0,max:7,kind:'int',fmt:function(v){return TGT_L[v]}},
 {k:'l2rate', label:'LFO2 RATE', def:.9,min:.03,max:20,kind:'exp',fmt:fHzs},
 {k:'l2depth',label:'LFO2 DEPTH',def:0, min:0,max:1,fmt:fPct},
 {k:'l2shape',label:'LFO2 SHAPE',def:1, min:0,max:4,kind:'int',fmt:function(v){return LFO_SH[v]}},
 {k:'l2tgt',  label:'LFO2 TARGET',def:1,min:0,max:7,kind:'int',fmt:function(v){return TGT_L[v]}},
 {k:'bpm',   label:'TEMPO',   def:100,min:40,max:200,kind:'int',fmt:fBpm,sys:true},
 {k:'agate', label:'GATE',    def:.6, min:.1,max:1,fmt:fPct},
 {k:'div',   label:'RATE',    def:2,  min:0,max:3,kind:'int',fmt:fDiv},
 {k:'aon',   label:'ARP',     def:0,  min:0,max:1,kind:'int',fmt:function(v){return v?'ON':'OFF'}},
 {k:'amode', label:'MODE',    def:0,  min:0,max:4,kind:'int',fmt:function(v){return ['UP','DOWN','UP-DN','RAND','ORDER'][v]}},
 {k:'aoct',  label:'OCTAVES', def:1,  min:1,max:3,kind:'int',fmt:function(v){return v+' OCT'}},
 {k:'sroot', label:'ROOT',    def:0,  min:0,max:11,kind:'int',fmt:function(v){return ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'][v]},sys:true},
 {k:'stype', label:'SCALE',   def:0,  min:0,max:7,kind:'int',fmt:function(v){return ['CHROM','MAJOR','MINOR','DORIAN','PENT','MIN PENT','WHOLE','BLUES'][v]},sys:true}
];
var D={},P={};
DEFS.forEach(function(d){D[d.k]=d;P[d.k]=d.def});
['bpm','sroot','stype'].forEach(function(k){if(typeof SYS[k]==='number')P[k]=clamp(Math.round(SYS[k]),D[k].min,D[k].max)});
function toN(k,v){var d=D[k];return d.kind==='exp'?Math.log(v/d.min)/Math.log(d.max/d.min):(v-d.min)/(d.max-d.min)}
function fromN(k,n){var d=D[k];n=clamp(n,0,1);var v=d.kind==='exp'?d.min*Math.pow(d.max/d.min,n):d.min+n*(d.max-d.min);return d.kind==='int'?Math.round(v):v}

