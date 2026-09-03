/* ============================================================================
   Caviro — Sostenibilità
   script.js

   Funzionalità, ciascuna incapsulata nella propria funzione ed eseguita
   dopo il caricamento completo del DOM:

   1) Menu hamburger per la navigazione mobile
   2) Barra di avanzamento scroll (in cima alla pagina)
   3) Navbar dinamica (si restringe/scurisce dopo lo scroll) + link attivo
      in base alla sezione visibile
   4) Animazioni "reveal on scroll" per tutti gli elementi [data-reveal]
   5) Contatori numerici animati (interi e decimali)
   6) Form newsletter (validazione lato client, nessun invio reale)
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollProgress();
  initNavbarScrollState();
  initRevealOnScroll();
  initAnimatedCounters();
  initNewsletterForm();
});


/* ---MENU HAMBURGER--- */
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


/* ---BARRA DI AVANZAMENTO SCROLL--- */
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


/* ----------------------------------------------------------------------------
   3) NAVBAR DINAMICA + LINK ATTIVO
   - Dopo 60px di scroll, la navbar riceve la classe "is-scrolled" (sfondo
     pieno, ombra, altezza ridotta: vedi CSS).
   - Un IntersectionObserver osserva ogni <section> con id e assegna la
     classe "is-active" al link di navigazione corrispondente quando la
     sezione occupa la parte centrale dello schermo.
   ---------------------------------------------------------------------------- */
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


/* ----------------------------------------------------------------------------
   4) REVEAL ON SCROLL
   Ogni elemento marcato con l'attributo [data-reveal] parte invisibile e
   leggermente traslato (vedi CSS). Quando entra nel viewport riceve la
   classe "is-visible", che attiva la transizione verso lo stato finale.
   Per un effetto "a cascata" più elegante, agli elementi che condividono
   lo stesso genitore diretto viene assegnato un ritardo crescente tramite
   la custom property CSS --delay.
   ---------------------------------------------------------------------------- */
function initRevealOnScroll() {
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length === 0) return;

  // Applica un piccolo ritardo progressivo (stagger) ai figli di uno
  // stesso contenitore, per un effetto di comparsa più naturale
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


/* ----------------------------------------------------------------------------
   5) CONTATORI ANIMATI
   Supporta sia target interi (es. 36200) sia decimali (es. 1.3), rilevando
   automaticamente il numero di cifre decimali dalla stringa in data-target.
   L'animazione parte solo quando l'elemento entra nel viewport.
   ---------------------------------------------------------------------------- */
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


/* ----------------------------------------------------------------------------
   6) FORM NEWSLETTER
   Prototipo front-end senza backend: previene il submit reale, valida il
   campo email e mostra un messaggio di conferma.
   ---------------------------------------------------------------------------- */
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
