// Bisnis 4: Rangkaian roda gigi yang saling mengait (otomasi proses/alur kerja). Loop mulus, rotasi bulat.
window.SCENE = (() => {
  const TAU = Math.PI * 2, GEARS = [{ N: 30, c: ['#5eead4', '#0f766e'] }, { N: 20, c: ['#fbbf24', '#b45309'] }, { N: 30, c: ['#93c5fd', '#1d4ed8'] }, { N: 20, c: ['#fda4af', '#be123c'] }, { N: 30, c: ['#5eead4', '#0f766e'] }];
  const BEAR = [-.62, .5, -.5, .4], REV = 2;
  function gear(ctx, x, y, R, N, ang, cols, H) {
    const a = R * .075, rr = R - a, rt = R + a, d = TAU / N;
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    const gr = ctx.createLinearGradient(-R, -R, R, R); gr.addColorStop(0, cols[0]); gr.addColorStop(1, cols[1]);
    ctx.beginPath();
    for (let i = 0; i < N; i++) { const t0 = i * d; [[rr, -.3], [rt, -.16], [rt, .16], [rr, .3]].forEach(([r, k], j) => { const q = t0 + k * d; i + j ? ctx.lineTo(Math.cos(q) * r, Math.sin(q) * r) : ctx.moveTo(Math.cos(q) * r, Math.sin(q) * r); }); }
    ctx.closePath(); ctx.moveTo(R * .56, 0); ctx.arc(0, 0, R * .56, 0, TAU, true);
    ctx.fillStyle = gr; ctx.fill('evenodd');
    ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = H * .002; ctx.stroke();
    for (let k = 0; k < 5; k++) { ctx.save(); ctx.rotate(k * TAU / 5); const g2 = ctx.createLinearGradient(0, -R * .08, 0, R * .08); g2.addColorStop(0, cols[0]); g2.addColorStop(1, cols[1]); ctx.fillStyle = g2; ctx.fillRect(R * .1, -R * .06, R * .5, R * .12); ctx.restore(); }
    ctx.fillStyle = cols[1]; ctx.beginPath(); ctx.arc(0, 0, R * .2, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.beginPath(); ctx.arc(0, 0, R * .07, 0, TAU); ctx.fill();
    ctx.restore();
  }
  return {
    init() {},
    draw(ctx, W, H, t) {
      const p = t * TAU, mod = H * .0128, g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#10151d'); g.addColorStop(1, '#1d2531');
      ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      const gl = ctx.createRadialGradient(W * .5, H * .5, 0, W * .5, H * .5, H * .8); gl.addColorStop(0, 'rgba(60,140,160,.18)'); gl.addColorStop(1, 'rgba(60,140,160,0)'); ctx.fillStyle = gl; ctx.fillRect(0, 0, W, H);
      const pos = [[W * .16, H * .66]], ang = [p * REV];
      for (let i = 1; i < GEARS.length; i++) {
        const A = GEARS[i - 1], B = GEARS[i], Ra = A.N * mod / 2, Rb = B.N * mod / 2, be = BEAR[i - 1], d = Ra + Rb;
        pos.push([pos[i - 1][0] + Math.cos(be) * d, pos[i - 1][1] + Math.sin(be) * d]);
        ang.push(be + Math.PI - Math.PI / B.N - (A.N / B.N) * (ang[i - 1] - be));
      }
      GEARS.forEach((G, i) => gear(ctx, pos[i][0], pos[i][1], G.N * mod / 2, G.N, ang[i], G.c, H));
      const v = ctx.createRadialGradient(W / 2, H / 2, H * .4, W / 2, H / 2, W * .65); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.4)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
    }
  };
})();
