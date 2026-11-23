// Bisnis 5: Peta jalan strategi dengan tonggak (milestone) menyala berurutan (perencanaan). Loop mulus.
window.SCENE = (() => {
  const TAU = Math.PI * 2, MS = [.1, .3, .5, .7, .9];
  const ss = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const rng = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  let bok;
  return {
    init() { const r = rng(4); bok = []; for (let i = 0; i < 26; i++) bok.push([r(), r(), .4 + r(), 1 + (r() * 2 | 0)]); },
    draw(ctx, W, H, t) {
      const p = t * TAU, P = u => [W * (.08 + .84 * u), H * (.64 - .3 * u + .1 * Math.sin(TAU * 1.5 * u + .4))];
      const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#061a3a'); g.addColorStop(1, '#0e3f78');
      ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      bok.forEach(([x, y0, s, sp]) => { const y = (((y0 - t * sp) % 1) + 1) % 1 * H, r = H * .014 * s; ctx.fillStyle = `rgba(150,200,255,${.05 + .06 * s})`; ctx.beginPath(); ctx.arc(x * W, y, r, 0, TAU); ctx.fill(); });
      const pts = []; for (let i = 0; i <= 220; i++) pts.push(P(i / 220));
      const stroke = (n, w, col, dash, off) => { ctx.beginPath(); pts.slice(0, n + 1).forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.setLineDash(dash || []); ctx.lineDashOffset = off || 0; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); ctx.setLineDash([]); };
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      stroke(220, H * .075, 'rgba(255,255,255,.06)'); stroke(220, H * .07, 'rgba(10,40,90,.55)');
      const per = H * .055; stroke(220, H * .004, 'rgba(255,255,255,.55)', [H * .03, H * .025], -t * per * 40);
      const prog = t, cut = Math.round(prog * 220), env = ss(0, .04, prog) * (1 - ss(.94, 1, prog));
      ctx.globalAlpha = env; stroke(cut, H * .02, 'rgba(90,220,255,.25)'); stroke(cut, H * .008, 'rgba(160,240,255,.9)'); ctx.globalAlpha = 1;
      MS.forEach((u, i) => {
        const q = P(u), lit = ss(u - .015, u + .015, prog) * (1 - ss(.94, 1, prog)), r = H * .038;
        const gl = ctx.createRadialGradient(q[0], q[1], 0, q[0], q[1], r * 3.2); gl.addColorStop(0, `rgba(120,230,255,${.55 * lit})`); gl.addColorStop(1, 'rgba(120,230,255,0)'); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(q[0], q[1], r * 3.2, 0, TAU); ctx.fill();
        ctx.fillStyle = lit > .5 ? '#e9fbff' : '#143a6b'; ctx.strokeStyle = `rgba(160,235,255,${.35 + .65 * lit})`; ctx.lineWidth = H * .005; ctx.beginPath(); ctx.arc(q[0], q[1], r, 0, TAU); ctx.fill(); ctx.stroke();
        if (lit > .02) { ctx.strokeStyle = `rgba(20,110,170,${lit})`; ctx.lineWidth = H * .007; ctx.beginPath(); ctx.moveTo(q[0] - r * .42, q[1]); ctx.lineTo(q[0] - r * .1, q[1] + r * .32); ctx.lineTo(q[0] + r * .45, q[1] - r * .3); ctx.stroke(); }
      });
      const e = P(.9), pole = H * .13; ctx.strokeStyle = 'rgba(220,240,255,.85)'; ctx.lineWidth = H * .005; ctx.beginPath(); ctx.moveTo(e[0] + H * .05, e[1] - H * .03); ctx.lineTo(e[0] + H * .05, e[1] - H * .03 - pole); ctx.stroke();
      const fl = ss(.8, .95, prog); ctx.fillStyle = `rgba(255,190,60,${.35 + .65 * fl})`; ctx.beginPath(); const fx = e[0] + H * .05, fy = e[1] - H * .03 - pole;
      ctx.moveTo(fx, fy); ctx.quadraticCurveTo(fx + H * .05, fy + H * .008 + Math.sin(p * 3) * H * .008, fx + H * .09, fy + H * .02 + Math.sin(p * 3 + 1) * H * .01); ctx.quadraticCurveTo(fx + H * .05, fy + H * .04, fx, fy + H * .05); ctx.closePath(); ctx.fill();
      const mk = P(prog), mr = H * .016; ctx.globalAlpha = env; const mg = ctx.createRadialGradient(mk[0], mk[1], 0, mk[0], mk[1], mr * 4); mg.addColorStop(0, 'rgba(255,255,255,.95)'); mg.addColorStop(.3, 'rgba(120,230,255,.6)'); mg.addColorStop(1, 'rgba(120,230,255,0)'); ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(mk[0], mk[1], mr * 4, 0, TAU); ctx.fill(); ctx.globalAlpha = 1;
      const v = ctx.createRadialGradient(W / 2, H / 2, H * .4, W / 2, H / 2, W * .65); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,10,30,.4)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
    }
  };
})();
