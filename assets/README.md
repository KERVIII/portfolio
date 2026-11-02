# KERVIII Portfolio

Static single-page portfolio — HTML5 · CSS3 · vanilla JS · JSON data. GitHub Pages compatible (`.nojekyll` included).
Only the commission form needs a backend (`backend/`, a Cloudflare Worker); everything else is static.

## Structure
```
index.html 404.html manifest.json robots.txt sitemap.xml
css/    themes.css (all colours, dark+light) · style.css · animations.css · responsive.css
js/     script.js (boot) · navigation.js · theme.js · animations.js · projects.js · hero-card.js · interactions.js · commission.js · certgen.js
data/   projects.json · certificates.json · skills.json
assets/ images/ icons/ fonts/ thumbnails/
backend/ worker.js · wrangler.toml · .env.example · README.md     (commission → Telegram)
tools/  sync-fallback.py · certificate.html (owner-only certificate generator, not linked)
tests/  hero-card.test.cjs · backend.test.mjs · certgen.test.cjs · static-check.py
```

## Sections
Home (hero card + ID lace) · About · Expertise · Portfolio Showcase (Projects / Certificates / Tech Stack tabs) · Commission & Inquiries · Footer.
The **Certificates** nav link opens the Certificates tab of the showcase (`#certificates`) instead of duplicating the gallery in a second section.

## Editing content
- **Projects** — `data/projects.json` (name, version, category, summary, description, technologies, features, notes, credit, repository, image). Nexus Vanguard is `repository: {status:"coming-soon", url:null}`; when published set `status:"available"` and the real `https://` URL.
- **Thumbnails** — put images in `assets/thumbnails/` and set `"image"`. `null` shows a typographic cover.
- **Certificates** — add objects to `data/certificates.json`:
  `{ "id","title","issuer","date","image","thumbnail","credentialId","verifyUrl" }` (`credentialId`, `verifyUrl`, `thumbnail` optional; `verifyUrl` must be `https://`). Images go in `assets/`. Empty list shows an empty state. Only add real certificates.
- **Expertise / tech stack / focus chips** — `data/skills.json`.
- **After editing any JSON run** `python3 tools/sync-fallback.py` — it refreshes the embedded copies used only when `fetch()` is blocked (e.g. `file://` in some WebViews).

## Commission form
`#commission-form` posts to the URL in `data-endpoint`. Empty = form disabled with a Telegram fallback notice (no fake success). Deploy `backend/` (see `backend/README.md`), paste the Worker URL into `data-endpoint`, then run the end-to-end test described there. Success is displayed only after the Worker answers `{ok:true}`.

## Intro
Plays on **every** full document load (no storage flags). Does not replay for tab switches, project details or scrolling. Skipped under `prefers-reduced-motion`.

## Fonts
Syne, Inter and JetBrains Mono load from Google Fonts with system fallbacks. For self-hosting: add files to `assets/fonts/`, declare `@font-face` in `css/style.css`, remove the `<link>` tags in `<head>`.

## Certificate generator (owner tool)
`tools/certificate.html` draws a "Certificate of Project Completion" PNG (recipient, title, date, reference, KERVIII branding). It requires an explicit approval checkbox, says it is not an accreditation, is `noindex` and is not linked from the site.

## Tests
```
node tests/hero-card.test.cjs
node tests/backend.test.mjs
node tests/certgen.test.cjs
python3 tests/static-check.py
```
See `TESTING.md` for what is and is not verified.

## Assumptions
`sitemap.xml`/`robots.txt` use `https://kerviii.github.io/KERVIII-PORTFOLIO/` (inferred) — correct it if your Pages URL differs. `og:image` uses a relative path; most scrapers need an absolute URL, so change it once the final URL is known.
