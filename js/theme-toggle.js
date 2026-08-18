/* ==========================================================================
   PHASE 14 — THEME TOGGLE LOGIC
   The <html> element may already have data-theme="light" set by the tiny
   inline script in <head> (see index.html) if that was the saved
   preference — this just wires up the button to match and toggle it.
   ========================================================================== */

Site.init.themeToggle = function () {
  var button = document.getElementById('theme-toggle');
  var thumb = button ? button.querySelector('.theme-toggle-thumb') : null;
  if (!button || !thumb) return;

  var root = document.documentElement;
  syncButton(root.getAttribute('data-theme') === 'light');

  button.addEventListener('click', function () {
    var isLight = root.getAttribute('data-theme') === 'light';
    var next = isLight ? 'dark' : 'light';

    if (next === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }

    syncButton(next === 'light');

    try {
      localStorage.setItem('site-theme', next);
    } catch (e) { /* localStorage unavailable — theme just won't persist */ }
  });

  function syncButton(isLight) {
    button.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    button.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    thumb.textContent = isLight ? '\u2600\uFE0F' : '\u263D'; // sun / crescent moon
  }
};
