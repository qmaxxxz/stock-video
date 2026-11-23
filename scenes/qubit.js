// Niche 2: Bola Bloch (komputasi kuantum) berputar, vektor keadaan berpresesi, loop mulus.
window.SCENE = (() => {
  const TAU = Math.PI * 2;
  let stars;
  const rng = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const rot = (p, yaw, tilt) => { const cy = Math.cos(yaw), sy = Math.sin(yaw), x1 = p[0] * cy + p[2] * sy, z1 = -p[0] * sy + p[2] * cy, ct = Math.cos(tilt), st = Math.sin(tilt); return [x1, p[1] * ct - z1 * st, p[1] * st + z1 * ct]; };
  const vec = t => { const th = 1.05 + .4 * Math.sin(2 * TAU * t), ph = 3 * TAU * t; return [Math.sin(th) * Math.cos(ph), Math.cos(th), Math.sin(th) * Math.sin(ph)]; };
  return {
    init(ctx, W, H) { const r = rng(3); stars = []; for (let i = 0; i < 220; i++) stars.push([r(), r(), r()]); },
    draw(ctx, W, H, t) {
      const R = H * .3, yaw = t * TAU, tilt = .42, f = 3.2;
      const pr = q => { const p = rot(q, yaw, tilt), s = f / (f - p[2]); return [W / 2 + p[0] * R * s, H / 2 - p[1] * R * s, p[2], s]; };
      const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * .65); g.addColorStop(0, '#0c1a45'); g.addColorStop(1, '#03050f');
      ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(170,200,255,.5)'; stars.forEach(([x, y, s]) => { ctx.globalAlpha = .2 + .5 * s; ctx.fillRect(x * W, y * H, H * .0016 * (1 + s), H * .0016 * (1 + s)); }); ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round';
      const circ = (fn, n, col, w0, a0) => { let prev = pr(fn(0)); for (let i = 1; i <= n; i++) { const c = pr(fn(i / n)); const d = (prev[2] + c[2]) / 2; ctx.strokeStyle = `rgba(${col},${a0 * (.2 + .8 * (d + 1) / 2)})`; ctx.lineWidth = w0 * (.7 + .3 * (d + 1) / 2); ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(c[0], c[1]); ctx.stroke(); prev = c; } };
      const lw = H * .0018;
      circ(u => [Math.cos(u * TAU), 0, Math.sin(u * TAU)], 120, '120,230,255', lw * 1.6, .9);
      for (let k = 0; k < 6; k++) circ(u => { const a = k * Math.PI / 6; return [Math.cos(u * TAU) * Math.cos(a), Math.sin(u * TAU), Math.cos(u * TAU) * Math.sin(a)]; }, 120, '80,170,255', lw, .5);
      [-60, -30, 30, 60].forEach(d => { const la = d * Math.PI / 180; circ(u => [Math.cos(la) * Math.cos(u * TAU), Math.sin(la), Math.cos(la) * Math.sin(u * TAU)], 90, '80,170,255', lw * .7, .3); });
      [[1.28, 0, 0], [0, 1.28, 0], [0, 0, 1.28]].forEach(a => { const o = pr([-a[0], -a[1], -a[2]]), e = pr(a); ctx.strokeStyle = 'rgba(200,230,255,.35)'; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(o[0], o[1]); ctx.lineTo(e[0], e[1]); ctx.stroke(); });
      // cincin lintasan satelit + titik orbit
      circ(u => { const a = u * TAU, r = 1.42; return [r * Math.cos(a), r * Math.sin(a) * .35, r * Math.sin(a) * .94]; }, 120, '150,120,255', lw * .8, .35);
      for (let k = 0; k < 3; k++) { const a = t * TAU * 2 + k * TAU / 3, q = pr([1.42 * Math.cos(a), 1.42 * Math.sin(a) * .35, 1.42 * Math.sin(a) * .94]); const gr = ctx.createRadialGradient(q[0], q[1], 0, q[0], q[1], H * .02 * q[3]); gr.addColorStop(0, 'rgba(190,160,255,.95)'); gr.addColorStop(1, 'rgba(190,160,255,0)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(q[0], q[1], H * .02 * q[3], 0, TAU); ctx.fill(); }
      // jejak vektor keadaan
      let pv = null;
      for (let j = 90; j >= 0; j--) { const q = pr(vec(t - j * .0011)); if (pv) { const a = 1 - j / 90; ctx.strokeStyle = `rgba(255,${120 + 100 * a | 0},${90 + 20 * a | 0},${.8 * a * a})`; ctx.lineWidth = lw * (1 + 2.2 * a); ctx.beginPath(); ctx.moveTo(pv[0], pv[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); } pv = q; }
      const v = vec(t), o = pr([0, 0, 0]), tip = pr(v), pj = pr([v[0], 0, v[2]]);
      [[lw * 7, .12], [lw * 3, .35], [lw * 1.4, 1]].forEach(([w0, al]) => { ctx.strokeStyle = `rgba(255,215,120,${al})`; ctx.lineWidth = w0; ctx.beginPath(); ctx.moveTo(o[0], o[1]); ctx.lineTo(tip[0], tip[1]); ctx.stroke(); });
      ctx.setLineDash([H * .006, H * .008]); ctx.strokeStyle = 'rgba(255,215,120,.4)'; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(tip[0], tip[1]); ctx.lineTo(pj[0], pj[1]); ctx.stroke(); ctx.setLineDash([]);
      const rg = ctx.createRadialGradient(tip[0], tip[1], 0, tip[0], tip[1], H * .06 * tip[3]); rg.addColorStop(0, 'rgba(255,240,200,1)'); rg.addColorStop(.25, 'rgba(255,190,90,.7)'); rg.addColorStop(1, 'rgba(255,140,60,0)'); ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(tip[0], tip[1], H * .06 * tip[3], 0, TAU); ctx.fill();
      const cg = ctx.createRadialGradient(o[0], o[1], 0, o[0], o[1], H * .03); cg.addColorStop(0, 'rgba(160,220,255,.8)'); cg.addColorStop(1, 'rgba(160,220,255,0)'); ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(o[0], o[1], H * .03, 0, TAU); ctx.fill();
    }
  };
})();
