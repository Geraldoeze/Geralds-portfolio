'use client'

import { getStackById, updateStack } from '@/app/actions/stacks'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface StackEditModalProps {
  stackId: string
  onClose: () => void
}

const categories = [
  'Frontend',
  'Backend',
  'Mobile',
  'DevOps',
  'Tools',
  'Databases',
]

const proficiencies = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

export default function StackEditModal({ stackId, onClose }: StackEditModalProps) {
  const router = useRouter()
  const [stack, setStack] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadStack = async () => {
      try {
        const data = await getStackById(stackId)
        setStack(data)
      } catch (err) {
        setError('Failed to load stack')
      } finally {
        setIsLoading(false)
      }
    }

    loadStack()
  }, [stackId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsSaving(true)

    try {
      const formData = new FormData(e.currentTarget)

      await updateStack(stackId, {
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        description: formData.get('description') as string || undefined,
        iconUrl: formData.get('iconUrl') as string || undefined,
        proficiency: formData.get('proficiency') as string,
        featured: formData.get('featured') === 'on',
      })

      router.refresh()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update stack')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-slate-800 rounded-xl p-6 text-white">Loading...</div>
      </div>
    )
  }

  if (!stack) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl max-w-xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Edit Stack</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-600/20 text-red-300 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={stack.name}
              className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Category
            </label>
            <select
              name="category"
              defaultValue={stack.category}
              className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:border-blue-500 focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={stack.description || ''}
              rows={3}
              className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:border-blue-500 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Icon URL
            </label>
            <input
              type="url"
              name="iconUrl"
              defaultValue={stack.iconUrl || ''}
              className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Proficiency
            </label>
            <select
              name="proficiency"
              defaultValue={stack.proficiency}
              className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:border-blue-500 focus:outline-none"
            >
              {proficiencies.map((prof) => (
                <option key={prof} value={prof}>
                  {prof}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={stack.featured}
              className="rounded"
            />
            <span className="text-sm text-slate-300">Featured</span>
          </label>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium transition-colors"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
