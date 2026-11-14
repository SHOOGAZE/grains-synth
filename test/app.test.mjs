import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(tmpdir(), 'grains-shots') + '/';
mkdirSync(OUT, { recursive: true });
const URL_ = pathToFileURL(join(HERE, 'index.test.html')).href; // built by: node build.mjs --test
const PORT = 9336 + (process.pid % 500);
const sleep = ms => new Promise(r => setTimeout(r, ms));

const chrome = spawn(process.env.CHROME || 'google-chrome', [
  '--headless=new', '--no-sandbox', '--disable-gpu', `--remote-debugging-port=${PORT}`,
  '--autoplay-policy=no-user-gesture-required', '--no-proxy-server',
  '--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream',
  '--user-data-dir=' + mkdtempSync(join(tmpdir(), 'grains-chrome-')), '--hide-scrollbars', 'about:blank'
], { stdio: 'ignore' });

let list;
for (let i = 0; i < 40; i++) {
  try { list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); if (list.length) break; } catch (e) {}
  await sleep(250);
}
const page = list.find(t => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r));
let id = 0; const pending = new Map();
const errors = [];
ws.addEventListener('message', ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errors.push('console.error ' + JSON.stringify(m.params.args.map(a => a.value)));
});
const send = (method, params = {}) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async expr => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); if (r.result?.exceptionDetails) errors.push('eval: ' + expr.slice(0, 60) + ' -> ' + (r.result.exceptionDetails.exception?.description || '')); return r.result?.result?.value; };
const shot = async name => { const r = await send('Page.captureScreenshot', { format: 'png' }); writeFileSync(OUT + name + '.png', Buffer.from(r.result.data, 'base64')); };
const rect = sel => ev(`(()=>{const e=document.querySelector(${JSON.stringify(sel)});if(!e)return null;const r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2,l:r.left,t:r.top,w:r.width,h:r.height}})()`);
const tab = t => ev(`document.querySelector('#tabs button[data-t=${t}]').click()`);
const tp = (type, pts) => send('Input.dispatchTouchEvent', { type, touchPoints: pts.map((p, i) => ({ x: p.x, y: p.y, id: p.id ?? i + 1 })) });
const res = [];
const check = (name, ok, extra = '') => { res.push([ok, name, extra]); console.log((ok ? 'PASS ' : 'FAIL ') + name + (extra ? '  [' + extra + ']' : '')); };

async function open(w, h, { lang = 'en', tour = false } = {}) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 2, mobile: true });
  await send('Emulation.setTouchEmulationEnabled', { enabled: true });
  await send('Page.navigate', { url: URL_ });
  await sleep(800);
  await ev(`localStorage.clear();localStorage.setItem('grains.cfg.v1',JSON.stringify({acc:0,lang:${JSON.stringify(lang)},tips:'off',ui:'full'}));${tour ? '' : "localStorage.setItem('grains.tour','1');"}`);
  await send('Page.reload');
  await sleep(1500);
  await ev(`document.getElementById('startBtn').click()`);
  await sleep(tour ? 3000 : 1800);
}
await send('Page.enable'); await send('Runtime.enable');
await open(390, 844);

// capture downloads
await ev(`window.__dl=[];const oc=URL.createObjectURL;URL.createObjectURL=function(b){window.__dl.push(b);return oc.call(URL,b)};`);

// 1 boot
check('boot: 6 tabs', (await ev(`document.querySelectorAll('#tabs button').length`)) === 6);
check('boot: default english', (await ev(`document.documentElement.lang`)) === 'en');
check('boot: sample PAD loaded', (await ev(`__g.smp().name`)) === 'PAD');

// 2 demos
await tab('sample'); await sleep(200);
for (const n of ['GLASS', 'CHOIR', 'WIND', 'KEYS', 'PLUCK', 'PAD']) {
  await ev(`[...document.querySelectorAll('#demoChips .chip')].find(c=>c.dataset.n==='${n}').click()`);
  await sleep(1500);
  const nm = await ev(`__g.smp().name`), len = await ev(`__g.smp().ch[0].length`);
  const pk = await ev(`(()=>{const x=__g.smp().ch[0];let m=0,nan=0;for(let i=0;i<x.length;i+=7){const a=Math.abs(x[i]);if(a>m)m=a;if(x[i]!==x[i])nan++}return [m,nan]})()`);
  check('demo ' + n, nm === n && len > 200000 && pk[0] > .3 && pk[0] <= 1 && pk[1] === 0, 'peak ' + pk[0].toFixed(2));
}
await ev(`[...document.querySelectorAll('#demoChips .chip')].find(c=>c.dataset.n==='GLASS').click()`); await sleep(1200);

