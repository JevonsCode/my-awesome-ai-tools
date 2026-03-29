import { Search, X } from 'lucide-react'
import { Category } from '../types'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  resultCount: number
}

export default function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  resultCount,
}: CategoryFilterProps) {
  const toggleCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      onCategoryChange(selectedCategories.filter(c => c !== id))
    } else {
      onCategoryChange([...selectedCategories, id])
    }
  }

  const clearFilters = () => {
    onCategoryChange([])
    onSearchChange('')
  }

  const hasActiveFilters = selectedCategories.length > 0 || searchQuery

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="搜索工具、描述或标签..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-field w-full pl-12 pr-4"
          />
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="btn-secondary flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            清除筛选
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.id)
          return (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-200 border ${
                isSelected
                  ? `bg-${category.color}/20 border-[${category.color}] text-white shadow-[0_0_15px_${category.color}40]`
                  : 'bg-workstation-800 border-workstation-600 text-gray-400 hover:border-gray-500 hover:text-gray-300'
              }`}
              style={{
                backgroundColor: isSelected ? `${category.color}20` : undefined,
                borderColor: isSelected ? category.color : undefined,
                boxShadow: isSelected ? `0 0 15px ${category.color}40` : undefined,
              }}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          )
        })}
      </div>

      {/* Result Count */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-gray-500">
          显示 <span className="text-neon-green font-mono font-bold">{resultCount}</span> 个工具
          {hasActiveFilters && ' (已筛选)'}
        </p>
      </div>
    </div>
  )
}
