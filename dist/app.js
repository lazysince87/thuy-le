import { items } from './data.js';
import { icon, renderDetail } from './render.js';

document.querySelectorAll('[data-icon]').forEach(el=> {el.innerHTML=icon(el.dataset.icon);});
document.getElementById('year').textContent=new Date().getFullYear();
const dialog=document.getElementById('detail-dialog');
let previousFocus;
document.querySelectorAll('[data-detail]').forEach(button=>button.addEventListener('click',()=>{
  const item=items.find(i=>i.id===button.dataset.detail);
  if(!item)return;
  previousFocus=button;
  document.getElementById('dialog-content').innerHTML=renderDetail(item);
  dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.scrollTop=0;
  dialog.querySelector('.dialog-close').focus();
}));
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');previousFocus?.focus();});
dialog.addEventListener('click',e=>{
  if(e.target!==dialog)return;
  const r=dialog.getBoundingClientRect();
  if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();
});
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.shelf-section').forEach(section=>{
 const track=section.querySelector('.shelf-track');
 const controls=section.querySelector('.shelf-controls');
 const arrows=[...controls.querySelectorAll('[data-scroll]')];
 const update=()=>{
  const max=track.scrollWidth-track.clientWidth;
  controls.hidden=max<2;
  arrows[0].disabled=track.scrollLeft<2;
  arrows[1].disabled=track.scrollLeft>=max-2;
 };
 arrows.forEach(button=>button.addEventListener('click',()=>{
  const card=track.firstElementChild;
  const step=card.getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap);
  track.scrollBy({left:Number(button.dataset.scroll)*step*3,behavior:reducedMotion.matches?'instant':'smooth'});
 }));
 track.addEventListener('scroll',update,{passive:true});
 new ResizeObserver(update).observe(track);
 update();
});
