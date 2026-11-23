window.SCENE = {
 init(){},
 draw(c,W,H,t){
  const p=t*Math.PI*2;
  let g=c.createLinearGradient(0,0,0,H);
  g.addColorStop(0,"#07152f");g.addColorStop(1,"#164c65");
  c.fillStyle=g;c.fillRect(0,0,W,H);
  for(let i=0;i<45;i++){
   let x=i*W/45,w=W/55,h=H*(.15+.35*(.5+.5*Math.sin(i*12)));
   c.fillStyle="#102d4b";c.fillRect(x,H*.8-h,w,h);
   for(let y=0;y<8;y++){
    c.fillStyle=`rgba(75,230,255,${.3+.5*(.5+.5*Math.sin(p+y+i))})`;
    c.fillRect(x+w*.2,H*.8-h+y*h/9,w*.5,H*.006);
   }
  }
  for(let i=0;i<9;i++){
   let a=p+i*Math.PI*2/9,x=W/2+Math.cos(a)*W*.28,y=H*.43+Math.sin(a)*H*.16;
   c.beginPath();c.arc(x,y,H*.009,0,Math.PI*2);
   c.fillStyle="#68f5ef";c.fill();
  }
  c.strokeStyle="rgba(60,240,240,.25)";
  for(let i=0;i<5;i++){
   c.beginPath();c.ellipse(W/2,H*.46,W*(.2+i*.07),H*(.05+i*.018),0,0,Math.PI*2);c.stroke();
  }
 }
};
