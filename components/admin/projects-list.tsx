'use client'

import { deleteProject } from '@/app/actions/projects'
import { useState } from 'react'
import ProjectEditModal from './project-edit-modal'

interface Project {
  id: string
  title: string
  description: string
  shortDescription?: string
  imageUrl?: string
  technologies?: string[]
  startDate?: Date
  endDate?: Date
  projectUrl?: string
  gitUrl?: string
  featured: boolean
  order: number
  userId: string
  createdAt: Date
  updatedAt: Date
}

interface ProjectsListProps {
  projects: Project[]
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? This cannot be undone.')) return
    setIsDeleting(id)
    try {
      await deleteProject(id)
    } finally {
      setIsDeleting(null)
    }
  }

  if (projects.length === 0) {
    return (
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 text-center">
        <p className="text-slate-400">No projects yet. Create your first one to get started!</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white truncate">{project.title}</h3>
                  {project.featured && (
                    <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-400 line-clamp-2 mb-2">
                  {project.shortDescription || project.description}
                </p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-slate-400">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingId(project.id)}
                  className="px-3 py-2 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  disabled={isDeleting === project.id}
                  className="px-3 py-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  {isDeleting === project.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingId && (
        <ProjectEditModal
          projectId={editingId}
          onClose={() => setEditingId(null)}
        />
      )}
    </>
  )
}
