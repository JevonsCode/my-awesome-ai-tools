import { ExternalLink, Edit2, Trash2 } from 'lucide-react'
import { Tool, Category } from '../types'

interface ToolCardProps {
  tool: Tool
  categories: Category[]
  onEdit: (tool: Tool) => void
  onDelete: (id: string) => void
  index: number
}

export default function ToolCard({ tool, categories, onEdit, onDelete, index }: ToolCardProps) {
  const toolCategories = categories.filter(c => tool.category.includes(c.id))

  const getCategoryColor = (catId: string) => {
    const cat = categories.find(c => c.id === catId)
    return cat?.color || '#00ff88'
  }

  return (
    <div
      className="glass-panel rounded-xl p-6 card-hover group relative overflow-hidden"
      style={{
        animationDelay: `${index * 50}ms`,
        animation: 'slideUp 0.4s ease-out forwards',
        opacity: 0,
      }}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${getCategoryColor(tool.category[0])}10, transparent 70%)`,
          }}
        />
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold"
            style={{
              backgroundColor: `${getCategoryColor(tool.category[0])}20`,
              color: getCategoryColor(tool.category[0]),
              textShadow: `0 0 10px ${getCategoryColor(tool.category[0])}40`,
            }}
          >
            {tool.icon}
          </div>
          <div>
            <h3 className="font-bold text-white text-lg leading-tight">{tool.name}</h3>
            <p className="text-xs text-gray-500 font-mono">
              {new Date(tool.addedAt).toLocaleDateString('zh-CN')}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(tool)}
            className="p-2 rounded-lg hover:bg-workstation-600 text-gray-400 hover:text-white transition-colors"
            title="编辑"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(tool.id)}
            className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
            title="删除"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{tool.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {toolCategories.map(cat => (
          <span
            key={cat.id}
            className="tag-pill"
            style={{
              borderColor: `${cat.color}40`,
              color: cat.color,
            }}
          >
            {cat.icon} {cat.name}
          </span>
        ))}
        {tool.tags?.map(tag => (
          <span key={tag} className="tag-pill text-gray-400 border-workstation-600">
            #{tag}
          </span>
        ))}
      </div>

      {/* Link */}
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg
                   bg-workstation-700 hover:bg-workstation-600 text-gray-300 hover:text-white
                   transition-all duration-200 text-sm font-medium group/link"
      >
        <span>访问网站</span>
        <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  )
}
