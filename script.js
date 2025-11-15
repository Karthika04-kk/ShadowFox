// theme toggles (supports multiple toggles on different pages)
function setupThemeToggle(buttonId) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;
  // initialize state from localStorage
  const saved = localStorage.getItem('theme') || 'light';
  if (saved === 'dark') document.documentElement.setAttribute('data-theme','dark');

  // set aria-pressed correctly
  btn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme','light');
      btn.setAttribute('aria-pressed','false');
      btn.textContent = '🌙';
    } else {
      document.documentElement.setAttribute('data-theme','dark');
      localStorage.setItem('theme','dark');
      btn.setAttribute('aria-pressed','true');
      btn.textContent = '☀️';
    }
  });

  // set initial button text
  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    btn.setAttribute('aria-pressed','true');
    btn.textContent = '☀️';
  } else {
    btn.setAttribute('aria-pressed','false');
    btn.textContent = '🌙';
  }
}

// Setup toggles on pages (IDs used in HTML)
setupThemeToggle('themeToggle');
setupThemeToggle('themeToggle2');
setupThemeToggle('themeToggle3');

// Smooth internal link scrolling (for single-page parts)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return; // allow normal nav if not found
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Contact form feedback (demo)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name?.value || 'there';
    const msg = document.getElementById('formMsg');
    msg.textContent = `Thanks ${name} — your message has been received! (Demo)`;
    form.reset();
    setTimeout(()=> msg.textContent = '', 6000);
  });
}

// Certificates gallery modal
const certThumbs = document.querySelectorAll('.cert-thumb');
const certModal = document.getElementById('certModal');
const certModalImg = document.getElementById('certModalImg');

if (certThumbs && certModal && certModalImg) {
  certThumbs.forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src') || btn.querySelector('img').src;
      certModalImg.src = src;
      certModal.setAttribute('aria-hidden','false');
      certModal.style.display = 'flex';
    });
  });

  certModal.querySelector('.modal-close').addEventListener('click', closeModal);
  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) closeModal();
  });

  function closeModal(){
    certModal.setAttribute('aria-hidden','true');
    certModal.style.display = 'none';
    certModalImg.src = '';
  }
}

// tiny DOM-ready reveal trigger for .reveal elements (for browsers not applying CSS animation delays)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    // force style recalculation to start animation
    el.style.willChange = 'opacity, transform';
  });
});
