/* ==========================================================================
   PHASE 2 — LOADING SCREEN LOGIC
   Spawns randomized soft particles, then fades the overlay out after the
   rose has finished blooming (or immediately, if reduced motion).
   ========================================================================== */

Site.init.loadingScreen = function () {
  var overlay = document.getElementById('loading-screen');
  if (!overlay) return;

  var particleContainer = overlay.querySelector('.loading-particles');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (particleContainer && !prefersReducedMotion) {
    spawnParticles(particleContainer, 14);
  }

  // Total scene length: bloom stagger (last delay ~1050ms) + bloom
  // duration (--dur-bloom) + a short hold so the finished rose is
  // actually seen before it disappears.
  var bloomDurationMs = getCssDurationMs('--dur-bloom') || 2200;
  var holdMs = prefersReducedMotion ? 400 : 900;
  var totalMs = prefersReducedMotion ? holdMs : (1050 + bloomDurationMs + holdMs);

  window.setTimeout(function () {
    overlay.classList.add('is-hidden');
    overlay.setAttribute('aria-hidden', 'true');
    // Fully remove from layout after the CSS fade-out transition ends,
    // so it can't block clicks/scroll on the landing scene beneath it.
    var fadeMs = getCssDurationMs('--dur-slow') || 1400;
    window.setTimeout(function () {
      overlay.style.display = 'none';
    }, fadeMs);
  }, totalMs);

  function spawnParticles(container, count) {
    for (var i = 0; i < count; i++) {
      var particle = document.createElement('span');
      particle.className = 'loading-particle';
      particle.style.left = Math.round(Math.random() * 100) + '%';
      particle.style.setProperty('--size', (2 + Math.random() * 3).toFixed(1) + 'px');
      particle.style.setProperty('--drift-duration', (5 + Math.random() * 4).toFixed(1) + 's');
      particle.style.setProperty('--drift-delay', (Math.random() * 3).toFixed(1) + 's');
      particle.style.setProperty('--drift-x', (Math.random() * 40 - 20).toFixed(0) + 'px');
      container.appendChild(particle);
    }
  }

  function getCssDurationMs(varName) {
    var raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    if (raw.endsWith('ms')) return parseFloat(raw);
    if (raw.endsWith('s')) return parseFloat(raw) * 1000;
    return null;
  }
};
