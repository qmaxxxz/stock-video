(() => {
const TAU = Math.PI * 2;

function bg(c,W,H,a,b) {
  const g=c.createLinearGradient(0,0,W,H);
  g.addColorStop(0,a); g.addColorStop(1,b);
  c.fillStyle=g; c.fillRect(0,0,W,H);
}
function glow(c,x,y,r,color,alpha=1) {
  const g=c.createRadialGradient(x,y,0,x,y,r);
  g.addColorStop(0,color);
  g.addColorStop(1,"rgba(0,0,0,0)");
  c.save(); c.globalAlpha=alpha;
  c.fillStyle=g; c.fillRect(x-r,y-r,r*2,r*2);
  c.restore();
}
function stroke(c,points,color,width) {
  c.beginPath();
  points.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));
  c.strokeStyle=color; c.lineWidth=width; c.stroke();
}
function orbit(c,x,y,rx,ry,angle,color,width=2) {
  c.save(); c.translate(x,y); c.rotate(angle);
  c.beginPath(); c.ellipse(0,0,rx,ry,0,0,TAU);
  c.strokeStyle=color; c.lineWidth=width; c.stroke();
  c.restore();
}
function bubble(c,x,y,r,color) {
  const g=c.createRadialGradient(x-r*.35,y-r*.4,r*.05,x,y,r);
  g.addColorStop(0,"rgba(255,255,255,.85)");
  g.addColorStop(.18,color);
  g.addColorStop(.7,"rgba(80,180,255,.12)");
  g.addColorStop(1,"rgba(255,255,255,.02)");
  c.fillStyle=g; c.beginPath(); c.arc(x,y,r,0,TAU); c.fill();
  c.strokeStyle="rgba(255,255,255,.55)";
  c.lineWidth=Math.max(1,r*.025); c.stroke();
}
function stars(c,W,H,p,count=75) {
  for(let i=0;i<count;i++){
    const x=((i*7919)%997)/997*W;
    const y=((i*3571)%991)/991*H;
    const a=.25+.55*(.5+.5*Math.sin(p*2+i));
    c.fillStyle=`rgba(190,225,255,${a})`;
    c.beginPath(); c.arc(x,y,Math.max(1,H*.0015),0,TAU); c.fill();
  }
}
function panel(c,x,y,w,h) {
  c.fillStyle="rgba(12,35,65,.48)";
  c.fillRect(x,y,w,h);
  c.strokeStyle="rgba(110,220,255,.42)";
  c.lineWidth=2; c.strokeRect(x,y,w,h);
}
function turbine(c,x,y,s,p) {
  c.save(); c.translate(x,y);
  const g=c.createLinearGradient(-s*.04,0,s*.04,0);
  g.addColorStop(0,"#b7d5e1"); g.addColorStop(.5,"#ffffff");
  g.addColorStop(1,"#648b9c");
  c.fillStyle=g; c.fillRect(-s*.025,0,s*.05,s*2.7);
  c.translate(0,0); c.rotate(p);
  for(let i=0;i<3;i++){
    c.save(); c.rotate(i*TAU/3);
    c.beginPath(); c.moveTo(0,0);
    c.quadraticCurveTo(s*.12,-s*.5,s*.10,-s*1.45);
    c.quadraticCurveTo(0,-s*1.3,-s*.08,-s*.25);
    c.closePath(); c.fillStyle="#e5f4f7"; c.fill();
    c.restore();
  }
  c.beginPath(); c.arc(0,0,s*.09,0,TAU);
  c.fillStyle="#ffffff"; c.fill();
  c.restore();
}
function flower(c,x,y,r,p) {
  c.save(); c.translate(x,y); c.rotate(p);
  for(let i=0;i<8;i++){
    c.save(); c.rotate(i*TAU/8);
    c.beginPath(); c.ellipse(0,-r*.55,r*.22,r*.48,0,0,TAU);
    c.fillStyle="rgba(230,166,66,.75)"; c.fill();
    c.restore();
  }
  c.beginPath(); c.arc(0,0,r*.17,0,TAU);
  c.fillStyle="#f5d58b"; c.fill();
  c.restore();
}

window.CinematicScenes = {};

