'use client'

import { getProjectById, updateProject } from '@/app/actions/projects'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface ProjectEditModalProps {
  projectId: string
  onClose: () => void
}

export default function ProjectEditModal({ projectId, onClose }: ProjectEditModalProps) {
  const router = useRouter()
  const [project, setProject] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await getProjectById(projectId)
        setProject(data)
      } catch (err) {
        setError('Failed to load project')
      } finally {
        setIsLoading(false)
      }
    }

    loadProject()
  }, [projectId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsSaving(true)

    try {
      const formData = new FormData(e.currentTarget)
      const technologies = formData.get('technologies')
        ? (formData.get('technologies') as string).split(',').map(t => t.trim())
        : []

      await updateProject(projectId, {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        shortDescription: formData.get('shortDescription') as string || undefined,
        imageUrl: formData.get('imageUrl') as string || undefined,
        technologies,
        projectUrl: formData.get('projectUrl') as string || undefined,
        gitUrl: formData.get('gitUrl') as string || undefined,
        featured: formData.get('featured') === 'on',
      })

      router.refresh()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project')
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

  if (!project) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Edit Project</h2>
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
              Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={project.title}
              className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={project.description}
              rows={4}
              className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Short Description
            </label>
            <input
              type="text"
              name="shortDescription"
              defaultValue={project.shortDescription || ''}
              className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Technologies
            </label>
            <input
              type="text"
              name="technologies"
              defaultValue={project.technologies?.join(', ') || ''}
              className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              defaultValue={project.imageUrl || ''}
              className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Project URL
              </label>
              <input
                type="url"
                name="projectUrl"
                defaultValue={project.projectUrl || ''}
                className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                GitHub URL
              </label>
              <input
                type="url"
                name="gitUrl"
                defaultValue={project.gitUrl || ''}
                className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={project.featured}
              className="rounded"
            />
            <span className="text-sm text-slate-300">Featured project</span>
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
