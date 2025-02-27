# PudhingLLM Server

## 项目简介

PudhingLLM Server 是一个基于 NestJS 框架开发的 LLM (Large Language Model) 服务端应用，提供了与大语言模型交互的 API 接口服务。

## 技术栈

- 框架：NestJS
- 数据库：Prisma ORM
- API风格：RESTful
- 实时通信：Server-Sent Events (SSE)

## 核心功能

### 1. 助手管理
- 获取助手列表
- 支持多种类型助手（DeepSeek-R1、Doubao-DeepSeek-R1）
- 助手配置管理（提示词、类型等）

### 2. 对话历史
- 存储用户与助手的对话记录
- 支持按助手ID查询历史记录
- 历史记录包含角色信息和详细内容

### 3. LLM 接口集成
- 支持多个 LLM 模型接入
- 支持流式响应
- 统一的错误处理机制
