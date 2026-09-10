/* ============================================================
   LOVEALL FUTSAL TOURNAMENT — JAVASCRIPT
   Navbar scroll, countdown, scroll animations
   ============================================================ */

// ─── Navbar Scroll Effect ────────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link highlight based on section in view
  updateActiveNavLink();
}, { passive: true });

function updateActiveNavLink() {
  const sections = ['hero', 'format', 'venue'];
  const navLinks = document.querySelectorAll('.nav-link');

  let currentSection = '';

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      currentSection = id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href && href.includes(currentSection) && currentSection) {
      link.classList.add('active');
    }
  });
}

// ─── Countdown Timer ─────────────────────────────────────────────
function initCountdown() {
  // Target: Saturday 26th September 2026 at 17:00 IST
  const target = new Date('2026-09-26T17:00:00+05:30');

  const daysEl    = document.getElementById('days');
  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  let prevValues = { days: -1, hours: -1, minutes: -1, seconds: -1 };

  function pad(n) {
    return String(Math.max(0, n)).padStart(2, '0');
  }

  function updateCountdown() {
    const now  = new Date();
    const diff = target - now;

    if (diff <= 0) {
      // Match has started!
      daysEl.textContent    = '00';
      hoursEl.textContent   = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    function updateEl(el, val, key) {
      if (val !== prevValues[key]) {
        el.classList.add('flip');
        setTimeout(() => el.classList.remove('flip'), 300);
        el.textContent = pad(val);
        prevValues[key] = val;
      }
    }

    updateEl(daysEl, days, 'days');
    updateEl(hoursEl, hours, 'hours');
    updateEl(minutesEl, minutes, 'minutes');
    updateEl(secondsEl, seconds, 'seconds');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

initCountdown();

// ─── Scroll-triggered Animations ─────────────────────────────────
function initScrollAnimations() {
  const animatedEls = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on index within a parent
        const siblings = entry.target.parentElement
          ? Array.from(entry.target.parentElement.querySelectorAll('.animate-on-scroll'))
          : [];
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 80, 400);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedEls.forEach(el => observer.observe(el));
}

initScrollAnimations();

// ─── Smooth scroll for nav links ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const target   = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── Parallax subtle effect on hero orbs ────────────────────────
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  const orb3 = document.querySelector('.orb-3');

  if (orb1) orb1.style.transform = `translate(${x * 18}px, ${y * 14}px)`;
  if (orb2) orb2.style.transform = `translate(${-x * 14}px, ${-y * 10}px)`;
  if (orb3) orb3.style.transform = `translate(${x * 10}px, ${y * 8}px)`;
}, { passive: true });

// ─── Card tilt effect ────────────────────────────────────────────
document.querySelectorAll('.info-card, .detail-card, .reward-item').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, border-color 0.3s ease';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease, box-shadow 0.4s ease, border-color 0.3s ease';
  });
});
