---
title: Nested Folders
description: How folders under content/<locale>/docs/ become a nested sidebar.
order: 91
---

# Nested Folders

This page lives at `content/en/docs/guides/advanced/nested-folders.md` — two
folders deep — and the sidebar mirrors that structure: **Guides › Advanced ›
Nested Folders**.

## How the tree is built

- Every subfolder under `docs/` becomes a sidebar section. Its title is the
  folder name, prettified (`advanced` → "Advanced", `api-reference` →
  "Api Reference").
- A page is sorted within its folder by its `order` frontmatter, then title.
- A folder sorts by the smallest `order` among the pages inside it.

## Naming a folder & giving it an overview

Add an `index.md` (or `index.mdx`) to a folder. Its `title` and `order` set the
folder's label and position, and the folder heading links to it as an overview
page — exactly like the **Guides** page above this one.

## Still works: flat files with `group`

Files placed directly in `docs/` are grouped by their `group` frontmatter, as
before. Folders and `group`-ed flat files can coexist.
