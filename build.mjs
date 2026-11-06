// Builds the single-file index.html from src/.
//   node build.mjs          -> index.html
//   node build.mjs --test   -> test/index.test.html (adds the src/test-hook.js debug hook)
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const cat = (dir, ext, extra = []) =>
  readdirSync(join(root, 'src', dir)).filter(f => f.endsWith(ext)).sort()
    .map(f => readFileSync(join(root, 'src', dir, f), 'utf8')).concat(extra).join('');

const test = process.argv.includes('--test');
const css = cat('css', '.css');
const js = cat('js', '.js', test ? [readFileSync(join(root, 'src', 'test-hook.js'), 'utf8')] : []);
const tpl = readFileSync(join(root, 'src', 'index.html'), 'utf8');
const out = tpl.replace('<!--@css-->\n', () => css).replace('<!--@js-->\n', () => js);

if (test) {
  mkdirSync(join(root, 'test'), { recursive: true });
  writeFileSync(join(root, 'test', 'index.test.html'), out);
  console.log('test/index.test.html', out.length, 'bytes');
} else {
  writeFileSync(join(root, 'index.html'), out);
  console.log('index.html', out.length, 'bytes');
}
