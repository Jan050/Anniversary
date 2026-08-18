/* ==========================================================================
   PHASE 3 — ENVELOPE
   Click or Enter/Space opens the envelope. The same user gesture starts
   the ambient music (browsers block unmuted autoplay without one — this
   is also just better manners than forcing sound on someone). Once the
   open animation finishes, dispatches "envelope:opened" for Phase 4 (the
   love letter) to hook into, and scrolls the letter section into view.
   ========================================================================== */

Site.init.envelope = function () {
  var envelope = document.getElementById('envelope');
  if (!envelope) return;

  var opened = false;

  envelope.addEventListener('click', openEnvelope);
  envelope.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });

  function openEnvelope() {
    if (opened) return;
    opened = true;

    envelope.classList.add('is-open');
    envelope.setAttribute('aria-expanded', 'true');
    envelope.setAttribute('tabindex', '-1'); // already open, no longer an actionable button

    playAmbientMusic();

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var openAnimationMs = reducedMotion ? 0 : 1200;

    window.setTimeout(function () {
      document.dispatchEvent(new CustomEvent('envelope:opened'));
      var letterSection = document.getElementById('letter');
      if (letterSection) {
        letterSection.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    }, openAnimationMs);
  }

  function playAmbientMusic() {
    var audio = document.getElementById('ambient-music');
    if (!audio) return;
    // Placeholder source may 404 until a real track is added — fail silently
    // rather than surfacing a console error to the visitor.
    audio.volume = 0.35;
    var playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(function () { /* no-op: no track yet, or blocked */ });
    }
  }
};
