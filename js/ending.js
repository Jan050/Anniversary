/* ==========================================================================
   PHASE 15 — ENDING
   Three messages in sequence; the last one stays and gets gentle
   sparkles, reusing the same .sparkle element/keyframe from Phase 5's
   bouquet finale rather than inventing a third sparkle implementation.
   ========================================================================== */

Site.init.ending = function () {
  var msg1 = document.getElementById('ending-msg-1');
  var msg2 = document.getElementById('ending-msg-2');
  var msg3 = document.getElementById('ending-msg-3');
  var sparkleContainer = document.getElementById('ending-sparkles');
  if (!msg1 || !msg2 || !msg3) return;

  var started = false;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  Site.onEnterViewport('#ending', start, { threshold: 0.5 });

  function start() {
    if (started) return;
    started = true;

    if (reducedMotion) {
      msg1.classList.add('is-visible');
      window.setTimeout(function () {
        msg1.classList.remove('is-visible');
        msg2.classList.add('is-visible');
      }, 1000);
      window.setTimeout(function () {
        msg2.classList.remove('is-visible');
        msg3.classList.add('is-visible');
      }, 2000);
      return;
    }

    window.setTimeout(function () { msg1.classList.add('is-visible'); }, 200);
    window.setTimeout(function () { msg1.classList.remove('is-visible'); }, 3000);
    window.setTimeout(function () { msg2.classList.add('is-visible'); }, 3600);
    window.setTimeout(function () { msg2.classList.remove('is-visible'); }, 6600);
    window.setTimeout(function () {
      msg3.classList.add('is-visible');
      spawnSparkles();
    }, 7200);
  }

  function spawnSparkles() {
    if (!sparkleContainer || reducedMotion) return;
    for (var i = 0; i < 8; i++) {
      var sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.round(15 + Math.random() * 70) + '%';
      sparkle.style.top = Math.round(15 + Math.random() * 70) + '%';
      sparkle.style.setProperty('--size', (6 + Math.random() * 8).toFixed(0) + 'px');
      sparkle.style.setProperty('--sparkle-duration', (2.2 + Math.random() * 2).toFixed(1) + 's');
      sparkle.style.setProperty('--sparkle-delay', (Math.random() * 3).toFixed(1) + 's');
      sparkleContainer.appendChild(sparkle);
    }
  }
};
