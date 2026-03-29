import { Plus, Search, Package } from 'lucide-react'

interface EmptyStateProps {
  hasTools: boolean
  onAddClick: () => void
}

export default function EmptyState({ hasTools, onAddClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-workstation-800 border border-workstation-600 flex items-center justify-center">
          {hasTools ? (
            <Search className="w-10 h-10 text-gray-500" />
          ) : (
            <Package className="w-10 h-10 text-gray-500" />
          )}
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-green rounded-full animate-pulse" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">
        {hasTools ? '没有找到匹配的工具' : '工具箱还是空的'}
      </h3>
      <p className="text-gray-400 max-w-md mb-8">
        {hasTools
          ? '尝试调整筛选条件或搜索关键词，或者添加新的工具到收藏夹。'
          : '开始构建你的数字工作站吧！添加你常用的开发工具、AI 助手和效率软件。'
        }
      </p>

      <button onClick={onAddClick} className="btn-primary flex items-center gap-2">
        <Plus className="w-5 h-5" />
        {hasTools ? '添加新工具' : '添加第一个工具'}
      </button>
    </div>
  )
}
