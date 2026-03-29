import { useState, useEffect } from 'react'
import { X, Link, Tag, FileText, Type, Hash } from 'lucide-react'
import { Tool, Category } from '../types'

interface ToolModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (tool: Tool | Omit<Tool, 'id' | 'addedAt'>) => void
  categories: Category[]
  editingTool: Tool | null
}

const INITIAL_FORM = {
  name: '',
  icon: '◈',
  category: [] as string[],
  description: '',
  url: '',
  tags: [] as string[],
}

export default function ToolModal({ isOpen, onClose, onSubmit, categories, editingTool }: ToolModalProps) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    if (editingTool) {
      setForm({
        name: editingTool.name,
        icon: editingTool.icon,
        category: editingTool.category,
        description: editingTool.description,
        url: editingTool.url,
        tags: editingTool.tags || [],
      })
    } else {
      setForm(INITIAL_FORM)
    }
  }, [editingTool, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingTool) {
      onSubmit({
        ...editingTool,
        ...form,
      })
    } else {
      onSubmit(form)
    }
  }

  const toggleCategory = (id: string) => {
    setForm(prev => ({
      ...prev,
      category: prev.category.includes(id)
        ? prev.category.filter(c => c !== id)
        : [...prev.category, id],
    }))
  }

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }))
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-workstation-900/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg glass-panel rounded-2xl shadow-2xl animate-slide-up max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-workstation-600/50">
          <h2 className="text-xl font-bold text-white">
            {editingTool ? '编辑工具' : '添加新工具'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-workstation-700 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name & Icon */}
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                <Hash className="w-4 h-4 inline mr-1" />
                图标
              </label>
              <input
                type="text"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="input-field w-full text-center"
                maxLength={2}
                required
              />
            </div>
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                <Type className="w-4 h-4 inline mr-1" />
                工具名称
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field w-full"
                placeholder="例如：Claude Code"
                required
              />
            </div>
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              <Link className="w-4 h-4 inline mr-1" />
              链接地址
            </label>
            <input
              type="url"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              className="input-field w-full"
              placeholder="https://..."
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              描述
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input-field w-full h-24 resize-none"
              placeholder="简单描述这个工具的用途..."
              required
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">
              分类（可多选）
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    form.category.includes(cat.id)
                      ? 'text-white'
                      : 'bg-workstation-800 border-workstation-600 text-gray-400 hover:border-gray-500'
                  }`}
                  style={{
                    backgroundColor: form.category.includes(cat.id) ? `${cat.color}30` : undefined,
                    borderColor: form.category.includes(cat.id) ? cat.color : undefined,
                    color: form.category.includes(cat.id) ? cat.color : undefined,
                  }}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              <Tag className="w-4 h-4 inline mr-1" />
              标签
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="input-field flex-1"
                placeholder="输入标签按回车添加"
              />
              <button
                type="button"
                onClick={addTag}
                className="btn-secondary"
              >
                添加
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-neon-green/10 text-neon-green text-sm"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              {editingTool ? '保存修改' : '添加工具'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
