/* Pretty Chemistry garden effect */
(function(){
var st=document.createElement('style');st.textContent="body{margin:0;min-height:100vh;color:var(--ink);font:400 15px/1.5 'DM Sans',system-ui,sans-serif;background:radial-gradient(700px 520px at 4% 0,#fbd3de 0,transparent 62%),radial-gradient(700px 520px at 100% 6%,#d6e6f8 0,transparent 62%),radial-gradient(800px 600px at 0 56%,#fff0c4 0,transparent 62%),radial-gradient(700px 600px at 100% 70%,#e0ecd8 0,transparent 62%),radial-gradient(800px 600px at 50% 112%,#ffdccf 0,transparent 62%),linear-gradient(180deg,#fff4f8,#f8f3ff 50%,#fff7ee);background-attachment:fixed;overflow-x:hidden}\nheader,main,footer{position:relative;z-index:1}\n.glow{position:fixed;inset:0;pointer-events:none;z-index:0;background:repeating-linear-gradient(105deg,rgba(255,255,255,0) 0 90px,rgba(255,255,255,.22) 135px,rgba(255,255,255,0) 200px);-webkit-mask-image:linear-gradient(to bottom,#000,transparent 70%);mask-image:linear-gradient(to bottom,#000,transparent 70%);animation:glow 18s ease-in-out infinite alternate}\n@keyframes glow{from{transform:translateX(-50px)}to{transform:translateX(50px)}}\n#petals{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:2}\n.garden{position:fixed;left:0;right:0;bottom:0;width:100%;height:200px;pointer-events:none;z-index:0}\n.gt{position:fixed;left:0;top:0;width:100%;height:150px;pointer-events:none;z-index:0}\n.hg{transform-box:fill-box;transform-origin:50% 0;animation:hang 7s ease-in-out infinite alternate}\n@keyframes hang{from{transform:rotate(-2deg)}to{transform:rotate(2.2deg)}}\nheader{padding-top:64px!important}\n.orn{position:relative;z-index:1;max-width:1100px;margin:6px auto 2px;padding:0 20px;height:14px}\n.orn::before{content:\"\";position:absolute;left:20px;right:20px;top:6px;height:1px;background:linear-gradient(90deg,#d9b872,rgba(217,184,114,0))}\n.orn::after{content:\"\";position:absolute;left:20px;top:2px;width:8px;height:8px;background:#d9b872;transform:rotate(45deg)}\n.card{border:1px solid rgba(214,176,112,.6);box-shadow:0 0 0 3px rgba(255,255,255,.55),0 14px 30px -14px rgba(120,70,100,.45)!important}\n.fl{transform-box:fill-box;transform-origin:50% 100%;animation:sway 6s ease-in-out infinite alternate}\n.fl:nth-child(2n){animation-duration:7.5s;animation-delay:-2s}.fl:nth-child(3n){animation-duration:5.2s;animation-delay:-4s}\n@keyframes sway{from{transform:rotate(-2.5deg)}to{transform:rotate(2.5deg)}}\n@media (prefers-reduced-motion:reduce){.glow,.fl,.hg{animation:none}}\n.bar{position:sticky;top:env(safe-area-inset-top,0px);z-index:5;background:rgba(255,246,250,.55);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);padding:12px 20px;max-width:1100px;margin:0 auto}\n.chip{flex:none;border:1px solid rgba(255,255,255,.9);background:linear-gradient(135deg,rgba(255,255,255,.8),rgba(240,230,250,.55));color:var(--ink);padding:8px 16px;border-radius:999px;font:500 12px 'DM Mono',ui-monospace,monospace;letter-spacing:.06em}\n.bar{background:rgba(255,246,250,.55)!important;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}\n.chip{border:1px solid rgba(255,255,255,.9);background:linear-gradient(135deg,rgba(255,255,255,.8),rgba(240,230,250,.55))}\n:root,:root:not([data-theme=\"light\"]),:root[data-theme=\"dark\"]{--bg:#f7f2f3!important;--ink:#2b2226!important;--muted:#6f6269!important;--card:#fff!important;--chip:#ece3e6!important;--glass:rgba(255,255,255,.58)!important;--on:#2b2226!important;--onink:#fff!important}";document.head.appendChild(st);
var box=document.createElement('div');box.innerHTML="<div class=\"glow\" aria-hidden=\"true\"></div><svg class=\"gt\" id=\"gt\" aria-hidden=\"true\"></svg><svg class=\"garden\" id=\"gd\" aria-hidden=\"true\" preserveAspectRatio=\"xMidYMax slice\"></svg><canvas id=\"petals\" aria-hidden=\"true\"></canvas>";
while(box.lastChild)document.body.insertBefore(box.lastChild,document.body.firstChild);
var bar=document.querySelector('.bar');if(bar){var o=document.createElement('div');o.className='orn';o.setAttribute('aria-hidden','true');bar.parentNode.insertBefore(o,bar)}
})();
(function(){
var NS="http://www.w3.org/2000/svg",BL=["#f7bccb","#fbd3dc","#fff0e6","#fde8a8","#c3d9f3","#dccbf2","#f4a9bd"],CEN=["#ffe08a","#ffd0a0","#fff3c4"],SAGE=["#b5d6bd","#a6cdb1","#c4e0c9"];
function mk(t,a,par){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);if(par)par.appendChild(e);return e}
function rnd(a,b){return a+Math.random()*(b-a)}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function hx(h){if(h.length==4)h="#"+h[1]+h[1]+h[2]+h[2]+h[3]+h[3];return[parseInt(h.substr(1,2),16),parseInt(h.substr(3,2),16),parseInt(h.substr(5,2),16)]}
function mix(a,b,t){var x=hx(a),y=hx(b),o="#";for(var i=0;i<3;i++){var v=Math.round(x[i]+(y[i]-x[i])*t);o+=(v<16?"0":"")+v.toString(16)}return o}
function leaf(g,x,y,len,ang,c){var w=len*.36,tr="translate("+x+","+y+") rotate("+ang+")";
 mk("path",{d:"M0,0 C"+w+","+(-len*.3)+" "+w*.8+","+(-len*.8)+" 0,"+(-len)+" C"+(-w*.8)+","+(-len*.8)+" "+(-w)+","+(-len*.3)+" 0,0Z",fill:c,transform:tr},g);
 mk("path",{d:"M0,0 L0,"+(-len*.85),stroke:"rgba(255,255,255,.45)","stroke-width":1,fill:"none",transform:tr},g)}
function rose(g,x,y,r,c){var d=mix(c,"#c0587a",.3),dd=mix(c,"#a8456a",.5),st="rgba(255,255,255,.55)";
 mk("circle",{cx:x,cy:y,r:r,fill:c,stroke:mix(c,"#b04e70",.35),"stroke-width":.8},g);
 mk("circle",{cx:x+r*.04,cy:y-r*.03,r:r*.78,fill:mix(c,"#fff",.22),stroke:st,"stroke-width":.9},g);
 mk("circle",{cx:x-r*.03,cy:y+r*.03,r:r*.56,fill:d,stroke:st,"stroke-width":.9},g);
 mk("circle",{cx:x+r*.03,cy:y,r:r*.36,fill:mix(c,"#fff",.15),stroke:st,"stroke-width":.9},g);
 mk("path",{d:"M"+(x-r*.2)+","+y+" C"+(x-r*.2)+","+(y-r*.25)+" "+(x+r*.22)+","+(y-r*.25)+" "+(x+r*.2)+","+y+" C"+(x+r*.18)+","+(y+r*.2)+" "+(x-r*.05)+","+(y+r*.2)+" "+(x-r*.05)+","+(y+r*.02),stroke:dd,"stroke-width":1.2,fill:"none"},g);
 mk("ellipse",{cx:x-r*.35,cy:y-r*.4,rx:r*.28,ry:r*.14,fill:"rgba(255,255,255,.32)",transform:"rotate(-35 "+(x-r*.35)+" "+(y-r*.4)+")"},g)}
function peony(g,x,y,r,c){var rings=[[9,.52,.44,.62,c],[7,.36,.36,.5,mix(c,"#fff",.3)],[5,.2,.28,.38,mix(c,"#fff",.55)]];
 rings.forEach(function(q,ri){for(var i=0;i<q[0];i++){var a=i*360/q[0]+ri*18;mk("ellipse",{cx:x,cy:y-r*q[1],rx:r*q[2],ry:r*q[3],fill:q[4],stroke:"rgba(255,255,255,.6)","stroke-width":.8,transform:"rotate("+a+" "+x+" "+y+")"},g)}});
 mk("circle",{cx:x,cy:y,r:r*.14,fill:pick(CEN)},g)}
function hydra(g,x,y,R,c1,c2){var n=Math.round(R*1.5);for(var i=0;i<n;i++){var a=rnd(0,6.283),d=R*Math.sqrt(Math.random()),fx=x+Math.cos(a)*d,fy=y+Math.sin(a)*d*.85,col=pick([c1,c2,mix(c1,"#fff",.45),mix(c2,"#fff",.4)]);
 mk("circle",{cx:fx,cy:fy,r:rnd(3.4,5),fill:col,stroke:"rgba(255,255,255,.65)","stroke-width":.7},g);
 if(i%3==0)mk("circle",{cx:fx,cy:fy,r:1,fill:"#fff4c8"},g)}}
function wist(g,x,y,L,w){mk("path",{d:"M"+x+","+y+" q"+w*.2+","+L*.4+" 0,"+L*.9,stroke:"#b9d8bf","stroke-width":1.4,fill:"none",opacity:.8},g);
 var n=Math.round(L/5.5);for(var i=0;i<n;i++){var t=i/n,fy=y+4+t*L,fx=x+Math.sin(i*1.9)*w*(1-t*.55),r=5.2*(1-t*.6)+1.6,col=mix("#c9b0ec","#efe6fb",t);
 mk("circle",{cx:fx,cy:fy,r:r,fill:col,stroke:"rgba(255,255,255,.6)","stroke-width":.6},g);mk("circle",{cx:fx+r*.9*(i%2?1:-1),cy:fy+r*.5,r:r*.8,fill:mix(col,"#fff",.25)},g)}}
function bloom(g,x,y,r,c,t){if(t=="p")peony(g,x,y,r,c);else if(t=="h")hydra(g,x,y,r*1.25,pick(["#bcd4f2","#cfc2f0","#f6c0d0"]),pick(["#d7c6f3","#c3dbf5","#fbd6df"]));else rose(g,x,y,r,c)}
function clear(s){while(s.firstChild)s.removeChild(s.firstChild)}
function garden(){var s=document.getElementById("gd"),W=innerWidth,H=200,k=W<600?.74:1;clear(s);s.setAttribute("viewBox","0 0 "+W+" "+H);s.setAttribute("width",W);s.setAttribute("height",H);
 mk("path",{d:"M0,"+H+" L0,"+(H-26)+" C"+W*.15+","+(H-44)+" "+W*.3+","+(H-18)+" "+W*.5+","+(H-34)+" C"+W*.7+","+(H-48)+" "+W*.85+","+(H-20)+" "+W+","+(H-36)+" L"+W+","+H+"Z",fill:"rgba(198,226,206,.6)"},s);
 var n=Math.round(W/46),arr=[];for(var i=0;i<n;i++){var tr=Math.random(),ty=tr<.22?"h":tr<.5?"p":"r";arr.push({x:(i+.5)*W/n+rnd(-16,16),h:ty=="h"?rnd(90,140):rnd(28,118),t:ty})}
 arr.sort(function(a,b){return b.h-a.h});
 arr.forEach(function(f){var g=mk("g",{"class":"fl"},s),bx=f.x,by=H+8,fy=by-f.h;
  mk("path",{d:"M"+bx+","+by+" C"+(bx+rnd(-12,12))+","+(by-f.h*.5)+" "+(bx+rnd(-10,10))+","+(by-f.h*.8)+" "+bx+","+fy,stroke:"#9fcaac","stroke-width":2.4,fill:"none","stroke-linecap":"round"},g);
  for(var j=0;j<3;j++){var ly=by-f.h*(.2+j*.22);leaf(g,bx,ly,rnd(24,38)*k,(j%2?1:-1)*rnd(40,70),pick(SAGE))}
  var r=(f.t=="h"?rnd(22,30):f.t=="p"?rnd(17,25):rnd(13,20))*k;bloom(g,bx,fy,r,pick(BL),f.t)})}
function garland(){var s=document.getElementById("gt"),W=innerWidth,H=150,k=W<600?.72:1;clear(s);s.setAttribute("viewBox","0 0 "+W+" "+H);s.setAttribute("width",W);s.setAttribute("height",H);
 var sw=Math.max(160,Math.min(260,W/4)),n=Math.ceil(W/sw),w=W/n,yTop=4,yLow=38;
 for(var i=0;i<n;i++){var x0=i*w,x1=x0+w,xm=(x0+x1)/2,g=mk("g",{},s);
  mk("path",{d:"M"+x0+","+yTop+" Q"+xm+","+(yLow*1.5)+" "+x1+","+yTop,stroke:"#9fcaac","stroke-width":2.6,fill:"none","stroke-linecap":"round"},g);
  function P(t){return[(1-t)*(1-t)*x0+2*(1-t)*t*xm+t*t*x1,(1-t)*(1-t)*yTop+2*(1-t)*t*(yLow*1.5)+t*t*yTop]}
  for(var t=.06;t<1;t+=.1){var q=P(t);leaf(g,q[0],q[1],rnd(18,28)*k,(Math.round(t*10)%2?1:-1)*rnd(55,100),pick(SAGE))}
  [.28,.5,.72].forEach(function(t,ix){var q=P(t);bloom(g,q[0],q[1]+2,(ix==1?rnd(12,16):rnd(8,11))*k,pick(BL),ix==1?"p":"r")});
  if(i%2==0){var q=P(.5);var gw=mk("g",{"class":"hg"},s);wist(gw,q[0]+rnd(-30,30),q[1]+8,rnd(40,78)*k,9*k)}}
 for(var i=0;i<=n;i++){var x=i*w,g=mk("g",{},s),r=(i%2?15:19)*k;
  leaf(g,x,yTop,34*k,-60,pick(SAGE));leaf(g,x,yTop,34*k,62,pick(SAGE));
  bloom(g,x,yTop+4,r*1.15,pick(BL),"h");bloom(g,x+r*.9,yTop+r*.8,r*.8,pick(BL),"r");bloom(g,x-r*.8,yTop+r*.6,r*.95,pick(BL),i%2?"r":"p");
  var gw=mk("g",{"class":"hg"},s);wist(gw,x+rnd(-12,12),yTop+r*1.1,rnd(50,95)*k,9*k)}}
function build(){garden();garland()}build();
var lw=innerWidth,rt;addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(function(){if(innerWidth!=lw){lw=innerWidth;build()}},200)});
/* petals */
var PET=["#f9c4d2","#fde0e7","#fff4ec","#cfe0f5","#e0d2f5","#fdeab0","#f5b2c6"],SP=[],cv=document.getElementById("petals"),cx=cv.getContext("2d"),W=0,H=0,dpr=Math.min(window.devicePixelRatio||1,2),P=[],mx=-999,my=-999,vx=0,
 reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches,run=true;
