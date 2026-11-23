// Bisnis 2: Kartu dasbor analitik melayang (data/analitik), gaya UI bersih, tanpa teks. Loop mulus.
window.SCENE = (() => {
  const TAU = Math.PI * 2;
  const CARDS = [
    { x: .27, y: .32, w: .5, h: .32, type: 'line', z: .7, m: 1, ph: 0 }, { x: .66, y: .27, w: .36, h: .36, type: 'donut', z: 1, m: 2, ph: 1 },
    { x: .84, y: .66, w: .42, h: .28, type: 'bars', z: .55, m: 1, ph: 2 }, { x: .42, y: .72, w: .4, h: .32, type: 'list', z: .9, m: 2, ph: 3 },
    { x: .1, y: .74, w: .26, h: .3, type: 'ring', z: .4, m: 1, ph: 4 }, { x: .68, y: .9, w: .4, h: .2, type: 'sliders', z: .65, m: 2, ph: 5 }
  ];
  const BL = '#3b82f6', VI = '#8b5cf6', TE = '#14b8a6', OR = '#f59e0b', GR = '#d5deec';
  const pill = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.beginPath(); ctx.roundRect(x, y, w, h, h / 2); ctx.fill(); };
  function content(ctx, c, w, h, p, U) {
    const pad = U * .035; pill(ctx, pad, pad, w * .28, U * .022, GR); pill(ctx, pad, pad + U * .035, w * .16, U * .014, '#e6ecf6');
    if (c.type === 'line') {
      const n = 9, x0 = pad, x1 = w - pad, yb = h - pad, yt = pad * 2 + U * .07, pts = [];
      for (let i = 0; i < n; i++) pts.push([x0 + (x1 - x0) * i / (n - 1), yt + (yb - yt) * (1 - (.5 + .22 * Math.sin(i * .9 + p) + .12 * Math.sin(i * 1.7 - 2 * p)))]);
      const g = ctx.createLinearGradient(0, yt, 0, yb); g.addColorStop(0, 'rgba(59,130,246,.3)'); g.addColorStop(1, 'rgba(59,130,246,0)');
      ctx.beginPath(); ctx.moveTo(x0, yb); pts.forEach(q => ctx.lineTo(q[0], q[1])); ctx.lineTo(x1, yb); ctx.closePath(); ctx.fillStyle = g; ctx.fill();
      ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.strokeStyle = BL; ctx.lineWidth = U * .008; ctx.lineJoin = 'round'; ctx.stroke();
      const e = pts[n - 1]; ctx.fillStyle = '#fff'; ctx.strokeStyle = BL; ctx.beginPath(); ctx.arc(e[0], e[1], U * .014, 0, TAU); ctx.fill(); ctx.stroke();
    } else if (c.type === 'donut') {
      const cx = w / 2, cy = h * .58, r = Math.min(w, h) * .33, a1 = .4 + .06 * Math.sin(p), a2 = .3 - .05 * Math.sin(p + 1), segs = [[a1, BL], [a2, VI], [1 - a1 - a2, TE]]; let a = -Math.PI / 2 + p * 0;
      ctx.lineWidth = r * .32; ctx.lineCap = 'butt'; segs.forEach(([f, col]) => { ctx.strokeStyle = col; ctx.beginPath(); ctx.arc(cx, cy, r, a, a + f * TAU - .05); ctx.stroke(); a += f * TAU; });
      pill(ctx, cx - w * .12, cy - U * .012, w * .24, U * .024, GR);
    } else if (c.type === 'bars') {
      const n = 7, bw = (w - pad * 2) / n * .6, base = h - pad;
      for (let i = 0; i < n; i++) { const bh = (h - pad * 3 - U * .06) * (.25 + .6 * Math.abs(Math.sin(p * c.m * .5 + i * .8))); ctx.fillStyle = i % 2 ? '#93c5fd' : BL; ctx.beginPath(); ctx.roundRect(pad + i * (w - pad * 2) / n + bw * .3, base - bh, bw, bh, bw * .25); ctx.fill(); }
    } else if (c.type === 'list') {
      const rows = 3, rh = (h - pad * 2 - U * .07) / rows;
      for (let i = 0; i < rows; i++) { const y = pad * 2 + U * .06 + i * rh, hl = .5 + .5 * Math.sin(p * c.m + i * 2.1);
        ctx.fillStyle = `rgba(59,130,246,${.04 + .08 * hl})`; ctx.beginPath(); ctx.roundRect(pad * .6, y, w - pad * 1.2, rh * .86, U * .012); ctx.fill();
        ctx.fillStyle = [BL, VI, TE][i]; ctx.beginPath(); ctx.arc(pad * 1.7, y + rh * .43, rh * .27, 0, TAU); ctx.fill();
        pill(ctx, pad * 3, y + rh * .22, w * .32, U * .016, GR); pill(ctx, pad * 3, y + rh * .5, w * .2, U * .012, '#e6ecf6'); pill(ctx, w - pad - w * .2, y + rh * .3, w * .2, rh * .3, [TE, OR, BL][i]); }
    } else if (c.type === 'ring') {
      const cx = w / 2, cy = h * .5, r = Math.min(w, h) * .3, f = .72 + .08 * Math.sin(p);
      ctx.lineWidth = r * .24; ctx.strokeStyle = '#e8edf7'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke();
      ctx.strokeStyle = VI; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + f * TAU); ctx.stroke();
      pill(ctx, cx - w * .13, cy - U * .012, w * .26, U * .024, GR); pill(ctx, pad, h - pad * 1.8, w * .5, U * .014, '#e6ecf6');
    } else {
      for (let i = 0; i < 3; i++) { const y = pad * 2 + U * .07 + i * (h - pad * 3 - U * .07) / 3 * 1.0, tw = w - pad * 2, k = .3 + .4 * (.5 + .5 * Math.sin(p * c.m + i * 2));
        pill(ctx, pad, y, tw, U * .012, '#e3e9f4'); pill(ctx, pad, y, tw * k, U * .012, [BL, TE, VI][i]); ctx.fillStyle = '#fff'; ctx.strokeStyle = [BL, TE, VI][i]; ctx.lineWidth = U * .004; ctx.beginPath(); ctx.arc(pad + tw * k, y + U * .006, U * .014, 0, TAU); ctx.fill(); ctx.stroke(); }
    }
  }
  return {
    init() {},
    draw(ctx, W, H, t) {
      const p = t * TAU, g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#f1f5fc'); g.addColorStop(1, '#d9e4f6');
      ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      [[.2, .2, '99,140,255'], [.8, .75, '170,130,255']].forEach(([x, y, c]) => { const r = ctx.createRadialGradient(W * x, H * y, 0, W * x, H * y, H * .7); r.addColorStop(0, `rgba(${c},.28)`); r.addColorStop(1, `rgba(${c},0)`); ctx.fillStyle = r; ctx.fillRect(0, 0, W, H); });
      CARDS.slice().sort((a, b) => a.z - b.z).forEach(c => {
        const U = H * .62 * (.8 + .3 * c.z), w = c.w * U * 1.75, h = c.h * U * 1.75, dx = Math.cos(p * c.m + c.ph) * H * .006 * c.z, dy = Math.sin(p * c.m + c.ph) * H * .014 * c.z;
        ctx.save(); ctx.translate(W * c.x - w / 2 + dx, H * c.y - h / 2 + dy);
        ctx.shadowColor = 'rgba(40,70,140,.2)'; ctx.shadowBlur = H * .035 * c.z; ctx.shadowOffsetY = H * .014 * c.z; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.roundRect(0, 0, w, h, H * .02); ctx.fill();
        ctx.shadowColor = 'transparent'; content(ctx, c, w, h, p, U * .75); ctx.restore();
      });
    }
  };
})();
