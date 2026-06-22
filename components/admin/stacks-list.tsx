'use client'

import { deleteStack } from '@/app/actions/stacks'
import { useState } from 'react'
import StackEditModal from './stack-edit-modal'

interface Stack {
  id: string
  name: string
  category: string
  description?: string
  iconUrl?: string
  proficiency: string
  featured: boolean
  order: number
  userId: string
  createdAt: Date
  updatedAt: Date
}

interface StacksListProps {
  stacks: Stack[]
}

export default function StacksList({ stacks }: StacksListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this stack?')) return
    setIsDeleting(id)
    try {
      await deleteStack(id)
    } finally {
      setIsDeleting(null)
    }
  }

  if (stacks.length === 0) {
    return (
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 text-center">
        <p className="text-slate-400">No tech stacks yet. Add your first one!</p>
      </div>
    )
  }

  const groupedByCategory = stacks.reduce(
    (acc, stack) => {
      if (!acc[stack.category]) acc[stack.category] = []
      acc[stack.category].push(stack)
      return acc
    },
    {} as Record<string, Stack[]>
  )

  return (
    <>
      <div className="space-y-6">
        {Object.entries(groupedByCategory).map(([category, categoryStacks]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-white mb-3">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryStacks.map((stack) => (
                <div
                  key={stack.id}
                  className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white">{stack.name}</h4>
                        {stack.featured && (
                          <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">
                        Proficiency: {stack.proficiency}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setEditingId(stack.id)}
                        className="p-1 rounded text-blue-400 hover:bg-blue-600/20 transition-colors"
                        title="Edit"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => handleDelete(stack.id)}
                        disabled={isDeleting === stack.id}
                        className="p-1 rounded text-red-400 hover:bg-red-600/20 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                  {stack.description && (
                    <p className="text-sm text-slate-400">{stack.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {editingId && (
        <StackEditModal
          stackId={editingId}
          onClose={() => setEditingId(null)}
        />
      )}
    </>
  )
}
