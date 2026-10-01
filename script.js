(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const L=(a,b,m)=>a+(b-a)*m,E=m=>m*m*(3-2*m),cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
$('#year').textContent=new Date().getFullYear();

/* ---- 3D ribbon of slabs: twists at the top, settles into a tilted board as you scroll ---- */
const sky=$('.sky'),N=24,sc=document.createElement('div');
sc.className='scene';sc.innerHTML='<div class="rb">'+'<i></i>'.repeat(N)+'</div>';sky.append(sc);
const sl=$$('i',sc);
sl.forEach((s,i)=>s.style.background=`linear-gradient(160deg,hsl(${330-i*3.2} 90% 62%),hsl(${265-i*1.5} 70% 38%))`);
let W=innerWidth,H=innerHeight,sy=scrollY,p=0,tx=0,ty=0,cx=0,cy=0,t=0,intro=rm?1:0;
const size=()=>{W=innerWidth;H=innerHeight;sc.style.setProperty('--w',Math.max(40,Math.min(W,700)*.13)+'px')};size();

const nav=$$('.dock a'),tg=nav.map(a=>$(a.getAttribute('href')));
function onScroll(){
 sy=scrollY;const d=cl(sy/((document.documentElement.scrollHeight-H)||1));
 $('#progress').style.transform=`scaleX(${d})`;sky.style.setProperty('--d',d.toFixed(3));
 $('#sun').style.transform=`translate(-50%,${-d*50}vh) scale(${1+d*.6})`;
 let k=0;tg.forEach((el,i)=>{if(el.getBoundingClientRect().top<H*.5)k=i});
 nav.forEach((a,i)=>a.classList.toggle('on',i===k));
}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',()=>{size();onScroll()});onScroll();

/* tilt input: mouse on desktop, gyroscope on phones */
const gyro=e=>{if(e.gamma!=null){tx=cl(e.gamma/30,-1,1);ty=cl((e.beta-50)/30,-1,1)}};
if(typeof DeviceOrientationEvent!=='undefined'&&DeviceOrientationEvent.requestPermission)
 addEventListener('pointerdown',()=>DeviceOrientationEvent.requestPermission().then(r=>r==='granted'&&addEventListener('deviceorientation',gyro)).catch(()=>{}),{once:true});
else addEventListener('deviceorientation',gyro);
addEventListener('pointermove',e=>{if(e.pointerType==='mouse'){tx=e.clientX/W*2-1;ty=e.clientY/H*2-1}});

const po=$('.portrait'),rows=$$('.swipe').map(c=>({c,k:[...c.children]}));
function frame(){
 if(!rm)t+=.012;intro=Math.min(1,intro+.012);
 p+=(cl(sy/(H*1.1))-p)*.1;cx+=(tx-cx)*.06;cy+=(ty-cy)*.06;
 const m=E(p),it=E(intro),u=Math.min(W,700),sp=W/N*1.1,op=L(.9,.35,m)*it;
 sl.forEach((s,i)=>{
  const a=i*.45+t*2,rx=(i-(N-1)/2)*sp,ry=Math.sin(a)*u*.12,rz=Math.cos(a)*u*.2-(1-it)*1400,rr=i*13+t*50+(1-it)*200,
   gx=((i%6)-2.5)*u*.2,gy=(Math.floor(i/6)-1.5)*u*.2;
  s.style.transform=`translate3d(${L(rx,gx,m)}px,${L(ry,gy,m)}px,${L(rz,0,m)}px) rotateY(${L(rr,0,m)}deg) scaleY(${L(1,.6,m)})`;
  s.style.opacity=op;
 });
 sc.style.transform=`translate(-50%,-50%) rotateX(${L(10,58,m)+cy*8}deg) rotateY(${cx*10}deg) rotateZ(${L(0,-38,m)-sy*.012}deg)`;
 sc.style.top=L(70,50,m)+'%';
 po.style.setProperty('--ry',cx*14+'deg');po.style.setProperty('--rx',-cy*10+'deg');
 /* coverflow: cards in swipe rows turn toward the centre of the screen */
 rows.forEach(({c,k})=>{
  const cr=c.getBoundingClientRect();if(cr.bottom<0||cr.top>H)return;
  const on=c.scrollWidth>c.clientWidth+4,rs=k.map(e=>e.getBoundingClientRect());
  rs.forEach((r,i)=>{const d=cl(((r.left+r.width/2)-W/2)/W,-1,1);
   k[i].style.transform=on?`perspective(700px) rotateY(${-d*38}deg) scale(${1-Math.abs(d)*.08})`:''});
 });
 requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

/* ---- card tilt under finger / mouse ---- */
$$('.teacher,.stack .card').forEach(el=>{
 el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  el.style.transform=`perspective(700px) rotateY(${x*16}deg) rotateX(${-y*16}deg) translateZ(10px)`});
 ['pointerleave','pointerup','pointercancel'].forEach(n=>el.addEventListener(n,()=>el.style.transform=''));
});

/* ---- depth reveal ---- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.stack .card,.teacher,.ticks li,.details>*').forEach((el,i)=>{el.classList.add('rv');el.style.transitionDelay=(i%3)*90+'ms';io.observe(el)});

/* ---- counters ---- */
new IntersectionObserver((es,o)=>es.forEach(e=>{if(!e.isIntersecting)return;o.unobserve(e.target);
 $$('[data-count]',e.target).forEach(b=>{const n=+b.dataset.count,s=performance.now();
  (function f(now){const k=cl((now-s)/1400);b.textContent=Math.round(n*(1-(1-k)**3))+(n>99&&k===1?'+':'');if(k<1)requestAnimationFrame(f)})(s)})
}),{threshold:.5}).observe($('.stats'));

/* ---- testimonials loop ---- */
const tr=$('#track');tr.innerHTML+=tr.innerHTML;

/* ---- enquiry form ---- */
const ov=$('#overlay'),ay=$('#ay'),y0=new Date().getFullYear();
for(let y=y0;y>=y0-12;y--)ay.add(new Option(y,y));
const open=()=>{ov.classList.add('open');document.body.style.overflow='hidden'};
const close=()=>{ov.classList.remove('open','sent');document.body.style.overflow=''};
$$('.open-form').forEach(b=>b.addEventListener('click',open));
$('#close').onclick=close;$('#doneBtn').onclick=()=>{close();$('#form').reset()};
ov.addEventListener('click',e=>{if(e.target===ov)close()});
addEventListener('keydown',e=>{if(e.key==='Escape')close()});
$('#form').addEventListener('submit',e=>{
 e.preventDefault();const d=Object.fromEntries(new FormData(e.target));
 const m=['*Admission enquiry - Suprabhat Classes*',`Student: ${d.fullName}`,`Parent: ${d.parentName}`,`Standard: ${d.standard}`,`Admission year: ${d.admissionYear}`,`School: ${d.school}`,`Address: ${d.address}`,`Phone: ${d.phone}`,`Email: ${d.email}`,d.description&&`Notes: ${d.description}`].filter(Boolean).join('\n');
 window.open('https://wa.me/919890864657?text='+encodeURIComponent(m),'_blank','noopener');
 ov.classList.add('sent');
});
})();
