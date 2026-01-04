

// --- CONFIGURATION: WATT FOLDER ALBUM ---
// The slideshow will now look for images inside your "watt" folder.
// MAKE SURE these filenames match exactly what is inside your "watt" folder!
const albumImages = [
  'watt/1.jpg',   // Change these names to match your files
  'watt/2.jpg',
  'watt/7.jpg',
  'watt/4.jpg',
  'watt/8.jpg',
  'watt/a (2).jpg',
  'watt/f.jpg',
  'watt/g.jpg',
  'watt/h.jpg',
  'watt/3.jpg',
  'watt/5.jpg',
  'watt/11.jpg'
];

let currentIndex = 0;
let isSlideshowMode = false;

// --- MODAL & SLIDESHOW FUNCTIONS ---

// 1. Standard Zoom (For regular images)
function openModal(src){
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const arrows = document.querySelectorAll('.slide-btn');

  if(modal){  
    isSlideshowMode = false; 
    modal.style.display = 'flex';
    modalImg.src = src;
    
    // Hide arrows for single images
    if(arrows.length > 0) {
      arrows.forEach(btn => btn.style.display = 'none');
    }
  }
}

// 2. Open Album Slideshow (For the Watt Album)
function openAlbum(){
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const arrows = document.querySelectorAll('.slide-btn');

  // Safety check
  if (albumImages.length === 0) {
    console.error("No images configured in albumImages list!");
    return;
  }

  if(modal){
    isSlideshowMode = true; 
    currentIndex = 0; // Start at first image
    modal.style.display = 'flex';
    modalImg.src = albumImages[0]; 
    
    // Show arrows
    if(arrows.length > 0) {
      arrows.forEach(btn => btn.style.display = 'block');
    }
  }
}

// 3. Close Modal
function closeModal(){ 
  const modal = document.getElementById('modal'); 
  if(modal) modal.style.display='none'; 
}

// 4. Next/Previous Slide Logic
function changeSlide(n, event) {
  if (event) event.stopPropagation(); // Prevent modal from closing
  if (!isSlideshowMode) return; 

  currentIndex += n;

  // Loop functionality
  if (currentIndex >= albumImages.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = albumImages.length - 1;

  document.getElementById('modalImg').src = albumImages[currentIndex];
}

// Keyboard Controls
document.addEventListener('keydown', function(e) {
  const modal = document.getElementById('modal');
  if (modal && modal.style.display === 'flex' && isSlideshowMode) {
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
  }
  if (e.key === 'Escape') closeModal();
});

// FADE IN ON PAGE LOAD
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('fade-in');
});

// FADE OUT ON NAVIGATION
document.querySelectorAll('a').forEach(link => {
  if(link.href.startsWith(window.location.origin)){
    link.addEventListener('click', function(e){
      e.preventDefault();
      const href = this.href;
      document.body.classList.remove('fade-in');
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = href;
      }, 600); // matches CSS transition
    });
  }
});
  
// SHRINK NAVIGATION
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) nav.classList.add('shrink');
  else nav.classList.remove('shrink');
});

// IMAGE MODAL
function openModal(src){
  const modal = document.getElementById('modal');
  if(modal){ modal.style.display='flex'; document.getElementById('modalImg').src=src; }
}
function closeModal(){ const modal = document.getElementById('modal'); if(modal) modal.style.display='none'; }

// SECTION FADE-IN
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('show'); });
}, { threshold:0.2 });
sections.forEach(section => observer.observe(section));

// SMOOTH PAGE TRANSITIONS
document.querySelectorAll('a').forEach(link=>{
  if(link.href.startsWith(window.location.origin)){
    link.addEventListener('click', function(e){
      e.preventDefault();
      const href = this.href;
      document.body.classList.add('fade-out');
      setTimeout(()=>{ window.location.href = href; },600);
    });
  }
});

// BOTTOM BUTTONS HIDE/SHOW
let lastScrollY = window.scrollY;
const bottomButtons = document.querySelector('.btn-group-fixed');
window.addEventListener('scroll', ()=>{
  if(!bottomButtons) return;
  if(window.scrollY>lastScrollY){
    bottomButtons.style.transform='translateX(-50%) translateY(100px)';
    bottomButtons.style.opacity='0';
  } else {
    bottomButtons.style.transform='translateX(-50%) translateY(0)';
    bottomButtons.style.opacity='1';
  }
  lastScrollY = window.scrollY;
});

// PROFILE FLOAT EFFECT
const profileWrapper = document.getElementById('profileWrapper');
const profilePic = document.getElementById('profilePic');
let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;

