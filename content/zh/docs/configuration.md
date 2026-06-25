---
title: 配置
description: 通过 lib/site-config.ts 定制站点名称、页脚、导航与各语言的文案。
group: 配置
order: 1
---

# 配置

克隆 goodoc 后，你主要修改的文件是 `lib/site-config.ts`。它集中了品牌信息与落地页文案。
与语言无关的字段位于顶层；任何需要翻译的内容都放在 `locales` 之下。

## 共享字段

```ts
export const siteConfig: SiteConfig = {
  name: "goodoc",                         // 页眉/页脚中的标志文字
  brand: { mode: "logo-and-name", logo: "/goodoc-mark.svg" },
  repo: "https://github.com/zobinHuang/goodoc",
  social: [{ label: "GitHub", href: "https://github.com/zobinHuang/goodoc" }],

  // 页脚行："<projectName> <duration> | Powered by Goodoc"
  projectName: "goodoc",
  duration: "2024 – 2026",
  poweredBy: { label: "Goodoc", href: "https://github.com/zobinHuang/goodoc" },

  locales: { en: { /* … */ }, zh: { /* … */ } },
};
```

页脚会自动渲染那一行署名信息 —— 把 `projectName` 和 `duration` 改成你自己的即可。

### Logo

`brand` 控制页眉/页脚的标志展示。把 logo 放进 `public/`（如 `/logo.svg`），再选 `mode`：

- `"logo-and-name"` —— logo + 名称并排（默认）。
- `"logo-only"` —— 只显示 logo。
- `"name-only"` —— 只显示名称（无需 logo）。

```ts
brand: { mode: "logo-only", logo: "/logo.svg", logoAlt: "Acme" }
```

若选了 logo 模式但没设 `logo`，会自动回退到显示名称。

## 各语言文案

`locales` 下的每一项都保存着一种语言的文案：

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
    note: {                                   // 副标题下方的可选小字
      prefix: "New: ",
      link: { label: "MDX & components", href: "/docs/humanize/mdx-components/" },
      suffix: " — write React in your docs.",
      style: { variant: "pill", tone: "soft" },   // 可选样式
    },
    media: { type: "image", src: "/hero-preview.svg", alt: "preview" }, // 可选
  },
  features: [
    {
      title: "Landing page",
      body: "Say what your project is on one page.",
      image: "/features/landing.svg",   // 可选插图（位于 public/ 下）
    },
    // …
  ],
  quickstart: {
    title: "Install and start in a minute",
    intro: "Pull in the package, then you immediately have something to run.",
    command: "pip3 install goodoc",      // 在终端块中显示
    steps: [
      { title: "Run it", body: "`goodoc serve` starts a local site." },
      // …
    ],
    note: "Replace with your own.",
  },
  nav: [
    { label: "Docs", href: "/docs/" },   // label 本地化；href 按语言相对
    { label: "Blog", href: "/blog/" },
  ],
  footerNote: "Written in Markdown, rendered for humans and machines.",
},
```

- **`hero.note`** 是可选的 —— 副标题下方的一行小字（例如公告）。`prefix` 与
  `suffix` 是围绕可选行内 `link` 的纯文本；内部 `href`（`/docs/…`）会自动加上
  语言前缀，外部 `href`（`https://…`）则在新标签页打开。省略 `note` 即不显示。

  用 `note.style` 调整样式：

  ```ts
  style: {
    variant: "pill",     // "text"（纯文字行，默认）或 "pill"（带边框的小胶囊）
    tone: "soft",        // "muted"（默认）| "soft" | "ink" | "accent"
    size: "sm",          // "xs" | "sm"（默认）| "base"
    className: "",        // 追加到容器/胶囊的额外 class（写字面量字符串）
    linkClassName: "",    // 设置后替换默认的链接 class
  }
  ```

  `className` / `linkClassName` 是完全的“逃生舱” —— 写任意 Tailwind class
  （要用字面量字符串，Tailwind 才扫得到），即可完全自定义。
