/* ============================================================
   LOVEALL FUTSAL — JAVASCRIPT
   Navbar, countdown, scroll reveal, parallax
   ============================================================ */

// ─── WhatsApp links — reads from config.js ──────────────────────
(function initWhatsApp() {
  if (typeof SITE_CONFIG === 'undefined') {
    console.warn('config.js not loaded — WhatsApp links will not work.');
    return;
  }

  const { whatsappNumber, whatsappMessage } = SITE_CONFIG;
  if (!whatsappNumber || whatsappNumber.includes('X')) {
    console.warn('WhatsApp number not set in config.js');
    return;
  }

  const encoded = encodeURIComponent(whatsappMessage || '');
  const url = `https://wa.me/${whatsappNumber}?text=${encoded}`;

  // Update every WhatsApp CTA on the page
  document.querySelectorAll('#reg-whatsapp-btn, [data-whatsapp]').forEach(el => {
    el.href = url;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';

    // Belt-and-suspenders: direct click handler so it always opens correctly
    el.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
})();

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
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
})();

// ─── Smooth anchor scrolling (skip WhatsApp / external buttons) ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  // Skip elements that are WhatsApp CTAs — they have their own handler
  if (a.id === 'reg-whatsapp-btn' || a.hasAttribute('data-whatsapp')) return;

  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    // Only intercept real in-page anchors (href must be more than just "#")
    if (!href || href === '#') return;
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Hero title line-by-line entrance ────────────────────────────
(function heroEntrance() {
  const lines = document.querySelectorAll('.hero-title .line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(40px)';
    line.style.transition = `opacity 1s cubic-bezier(0.22,1,0.36,1) ${i * 0.15 + 0.2}s, transform 1s cubic-bezier(0.22,1,0.36,1) ${i * 0.15 + 0.2}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      });
    });
  });
})();

// ─── Poster parallax on scroll ──────────────────────────────────
(function posterParallax() {
  const heroBg = document.getElementById('hero-bg');
  if (!heroBg) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const heroHeight = document.getElementById('hero').offsetHeight;
      if (scrollY < heroHeight) {
        const offset = scrollY * 0.4;
        heroBg.style.transform = `scale(1.08) translateY(${offset}px)`;
      }
      ticking = false;
    });
  }, { passive: true });
})();

// ─── Marquee: duplicate for seamless loop ────────────────────────
(function initMarquee() {
  document.querySelectorAll('.marquee-track').forEach(track => {
    const clone = track.cloneNode(true);
    track.parentElement.appendChild(clone);
  });
})();
