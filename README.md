# Singularity — UI v2

对 `singularity-bilingual` 的全站 UI 优化版本。品牌语言（奶油纸底、Instrument Serif 编辑体标题、等宽微标签、墨绿强调）与全部功能逻辑保持不变，改动集中在**排版精度、状态反馈与动效一致性**。

- 完整的问题清单与优化说明见 [`ui-optimization-report.html`](./ui-optimization-report.html)
- 无框架、无构建步骤：`index.html` + `styles.css` + `app.js`

## 运行

```bash
python -m http.server 8321
# http://127.0.0.1:8321/
# 直接双击 index.html 也可（file:// 下功能完整）
```

语言：**默认英文**。切换中文用头部开关或 `?lang=zh`；只有主动选择才会写入 `localStorage`（键 `singularity.lang.v2`），
因此站点不会因为浏览器语言或历史自动检测而擅自变成中文。

## 目录

```
.
├── index.html                 语义化结构 + 英文原文（无 JS 也可读）
├── styles.css                 令牌 / 组件 / 响应式 / 中英排印 / 降级
├── app.js                     双语词条、滚动与状态、画布动画
└── ui-optimization-report.html  优化说明（可直接打印）
```

## 设计令牌

| 令牌 | 值 | 角色 |
| --- | --- | --- |
| `--paper` | `#F5EFEA` | 柔奶白，纸底 |
| `--ink` | `#113056` | 捣蓝色，正文与深色区底 |
| `--ink-3` | `#57667C` | 辅助文字（5.12:1） |
| `--accent` | `#122E8A` | 深海蓝，按钮/结构强调 |
| `--tint` | `#91CFD5` | 清水蓝，浅色块与波形 |
| `--signal` | `#E93F80` | 甜酷粉，仅用于圆点与指示 |
| `--obsidian` | `#1E1E22` | 黑曜石，设备面板底 |
| `--d-fast/mid/slow/xslow` | `180 / 380 / 720 / 1200ms` | 动效四档 |
| `--ease` | `cubic-bezier(.22,.61,.36,1)` | 统一缓动 |

甜酷粉在纸底上仅 3.36:1，**不承载文字**；表单报错用压深版 `#C2185B`（5.13:1）。清水蓝同理，只作底色与图形。

深色区块只重声明上述颜色令牌（`.section--dark`），组件本身不写第二套深色规则。

## 字体

拉丁：Instrument Serif（标题）、Inter（300/400/500）、IBM Plex Mono（400/500）。
中文标题：Noto Serif SC（400/500），由 Google Fonts 按 unicode-range 切片，只下载页面用到的分片；中文正文仍走系统黑体，不为正文背字库。

## 动效

全部基于 transform / opacity / clip-path，只触发合成层。

- **事件视界图版 = 一台扫描仪**：刻度环、点阵场、数据波、扫描头、声呐环、卫星点、呼吸核心七层叠加
- 标题逐行擦入（clip-path，980ms，行间 90ms）
- 区块细线从左绘制（900ms）
- 首屏图版视差 + 文案退场（rAF 节流，系数 0.08）
- 流程步骤随滚动标记当前位置
- 遥测标签切换淡出换值再淡入
- 页脚字标从基线下方升起（1200ms）
- 语言切换整页交叉淡化（View Transitions API，不支持时降级为直接切换）
- 强调字上有一层缓慢流动的高光（21s 往返），只在 `background-clip: text` 可用时启用
- 区块细线绘制完成后掠过一道粉色光点；按钮悬停有斜向高光
- `prefers-reduced-motion` 下全部瞬时完成、内容保持可见

## 交互逻辑清单

- 语言切换：`data-i18n` / `data-i18n-html` / `data-i18n-attr` 三种挂载方式，150 条 key 中英对齐
- 导航：锚点滚动 + 当前区块自动标记
- 遥测标签：`role=tablist`，方向键 / Home / End 切换，三组指标与波形同步
- 表单：邮箱校验（必填 / 格式）→ 发送中 → 成功；错误就近显示并 `aria-live` 播报
- 画布：事件视界图版与心电波形，离屏暂停，DPR 上限 2
- 无障碍：跳过链接、焦点环、菜单焦点陷阱 + Esc、`prefers-reduced-motion` 全量降级

## 接入真实表单

`app.js` 中 `initForm()` 内的 `setTimeout` 即提交位置，替换为：

```js
const res = await fetch("/api/introductions", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ email, ref })
});
if (!res.ok) throw new Error("request failed");
```

失败分支已预留文案 `s7.fail`（中英各一份），只需在 `catch` 中输出。
