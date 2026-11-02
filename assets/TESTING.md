# Testing report

Environment used: Node 22 and Python 3 only. **No browser, no Android device/WebView and no Telegram credentials were available**, so visual, animation and device behaviour were NOT run.

## Executed and passing
| Suite | Result | What it proves |
|---|---|---|
| `tests/hero-card.test.cjs` | 13/13 | Pointer maths for centre, upper-left, upper-right, lower-left, lower-right and exit; tilt, shift, light and indicator share one coordinate system and sign; DOM-stub run of `init()` confirms all four follow the same pointer, touch is ignored, and exit eases back monotonically then clears. |
| `tests/backend.test.mjs` | 18/18 | Field validation, magic-byte image check (fake `.jpg` rejected), 5 MB limit, origin allow-list, honeypot, minimum fill time, HTML escaping, duplicate key, rate limit, Telegram failure → 502, missing secrets → 500. **Telegram is mocked.** |
| `tests/certgen.test.cjs` | 3/3 | Reference-number format and validation. |
| `tests/static-check.py` | 25/25 | Unique ids, all JS element ids exist, icons exist, anchors resolve, assets exist, CSS braces, JSON valid, embedded fallbacks in sync, no storage-based intro suppression, no Telegram secrets in frontend, Nexus Vanguard has no fabricated URL, existing repo links preserved, form fields present, HTML balanced. |

## Not verified (needs you)
- Intro on every refresh, hero entrance timing/feel, role transition, tab/section animation, theme transitions — visual, not run.
- Pointer indicator in a real browser (maths and stubbed loop pass; real-DOM behaviour with the swinging lace not observed).
- Android WebView: JS, asset loading, theme persistence, touch drag of the lace, `inert`, `backdrop-filter`, clip-path/mask support on your WebView version.
- Responsive layouts at real widths, safe-area handling, horizontal overflow.
- Keyboard flow and focus trapping in a real browser; screen-reader output.
- Reduced-motion rendering.
- Console errors, broken external links, performance.
- Certificate generator canvas output and PNG download.
- **Telegram delivery (text + image) — not tested end-to-end. Do not treat the commission feature as operational until the end-to-end test in `backend/README.md` passes.**

## Known limitations
- No bundled font files; Google Fonts used (online).
- Project thumbnails and certificates: none supplied, placeholders/empty state shown.
- Rate limiting and duplicate protection require the KV `RATE` binding.
- `sitemap.xml`/`og:image` URLs are assumptions.
- `KERVIII-PORTFOLIO-full 01.zip` was not provided; work continued from the previous build.
