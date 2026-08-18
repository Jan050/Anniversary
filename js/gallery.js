/* ==========================================================================
   PHASE 7 — MEMORY GALLERY
   ✏️  EDIT THE BLOCK BELOW — add/remove/reorder photos here. `src` should
   point at a file in assets/images/; until a real photo is dropped in,
   the card shows a quiet placeholder pattern instead of a broken image.
   ========================================================================== */

var GALLERY_PHOTOS = [
  { src: 'assets/images/image1.jpg', },
  { src: 'assets/images/image2.jpg', },
  { src: 'assets/images/image3.jpg', },
  { src: 'assets/images/image4.jpg', },
  { src: 'assets/images/image5.jpg', },
  { src: 'assets/images/image6.jpg', }
];

/* ========================================================================== 
   Logic below.
   ========================================================================== */

Site.init.gallery = function () {
  var grid = document.getElementById('gallery-grid');
  var lightbox = document.getElementById('lightbox');
  if (!grid || !lightbox) return;

  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var lightboxPhotoWrap = document.querySelector('.lightbox-photo');
  var closeBtn = document.getElementById('lightbox-close');
  var prevBtn = document.getElementById('lightbox-prev');
  var nextBtn = document.getElementById('lightbox-next');

  lightboxImg.addEventListener('error', function () {
    lightboxImg.style.visibility = 'hidden';
    lightboxPhotoWrap.style.background =
      'repeating-linear-gradient(135deg, var(--color-ground-light) 0 10px, var(--color-ground-light-2) 10px 20px)';
  });
  lightboxImg.addEventListener('load', function () {
    lightboxImg.style.visibility = 'visible';
    lightboxPhotoWrap.style.background = 'var(--color-ground-light)';
  });

  var currentIndex = 0;
  var lastFocusedCard = null;

  renderCards();

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', function () { show(currentIndex - 1); });
  nextBtn.addEventListener('click', function () { show(currentIndex + 1); });
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox(); // click on backdrop
  });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') show(currentIndex - 1);
    if (e.key === 'ArrowRight') show(currentIndex + 1);
  });

  function renderCards() {
    GALLERY_PHOTOS.forEach(function (photo, index) {
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'polaroid';
      card.setAttribute('aria-label', 'View photo: ' + photo.caption);

      var photoWrap = document.createElement('div');
      photoWrap.className = 'polaroid-photo';

      var img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.caption;
      img.loading = 'lazy';
      img.addEventListener('load', function () { card.classList.add('has-photo'); });
      img.addEventListener('error', function () { card.classList.remove('has-photo'); });

      var placeholderIcon = document.createElement('div');
      placeholderIcon.className = 'placeholder-icon';
      placeholderIcon.innerHTML =
        '<svg viewBox="0 0 48 48"><rect x="4" y="10" width="40" height="30" rx="2"/>' +
        '<circle cx="24" cy="25" r="8"/><path d="M14,10 L18,4 L30,4 L34,10"/></svg>';

      var glass = document.createElement('div');
      glass.className = 'polaroid-glass';
      glass.innerHTML = '<span>View</span>';

      photoWrap.appendChild(img);
      photoWrap.appendChild(placeholderIcon);
      photoWrap.appendChild(glass);

      var caption = document.createElement('span');
      caption.className = 'polaroid-caption';
      caption.textContent = photo.caption;

      card.appendChild(photoWrap);
      card.appendChild(caption);

      card.addEventListener('click', function () {
        lastFocusedCard = card;
        openLightbox(index);
      });

      grid.appendChild(card);
    });
  }

  function openLightbox(index) {
    show(index);
    lightbox.classList.add('is-open');
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    if (lastFocusedCard) lastFocusedCard.focus();
  }

  function show(index) {
    currentIndex = (index + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
    var photo = GALLERY_PHOTOS[currentIndex];
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.caption;
    lightboxCaption.textContent = photo.caption;
  }
};
