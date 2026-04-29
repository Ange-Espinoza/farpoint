/* ════════════════════════════════════════
   farpoint. — main.js
   ════════════════════════════════════════ */

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function loop() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();

document.querySelectorAll('a, button, .service-row, .team-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '20px';
    cursor.style.height = '20px';
    ring.style.width    = '56px';
    ring.style.height   = '56px';
    ring.style.opacity  = '0.65';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '10px';
    cursor.style.height = '10px';
    ring.style.width    = '36px';
    ring.style.height   = '36px';
    ring.style.opacity  = '0.4';
  });
});

/* ── STAR FIELD ── */
const canvas = document.getElementById('stars-canvas');
const ctx    = canvas.getContext('2d');

function resize() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', resize);

const stars = Array.from({ length: 200 }, () => ({
  x:  Math.random(),
  y:  Math.random(),
  r:  Math.random() * 1.2 + 0.2,
  op: Math.random() * 0.6 + 0.1,
  ph: Math.random() * Math.PI * 2,
  sp: Math.random() * 0.015 + 0.003,
}));

const acidStars = Array.from({ length: 14 }, () => ({
  x:  Math.random(),
  y:  Math.random(),
  r:  Math.random() * 1.4 + 0.6,
  op: Math.random() * 0.5 + 0.2,
  ph: Math.random() * Math.PI * 2,
  sp: Math.random() * 0.02 + 0.005,
}));

(function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(s => {
    s.ph += s.sp;
    const o = s.op * (0.7 + 0.3 * Math.sin(s.ph));
    ctx.beginPath();
    ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(240, 237, 230, ${o})`;
    ctx.fill();
  });

  acidStars.forEach(s => {
    s.ph += s.sp;
    const o = s.op * (0.6 + 0.4 * Math.sin(s.ph));
    ctx.beginPath();
    ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(230, 255, 0, ${o})`;
    ctx.fill();
  });

  requestAnimationFrame(draw);
})();

/* ── NAV SCROLL STATE ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 60);
});

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
