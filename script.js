// ─── NAV SCROLL ──────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── INTERSECTION OBSERVER — FADE UPS ────────────────────
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

// ─── SKILL BARS ───────────────────────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const fills = e.target.querySelectorAll('.skill-bar-fill, .thm-path-fill');
      fills.forEach(fill => {
        const w = fill.dataset.width;
        if (w) setTimeout(() => { fill.style.width = w + '%'; }, 200);
      });
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-group, .thm-card').forEach(el => barObserver.observe(el));

// ─── FORM SUBMIT ──────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const statusEl = document.getElementById('formStatus');
  const form = document.getElementById('contactForm');
  
  btn.textContent = 'Sending...';
  btn.disabled = true;
  statusEl.textContent = 'Sending your message...';
  
  const formData = new FormData(form);
  
  fetch('https://formspree.io/f/maqvvpql', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        btn.textContent = 'Message sent ✓';
        btn.style.background = 'var(--accent2)';
        btn.style.color = 'var(--bg)';
        statusEl.textContent = 'Your message has been sent!';
        form.reset();
        setTimeout(() => {
          btn.textContent = 'Send Message →';
          btn.style.background = '';
          btn.style.color = '';
          btn.disabled = false;
          statusEl.textContent = '';
        }, 3500);
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      btn.textContent = 'Failed to send';
      btn.style.background = 'var(--red)';
      btn.style.color = 'var(--text)';
      statusEl.textContent = 'Failed to send. Please try again.';
      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 3500);
    });
}

// ─── SMOOTH ACTIVE NAV (optional highlight) ───────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--accent)' : '';
  });
});
