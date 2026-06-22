import type { Locale } from "./i18n";

/**
 * Your project's configuration — the main file you edit when cloning goodoc.
 *
 * Shared, language-neutral fields live at the top level; everything that needs
 * translating lives under `locales`. Add a locale here when you add one to
 * lib/i18n.ts.
 */
export interface NavLink {
  label: string;
  href: string;
}

/** How the brand is shown in the header/footer. */
export type BrandMode = "logo-and-name" | "logo-only" | "name-only";

export interface Brand {
  /** How to render the brand. Falls back to the name if a logo is missing. */
  mode: BrandMode;
  /** Logo image under public/, e.g. "/logo.svg". Required for the logo modes. */
  logo?: string;
  /** Alt text for the logo; defaults to the site name. */
  logoAlt?: string;
}

export interface FeatureCard {
  title: string;
  body: string;
  /** Optional illustration, e.g. "/features/landing.svg" (under public/). */
  image?: string;
}

export interface QuickstartStep {
  title: string;
  body: string;
}

export interface Quickstart {
  title: string;
  intro: string;
  /** Shown in a terminal block; may contain multiple lines. */
  command: string;
  steps: QuickstartStep[];
  note?: string;
}

/** Optional showcase media displayed in the hero. */
export interface HeroMedia {
  type: "image" | "video";
  /** Path under public/, e.g. "/hero.png" or "/hero.mp4". */
  src: string;
  /** Image alt text, or a poster frame for a video. */
  alt?: string;
  poster?: string;
  /**
   * "below"  — an elegant card beneath the hero text (default).
   * "overlap" — same band as the text: feathered edges and shifted to the side
   *   so it sits behind/beside the words without competing with them.
   */
  placement?: "below" | "overlap";
}

export interface LocaleContent {
  tagline: string;
  description: string;
  hero: {
    eyebrow: string;
    headline: string;
    subhead: string;
    primaryCta: NavLink;
    secondaryCta: NavLink;
    /** Optional image/video shown as an elegant card below the hero text. */
    media?: HeroMedia;
  };
  features: FeatureCard[];
  quickstart: Quickstart;
  /** Nav labels are localized; hrefs stay locale-relative ("/docs/"). */
  nav: NavLink[];
  footerNote: string;
}

export interface SiteConfig {
  /** Brand wordmark shown in the header/footer. */
  name: string;
  /** Logo + name display in the header/footer. */
  brand: Brand;
  /** Upstream repository (used by the footer "Powered by" link and upgrades). */
  repo: string;
  social: NavLink[];

  /** Footer line: "<projectName> <duration> | Powered by Goodoc". */
  projectName: string;
  duration: string;
  poweredBy: { label: string; href: string };

  locales: Record<Locale, LocaleContent>;
}

