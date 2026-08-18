/* ==========================================================================
   PHASE 3 — LANDING AMBIENT SCENE
   Populates the stars / fireflies / drifting petals behind the envelope.
   Skips entirely under prefers-reduced-motion (a static dark scene reads
   fine without it — no need to render inert elements).
   ========================================================================== */

Site.init.landingScene = function () {
  var container = document.querySelector('#landing .landing-ambient');
  if (!container) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  spawnStars(container, 40);
  spawnFireflies(container, 8);
  spawnPetals(container, 10);

  function spawnStars(root, count) {
    for (var i = 0; i < count; i++) {
      var star = document.createElement('span');
      star.className = 'star';
      var size = (1 + Math.random() * 1.8).toFixed(1) + 'px';
      star.style.left = Math.round(Math.random() * 100) + '%';
      star.style.top = Math.round(Math.random() * 60) + '%'; // upper region, above the envelope
      star.style.width = size;
      star.style.height = size;
      star.style.setProperty('--twinkle-duration', (3 + Math.random() * 3).toFixed(1) + 's');
      star.style.setProperty('--twinkle-delay', (Math.random() * 4).toFixed(1) + 's');
      star.style.setProperty('--twinkle-peak', (0.4 + Math.random() * 0.5).toFixed(2));
      root.appendChild(star);
    }
  }

  function spawnFireflies(root, count) {
    for (var i = 0; i < count; i++) {
      var fly = document.createElement('span');
      fly.className = 'firefly';
      var size = (3 + Math.random() * 2).toFixed(1) + 'px';
      fly.style.left = Math.round(10 + Math.random() * 80) + '%';
      fly.style.top = Math.round(20 + Math.random() * 60) + '%';
      fly.style.width = size;
      fly.style.height = size;
      fly.style.setProperty('--firefly-duration', (8 + Math.random() * 6).toFixed(1) + 's');
      fly.style.setProperty('--firefly-delay', (Math.random() * 5).toFixed(1) + 's');
      fly.style.setProperty('--firefly-x', (Math.random() * 80 - 40).toFixed(0) + 'px');
      fly.style.setProperty('--firefly-y', (Math.random() * -60).toFixed(0) + 'px');
      fly.style.setProperty('--firefly-x2', (Math.random() * 80 - 40).toFixed(0) + 'px');
      fly.style.setProperty('--firefly-y2', (Math.random() * -100 - 20).toFixed(0) + 'px');
      root.appendChild(fly);
    }
  }

  function spawnPetals(root, count) {
    for (var i = 0; i < count; i++) {
      var petal = document.createElement('span');
      petal.className = 'drift-petal';
      petal.style.left = Math.round(Math.random() * 100) + '%';
      petal.style.setProperty('--petal-duration', (9 + Math.random() * 8).toFixed(1) + 's');
      petal.style.setProperty('--petal-delay', (Math.random() * 10).toFixed(1) + 's');
      petal.style.setProperty('--petal-x', (Math.random() * 120 - 60).toFixed(0) + 'px');
      root.appendChild(petal);
    }
  }
};
