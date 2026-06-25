---
title: 写作内容
description: 文档与博客文章都用带 frontmatter 的 Markdown 编写。了解可用字段以及如何组织它们。
group: 开始
order: 2
---

# 写作内容

goodoc 的所有内容都以 Markdown 文件的形式存放在 `content/<locale>/`
之下（默认语言是 `en`）：

- `content/en/docs/` —— 文档，显示在文档侧边栏中。
- `content/en/blog/` —— 博客文章，按日期倒序排列。

文件名即 URL slug。例如，`content/en/docs/guide/setup.md`
会渲染为 `/en/docs/humanize/guide/setup/`。（你按语言相对路径书写链接，
写成 `/docs/humanize/guide/setup/`，语言前缀会自动加上 —— 参见
[国际化](/docs/humanize/i18n/)。）

## Frontmatter

每个文件都在顶部用一段 YAML frontmatter 描述自己的元数据：

```markdown
---
title: Document Title
description: A one-line summary, shown in lists and in the page header.
group: Getting Started   # 侧边栏分组（仅文档）
order: 1                 # 组内顺序；值越小越靠前（仅文档）
date: 2026-06-21         # 发布日期（仅博客，用于排序）
tags: [Design, Rendering] # 标签（仅博客）
authors: [ada, lin]      # 作者（仅博客）—— 见下文
draft: false             # 为 true 时仅在开发模式下可见
---
```

| 字段 | 适用于 | 说明 |
| --- | --- | --- |
| `title` | 文档 / 博客 | 标题，必填 |
| `description` | 文档 / 博客 | 摘要 |
| `group` | 文档 | 侧边栏分组标题 |
| `order` | 文档 | 组内排序键 |
| `date` | 博客 | ISO 日期，用于倒序排列 |
| `tags` | 博客 | 标签数组 |
| `authors` | 博客 | 标题下方展示的作者（见下文） |
| `draft` | 文档 / 博客 | 草稿；在生产构建中隐藏 |

## 博客作者

文章的 `authors` 列表会在标题下方展示每位作者——头像、姓名，以及一行
单位 · 邮箱——并在博客列表里显示一行紧凑署名。在 `lib/authors.ts` 里集中
定义一次作者，再用 key 引用：

```ts
// lib/authors.ts（属于你 —— 升级时补齐、永不覆盖）
export const authors = {
  ada: {
    name: "Ada Lovelace",
    avatar: "/authors/ada.svg",   // public/ 下的图片（省略则显示首字母圆标）
    email: "ada@goodoc.dev",       // 渲染为 mailto 链接
    affiliation: "goodoc",         // 单位 / 组织
    url: "https://example.com",    // 可选；让作者名链接过去
  },
};
```

```markdown
---
title: 我的文章
authors: [ada, lin]    # 注册表的 key
---
```

也可以在 frontmatter 里直接内联一个作者，而不注册：

```markdown
authors:
  - name: Guest Writer
    affiliation: Acme
    email: guest@acme.dev
```

## 组织文档

两种方式来组织侧边栏 —— 任选其一，或同时使用。

**带 `group` 的扁平文件。** 直接放在 `docs/` 里的文件，按其 `group` frontmatter
分组，并在组内按 `order` 排序：

```text
content/en/docs/
├── getting-started.md   # group: Getting Started, order: 1
├── writing-content.md   # group: Getting Started, order: 2
└── deployment.md        # group: Deployment, order: 1
```

**嵌套文件夹。** 子文件夹会变成嵌套的侧边栏区块，可任意深度。文件夹的标签来自
其名称并美化（`advanced` → "Advanced"）；它按内部页面中最小的 `order` 排序。在
文件夹里加一个 `index.md`（或 `index.mdx`）即可设置它的标题/顺序，并给它一个可
点击的概览页：

```text
content/en/docs/
└── guides/
    ├── index.md                  # 命名「指南」区块并作为其概览页
    └── advanced/                 # 嵌套区块 "Advanced"
        └── nested-folders.md     # → 指南 › Advanced › 嵌套文件夹
```

文件夹名会成为 URL 的一部分
（`/docs/humanize/guides/advanced/nested-folders/`）。可参见本侧边栏中
**指南 › Advanced** 下的实例。

## 链接与图片

站内链接请用**语言相对**的绝对路径书写。渲染时会自动加上当前语言前缀和部署子路径
（base path）；静态资源只会加上 base path（永远不会本地化）：

```markdown
See [Getting Started](/docs/humanize/getting-started/).

![goodoc](/goodoc-mark.svg)
```

把图片放在 `public/` 中，用 `/your-image.png` 引用。
