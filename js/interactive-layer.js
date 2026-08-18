/* ==========================================================================
   PHASE 10 — INTERACTIVE FEATURES
   Runs once for the whole page (not re-triggered per section). Skips
   entirely under prefers-reduced-motion — see interactive-layer.css,
   which also hides the layer outright in that case, so the JS below
   would just be spawning invisible elements; better not to run it.
   ========================================================================== */

Site.init.ambientParticles = function () {
  var layer = document.getElementById('interactive-layer');
  if (!layer) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  startFloatingHearts();
  startButterflies();

  var isCoarsePointer = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (!isCoarsePointer) {
    startMouseTrail();
  }

  startClickRipple();

  /* ---- Floating hearts: rise from the bottom, click to burst -------- */
  function startFloatingHearts() {
    var maxConcurrent = 6;
    var active = 0;

    spawnHeart();
    var interval = window.setInterval(function () {
      if (active < maxConcurrent) spawnHeart();
    }, 3200);

    // Don't run this forever in a background tab — the site is a
    // one-sitting experience, not a persistent widget.
    window.setTimeout(function () { window.clearInterval(interval); }, 10 * 60 * 1000);

    function spawnHeart() {
      active++;
      var heart = document.createElement('span');
      heart.className = 'float-heart';
      heart.textContent = Math.random() > 0.5 ? '\u2764\uFE0F' : '\uD83E\uDD0D'; // heart / white heart, alternating
      heart.setAttribute('role', 'button');
      heart.setAttribute('aria-label', 'A little heart — tap it');
      heart.style.left = Math.round(10 + Math.random() * 80) + '%';
      heart.style.setProperty('--size', (16 + Math.random() * 10).toFixed(0) + 'px');
      heart.style.setProperty('--rise-duration', (9 + Math.random() * 5).toFixed(1) + 's');
      heart.style.setProperty('--sway', (Math.random() * 40 - 20).toFixed(0) + 'px');

      var removed = false;
      function cleanup() {
        if (removed) return;
        removed = true;
        active--;
        if (heart.parentNode) heart.remove();
      }

      heart.addEventListener('animationend', cleanup);
      heart.addEventListener('click', function (e) {
        burstHeart(heart, e.clientX, e.clientY);
        cleanup();
      });

      layer.appendChild(heart);
    }

    function burstHeart(heart, clientX, clientY) {
      var pieceCount = 8;
      for (var i = 0; i < pieceCount; i++) {
        var piece = document.createElement('span');
        piece.className = 'heart-burst-piece';
        piece.style.left = clientX + 'px';
        piece.style.top = clientY + 'px';
        var angle = (i / pieceCount) * Math.PI * 2;
        piece.style.setProperty('--burst-x', (Math.cos(angle) * 26).toFixed(0) + 'px');
        piece.style.setProperty('--burst-y', (Math.sin(angle) * 26).toFixed(0) + 'px');
        layer.appendChild(piece);
        piece.addEventListener('animationend', function () { this.remove(); });
      }
    }
  }

  /* ---- Flower mouse trail: throttled via a minimum spawn interval --- */
  function startMouseTrail() {
    var lastSpawn = 0;
    var minIntervalMs = 70;

    window.addEventListener('pointermove', function (e) {
      var now = performance.now();
      if (now - lastSpawn < minIntervalMs) return;
      lastSpawn = now;

      var flower = document.createElement('span');
      flower.className = 'mouse-flower';
      flower.style.left = e.clientX + 'px';
      flower.style.top = e.clientY + 'px';
      layer.appendChild(flower);
      flower.addEventListener('animationend', function () { this.remove(); });
    });
  }

  /* ---- Butterflies: a couple of persistent looping fliers ----------- */
  function startButterflies() {
    var configs = [
      { top: '20%', duration: '17s', delay: '0s' },
      { top: '55%', duration: '20s', delay: '4s' }
    ];
    configs.forEach(function (config) {
      var butterfly = document.createElement('div');
      butterfly.className = 'butterfly';
      butterfly.style.top = config.top;
      butterfly.style.setProperty('--flight-duration', config.duration);
      butterfly.style.setProperty('--flight-delay', config.delay);
      butterfly.innerHTML =
        '<span class="butterfly-wing left"></span><span class="butterfly-wing right"></span>';
      layer.appendChild(butterfly);
    });
  }

  /* ---- Click ripple: skip clicks on real interactive elements so it
     doesn't visually compete with a button's own hover/press feedback */
  function startClickRipple() {
    document.addEventListener('click', function (e) {
      var interactive = e.target.closest(
        'button, a, input, textarea, select, .envelope, .polaroid, .float-heart'
      );
      if (interactive) return;

      var ripple = document.createElement('span');
      ripple.className = 'click-ripple';
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      layer.appendChild(ripple);
      ripple.addEventListener('animationend', function () { this.remove(); });
    });
  }
};
