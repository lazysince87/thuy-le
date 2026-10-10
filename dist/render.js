import { items, skillGroups } from './data.js';

export const escape = v => String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths={
  home:'<path d="m3 10 9-7 9 7v10H7V10m3 10v-7h4v7"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  linkedin:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7M7 7h.01M11 17v-7m0 3c0-4 6-4 6 0v4"/>',
  github:'<path d="M9 20c-5 1-5-2-7-2m14 4v-4a4 4 0 0 0-1-3c4-.5 7-2 7-6a5 5 0 0 0-1.5-3.5A5 5 0 0 0 20 2s-1.5 0-4 2a13 13 0 0 0-8 0C5.5 2 4 2 4 2a5 5 0 0 0-.5 3.5A5 5 0 0 0 2 9c0 4 3 5.5 7 6a4 4 0 0 0-1 3v4"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  close:'<path d="m6 6 12 12M6 18 18 6"/>',
  'arrow-up-right':'<path d="M6 18 18 6M6 6h12v12"/>',
  chevron:'<path d="m9 5 7 7-7 7"/>',
  play:'<path d="M8 5.5 19 12 8 18.5Z" fill="currentColor" stroke="none"/>'
};
export const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.chevron}</svg>`;
const labels={'fifth-third':'Internship',ta:'Teaching',education:'Education',quant:'Leadership',cloudflare:'Internship',caci:'Internship',sase:'Leadership',elite:'Development',freelance:'Freelance'};
const projectStacks={diary:['React','Gemini','RAG'],kubecomic:['Node.js','Kubernetes','Docker'],brokebites:['React Native','Spring Boot','MongoDB'],advisor:['Go','Python','RAG']};
const stack=genres=>`<p class="detail-stack">${genres.map(escape).join(' · ')}</p>`;
function body(item) {
 return `<div class="entry-details"><ul>${item.bullets.map(b=>`<li>${escape(b)}</li>`).join('')}</ul>${stack(item.genres)}${item.url?`<a class="project-link" href="${item.url}" target="_blank" rel="noopener noreferrer">${escape(item.linkLabel)} ${icon('arrow-up-right')}</a>`:''}</div>`;
}
function card(item,index,current){
 const project=item.category==='projects';
 const subtitle=project?projectStacks[item.id].join(' · '):item.subtitle;
 return `<li><button type="button" class="catalog-card${current?' current-card':''}" data-detail="${item.id}" aria-label="View ${escape(item.title)}: ${escape(item.subtitle)}" aria-haspopup="dialog" aria-controls="detail-dialog"><span class="card-top"><span class="card-type">${project?'Project':labels[item.id]||'Leadership'}</span><span class="card-n" aria-hidden="true">N</span></span><span class="card-copy"><strong>${escape(item.title)}</strong><span class="card-role">${escape(subtitle)}</span></span><span class="card-controls"><span class="card-play" aria-hidden="true">${icon('play')}</span><span class="card-date">${escape(item.date)}</span></span>${current?`<span class="continue-line" aria-hidden="true"><span style="width:${[55,70,82,32][index]}%"></span></span>`:''}</button></li>`;
}
function shelf(id,title,list,current=false){
 return `<section class="shelf-section" id="${id}" aria-labelledby="${id}-title"><div class="shelf-heading"><h2 id="${id}-title">${title}${current?' <span class="section-note">Current</span>':''}</h2><div class="shelf-controls" hidden><button type="button" class="shelf-arrow previous" data-scroll="-1" aria-label="Previous ${escape(title)} cards" aria-controls="${id}-track">${icon('chevron')}</button><button type="button" class="shelf-arrow" data-scroll="1" aria-label="Next ${escape(title)} cards" aria-controls="${id}-track">${icon('chevron')}</button></div></div><ul class="shelf-track" id="${id}-track">${list.map((item,n)=>card(item,n,current)).join('')}</ul></section>`;
}
export function renderPortfolio(){
 return `${shelf('current','Continue Watching',items.filter(i=>i.category==='current'),true)}
 ${shelf('experience','Experience',items.filter(i=>i.category==='experience'))}
 ${shelf('projects','Projects',items.filter(i=>i.category==='projects'))}
 ${shelf('leadership','Leadership & Involvement',items.filter(i=>['quant','sase'].includes(i.id)))}
 <section class="skills-section" id="skills" aria-labelledby="skills-title"><h2 id="skills-title">Skills</h2><div class="skills-panel">${skillGroups.map(g=>`<div class="skill-group"><h3>${escape(g.title)}</h3><p>${g.skills.map(escape).join(' · ')}</p></div>`).join('')}</div></section>`;
}
export function renderDetail(item){return `<div class="detail-body"><p class="overline">${escape((item.category==='projects'?'Project':labels[item.id])||'Experience')}</p><h2 id="detail-title">${escape(item.title)}</h2><p class="detail-subtitle">${escape(item.subtitle)}</p><p class="detail-date">${escape(item.date)}</p>${item.id==='education'?`<p class="detail-description">${escape(item.description)}</p>`:''}${body(item)}</div>`;}
