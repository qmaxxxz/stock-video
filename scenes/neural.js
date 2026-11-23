window.SCENE = {
 nodes:[],
 init(){
  let s=42,r=()=>{s=(s*16807)%2147483647;return s/2147483647};
  this.nodes=Array.from({length:65},()=>({x:.08+r()*.84,y:.1+r()*.8,a:r()*6.28}));
 },
 draw(c,W,H,t){
  const p=t*Math.PI*2;
  c.fillStyle="#090b25";c.fillRect(0,0,W,H);
  let n=this.nodes;
  for(let i=0;i<n.length;i++)for(let j=i+1;j<n.length;j++){
   let a=n[i],b=n[j],d=Math.hypot(a.x-b.x,a.y-b.y);
   if(d<.19){
    c.beginPath();c.moveTo(a.x*W,a.y*H);c.lineTo(b.x*W,b.y*H);
    c.strokeStyle="rgba(85,140,255,.2)";c.lineWidth=H*.0015;c.stroke();
    let q=(t*1.7+(i+j)*.071)%1;
    let x=(a.x+(b.x-a.x)*q)*W,y=(a.y+(b.y-a.y)*q)*H;
    c.fillStyle="#7dfaff";c.beginPath();c.arc(x,y,H*.003,0,6.28);c.fill();
   }
  }
  n.forEach((a,i)=>{
   let x=a.x*W,y=a.y*H,r=H*(.006+.002*Math.sin(p+a.a));
   let g=c.createRadialGradient(x,y,0,x,y,r*5);
   g.addColorStop(0,"#b8a5ff");g.addColorStop(1,"rgba(60,150,255,0)");
   c.fillStyle=g;c.beginPath();c.arc(x,y,r*5,0,6.28);c.fill();
   c.fillStyle="#d9ffff";c.beginPath();c.arc(x,y,r,0,6.28);c.fill();
  });
 }
};