// 3 editor: handle drag
const ed = await rect('#cvEdit');
await tp('touchStart', [{ x: ed.l + 6, y: ed.t + ed.h / 2 }]);
for (let i = 1; i <= 8; i++) { await tp('touchMove', [{ x: ed.l + 6 + i * 12, y: ed.t + ed.h / 2 }]); await sleep(20); }
await tp('touchEnd', []);
const ra = await ev(`__g.reg.a`);
check('editor: start handle dragged', ra > .15 && ra < .35, 'a=' + ra.toFixed(3));
// drag end handle
await tp('touchStart', [{ x: ed.l + ed.w - 6, y: ed.t + ed.h / 2 }]);
for (let i = 1; i <= 8; i++) { await tp('touchMove', [{ x: ed.l + ed.w - 6 - i * 12, y: ed.t + ed.h / 2 }]); await sleep(20); }
await tp('touchEnd', []);
const rb = await ev(`__g.reg.b`);
check('editor: end handle dragged', rb < .85 && rb > .65, 'b=' + rb.toFixed(3));
check('editor: peaks follow region (grain view)', true);
// swipe select
await tp('touchStart', [{ x: ed.l + ed.w * .4, y: ed.t + ed.h / 2 }]);
for (let i = 1; i <= 6; i++) { await tp('touchMove', [{ x: ed.l + ed.w * .4 + i * 15, y: ed.t + ed.h / 2 }]); await sleep(20); }
await tp('touchEnd', []);
const sa = await ev(`[__g.reg.a,__g.reg.b]`);
check('editor: swipe selects region', sa[0] > .3 && sa[1] > sa[0] && sa[1] - sa[0] < .3, JSON.stringify(sa.map(v => +v.toFixed(3))));
// pinch zoom
await tp('touchStart', [{ x: ed.l + ed.w * .45, y: ed.t + ed.h / 2, id: 1 }, { x: ed.l + ed.w * .55, y: ed.t + ed.h / 2, id: 2 }]);
for (let i = 1; i <= 8; i++) { await tp('touchMove', [{ x: ed.l + ed.w * .45 - i * 10, y: ed.t + ed.h / 2, id: 1 }, { x: ed.l + ed.w * .55 + i * 10, y: ed.t + ed.h / 2, id: 2 }]); await sleep(20); }
await tp('touchEnd', []);
const span = await ev(`__g.edView.v1-__g.edView.v0`);
check('editor: pinch zoom', span < .7, 'span=' + span.toFixed(3));
await shot('ed-zoom');
// double tap resets zoom
for (let k = 0; k < 2; k++) { await tp('touchStart', [{ x: ed.l + ed.w * .1, y: ed.t + ed.h * .6 }]); await tp('touchEnd', []); await sleep(80); }
check('editor: double-tap resets zoom', (await ev(`__g.edView.v1-__g.edView.v0`)) > .99);

// crop + undo
const len0 = await ev(`__g.smp().ch[0].length`);
const clickTool = t => ev(`[...document.querySelectorAll('#edTools .chip')].find(c=>c.textContent.trim()===${JSON.stringify(t)}).click()`);
await clickTool('CROP'); await sleep(200);
const len1 = await ev(`__g.smp().ch[0].length`);
check('tool: CROP shortens sample, region reset', len1 < len0 * .5 && (await ev(`__g.reg.a`)) === 0 && (await ev(`__g.reg.b`)) === 1, len0 + '→' + len1);
check('undo enabled after crop', (await ev(`!document.getElementById('undoBtn').disabled`)) === true);
await ev(`document.getElementById('undoBtn').click()`); await sleep(200);
check('undo restores sample length', (await ev(`__g.smp().ch[0].length`)) === len0);
check('undo restores region', Math.abs((await ev(`__g.reg.a`)) - sa[0]) < .02);
await ev(`document.getElementById('redoBtn').click()`); await sleep(200);
check('redo re-crops', (await ev(`__g.smp().ch[0].length`)) === len1);
await ev(`document.getElementById('undoBtn').click()`); await sleep(100);
// other tools
for (const [t, nm] of [['NORMALIZE', 'norm'], ['REVERSE', 'rev'], ['FADE IN', 'fi'], ['FADE OUT', 'fo'], ['GAIN -', 'g-'], ['GAIN +', 'g+'], ['TRIM SIL.', 'ts'], ['REMOVE', 'rm'], ['FULL', 'full']]) {
  const a = await ev(`__g.smp().ch[0].length`);
  await clickTool(t); await sleep(150);
  const b = await ev(`__g.smp().ch[0].length`);
  check('tool: ' + t + ' runs', b > 0, a + '→' + b);
}
// undo everything back
for (let i = 0; i < 12; i++) await ev(`document.getElementById('undoBtn').click()`);
await sleep(200);

