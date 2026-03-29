import './index.css'

export interface Tool {
  id: string
  name: string
  icon: string
  category: string[]
  description: string
  url: string
  addedAt: string
  tags?: string[]
}

export type Category = {
  id: string
  name: string
  icon: string
  color: string
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'ai', name: 'AI 工具', icon: '🤖', color: '#a855f7' },
  { id: 'dev', name: '开发工具', icon: '⚡', color: '#00ff88' },
  { id: 'design', name: '设计资源', icon: '🎨', color: '#ff6b35' },
  { id: 'productivity', name: '效率工具', icon: '🚀', color: '#00d4ff' },
  { id: 'mcp', name: 'MCP 服务', icon: '🔌', color: '#fbbf24' },
  { id: 'github', name: 'GitHub 项目', icon: '📦', color: '#f472b6' },
]

export const DEFAULT_TOOLS: Tool[] = [
  {
    id: '1',
    name: 'Claude Code',
    icon: '◈',
    category: ['ai', 'dev'],
    description: 'Anthropic 官方 CLI 编码助手，支持代码编辑、测试运行、Git 操作等',
    url: 'https://github.com/anthropics/claude-code',
    addedAt: new Date().toISOString(),
    tags: ['AI', 'CLI', 'Coding']
  },
  {
    id: '2',
    name: 'cc-switch',
    icon: '⇄',
    category: ['dev'],
    description: 'Claude Code 版本切换工具，方便在不同模型版本间切换',
    url: '#',
    addedAt: new Date().toISOString(),
    tags: ['CLI', 'Utility']
  },
  {
    id: '3',
    name: 'get-shit-done',
    icon: '✓',
    category: ['productivity', 'github'],
    description: '任务管理和生产力工具，帮助保持专注和高效',
    url: 'https://github.com/gsd-build/get-shit-done',
    addedAt: new Date().toISOString(),
    tags: ['Productivity', 'CLI']
  },
  {
    id: '4',
    name: 'MCP Server',
    icon: '🔌',
    category: ['mcp', 'dev'],
    description: 'Model Context Protocol 服务器，扩展 AI 助手功能',
    url: 'https://open.feishu.cn/document/mcp_open_tools/end-user-call-remote-mcp-server',
    addedAt: new Date().toISOString(),
    tags: ['MCP', 'AI']
  },
]
