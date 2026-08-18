/* ==========================================================================
   PHASE 13 — MUSIC PLAYER
   ✏️  EDIT SONG_TITLE below once you've swapped in a real track (and
   updated the <source src> on #ambient-music in index.html).
   ========================================================================== */

var SONG_TITLE = '[Song Title] \u2014 [Artist]';

/* ========================================================================== 
   Logic below. Listens to the audio element's own play/pause/timeupdate
   events rather than only reacting to its own button — so it stays in
   sync even though Phase 3's envelope also calls audio.play() directly.
   ========================================================================== */

Site.init.musicPlayer = function () {
  var audio = document.getElementById('ambient-music');
  var player = document.getElementById('music-player');
  var playToggle = document.getElementById('music-play-toggle');
  var playIcon = document.getElementById('music-play-icon');
  var titleEl = document.getElementById('music-title');
  var seek = document.getElementById('music-seek');
  var volume = document.getElementById('music-volume');
  if (!audio || !player || !playToggle) return;

  titleEl.textContent = SONG_TITLE;
  audio.volume = parseFloat(volume.value);

  playToggle.addEventListener('click', function () {
    if (audio.paused) {
      var playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () { /* no track yet, or blocked — no-op */ });
      }
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', function () {
    player.classList.add('is-playing');
    playIcon.textContent = '\u23F8'; // pause glyph
    playToggle.setAttribute('aria-label', 'Pause music');
  });
  audio.addEventListener('pause', function () {
    player.classList.remove('is-playing');
    playIcon.textContent = '\u25B6'; // play glyph
    playToggle.setAttribute('aria-label', 'Play music');
  });

  audio.addEventListener('loadedmetadata', function () {
    if (isFinite(audio.duration) && audio.duration > 0) {
      seek.max = String(audio.duration);
      seek.disabled = false;
    }
  });
  audio.addEventListener('timeupdate', function () {
    if (!seek.disabled) seek.value = String(audio.currentTime);
  });
  seek.addEventListener('input', function () {
    audio.currentTime = parseFloat(seek.value);
  });

  volume.addEventListener('input', function () {
    audio.volume = parseFloat(volume.value);
  });
};
