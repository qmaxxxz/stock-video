window.SCENE = {
 bars:[],
 init(){
  let s=73,r=()=>{s=(s*16807)%2147483647;return s/2147483647};
  this.bars=Array.from({length:32},()=>({v:.2+r()*.6,a:r()*6.28}));
 },
 draw(c,W,H,t){
  let p=t*Math.PI*2;
  c.fillStyle="#071827";c.fillRect(0,0,W,H);
  for(let i=0;i<9;i++){
   c.strokeStyle="rgba(100,190,220,.12)";
   c.beginPath();c.moveTo(0,H*(.15+i*.08));c.lineTo(W,H*(.15+i*.08));c.stroke();
  }
  this.bars.forEach((b,i)=>{
   let x=W*(.07+i*.027),h=H*(b.v+.04*Math.sin(p+b.a)),y=H*.8-h,w=W*.018;
   let g=c.createLinearGradient(x,y,x+w,H*.8);
   g.addColorStop(0,"#72f3d0");g.addColorStop(1,"#12618b");
   c.fillStyle=g;c.fillRect(x,y,w,h);
  });
  c.beginPath();
  for(let i=0;i<=200;i++){
   let u=i/200,x=W*(.06+u*.88);
   let y=H*(.52-.14*Math.sin(u*12.56+p*.25)-.04*Math.sin(u*43.98-p*.5));
   i?c.lineTo(x,y):c.moveTo(x,y);
  }
  c.strokeStyle="rgba(100,255,220,.2)";c.lineWidth=H*.018;c.stroke();
  c.strokeStyle="#75f4d5";c.lineWidth=H*.003;c.stroke();
 }
};
