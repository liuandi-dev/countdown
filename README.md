# ⏳ 春招倒计时墙

> 100 项目挑战 · 项目 #008 · 2026-10-15

Andy 的 2027 春招冲刺倒计时页：7 个关键里程碑自动计算剩余天数，按紧急度变色（≤30 天红 / ≤60 天橙 / 更远蓝 / 已达成绿），底部带 100 项目挑战进度条。

## 文件结构

```
countdown/
├── index.html   页面结构
├── style.css    样式（主题色、卡片、进度条）
└── script.js    逻辑（事件清单 + 倒计时计算，改事件只动这里）
```

## 怎么改

- **加/改事件**：编辑 `script.js` 顶部的 `EVENTS` 数组，一行一个事件
- **更新挑战进度**：改 `CHALLENGE_DONE` 数字

## 本地预览

双击 `index.html` 即可。

## 在线地址

部署在 GitHub Pages：https://liuandi-dev.github.io/countdown/
