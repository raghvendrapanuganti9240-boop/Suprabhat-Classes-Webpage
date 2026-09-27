/* ================================================================
   SUPRABHAT CLASSES — interactions
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- WhatsApp / phone numbers — EDIT THESE ---------- */
  const WHATSAPP_NUMBER = '8421565751'; // country code + number, no + or spaces
  const OWNER_PHONE_DISPLAY = '+91 8421565751';

  /* ---------- scroll-driven sunrise: sun rises as you scroll the page ---------- */
  const sun = document.querySelector('.sun');
  function updateSun() {
    const scrollPercent = Math.min(
      window.scrollY / (document.documentElement.scrollHeight - window.innerHeight),
      1
    );
    // sun rises from -30vh (below horizon) to -5vh (peeking) as user scrolls down
    const riseAmount = scrollPercent * window.innerHeight * 0.5;
    if (sun) sun.style.transform = `translate(-50%, -${riseAmount}px)`;
  }
  window.addEventListener('scroll', updateSun, { passive: true });
  updateSun();

  /* ---------- animated count-up stats (runs once, when in view) ---------- */
  const counters = document.querySelectorAll('[data-count]');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;
    counters.forEach((el) => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const duration = 1400;
      const startTime = performance.now();
      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  const heroStatsSection = document.querySelector('.hero-stats, .hero-mobile-stats');
  if (heroStatsSection) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    obs.observe(heroStatsSection);
  }

  /* ---------- reveal-on-scroll for section headings & cards ---------- */
  const revealTargets = document.querySelectorAll(
    '.chalk-card, .timeline-item, .teacher-card, .quote-card, .gallery-item, .success-card'
  );
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity .6s ease ${((i % 3) * 0.1)}s, transform .6s ease ${((i % 3) * 0.1)}s`;
    revealObserver.observe(el);
  });

  /* ---------- populate admission-year dropdown ---------- */
  const admissionYearSelect = document.getElementById('admissionYear');
  if (admissionYearSelect) {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear + 1; y >= currentYear - 8; y--) {
      const opt = document.createElement('option');
      opt.value = y;
      opt.textContent = y;
      admissionYearSelect.appendChild(opt);
    }
  }

  /* ---------- enquiry modal open/close ---------- */
  const modalOverlay = document.getElementById('modalOverlay');
  const enquiryForm = document.getElementById('enquiryForm');
  const modalSuccess = document.getElementById('modalSuccess');
  const openButtons = [
    'enquireBtnDesktop', 'enquireBtnMobile', 'enquireBtnHero',
    'enquireBtnHeroMobile', 'enquireBtnContact', 'enquireBtnFab'
  ];

  function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    enquiryForm.style.display = 'flex';
    enquiryForm.style.flexDirection = 'column';
    modalSuccess.classList.remove('active');
  }
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', openModal);
  });

  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalSuccessClose').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ---------- form submit → build WhatsApp message ---------- */
  enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(enquiryForm).entries());

    const message =
`New Admission Enquiry — Suprabhat Classes

Full Name: ${data.fullName}
Parent Name: ${data.parentName}
Current Standard: ${data.standard}
Year of Admission: ${data.admissionYear}
School/College: ${data.school}
Address: ${data.address}
Phone: ${data.phone}
Email: ${data.email}
Notes: ${data.description || '-'}`;

    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Show success state, then hand off to WhatsApp
    enquiryForm.style.display = 'none';
    modalSuccess.classList.add('active');
    window.open(waLink, '_blank', 'noopener');

    enquiryForm.reset();
  });

  /* ---------- highlight active bottom-nav item on scroll (mobile) ---------- */
  const navItems = document.querySelectorAll('.bottom-nav-item');
  const sections = ['top', 'journey', 'teachers', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function updateActiveNav() {
    let currentId = 'top';
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 120) currentId = sec.id;
    });
    navItems.forEach((item) => {
      const href = item.getAttribute('href')?.replace('#', '');
      item.classList.toggle('active', href === currentId);
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

});
