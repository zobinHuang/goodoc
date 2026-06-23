---
title: Configuration
description: Customize your site name, footer, navigation, and per-locale copy through lib/site-config.ts.
group: Configuration
order: 1
---

# Configuration

After cloning goodoc, the file you'll mostly edit is `lib/site-config.ts`. It
centralizes branding and the landing-page copy. Language-neutral fields live at
the top level; anything that needs translating lives under `locales`.

## Shared fields

```ts
export const siteConfig: SiteConfig = {
  name: "goodoc",                         // wordmark in header/footer
  brand: { mode: "logo-and-name", logo: "/goodoc-mark.svg" },
  repo: "https://github.com/zobinHuang/goodoc",
  social: [{ label: "GitHub", href: "https://github.com/zobinHuang/goodoc" }],

  // Footer line: "<projectName> <duration> | Powered by Goodoc"
  projectName: "goodoc",
  duration: "2024 – 2026",
  poweredBy: { label: "Goodoc", href: "https://github.com/zobinHuang/goodoc" },

  locales: { en: { /* … */ }, zh: { /* … */ } },
};
```

The footer renders that attribution line automatically — change `projectName`
and `duration` to yours.

### Logo

`brand` controls the lockup shown in the header and footer. Drop a logo in
`public/` (e.g. `/logo.svg`) and pick a `mode`:

- `"logo-and-name"` — logo next to the name (the default).
- `"logo-only"` — logo by itself.
- `"name-only"` — just the name (no logo needed).

```ts
brand: { mode: "logo-only", logo: "/logo.svg", logoAlt: "Acme" }
```

If a logo mode is set but `logo` is missing, it falls back to the name.

## Per-locale copy

Each entry under `locales` holds the copy for one language:

```ts
en: {
  tagline: "A documentation framework for humans and machines",
  description: "…used for search engines and social sharing.",
  hero: {
    eyebrow: "A documentation framework",
    headline: "Tell your project like a good book",
    subhead: "Landing page, Markdown docs, and a blog — in one.",
    primaryCta: { label: "Read the docs", href: "/docs/" },
    secondaryCta: { label: "Visit the blog", href: "/blog/" },
    media: { type: "image", src: "/hero-preview.svg", alt: "preview" }, // optional
  },
  features: [
    {
      title: "Landing page",
      body: "Say what your project is on one page.",
      image: "/features/landing.svg",   // optional illustration (under public/)
    },
    // …
  ],
  quickstart: {
    title: "Install and start in a minute",
    intro: "Pull in the package, then you immediately have something to run.",
    command: "pip3 install goodoc",      // shown in the terminal block
    steps: [
      { title: "Run it", body: "`goodoc serve` starts a local site." },
      // …
    ],
    note: "Replace with your own.",
  },
  nav: [
    { label: "Docs", href: "/docs/" },   // labels localized; hrefs locale-relative
    { label: "Blog", href: "/blog/" },
  ],
  footerNote: "Written in Markdown, rendered for humans and machines.",
},
```

- **`hero.media`** is optional — an image or video shown alongside the hero
  text. Pass a single item **or an array**; arrays crossfade automatically
  every four seconds. Put files in `public/` and point `src` at them.

  The `placement` field (taken from the first item) controls layout:
  - `"below"` (default) — an elegant floating card beneath the hero text; dot
    indicators appear below the card when there are multiple slides.
  - `"overlap"` — same height band as the text, shifted to the side with
    feathered edges; auto-advances silently (no visible controls, ambient).

  ```ts
  // single item
  media: { type: "image", src: "/hero.png", alt: "…", placement: "overlap" }

  // multiple items — crossfade carousel
  media: [
    { type: "image", src: "/hero-1.png", alt: "Feature A", placement: "below" },
    { type: "image", src: "/hero-2.png", alt: "Feature B" },
    { type: "video", src: "/demo.mp4",  poster: "/demo-poster.png" },
  ]
  ```

  Videos play as muted, looping ambient clips. Omit `media` to hide it.

  **Tuning the frame** — add a `layout` to position the showcase precisely. The
  geometry (`offsetX`, `width`, `glow`) is read from the first item; `feather`
  can be set per item:

  ```ts
  media: [
    {
      type: "image", src: "/hero.png", placement: "overlap",
      layout: {
        textRatio: 1.25, // text column : showcase column width (1 = equal split)
        feather: 0.35,   // edge fade 0 (sharp) … 1 (strong); default 0.4 for media
        offsetX: -14,    // % horizontal shift (overlap); negative moves toward text
        width: 130,      // % of its column (overlap)
        glow: true,      // soft ambient glow behind the showcase
      },
    },
  ]
  ```

  Use `textRatio` to rebalance the two columns — e.g. `1.4` gives the text 40%
  more width than the showcase, `0.8` makes it narrower. If the fade hides too
  much of an image/video, lower `feather` (or set it to `0`). Custom components
  (below) default to `feather: 0` so their edges stay crisp.

  **Custom component** — the showcase can also hold any React component you
  write (a live demo, an animated diagram, an embed). Register it under a key in
  `lib/hero-slots.tsx`, then reference that key with `type: "custom"`:

  ```tsx
  // lib/hero-slots.tsx  (yours — never overwritten by upgrades)
  export const heroSlots = {
    demo: <LiveDemo />,
  };
  ```

  ```ts
  // lib/site-config.ts
  media: { type: "custom", slot: "demo", placement: "overlap" }
  ```

  Custom slots can be mixed with images/videos in a carousel array, and inherit
  the same `below`/`overlap` framing. If a slot needs hooks or browser APIs, put
  its component in a file with a `"use client"` directive.
- **`features[].image`** is optional — provide an SVG/PNG under `public/` to
  illustrate a card, or omit it for text only.
- **`quickstart`** powers the landing page's install section: a terminal showing
  `command` plus the numbered `steps`. Use backticks in a step's `body` for
  inline code.
- **`nav`** labels are translated per locale; the `href` stays locale-relative
  (`/docs/`) and the locale prefix is added automatically.

Adding a language? See [Internationalization](/docs/humanize/i18n/).

## Theme and fonts

The palette and font mappings live in `app/theme.css` (yours to customize; never
overwritten by upgrades):

```css
@theme {
  --color-paper: #fbf9f4;   /* paper background */
  --color-ink: #2b2925;     /* body ink */
  --color-accent: #a65a3f;  /* terracotta accent */
  --font-sans: var(--font-pt-sans), …;
}
```

Change these few variables for a whole new color scheme. The fonts themselves are
loaded in `app/layout.tsx` via `next/font/google`, defaulting to PT Sans / PT
Serif / PT Mono. UI strings (sidebar labels, "On this page", etc.) live in
`lib/dictionaries.ts`.