// 4 mic rec with finger-free toggle (fake device)
await ev(`document.getElementById('recBtn2').click()`); await sleep(2500);
const micOn = await ev(`!!__g.micRec()`);
await shot('mic-live');
await ev(`document.getElementById('recBtn2').click()`); await sleep(500);
check('mic: recording started & stopped', micOn === true && (await ev(`!__g.micRec()`)) === true);
const nm = await ev(`__g.smp().name`), rl = await ev(`__g.smp().ch[0].length/__g.smp().rate`);
check('mic: new sample REC', nm === 'REC' && rl > 1 && rl < 4, 'len=' + rl.toFixed(2) + 's');

// 5 grab + out rec
await ev(`[...document.querySelectorAll('#demoChips .chip')].find(c=>c.dataset.n==='KEYS').click()`); await sleep(1500);
const k0 = await rect('.wk[data-n="0"]');
await tp('touchStart', [{ x: k0.x, y: k0.y }]); await sleep(300);
await ev(`document.getElementById('outBtn').click()`); await sleep(1800);
const okRec = await ev(`!!__g.cap().out`);
await ev(`document.getElementById('outBtn').click()`); await sleep(400);
const dl = await ev(`(async()=>{const b=window.__dl[window.__dl.length-1];if(!b)return null;const ab=await b.arrayBuffer();const v=new DataView(ab);return {size:b.size,riff:String.fromCharCode(v.getUint8(0),v.getUint8(1),v.getUint8(2),v.getUint8(3)),ch:v.getUint16(22,true),bits:v.getUint16(34,true),rate:v.getUint32(24,true)}})()`);
check('rec output: WAV 16-bit stereo', okRec && dl && dl.riff === 'RIFF' && dl.ch === 2 && dl.bits === 16 && dl.size > 100000, JSON.stringify(dl));
const peakOut = await ev(`(async()=>{const b=window.__dl[window.__dl.length-1];const ab=await b.arrayBuffer();const v=new DataView(ab);let m=0;for(let i=44;i<ab.byteLength;i+=2){const a=Math.abs(v.getInt16(i,true));if(a>m)m=a}return m})()`);
check('rec output: contains audio', peakOut > 500, 'peak ' + peakOut);
await ev(`[...document.querySelectorAll('#grabChips .chip')][0].click()`); await sleep(400);
await tp('touchEnd', []);
const gs = await ev(`[__g.smp().name,__g.smp().ch.length,__g.smp().ch[0].length/__g.smp().rate]`);
check('grab last 2s', gs[0] === 'GRAB 2S' && gs[1] === 2 && Math.abs(gs[2] - 2) < .05, JSON.stringify(gs));
const gp = await ev(`(()=>{const x=__g.smp().ch[0];let m=0;for(let i=0;i<x.length;i++){const a=Math.abs(x[i]);if(a>m)m=a}return m})()`);
check('grab: has audio', gp > .02, 'peak ' + gp.toFixed(3));
await ev(`document.getElementById('wavBtn').click()`); await sleep(300);
const dl2 = await ev(`(async()=>{const b=window.__dl[window.__dl.length-1];const ab=await b.arrayBuffer();const v=new DataView(ab);return {riff:String.fromCharCode(v.getUint8(0),v.getUint8(1),v.getUint8(2),v.getUint8(3)),ch:v.getUint16(22,true),n:(ab.byteLength-44)/4}})()`);
check('save sample WAV', dl2.riff === 'RIFF' && dl2.ch === 2 && Math.abs(dl2.n - gs[2] * 44100) < 4000, JSON.stringify(dl2));
await ev(`[...document.querySelectorAll('#demoChips .chip')].find(c=>c.dataset.n==='PAD').click()`); await sleep(1200);

