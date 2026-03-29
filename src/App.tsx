import { useState, useMemo } from 'react'
import { Tool, Category, DEFAULT_CATEGORIES, DEFAULT_TOOLS } from './types'
import Header from './components/Header'
import Hero from './components/Hero'
import CategoryFilter from './components/CategoryFilter'
import ToolGrid from './components/ToolGrid'
import ToolModal from './components/ToolModal'
import EmptyState from './components/EmptyState'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [tools, setTools] = useLocalStorage<Tool[]>('workstation-tools', DEFAULT_TOOLS)
  const [categories] = useState<Category[]>(DEFAULT_CATEGORIES)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTool, setEditingTool] = useState<Tool | null>(null)

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategories.length === 0 ||
                             tool.category.some(cat => selectedCategories.includes(cat))

      return matchesSearch && matchesCategory
    })
  }, [tools, searchQuery, selectedCategories])

  const handleSubmit = (tool: Tool | Omit<Tool, 'id' | 'addedAt'>) => {
    if ('id' in tool && tool.id) {
      // Edit existing tool
      setTools(tools.map(t => t.id === tool.id ? tool as Tool : t))
    } else {
      // Add new tool
      const newTool: Tool = {
        ...(tool as Omit<Tool, 'id' | 'addedAt'>),
        id: crypto.randomUUID(),
        addedAt: new Date().toISOString(),
      }
      setTools([...tools, newTool])
    }
    setEditingTool(null)
    setIsModalOpen(false)
  }

  const handleDeleteTool = (id: string) => {
    setTools(tools.filter(t => t.id !== id))
  }

  const openAddModal = () => {
    setEditingTool(null)
    setIsModalOpen(true)
  }

  const openEditModal = (tool: Tool) => {
    setEditingTool(tool)
    setIsModalOpen(true)
  }

  const stats = {
    total: tools.length,
    categories: categories.length,
    recent: tools.filter(t => {
      const added = new Date(t.addedAt)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return added > weekAgo
    }).length,
  }

  return (
    <div className="min-h-screen bg-workstation-900 bg-grid scanline">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />
      </div>

      <Header onAddClick={openAddModal} />

      <main className="relative z-10">
        <Hero stats={stats} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            resultCount={filteredTools.length}
          />

          {filteredTools.length > 0 ? (
            <ToolGrid
              tools={filteredTools}
              categories={categories}
              onEdit={openEditModal}
              onDelete={handleDeleteTool}
            />
          ) : (
            <EmptyState
              hasTools={tools.length > 0}
              onAddClick={openAddModal}
            />
          )}
        </div>
      </main>

      <footer className="border-t border-workstation-600/50 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p className="font-mono">
            <span className="text-neon-green">⬢</span> My Digital Workstation
            <span className="mx-2">•</span>
            Built with React + Tailwind
          </p>
        </div>
      </footer>

      <ToolModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingTool(null)
        }}
        onSubmit={handleSubmit}
        categories={categories}
        editingTool={editingTool}
      />
    </div>
  )
}

export default App
