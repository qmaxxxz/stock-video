window.SCENE = {
 init(){},
 draw(c,W,H,t){
  let p=t*Math.PI*2;
  let g=c.createLinearGradient(0,0,0,H);
  g.addColorStop(0,"#12365a");g.addColorStop(.55,"#e68e66");g.addColorStop(1,"#15333d");
  c.fillStyle=g;c.fillRect(0,0,W,H);
  let x=W*.72,y=H*.25;
  let sun=c.createRadialGradient(x,y,0,x,y,H*.2);
  sun.addColorStop(0,"#fff4c1");sun.addColorStop(1,"rgba(255,210,100,0)");
  c.fillStyle=sun;c.fillRect(0,0,W,H);
  for(let k=0;k<3;k++){
   c.beginPath();c.moveTo(0,H*.65+k*H*.06);
   for(let i=0;i<=100;i++){
    let xx=i*W/100;
    c.lineTo(xx,H*(.62+k*.055)+Math.sin(i*.09+k)*H*.035);
   }
   c.lineTo(W,H);c.lineTo(0,H);c.fillStyle=["#365653","#24464a","#102e39"][k];c.fill();
  }
  for(let i=0;i<3;i++){
   let X=W*(.2+i*.3),Y=H*(.58+i*.015),rot=p*.7+i;
   c.strokeStyle="#e8f4ed";c.lineWidth=H*.007;
   c.beginPath();c.moveTo(X,Y);c.lineTo(X,Y+H*.22);c.stroke();
   for(let b=0;b<3;b++){
    let a=rot+b*2.094;
    c.beginPath();c.moveTo(X,Y);
    c.lineTo(X+Math.cos(a)*H*.19,Y+Math.sin(a)*H*.19);
    c.stroke();
   }
   c.fillStyle="#fff3d6";c.beginPath();c.arc(X,Y,H*.012,0,6.28);c.fill();
  }
  for(let row=0;row<3;row++)for(let col=0;col<8;col++){
   let xx=W*(.05+col*.11+row*.02),yy=H*(.78+row*.045);
   c.fillStyle="#155078";c.fillRect(xx,yy,W*.09,H*.03);
   c.strokeStyle="rgba(160,230,255,.6)";c.strokeRect(xx,yy,W*.09,H*.03);
  }
 }
};