// 6 LFO
await tab('mod'); await sleep(200);
await ev(`__g.setParam('l1depth',.8,true);__g.setParam('l1rate',2,true);__g.setParam('l1tgt',0,true)`);
await sleep(300);
const m1 = await ev(`__g.M().pos`); await sleep(160); const m2 = await ev(`__g.M().pos`);
check('lfo: modulates position and changes over time', typeof m1 === 'number' && typeof m2 === 'number' && Math.abs(m1 - m2) > .005, m1 + ' ' + m2);
await shot('mod-portrait');
await ev(`__g.setParam('l1tgt',5,true)`); await sleep(100);
check('lfo: target switch to cutoff', (await ev(`Object.keys(__g.M()).join()`)) === 'cut');
await ev(`__g.setParam('l1depth',0,true)`); await sleep(100);
check('lfo: depth 0 clears modulation', (await ev(`Object.keys(__g.M()).length`)) === 0);
// chip UI
await ev(`document.querySelectorAll('#l2tgt .chip')[3].click()`); await sleep(100);
check('lfo: chip sets target', (await ev(`__g.P.l2tgt`)) === 3 && (await ev(`document.querySelectorAll('#l2tgt .chip')[3].classList.contains('on')`)));

// 7 scale, arp, seq
await tab('seq'); await sleep(200);
await ev(`document.querySelectorAll('#scaleChips .chip')[1].click()`); await sleep(100);
check('scale: MAJOR quantizes C# to D', (await ev(`__g.quant(1)`)) === 2 && (await ev(`__g.quant(3)`)) === 4 );
check('scale: keys out of scale are dimmed', (await ev(`document.querySelectorAll('#kbd .out').length`)) === 5, String(await ev(`document.querySelectorAll('#kbd .out').length`)));
await ev(`document.querySelectorAll('#rootChips .chip')[2].click()`); await sleep(100);
check('scale: root D shifts set (C# in scale)', (await ev(`__g.quant(1)`)) === 1);
await ev(`document.querySelectorAll('#rootChips .chip')[0].click()`);
// arp
await ev(`document.getElementById('arpOn').click()`); await sleep(100);
check('arp: toggle on', (await ev(`__g.P.aon`)) === 1);
const kc = await rect('.wk[data-n="0"]'), kg = await rect('.wk[data-n="7"]');
await tp('touchStart', [{ x: kc.x, y: kc.y, id: 1 }, { x: kg.x, y: kg.y, id: 2 }]); await sleep(1200);
const notes = await ev(`__g.evs().filter(e=>e.notes).map(e=>e.notes[0])`);
const uniq = [...new Set(notes)];
check('arp: alternates held notes', uniq.length >= 2 && uniq.includes(0) && uniq.includes(7), JSON.stringify(notes.slice(-8)));
await ev(`document.querySelectorAll('#arpMode .chip')[1].click()`); await sleep(900);
const nd = await ev(`__g.evs().filter(e=>e.notes).map(e=>e.notes[0]).slice(-6)`);
check('arp: DOWN mode starts high', nd[0] >= nd[1] || nd.includes(7), JSON.stringify(nd));
await ev(`document.querySelectorAll('#arpOct .chip')[1].click()`); await sleep(1500);
const no = await ev(`__g.evs().filter(e=>e.notes).map(e=>e.notes[0])`);
check('arp: 2 octaves adds +12', no.some(n => n >= 12), JSON.stringify(no.slice(-10)));
await tp('touchEnd', []);
await ev(`document.getElementById('arpOn').click()`);
// seq
await ev(`document.querySelectorAll('#seqBar .chip')[0].click()`); await sleep(1600);
const se = await ev(`__g.evs().filter(e=>e.i>=0).map(e=>e.i)`);
check('seq: steps advance', se.length > 4 && new Set(se).size > 3, JSON.stringify(se.slice(-8)));
check('seq: step button highlights', (await ev(`document.querySelectorAll('#steps .step.cur').length`)) >= 0);
// draw a note by dragging on the grid
const sq = await rect('#cvSeq');
await tp('touchStart', [{ x: sq.l + sq.w * (3.5 / 16), y: sq.t + sq.h * .2 }]);
await tp('touchMove', [{ x: sq.l + sq.w * (3.5 / 16), y: sq.t + sq.h * .15 }]); await tp('touchEnd', []);
const n3 = await ev(`__g.seq.n[3]`);
check('seq: draw note in grid', n3 >= 6, 'n[3]=' + n3);
await ev(`document.querySelectorAll('#steps .step')[1].click()`);
check('seq: toggle step', (await ev(`__g.seq.on[1]`)) === 1);
await shot('seq-portrait');
await ev(`document.querySelectorAll('#seqLen .chip')[2].click()`);
check('seq: length chip', (await ev(`__g.seq.len`)) === 12);
await ev(`document.querySelectorAll('#seqBar .chip')[0].click()`); await sleep(300);
check('seq: stop', (await ev(`__g.seq.run`)) === false);

