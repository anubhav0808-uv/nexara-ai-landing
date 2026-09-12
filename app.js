// ---- scroll reveal ----
    (function () {
      var els = document.querySelectorAll('.reveal');
      if (!('IntersectionObserver' in window)) {
        els.forEach(function (el) { el.classList.add('visible'); });
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      els.forEach(function (el) { io.observe(el); });
    })();

    // ---- count-up stats ----
    (function () {
      var nums = document.querySelectorAll('[data-count]');
      if (!nums.length) return;
      var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      function render(el, val, dec) {
        el.textContent = dec ? val.toFixed(dec) : Math.round(val).toLocaleString('en-IN');
      }
      function animate(el) {
        var target = parseFloat(el.getAttribute('data-count'));
        var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
        if (reduced) { render(el, target, dec); return; }
        var t0 = null, dur = 1400;
        function tick(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          render(el, target * eased, dec);
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
      if (!('IntersectionObserver' in window)) {
        nums.forEach(function (el) { animate(el); });
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
        });
      }, { threshold: 0.6 });
      nums.forEach(function (el) { io.observe(el); });
    })();