'use strict';

// WhatsApp de contacto (Colombia, sin + ni espacios).
const WHATSAPP_NUMBER = '573012275448';

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
  mobileNav.hidden = true;
  document.body.classList.remove('menu-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  mobileNav.hidden = !open;
  document.body.classList.toggle('menu-open', open);
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 820) closeMenu(); });

const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  projectCards.forEach(card => { card.hidden = filter !== 'todos' && !card.dataset.category.split(' ').includes(filter); });
}));

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');
if (!reducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08, rootMargin: '0px 0px -25px 0px' });
  reveals.forEach(element => observer.observe(element));
} else reveals.forEach(element => element.classList.add('visible'));

const backToTop = document.querySelector('#back-to-top');
window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 650), { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' }));
document.querySelector('#year').textContent = new Date().getFullYear();

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const data = new FormData(contactForm);
  if (String(data.get('_gotcha') || '').trim()) return;
  const nombre = String(data.get('nombre') || '').trim();
  const correo = String(data.get('correo') || '').trim();
  const tipo = String(data.get('tipo') || '').trim();
  const mensaje = String(data.get('mensaje') || '').trim();
  if (!nombre || !correo || !mensaje) return;

  const texto = [
    'Hola Dewys, quiero hablar sobre un proyecto.',
    '',
    '*Nombre:* ' + nombre,
    '*Correo:* ' + correo,
    '*Tipo de proyecto:* ' + (tipo || 'Por definir'),
    '*Descripción:*',
    mensaje,
    '',
    'Enviado desde tu portafolio web.'
  ].join('\n');
  const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(texto);
  formStatus.classList.remove('is-success', 'is-error');
  // Abrir desde el clic del visitante evita bloqueos de ventanas emergentes.
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (opened) {
    formStatus.textContent = 'Se abrió WhatsApp con tu solicitud preparada. Revisa el mensaje y pulsa Enviar para compartirlo.';
    formStatus.classList.add('is-success');
  } else {
    formStatus.textContent = 'Si WhatsApp no se abrió, utiliza este enlace para continuar: ';
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Abrir WhatsApp';
    formStatus.appendChild(link);
  }
});

// Laboratorio visual: cambios por clic, efecto de profundidad con puntero y respeto a movimiento reducido.
const labModes = {
  code: {file:'solution.js',status:'Compilación completada · 0 errores',lines:[['const ','key'],['solution = {','plain'],['  design: "impact",','plain'],['  code: "quality",','plain'],['  future: "scalable"','plain'],['};','plain'],['// Ready to build ✦','comment']]},
  design: {file:'design.system',status:'Interfaz validada · Experiencia lista',lines:[['const ','key'],['experience = {','plain'],['  clarity: "100%",','plain'],['  motion: "fluid",','plain'],['  access: "inclusive"','plain'],['};','plain'],['// Design with intention ✦','comment']]},
  deploy: {file:'deploy.pipeline',status:'Deploy exitoso · Sistema online',lines:[['$ npm run build','key'],['✓ assets optimized','plain'],['✓ accessibility checked','plain'],['✓ responsive ready','plain'],['✓ deployment complete','plain'],['','plain'],['// Launched successfully ↗','comment']]}
};
const labTabs = document.querySelectorAll('[data-lab]');
const labCode = document.getElementById('lab-code-content');
const labFile = document.getElementById('lab-filename');
const labStatus = document.getElementById('lab-status');
const labProgress = document.getElementById('lab-progress-bar');
const labStage = document.getElementById('lab-stage');
let labTimer;
function showLab(mode){
  const data = labModes[mode];if(!data)return;
  clearInterval(labTimer);
  labTabs.forEach(btn=>{let isActive=btn.dataset.lab===mode;btn.classList.toggle('active',isActive);btn.setAttribute('aria-pressed',String(isActive));});
  labFile.textContent=data.file;labStatus.textContent='Procesando solución…';labCode.textContent='';labProgress.style.width='8%';
  const lines=data.lines.map(x=>x[0]);
  if(reducedMotion){labCode.textContent=lines.join('\n');labStatus.textContent=data.status;labProgress.style.width='100%';return;}
  let i=0;labTimer=setInterval(()=>{labCode.textContent=lines.slice(0,++i).join('\n');labProgress.style.width=Math.round(i/lines.length*100)+'%';if(i>=lines.length){clearInterval(labTimer);labStatus.textContent=data.status;}},140);
}
labTabs.forEach(btn=>btn.addEventListener('click',()=>showLab(btn.dataset.lab)));
showLab('code');
if(!reducedMotion && window.matchMedia('(pointer:fine)').matches){
  const art=document.querySelector('.hero-art');
  art.addEventListener('pointermove',ev=>{const r=art.getBoundingClientRect();const x=(ev.clientX-r.left)/r.width-.5;const y=(ev.clientY-r.top)/r.height-.5;labStage.style.setProperty('--rotate-y',(x*9).toFixed(2)+'deg');labStage.style.setProperty('--rotate-x',(-y*7).toFixed(2)+'deg');});
  art.addEventListener('pointerleave',()=>{labStage.style.setProperty('--rotate-y','0deg');labStage.style.setProperty('--rotate-x','0deg');});
}
