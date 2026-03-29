import { Plus, Command, Zap } from 'lucide-react'

interface HeaderProps {
  onAddClick: () => void
}

export default function Header({ onAddClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center bg-workstation-700 rounded-lg border border-neon-green/30 animate-pulse-glow">
              <Command className="w-5 h-5 text-neon-green" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-neon-green rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">
                <span className="text-neon-green">WS</span>
                <span className="text-gray-400">.DEV</span>
              </h1>
              <p className="text-xs text-gray-500 font-mono">v2.0.0</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
              <Zap className="w-4 h-4 text-neon-orange" />
              工具箱
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              分类
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              统计
            </a>
          </nav>

          {/* Add Button */}
          <button
            onClick={onAddClick}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">添加工具</span>
          </button>
        </div>
      </div>
    </header>
  )
}
