// Niche 5: Peta topografi kontur yang mengalir (GIS/outdoor/data). Marching squares, loop mulus.
window.SCENE = (() => {
  const TAU = Math.PI * 2;
  const G = [
    { cx: .3, cy: .45, ax: .08, ay: .06, m: 1, ph: 0, a: 1, s: .045 }, { cx: .62, cy: .4, ax: .07, ay: .09, m: 2, ph: 1.3, a: .9, s: .06 },
    { cx: .5, cy: .72, ax: .1, ay: .05, m: 1, ph: 2.6, a: .8, s: .05 }, { cx: .8, cy: .7, ax: .05, ay: .06, m: 2, ph: .7, a: .7, s: .04 },
    { cx: .15, cy: .78, ax: .05, ay: .05, m: 1, ph: 4, a: .6, s: .04 }, { cx: .45, cy: .2, ax: .09, ay: .04, m: 2, ph: 5.1, a: .7, s: .05 }
  ];
  const LV = 16;
  return {
    init() {},
    draw(ctx, W, H, t) {
      const p = t * TAU, cell = H / 72, nx = Math.ceil(W / cell) + 1, ny = Math.ceil(H / cell) + 1, asp = W / H, val = new Float32Array(nx * ny);
      const cs = G.map(g => [g.cx + g.ax * Math.cos(p * g.m + g.ph), g.cy + g.ay * Math.sin(p * g.m + g.ph), g.a, g.s]);
      for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
        const x = i * cell / W, y = j * cell / H; let h = 0;
        for (const [cx, cy, a, s] of cs) { const dx = (x - cx) * asp, dy = y - cy; h += a * Math.exp(-(dx * dx + dy * dy) / s); }
        h += .09 * Math.sin(TAU * (x * 1.3 + y * .9) + p) + .06 * Math.sin(TAU * (x * 2.1 - y * 1.7) - 2 * p); val[j * nx + i] = h;
      }
      const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#08262a'); g.addColorStop(1, '#051619');
      ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      for (let L = 0; L < LV; L++) {
        const lv = .1 + L * .075, u = L / (LV - 1), idx = L % 5 === 0;
        ctx.strokeStyle = `rgba(${90 + 165 * u | 0},${215 + 15 * u | 0},${205 - 45 * u | 0},${idx ? .95 : .5})`; ctx.lineWidth = H * (idx ? .0030 : .0013); ctx.beginPath();
        for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
          const a = val[j * nx + i], b = val[j * nx + i + 1], c = val[(j + 1) * nx + i + 1], d = val[(j + 1) * nx + i];
          const cs2 = (a > lv ? 1 : 0) | (b > lv ? 2 : 0) | (c > lv ? 4 : 0) | (d > lv ? 8 : 0); if (cs2 === 0 || cs2 === 15) continue;
          const x0 = i * cell, y0 = j * cell, T = () => [x0 + cell * (lv - a) / (b - a), y0], Rr = () => [x0 + cell, y0 + cell * (lv - b) / (c - b)], Bm = () => [x0 + cell * (lv - d) / (c - d), y0 + cell], Lf = () => [x0, y0 + cell * (lv - a) / (d - a)];
          const seg = (p1, p2) => { ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); };
          switch (cs2) { case 1: case 14: seg(Lf(), T()); break; case 2: case 13: seg(T(), Rr()); break; case 3: case 12: seg(Lf(), Rr()); break; case 4: case 11: seg(Rr(), Bm()); break; case 6: case 9: seg(T(), Bm()); break; case 7: case 8: seg(Lf(), Bm()); break; case 5: seg(Lf(), T()); seg(Rr(), Bm()); break; case 10: seg(T(), Rr()); seg(Lf(), Bm()); break; }
        }
        ctx.stroke();
      }
      const v = ctx.createRadialGradient(W / 2, H / 2, H * .4, W / 2, H / 2, W * .65); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.45)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
    }
  };
})();
