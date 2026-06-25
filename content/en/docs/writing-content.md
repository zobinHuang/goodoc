---
title: Writing Content
description: Both docs and blog posts are written in Markdown with frontmatter. Learn the available fields and how to organize them.
group: Getting Started
order: 2
---

# Writing Content

All of goodoc's content lives as Markdown files under `content/<locale>/`
(the default locale is `en`):

- `content/en/docs/` — documentation, shown in the docs sidebar.
- `content/en/blog/` — blog posts, sorted by date in reverse chronological order.

The filename becomes the URL slug. For example, `content/en/docs/guide/setup.md`
renders to `/en/docs/humanize/guide/setup/`. (You write links locale-relative,
as `/docs/humanize/guide/setup/`; the locale prefix is added for you — see
[Internationalization](/docs/humanize/i18n/).)

## Frontmatter

Each file describes its metadata in a block of YAML frontmatter at the top:

```markdown
---
title: Document Title
description: A one-line summary, shown in lists and in the page header.
group: Getting Started   # Sidebar group (docs only)
order: 1                 # Order within the group; lower comes first (docs only)
date: 2026-06-21         # Publish date (blog only, used for sorting)
tags: [Design, Rendering] # Tags (blog only)
authors: [ada, lin]      # Authors (blog only) — see below
draft: false             # When true, visible only in dev mode
---
```

| Field | Applies to | Description |
| --- | --- | --- |
| `title` | docs / blog | Title, required |
| `description` | docs / blog | Summary |
| `group` | docs | Sidebar group heading |
| `order` | docs | Sort key within a group |
| `date` | blog | ISO date, used for reverse-chronological sorting |
| `tags` | blog | Array of tags |
| `authors` | blog | Authors shown under the title (see below) |
| `draft` | docs / blog | Draft; hidden in production builds |

## Blog Authors

A post's `authors` list shows each author — avatar, name, and an
affiliation · email line — under the title, and a compact byline in the blog
index. Define authors once in `lib/authors.ts` and reference them by key:

```ts
// lib/authors.ts  (yours — seeded on upgrade, never overwritten)
export const authors = {
  ada: {
    name: "Ada Lovelace",
    avatar: "/authors/ada.svg",   // image under public/ (omit for a monogram)
    email: "ada@goodoc.dev",       // rendered as a mailto link
    affiliation: "goodoc",         // organization / unit
    url: "https://example.com",    // optional; links the author's name
  },
};
```

```markdown
---
title: My Post
authors: [ada, lin]    # registry keys
---
```

You can also write an author inline instead of registering it:

```markdown
authors:
  - name: Guest Writer
    affiliation: Acme
    email: guest@acme.dev
```

## Organizing Documentation

Two ways to structure the sidebar — use either, or both together.

**Flat files with `group`.** Files placed directly in `docs/` are grouped by
their `group` frontmatter and sorted by `order`:

```text
content/en/docs/
├── getting-started.md   # group: Getting Started, order: 1
├── writing-content.md   # group: Getting Started, order: 2
└── deployment.md        # group: Deployment, order: 1
```

**Nested folders.** Subfolders become nested sidebar sections, as deep as you
like. A folder's label is its name, prettified (`advanced` → "Advanced"); it
sorts by the smallest `order` of the pages inside it. Add an `index.md` (or
`index.mdx`) to a folder to set its title/order and give it a clickable overview
page:

```text
content/en/docs/
└── guides/
    ├── index.md                  # titles the "Guides" section + its overview
    └── advanced/                 # nested section "Advanced"
        └── nested-folders.md     # → Guides › Advanced › Nested Folders
```

The folder name becomes part of the URL
(`/docs/humanize/guides/advanced/nested-folders/`). See the live example under
**Guides › Advanced** in this sidebar.

## Links and Images

Write in-site links **locale-relative** with an absolute path. At render time the
current locale prefix and the deployment subpath (base path) are added for you;
assets are prefixed with the base path only (never localized):

```markdown
See [Getting Started](/docs/humanize/getting-started/).

![goodoc](/goodoc-mark.svg)
```

Put images in `public/` and reference them with `/your-image.png`.
