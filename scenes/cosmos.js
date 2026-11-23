window.SCENE = {
 stars:[],
 init(){
  let s=119,r=()=>{s=(s*16807)%2147483647;return s/2147483647};
  this.stars=Array.from({length:250},()=>[r(),r(),r()*6.28]);
 },
 draw(c,W,H,t){
  let p=t*Math.PI*2;
  let g=c.createLinearGradient(0,0,W,H);
  g.addColorStop(0,"#030716");g.addColorStop(.55,"#171744");g.addColorStop(1,"#070b20");
  c.fillStyle=g;c.fillRect(0,0,W,H);
  this.stars.forEach(([x,y,a])=>{
   c.fillStyle=`rgba(190,220,255,${.3+.7*(.5+.5*Math.sin(p+a))})`;
   c.beginPath();c.arc(x*W,y*H,H*.002,0,6.28);c.fill();
  });
  let X=W*.5,Y=H*.5,R=H*.19;
  for(let k=0;k<4;k++){
   c.beginPath();c.ellipse(X,Y,R*(1.3+k*.35),R*(.45+k*.12),-.2,0,6.28);
   c.strokeStyle="rgba(140,170,255,.2)";c.lineWidth=H*.002;c.stroke();
  }
  let pg=c.createRadialGradient(X-R*.4,Y-R*.4,0,X,Y,R);
  pg.addColorStop(0,"#ffe0ad");pg.addColorStop(.5,"#bd765d");pg.addColorStop(1,"#38234c");
  c.fillStyle=pg;c.beginPath();c.arc(X,Y,R,0,6.28);c.fill();
  for(let i=0;i<3;i++){
   let a=p*(.5+i*.17)+i*2.1;
   let x=X+Math.cos(a)*R*(1.6+i*.4),y=Y+Math.sin(a)*R*(.6+i*.18);
   let r=H*(.018+i*.009);
   c.fillStyle=["#70b8d8","#a98bdc","#d9a47d"][i];
   c.beginPath();c.arc(x,y,r,0,6.28);c.fill();
  }
 }
};
