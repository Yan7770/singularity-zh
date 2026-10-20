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

| 令牌 | 值 | 说明 |
| --- | --- | --- |
| `--ink` | `#0B0F10` | 主文字 |
| `--ink-2` | `#33393B` | 次级文字（10.5:1） |
| `--ink-3` | `#5B6366` | 辅助文字（5.53:1，原 `#6D7578` 仅 4.24:1） |
| `--paper` | `#F4F3EF` | 纸底 |
| `--surface` | `#FAF9F5` | 抬升面 |
| `--accent` | `#0C6E63` | 强调（深色区提亮为 `#5CBCAE`） |
| `--d-fast/mid/slow` | `180 / 380 / 720ms` | 动效三档 |
| `--ease` | `cubic-bezier(.22,.61,.36,1)` | 统一缓动 |

深色区块只重声明上述颜色令牌（`.section--dark`），组件本身不写第二套深色规则。

## 字体

只加载拉丁字族：Instrument Serif、Inter（300/400/500）、IBM Plex Mono（400/500）。
中文使用系统字体栈（PingFang SC / Hiragino Sans GB / Microsoft YaHei / Songti SC），不再请求 Noto Serif SC / Noto Sans SC —— 单页站点为此付出的体积代价过高。

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
