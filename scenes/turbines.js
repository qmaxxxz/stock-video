// Niche 1: Turbin angin di lanskap senja (energi terbarukan). Loop mulus: semua rotasi/awan berkelipatan bulat.
window.SCENE = (() => {
  const TAU = Math.PI * 2;
  const rng = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const LAY = [
    { b: .665, a: .03, c1: 1.4, c2: 3.1, p1: .4, p2: 1.9, col: '#b07aa0', xs: [.1, .27, .44, .6, .78, .93], s: .42, rev: 2 },
    { b: .735, a: .045, c1: 1.1, c2: 2.6, p1: 2.2, p2: .7, col: '#80507f', xs: [.07, .36, .7, .9], s: .7, rev: 3 },
    { b: .815, a: .055, c1: .9, c2: 2.2, p1: 4.1, p2: 2.6, col: '#4a2d5e', xs: [.2, .56, .86], s: 1.05, rev: 3 },
    { b: .925, a: .045, c1: .8, c2: 1.9, p1: 1.1, p2: 3.3, col: '#1c1030', xs: [.42], s: 1.6, rev: 4 }
  ];
  let clouds;
  const ry = (l, u, H) => H * (l.b + l.a * (.6 * Math.sin(TAU * (u * l.c1) + l.p1) + .4 * Math.sin(TAU * (u * l.c2) + l.p2)));
  function turbine(ctx, x, y, s, rot, H, col) {
    const th = H * .14 * s, tw = th * .028, hx = x, hy = y - th; ctx.fillStyle = col;
    ctx.beginPath(); ctx.moveTo(x - tw, y + 2); ctx.lineTo(x - tw * .45, hy); ctx.lineTo(x + tw * .45, hy); ctx.lineTo(x + tw, y + 2); ctx.closePath(); ctx.fill();
    ctx.fillRect(hx - tw * 1.2, hy - tw * .9, tw * 2.8, tw * 1.8);
    const bl = th * .48, rw = th * .026;
    for (let k = 0; k < 3; k++) {
      const a = rot + k * TAU / 3, ca = Math.cos(a), sa = Math.sin(a), px = -sa, py = ca;
      ctx.beginPath(); ctx.moveTo(hx + px * rw * .5, hy + py * rw * .5); ctx.lineTo(hx + ca * bl + px * rw * .08, hy + sa * bl + py * rw * .08);
      ctx.lineTo(hx + ca * bl - px * rw * .08, hy + sa * bl - py * rw * .08); ctx.lineTo(hx - px * rw * .5, hy - py * rw * .5); ctx.closePath(); ctx.fill();
    }
    ctx.beginPath(); ctx.arc(hx, hy, tw * .9, 0, TAU); ctx.fill();
  }
  return {
    init() { const r = rng(5); clouds = []; for (let i = 0; i < 8; i++) clouds.push({ x: r(), y: .1 + .3 * r(), w: .12 + .12 * r(), a: .12 + .16 * r() }); },
    draw(ctx, W, H, t) {
      const p = t * TAU;
      const g = ctx.createLinearGradient(0, 0, 0, H * .75); [[0, '#16225a'], [.4, '#5b4f9e'], [.7, '#ee8a78'], [.88, '#ffc27a'], [1, '#ffd9a0']].forEach(([o, c]) => g.addColorStop(o, c));
      ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      const sx = W * .64, sy = H * .66, sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, H * .75);
      sg.addColorStop(0, 'rgba(255,200,120,.75)'); sg.addColorStop(.25, 'rgba(255,160,100,.3)'); sg.addColorStop(1, 'rgba(255,140,90,0)'); ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#fff1c9'; ctx.beginPath(); ctx.arc(sx, sy, H * .042, 0, TAU); ctx.fill();
      const P = W * 1.4;
      clouds.forEach(c => {
        const x = ((c.x * P + t * P) % P) - W * .2, y = c.y * H, w = c.w * W;
        for (let k = 0; k < 4; k++) { const cx = x + (k - 1.5) * w * .3, cy = y + Math.sin(k * 2) * H * .006, gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * .45);
          gr.addColorStop(0, `rgba(255,190,170,${c.a})`); gr.addColorStop(1, 'rgba(255,190,170,0)'); ctx.fillStyle = gr; ctx.save(); ctx.translate(cx, cy); ctx.scale(1, .28); ctx.translate(-cx, -cy); ctx.beginPath(); ctx.arc(cx, cy, w * .45, 0, TAU); ctx.fill(); ctx.restore(); }
      });
      LAY.forEach((l, i) => {
        ctx.fillStyle = l.col; ctx.beginPath(); ctx.moveTo(0, H);
        for (let k = 0; k <= 80; k++) ctx.lineTo(W * k / 80, ry(l, k / 80, H)); ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
        l.xs.forEach((u, j) => turbine(ctx, u * W, ry(l, u, H), l.s, p * l.rev + j * 1.7 + i, H, l.col));
      });
      const hz = ctx.createLinearGradient(0, H * .6, 0, H * .8); hz.addColorStop(0, 'rgba(255,190,130,0)'); hz.addColorStop(1, 'rgba(255,170,120,.10)'); ctx.fillStyle = hz; ctx.fillRect(0, H * .6, W, H * .2);
    }
  };
})();