- **`hero.media`** 是可选的 —— 在 hero 区域展示图片或视频。可传单个对象，
  也可传**数组**；传数组时会每四秒自动淡入淡出切换。把文件放进 `public/`，
  把 `src` 指过去。

  `placement`（取第一项的值）控制排版方式：
  - `"below"`（默认）—— 在 hero 文字下方以优雅浮动卡片呈现；多张幻灯片时
    卡片下方会显示圆点导航。
  - `"overlap"` —— 与文字处于同一高度带，向一侧错开并羽化消隐，静默自动
    轮播（无可见控件，作为环境背景）。

  ```ts
  // 单个
  media: { type: "image", src: "/hero.png", alt: "…", placement: "overlap" }

  // 数组 —— 交叉淡入淡出轮播
  media: [
    { type: "image", src: "/hero-1.png", alt: "功能 A", placement: "below" },
    { type: "image", src: "/hero-2.png", alt: "功能 B" },
    { type: "video", src: "/demo.mp4",  poster: "/demo-poster.png" },
  ]
  ```

  视频以静音循环的环境画面播放。省略 `media` 即不显示。

  **微调展示框** —— 加一个 `layout` 来精确摆放展示内容。几何参数
  （`offsetX`、`width`、`glow`）取第一项的值；`feather` 可逐项设置：

  ```ts
  media: [
    {
      type: "image", src: "/hero.png", placement: "overlap",
      layout: {
        textRatio: 1.25, // 文字列 : 展示列 的宽度比（1 = 平分）
        feather: 0.35,   // 边缘羽化，0（锐利）… 1（强）；媒体默认 0.4
        offsetX: -14,    // 水平偏移 %（overlap）；负值朝文字方向移动
        width: 130,      // 占所在列的宽度 %（overlap）
        glow: true,      // 展示区背后的柔光
      },
    },
  ]
  ```

  用 `textRatio` 调整两列的比例 —— 例如 `1.4` 让文字列比展示列宽 40%，`0.8`
  则更窄。如果羽化挡住了图片/视频太多，把 `feather` 调小（或设为 `0`）。自定义
  组件（见下）默认 `feather: 0`，因此边缘保持锐利。

  **自定义组件** —— 展示区还能放任意你自己写的 React 组件（实时演示、动态图示、
  嵌入内容等）。在 `lib/hero-slots.tsx` 里以某个 key 注册它，再用 `type: "custom"`
  引用这个 key：

  ```tsx
  // lib/hero-slots.tsx（属于你 —— 升级时永不覆盖）
  export const heroSlots = {
    demo: <LiveDemo />,
  };
  ```

  ```ts
  // lib/site-config.ts
  media: { type: "custom", slot: "demo", placement: "overlap" }
  ```

  自定义槽位可与图片/视频混在同一个轮播数组里，并继承同样的 `below`/`overlap`
  框架。若某个槽位需要 hooks 或浏览器 API，把它的组件放进带 `"use client"`
  指令的文件里。
- **`features[]`** 每一项渲染一张卡片。卡片顶部的媒体区可以是：
  - `image` —— `public/` 下的 SVG/PNG，
  - `video`（可选 `poster`）—— 静音循环播放的片段，或
  - `slot` —— 在 `lib/feature-slots.tsx`（属于你；升级时补齐、永不覆盖）里注册的
    自定义组件。`slot` 优先级高于 image/video。三者都省略即纯文字卡片。

  加上 `href` 可让**整张卡片变成链接**（带 hover 效果）：内部 `/docs/…` 会自动加
  语言前缀；外部 `https://…` 在新标签页打开。

  ```ts
  features: [
    { title: "Guide", body: "…", image: "/features/guide.svg", href: "/docs/humanize/getting-started/" },
    { title: "Live", body: "…", slot: "demo" },   // 来自 feature-slots.tsx 的组件
  ]
  ```
- **`quickstart`** 驱动落地页的安装区块：一个显示 `command` 的终端，加上带编号的
  `steps`。在某个步骤的 `body` 中用反引号来写行内代码。
- **`nav`** 的 label 会按语言翻译；`href` 保持语言相对
  （`/docs/`），语言前缀会自动加上。

要添加一种语言？参见[国际化](/docs/humanize/i18n/)。

## 主题与字体

调色板与字体映射位于 `app/theme.css`（由你自定义；升级时永远不会被覆盖）：

```css
@theme {
  --color-paper: #fbf9f4;   /* 背景纸色 */
  --color-ink: #2b2925;     /* 正文墨色 */
  --color-accent: #a65a3f;  /* 陶土色强调 */
  --font-sans: var(--font-pt-sans), …;
}
```

改这几个变量，就能换出一套全新配色。字体本身在 `app/layout.tsx` 中通过
`next/font/google` 加载，默认 PT Sans / PT Serif / PT Mono。界面字符串
（侧边栏标签、“On this page”等）位于 `lib/dictionaries.ts`。
