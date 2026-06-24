---
title: 嵌套文件夹
description: content/<locale>/docs/ 下的文件夹如何变成嵌套的侧边栏。
order: 91
---

# 嵌套文件夹

本页位于 `content/zh/docs/guides/advanced/nested-folders.md`——两层文件夹深——
侧边栏正好镜像了这个结构：**指南 › Advanced › 嵌套文件夹**。

## 这棵树是怎么建出来的

- `docs/` 下的每个子文件夹都会变成一个侧边栏区块。它的标题来自文件夹名并美化
  （`advanced` → "Advanced"，`api-reference` → "Api Reference"）。
- 页面在所在文件夹内按 `order` frontmatter 排序，再按标题。
- 文件夹按其内部页面中最小的 `order` 排序。

## 给文件夹命名并配一个概览页

在文件夹里加一个 `index.md`（或 `index.mdx`）。它的 `title` 和 `order` 决定该
文件夹的标签与位置，文件夹标题会链接到它作为概览页——就像本页上方的「指南」。

## 依然支持：带 `group` 的扁平文件

直接放在 `docs/` 里的文件按它们的 `group` frontmatter 分组，和以前一样。文件夹
与带 `group` 的扁平文件可以共存。
