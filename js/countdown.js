/* ==========================================================================
   PHASE 12 — COUNTDOWN
   ✏️  EDIT THE BLOCK BELOW — set month/day to your actual anniversary.
   The countdown always targets the NEXT occurrence of that date (this
   year if it hasn't happened yet, otherwise next year), so you don't
   need to update the year yourself each January.
   ========================================================================== */

var ANNIVERSARY_MONTH_DAY = {
  month: 8,  // 1 = January ... 12 = December — EDIT ME
  day: 19     // EDIT ME
};

/* ========================================================================== 
   Logic below.
   ========================================================================== */

Site.init.countdown = function () {
  var daysEl = document.getElementById('countdown-days');
  var hoursEl = document.getElementById('countdown-hours');
  var minutesEl = document.getElementById('countdown-minutes');
  var secondsEl = document.getElementById('countdown-seconds');
  var targetLabelEl = document.getElementById('countdown-target');
  var gridEl = document.getElementById('countdown-grid');
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  var target = getNextAnniversary();
  targetLabelEl.textContent = 'Until ' + target.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });

  tick();
  var interval = window.setInterval(tick, 1000);

  function getNextAnniversary() {
    var now = new Date();
    var candidate = new Date(now.getFullYear(), ANNIVERSARY_MONTH_DAY.month - 1, ANNIVERSARY_MONTH_DAY.day, 0, 0, 0);
    if (candidate.getTime() <= now.getTime()) {
      candidate = new Date(now.getFullYear() + 1, ANNIVERSARY_MONTH_DAY.month - 1, ANNIVERSARY_MONTH_DAY.day, 0, 0, 0);
    }
    return candidate;
  }

  function tick() {
    var diff = target.getTime() - Date.now();

    if (diff <= 0) {
      window.clearInterval(interval);
      gridEl.innerHTML = '<p class="countdown-arrived">It\u2019s today! Happy Anniversary. \u2764\uFE0F</p>';
      return;
    }

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }
};
