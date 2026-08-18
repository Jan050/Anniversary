# How to Personalize & Share This Site

You don't need to know how to code to finish this. Every place you need to
edit is marked with `✏️ EDIT` near the top of a file. This guide tells you
exactly which files those are, what to open them with, and how to send the
finished site to her.

---

## 1. How to preview it right now

Double-click `index.html`. It opens in your normal web browser (Chrome,
Safari, Firefox, Edge — any of them) and works completely offline, even
before you've changed anything. Re-double-click it any time you want to
check your edits — just refresh the browser tab after saving a file.

## 2. What to edit, in order

Open these in any plain text editor — Notepad (Windows), TextEdit
(Mac, set to Plain Text mode), or VS Code if you have it. **Do not** open
them in Microsoft Word — it will corrupt the file.

| # | File to open | What you're changing |
|---|---|---|
| 1 | `js/love-letter.js` | The date, the letter itself, and your signature. Look for the block that starts with `var LETTER_CONTENT = {` |
| 2 | `js/memories-globe.js` | The photos that form the rotating globe (its own section, right after the flower bouquet — separate from the 5-photo gallery below). Look for `var GLOBE_PHOTOS = [` |
| 3 | `js/easter-egg.js` | The private message behind the hidden heart (now tucked into the bottom-right corner of the Countdown section). Look for `var SECRET_MESSAGE =` |
| 4 | `js/countdown.js` | Your actual anniversary month and day. Look for `var ANNIVERSARY_MONTH_DAY = { month: 1, day: 1 };` — change the numbers (month 1–12, day 1–31) |
| 5 | `js/music-player.js` | The song title text shown in the player. Look for `var SONG_TITLE =` |
| 6 | `js/gallery.js` | The 5 polaroid photo captions further down the page. Look for `var GALLERY_PHOTOS = [` (see step 3 below for the photos themselves) |
| 7 | `index.html` | The browser tab title (currently "To My Love") and the "To My Love ❤️" text written on the envelope, if you want it to say something else |

In each file, only change the text between quote marks (`'like this'`).
Leave everything else — commas, brackets, semicolons — exactly as it is,
or the site may stop working. If you accidentally break something, the
`✏️ EDIT` block is small and self-contained, so worst case you can delete
your changes and start that one block over.

## 3. Adding your own photos

There are **two separate photo sets** in this site — don't mix them up:

**A) The rotating globe** (its own section, right after the flower bouquet)
1. Pick as many photos as you want — the more you add, the fuller the
   globe looks. 15–20 is a good range, but there's no hard limit.
2. Name them `memory1.jpg`, `memory2.jpg`, `memory3.jpg`, and so on.
3. Drop them into `assets/images/`.
4. In `js/memories-globe.js`, make sure the `GLOBE_PHOTOS` list has one
   line per photo, matching the filenames you used. The file starts with
   18 placeholder entries — delete extra lines if you used fewer photos,
   or copy a line and change the number if you used more.
5. Drag the globe with your mouse (or finger, on a touch screen) to spin
   it manually — it also rotates on its own.

**B) The 5-photo gallery** (further down the page, polaroid-style)
1. Rename 5 photos `image1.jpg` through `image5.jpg`.
2. Drop them into `assets/images/` alongside your globe photos — same
   folder, different filenames, so they won't conflict.
3. Write captions for them in `js/gallery.js` (see the table above).

Until you add real photos, both sections show a soft placeholder pattern
instead of a broken image — so it's safe to preview the site before your
photos are ready.

**If a photo looks blurry or blocky once it's in:** that means the file
itself is smaller than the space it's being shown in, so the browser is
stretching it up — no CSS setting can add detail that isn't in the
original file. Use the largest/original version of a photo you have
(avoid a version that was already resized down or heavily compressed,
like one re-saved from a messaging app) and it'll look sharp.

## 4. Adding music

1. Find a track you have the rights to use (a song you own, or a
   royalty-free/licensed piano track — searching "royalty free piano
   instrumental" turns up plenty of free options).
2. Save it as an `.mp3` file named `soft-piano-placeholder.mp3` — or use
   your own filename and update the `<source src="...">` line inside the
   `<audio id="ambient-music">` block in `index.html` to match.
3. Drop the file into `assets/audio/`.
4. Update the song title in `js/music-player.js` (see the table above).

Until you add a track, the music player UI still works, it just has
nothing to play.

## 5. Sending it to her

Pick whichever feels easiest:

- **Easiest — a link.** Upload the whole `anniversary-site` folder to a
  free host and send the link. [Netlify Drop](https://app.netlify.com/drop)
  is the simplest: drag the folder onto the page, get a link back, done
  (no account needed). GitHub Pages is another free option if you already
  use GitHub.
- **No internet needed on her end.** Zip the `anniversary-site` folder,
  send it however you'd send any file (AirDrop, email, USB drive), and
  tell her to unzip it and double-click `index.html`. Works with zero
  setup, but she'll need to be at a computer, and it won't have a
  shareable URL.

Either way, test it yourself first in a private/incognito browser window
to see it exactly as she will.

## 6. A few things worth knowing

- **Fonts need internet the first time.** The site pulls its fonts
  (Fraunces, Instrument Sans, Caveat) from Google Fonts online. If she
  opens it with no internet connection, it'll still work, just with a
  plain fallback font instead. This only affects fonts — everything else
  (photos, animations, music, letter) works fully offline regardless.
- **Browser autoplay.** Music starts the moment she clicks to open the
  envelope, not before — browsers block sound from playing before any
  click, so this is intentional, not a bug.
- **If something looks broken after an edit**, the most common cause is a
  missing quote mark or comma near what you just typed. Undo your last
  change and try again, changing only the text inside the quotes.

## 7. If you want to go further

Everything about the *look* — colors, fonts, spacing, animation speed —
lives in `css/variables.css`, with `NOTES.md` explaining the reasoning
behind the current choices. You don't need to touch these files for the
site to work, but they're there if you want to tweak the palette or pacing.
