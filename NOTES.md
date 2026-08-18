# Design system reference — "Pressed Botanical Conservatory"

Keep every later phase consistent with this. If a new phase seems to want a
color, font, or motion value not listed here, add it to `variables.css`
first rather than hardcoding it inline.

## Why this direction
The brief asked for "luxury wedding invite meets Apple product page." The
generic version of that is cream background + rose-gold + glassmorphism
cards — which is also the current AI-design default, so it reads as
templated rather than considered. Instead: a naturalist's field-journal /
pressed-botanical-plate aesthetic. Still luxurious and romantic, but earns
it through illustration quality and restraint rather than gradients and
blur.

## Color (see variables.css for hex values)
Bottle-green dark ground, warm ivory light ground, aged brass accent
(replaces "rose gold"), dusty blush secondary, muted moss for stems/leaves.

## Type
Fraunces (display) + Instrument Sans (body) throughout. Caveat
(handwriting) is reserved for the Phase 4 love letter ONLY — do not reuse
it elsewhere or it stops feeling special.

## Structural device
Each major section opens with a brass rule + roman-numeral "chapter" mark
(`.section-mark`, e.g. "III. The Bouquet") instead of numbered steps —
because the site is structured as chapters in a journal, not a linear
onboarding flow.

## Signature element
The bouquet and other flowers used throughout (loading screen, globe
markers) should be built as hand-drawn-style SVG line art that draws itself
via `stroke-dasharray`/`stroke-dashoffset` animation, THEN fills with soft
color once the line completes. This is the one place to spend animation
"budget" — keep ambient effects elsewhere (particles, hover states)
understated so this stays the memorable moment.

## Animation plan (maps to later phases)
- **Phase 2 loading:** single rose, line-draw → fill, ~2.2s (`--dur-bloom`)
- **Phase 3 landing:** ambient fade-in (stars/fireflies at low opacity,
  slow linear drift — `--ease-linear`), envelope entrance uses
  `--ease-bloom`
- **Phase 5 bouquet:** each flower type draws in sequence, staggered
  ~150–250ms apart, each using `--ease-bloom` + `--dur-bloom`; ribbon wrap
  and camera zoom are the "finale" and should use `--ease-page` for a
  more deliberate, less floaty finish
- **Memories globe (new section, right after the bouquet):** photos
  placed on a sphere via Fibonacci-sphere distribution (even spacing, no
  clustering at the poles), auto-rotates slowly and responds to drag —
  see `js/memories-globe.js`. Add photos by editing `GLOBE_PHOTOS` there;
  any count works, more photos = a fuller globe.
- **Gallery:** scroll-triggered reveals via the shared `onEnterViewport()`
  helper in main.js — fade + slight rise, `--dur-normal`
- **Global:** all durations collapse to ~0 under `prefers-reduced-motion`
  (already wired in variables.css) — don't bypass this per-phase

## Breakpoints
Single fluid breakpoint at 640px for spacing scale-down (see base.css).
Type sizes use `clamp()` so no separate mobile type scale is needed.
