/* ===== SUPRABHAT UPGRADE — paste at the VERY BOTTOM of script.js (after the closing }); ) ===== */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const sky = $('.sky');
  if (sky) sky.insertAdjacentHTML('afterbegin', '<div class="aurora"><i></i><i></i><i></i></div>');
  document.body.insertAdjacentHTML('afterbegin', '<div class="progress" id="progress"></div>');

  // floating chips around the mobile portrait
  const pw = $('.hero-mobile-portrait');
  if (pw) pw.insertAdjacentHTML('beforeend', '<span class="chip c1">☀ Since 2001</span><span class="chip c2">State Board · CBSE</span>');

  // scroll progress + parallax sun tilt
  const bar = $('#progress');
  addEventListener('scroll', () => {
    const p = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
    bar.style.transform = `scaleX(${Math.min(p, 1)})`;
  }, { passive: true });

  // word-by-word headline reveal
  document.querySelectorAll('h2').forEach(h => {
    h.innerHTML = h.textContent.trim().split(/\s+/)
      .map((w, i) => `<span class="word" style="transition-delay:${i * 45}ms">${w}</span>`).join(' ');
  });
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .3 });
  document.querySelectorAll('h2').forEach(h => io.observe(h));

  // ripple + haptic on every button
  document.addEventListener('pointerdown', e => {
    const b = e.target.closest('.btn-primary,.btn-enquire,.btn-enquire-mobile,.bottom-nav-fab');
    if (!b) return;
    const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height);
    const d = document.createElement('span');
    d.className = 'ripple';
    d.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
    if (getComputedStyle(b).position === 'static') b.style.position = 'relative';
    b.style.overflow = 'hidden';
    b.appendChild(d); setTimeout(() => d.remove(), 650);
    navigator.vibrate && navigator.vibrate(12);
  });

  // carousel focus: centered card pops, others recede (mobile)
  const rows = document.querySelectorAll('.timeline,.gallery-grid,.success-grid');
  const focus = () => rows.forEach(row => {
    const c = row.getBoundingClientRect(); const mid = c.left + c.width / 2;
    [...row.children].forEach(k => {
      if (k.classList.contains('timeline-track')) return;
      const r = k.getBoundingClientRect();
      const d = Math.min(Math.abs(r.left + r.width / 2 - mid) / c.width, 1);
      k.style.transform = `scale(${1 - d * .1})`; k.style.opacity = 1 - d * .45;
    });
  });
  if (innerWidth <= 860) { rows.forEach(r => r.addEventListener('scroll', focus, { passive: true })); setTimeout(focus, 500); }

  // desktop cursor glow
  if (matchMedia('(hover:hover)').matches) {
    const g = document.createElement('div'); g.className = 'glow'; document.body.appendChild(g);
    addEventListener('pointermove', e => { g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px'; });
  }
})();


(() => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = +el.dataset.count;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      (function tick(now) {
        const p = Math.min((now - start) / 1400, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
        if (p < 1) requestAnimationFrame(tick);
      })(start);
    }, { threshold: 0.4 });
    io.observe(el);
  });
})();
