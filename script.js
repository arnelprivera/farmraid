const PAL={g:'#78B96B',G:'#287A45',d:'#0B291D',r:'#C0443A',y:'#E6C65A',o:'#B8742A',b:'#8A5A33',w:'#F5F8F1',s:'#E8B98A'};
const SP={
sprout:["...gg...","..gggg..",".gg.gg..","...G....","...G....","...b....","bbbbbbbb","bbbbbbbb"],
bug:["..d..d..","...dd...",".rrrrrr.","rrdrrdrr","rrrrrrrr","rdrrrrdr",".rrrrrr.","..d..d.."],
barn:["...rr...","..rrrr..",".rrrrrr.","rrrrrrrr",".wwwwww.",".wbbbbw.",".wbbbbw.",".wbbbbw."],
bag:["..bbbb..","...bb...","..bbbb..",".bbbbbb.","bbbyybbb","bbbbbbbb","bbbbbbbb",".bbbbbb."],
coin:["..yyyy..",".yyooyy.","yyoyyoyy","yyoyyoyy","yyoyyoyy","yyoooyyy",".yyyyyy.","..yyyy.."],
cup:["yyyyyyyy","y.yyyy.y","y.yyyy.y",".yyyyyy.","..yyyy..","...yy...","..oooo..",".oooooo."],
book:["bbbbbbbb","bwwwwwwb","bwddddwb","bwwwwwwb","bwddddwb","bwwwwwwb","bbbbbbbb","........"],
farmer:["...rrrr...","..rrrrrr..",".rrrrrrrr.","..ssssss..","..sdssds..","..ssssss..","...ssss...",".GGGGGGGG.","sGGGGGGGGs",".GGGGGGGG.","..bb..bb..","..dd..dd.."],
manong:["....oo....","..oyyyyo..",".oyyyyyyo.","oooooooooo","..ssssss..","..sdssds..","..sddddds.","...ssss...",".GGGGGGGG.","sGGwGGwGGs",".GGGGGGGG.","..bb..bb.."]};
function rects(k,ox=0,oy=0){let o='';SP[k].forEach((r,y)=>[...r].forEach((c,x)=>{if(c!='.')o+=`<rect x="${x+ox}" y="${y+oy}" width="1.02" height="1.02" fill="${PAL[c]}"/>`}));return o}
function svg(k,w,h){return `<svg viewBox="0 0 ${w||8} ${h||8}" shape-rendering="crispEdges" aria-hidden="true">${rects(k)}</svg>`}
document.querySelectorAll('i[data-sp]').forEach(e=>{const s=+e.dataset.s||56,w=+e.dataset.w||8,h=SP[e.dataset.sp].length;e.innerHTML=svg(e.dataset.sp,w,h);e.style.cssText=`display:inline-block;width:${s}px;height:${s*h/w}px;line-height:0`;});
// hero scene
(function(){const f=document.getElementById('crops');let o='';[[78,0],[86,0],[94,0]].forEach(([y])=>{for(let x=8;x<150;x+=12)o+=`<rect x="${x}" y="${y-6}" width="2" height="6"/><rect x="${x-2}" y="${y-8}" width="3" height="3"/><rect x="${x+2}" y="${y-9}" width="3" height="3"/>`});f.innerHTML=o;
document.getElementById('bugslot').innerHTML=`<svg x="4" y="88" width="9" height="9" viewBox="0 0 8 8">${rects('bug')}</svg>`;
document.getElementById('farmerslot').innerHTML=`<svg x="96" y="76" width="16" height="20" viewBox="0 0 10 12">${rects('farmer')}</svg>`})();
// features
const F=[['sprout','Farming system','Plant, water, grow and harvest different crops.'],['bug','Pest Raid system','Protect crops from pests that threaten farm productivity.'],['barn','Farm management','Expand land, construct buildings and manage resources.'],['bag','Inventory system','Organize seeds, tools, harvested crops and supplies.'],['coin','In-game shop','Purchase farming necessities and useful equipment.'],['cup','Milestone system','Complete objectives and unlock achievements.'],['book','Farm encyclopedia','Discover information about crops, pests and farming.'],['manong','AI farmer assistant','Ask Manong for farming advice and guidance.']];
document.getElementById('featgrid').innerHTML=F.map(([k,t,d])=>`<div class="card"><span class="sp">${svg(k,k=='manong'?10:8,k=='manong'?12:8)}</span><h3>${t}</h3><p>${d}</p></div>`).join('');
// gallery (replace src with real screenshot paths)
const G=[['Farming gameplay',''],['Crop planting and harvesting',''],['Pest Raid encounters',''],['Inventory interface',''],['Farm construction',''],['Game environment',''],['Character designs','']];
document.getElementById('gal').innerHTML=G.map(([t,src],i)=>`<button class="shot" data-i="${i}" aria-label="Preview ${t}" style="font-family:inherit">${src?`<img src="${src}" alt="${t}" loading="lazy">`:`${t}<small>Screenshot coming soon</small>`}</button>`).join('');
const dlg=document.getElementById('dlg'),body=document.getElementById('dlgbody');
function openShot(t,src,msg){body.innerHTML=`<h3>${t}</h3><div class="shot">${src?`<img src="${src}" alt="${t}">`:`<span>${t}</span><small>${msg||'Screenshot coming soon'}</small>`}</div>`;dlg.showModal()}
document.getElementById('gal').onclick=e=>{const b=e.target.closest('.shot');if(b){const g=G[b.dataset.i];openShot(g[0],g[1])}};
document.querySelector('.play').onclick=e=>{const[t,m]=e.currentTarget.dataset.shot.split('|');openShot(t,'',m)};
document.getElementById('dlgclose').onclick=()=>dlg.close();dlg.onclick=e=>{if(e.target===dlg)dlg.close()};
// knowledge
const K={'Crops':[['Tomato','Plant seedlings in full sun, stake them and water at the base.','About 60 to 85 days after transplanting'],['Corn','Sow in blocks so wind can pollinate. Needs rich soil and steady water.','About 90 to 110 days'],['Rice','Grows in flooded or very wet fields. Keep water level steady.','About 100 to 130 days'],['Eggplant','Likes warm weather. Transplant seedlings and feed regularly.','About 60 to 80 days after transplanting']],
'Pests':[['Aphids','Tiny sap-suckers that cluster on new growth and curl leaves.','Prevent: spray with water or soapy water; encourage ladybugs'],['Armyworms','Caterpillars that chew leaves, often at night.','Prevent: check leaves early and handpick'],['Rice bugs','Suck milk from developing rice grains, leaving them empty.','Prevent: weed field edges and plant on the same schedule as neighbors'],['Stem borers','Larvae tunnel into stems, causing dead shoots.','Prevent: remove stubble after harvest and rotate crops']],
'Sustainable':[['Compost','Turn kitchen scraps and leaves into free, rich soil food.','Cuts waste and fertilizer costs'],['Mulch','A layer of straw or leaves keeps soil moist and weeds down.','Saves water'],['Crop rotation','Change what you plant in each plot each season.','Breaks pest and disease cycles'],['Companion planting','Grow herbs and flowers beside crops to attract helpful insects.','Reduces pesticide need']]};
const tabs=document.getElementById('tabs'),kg=document.getElementById('kgrid');
function showK(n){[...tabs.children].forEach(b=>b.setAttribute('aria-selected',b.textContent==n));kg.innerHTML=K[n].map(([t,d,m])=>`<div class="card"><h3>${t}</h3><p>${d}</p><div class="meta">${m}</div></div>`).join('')}
Object.keys(K).forEach(n=>{const b=document.createElement('button');b.textContent=n;b.setAttribute('role','tab');b.onclick=()=>showK(n);tabs.append(b)});showK('Crops');
// team
document.getElementById('teamgrid').innerHTML=['Project Lead','Game Developer','Pixel Artist','Researcher'].map((r,i)=>`<div class="card"><div class="ph">${'ABCD'[i]}</div><h3>Team member name</h3><p>${r}</p></div>`).join('');
// faq
const Q=[['What is FARMRAID?','A pixel-art farming simulation where you grow crops and defend them from pest raids.'],['Is FARMRAID free to play?','Pricing has not been announced yet. Check this page for updates.'],['What is the main objective?','Build a thriving farm: plant, harvest, protect your crops and complete milestones.'],['How does the Pest Raid system work?','Pests can attack your fields at any time. Identify them, pick the right defense and save your harvest.'],['Who is Manong?','A friendly Filipino farmer-inspired AI assistant who gives planting tips, pest identification and prevention advice.'],['Is FARMRAID educational?','Yes. The game and its Farm Encyclopedia teach real crop, pest and sustainable farming basics.'],['What devices support the game?','Supported devices will be listed here at release.']];
document.getElementById('faqs').innerHTML=Q.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('');
// nav + form
const burger=document.getElementById('burger'),links=document.getElementById('links');
burger.onclick=()=>{const o=links.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
links.onclick=e=>{if(e.target.tagName=='A'){links.classList.remove('open');burger.setAttribute('aria-expanded',false)}};
document.documentElement.classList.add('js');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target;el.classList.add('in');io.unobserve(el);setTimeout(()=>{el.classList.remove('rv','in');el.style.transitionDelay=''},1300)}}),{threshold:.12});
document.querySelectorAll('.card,.pillar,.raid,.char,.shot,.steps li,details,section h2,.tabs').forEach((el,i)=>{el.classList.add('rv');el.style.transitionDelay=(i%4)*90+'ms';io.observe(el)});

