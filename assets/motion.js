// Scroll reveals + the hero diagram trigger.
// Finite, one-way, and skipped entirely for reduced-motion users.
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');

  function showAll() {
    for (var i = 0; i < items.length; i++) items[i].classList.add('is-in');
  }

  if (reduced || !('IntersectionObserver' in window)) { showAll(); return; }

  // Sections reveal as they enter; the diagram waits until ~38% of it is visible.
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

  var ioViz = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); ioViz.unobserve(e.target); }
    });
  }, { threshold: 0.38 });

  items.forEach(function (el) {
    (el.classList.contains('viz-band') ? ioViz : io).observe(el);
  });

  // Give each connector its true length so the draw reads evenly.
  document.querySelectorAll('.viz .edge').forEach(function (line) {
    try { line.style.setProperty('--len', line.getTotalLength().toFixed(1)); } catch (e) {}
  });
})();
