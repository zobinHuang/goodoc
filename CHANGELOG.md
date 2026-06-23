# Changelog

Notable changes to the goodoc framework. Downstream projects can pin to a tag
with `npm run upgrade -- --ref vX.Y.Z`. See [UPGRADING.md](./UPGRADING.md).

## Unreleased

### Added
- **Hero note** — an optional small line under the hero subhead, configured via
  `hero.note` in `lib/site-config.ts`: a `prefix`, an optional inline `link`, and
  a `suffix`. Internal link hrefs are locale-relative (locale prefix added
  automatically); external `https://…` hrefs open in a new tab. Good for an
  announcement or "backed by" line. Omit `note` to hide it. Styling is exposed
  via `note.style`: a `variant` (`"text"` or a bordered `"pill"`), `tone`,
  `size`, and raw `className` / `linkClassName` escape hatches (literal Tailwind
  classes, which the v4 scanner picks up from `site-config.ts`).

### Changed
- **Hero showcase framing is now tunable and the overlap feather is gentler.**
  `hero.media[].layout` exposes `textRatio` (text-column vs showcase-column
  width — previously hard-coded to a 50/50 split), `feather` (edge fade, `0`
  sharp … `1` strong), `offsetX`, `width`, and `glow`. The default feather
  dropped from a heavy fade to `0.4`, and **custom-component slots default to
  `feather: 0`** so discrete components keep crisp edges. Feather resolves per
  slide (so mixed carousels work); geometry is read from the first item. On
  desktop the headline/subhead now fill their (ratio-driven) column instead of a
  fixed max width; mobile keeps the readable caps.

### Added
- **MDX support — custom components in docs & blog.** Name a content file `.mdx`
  (instead of `.md`) to embed live React components in the prose, Docusaurus-style.
  Components are registered in the new user-owned `lib/mdx-components.tsx` and are
  available in every `.mdx` file with no per-file import; Markdown renders inside
  them and JSX expressions work. Interactive `"use client"` components hydrate
  normally even though the site is a static export (MDX compiles at build time).
  The whole existing pipeline is reused (GFM, Shiki, table of contents, heading
  anchors, locale/base-path link rewriting), and `.md` files are unchanged and
  still take the fast HTML path. Worked example: `content/<locale>/docs/mdx-components.mdx`.
- **Custom hero showcase components.** `hero.media` now accepts
  `{ type: "custom", slot: "<key>" }`, rendering any React node you register in
  the new user-owned `lib/hero-slots.tsx`. Custom slots can be mixed into the
  carousel array and inherit the `below`/`overlap` framing — so the showcase can
  hold a live demo, animated diagram, or embed, not just an image/video.
- **`seed` manifest list + upgrade bootstrapping.** `npm run upgrade` now creates
  user-owned files listed under `seed` (e.g. `lib/hero-slots.tsx`) when they are
  missing locally, and never touches them if they already exist. This lets the
  framework introduce new user-editable files that older clones pick up safely.
- **Feature card video** — `features[].video` (+ optional `poster`) renders a
  muted, looping clip in a card; `image` remains the fallback.

- **Hero media carousel** — `hero.media` now accepts an array of items
  (`HeroMedia[]`). Multiple images/videos crossfade every 4 s. "below" placement
  shows dot indicators below the card; "overlap" placement auto-advances silently.
  Single-item configs continue to work unchanged.
- **Hero media overlap placement** — `hero.media.placement: "overlap"` puts the
  showcase image/video in the same height band as the text, shifted horizontally
  with a radial-gradient feather mask so it dissolves into the background without
  competing with the words. The existing `"below"` placement (floating card
  beneath the text) remains the default.
- **Hero media** — an optional image or video shown as an elegant, low-contrast
  card below the hero text (`siteConfig.locales[lang].hero.media`). Videos play
  as a muted, looping ambient clip. Omit `media` to hide it.
- **Logo support** for the brand in the header/footer, configured via
  `siteConfig.brand`: `mode` of `logo-and-name` (default), `logo-only`, or
  `name-only`, with a `logo` image under `public/`. Falls back to the name if a
  logo mode has no logo.

### Changed
- Root `/` now forwards to the default locale via a no-JS
  `<meta http-equiv="refresh">` (instant, works without JavaScript), with the
  client-side redirect kept as a fallback — no more splash flash.

### Fixed
- **GitHub Pages deploy on user/org pages and custom domains.** The workflow
  hard-coded the base path to `/<repo>`, which 404'd every asset (unstyled page,
  no redirect) when the site is served at the domain root. It now auto-detects:
  empty base path for `*.github.io` repos and custom domains (a `CNAME` file),
  `/<repo>` for project pages.

### Added
- **Agent skill** as a single source-of-truth file at `skills/goodoc/SKILL.md`,
  distributable to any agent (Claude, Codex, Gemini, …) via `npx skills`. It
  instructs an agent how to author docs/blog, configure the landing
  page/theme/footer, manage i18n, build, deploy, and upgrade. Framework-owned,
  so it travels with the template and updates via `npm run upgrade`.
- **i18n** with locale-prefixed URLs (`/en/…`, `/zh/…`), English default.
  Locales live in `lib/i18n.ts`, UI strings in `lib/dictionaries.ts`, and
  per-locale content under `content/<locale>/`. Missing translations fall back
  to the default locale. Language switcher in the header.
- **Landing quickstart** section (install command + immediate-usage steps) and
  **illustrated feature cards** (optional `image` on each feature).
- **Footer attribution line**: `<Project Name> <Duration> | Powered by Goodoc`,
  configured via `projectName` / `duration` / `poweredBy` in `lib/site-config.ts`.
- **Upgrade mechanism**: `npm run upgrade` pulls framework updates from upstream
  while preserving user-owned files, driven by `goodoc.manifest.json`.
- Theme tokens split into user-owned `app/theme.css`, separate from the
  framework's rendering CSS in `app/globals.css`.

## 0.1.0

### Added
- Initial framework: literary light-only landing page, two-view docs
  (humanize/agent) and blog, GitHub-style Markdown rendering with Shiki, static
  export for GitHub Pages, and the `dev-docs/` development documentation.
