import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const $ = (id) => document.getElementById(id);
const canvas = $('scene');
const scene = new THREE.Scene();
scene.background = new THREE.Color('#130d19');
scene.fog = new THREE.FogExp2('#130d19', 0.027);
const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 4.1, 11.6);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;renderer.toneMapping = THREE.ACESFilmicToneMapping;renderer.toneMappingExposure = 1.18;
const clock = new THREE.Clock();
const mat = (color, roughness=.6, metalness=0) => new THREE.MeshStandardMaterial({color,roughness,metalness});
const mats={wall:mat('#271a2b'),floor:mat('#170f1b',.28,.3),dark:mat('#120d17',.3,.45),gold:mat('#bd8d57',.32,.68),goldLight:mat('#f0c888',.28,.55),velvet:mat('#4c203d',.88),wood:mat('#3c2631',.3,.22),shelf:mat('#392837',.28,.4),glass:new THREE.MeshPhysicalMaterial({color:'#cf9b7f',roughness:.12,metalness:.12,transparent:true,opacity:.46,clearcoat:1}),red:mat('#a74e69',.23,.3),green:mat('#466d63',.25,.22),blue:mat('#48617f',.24,.26),cream:mat('#e0cba9',.68)};
scene.add(new THREE.HemisphereLight('#e9ccdf','#20131f',1.55),new THREE.AmbientLight('#a9899f',.38));
function addLight(color,intensity,position,distance=12,size=1){const l=new THREE.PointLight(color,intensity,distance,2);l.position.set(...position);scene.add(l);if(size){const g=new THREE.Mesh(new THREE.SphereGeometry(size,16,12),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.11}));g.position.copy(l.position);scene.add(g);}return l;}
addLight('#ed9c71',95,[-4.3,4.6,-2.4],13,.33);addLight('#9d6baa',82,[4.1,4,-3],12,.32);addLight('#f0c680',72,[0,5.2,1],10,.25);
const barLight=addLight('#d96291',22,[0,1.55,1],9,0);
const floor=new THREE.Mesh(new THREE.PlaneGeometry(200,200),mats.floor);floor.rotation.x=-Math.PI/2;floor.position.y=-.025;floor.receiveShadow=true;scene.add(floor);
const backWall=new THREE.Mesh(new THREE.BoxGeometry(15,8,.35),mats.wall);backWall.position.set(0,3.8,-5.3);backWall.receiveShadow=true;scene.add(backWall);
for(const x of [-7.3,7.3]){const side=new THREE.Mesh(new THREE.BoxGeometry(.35,8,11),mats.wall);side.position.set(x,3.8,-.2);scene.add(side);}
for(const x of [-6.4,-4.55,4.55,6.4]){const panel=new THREE.Mesh(new THREE.BoxGeometry(1.38,4.45,.05),mat('#311e32',.72));panel.position.set(x,3.3,-5.08);scene.add(panel);for(const dx of [-.61,.61]){const trim=new THREE.Mesh(new THREE.BoxGeometry(.018,4.12,.03),mats.gold);trim.position.set(x+dx,3.3,-5.02);scene.add(trim);}const cap=new THREE.Mesh(new THREE.BoxGeometry(1.27,.025,.04),mats.gold);cap.position.set(x,5.32,-5.01);scene.add(cap);}
const archPoints=[];for(let i=0;i<=36;i++){const a=Math.PI*i/36;archPoints.push(new THREE.Vector3(Math.cos(a)*2.45,2.45+Math.sin(a)*2.48,-5.02));}
const arch=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(archPoints),80,.024,8,false),new THREE.MeshBasicMaterial({color:'#d58a92'}));scene.add(arch);
const signCanvas=document.createElement('canvas');signCanvas.width=1024;signCanvas.height=256;const signCtx=signCanvas.getContext('2d');signCtx.textAlign='center';signCtx.textBaseline='middle';signCtx.shadowColor='#f399b0';signCtx.shadowBlur=28;signCtx.fillStyle='#f7d8c0';signCtx.font='600 104px Georgia';signCtx.fillText('VELVET',512,122);
const signTexture=new THREE.CanvasTexture(signCanvas);signTexture.colorSpace=THREE.SRGBColorSpace;const sign=new THREE.Mesh(new THREE.PlaneGeometry(2.85,.72),new THREE.MeshBasicMaterial({map:signTexture,transparent:true,opacity:.9}));sign.position.set(0,4.14,-4.98);scene.add(sign);
const barBase=new THREE.Mesh(new THREE.BoxGeometry(8.65,1.06,1.46),mats.wood);barBase.position.set(0,.54,.38);barBase.castShadow=true;barBase.receiveShadow=true;scene.add(barBase);
const inset=new THREE.Mesh(new THREE.BoxGeometry(8.2,.62,.025),mat('#291722',.4,.25));inset.position.set(0,.55,1.12);scene.add(inset);
const brassLine=new THREE.Mesh(new THREE.BoxGeometry(8.65,.025,.025),mats.goldLight);brassLine.position.set(0,.23,1.125);scene.add(brassLine);
const counterTop=new THREE.Mesh(new THREE.BoxGeometry(9.05,.16,1.82),mat('#251821',.18,.42));counterTop.position.set(0,1.13,.34);counterTop.castShadow=true;counterTop.receiveShadow=true;scene.add(counterTop);
for(const z of [-.52,1.17]){const edge=new THREE.Mesh(new THREE.BoxGeometry(9.02,.035,.035),mats.gold);edge.position.set(0,1.05,z);scene.add(edge);}
const led=new THREE.Mesh(new THREE.BoxGeometry(8.5,.045,.045),new THREE.MeshBasicMaterial({color:'#cc678e'}));led.position.set(0,.06,1.13);scene.add(led);
for(const y of [1.73,2.5]){const shelf=new THREE.Mesh(new THREE.BoxGeometry(6.7,.11,.56),mats.shelf);shelf.position.set(0,y,-3.48);shelf.castShadow=true;scene.add(shelf);const lip=new THREE.Mesh(new THREE.BoxGeometry(6.7,.035,.025),mats.gold);lip.position.set(0,y-.045,-3.19);scene.add(lip);for(let i=0;i<13;i++){const x=-3+i*.5+(y<2?.16:0),h=.32+((i*13+Math.round(y*10))%5)*.075,colors=['#b86855','#638a78','#d2a35f','#71568f','#477b8a'];const bottle=new THREE.Group();bottle.position.set(x,y+.05,-3.55);const glass=new THREE.Mesh(new THREE.CylinderGeometry(.085,.105,h,10),new THREE.MeshStandardMaterial({color:colors[i%5],roughness:.18,metalness:.1,transparent:true,opacity:.84}));glass.position.y=h/2;bottle.add(glass);const neck=new THREE.Mesh(new THREE.CylinderGeometry(.035,.06,.13,9),mats.gold);neck.position.y=h+.1;bottle.add(neck);const cork=new THREE.Mesh(new THREE.CylinderGeometry(.033,.033,.05,8),mats.cream);cork.position.y=h+.19;bottle.add(cork);scene.add(bottle);}}
const pendants=[];for(const x of [-3.35,0,3.35]){const cord=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,1.15,8),mats.gold);cord.position.set(x,4.38,-1.72);scene.add(cord);const shade=new THREE.Mesh(new THREE.CylinderGeometry(.38,.2,.24,24,1,true),mat('#483040',.3,.4));shade.position.set(x,3.78,-1.72);scene.add(shade);const bulb=new THREE.Mesh(new THREE.SphereGeometry(.09,16,12),new THREE.MeshBasicMaterial({color:'#f3c987'}));bulb.position.set(x,3.62,-1.72);scene.add(bulb);const light=new THREE.PointLight('#e8ad7b',14,5,2);light.position.set(x,3.54,-1.65);scene.add(light);pendants.push(light);}
for(const x of [-3,0,3]){const post=new THREE.Mesh(new THREE.CylinderGeometry(.065,.085,.68,16),mats.gold);post.position.set(x,.38,1.8);scene.add(post);const foot=new THREE.Mesh(new THREE.CylinderGeometry(.38,.38,.06,24),mats.dark);foot.position.set(x,.07,1.8);scene.add(foot);const seat=new THREE.Mesh(new THREE.CylinderGeometry(.39,.42,.16,24),mats.velvet);seat.position.set(x,.78,1.8);seat.castShadow=true;scene.add(seat);const rim=new THREE.Mesh(new THREE.TorusGeometry(.38,.025,8,24),mats.gold);rim.rotation.x=Math.PI/2;rim.position.set(x,.85,1.8);scene.add(rim);}
const shaker=new THREE.Mesh(new THREE.CylinderGeometry(.12,.17,.46,16),new THREE.MeshStandardMaterial({color:'#b8a9a8',metalness:.85,roughness:.2}));shaker.position.set(-3.85,1.42,.05);scene.add(shaker);const shakerTop=new THREE.Mesh(new THREE.CylinderGeometry(.085,.12,.11,16),mats.goldLight);shakerTop.position.set(-3.85,1.7,.05);scene.add(shakerTop);
for(let i=0;i<3;i++){const citrus=new THREE.Mesh(new THREE.SphereGeometry(.11,12,10),mat(['#dcaa57','#9ea75a','#d47e59'][i],.38));citrus.position.set(3.55+i*.19,1.26,.23);citrus.scale.set(1,.48,1);scene.add(citrus);}
for(const x of [-5.4,5.4]){const back=new THREE.Mesh(new THREE.BoxGeometry(.22,.42,.12),mats.gold);back.position.set(x,3.55,-4.92);scene.add(back);const lamp=new THREE.Mesh(new THREE.SphereGeometry(.12,16,12),new THREE.MeshBasicMaterial({color:'#f5c58b'}));lamp.position.set(x,3.55,-4.78);scene.add(lamp);addLight('#e9a47e',14,[x,3.55,-4.35],4,0);}
const guestPalette=[
 {name:'Sloane',role:'Art director · regular',color:'#9c557c',hair:'#241a2b',skin:'#c98c71',outfit:'velvet'},
 {name:'Rafael',role:'Jazz pianist · first visit',color:'#52757a',hair:'#211a19',skin:'#a66c53',outfit:'suit'},
 {name:'Camille',role:'Architect · night owl',color:'#80639b',hair:'#34202b',skin:'#e0b298',outfit:'silk'},
 {name:'Dante',role:'Chef · just off shift',color:'#aa7150',hair:'#181419',skin:'#b87b62',outfit:'suit'},
 {name:'Noor',role:'Photographer · curious',color:'#4e7893',hair:'#1e2025',skin:'#a56e58',outfit:'silk'},
 {name:'Jules',role:'Florist · knows the menu',color:'#a2636f',hair:'#422b21',skin:'#edc5a5',outfit:'velvet'}
];
function mesh(geometry,material,parent,x=0,y=0,z=0){const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
const guestGroups=[],guestData=[];
function makeGuest(index,person){
 const root=new THREE.Group();root.position.set([-3,0,3][index],0,.2);scene.add(root);const body=new THREE.Group();root.add(body);
 const skin=mat(person.skin,.84),hair=mat(person.hair,.82),outfit=mat(person.color,.48,.06);
 const top=mesh(new THREE.CapsuleGeometry(.29,.57,5,12),outfit,body,0,1.48,0);top.scale.set(1,1,.72);
 if(person.outfit==='silk'){const lapel=mesh(new THREE.ConeGeometry(.15,.55,4),mat('#e6c6a9',.4),body,-.11,1.64,.205);lapel.rotation.z=.12;}
 if(person.outfit==='suit'){for(const side of [-1,1]){const lapel=mesh(new THREE.ConeGeometry(.14,.42,4),mat('#d4c3ae',.55),body,side*.11,1.68,.18);lapel.rotation.z=side*-.2;}mesh(new THREE.BoxGeometry(.035,.48,.035),mats.gold,body,0,1.48,.225);}
 mesh(new THREE.CylinderGeometry(.105,.12,.23,12),skin,body,0,1.99,0);
 const face=mesh(new THREE.SphereGeometry(.245,24,20),skin,body,0,2.25,.01);face.scale.set(.9,1.14,.86);
 const hairCap=mesh(new THREE.SphereGeometry(.26,20,16),hair,body,0,2.39,-.025);hairCap.scale.set(1.02,.72,.92);
 if(['Rafael','Dante'].includes(person.name)){const side=mesh(new THREE.SphereGeometry(.19,16,12),hair,body,.02,2.31,.11);side.scale.set(1,.52,.9);}
 else{const lock=mesh(new THREE.SphereGeometry(.19,16,12),hair,body,-.18,2.25,.08);lock.scale.set(.72,1.15,.82);const lock2=mesh(new THREE.SphereGeometry(.13,14,12),hair,body,.19,2.22,.04);lock2.scale.set(.7,1.2,.8);}
 const eyeMat=new THREE.MeshBasicMaterial({color:'#30202a'});for(const ex of [-.078,.078])mesh(new THREE.SphereGeometry(.022,8,8),eyeMat,body,ex,2.28,.207);
 const smile=mesh(new THREE.TorusGeometry(.045,.008,6,12,Math.PI),new THREE.MeshBasicMaterial({color:'#7a4749'}),body,0,2.16,.205);smile.rotation.z=Math.PI;
 for(const side of [-1,1]){const shoulder=mesh(new THREE.SphereGeometry(.14,14,12),outfit,body,side*.3,1.77,0);shoulder.scale.set(1,1.25,1);const arm=mesh(new THREE.CapsuleGeometry(.075,.43,4,10),skin,body,side*.38,1.37,.04);arm.rotation.z=side*-.13;const cuff=mesh(new THREE.CylinderGeometry(.083,.08,.09,10),person.outfit==='suit'?mats.gold:outfit,body,side*.39,1.17,.23);cuff.rotation.x=Math.PI/2;}
 if(person.outfit!=='suit')for(const side of [-1,1])mesh(new THREE.SphereGeometry(.027,10,8),mats.goldLight,body,side*.226,2.22,.04);
 const halo=new THREE.Mesh(new THREE.TorusGeometry(.48,.018,8,48),new THREE.MeshBasicMaterial({color:'#e4b976',transparent:true,opacity:.8}));halo.rotation.x=Math.PI/2;halo.position.y=.02;root.add(halo);halo.visible=false;
 const pickables=[];body.traverse(o=>{if(o.isMesh){o.userData.slot=index;pickables.push(o);}});
 const data={root,body,halo,pickables,person,reaction:0,turn:0};guestGroups.push(root);guestData.push(data);return data;
}
for(let i=0;i<3;i++)makeGuest(i,guestPalette[i]);
const drinkMenu=[
 {name:'Moonflower',emoji:'✿',mix:'pear · elderflower · bubbles',color:'#dfa5c5',base:11},
 {name:'Ember Kiss',emoji:'✦',mix:'blood orange · ginger · spice',color:'#ed9b69',base:12},
 {name:'Midnight Fig',emoji:'◉',mix:'blackberry · rosemary · lime',color:'#947bc0',base:13}
];
let orders=[],selected=0,score=0,servedTotal=0,streak=0,bestStreak=0,roomMood=70,secondsLeft=75,running=false,lastTime=0,orderSerial=0,toastTimeout=0,audioContext=null,ambienceNodes=[],cocktailMeshes=[];
const ordersEl=$('orders'),recipesEl=$('recipes'),scoreEl=$('score'),timeEl=$('timer'),timeBar=$('timeBar'),vibeEl=$('vibe'),activeCountEl=$('activeCount');
function makeOrder(slot,drinkIndex=Math.floor(Math.random()*drinkMenu.length)){return{id:++orderSerial,slot,drinkIndex,served:false,patience:2,servedAt:0};}
function renderRecipes(){recipesEl.innerHTML=drinkMenu.map((d,i)=>`<button class="recipe-btn" data-drink="${i}" aria-label="Mix ${d.name}, ${d.mix}"><span class="recipe-emoji" style="color:${d.color}">${d.emoji}</span><span><strong>${d.name}</strong><small>${d.mix}</small></span></button>`).join('');recipesEl.querySelectorAll('.recipe-btn').forEach(b=>b.addEventListener('click',()=>pour(Number(b.dataset.drink))));}
function renderOrders(){
 ordersEl.innerHTML=orders.map((o,i)=>{const p=guestData[i].person,d=drinkMenu[o.drinkIndex],state=o.served?'✓ served':o.patience===1?'one more try':'waiting for a little magic';return `<article class="order-card ${i===selected?'selected':''} ${o.served?'served':''}" data-slot="${i}" tabindex="${o.served?-1:0}" role="button" aria-label="${p.name} wants a ${d.name}"><div class="avatar" style="background:radial-gradient(circle at 30% 25%,${p.color},#211622 75%)">${p.name[0]}</div><div class="guest-info"><div class="guest-name">${p.name}</div><div class="guest-line">“${d.name}, please” · ${state}</div></div><span class="seat-no">SEAT 0${i+1}</span></article>`;}).join('');
 ordersEl.querySelectorAll('.order-card').forEach(c=>{const choose=()=>selectGuest(Number(c.dataset.slot));c.addEventListener('click',choose);c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose();}});});
 const waiting=orders.filter(o=>!o.served).length;activeCountEl.textContent=`${waiting} ${waiting===1?'guest':'guests'} waiting`;guestData.forEach((g,i)=>g.halo.visible=i===selected&&!orders[i]?.served);
}
function selectGuest(i){if(!running||!orders[i]||orders[i].served)return;selected=i;renderOrders();guestData[i].turn=.18;}
function updateHud(){scoreEl.textContent=`$${String(score).padStart(3,'0')}`;const m=Math.floor(secondsLeft/60),s=Math.max(0,Math.ceil(secondsLeft%60));timeEl.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;timeBar.style.width=`${Math.max(0,secondsLeft/75*100)}%`;timeBar.style.background=secondsLeft<15?'linear-gradient(90deg,#c7586c,#ef9178)':'linear-gradient(90deg,#d49d73,#f0ce91)';const word=roomMood>82?'ELECTRIC':roomMood>60?'GOOD':roomMood>34?'WARM':'COOL';vibeEl.innerHTML=`✦ <span>${word}</span>`;}
function showToast(message){const toast=$('toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>toast.classList.remove('show'),1750);}
function pour(drinkIndex){
 if(!running)return;const slot=selected,order=orders[slot],guest=guestData[slot];if(!order||order.served){showToast('Choose a guest who is still waiting.');return;}
 if(order.drinkIndex!==drinkIndex){order.patience--;streak=0;roomMood=Math.max(18,roomMood-7);guest.reaction=-.15;
  if(order.patience<=0){score=Math.max(0,score-4);order.served=true;order.servedAt=clock.elapsedTime;showToast(`${guest.person.name} laughs it off · try the next round`);setTimeout(()=>replaceOrder(slot,order.id),1700);}
  else showToast(`Not quite — ${guest.person.name} asked for ${drinkMenu[order.drinkIndex].name}`);
  updateHud();renderOrders();playNote(190,.08);return;
 }
 const bonus=Math.min(10,Math.max(0,streak*2)),tip=drinkMenu[drinkIndex].base+bonus;score+=tip;servedTotal++;streak++;bestStreak=Math.max(bestStreak,streak);roomMood=Math.min(100,roomMood+5+(streak>2?2:0));order.served=true;order.servedAt=clock.elapsedTime;guest.reaction=.32;guest.turn=.12;
 const words=['A perfect pour.','Exactly what I needed.','You remembered!','This is dangerously good.','One more, when you have a moment?','You have excellent taste.'];showToast(`${guest.person.name}: “${words[Math.floor(Math.random()*words.length)]}”  +$${tip}`);tossDrink(slot,drinkIndex);updateHud();renderOrders();playNote(540+drinkIndex*90,.12);setTimeout(()=>replaceOrder(slot,order.id),1450);
}
function replaceOrder(slot,id){if(!running||!orders[slot]||orders[slot].id!==id)return;orders[slot]=makeOrder(slot);if(orders.every(o=>o.served))orders.forEach((o,i)=>setTimeout(()=>{if(running&&orders[i].served)orders[i]=makeOrder(i);renderOrders();},250));renderOrders();}
function tossDrink(slot,index){const color=drinkMenu[index].color,group=new THREE.Group(),glassMat=new THREE.MeshPhysicalMaterial({color:'#e4d4d1',roughness:.08,transparent:true,opacity:.38,metalness:.1,clearcoat:1});
 mesh(new THREE.CylinderGeometry(.13,.1,.25,18,1,true),glassMat,group,0,.19,0);mesh(new THREE.CylinderGeometry(.105,.088,.12,18),new THREE.MeshStandardMaterial({color,roughness:.2,metalness:.05,emissive:color,emissiveIntensity:.18}),group,0,.18,0);mesh(new THREE.CylinderGeometry(.018,.022,.18,10),glassMat,group,0,.015,0);mesh(new THREE.CylinderGeometry(.09,.09,.018,16),glassMat,group,0,-.08,0);const garnish=mesh(new THREE.TorusGeometry(.065,.012,6,16),mats.goldLight,group,0,.31,0);garnish.rotation.x=.25;
 group.position.set(0,1.34,.4);group.scale.setScalar(.78);scene.add(group);const targetX=[-3,0,3][slot];cocktailMeshes.push({group,start:clock.elapsedTime,from:new THREE.Vector3(0,1.34,.4),to:new THREE.Vector3(targetX,1.36,.74),spin:Math.random()*5});}
// Audio stays opt-in; all sound is generated locally with the Web Audio API.
function ensureAudio(){
 if(audioContext)return audioContext;
 const AudioCtor=window.AudioContext||window.webkitAudioContext;
 if(!AudioCtor)return null;
 audioContext=new AudioCtor();
 const master=audioContext.createGain();master.gain.value=.28;master.connect(audioContext.destination);
 const filter=audioContext.createBiquadFilter();filter.type='lowpass';filter.frequency.value=420;filter.connect(master);
 ambienceNodes=[];
 for(const [frequency,volume] of [[110,.035],[164.81,.018],[220,.009]]){
  const osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.type='sine';osc.frequency.value=frequency;gain.gain.value=volume;osc.connect(gain);gain.connect(filter);osc.start();ambienceNodes.push(osc,gain);
 }
 audioContext._master=master;
 return audioContext;
}
function setSound(enabled){
 const button=$('soundToggle');
 if(enabled){const ctx=ensureAudio();if(ctx)ctx.resume().catch(()=>{});}
 else if(audioContext)audioContext.suspend().catch(()=>{});
 button.dataset.on=String(enabled);button.innerHTML=`♫ <span>Sound ${enabled?'on':'off'}</span>`;button.setAttribute('aria-pressed',String(enabled));
}
function playNote(frequency,duration=.12){
 if(!audioContext||audioContext.state!=='running')return;
 const osc=audioContext.createOscillator(),gain=audioContext.createGain(),now=audioContext.currentTime;
 osc.type='sine';osc.frequency.setValueAtTime(frequency,now);osc.frequency.exponentialRampToValueAtTime(Math.max(80,frequency*.72),now+duration);
 gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.12,now+.012);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
 osc.connect(gain);gain.connect(audioContext._master);osc.start(now);osc.stop(now+duration+.02);
}
function startShift(){
 score=0;servedTotal=0;streak=0;bestStreak=0;roomMood=70;secondsLeft=75;selected=0;orderSerial=0;
 orders=guestData.map((_,i)=>makeOrder(i));running=true;
 $('intro').classList.add('hidden');$('result').classList.add('hidden');
 updateHud();renderOrders();showToast('The late shift is yours — make every pour count.');
 if(window.matchMedia('(max-width: 700px)').matches){const note=$('mobileNote');note.classList.add('show');setTimeout(()=>note.classList.remove('show'),3600);}
}
function finishShift(){
 if(!running)return;running=false;secondsLeft=0;updateHud();
 $('resultTitle').textContent=score>=100?'The night is yours.':score>=50?'A very good night.':'Last call, lovely.';
 $('resultScore').textContent=`$${String(score).padStart(3,'0')}`;
 $('resultCopy').textContent=servedTotal?`${servedTotal} perfect pour${servedTotal===1?'':'s'} and a room full of good memories.`:'Every great bartender has a quiet first shift. Ready for another?';
 $('servedCount').textContent=String(servedTotal);$('bestStreak').textContent=String(bestStreak);
 $('result').classList.remove('hidden');
}
function onKeyDown(event){
 if(event.repeat)return;
 if(event.key==='1'||event.key==='2'||event.key==='3'){event.preventDefault();pour(Number(event.key)-1);return;}
 if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
  if(!running)return;event.preventDefault();const step=event.key==='ArrowLeft'?-1:1;
  for(let n=1;n<=orders.length;n++){const i=(selected+step*n+orders.length)%orders.length;if(!orders[i].served){selectGuest(i);break;}}
 }
}
const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
function onScenePointer(event){
 if(!running)return;const rect=canvas.getBoundingClientRect();pointer.x=((event.clientX-rect.left)/rect.width)*2-1;pointer.y=-((event.clientY-rect.top)/rect.height)*2+1;
 raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(guestData.flatMap(g=>g.pickables),false);
 if(hits.length){const slot=hits[0].object.userData.slot;if(orders[slot]&&!orders[slot].served)selectGuest(slot);}
}
function onResize(){
 const width=window.innerWidth,height=window.innerHeight;camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.8));renderer.setSize(width,height);
}
function animate(){
 requestAnimationFrame(animate);const delta=Math.min(clock.getDelta(),.05),now=clock.elapsedTime;
 if(running){secondsLeft=Math.max(0,secondsLeft-delta);if(secondsLeft===0)finishShift();updateHud();}
 guestData.forEach((g,i)=>{g.body.position.y=Math.sin(now*1.35+i*1.7)*.018;g.body.rotation.y+=(g.turn-g.body.rotation.y)*Math.min(1,delta*5);g.turn*=Math.max(0,1-delta*1.8);if(g.reaction){g.body.position.y+=g.reaction;g.reaction*=Math.max(0,1-delta*2.7);}});
 cocktailMeshes=cocktailMeshes.filter(item=>{const t=(now-item.start)/.82;if(t>=1){scene.remove(item.group);item.group.traverse(o=>{if(o.isMesh){o.geometry.dispose();if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material.dispose();}});return false;}const eased=1-Math.pow(1-Math.max(0,t),3);item.group.position.lerpVectors(item.from,item.to,eased);item.group.position.y+=Math.sin(Math.PI*eased)*.52;item.group.rotation.y=item.spin+now*2;item.group.rotation.z=Math.sin(Math.PI*eased)*.12;return true;});
 barLight.intensity=18+Math.sin(now*1.7)*3;renderer.render(scene,camera);
}

$('startBtn').addEventListener('click',startShift);
$('againBtn').addEventListener('click',startShift);
$('soundToggle').addEventListener('click',()=>setSound($('soundToggle').dataset.on!=='true'));
window.addEventListener('keydown',onKeyDown);
window.addEventListener('resize',onResize);
canvas.addEventListener('pointerdown',onScenePointer);
renderRecipes();updateHud();requestAnimationFrame(animate);

