<div align="center">
  <img src="./public/goodoc-mark.svg" alt="goodoc" width="160" />
  <h1>goodoc</h1>
  <p><em>A documentation framework for humans and machines</em></p>
  <p><strong>English</strong> · <a href="./README.zh-CN.md">简体中文</a></p>
</div>

**goodoc** is a literary, static-site framework for hosting a project's
**home page**, **docs**, and **blog**. Write nothing but Markdown and get a
site that's beautifully typeset and friendly to both humans and machines.

## Features

- 🏛 **Landing page** — say what your project is, what it does, and how to start, on one literary page.
- 📖 **Two-view docs** — one Markdown source: the `humanize` view renders like a polished GitHub README, the `agent` view emits clean semantic HTML for machines. They live at parallel URLs: `/<lang>/docs/humanize/…` and `/<lang>/docs/agent/…`.
- ✍️ **Blog** — write notes and updates in Markdown, sharing the docs' rendering.
- 🌐 **i18n** — locale-prefixed routes (`/en`, `/zh`), English by default; content organized under `content/<locale>/`.
- 🎨 **Literary theme** — warm paper, ink, a single terracotta accent; light theme only; PT Sans / PT Serif / PT Mono.
- 📦 **Fully static** — builds to a static site you can publish to GitHub Pages or any static host.
- ⬆️ **Upgradable** — after cloning goodoc as a template, `npm run upgrade` pulls upstream framework updates without touching your content.

## Quick start

```bash
git clone https://github.com/zobinHuang/goodoc.git my-project
cd my-project
npm install
npm run dev        # http://localhost:3000
```

Go live in three steps:

1. Edit `lib/site-config.ts` — your project name, tagline, navigation, landing
   page, and per-locale copy. Tune the palette in `app/theme.css`.
2. Drop docs into `content/<locale>/docs/` and posts into `content/<locale>/blog/`
   (Markdown with frontmatter; the default locale is `en`).
3. Push to GitHub; the bundled Actions workflow builds and publishes to GitHub
   Pages (set **Settings → Pages → Source** to **GitHub Actions**).

## Upgrade

After cloning goodoc as a template, pull upstream framework updates without
touching your content, config, or theme:

```bash
npm run upgrade
```

See [`UPGRADING.md`](./UPGRADING.md) and [`CHANGELOG.md`](./CHANGELOG.md).

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
unified/remark/rehype · Shiki · static export (`output: "export"`).

## Documentation

- On-site docs: after starting, visit `/` (redirects to `/en/`), or go straight
  to `/en/docs/`.
- **Framework development docs**: see [`dev-docs/`](./dev-docs/) (architecture,
  rendering pipeline, theming, deployment, i18n, upgrades, and more).

## Deployment

```bash
# GitHub project site (served under a sub-path)
NEXT_PUBLIC_BASE_PATH=/goodoc npm run build   # output in out/
```

See [`dev-docs/05-deployment.md`](./dev-docs/05-deployment.md).

## License

See [LICENSE](./LICENSE).
