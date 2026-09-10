/* ============================================================
   LOVEALL FUTSAL — JAVASCRIPT
   Nav fill · Countdown · Reveal · Ball parallax · Mouse tilt
   ============================================================ */

// ─── Nav fill on scroll ──────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('filled', window.scrollY > 60);
}, { passive: true });

// ─── Countdown to 26 Sep 2026 17:00 IST ─────────────────────────
(function initCountdown() {
  const target = new Date('2026-09-26T17:00:00+05:30');
  const els = {
    days:  document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins:  document.getElementById('cd-mins'),
    secs:  document.getElementById('cd-secs'),
  };
  const prev = { days: -1, hours: -1, mins: -1, secs: -1 };

  function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      Object.values(els).forEach(el => el && (el.textContent = '00'));
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    [['days', d], ['hours', h], ['mins', m], ['secs', s]].forEach(([key, val]) => {
      if (val !== prev[key] && els[key]) {
        els[key].classList.remove('tick');
        void els[key].offsetWidth;
        els[key].classList.add('tick');
        els[key].textContent = pad(val);
        prev[key] = val;
      }
    });
  }
  tick();
  setInterval(tick, 1000);
})();

// ─── Scroll reveal ───────────────────────────────────────────────
(function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
})();

// ─── Smooth anchor scroll ────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Ball: mouse-tracking tilt ───────────────────────────────────
(function ballTilt() {
  const ball = document.getElementById('hero-ball');
  const wrap = document.getElementById('ball-wrap');
  if (!ball || !wrap) return;

  let currentX = 0, currentY = 0;
  let targetX = 0, targetY = 0;
  let rafId = null;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    currentX = lerp(currentX, targetX, 0.06);
    currentY = lerp(currentY, targetY, 0.06);

    // Perspective tilt — subtle 3D feel
    wrap.style.transform = `
      translate(-50%, -50%)
      rotateX(${currentY * 8}deg)
      rotateY(${currentX * 8}deg)
    `;

    rafId = requestAnimationFrame(animate);
  }
  rafId = requestAnimationFrame(animate);

  document.addEventListener('mousemove', e => {
    const cx = (e.clientX / window.innerWidth - 0.5) * 2;
    const cy = (e.clientY / window.innerHeight - 0.5) * 2;
    targetX = cx;
    targetY = -cy;
  }, { passive: true });

  // Reset on mouse leave
  document.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });
})();

// ─── Ball: scroll parallax (ball rises as you scroll) ────────────
(function ballScrollParallax() {
  const wrap = document.getElementById('ball-wrap');
  const hero = document.getElementById('hero');
  if (!wrap || !hero) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const heroH = hero.offsetHeight;
      if (scrollY < heroH) {
        const progress = scrollY / heroH;
        // Ball drifts upward and fades as user scrolls past hero
        const yOffset = progress * -80;
        const opacity = 1 - progress * 1.5;
        wrap.style.marginTop = `${yOffset}px`;
        wrap.style.opacity = Math.max(0, opacity);
      }
      ticking = false;
    });
  }, { passive: true });
})();

// ─── Orbit dots: counter-rotate on scroll for extra depth ────────
(function orbitScrollDepth() {
  const dots = document.querySelectorAll('.orbit-dot');
  if (!dots.length) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY * 0.05;
      dots.forEach((dot, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        dot.style.setProperty('--extra-rot', `${y * dir}deg`);
      });
      ticking = false;
    });
  }, { passive: true });
})();

// ─── Hero text lines: stagger entrance ──────────────────────────
(function heroTextEntrance() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const reveals = hero.querySelectorAll('[data-reveal]');
  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.15 + 0.3}s`;
    // Trigger immediately for hero (don't wait for scroll)
    setTimeout(() => el.classList.add('in-view'), 100 + i * 120);
  });
})();
