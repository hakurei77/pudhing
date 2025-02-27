# PudhingLLM Client

## 项目简介

PudhingLLM Client 是一个基于 Vue3 开发的 LLM 交互界面，为用户提供了友好的大语言模型对话体验。该项目采用现代前端技术栈，实现了流畅的用户交互和实时对话功能。

## 技术栈

- 前端框架：Vue3 + Vite
- 状态管理：Pinia
- 样式框架：Tailwind CSS
- 单元测试：Vitest
- 代码规范：ESLint + Husky + lint-staged

## 核心功能

### 1. 助手列表
- 展示所有可用的 AI 助手
- 支持助手类型筛选
- 助手详情信息展示

### 2. 对话界面
- 实时对话交互
- 流式响应显示
- 多轮对话支持
- 对话历史记录

### 3. 用户体验
- 响应式布局设计
- 实时输入反馈
- 错误提示处理
- 加载状态展示

## 项目结构

```plaintext
src/
├── api/          # API 接口定义
├── assets/       # 静态资源
├── components/   # 组件
├── router/       # 路由配置
├── store/        # 状态管理
├── utils/        # 工具函数
└── App.vue       # 根组件