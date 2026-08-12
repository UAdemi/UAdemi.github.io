// Scroll reveals. Finite, one-way, and skipped entirely for reduced-motion users.
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    for (var i = 0; i < items.length; i++) items[i].classList.add('is-in');
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target); // reveal once, never re-trigger
      }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

  items.forEach(function (el) { io.observe(el); });

  // Give each SVG edge its own true length so the draw reads evenly.
  document.querySelectorAll('.viz .edge').forEach(function (line) {
    try {
      var len = line.getTotalLength();
      line.style.setProperty('--len', len.toFixed(1));
    } catch (e) { /* non-fatal: falls back to the CSS default */ }
  });
})();
