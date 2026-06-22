'use client'

import { createStack } from '@/app/actions/stacks'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const categories = [
  'Frontend',
  'Backend',
  'Mobile',
  'DevOps',
  'Tools',
  'Databases',
]

const proficiencies = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

export default function StacksForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      await createStack({
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        description: formData.get('description') as string || undefined,
        iconUrl: formData.get('iconUrl') as string || undefined,
        proficiency: formData.get('proficiency') as string,
        featured: formData.get('featured') === 'on',
      })

      e.currentTarget.reset()
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create stack')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Add Tech Stack</h2>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-600/20 text-red-300 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Technology Name *
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            placeholder="e.g., React"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Category *
          </label>
          <select
            name="category"
            required
            className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select category</option>
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
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
            placeholder="Brief description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Icon URL
          </label>
          <input
            type="url"
            name="iconUrl"
            className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Proficiency Level
          </label>
          <select
            name="proficiency"
            defaultValue="Intermediate"
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
            className="rounded"
          />
          <span className="text-sm text-slate-300">Featured</span>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium transition-colors"
        >
          {isLoading ? 'Adding...' : 'Add Stack'}
        </button>
      </form>
    </div>
  )
}