// extra animations
(function(){
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const nav=document.querySelector('nav'),bar=document.createElement('i');bar.id='prog';nav.append(bar);
addEventListener('scroll',()=>{const h=document.documentElement;bar.style.width=(scrollY/Math.max(1,h.scrollHeight-innerHeight)*100)+'%';nav.classList.toggle('scrolled',scrollY>40)},{passive:true});
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');so.unobserve(e.target)}}),{threshold:.2});
document.querySelectorAll('section').forEach(s=>so.observe(s));
const b=document.querySelector('.bubble');
if(b&&!rm){const t=b.textContent;b.style.minHeight=b.offsetHeight+'px';b.textContent='';const bo=new IntersectionObserver(es=>{if(es[0].isIntersecting){bo.disconnect();let i=0;const id=setInterval(()=>{b.textContent=t.slice(0,++i);if(i>=t.length)clearInterval(id)},35)}},{threshold:.6});bo.observe(b)}
const kg=document.getElementById('kgrid');
document.getElementById('tabs').addEventListener('click',()=>{kg.classList.remove('swap');void kg.offsetWidth;kg.classList.add('swap')});
if(!rm)addEventListener('click',e=>{for(let i=0;i<7;i++){const p=document.createElement('i');p.style.cssText=`position:fixed;z-index:50;pointer-events:none;width:7px;height:7px;background:${['#78B96B','#C6E6B5','#E6C65A'][i%3]};left:${e.clientX}px;top:${e.clientY}px`;document.body.append(p);const a=i/7*6.28,d=24+Math.random()*24;p.animate([{transform:'translate(0,0)',opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d+14}px)`,opacity:0}],{duration:600,easing:'steps(6)'}).onfinish=()=>p.remove()}});
})();

// intro screen
(function(){const i=document.getElementById('intro');if(!i)return;document.body.classList.add('lock');
function enter(){document.body.classList.remove('lock');document.body.classList.add('ready');i.classList.add('out');setTimeout(()=>i.remove(),900);removeEventListener('keydown',enter)}
i.addEventListener('click',enter);addEventListener('keydown',enter);document.getElementById('enter').focus({preventScroll:true})})();
