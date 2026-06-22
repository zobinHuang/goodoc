<div align="center">
  <img src="./public/goodoc-mark.svg" alt="goodoc" width="160" />
  <h1>goodoc</h1>
  <p><em>为人与机器而写的文档框架</em></p>
  <p><a href="./README.md">English</a> · <strong>简体中文</strong></p>
</div>

**goodoc** 是一个偏文艺的静态站点框架，用来承载项目的**主页**、**文档**与**博客**。
你只需写 Markdown，就能得到一个排版讲究、对人与机器都友好的站点。

## 特点

- 🏛 **落地页** —— 用一页文艺地宣传项目是什么、能做什么、怎么开始。
- 📖 **双视图文档** —— 同一份 Markdown，`humanize` 视图像 GitHub README 一样精致渲染，
  `agent` 视图输出干净的语义化 HTML 供机器阅读。两者位于平行 URL：
  `/<lang>/docs/humanize/…` 与 `/<lang>/docs/agent/…`。
- ✍️ **博客** —— 用 Markdown 写随笔与更新，与文档共享同一套渲染。
- 🌐 **i18n** —— locale 前缀路由（`/en`、`/zh`），默认 English；内容按 `content/<locale>/` 组织。
- 🎨 **文艺主题** —— 暖纸色、墨色、单一陶土强调色；仅 light theme；PT Sans / PT Serif / PT Mono。
- 📦 **纯静态** —— 构建为静态站点，一键发布到 GitHub Pages 或任意静态主机。
- ⬆️ **可升级** —— 以 goodoc 为模板 clone 后，`npm run upgrade` 拉取上游框架更新而不动你的内容。

## 快速开始

```bash
git clone https://github.com/zobinHuang/goodoc.git my-project
cd my-project
npm install
npm run dev        # http://localhost:3000
```

三步上线：

1. 编辑 `lib/site-config.ts` —— 改成你的项目名、标语、导航、落地页与各 locale 文案；
   调色板在 `app/theme.css`。
2. 把文档丢进 `content/<locale>/docs/`、博客丢进 `content/<locale>/blog/`（带 frontmatter
   的 Markdown，默认 locale 为 `en`）。
3. 推送到 GitHub，由内置的 Actions 自动构建并发布到 GitHub Pages
   （Settings → Pages → Source 选 **GitHub Actions**）。

## 升级

以 goodoc 为模板 clone 后，拉取上游框架更新而不动你的内容/配置/主题：

```bash
npm run upgrade
```

详见 [`UPGRADING.md`](./UPGRADING.md) 与 [`CHANGELOG.md`](./CHANGELOG.md)。

## 技术栈

Next.js 16（App Router）· React 19 · TypeScript · Tailwind CSS v4 ·
unified/remark/rehype · Shiki · 静态导出（`output: "export"`）。

## 文档

- 站点内文档：启动后访问 `/`（自动跳转到 `/en/`），或直接 `/en/docs/`。
- **框架开发文档**：见 [`dev-docs/`](./dev-docs/)（架构、渲染管线、主题、部署、i18n、升级等）。

## 部署

```bash
# GitHub 项目站点（位于子路径）
NEXT_PUBLIC_BASE_PATH=/goodoc npm run build   # 产物在 out/
```

详见 [`dev-docs/05-deployment.md`](./dev-docs/05-deployment.md)。

## License

见 [LICENSE](./LICENSE)。
