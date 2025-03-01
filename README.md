# Pudhing Project

这是一个基于 Turborepo 构建的大语言模型应用项目，采用 monorepo 架构进行管理。

## 项目结构

```plaintext
Pudhing/
├── apps/                    # 应用程序
│   ├── pudhingLLM-client/  # 前端应用
│   └── pudhingLLM-server/  # 后端服务
└── packages/               # 共享包
    ├── ui/                # UI 组件库
    └─── eslint-config/    # ESLint 配置
```

## 技术栈

### ✨前端 (pudhingLLM-client)

- Vue3 + Vite
- Pinia 状态管理
- Tailwind CSS
- Vitest 单元测试
- ESLint + Husky + lint-staged

### ⚙️后端 (pudhingLLM-server)

- Nest.js + Prisma
- ESLint + Husky + lint-staged
- 数据库 (MySQL)

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- pnpm 包管理器

### 安装依赖
```bash
pnpm install
 ```

### 配置env
#### 前端
```bash
cp .env.development
cp .env.production
```
#### 样例

```env
NODE_ENV='development'
VITE_APP_API_URL='http://localhost:****/****'
```

#### 后端
```bash
cp .env.development
cp .env.production
```
#### 样例

```env
NODE_ENV="development"
DATABASE_URL="mysql://root:******@localhost:****/****"

Doubao_DeepSeek_R1_TOKEN="********" //大模型token
Doubao_DeepSeek_R1_MODEL="********" //大模型model
Doubao_DeepSeek_R1_API_URL="******" //大模型api

DeepSeek_R1_TOKEN="*******"
DeepSeek_R1_API_URL="*****"
DeepSeek_R1_MODEL="*******"
```
### 数据库迁移(进入到app/pudhingLLM-server目录下)
```bash
pnpm run migrate:local

```
### 启动项目

#### turbo
```bash
pnpm run dev   //同时运行前端、后端、ui组件库
pnpm run dev:local   //同时运行前端（本地）、后端（本地）
```

#### 前端
```bash
pnpm run dev    //执行--production.env
pnpm run dev:local    //执行--development.env
```

#### 后端
默认端口号为：7422
```bash
pnpm run dev    //执行--production.env
pnpm run dev:local    //执行--development.env
```

#### ui组件库
```bash
pnpm run dev    //执行组件试验田
pnpm doce:dev   //执行组件文档
```

## 贡献

欢迎提交 Pull Request 或 Issue，共同改进项目。
