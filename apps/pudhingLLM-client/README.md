# LLM交互页面 Demo

## 技术栈
- 前端框架：Vue3 + Vite
- 状态管理：Pinia
- 样式框架：Tailwind CSS
- 单元测试：Vitest
- 其他： ESLint + Husky + lint-staged
- 后端服务：Express（可选）

## 功能模块

### 已完成功能
1. LLM交互模拟
   - 用户输入问题
   - LLM生成回答

### 待开发功能
1. 多轮对话支持
2. 上下文记忆功能
3. 用户输入历史记录
4. LLM回答历史记录

## 开发环境配置

### 依赖安装
```
# 安装前端依赖 后端依赖需要进入到server文件夹内安装
pnpm install
```
### 运行指令
```
# 启动前端开发环境
pnpm dev

# 启动完整开发环境（包含后端）
pnpm total

# 代码质量检查
pnpm lint

# 单元测试
pnpm test
```
## 接口配置说明
使用豆包大模型接口（需替换为实际接口）
接口配置文件路径：server/index.js
请将大模型接口地址替换为自己的接口地址

## 注意事项
项目依赖Node.js >=16.0.0
建议使用pnpm作为包管理工具
后端服务默认监听5173端口
后端服务默认监听3000端口
