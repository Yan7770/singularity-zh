# Singularity — Bilingual (中文 / English)

A bilingual (EN ⇄ 中文) version of [yan7770.github.io/singularity](https://yan7770.github.io/singularity/), rebuilt as a static site with a non-invasive translation layer.

原站的中英双语版本。原站是 Vite + React 单页应用，本项目**未改动任何构建产物**，仅在其上叠加一层翻译引擎。

## 特性 / Features

- **139 条词条全站覆盖** —— 首屏、科学、器械、流程、数据、遥测、日志、页脚
- **原样可逆** —— 首次渲染时缓存英文原文，切回 EN 逐字还原，不依赖反向字典，不会残留
- **三种匹配层级** —— 整块段落 / 逐词动画标题 / 节点内碎片文本
- **语言记忆** —— `localStorage` 持久化，支持 `?lang=zh` / `?lang=en` 直达
- **中文字体** —— 补齐 Noto Serif SC / Noto Sans SC，修正等宽标签的中文回退
- **响应式** —— 桌面与移动端（390px 起）均已校对

## 目录结构 / Structure

```
.
├── index.html          # 入口（相对路径，支持任意子目录部署）
├── i18n.js             # 翻译层：词条表 + 文本节点替换 + 语言切换
├── i18n.css            # 中文排版微调（字号 / 字距 / 字体回退）
└── assets/
    ├── app.js          # 原站构建产物（未改动）
    └── app.css         # 原站构建产物（未改动）
```

## 本地运行 / Run locally

```bash
python -m http.server 8321
# 打开 http://127.0.0.1:8321/?lang=zh
```

直接双击 `index.html` 也能打开（`file://` 下同样可用）。

## 部署到 GitHub Pages

1. 新建仓库并推送本目录
2. Settings → Pages → Source 选择 `Deploy from a branch`，分支 `main`，目录 `/ (root)`
3. 访问 `https://<用户名>.github.io/<仓库名>/`

## 致谢 / Credits

- 原站设计与实现：<https://yan7770.github.io/singularity/>
- 字体：Instrument Serif、Inter、IBM Plex Mono、Noto Serif/Sans SC（Google Fonts）

本项目仅做语言层适配，原始设计与文案版权归原作者所有。
