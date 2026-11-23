// Bisnis 3: Kotak paket di ban berjalan isometrik dengan gerbang pemindai (logistik/rantai pasok). Loop mulus.
window.SCENE = (() => {
  const TAU = Math.PI * 2, L = 56, LANES = [{ y: -4.8, n: 1 }, { y: 0, n: -1 }, { y: 4.8, n: 1 }];
  const COLS = [['#e2b585', '#c99a5b', '#9c7347'], ['#7db4fb', '#4a8cf4', '#2e67d1'], ['#f4f7fb', '#cfd9e6', '#98a8bd'], ['#fdae6b', '#f0742e', '#c2551f']];
  const hs = (a, b) => { const v = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453; return v - Math.floor(v); };
  let ox, oy, s, ctx;
  const iso = (x, y, z) => [ox + (x - y) * .866 * s, oy + (x + y) * .5 * s - z * s];
  const poly = (pts, col) => { ctx.fillStyle = col; ctx.beginPath(); pts.forEach((q, i) => { const a = iso(q[0], q[1], q[2]); i ? ctx.lineTo(a[0], a[1]) : ctx.moveTo(a[0], a[1]); }); ctx.closePath(); ctx.fill(); };
  function cube(x, y, z, a, b, c, col, tape) {
    poly([[x, y, z + c], [x + a, y, z + c], [x + a, y + b, z + c], [x, y + b, z + c]], col[0]);
    poly([[x, y + b, z], [x + a, y + b, z], [x + a, y + b, z + c], [x, y + b, z + c]], col[1]);
    poly([[x + a, y, z], [x + a, y + b, z], [x + a, y + b, z + c], [x + a, y, z + c]], col[2]);
    if (tape) poly([[x, y + b * .42, z + c], [x + a, y + b * .42, z + c], [x + a, y + b * .58, z + c], [x, y + b * .58, z + c]], 'rgba(255,255,255,.35)');
  }
  return {
    init() {},
    draw(c, W, H, t) {
      ctx = c; s = H * .041; ox = W / 2; oy = H * .56;
      const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#eaf1f9'); g.addColorStop(1, '#c9d9ec'); ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(90,120,160,.16)'; ctx.lineWidth = H * .0012;
      for (let k = -36; k <= 36; k += 4) { let a = iso(k, -30, 0), b = iso(k, 30, 0); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); a = iso(-30, k, 0); b = iso(30, k, 0); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
      const gx = 2, bh = .6;
      LANES.forEach(l => {
        const y0 = l.y - 1.6, y1 = l.y + 1.6;
        poly([[-L / 2, y1, 0], [L / 2, y1, 0], [L / 2, y1, bh], [-L / 2, y1, bh]], '#1f2a3b'); poly([[L / 2, y0, 0], [L / 2, y1, 0], [L / 2, y1, bh], [L / 2, y0, bh]], '#172131');
        poly([[-L / 2, y0, bh], [L / 2, y0, bh], [L / 2, y1, bh], [-L / 2, y1, bh]], '#3b4a60');
        const off = ((t * L * l.n) % 2 + 2) % 2; ctx.strokeStyle = 'rgba(255,255,255,.09)'; ctx.lineWidth = H * .0016;
        for (let xs = -L / 2 + off; xs < L / 2; xs += 2) { const a = iso(xs, y0, bh), b = iso(xs, y1, bh); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
        poly([[-L / 2, y0, bh], [L / 2, y0, bh], [L / 2, y0 + .14, bh], [-L / 2, y0 + .14, bh]], '#f6a323'); poly([[-L / 2, y1 - .14, bh], [L / 2, y1 - .14, bh], [L / 2, y1, bh], [-L / 2, y1, bh]], '#f6a323');
      });
      // gerbang: tiang belakang + balok sebelum kotak
      const post = (y) => { cube(gx, y, 0, .5, .5, 5.2, ['#8fa3bd', '#6f84a0', '#566a86'], false); };
      post(-8.2); cube(gx, -8.2, 5.2, .5, 16.9, .5, ['#8fa3bd', '#6f84a0', '#566a86'], false);
      const boxes = [];
      LANES.forEach((l, li) => { for (let k = 0; k < 6; k++) { const x = (((k * L / 6 + t * L * l.n) % L) + L) % L - L / 2, a = 1.4 + .6 * hs(li, k), b = 1.3 + .5 * hs(k, li + 3), cc = 1.1 + .6 * hs(li + 1, k + 2); boxes.push({ x, y: l.y - b / 2, a, b, c: cc, col: COLS[(li * 3 + k) % 4], li }); } });
      boxes.sort((u, v) => (u.x + u.y) - (v.x + v.y)).forEach(q => cube(q.x, q.y, bh, q.a, q.b, q.c, q.col, true));
      post(7.7);
      const pulse = .1 + .05 * Math.sin(t * TAU * 6), a1 = iso(gx + .25, -7.7, bh), a2 = iso(gx + .25, 8, bh), a3 = iso(gx + .25, 8, 5.2), a4 = iso(gx + .25, -7.7, 5.2);
      ctx.fillStyle = `rgba(60,220,140,${pulse})`; ctx.beginPath(); [a1, a2, a3, a4].forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.fill();
      const sy = bh + (4.6) * (.5 + .5 * Math.sin(t * TAU * 3)), b1 = iso(gx + .25, -7.7, sy), b2 = iso(gx + .25, 8, sy); ctx.strokeStyle = 'rgba(40,200,120,.9)'; ctx.lineWidth = H * .004; ctx.beginPath(); ctx.moveTo(b1[0], b1[1]); ctx.lineTo(b2[0], b2[1]); ctx.stroke();
      const v = ctx.createRadialGradient(W / 2, H / 2, H * .4, W / 2, H / 2, W * .65); v.addColorStop(0, 'rgba(20,40,70,0)'); v.addColorStop(1, 'rgba(20,40,70,.25)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
    }
  };
})();