// 1. HUMAN + AI COLLABORATION
window.CinematicScenes.neural = {
  init(){},
  draw(c,W,H,t){
    const p=t*TAU;
    bg(c,W,H,"#06142e","#020716");
    glow(c,W*.73,H*.43,H*.48,"#0756a8",.8);
    stars(c,W,H,p,90);

    // Perspective floor
    c.strokeStyle="rgba(70,160,255,.18)";
    c.lineWidth=1;
    for(let i=-12;i<=12;i++){
      c.beginPath(); c.moveTo(W*.5+i*W*.025,H*.72);
      c.lineTo(W*.5+i*W*.12,H); c.stroke();
    }
    for(let i=0;i<8;i++){
      const y=H*.73+i*i*H*.004;
      c.beginPath(); c.moveTo(0,y); c.lineTo(W,y); c.stroke();
    }

    // Human silhouette with rim lighting
    const hx=W*.27, hy=H*.37;
    glow(c,hx,hy,H*.25,"#0879bc",.3);
    c.save();
    c.fillStyle="#071321";
    c.beginPath();
    c.ellipse(hx,hy,H*.075,H*.105,0,0,TAU); c.fill();
    c.beginPath();
    c.moveTo(hx-H*.10,hy+H*.08);
    c.quadraticCurveTo(hx-H*.20,hy+H*.16,hx-H*.21,hy+H*.43);
    c.lineTo(hx+H*.18,hy+H*.43);
    c.quadraticCurveTo(hx+H*.14,hy+H*.14,hx+H*.07,hy+H*.08);
    c.closePath(); c.fill();
    c.strokeStyle="rgba(83,204,255,.55)";
    c.lineWidth=H*.004; c.stroke();
    c.restore();

    // Holographic AI core
    const ax=W*.70, ay=H*.43, r=H*.17;
    glow(c,ax,ay,r*2.7,"#168cff",.8);
    const rg=c.createRadialGradient(ax-r*.5,ay-r*.5,2,ax,ay,r);
    rg.addColorStop(0,"#d9ffff");
    rg.addColorStop(.2,"#56dfff");
    rg.addColorStop(.65,"#1268ba");
    rg.addColorStop(1,"rgba(4,20,65,.2)");
    c.fillStyle=rg; c.beginPath(); c.arc(ax,ay,r,0,TAU); c.fill();
    orbit(c,ax,ay,r*1.4,r*.58,p,"rgba(110,238,255,.8)",H*.003);
    orbit(c,ax,ay,r*1.65,r*.78,-p,"rgba(80,155,255,.55)",H*.002);
    orbit(c,ax,ay,r*1.9,r*.95,p*.5,"rgba(190,220,255,.28)",H*.002);

    for(let i=0;i<18;i++){
      const a=p+i*TAU/18;
      const x=ax+Math.cos(a)*r*1.48;
      const y=ay+Math.sin(a)*r*.62;
      glow(c,x,y,H*.025,"#62eaff",.8);
      c.fillStyle="#eaffff"; c.beginPath();
      c.arc(x,y,H*.004,0,TAU); c.fill();
    }

    // Floating glass data panels
    panel(c,W*.43,H*.18,W*.13,H*.11);
    panel(c,W*.48,H*.59,W*.16,H*.10);
    panel(c,W*.78,H*.17,W*.12,H*.09);
    for(let i=0;i<5;i++){
      c.fillStyle=`rgba(94,220,255,${.35+.2*Math.sin(p+i)})`;
      c.fillRect(W*(.445+i*.022),H*.215,W*.012,H*.006);
      c.fillRect(W*(.50+i*.025),H*.625,W*.016,H*.005);
    }
    // Light bridge between human and AI
    const beam=c.createLinearGradient(W*.37,H*.43,W*.59,H*.43);
    beam.addColorStop(0,"rgba(35,150,255,0)");
    beam.addColorStop(.5,"rgba(95,235,255,.7)");
    beam.addColorStop(1,"rgba(35,150,255,0)");
    c.fillStyle=beam; c.fillRect(W*.36,H*.40,W*.25,H*.06);
  }
};