function size(){W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0)}
size();addEventListener("resize",size);
function petal(x,y,burst){var r=rnd(7,15);return{x:x,y:y,r:r,c:pick(PET),vy:burst?rnd(-2.4,-.4):rnd(.35,1.1),vx:burst?rnd(-2.2,2.2):rnd(-.25,.25),rot:rnd(0,6.28),vr:rnd(-.03,.03),fl:rnd(0,6.28),fs:rnd(.02,.05),sw:rnd(0,6.28),a:rnd(.65,.92)}}
for(var si=0;si<16;si++)SP.push({x:rnd(0,innerWidth),y:rnd(0,innerHeight),s:rnd(3,6.5),ph:rnd(0,6.28)});
var N=reduce?10:(W<600?16:30);for(var i=0;i<N;i++)P.push(petal(rnd(0,W),rnd(-H,H),false));
function draw(p){var r=p.r,f=Math.cos(p.fl);cx.save();cx.translate(p.x,p.y);cx.rotate(p.rot);cx.scale(.35+Math.abs(f)*.65,1);cx.globalAlpha=p.a;
 var g=cx.createLinearGradient(0,-r,0,r);g.addColorStop(0,"#ffffff");g.addColorStop(.35,p.c);g.addColorStop(1,p.c);cx.fillStyle=g;
 cx.beginPath();cx.moveTo(0,-r);cx.bezierCurveTo(r*.95,-r*.55,r*.75,r*.75,0,r);cx.bezierCurveTo(-r*.75,r*.75,-r*.95,-r*.55,0,-r);cx.fill();
 cx.strokeStyle="rgba(255,255,255,.55)";cx.lineWidth=.8;cx.beginPath();cx.moveTo(0,-r*.7);cx.lineTo(0,r*.6);cx.stroke();cx.restore()}