document.addEventListener('mousemove',(e)=>{
  mouseX=e.clientX;
  mouseY=e.clientY;
  if(profileWrapper){
    const offsetX=(mouseX-window.innerWidth/2)/40;
    const offsetY=(mouseY-window.innerHeight/2)/40;
    profileWrapper.style.transform=`translate3d(${offsetX}px, ${offsetY}px,0)`;
    profilePic.style.transform=`scale(1.05) translate3d(${offsetX/2}px, ${offsetY/2}px,0)`;
  }
});
document.addEventListener('mouseleave',()=>{
  if(profileWrapper){
    profileWrapper.style.transform='translate3d(0,0,0)';
    profilePic.style.transform='scale(1) translate3d(0,0,0)';
  }
});

// PARTICLE BACKGROUND WITH NEON TRAILS
const canvas=document.getElementById('bgCanvas');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particlesArray=[];
const colors=['#38bdf8','#60a5fa','#2563eb','#0ea5e9'];

class Particle{
  constructor(){
    this.x=Math.random()*canvas.width;
    this.y=Math.random()*canvas.height;
    this.size=Math.random()*3+1;
    this.speedX=Math.random()*1-0.5;
    this.speedY=Math.random()*1-0.5;
    this.color=colors[Math.floor(Math.random()*colors.length)];
    this.history=[];
  }
  update(){
    this.x+=this.speedX;
    this.y+=this.speedY;
    if(this.x<0||this.x>canvas.width) this.speedX*=-1;
    if(this.y<0||this.y>canvas.height) this.speedY*=-1;

    // MAGNETIC REPULSION
    let px,py;
    if(profileWrapper){
      const rect=profileWrapper.getBoundingClientRect();
      px=rect.left+rect.width/2;
      py=rect.top+rect.height/2;
    } else { px=mouseX; py=mouseY; }

    let dx=this.x-px;
    let dy=this.y-py;
    let dist=Math.sqrt(dx*dx+dy*dy);
    const radius=150;
    if(dist<radius){
      const force=(radius-dist)/20;
      const angle=Math.atan2(dy,dx);
      this.x+=Math.cos(angle)*force;
      this.y+=Math.sin(angle)*force;
    }

    // Add to history for trail
    this.history.push({x:this.x, y:this.y});
    if(this.history.length>10) this.history.shift();
  }
  draw(){
    // Draw neon trail
    for(let i=0;i<this.history.length-1;i++){
      const p1=this.history[i];
      const p2=this.history[i+1];
      ctx.strokeStyle=this.color;
      ctx.globalAlpha=i/this.history.length;
      ctx.lineWidth=2;
      ctx.beginPath();
      ctx.moveTo(p1.x,p1.y);
      ctx.lineTo(p2.x,p2.y);
      ctx.stroke();
    }
    ctx.globalAlpha=1;
    ctx.fillStyle=this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}

function initParticles(){
  particlesArray=[];
  for(let i=0;i<120;i++) particlesArray.push(new Particle());
}

function connectParticles(){
  let maxDistance=120;
  for(let a=0;a<particlesArray.length;a++){
    for(let b=a;b<particlesArray.length;b++){
      let dx=particlesArray[a].x-particlesArray[b].x;
      let dy=particlesArray[a].y-particlesArray[b].y;
      let distance=Math.sqrt(dx*dx+dy*dy);
      if(distance<maxDistance){
        ctx.strokeStyle=`rgba(56,189,248,${1-distance/maxDistance})`;
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x,particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x,particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles(){
  ctx.fillStyle='rgba(0,0,0,0.2)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p=>{p.update();p.draw();});
  connectParticles();
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize',()=>{
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  initParticles();
});

initParticles();
animateParticles();

// EMAILJS contact form handler
(function(){
  // Replace the placeholders below with your EmailJS credentials.
  // - `YOUR_EMAILJS_USER_ID` (public key) from EmailJS dashboard
  // - `YOUR_SERVICE_ID` and `YOUR_TEMPLATE_ID` from your EmailJS setup
  try{
    if(typeof emailjs !== 'undefined'){
      emailjs.init('user123');
    } else {
      console.warn('EmailJS SDK not loaded. Contact form will not send.');
    }
  } catch(e){ console.warn('EmailJS init error', e); }

  const form = document.getElementById('contactForm');
  if(!form) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    if(submitBtn) submitBtn.disabled = true;

    if(typeof emailjs === 'undefined'){
      alert('Email sending is not configured. Please set up EmailJS.');
      if(submitBtn) submitBtn.disabled = false;
      return;
    }

    emailjs.sendForm('service_s','template_y', this)
      .then(function(){
        alert('Message sent — thank you!');
        form.reset();
        if(submitBtn) submitBtn.disabled = false;
      }, function(error){
        console.error('EmailJS error', error);
        alert('Failed to send message. Please try again later.');
        if(submitBtn) submitBtn.disabled = false;
      });
  });
})();