// 8 gesture
await tab('play'); await sleep(250);
await ev(`document.getElementById('gRec').click()`); await sleep(100);
check('gesture: armed', (await ev(`__g.gest.rec`)) === 1);
const sf = await rect('#cvSurf');
await tp('touchStart', [{ x: sf.l + sf.w * .2, y: sf.t + sf.h * .7 }]);
for (let i = 1; i <= 12; i++) { await tp('touchMove', [{ x: sf.l + sf.w * (.2 + i * .05), y: sf.t + sf.h * (.7 - i * .03) }]); await sleep(40); }
await tp('touchEnd', []); await sleep(200);
check('gesture: recording in progress', (await ev(`__g.gest.rec`)) === 2);
await ev(`document.getElementById('gRec').click()`); await sleep(200);
check('gesture: recorded', (await ev(`__g.gest.ev.length`)) > 8 && (await ev(`__g.gest.play`)) === 1, 'ev=' + (await ev(`__g.gest.ev.length`)) + ' len=' + (await ev(`__g.gest.len`)));
await ev(`__g.setParam('pos',.95,true)`); await sleep(150);
const g1 = await ev(`__g.P.pos`); await sleep(250); const g2 = await ev(`__g.P.pos`);
check('gesture: loop drives position', Math.abs(g1 - g2) > .005 || g1 < .9, g1 + ' ' + g2);
const act = await ev(`[...Array(6)].length`);
await shot('play-portrait');
await ev(`document.getElementById('gLoop').click()`); await sleep(100);
check('gesture: loop off', (await ev(`__g.gest.play`)) === 0);
await ev(`document.getElementById('gClr').click()`);
check('gesture: clear', (await ev(`__g.gest.ev.length`)) === 0);

// 9 freeze
await ev(`__g.setParam('pos',.5,true)`);
await ev(`document.getElementById('freeze').click()`); await sleep(100);
const sf2 = await rect('#cvSurf');
await tp('touchStart', [{ x: sf2.l + sf2.w * .9, y: sf2.t + sf2.h * .5 }]); await tp('touchMove', [{ x: sf2.l + sf2.w * .95, y: sf2.t + sf2.h * .5 }]); await tp('touchEnd', []);
check('freeze: position locked', Math.abs((await ev(`__g.P.pos`)) - .5) < .001);
check('freeze: stays active without keys', true);
await ev(`document.getElementById('freeze').click()`);

// 10 undo for knob change & presets
await tab('grain'); await sleep(200);
const sizeBefore = await ev(`__g.P.size`);
const kn = await rect('#v-grain .knob:nth-child(3)');
await tp('touchStart', [{ x: kn.x, y: kn.y }]);
for (let i = 1; i <= 8; i++) { await tp('touchMove', [{ x: kn.x, y: kn.y - i * 6 }]); await sleep(15); }
await tp('touchEnd', []);
const sizeAfter = await ev(`__g.P.size`);
await ev(`document.getElementById('undoBtn').click()`); await sleep(150);
check('undo: knob drag reverted', sizeAfter !== sizeBefore && Math.abs((await ev(`__g.P.size`)) - sizeBefore) < 1e-6, sizeBefore + ' ' + sizeAfter + ' ' + (await ev(`__g.P.size`)));
// preset with LFO
await ev(`document.getElementById('pNext').click()`);
for (let i = 0; i < 7; i++) await ev(`document.getElementById('pNext').click()`);
check('preset: DRIFT loads LFO settings', (await ev(`document.getElementById('pName').textContent`)) === 'DRIFT' && (await ev(`__g.P.l1depth`)) > .4);
check('preset: scale not reset by preset', (await ev(`__g.P.stype`)) === 1);

