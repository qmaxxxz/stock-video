// Niche 3: Mekar rasio emas (phyllotaxis, ala bunga matahari). Alam + matematika, loop mulus.
window.SCENE = (() => {
  const TAU = Math.PI * 2, GA = 2.399963229728653, N = 2800;
  const pal = [[0, [255, 244, 176]], [.3, [255, 190, 70]], [.65, [255, 100, 60]], [1, [170, 30, 90]]];
  const col = u => { for (let i = 1; i < pal.length; i++) if (u <= pal[i][0]) { const a = pal[i - 1], b = pal[i], t = (u - a[0]) / (b[0] - a[0]); return a[1].map((v, j) => v + (b[1][j] - v) * t); } return pal[3][1]; };
  return {
    init() {},
    draw(ctx, W, H, t) {
      const p = t * TAU, c = H * .0088, cx = W / 2, cy = H / 2;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * .6); g.addColorStop(0, '#0d2e2c'); g.addColorStop(1, '#030a0c');
      ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      for (let n = 1; n <= N; n++) {
        const u = n / N, a = n * (GA + .00005 * Math.sin(p)) + p, r = c * Math.sqrt(n), x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
        const s = c * (.42 + .6 * u) * (1 + .25 * Math.sin(n * .012 - p * 3)), k = col(u);
        ctx.fillStyle = `rgba(${k[0] | 0},${k[1] | 0},${k[2] | 0},${.62 + .3 * u})`; ctx.beginPath(); ctx.arc(x, y, s, 0, TAU); ctx.fill();
      }
      const gl = ctx.createRadialGradient(cx, cy, 0, cx, cy, H * .45); gl.addColorStop(0, 'rgba(255,200,100,.22)'); gl.addColorStop(1, 'rgba(255,200,100,0)'); ctx.fillStyle = gl; ctx.fillRect(0, 0, W, H);
    }
  };
})();
