/* ==========================================================================
   PHASE 6 — CELEBRATION LOGIC
   Message one fades in, holds, fades out; message two fades in and
   stays; the "Our Memories" button appears last. Triggered purely by
   scrolling into view — not by the bouquet's completion event, since
   the memories globe now sits between the bouquet and this section, so
   "bouquet finished" no longer means "this section is on screen."
   ========================================================================== */

Site.init.celebration = function () {
  var msg1 = document.getElementById('celebration-msg-1');
  var msg2 = document.getElementById('celebration-msg-2');
  var continueBtn = document.getElementById('open-memories-btn');
  if (!msg1 || !msg2 || !continueBtn) return;

  var started = false;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  Site.onEnterViewport('#celebration', start, { threshold: 0.5 });

  function start() {
    if (started) return;
    started = true;

    if (reducedMotion) {
      msg1.classList.add('is-visible');
      window.setTimeout(function () {
        msg1.classList.remove('is-visible');
        msg2.classList.add('is-visible');
        continueBtn.classList.add('is-visible');
      }, 1200);
      return;
    }

    window.setTimeout(function () { msg1.classList.add('is-visible'); }, 200);
    window.setTimeout(function () { msg1.classList.remove('is-visible'); }, 2800);
    window.setTimeout(function () { msg2.classList.add('is-visible'); }, 3400);
    window.setTimeout(function () { continueBtn.classList.add('is-visible'); }, 5600);
  }

  continueBtn.addEventListener('click', function () {
    document.dispatchEvent(new CustomEvent('celebration:continue'));
    var gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  });
};
