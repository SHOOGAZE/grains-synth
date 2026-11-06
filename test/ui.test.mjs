import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(tmpdir(), 'grains-shots') + '/';
mkdirSync(OUT, { recursive: true });
const URL_ = pathToFileURL(join(HERE, 'index.test.html')).href; // built by: node build.mjs --test
const PORT = 9337 + (process.pid % 500);
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
  await ev(`localStorage.clear();localStorage.setItem('grains.cfg.v1',JSON.stringify({acc:0,lang:${JSON.stringify(lang)},tips:'off'}));${tour ? '' : "localStorage.setItem('grains.tour','1');"}`);
  await send('Page.reload');
  await sleep(1500);
  await ev(`document.getElementById('startBtn').click()`);
  await sleep(tour ? 3000 : 1800);
}

await send('Page.enable'); await send('Runtime.enable');
await open(390, 844);
// tool effects
await tab('sample'); await sleep(200);
const clickTool = t => ev(`[...document.querySelectorAll('#edTools .chip')].find(c=>c.textContent.trim()===${JSON.stringify(t)}).click()`);
const ch = () => ev(`(()=>{const x=__g.smp().ch[0];return {n:x.length,f:x[Math.floor(x.length*.3)],l:x[x.length-1],f0:x[0],pk:(()=>{let m=0;for(let i=0;i<x.length;i+=3){const a=Math.abs(x[i]);if(a>m)m=a}return m})()}})()`);
const b0 = await ch();
await clickTool('REVERSE'); await sleep(150);
const b1 = await ch();
check('REVERSE: first sample becomes old last', Math.abs(b1.f0 - b0.l) < 1e-6 && Math.abs(b1.l - b0.f0) < 1e-6);
await clickTool('NORMALIZE'); await sleep(150);
check('NORMALIZE: peak .95', Math.abs((await ch()).pk - .95) < .01);
await clickTool('GAIN -'); await sleep(100);
const g1 = (await ch()).pk;
check('GAIN -: -3dB', Math.abs(g1 - .95 * Math.pow(10, -3 / 20)) < .01, String(g1));
await clickTool('FADE IN'); await sleep(100);
check('FADE IN: starts at 0', Math.abs((await ch()).f0) < 1e-6);
await clickTool('FADE OUT'); await sleep(100);
check('FADE OUT: ends at 0', Math.abs((await ch()).l) < 1e-6);
// remove region
await ev(`__g.reg.a=.2;__g.reg.b=.4;`);
const n0 = (await ch()).n;
await clickTool('REMOVE'); await sleep(150);
const n1 = (await ch()).n;
check('REMOVE: deletes region (~20%)', Math.abs(n1 - n0 * .8) < n0 * .02, n0 + '→' + n1);
check('REMOVE: region reset', (await ev(`__g.reg.a`)) === 0);
// engine reads from region: grains inside region only
await ev(`__g.reg.a=.5;__g.reg.b=.6;`);
const k0 = await rect('.wk[data-n="0"]');
await tp('touchStart', [{ x: k0.x, y: k0.y }]); await sleep(900);
const gp = await ev(`__g.grains().slice(-30).every(g=>g.pos>=0&&g.pos<=1)`);
check('engine: grains play with region set', gp);
await tp('touchEnd', []);
await ev(`__g.reg.a=0;__g.reg.b=1;`);
// i18n leftovers
const scan = async (lang) => {
  await ev(`localStorage.setItem('grains.cfg.v1',JSON.stringify({acc:0,lang:'${lang}',tips:'off'}))`);
  await send('Page.reload'); await sleep(1500); await ev(`document.getElementById('startBtn').click()`); await sleep(1500);
  const out = {};
  for (const t of ['grain','tone','mod','play','seq','sample']) {
    await tab(t); await sleep(300);
    out[t] = await ev(`(()=>{const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const s=new Set();let n;while(n=w.nextNode()){const p=n.parentElement;if(!p||/^(SCRIPT|STYLE)$/.test(p.tagName))continue;const t=n.nodeValue.trim();if(/[A-Za-z]{3,}/.test(t)&&p.offsetParent!==null)s.add(t)}return [...s]})()`);
  }
  return out;
};
for (const lang of ['ru', 'es']) {
  const o = await scan(lang);
  const all = new Set(Object.values(o).flat());
  console.log('LEFTOVER', lang, JSON.stringify([...all]));
  for (const t of Object.keys(o)) { await tab(t); await sleep(300); await shot(`i18n-${lang}-${t}`); }
}
// tour in russian and english
for (const lang of ['ru', 'en']) {
  await open(390, 844, { lang, tour: true });
  const steps = [];
  for (let i = 0; i < 30; i++) {
    const st = await ev(`(()=>{const t=document.getElementById('tour');if(!t)return null;const s=t.querySelector('.tspot').getBoundingClientRect(),c=t.querySelector('.tcard').getBoundingClientRect();return {title:t.querySelector('b').textContent,w:Math.round(s.width),h:Math.round(s.height),ct:Math.round(c.top),cb:Math.round(c.bottom),vh:innerHeight}})()`);
    if (!st) break;
    steps.push(st);
    if (i === 6 || i === 10 || i === 13) await shot(`tour-${lang}-${i}`);
    await ev(`document.getElementById('tNext').click()`); await sleep(650);
  }
  console.log('TOUR', lang, steps.length, JSON.stringify(steps.map(s => s.title + ':' + s.w + 'x' + s.h)));
  check('tour ' + lang + ': 15 steps', steps.length === 15, String(steps.length));
  check('tour ' + lang + ': cards fit screen', steps.every(s => s.ct >= 0 && s.cb <= s.vh), JSON.stringify(steps.filter(s => s.ct < 0 || s.cb > s.vh)));
  check('tour ' + lang + ': spotlights not empty (except intro/outro)', steps.filter(s => s.w < 20 && s.h < 20).length <= 2, String(steps.filter(s => s.w < 20).length));
}
// landscape checks
await open(852, 393, { lang: 'en' });
for (const t of ['mod', 'seq', 'sample', 'play']) { await tab(t); await sleep(500); await shot('land-' + t); }
await tab('sample'); await ev(`document.querySelector('#views').scrollTop=400`); await sleep(300); await shot('land-sample2');
console.log('ERRORS', JSON.stringify(errors));
const bad = res.filter(r => !r[0]);
console.log('SUMMARY', res.length - bad.length, '/', res.length, 'passed');
ws.close(); chrome.kill(); process.exit(bad.length || errors.length ? 1 : 0);
