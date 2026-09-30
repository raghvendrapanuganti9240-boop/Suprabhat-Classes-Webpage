document.addEventListener('DOMContentLoaded', () => {
  const $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
  const WHATSAPP_NUMBER = '919890864657'; // country code + number, no + or spaces

  $('#year').textContent = new Date().getFullYear();

  // scroll: progress bar, sunrise, dock highlight
  const sun = $('#sun'), bar = $('#progress');
  const ids = ['top', 'courses', 'teachers', 'contact'];
  const dock = $$('.dock a');
  const onScroll = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const p = Math.min(scrollY / max, 1);
    bar.style.transform = `scaleX(${p})`;
    sun.style.transform = `translate(-50%, ${-p * innerHeight * 0.55}px)`;
    let cur = 'top';
    ids.forEach((id) => { if (document.getElementById(id).getBoundingClientRect().top <= 140) cur = id; });
    dock.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + cur));
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // count-up, each number on its own
  $$('[data-count]').forEach((el) => {
    const t = +el.dataset.count;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const s = performance.now();
      (function tick(n) {
        const p = Math.min((n - s) / 1400, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * t);
        if (p < 1) requestAnimationFrame(tick);
      })(s);
    }, { threshold: 0.4 });
    io.observe(el);
  });

  // reveal on scroll
  const rev = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); }
  }), { threshold: 0.15 });
  $$('.card, .g, .yr, h2').forEach((el) => { el.classList.add('rv'); rev.observe(el); });

  // testimonials marquee: duplicate for seamless loop
  const track = $('#track'); track.innerHTML += track.innerHTML;

  // carousels: centred card is full size, neighbours recede (phones)
  const rows = $$('.swipe');
  const focus = () => {
    if (innerWidth > 860) return rows.forEach((r) => [...r.children].forEach((k) => { k.style.transform = ''; k.style.opacity = ''; }));
    rows.forEach((row) => {
      const c = row.getBoundingClientRect(), mid = c.left + c.width / 2;
      [...row.children].forEach((k) => {
        const r = k.getBoundingClientRect();
        const d = Math.min(Math.abs(r.left + r.width / 2 - mid) / c.width, 1);
        k.style.transform = `scale(${1 - d * 0.09})`; k.style.opacity = 1 - d * 0.4;
      });
    });
  };
  rows.forEach((r) => r.addEventListener('scroll', focus, { passive: true }));
  addEventListener('resize', focus); setTimeout(focus, 400);

  // admission years
  const ay = $('#ay'), cy = new Date().getFullYear();
  for (let y = cy + 1; y >= cy - 8; y--) ay.add(new Option(y, y));

  // enquiry sheet
  const ov = $('#overlay'), form = $('#form'), done = $('#done');
  const open = () => { ov.classList.add('active'); document.body.style.overflow = 'hidden'; form.style.display = 'flex'; done.classList.remove('active'); navigator.vibrate && navigator.vibrate(12); };
  const close = () => { ov.classList.remove('active'); document.body.style.overflow = ''; };
  $$('.open-form').forEach((b) => b.addEventListener('click', open));
  $('#close').addEventListener('click', close);
  $('#doneBtn').addEventListener('click', close);
  ov.addEventListener('click', (e) => { if (e.target === ov) close(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const msg = `New Admission Enquiry — Suprabhat Classes

Student: ${d.fullName}
Parent: ${d.parentName}
Standard: ${d.standard}
Year of admission: ${d.admissionYear}
School/College: ${d.school}
Address: ${d.address}
Phone: ${d.phone}
Email: ${d.email}
Notes: ${d.description || '-'}`;
    form.style.display = 'none'; done.classList.add('active');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    form.reset();
  });
});