function star(q,t){var a=reduce?.6:.25+.7*Math.abs(Math.sin(t*.0014+q.ph)),r=q.s;cx.save();cx.translate(q.x,q.y);cx.globalAlpha=a;cx.fillStyle="#e8c36a";cx.beginPath();cx.moveTo(0,-r);cx.quadraticCurveTo(0,0,r,0);cx.quadraticCurveTo(0,0,0,r);cx.quadraticCurveTo(0,0,-r,0);cx.quadraticCurveTo(0,0,0,-r);cx.fill();cx.restore()}
function frame(ts){if(!run)return;cx.clearRect(0,0,W,H);for(var si=0;si<SP.length;si++)star(SP[si],ts||0);
 for(var i=0;i<P.length;i++){var p=P[i];
  if(!reduce){p.sw+=.018;p.fl+=p.fs;p.rot+=p.vr;
   var dx=p.x-mx,dy=p.y-my,d=dx*dx+dy*dy;if(d<14400&&d>1){var k=(1-Math.sqrt(d)/120)*1.6;p.vx+=dx/Math.sqrt(d)*k*.3;p.vy+=dy/Math.sqrt(d)*k*.12}
   p.vx*=.985;p.vy+=(.7-p.vy)*.012;p.x+=p.vx+Math.sin(p.sw)*.55;p.y+=p.vy}
  if(p.y>H+24||p.x<-40||p.x>W+40){P[i]=petal(rnd(0,W),-20,false);p=P[i]}
  draw(p)}
 requestAnimationFrame(frame)}
addEventListener("pointermove",function(e){mx=e.clientX;my=e.clientY},{passive:true});
addEventListener("pointerleave",function(){mx=my=-999});
addEventListener("pointerdown",function(e){if(reduce)return;if(e.target.closest&&e.target.closest("button,a,input"))return;
 for(var i=0;i<9;i++){P.push(petal(e.clientX+rnd(-10,10),e.clientY+rnd(-10,10),true))}
 while(P.length>N+40)P.shift()},{passive:true});
document.addEventListener("visibilitychange",function(){run=!document.hidden;if(run)requestAnimationFrame(frame)});
requestAnimationFrame(frame)})();