// 2. CLIMATE TECH + SMART ENERGY
window.CinematicScenes.renewables = {
  init(){},
  draw(c,W,H,t){
    const p=t*TAU;
    bg(c,W,H,"#5a9ed0","#f6c98b");
    const sun= c.createRadialGradient(W*.78,H*.25,2,W*.78,H*.25,H*.30);
    sun.addColorStop(0,"#fffbd8"); sun.addColorStop(.2,"#ffe7a0");
    sun.addColorStop(1,"rgba(255,210,110,0)");
    c.fillStyle=sun; c.fillRect(W*.45,0,W*.55,H*.65);
    c.fillStyle="#fff1c3"; c.beginPath();
    c.arc(W*.78,H*.25,H*.075,0,TAU); c.fill();

    // Atmospheric cloud layers
    for(let i=0;i<5;i++){
      const x=W*(.12+i*.19);
      glow(c,x,H*(.18+(i%2)*.07),H*.10,"#ffffff",.28);
    }

    // Distant city
    c.fillStyle="#668b91";
    for(let i=0;i<26;i++){
      const x=i*W/26, h=H*(.08+.13*(.5+.5*Math.sin(i*7)));
      c.fillRect(x,H*.68-h,W/34,h);
      c.fillStyle="rgba(255,255,220,.45)";
      for(let j=0;j<3;j++) c.fillRect(x+W*.006,H*.68-h+j*H*.025,W*.009,H*.006);
      c.fillStyle="#668b91";
    }

    // Rolling green landscape
    c.beginPath(); c.moveTo(0,H*.68);
    c.bezierCurveTo(W*.28,H*.53,W*.50,H*.80,W,H*.59);
    c.lineTo(W,H); c.lineTo(0,H); c.closePath();
    const land=c.createLinearGradient(0,H*.6,0,H);
    land.addColorStop(0,"#568c64"); land.addColorStop(1,"#163f3a");
    c.fillStyle=land; c.fill();

    // Wind turbines, each completes exact full rotation
    turbine(c,W*.22,H*.36,H*.055,p);
    turbine(c,W*.48,H*.29,H*.075,p+.8);
    turbine(c,W*.88,H*.34,H*.06,p+1.7);

    // Solar field perspective
    for(let row=0;row<4;row++){
      const y=H*(.76+row*.055);
      for(let col=0;col<7;col++){
        const x=W*(.08+col*.125+row*.025);
        c.save(); c.translate(x,y);
        c.transform(1,.08,-.28,.55,0,0);
        const g=c.createLinearGradient(0,0,W*.10,H*.05);
        g.addColorStop(0,"#0b3358"); g.addColorStop(1,"#3a9ac0");
        c.fillStyle=g; c.fillRect(0,0,W*.105,H*.07);
        c.strokeStyle="rgba(190,235,255,.65)"; c.lineWidth=2;
        for(let k=1;k<4;k++){
          c.beginPath(); c.moveTo(W*.105*k/4,0);
          c.lineTo(W*.105*k/4,H*.07); c.stroke();
        }
        c.beginPath(); c.moveTo(0,H*.035); c.lineTo(W*.105,H*.035); c.stroke();
        c.restore();
      }
    }
    // Energy flow
    for(let i=0;i<12;i++){
      const x=W*(.08+((i/12+p/TAU)%1)*.84);
      const y=H*(.64+.04*Math.sin(i+p));
      glow(c,x,y,H*.025,"#d8fff0",.7);
    }
  }
};

