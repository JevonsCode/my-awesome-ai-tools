import { useEffect, useState } from 'react'
import { Box, Layers, Clock, Sparkles } from 'lucide-react'

interface HeroProps {
  stats: {
    total: number
    categories: number
    recent: number
  }
}

export default function Hero({ stats }: HeroProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-green/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-workstation-800 border border-neon-green/30 text-sm text-neon-green mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="font-mono">个人工具库</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">我的</span>
            <span className="text-gradient"> 数字工作站</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            精心整理的开发者工具集，记录每一个提升效率的神器
            <br className="hidden md:block" />
            <span className="text-neon-green font-mono">{stats.total}</span> 个工具，
            <span className="text-neon-blue font-mono"> {stats.categories}</span> 个分类
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-lg mx-auto">
            <div className="glass-panel rounded-xl p-4 md:p-6 card-hover">
              <Box className="w-6 h-6 text-neon-green mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-bold text-white font-mono">{stats.total}</p>
              <p className="text-xs text-gray-500">工具总数</p>
            </div>
            <div className="glass-panel rounded-xl p-4 md:p-6 card-hover">
              <Layers className="w-6 h-6 text-neon-blue mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-bold text-white font-mono">{stats.categories}</p>
              <p className="text-xs text-gray-500">分类数量</p>
            </div>
            <div className="glass-panel rounded-xl p-4 md:p-6 card-hover">
              <Clock className="w-6 h-6 text-neon-orange mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-bold text-white font-mono">{stats.recent}</p>
              <p className="text-xs text-gray-500">本周新增</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
