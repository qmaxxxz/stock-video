// Niche 4: Sel mikroskopis membelah (reaksi-difusi Gray-Scott, pola "mitosis"). Sains/biologi, simulasi nyata.
window.SCENE = (() => {
  const GW = 480, GH = 270, F = .0367, K = .0649, WARM = 3400, SPF = 6;
  let A, B, A2, B2, off, octx, img, lut;
  const rng = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  function step() {
    for (let y = 0; y < GH; y++) {
      const ym = ((y - 1 + GH) % GH) * GW, y0 = y * GW, yp = ((y + 1) % GH) * GW;
      for (let x = 0; x < GW; x++) {
        const xm = (x - 1 + GW) % GW, xp = (x + 1) % GW, i = y0 + x;
        const a = A[i], b = B[i];
        const la = .2 * (A[y0 + xm] + A[y0 + xp] + A[ym + x] + A[yp + x]) + .05 * (A[ym + xm] + A[ym + xp] + A[yp + xm] + A[yp + xp]) - a;
        const lb = .2 * (B[y0 + xm] + B[y0 + xp] + B[ym + x] + B[yp + x]) + .05 * (B[ym + xm] + B[ym + xp] + B[yp + xm] + B[yp + xp]) - b;
        const r = a * b * b;
        A2[i] = a + la - r + F * (1 - a); B2[i] = b + .5 * lb + r - (K + F) * b;
      }
    }
    let t = A; A = A2; A2 = t; t = B; B = B2; B2 = t;
  }
  return {
    init() {
      const n = GW * GH; A = new Float32Array(n).fill(1); B = new Float32Array(n); A2 = new Float32Array(n); B2 = new Float32Array(n);
      const r = rng(21);
      for (let s = 0; s < 70; s++) { const sx = 10 + (r() * (GW - 30)) | 0, sy = 10 + (r() * (GH - 30)) | 0; for (let y = 0; y < 9; y++) for (let x = 0; x < 9; x++) { A[(sy + y) * GW + sx + x] = .5; B[(sy + y) * GW + sx + x] = .25 + .1 * r(); } }
      for (let i = 0; i < WARM; i++) step();
      off = document.createElement('canvas'); off.width = GW; off.height = GH; octx = off.getContext('2d'); img = octx.createImageData(GW, GH);
      const stops = [[0, [3, 8, 22]], [.25, [6, 40, 78]], [.55, [0, 170, 160]], [.8, [130, 255, 205]], [1, [255, 255, 240]]];
      lut = new Uint8Array(256 * 3);
      for (let i = 0; i < 256; i++) { const u = i / 255; let k = 1; while (k < stops.length - 1 && u > stops[k][0]) k++; const a = stops[k - 1], b = stops[k], f = Math.min(1, Math.max(0, (u - a[0]) / (b[0] - a[0]))); for (let c = 0; c < 3; c++) lut[i * 3 + c] = a[1][c] + (b[1][c] - a[1][c]) * f; }
    },
    draw(ctx, W, H) {
      for (let i = 0; i < SPF; i++) step();
      const d = img.data; for (let i = 0; i < GW * GH; i++) { const q = Math.min(255, B[i] * 620 | 0) * 3; d[i * 4] = lut[q]; d[i * 4 + 1] = lut[q + 1]; d[i * 4 + 2] = lut[q + 2]; d[i * 4 + 3] = 255; }
      octx.putImageData(img, 0, 0);
      ctx.globalCompositeOperation = 'source-over'; ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'; ctx.filter = 'none'; ctx.drawImage(off, 0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .55; ctx.filter = `blur(${H * .012}px)`; ctx.drawImage(off, 0, 0, W, H); ctx.filter = 'none'; ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
      const v = ctx.createRadialGradient(W / 2, H / 2, H * .35, W / 2, H / 2, W * .65); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.55)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
    }
  };
})();
