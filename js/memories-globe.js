/* ==========================================================================
   PHASE 5 (replaced) — MEMORIES GLOBE
   ✏️  EDIT THE LIST BELOW — add as many photos as you want (there's no
   limit; more photos = a fuller-looking globe). Each needs a `src`
   pointing at a file in assets/images/. Until a photo is added, that
   spot shows a quiet placeholder pattern instead of a broken image.
   ========================================================================== */

var GLOBE_PHOTOS = [
  { src: 'assets/images/memory1.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory2.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory3.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory4.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory5.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory6.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory7.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory8.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory9.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory10.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory11.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory12.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory13.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory14.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory15.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory16.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory17.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory18.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory19.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory20.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory21.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory22.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory23.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory24.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory25.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory26.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory27.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory28.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory29.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory30.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory31.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory32.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory33.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory34.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory35.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory36.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory37.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory38.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory39.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory40.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory41.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory42.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory43.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory44.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory45.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory46.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory47.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory48.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory49.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory50.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory51.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory52.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory53.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory54.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory55.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory56.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory57.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory58.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory59.jpg', alt: '[A memory]' },
  { src: 'assets/images/memory60.jpg', alt: '[A memory]' }
];

/* ========================================================================== 
   Logic below.
   ========================================================================== */

Site.init.memoriesGlobe = function () {
  var stage = document.getElementById('globe-stage');
  var globe = document.getElementById('globe');
  var continueBtn = document.getElementById('globe-continue-btn');
  if (!stage || !globe) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var started = false;

  // Two triggers: the moment the bouquet finishes (deterministic — fires
  // once the "Open My Bouquet" click-chain completes, regardless of
  // scroll position) and a scroll-into-view fallback for anyone who
  // reaches this section some other way.
  document.addEventListener('bouquet:complete', start);
  Site.onEnterViewport('#memories-globe', start, { threshold: 0.25 });

  if (continueBtn) {
    continueBtn.addEventListener('click', function () {
      var celebrationSection = document.getElementById('celebration');
      if (celebrationSection) {
        celebrationSection.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  }

  function start() {
    if (started) return;
    started = true;
    buildGlobe();
    if (continueBtn) {
      window.setTimeout(function () { continueBtn.classList.add('is-visible'); }, reducedMotion ? 0 : 1200);
    }
  }

  function buildGlobe() {
    var radius = Math.min(stage.clientWidth, stage.clientHeight) * 0.42;
    var count = GLOBE_PHOTOS.length;
    var goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Fibonacci-sphere constant

    // More photos need to be smaller to avoid overlapping on the sphere.
    // (Sized down slightly from the previous pass — bigger circles mean
    // more upscaling of whatever resolution the source photo actually is,
    // and upscaling is what causes the blurry/blocky look.)
    var photoSize = count <= 18 ? 78 : count <= 30 ? 66 : count <= 45 ? 56 : 48;

    GLOBE_PHOTOS.forEach(function (photo, i) {
      // Evenly distribute points on a sphere — no clustering at the poles.
      var yPos = 1 - (i / (count - 1)) * 2; // 1 down to -1
      var radiusAtY = Math.sqrt(1 - yPos * yPos);
      var theta = goldenAngle * i;
      var x = Math.cos(theta) * radiusAtY;
      var z = Math.sin(theta) * radiusAtY;

      // Convert the (x, y, z) point directly into rotation angles, so each
      // photo sits tangent to the sphere surface, facing outward.
      var longitude = Math.atan2(x, z) * (180 / Math.PI);
      var latitude = Math.asin(yPos) * (180 / Math.PI);

      var item = document.createElement('div');
      item.className = 'globe-photo';
      item.style.setProperty('--photo-size', photoSize + 'px');
      item.style.transform =
        'rotateY(' + longitude.toFixed(2) + 'deg) rotateX(' + (-latitude).toFixed(2) + 'deg) translateZ(' + radius.toFixed(1) + 'px)';

      var img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.alt || '';
      img.loading = 'lazy';
      img.addEventListener('error', function () { img.style.display = 'none'; });
      item.appendChild(img);

      globe.appendChild(item);
    });

    if (reducedMotion) {
      globe.style.transform = 'rotateX(-10deg) rotateY(-15deg)';
    } else {
      startRotation();
    }
  }

  /* ---- Auto-rotation + drag-to-spin, both driven by one rAF loop so
     they never fight each other for control of the transform. --------- */
  function startRotation() {
    var rotY = -15;
    var rotX = -10;
    var autoSpeed = 0.045; // degrees per frame, paused while dragging
    var dragging = false;
    var lastX = 0;
    var lastY = 0;

    applyTransform();
    requestAnimationFrame(loop);

    stage.addEventListener('pointerdown', function (e) {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      stage.classList.add('is-dragging');
      stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      rotY += (e.clientX - lastX) * 0.35;
      rotX -= (e.clientY - lastY) * 0.35;
      rotX = Math.max(-80, Math.min(80, rotX)); // don't flip past the poles
      lastX = e.clientX;
      lastY = e.clientY;
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (evt) {
      stage.addEventListener(evt, function () {
        dragging = false;
        stage.classList.remove('is-dragging');
      });
    });

    function loop() {
      if (!dragging) rotY += autoSpeed;
      applyTransform();
      requestAnimationFrame(loop);
    }

    function applyTransform() {
      globe.style.transform = 'rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg)';
    }
  }
};
