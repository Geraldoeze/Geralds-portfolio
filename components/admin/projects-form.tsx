'use client'

import { createProject } from '@/app/actions/projects'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FileUpload from '@/components/file-upload'

export default function ProjectsForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const technologies = formData.get('technologies')
        ? (formData.get('technologies') as string).split(',').map(t => t.trim())
        : []

      await createProject({
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        shortDescription: formData.get('shortDescription') as string || undefined,
        imageUrl: imageUrl || formData.get('imageUrl') as string || undefined,
        technologies,
        projectUrl: formData.get('projectUrl') as string || undefined,
        gitUrl: formData.get('gitUrl') as string || undefined,
      })

      e.currentTarget.reset()
      setImageUrl('')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Add New Project</h2>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-600/20 text-red-300 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Title *
          </label>
          <input
            type="text"
            name="title"
            required
            className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            placeholder="Project title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            required
            rows={4}
            className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            placeholder="Detailed description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Short Description
          </label>
          <input
            type="text"
            name="shortDescription"
            className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            placeholder="Brief one-liner"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Technologies (comma-separated)
          </label>
          <input
            type="text"
            name="technologies"
            className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            placeholder="React, Next.js, TypeScript"
          />
        </div>

        <div>
          <FileUpload
            onUpload={setImageUrl}
            label="Project Image"
          />
          {imageUrl && (
            <p className="text-sm text-green-400 mt-2">✓ Image uploaded</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Project URL
            </label>
            <input
              type="url"
              name="projectUrl"
              className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              name="gitUrl"
              className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              placeholder="https://..."
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium transition-colors"
        >
          {isLoading ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </div>
  )
}