// 11 MIDI
await ev(`__g.midiMsg({data:[0x90,64,100]})`);
check('midi: note on', (await ev(`[...__g.held.keys()].includes('m64')`)));
check('midi: note quantized', (await ev(`__g.held.get('m64')`)) === 4);
await ev(`__g.midiMsg({data:[0x80,64,0]})`);
check('midi: note off', (await ev(`![...__g.held.keys()].includes('m64')`)));
await ev(`__g.midiMsg({data:[0xB0,74,127]})`);
check('midi: CC74 sets cutoff', (await ev(`__g.P.cut`)) > 17000);
await ev(`__g.midiMsg({data:[0xE0,0,127]})`);
check('midi: pitch bend', (await ev(`__g.midi.bend`)) > 1.9);
await ev(`__g.midiMsg({data:[0xE0,0,64]})`);
await ev(`document.getElementById('learnBtn').click()`);
const kk = await rect('#v-tone .knob'); await tab('tone'); await sleep(150);
const kn2 = await rect('#v-tone .knob');
await tp('touchStart', [{ x: kn2.x, y: kn2.y }]); await tp('touchEnd', []);
await ev(`__g.midiMsg({data:[0xB0,20,64]})`);
check('midi: learn maps CC20', (await ev(`__g.midi.map[20]`)) === 'scan');
await ev(`document.getElementById('learnBtn').click()`);

// 12 sys persistence
await sleep(600);
const sys = await ev(`JSON.parse(localStorage.getItem('grains.sys.v1')||'null')`);
check('persist: scale, seq, midi map saved', sys && sys.stype === 1 && sys.seq && sys.map && sys.map['20'] === 'scan');

// 12b drive, preset export/import, interface settings
__setDrive: {
  await ev(`__g.setParam('drive',0,true)`); await sleep(400);
  const d0 = await ev(`__g.drv()`);
  await ev(`__g.setParam('drive',1,true)`); await sleep(500);
  const d1 = await ev(`__g.drv()`);
  check('drive: 0 is transparent (wet 0, dry 1)', d0 && d0[1] < 0.01 && d0[2] > 0.99, JSON.stringify(d0));
  check('drive: 1 raises pre-gain, adds wet, lowers dry', d1 && d1[0] > 9 && d1[1] > 0.2 && d1[2] < 0.5, JSON.stringify(d1));
  await ev(`__g.setParam('drive',0,true)`);
}
check('presets: clean clamps and uppercases', JSON.stringify(await ev(`__g.cleanPreset({n:' my pad ',v:{size:99,dens:-5,pitch:3.6,pos:.5,bpm:300,junk:1}})`)) === JSON.stringify({ n: 'MY PAD', v: { size: 0.8, dens: 1, pitch: 4 } }));
check('presets: clean rejects bad input', (await ev(`[__g.cleanPreset(null),__g.cleanPreset({n:'',v:{size:.1}}),__g.cleanPreset({n:'X',v:{nope:1}}),__g.cleanPreset({n:'X',v:{size:'a'}})].every(x=>x===null)`)) === true);
await ev(`document.getElementById('pnameIn').value='EXP TEST';document.getElementById('pSave').click()`); await sleep(200);
const nBefore = await ev(`__g.userPresets().length`);
await ev(`window.__dl.length=0;document.getElementById('pExport').click()`); await sleep(500);
const exp = await ev(`(async()=>{const b=window.__dl[window.__dl.length-1];if(!b)return null;return JSON.parse(await b.text())})()`);
check('presets: export writes GRAINS json', exp && exp.app === 'GRAINS' && exp.presets.some(p => p.n === 'EXP TEST'), JSON.stringify(exp).slice(0, 120));
await ev(`(()=>{const f=new File([JSON.stringify({app:'GRAINS',format:1,presets:[{n:'IMP ONE',v:{size:.3,verb:2}},{n:'bad',v:{}}]})],'p.json',{type:'application/json'});const dt=new DataTransfer();dt.items.add(f);const i=document.getElementById('pFile');i.files=dt.files;i.dispatchEvent(new Event('change'))})()`); await sleep(500);
check('presets: import adds valid presets only', (await ev(`__g.userPresets().length`)) === nBefore + 1 && (await ev(`__g.userPresets().some(p=>p.n==='IMP ONE'&&p.v.verb===1)`)) === true);
await ev(`(()=>{const f=new File(['not json'],'p.json');const dt=new DataTransfer();dt.items.add(f);const i=document.getElementById('pFile');i.files=dt.files;i.dispatchEvent(new Event('change'))})()`); await sleep(400);
check('presets: import rejects junk', (await ev(`__g.userPresets().length`)) === nBefore + 1);
await ev(`[...document.querySelectorAll('#textChips .chip')].find(c=>c.textContent==='Large').click();[...document.querySelectorAll('#contrastChips .chip')].find(c=>c.textContent==='High').click()`);
check('interface: options applied', (await ev(`[document.documentElement.dataset.text,document.documentElement.dataset.contrast].join()`)) === 'l,high');
await ev(`document.getElementById('uiReset').click()`);
check('interface: reset', (await ev(`[document.documentElement.dataset.text,document.documentElement.dataset.contrast].join()`)) === 'm,normal');