export const siteConfig: SiteConfig = {
  name: "goodoc",
  // Show logo + name. Use "logo-only" or "name-only" to taste; set `logo` to
  // your own image under public/ (or drop `logo` to fall back to the name).
  brand: { mode: "logo-and-name", logo: "/goodoc-mark.svg" },
  repo: "https://github.com/zobinHuang/goodoc",
  social: [{ label: "GitHub", href: "https://github.com/zobinHuang/goodoc" }],

  projectName: "goodoc",
  duration: "2024 – 2026",
  poweredBy: { label: "Goodoc", href: "https://github.com/zobinHuang/goodoc" },

  locales: {
    en: {
      tagline: "A documentation framework for humans and machines",
      description:
        "goodoc is a literary, static-site framework for project homepages, docs, and blogs. Every page renders both a humanize (human-friendly) and an agent (machine-friendly) view.",
      hero: {
        eyebrow: "A documentation framework",
        headline: "Tell your project like a good book",
        subhead:
          "Landing page, Markdown docs, and a blog — in one. Every document has a humanize and an agent view: for readers, and for machines.",
        primaryCta: { label: "Read the docs", href: "/docs/" },
        secondaryCta: { label: "Visit the blog", href: "/blog/" },
        // Image or video showcase below the hero text. Drop yours in public/
        // and point here, or remove `media` to hide it.
        media: {
          type: "image",
          src: "/hero-preview.svg",
          alt: "goodoc preview",
          placement: "overlap",
        },
      },
      features: [
        {
          title: "Landing page",
          body: "Say what your project is, what it does, and how to start — on one literary page. Restrained color, light theme only.",
          image: "/features/landing.svg",
        },
        {
          title: "Two-view docs",
          body: "One Markdown source. The humanize view renders like a polished GitHub README; the agent view emits clean semantic HTML for machines.",
          image: "/features/two-views.svg",
        },
        {
          title: "Blog",
          body: "Write notes and updates in Markdown, sharing the docs' rendering: inline HTML, code highlighting, tables, and task lists.",
          image: "/features/blog.svg",
        },
        {
          title: "Fully static",
          body: "Builds to a static site you can host on GitHub Pages or any static host. No server, instant loads.",
          image: "/features/static.svg",
        },
      ],
      quickstart: {
        title: "Install and start in a minute",
        intro:
          "Pull in the package, then you immediately have something to run — no scaffolding ceremony.",
        command: "pip3 install goodoc",
        steps: [
          {
            title: "Run it",
            body: "`goodoc serve` starts a local site at http://localhost:3000 with your docs already wired up.",
          },
          {
            title: "Write Markdown",
            body: "Drop files into content/ — they appear in the sidebar and blog instantly, no config.",
          },
          {
            title: "Ship it",
            body: "`goodoc build` produces a static site; push to GitHub and Pages publishes it for you.",
          },
        ],
        note: "Replace this command and these steps with your own in lib/site-config.ts.",
      },
      nav: [
        { label: "Docs", href: "/docs/" },
        { label: "Blog", href: "/blog/" },
      ],
      footerNote: "Written in Markdown, rendered for humans and machines.",
    },

    zh: {
      tagline: "为人与机器而写的文档框架",
      description:
        "goodoc 是一个偏文艺的静态站点框架，用来承载项目主页、文档与博客。每篇文档同时提供 humanize（人类友好）与 agent（机器友好）两种渲染。",
      hero: {
        eyebrow: "A documentation framework",
        headline: "把项目，讲成一本好读的书",
        subhead:
          "落地页宣传、Markdown 文档、博客，三位一体。每篇文档都有 humanize 与 agent 两种视图——既为读者，也为机器。",
        primaryCta: { label: "阅读文档", href: "/docs/" },
        secondaryCta: { label: "看看博客", href: "/blog/" },
        media: {
          type: "image",
          src: "/hero-preview.svg",
          alt: "goodoc 预览",
          placement: "overlap",
        },
      },
      features: [
        {
          title: "落地页",
          body: "用一页讲清楚项目是什么、能做什么、怎么开始。文艺的排版，克制的色彩，只有 light theme。",
          image: "/features/landing.svg",
        },
        {
          title: "双视图文档",
          body: "同一份 Markdown，humanize 视图像 GitHub README 一样精致渲染，agent 视图输出干净的语义化 HTML 供机器阅读。",
          image: "/features/two-views.svg",
        },
        {
          title: "博客",
          body: "用 Markdown 写近期随笔与更新，和文档共享同一套渲染：HTML 内联、代码高亮、表格与任务列表。",
          image: "/features/blog.svg",
        },
        {
          title: "纯静态",
          body: "构建为纯静态站点，可托管在 GitHub Pages 或任意静态主机。无服务器，秒级加载。",
          image: "/features/static.svg",
        },
      ],
      quickstart: {
        title: "一分钟安装并上手",
        intro: "装上包，立刻就有可运行的东西——不必折腾脚手架。",
        command: "pip3 install goodoc",
        steps: [
          {
            title: "运行",
            body: "`goodoc serve` 在 http://localhost:3000 启动本地站点，文档已自动接好。",
          },
          {
            title: "写 Markdown",
            body: "把文件丢进 content/，立刻出现在侧边栏与博客里，零配置。",
          },
          {
            title: "发布",
            body: "`goodoc build` 产出静态站点；推送到 GitHub，Pages 自动发布。",
          },
        ],
        note: "在 lib/site-config.ts 里把这条命令和这些步骤换成你自己的。",
      },
      nav: [
        { label: "文档", href: "/docs/" },
        { label: "博客", href: "/blog/" },
      ],
      footerNote: "以 Markdown 写作，为人与机器而渲染。",
    },
  },
};

export function getSiteContent(lang: Locale): LocaleContent {
  return siteConfig.locales[lang];
}
