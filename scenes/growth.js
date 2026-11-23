// Bisnis 1: Grafik batang naik + garis tren bercahaya (pertumbuhan/keuangan). Loop mulus, tanpa teks.
window.SCENE = (() => {
  const TAU = Math.PI * 2, NB = 12;
  let parts;
  const rng = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  return {
    init() { const r = rng(9); parts = []; for (let i = 0; i < 70; i++) parts.push([r(), r(), .3 + r(), 1 + (r() * 2 | 0)]); },
    draw(ctx, W, H, t) {
      const p = t * TAU;
      const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#06142a'); g.addColorStop(1, '#0b2c3b');
      ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(120,200,220,.07)'; ctx.lineWidth = H * .0012;
      for (let i = 0; i <= 8; i++) { const y = H * (.2 + .62 * i / 8); ctx.beginPath(); ctx.moveTo(W * .08, y); ctx.lineTo(W * .92, y); ctx.stroke(); }
      for (let i = 0; i <= 12; i++) { const x = W * (.08 + .84 * i / 12); ctx.beginPath(); ctx.moveTo(x, H * .2); ctx.lineTo(x, H * .82); ctx.stroke(); }
      parts.forEach(([x, y0, s, sp]) => { const y = (((y0 - t * sp) % 1) + 1) % 1 * H; ctx.fillStyle = `rgba(110,240,210,${.12 + .3 * s * (1 - y / H)})`; ctx.beginPath(); ctx.arc(x * W, y, H * .0028 * s, 0, TAU); ctx.fill(); });
      const L = W * .1, R = W * .9, B = H * .82, Tp = H * .2, ch = B - Tp, step = (R - L) / NB, bw = step * .62, tops = [];
      for (let i = 0; i < NB; i++) {
        const u = i / (NB - 1), h = ch * (.2 + .55 * u + .07 * Math.sin(p * (1 + i % 2) + i * 1.3)), x = L + i * step + (step - bw) / 2, y = B - h;
        const gr = ctx.createLinearGradient(0, y, 0, B); gr.addColorStop(0, '#25d9a4'); gr.addColorStop(1, '#0a5f52');
        ctx.fillStyle = gr; ctx.beginPath(); ctx.roundRect(x, y, bw, h, bw * .16); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.beginPath(); ctx.roundRect(x, y, bw, Math.min(h, H * .008), bw * .16); ctx.fill();
        tops.push([x + bw / 2, y - H * .04]);
      }
      const path = () => { ctx.beginPath(); ctx.moveTo(tops[0][0], tops[0][1]); for (let i = 1; i < NB - 1; i++) { const mx = (tops[i][0] + tops[i + 1][0]) / 2, my = (tops[i][1] + tops[i + 1][1]) / 2; ctx.quadraticCurveTo(tops[i][0], tops[i][1], mx, my); } ctx.lineTo(tops[NB - 1][0], tops[NB - 1][1]); };
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      [[H * .024, .1], [H * .012, .25], [H * .0055, 1]].forEach(([w0, a]) => { path(); ctx.strokeStyle = `rgba(127,245,220,${a})`; ctx.lineWidth = w0; ctx.stroke(); });
      tops.forEach((q, i) => { const r = H * .011 * (1 + .25 * Math.sin(p * 2 + i * .6)); const gl = ctx.createRadialGradient(q[0], q[1], 0, q[0], q[1], r * 3); gl.addColorStop(0, 'rgba(127,245,220,.5)'); gl.addColorStop(1, 'rgba(127,245,220,0)'); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(q[0], q[1], r * 3, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(q[0], q[1], r, 0, TAU); ctx.fill(); });
      const at = u => { const f = u * (NB - 1), i = Math.min(NB - 2, Math.floor(f)), k = f - i; return [tops[i][0] + (tops[i + 1][0] - tops[i][0]) * k, tops[i][1] + (tops[i + 1][1] - tops[i][1]) * k]; };
      for (let j = 14; j >= 0; j--) { const u = (((t * 2 - j * .006) % 1) + 1) % 1, q = at(u), a = 1 - j / 15, r = H * .014 * a; ctx.fillStyle = `rgba(255,255,255,${.85 * a * a})`; ctx.beginPath(); ctx.arc(q[0], q[1], r, 0, TAU); ctx.fill(); }
      const ax = W * .84, ay = H * .3 + Math.sin(p * 2) * H * .012, ag = ctx.createRadialGradient(ax, ay, 0, ax, ay, H * .22); ag.addColorStop(0, 'rgba(40,230,170,.28)'); ag.addColorStop(1, 'rgba(40,230,170,0)'); ctx.fillStyle = ag; ctx.fillRect(0, 0, W, H);
      const af = ctx.createLinearGradient(0, ay - H * .1, 0, ay + H * .1); af.addColorStop(0, '#7ff5dc'); af.addColorStop(1, '#16a37f'); ctx.fillStyle = af;
      ctx.beginPath(); ctx.moveTo(ax, ay - H * .1); ctx.lineTo(ax + H * .06, ay - H * .02); ctx.lineTo(ax + H * .02, ay - H * .02); ctx.lineTo(ax + H * .02, ay + H * .09); ctx.lineTo(ax - H * .02, ay + H * .09); ctx.lineTo(ax - H * .02, ay - H * .02); ctx.lineTo(ax - H * .06, ay - H * .02); ctx.closePath(); ctx.fill();
    }
  };
})();