// 3. WELLNESS + LONGEVITY
window.CinematicScenes.wellness = {
  init(){},
  draw(c,W,H,t){
    const p=t*TAU;
    bg(c,W,H,"#062e35","#071b25");
    glow(c,W*.5,H*.46,H*.52,"#0c8c78",.7);
    // Organic leaves
    for(let i=0;i<14;i++){
      const x=W*((i*37%100)/100);
      const y=H*(.12+(i*19%70)/100);
      c.save(); c.translate(x,y); c.rotate(Math.sin(p+i)*.08);
      c.beginPath(); c.ellipse(0,0,W*.025,H*.075,.4,0,TAU);
      c.fillStyle="rgba(73,171,111,.18)"; c.fill();
      c.strokeStyle="rgba(157,232,159,.3)"; c.stroke();
      c.restore();
    }

    // Human body silhouette, luminous edge
    const x=W*.5,y=H*.40;
    glow(c,x,y,H*.31,"#47e5c5",.35);
    const body=c.createLinearGradient(W*.40,H*.25,W*.61,H*.8);
    body.addColorStop(0,"rgba(145,255,234,.48)");
    body.addColorStop(.5,"rgba(35,151,151,.30)");
    body.addColorStop(1,"rgba(10,60,80,.65)");
    c.fillStyle=body;
    c.beginPath();
    c.arc(x,y-H*.17,H*.065,0,TAU);
    c.moveTo(x-H*.07,y-H*.08);
    c.bezierCurveTo(x-H*.17,y-H*.03,x-H*.13,y+H*.18,x-H*.10,y+H*.35);
    c.lineTo(x+H*.10,y+H*.35);
    c.bezierCurveTo(x+H*.13,y+H*.18,x+H*.17,y-H*.03,x+H*.07,y-H*.08);
    c.closePath(); c.fill();
    c.strokeStyle="rgba(170,255,240,.7)";
    c.lineWidth=H*.003; c.stroke();

    // Core light
    glow(c,x,y+H*.04,H*.16,"#ffcc73",.95);
    const heart=c.createRadialGradient(x,y+H*.04,1,x,y+H*.04,H*.10);
    heart.addColorStop(0,"#fff8d2");
    heart.addColorStop(.35,"#ffc36b");
    heart.addColorStop(1,"rgba(255,170,80,0)");
    c.fillStyle=heart; c.beginPath();
    c.arc(x,y+H*.04,H*.10,0,TAU); c.fill();

    // Rotating energy rings
    orbit(c,x,y+H*.04,H*.27,H*.09,p,"rgba(255,218,145,.85)",H*.005);
    orbit(c,x,y+H*.04,H*.34,H*.14,-p,"rgba(100,255,219,.55)",H*.003);
    orbit(c,x,y+H*.04,H*.42,H*.19,p*.5,"rgba(170,255,230,.28)",H*.002);

    // Floating cell-like spheres
    for(let i=0;i<13;i++){
      const a=p+i*TAU/13;
      const xx=x+Math.cos(a)*W*.29;
      const yy=y+Math.sin(a*1.1)*H*.24;
      bubble(c,xx,yy,H*(.012+(i%3)*.006),"rgba(90,230,220,.45)");
    }
  }
};

// 4. INDONESIAN CULTURE + MODERN CRAFT
window.CinematicScenes.culture = {
  init(){},
  draw(c,W,H,t){
    const p=t*TAU;
    bg(c,W,H,"#241326","#9b542b");
    glow(c,W*.52,H*.55,H*.65,"#ffb65c",.45);

    // Distant temple silhouette
    c.save(); c.fillStyle="#30202a";
    const tx=W*.72, base=H*.66;
    c.fillRect(tx-W*.14,base,W*.28,H*.20);
    for(let i=0;i<5;i++){
      const yy=base-i*H*.055;
      const ww=W*(.24-i*.035);
      c.beginPath(); c.moveTo(tx-ww/2,yy);
      c.lineTo(tx,yy-H*.07); c.lineTo(tx+ww/2,yy);
      c.closePath(); c.fill();
    }
    c.fillRect(tx-W*.19,H*.66,W*.38,H*.025);
    c.restore();

    // Flowing silk fabric
    const cloth=c.createLinearGradient(0,H*.45,W,H);
    cloth.addColorStop(0,"#111d3a");
    cloth.addColorStop(.35,"#8d3d24");
    cloth.addColorStop(.65,"#d38a37");
    cloth.addColorStop(1,"#182443");
    c.beginPath(); c.moveTo(0,H*.55);
    c.bezierCurveTo(W*.22,H*(.40+.04*Math.sin(p)),W*.42,H*(.82+.04*Math.sin(p)),W*.63,H*.60);
    c.bezierCurveTo(W*.78,H*(.45+.03*Math.sin(p)),W*.88,H*.70,W,H*.49);
    c.lineTo(W,H); c.lineTo(0,H); c.closePath();
    c.fillStyle=cloth; c.fill();

    // Gold woven contour lines
    for(let j=0;j<24;j++){
      const yy=H*(.57+j*.018);
      c.beginPath();
      for(let i=0;i<=80;i++){
        const xx=W*i/80;
        const y2=yy+H*.035*Math.sin(xx/W*TAU*1.7+p+j*.18);
        i?c.lineTo(xx,y2):c.moveTo(xx,y2);
      }
      c.strokeStyle=`rgba(255,205,111,${.20+(j%4)*.09})`;
      c.lineWidth=H*.0025; c.stroke();
    }

    // Repeating batik-inspired floral motifs
    for(let row=0;row<4;row++){
      for(let col=0;col<12;col++){
        const xx=W*(col/11);
        const yy=H*(.66+row*.075)+H*.035*Math.sin(xx/W*TAU*1.7+p);
        flower(c,xx,yy,H*.018,p*.15+col*.1+row*.2);
      }
    }
    // Fine gold highlights
    glow(c,W*.24,H*.68,H*.22,"#ffc76d",.25);
    glow(c,W*.78,H*.75,H*.20,"#ffb65c",.22);
  }
};

