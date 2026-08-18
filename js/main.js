/* ==========================================================================
   MAIN.JS — entry point. Loaded last (see index.html script order).
   Calls each phase's init function via the shared Site.init namespace
   (see site-namespace.js) once the DOM is ready.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  if (Site.init.loadingScreen) Site.init.loadingScreen();
  if (Site.init.landingScene) Site.init.landingScene();
  if (Site.init.envelope) Site.init.envelope();
  if (Site.init.loveLetter) Site.init.loveLetter();
  if (Site.init.bouquet) Site.init.bouquet();
  if (Site.init.memoriesGlobe) Site.init.memoriesGlobe();
  if (Site.init.celebration) Site.init.celebration();
  if (Site.init.gallery) Site.init.gallery();
  if (Site.init.ambientParticles) Site.init.ambientParticles();
  if (Site.init.easterEgg) Site.init.easterEgg();
  if (Site.init.countdown) Site.init.countdown();
  if (Site.init.musicPlayer) Site.init.musicPlayer();
  if (Site.init.themeToggle) Site.init.themeToggle();
  if (Site.init.ending) Site.init.ending();
});
