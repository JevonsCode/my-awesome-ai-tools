import { Tool, Category } from '../types'
import ToolCard from './ToolCard'

interface ToolGridProps {
  tools: Tool[]
  categories: Category[]
  onEdit: (tool: Tool) => void
  onDelete: (id: string) => void
}

export default function ToolGrid({ tools, categories, onEdit, onDelete }: ToolGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool, index) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          categories={categories}
          onEdit={onEdit}
          onDelete={onDelete}
          index={index}
        />
      ))}
    </div>
  )
}
