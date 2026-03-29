# My Awesome AI Tools

我的数字工作站 - 个人工具箱配置展示网站

![Vite](https://img.shields.io/badge/Vite-5.1.0-646CFF?logo=vite)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-06B6D4?logo=tailwindcss)

## ✨ 特性

- 🎨 **独特的数字工作站美学** - 深色工业风设计，霓虹色点缀
- 🔧 **工具管理** - 添加、编辑、删除你的工具收藏
- 🏷️ **分类系统** - AI、开发、设计、效率、MCP等多维度分类
- 🔍 **智能搜索** - 支持按名称、描述、标签搜索
- 💾 **本地存储** - 数据自动保存到浏览器 localStorage
- 📱 **响应式设计** - 完美适配桌面和移动端

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 🛠️ 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **存储**: LocalStorage

## 📁 项目结构

```
src/
├── components/
│   ├── Header.tsx       # 顶部导航
│   ├── Hero.tsx         # 英雄区域
│   ├── CategoryFilter.tsx # 分类筛选
│   ├── ToolGrid.tsx     # 工具网格
│   ├── ToolCard.tsx     # 工具卡片
│   ├── ToolModal.tsx    # 添加/编辑弹窗
│   └── EmptyState.tsx   # 空状态
├── hooks/
│   └── useLocalStorage.ts # 本地存储钩子
├── types.ts             # TypeScript 类型定义
├── App.tsx              # 主应用组件
└── index.css            # 全局样式
```

## 🎨 设计灵感

- 设计风格参考 [mcpservers.org](https://mcpservers.org/zh-CN/agent-skills)
- 采用深色主题 + 霓虹绿/蓝/橙配色方案
- 等宽字体 Space Grotesk + JetBrains Mono 组合

## 📝 License

MIT License
