# Changelog

## 2.0.0
- Hero rebuilt: interactive card (perspective tilt, shift, pointer light, illuminated ring, white pointer indicator, reflection sweep) with an integrated ID lace and swing physics.
- **Pointer tracking fix:** one shared normalised pointer calculation (`js/hero-card.js`) relative to the card centre drives tilt, shift, light and indicator; single rAF loop; smooth reset on exit; disabled on touch-only and reduced motion; one element per transform to avoid conflicts.
- Entrance sequence: grid → card → reflection → portrait + lace → masked headline → gray text → role → buttons. Fast replay on re-entry.
- Role selector: Android Developer, Website Developer, App Builder, WebUI Developer, Frontend Developer; leave-then-enter transition, no layout jump.
- **Intro now plays on every document load** (removed the sessionStorage suppression from 1.x).
- New Expertise section (merges old Skills/Services). Portfolio showcase keeps Projects / Certificates / Tech Stack tabs; Certificates link deep-links to its tab.
- Certificates: gallery with credential ID / verify URL support, image error handling, lightbox with prev/next/keyboard, polished empty state.
- Commission & Inquiries form (nickname, service, title, description, budget, reference image with preview) + `backend/` Cloudflare Worker → Telegram. Replaces the 1.x copy-to-Telegram form.
- Owner-only certificate generator (`tools/certificate.html`, `js/certgen.js`).
- SEO: OG/Twitter meta, `og.jpg`, robots disallows `/tools/` and `/backend/`.
- Added `tests/`, `tools/sync-fallback.py`, TESTING.md.

## 1.0.0
- Redesign of the original site: themes, tabs, project detail views, Nexus Vanguard (Coming Soon).
