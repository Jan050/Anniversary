/* ==========================================================================
   PHASE 5 — BOUQUET LOGIC
   Most of the bloom sequence (stems → leaves → roses → tulips → daisies
   → ribbon) runs on pure CSS via animation-delay once .is-blooming is
   added (see bouquet.css). This file handles the parts CSS can't do
   alone: generating the baby's breath / cherry blossom dots, spawning
   sparkles + glow particles + confetti at the right moments, and the
   camera zoom finale.
   ========================================================================== */

Site.init.bouquet = function () {
  var stage = document.getElementById('bouquet-stage');
  var continueBtn = document.getElementById('bouquet-continue-btn');
  if (!stage) return;

  var started = false;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('letter:continue', start);
  Site.onEnterViewport('#bouquet', start, { threshold: 0.25 });

  if (continueBtn) {
    continueBtn.addEventListener('click', function () {
      var globeSection = document.getElementById('memories-globe');
      if (globeSection) {
        globeSection.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  }

  function start() {
    if (started) return;
    started = true;

    fillBabysBreath();
    fillCherryBlossom();

    stage.classList.add('is-blooming');

    if (reducedMotion) {
      stage.classList.add('is-zoomed');
      document.dispatchEvent(new CustomEvent('bouquet:complete'));
      if (continueBtn) continueBtn.classList.add('is-visible');
      return; // skip sparkles/glow/confetti — decorative extras only
    }

    window.setTimeout(spawnSparkles, 6500);
    window.setTimeout(spawnGlowParticles, 7000);
    window.setTimeout(function () { stage.classList.add('is-zoomed'); }, 8300);
    window.setTimeout(spawnConfetti, 9000);
    window.setTimeout(spawnFloatingPetals, 9000);
    window.setTimeout(function () {
      document.dispatchEvent(new CustomEvent('bouquet:complete'));
      if (continueBtn) continueBtn.classList.add('is-visible');
    }, 9300);
  }

  /* Small dot clusters on thin branching twigs, filler texture around
     the main flowers. Positions are local to each <g>'s own transform
     (already translated to the cluster center in the markup). */
  function fillBabysBreath() {
    var clusters = [
      { id: 'babys-breath-1', delayBase: 4200 },
      { id: 'babys-breath-2', delayBase: 4350 },
      { id: 'babys-breath-3', delayBase: 4500 }
    ];
    var offsets = [[-10, -8], [8, -14], [0, 10], [-14, 6], [12, 4]];

    clusters.forEach(function (cluster) {
      var g = document.getElementById(cluster.id);
      if (!g) return;
      offsets.forEach(function (offset, i) {
        var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', offset[0]);
        dot.setAttribute('cy', offset[1]);
        dot.setAttribute('r', 2.6);
        dot.setAttribute('class', 'bud-pop bb-dot');
        dot.style.animationDelay = (cluster.delayBase + i * 70) + 'ms';
        g.appendChild(dot);
      });
    });
  }

  /* Three small 5-petal blossoms (each a ring of tiny circles + a brass
     center dot) plus two loose petals drifting near the sprig. */
  function fillCherryBlossom() {
    var g = document.getElementById('cherry-blossom');
    if (!g) return;

    var blossomCenters = [[-15, -12], [0, -22], [16, -10]];
    var petalAngles = [0, 72, 144, 216, 288];

    blossomCenters.forEach(function (center, bi) {
      petalAngles.forEach(function (angle, pi) {
        var rad = (angle * Math.PI) / 180;
        var px = center[0] + Math.cos(rad) * 5;
        var py = center[1] + Math.sin(rad) * 5;
        var petal = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        petal.setAttribute('cx', px);
        petal.setAttribute('cy', py);
        petal.setAttribute('r', 3.2);
        petal.setAttribute('class', 'bud-pop blossom-petal');
        petal.style.animationDelay = (5900 + bi * 150 + pi * 25) + 'ms';
        g.appendChild(petal);
      });
      var center_dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      center_dot.setAttribute('cx', center[0]);
      center_dot.setAttribute('cy', center[1]);
      center_dot.setAttribute('r', 1.6);
      center_dot.setAttribute('class', 'bud-pop blossom-center');
      center_dot.style.animationDelay = (6100 + bi * 150) + 'ms';
      g.appendChild(center_dot);
    });
  }

  function spawnSparkles() {
    var container = document.getElementById('bouquet-particles');
    if (!container) return;
    for (var i = 0; i < 10; i++) {
      var sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.round(10 + Math.random() * 80) + '%';
      sparkle.style.top = Math.round(5 + Math.random() * 60) + '%';
      sparkle.style.setProperty('--size', (6 + Math.random() * 8).toFixed(0) + 'px');
      sparkle.style.setProperty('--sparkle-duration', (2 + Math.random() * 2).toFixed(1) + 's');
      sparkle.style.setProperty('--sparkle-delay', (Math.random() * 3).toFixed(1) + 's');
      container.appendChild(sparkle);
    }
  }

  /* Reuses the .firefly look established in the Phase 3 landing scene —
     the "soft glowing particles" step is the same visual motif, now
     circling the finished bouquet instead of drifting across the sky. */
  function spawnGlowParticles() {
    var container = document.getElementById('bouquet-particles');
    if (!container) return;
    for (var i = 0; i < 6; i++) {
      var fly = document.createElement('span');
      fly.className = 'firefly';
      var size = (3 + Math.random() * 2).toFixed(1) + 'px';
      fly.style.left = Math.round(15 + Math.random() * 70) + '%';
      fly.style.top = Math.round(10 + Math.random() * 70) + '%';
      fly.style.width = size;
      fly.style.height = size;
      fly.style.setProperty('--firefly-duration', (7 + Math.random() * 5).toFixed(1) + 's');
      fly.style.setProperty('--firefly-delay', (Math.random() * 3).toFixed(1) + 's');
      fly.style.setProperty('--firefly-x', (Math.random() * 60 - 30).toFixed(0) + 'px');
      fly.style.setProperty('--firefly-y', (Math.random() * -50).toFixed(0) + 'px');
      fly.style.setProperty('--firefly-x2', (Math.random() * 60 - 30).toFixed(0) + 'px');
      fly.style.setProperty('--firefly-y2', (Math.random() * -80 - 10).toFixed(0) + 'px');
      container.appendChild(fly);
    }
  }

  var confettiColors = ['var(--color-accent-brass-soft)', 'var(--color-accent-blush)', 'var(--color-accent-moss)', 'var(--color-white)'];

  function spawnConfetti() {
    var container = document.getElementById('bouquet-particles');
    if (!container) return;
    for (var i = 0; i < 22; i++) {
      var piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.style.left = Math.round(Math.random() * 100) + '%';
      piece.style.background = confettiColors[i % confettiColors.length];
      piece.style.setProperty('--confetti-duration', (2.6 + Math.random() * 1.4).toFixed(1) + 's');
      piece.style.setProperty('--confetti-delay', (Math.random() * 0.6).toFixed(2) + 's');
      piece.style.setProperty('--confetti-spin', Math.round(180 + Math.random() * 360) + 'deg');
      container.appendChild(piece);
    }
    // Confetti is a one-time burst — clean it up after it's done falling
    // rather than leaving hundreds of finished nodes in the DOM.
    window.setTimeout(function () {
      container.querySelectorAll('.confetti-piece').forEach(function (el) { el.remove(); });
    }, 4500);
  }

  /* Gentle continuous drift, reusing the same .drift-petal motif from
     the Phase 3 landing scene so it feels like the same world. */
  function spawnFloatingPetals() {
    var container = document.getElementById('bouquet-particles');
    if (!container) return;
    for (var i = 0; i < 5; i++) {
      var petal = document.createElement('span');
      petal.className = 'drift-petal';
      petal.style.left = Math.round(Math.random() * 100) + '%';
      petal.style.setProperty('--petal-duration', (10 + Math.random() * 8).toFixed(1) + 's');
      petal.style.setProperty('--petal-delay', (Math.random() * 6).toFixed(1) + 's');
      petal.style.setProperty('--petal-x', (Math.random() * 100 - 50).toFixed(0) + 'px');
      container.appendChild(petal);
    }
  }
};
