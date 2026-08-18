/* ==========================================================================
   PHASE 4 — LOVE LETTER
   ✏️  EDIT THE BLOCK BELOW — this is the only part of this file you
   should need to touch. Everything under LETTER_CONTENT is what actually
   appears on the site.
   ========================================================================== */

var LETTER_CONTENT = {

  date: 'August 19 — Happy Anniversary',

  body:
    'My dearest Julia Morales,\n\n' +

    'Happy anniversary, my love. ❤️\n\n' +

    'When I think about us, I’m always reminded of the little moments that became special memories. From spending the night together at the beach, enjoying the quiet moments and simply being with each other, to traveling together and making memories at Dahilayan Forest Park, I’m grateful for every experience we’ve shared.\n\n' +

    'Of course, we’re not perfect. We fight sometimes, we misunderstand each other, and there are moments when things don’t go the way we want them to. But even through those difficult moments, I’m still thankful that we have each other. What matters to me is that we keep choosing to understand, forgive, and stay together.\n\n' +

    'It’s not just the places we’ve been to that make those memories special. It’s because I was there with you. Even the simplest moments feel different when I’m with you, and those are the moments I want to keep close to my heart.\n\n' +

    'Thank you for being part of my life, for all the laughs, the memories, the adventures, and even the difficult days that helped us understand each other better. I may not always be the best at putting my feelings into words, but I hope you know how much you mean to me.\n\n' +

    'If I could go back and choose again, I would still choose you. And if we get the chance to make a thousand more memories together, I’d want every one of them to be with you.\n\n' +

    'Happy anniversary, Julia. Here’s to more adventures, more late nights, more places to discover, more arguments we’ll eventually laugh about, and most importantly, more years of choosing each other.\n\n' +

    'Forever yours,',

  signature: 'Ed'

};



/* ========================================================================== 
   Logic below — shouldn't need edits unless you're changing behavior.
   ========================================================================== */

Site.init.loveLetter = function () {
  var dateEl = document.getElementById('letter-date');
  var bodyEl = document.getElementById('letter-body');
  var bodySrEl = document.getElementById('letter-body-sr');
  var signatureEl = document.getElementById('letter-signature');
  var continueBtn = document.getElementById('open-bouquet-btn');
  if (!bodyEl) return;

  var started = false;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('envelope:opened', start);
  // Fallback: if someone lands on/scrolls to the letter directly (deep
  // link, or the envelope was skipped some other way), still trigger it.
  Site.onEnterViewport('#letter', start, { threshold: 0.4 });

  function start() {
    if (started) return;
    started = true;

    dateEl.textContent = LETTER_CONTENT.date;
    bodySrEl.textContent = LETTER_CONTENT.body;

    if (reducedMotion) {
      bodyEl.textContent = LETTER_CONTENT.body;
      revealSignatureAndButton();
      return;
    }

    typeText(bodyEl, LETTER_CONTENT.body, revealSignatureAndButton);
  }

  function revealSignatureAndButton() {
    signatureEl.textContent = LETTER_CONTENT.signature;
    window.setTimeout(function () {
      signatureEl.classList.add('is-visible');
    }, 150);
    window.setTimeout(function () {
      continueBtn.classList.add('is-visible');
    }, 700);
  }

  continueBtn.addEventListener('click', function () {
    document.dispatchEvent(new CustomEvent('letter:continue'));
    var bouquetSection = document.getElementById('bouquet');
    if (bouquetSection) {
      bouquetSection.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  });

  /**
   * Reveals `text` into `el` one character at a time. Pace varies
   * slightly by character (pauses a beat longer after punctuation) so it
   * reads like someone actually writing rather than a fixed-rate ticker.
   */
  function typeText(el, text, onDone) {
    var i = 0;
    var cursor = document.createElement('span');
    cursor.className = 'typing-cursor';

    (function step() {
      el.textContent = text.slice(0, i);
      el.appendChild(cursor);

      if (i >= text.length) {
        cursor.remove();
        if (onDone) onDone();
        return;
      }

      var ch = text[i];
      i++;

      var delay = 28 + Math.random() * 22;
      if (ch === '.' || ch === '\u2026') delay = 420;
      else if (ch === ',') delay = 200;
      else if (ch === '\n') delay = 380;

      window.setTimeout(step, delay);
    })();
  }
};
