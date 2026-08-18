/* ==========================================================================
   PHASE 11 — SECRET EASTER EGG
   ✏️  EDIT THE LINE BELOW — this is the private message revealed when
   the hidden heart (bottom-right of the Reasons section) is clicked.
   ========================================================================== */

var SECRET_MESSAGE = '[Write something just for the two of you \u2014 an inside joke, a promise, a thing you\u2019ve never said out loud.]';

/* ========================================================================== 
   Logic below.
   ========================================================================== */

Site.init.easterEgg = function () {
  var heart = document.getElementById('secret-heart');
  var modal = document.getElementById('secret-modal');
  var closeBtn = document.getElementById('secret-modal-close');
  var messageEl = document.getElementById('secret-modal-message');
  if (!heart || !modal || !closeBtn || !messageEl) return;

  messageEl.textContent = SECRET_MESSAGE;

  heart.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal(); // backdrop click
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  function openModal() {
    modal.classList.add('is-open');
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    heart.focus();
  }
};
