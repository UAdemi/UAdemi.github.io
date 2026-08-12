// Scroll reveals + the hero diagram trigger.
// Finite, one-way, and skipped entirely for reduced-motion users.
//
// Content must never end up permanently invisible. Three layers of safety:
//   1. hidden start states only apply under .js (set inline in <head>)
//   2. IntersectionObserver reveals on scroll
//   3. if the observer never fires, fall back to a scroll handler, then to showing everything
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  function reveal(el) { el.classList.add('is-in'); }
  function showAll() { for (var i = 0; i < items.length; i++) reveal(items[i]); }
  function revealedCount() { return document.querySelectorAll('.reveal.is-in').length; }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) { showAll(); return; }

  // --- layer 2: observers -------------------------------------------------
  function make(threshold, margin) {
    return new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { reveal(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: threshold, rootMargin: margin });
  }
  var io = make(0.12, '0px 0px -10% 0px');
  var ioViz = make(0.38, '0px');

  items.forEach(function (el) {
    (el.classList.contains('viz-band') ? ioViz : io).observe(el);
  });

  // --- layer 3: fallback if the observer never reports anything ------------
  function sweep() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = 0; i < items.length; i++) {
      var el = items[i];
      if (el.classList.contains('is-in')) continue;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) reveal(el);
    }
  }

  setTimeout(function () {
    if (revealedCount() > 0) return;          // observer is working, leave it alone
    sweep();
    window.addEventListener('scroll', sweep, { passive: true });
    window.addEventListener('resize', sweep, { passive: true });
    // last resort: nothing has appeared even after the sweep
    setTimeout(function () { if (revealedCount() === 0) showAll(); }, 2000);
  }, 1200);

  // Give each connector its true length so the draw reads evenly.
  document.querySelectorAll('.viz .try, .viz .link').forEach(function (p) {
    try { p.style.setProperty('--len', p.getTotalLength().toFixed(1)); } catch (e) {}
  });
})();
