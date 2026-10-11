# Changelog

All notable changes to this project are documented in this file.

## [2026.10] - 2026-10-12

- Toolkit that generates image, video and PDF assets for 10 SkynetJoe LLC Fiverr gigs from one data source: `gig-images-generator.html` (canvas, no dependencies) and a Remotion project in `n8n-video/` for 38s explainers.
- October 2026 review: tree, README and history re-checked; no generator, Remotion or asset code changed. The repo still holds its single April 2026 initial commit plus release commits.
- The old one-line footer was replaced with the standard Work with SkynetLabs section; README links (Fiverr agency profile, Remotion) resolve.
- Known gaps: no LICENSE; no root `package.json` so no version bump applies (the only manifest is `n8n-video/package.json`, outside this release's allowed file set); `bgm.wav` expected in `n8n-video/public/` is not committed and no rendered MP4s are tracked.

## [2026.09] - 2026-09-16

- Maintenance review of fiverr-gig-assets — a toolkit that generates the image, video and PDF assets for 10 SkynetJoe LLC Fiverr gigs from one shared data source.
- Status: `gig-images-generator.html` renders three HTML5-canvas images per gig (thumbnail, packages card, how-it-works card) with no dependencies; `n8n-video/` is a Remotion (React) project that renders a 38s 1920x1080 explainer per gig, with `generate-bgm.js` producing a procedural WAV bed and `render-all.sh` batching all 10. Gig copy lives in `n8n-video/src/gigData.ts`. README links the live profile fiverr.com/agencies/skynetjoellc.
- Reviewed September 2026: documentation refreshed, changelog started, and the repo versioned as v2026.09. No generator, Remotion or asset code was changed.
- Known gaps: no LICENSE file and no CHANGELOG before this release; the repo still sits on its single "Initial commit" from April 2026; only three example preview PNGs are tracked in `n8n-video/out/` (no rendered MP4s or generated gig images); the bgm.wav the README expects in `n8n-video/public/` is not committed.
- Version note: there is no package.json at the repository root, so no version bump was applied this release. The only manifest is `n8n-video/package.json`, which is outside the release tooling's allowed file set and was left untouched.
