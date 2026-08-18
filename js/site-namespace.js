/* ==========================================================================
   SITE NAMESPACE — loaded first. Every phase attaches its init function
   here (Site.init.loadingScreen = fn) instead of declaring globals, and
   main.js calls them in order once the DOM is ready.
   ========================================================================== */

var Site = {
  init: {},

  /* Shared utility: IntersectionObserver-based scroll reveal, used by
     several later phases (timeline, gallery, reasons cards) instead of
     each phase reinventing scroll-listening. */
  onEnterViewport: function (selector, callback, options) {
    options = options || { threshold: 0.3 };
    var els = document.querySelectorAll(selector);
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, options);
    els.forEach(function (el) { observer.observe(el); });
  }
};