// 5. SENSORY SURREAL 3D MATERIALS
window.CinematicScenes.surreal = {
  init(){},
  draw(c,W,H,t){
    const p=t*TAU;
    bg(c,W,H,"#111b50","#35134f");
    glow(c,W*.50,H*.50,H*.55,"#326bdb",.8);
    glow(c,W*.78,H*.30,H*.32,"#b64dc9",.5);

    // Floating liquid glass ribbons
    for(let k=0;k<5;k++){
      const y=H*(.35+k*.075);
      c.beginPath();
      c.moveTo(-W*.05,y);
      c.bezierCurveTo(W*.22,y+H*(.24*Math.sin(p+k)),W*.33,y-H*.27*Math.cos(p+k),W*.53,y);
      c.bezierCurveTo(W*.72,y+H*.25*Math.sin(p+k+1),W*.82,y-H*.2*Math.cos(p+k),W*1.05,y);
      const g=c.createLinearGradient(0,y-H*.2,W,y+H*.2);
      g.addColorStop(0,"rgba(90,230,255,.08)");
      g.addColorStop(.25,"rgba(95,205,255,.8)");
      g.addColorStop(.5,"rgba(255,255,255,.9)");
      g.addColorStop(.72,"rgba(211,95,255,.75)");
      g.addColorStop(1,"rgba(90,220,255,.1)");
      c.strokeStyle=g; c.lineWidth=H*(.025+k*.004);
      c.lineCap="round"; c.stroke();
      c.strokeStyle="rgba(255,255,255,.35)";
      c.lineWidth=H*.002; c.stroke();
    }

    // Glass bubbles in orbital motion
    for(let i=0;i<18;i++){
      const a=p+i*TAU/18;
      const x=W*.5+Math.cos(a)*W*(.18+(i%4)*.055);
      const y=H*.5+Math.sin(a*1.2)*H*(.16+(i%3)*.05);
      const r=H*(.012+(i%4)*.009);
      glow(c,x,y,r*2.8,"#8ceaff",.35);
      bubble(c,x,y,r,"rgba(100,185,255,.4)");
    }

    // Iridescent glass sphere
    const sx=W*.52, sy=H*.48, sr=H*.15;
    const sphere=c.createRadialGradient(sx-sr*.4,sy-sr*.5,sr*.02,sx,sy,sr);
    sphere.addColorStop(0,"rgba(255,255,255,.95)");
    sphere.addColorStop(.2,"rgba(125,224,255,.68)");
    sphere.addColorStop(.55,"rgba(166,95,255,.35)");
    sphere.addColorStop(1,"rgba(35,40,120,.12)");
    c.fillStyle=sphere; c.beginPath(); c.arc(sx,sy,sr,0,TAU); c.fill();
    c.strokeStyle="rgba(255,255,255,.75)";
    c.lineWidth=H*.003; c.stroke();
    orbit(c,sx,sy,sr*1.55,sr*.48,p,"rgba(255,255,255,.65)",H*.003);
  }
};
})();
