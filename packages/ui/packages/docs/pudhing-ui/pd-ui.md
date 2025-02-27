# Pudhing UI

## 项目简介

Pudhing UI 是一个基于 Vue3 + TypeScript 开发的现代化 UI 组件库，旨在提供高质量、可定制的组件解决方案。

## 技术栈

- 核心框架：Vue 3
- 开发语言：TypeScript
- 构建工具：Vite
- 包管理器：pnpm
- 代码规范：ESLint
- 单元测试：Vitest
- 文档工具：VitePress

## 项目结构

```plaintext
packages/
├── components/     # 组件源码
├── core/          # 核心模块
├── docs/          # 文档
├── hooks/         # 组合式函数
├── play/          # 开发调试
├── theme/         # 主题样式
└── utils/         # 工具函数
```

## 快速开始
需要提前安装tailwindcss
### 安装
```bash
pnpm add pudhing-ui
 ```

### 全局引入
```typescript
import { createApp } from 'vue'
import PudhingUI from 'pudhing-ui'
import 'pudhing-ui/dist/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(PudhingUI)
app.mount('#app')
 ```

### 按需引入