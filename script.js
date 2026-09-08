/* ============================================================================
   Caviro — Sostenibilità
   script.js
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollProgress();
  initNavbarScrollState();
  initRevealOnScroll();
  initAnimatedCounters();
  initNewsletterForm();
});


//MENU HAMBURGER 
function initMobileMenu() {
  const toggleBtn = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggleBtn.classList.toggle('is-active', isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggleBtn.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}


//BARRA DI AVANZAMENTO SCROLL
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  let ticking = false;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = percent + '%';
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  });

  updateProgress();
}


//NAVBAR DINAMICA + LINK ATTIVO
function initNavbarScrollState() {
  const navbar = document.getElementById('header');
  if (!navbar) return;

  function updateNavbarState() {
    navbar.classList.toggle('is-scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', updateNavbarState);
  updateNavbarState();

  // Link attivo in base alla sezione visibile
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.navbar__menu a[data-nav]');

  if (sections.length === 0 || navLinks.length === 0) return;

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const match = link.getAttribute('href') === '#' + id;
          link.classList.toggle('is-active', match);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' });

  sections.forEach((section) => sectionObserver.observe(section));
}


//REVEAL ON SCROLL
function initRevealOnScroll() {
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length === 0) return;

  const groups = new Map();
  revealEls.forEach((el) => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, 0);
    const index = groups.get(parent);
    el.style.setProperty('--delay', (index * 0.08) + 's');
    groups.set(parent, index + 1);
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => observer.observe(el));
}


//CONTATORI ANIMATI 
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter-value');
  if (counters.length === 0) return;

  const DURATION = 1600;

  function animateCounter(el) {
    const raw = el.getAttribute('data-target') || '0';
    const suffix = el.getAttribute('data-suffix') || '';
    const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
    const target = parseFloat(raw) || 0;

    const steps = 50;
    const stepTime = Math.max(Math.floor(DURATION / steps), 16);
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString('it-IT', {
          minimumFractionDigits: decimals, maximumFractionDigits: decimals
        }) + suffix;
        clearInterval(timer);
      } else {
        el.textContent = current.toLocaleString('it-IT', {
          minimumFractionDigits: decimals, maximumFractionDigits: decimals
        }) + suffix;
      }
    }, stepTime);
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((counter) => observer.observe(counter));
}


 //FORM NEWSLETTER 
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('newsletterEmail');
  const msg = document.getElementById('newsletterMsg');
  if (!form || !emailInput || !msg) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();

    if (email === '') {
      msg.textContent = 'Inserisci un indirizzo email valido.';
      return;
    }

    msg.textContent = `Grazie! Riceverai aggiornamenti a ${email}.`;
    form.reset();
  });
}