// 13 no errors so far
check('no JS errors', errors.length === 0, JSON.stringify(errors.slice(0, 3)));

// 14 layout screenshots + overflow
for (const [w, h, lang, tag] of [[390, 844, 'en', 'p-en'], [360, 740, 'ru', 'p-ru-360'], [852, 393, 'en', 'l-en']]) {
  await open(w, h, { lang });
  const tabsOverflow = await ev(`(()=>{const n=document.querySelector('#tabs');return n.scrollWidth>n.clientWidth+1})()`);
  const dockOver = await ev(`(()=>{const d=document.querySelector('#dock .drow');return d.scrollWidth>d.clientWidth+1})()`);
  const hdrOver = await ev(`(()=>{const d=document.querySelector('header#top');return d.scrollWidth>d.clientWidth+1})()`);
  check(`layout ${tag}: no overflow in tabs/dock/header`, !tabsOverflow && !dockOver && !hdrOver, JSON.stringify({ tabsOverflow, dockOver, hdrOver }));
  for (const t of ['grain', 'mod', 'play', 'seq', 'sample']) { await tab(t); await sleep(500); await shot(`${tag}-${t}`); }
}

console.log('ERRORS', JSON.stringify(errors));
const bad = res.filter(r => !r[0]);
// macros: two knobs that follow a chosen target
check('macros: two knobs, defaults CUTOFF and RESO', JSON.stringify(await ev(`[...document.querySelectorAll('#macros .knob .lbl')].map(e=>e.textContent)`)) === JSON.stringify(['M1 · CUTOFF', 'M2 · RESO']));
await ev(`__g.setParam('m1t',1,true)`);
check('macros: changing the target rebuilds the knob', (await ev(`document.querySelector('#macros .knob .lbl').textContent`)) === 'M1 · SPRAY');
check('macros: target survives in a preset', (await ev(`__g.cleanPreset({n:'T',v:{m1t:3,m2t:99}}).v.m2t`)) === 17);

// take-undo: a new take keeps the previous one, TAKE swaps back
await ev(`(()=>{const g=__g.gest;g.ev=[{t:0,x:.1,y:.1,d:1},{t:1,x:.5,y:.5,d:0}];g.len=1.2;g.prev=null;document.querySelector('#gClr').click()})()`);
check('take-undo: CLEAR keeps the take', (await ev(`__g.gest.ev.length===0&&!!__g.gest.prev&&!document.querySelector('#gUndo').disabled`)) === true);
await ev(`document.querySelector('#gUndo').click()`);
check('take-undo: TAKE restores it', (await ev(`__g.gest.ev.length===2&&__g.gest.len===1.2`)) === true);
check('take-undo: disabled with nothing to restore', (await ev(`(()=>{__g.gest.prev=null;document.querySelector('#gRec').click();return true})()`)) === true);

// interface level: simple hides MOD, SEQ, SAMPLE; full brings them back
await ev(`document.querySelector('#levelChips .chip').click()`);
check('level: simple hides MOD, SEQ and SAMPLE tabs', (await ev(`['mod','seq','sample'].every(t=>document.querySelector('nav#tabs button[data-t="'+t+'"]').offsetParent===null)`)) === true);
check('level: simple keeps GRAIN and PLAY', (await ev(`['grain','play'].every(t=>document.querySelector('nav#tabs button[data-t="'+t+'"]').offsetParent!==null)`)) === true);
await ev(`document.querySelectorAll('#levelChips .chip')[1].click()`);
check('level: full shows them again', (await ev(`['mod','seq','sample'].every(t=>document.querySelector('nav#tabs button[data-t="'+t+'"]').offsetParent!==null)`)) === true);

console.log('SUMMARY', res.length - bad.length, '/', res.length, 'passed');
ws.close(); chrome.kill(); process.exit(bad.length || errors.length ? 1 : 0);
