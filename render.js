// Render deterministik: setiap frame digambar di canvas Chromium, dikirim sebagai PNG ke ffmpeg.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const get = (k, d) => { const i = args.indexOf('--' + k); return i > -1 ? args[i + 1] : d; };

const scene = get('scene');
if (!['silk', 'terrain', 'aurora', 'hex', 'ridges', 'car', 'turbines', 'qubit', 'bloom', 'cells', 'topo', 'growth', 'dash', 'logistics', 'gears', 'roadmap'].includes(scene)) {
  console.error('Pakai: node render.js --scene silk|terrain|aurora|hex|ridges|car|turbines|qubit|bloom|cells|topo|growth|dash|logistics|gears|roadmap [--seconds 20] [--fps 30] [--preview true]');
  process.exit(1);
}
const preview = get('preview', 'false') === 'true';
const fps = Number(get('fps', 30));
const seconds = Number(get('seconds', preview ? 4 : 20));
const size = get('size', preview ? '1920x1080' : '3840x2160').split('x').map(Number);
const W = size[0], H = size[1];
const outName = get('out', '');
const N = Math.round(seconds * fps);

fs.mkdirSync(path.join(dir, 'out'), { recursive: true });
const outFile = path.join(dir, 'out', outName || `${scene}_${W}x${H}_${fps}fps${preview ? '_preview' : ''}.mp4`);

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--font-render-hinting=none'] });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await page.setContent(`<!doctype html><body style="margin:0;background:#000"><canvas id="c" width="${W}" height="${H}" style="display:block"></canvas></body>`);
await page.addScriptTag({ path: path.join(dir, 'scenes', scene + '.js') });
const sceneVf = await page.evaluate(([w, h, sec]) => {
  window.W = w; window.H = h;
  const cv = document.getElementById('c');
  if (window.SCENE.webgl) window.SCENE.init(cv, w, h, sec);
  else { window.ctx = cv.getContext('2d'); window.SCENE.init(window.ctx, w, h); }
  return window.SCENE.vf ? window.SCENE.vf(w, h) : '';
}, [W, H, seconds]);
const ff = spawn('ffmpeg', [
  '-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
  '-vf', (sceneVf ? sceneVf + ',' : '') + 'scale=in_range=full:out_range=tv:out_color_matrix=bt709,format=yuv420p',
  '-c:v', 'libx264', '-preset', preview ? 'veryfast' : 'slow', '-crf', preview ? '20' : '16',
  '-profile:v', 'high', '-g', String(fps * 2),
  '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
  '-movflags', '+faststart', outFile
], { stdio: ['pipe', 'inherit', 'inherit'] });
const ffDone = new Promise((res, rej) => { ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg gagal: ' + c))); });

console.log(`Render ${scene}: ${N} frame, ${W}x${H}, ${fps} fps -> ${outFile}`);
const t0 = Date.now();
for (let f = 0; f < N; f++) {
  await page.evaluate(([t, i]) => window.SCENE.webgl ? window.SCENE.draw(t, i) : window.SCENE.draw(window.ctx, window.W, window.H, t, i), [f / N, f]);
  const png = await page.screenshot({ type: 'png' });
  if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once('drain', r));
  if (f % 30 === 0) console.log(`frame ${f}/${N} (${((Date.now() - t0) / 1000).toFixed(0)} dtk)`);
}
ff.stdin.end();
await ffDone;
await browser.close();
console.log('Selesai:', outFile);
