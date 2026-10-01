const $=(s,a=document)=>[...a.querySelectorAll(s)],R=matchMedia('(prefers-reduced-motion:reduce)').matches;
// reveals
const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('in',e.isIntersecting)),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
$('.rv').forEach(el=>io.observe(el));
// typing
const roles=['Android developer','WebUI developer','frontend tinkerer'],ty=$('#ty')[0];let ri=0,ci=0,del=0;
(function tick(){const w=roles[ri];if(R){ty.textContent=w;return}
ty.textContent=w.slice(0,ci);let d=del?45:95;
if(!del&&ci===w.length){del=1;d=1600}else if(del&&ci===0){del=0;ri=(ri+1)%roles.length;d=400}else ci+=del?-1:1;
setTimeout(tick,d)})();
// hero reveal: release the clip-path layer once finished
const pic=$('.pic')[0];
pic.addEventListener('animationend',e=>{if(e.animationName==='reveal'){pic.style.animation='none';pic.style.clipPath='none'}});
// hero portrait replays: re-arm on leave, restart on enter (acts only on visibility changes)
let picIn=false;
const armPic=()=>{pic.style.animation='none';pic.style.clipPath=''};
if(!R)new IntersectionObserver(es=>es.forEach(e=>{const v=e.isIntersecting;if(v===picIn)return;picIn=v;armPic();if(v){void pic.offsetWidth;pic.style.animation=''}}),{threshold:0}).observe(pic);
// scroll: progress bar + parallax (measurements cached, one write per frame)
const bar=$('#bar')[0],links=$('nav a');let tk=0,max=1;
const measure=()=>{max=Math.max(1,document.documentElement.scrollHeight-innerHeight)};
measure();new ResizeObserver(measure).observe(document.body);addEventListener('resize',measure,{passive:true});
function frame(){tk=0;const y=scrollY;bar.style.transform=`scaleX(${Math.min(1,y/max)})`;if(!R&&y<900)pic.style.transform=`translate3d(0,${-Math.min(y,700)*.06}px,0)`}
addEventListener('scroll',()=>{tk||(tk=requestAnimationFrame(frame))},{passive:true});
frame();
// active nav (single observer)
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
$('section[id],main').forEach(s=>spy.observe(s));
// cursor glow (rAF-throttled)
$('.card').forEach(c=>{let f=0,x=0,y=0;c.addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;if(f)return;f=requestAnimationFrame(()=>{f=0;const r=c.getBoundingClientRect();c.style.setProperty('--mx',x-r.left+'px');c.style.setProperty('--my',y-r.top+'px')})},{passive:true})});
// menu
const bg=$('.burger')[0],mn=$('#menu')[0];
const setMenu=o=>{mn.classList.toggle('open',o);bg.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''};
bg.onclick=()=>setMenu(!mn.classList.contains('open'));
$('a',mn).forEach(a=>a.onclick=()=>setMenu(false));
addEventListener('keydown',e=>e.key==='Escape'&&setMenu(false));
// energy + circle interaction
function zap(x,y){if(R)return;const fr=document.createDocumentFragment(),f=document.createElement('i');f.className='flash';f.style.left=x+'px';f.style.top=y+'px';fr.appendChild(f);
for(let i=0;i<7;i++){const s=document.createElement('i');s.className='bolt';s.style.cssText=`left:${x}px;top:${y}px;--rot:${i*51+Math.random()*30}deg;--len:${34+Math.random()*60}px;animation-delay:${Math.random()*90}ms`;fr.appendChild(s)}
document.body.appendChild(fr);setTimeout(()=>$('.flash,.bolt').forEach(n=>n.remove()),650)}
$('[data-fx]').forEach(el=>el.addEventListener('click',e=>{
e.preventDefault();if(el.classList.contains('go'))return;
const r=el.getBoundingClientRect(),orb=el.classList.contains('orb');
el.classList.add('go');setTimeout(()=>zap(r.left+r.width/2,r.top+r.height/2),orb?280:120);
setTimeout(()=>{window.open(el.href,'_blank','noopener')},R?0:orb?560:380);
setTimeout(()=>el.classList.remove('go'),800)}));
