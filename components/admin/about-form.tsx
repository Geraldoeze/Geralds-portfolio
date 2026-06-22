'use client'

import { upsertAbout } from '@/app/actions/about'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FileUpload from '@/components/file-upload'

interface AboutFormProps {
  initialData?: {
    id: string
    title: string
    content: string
    profileImageUrl?: string
    resumeUrl?: string
    userId: string
    createdAt: Date
    updatedAt: Date
  } | null
}

export default function AboutForm({ initialData }: AboutFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [profileImageUrl, setProfileImageUrl] = useState('')
  const [resumeUrl, setResumeUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      await upsertAbout({
        title: formData.get('title') as string,
        content: formData.get('content') as string,
        profileImageUrl: profileImageUrl || formData.get('profileImageUrl') as string || initialData?.profileImageUrl,
        resumeUrl: resumeUrl || formData.get('resumeUrl') as string || initialData?.resumeUrl,
      })

      setSuccess(true)
      router.refresh()
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-600/20 text-red-300 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 rounded-lg bg-green-600/20 text-green-300 text-sm">
          Saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Title / Headline *
          </label>
          <input
            type="text"
            name="title"
            required
            defaultValue={initialData?.title || ''}
            className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            placeholder="e.g., Senior Frontend Developer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Biography / About Content *
          </label>
          <textarea
            name="content"
            required
            rows={8}
            defaultValue={initialData?.content || ''}
            className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
            placeholder="Write your professional biography..."
          />
        </div>

        <FileUpload
          onUpload={setProfileImageUrl}
          accept="image/*"
          label="Profile Image"
        />
        {(profileImageUrl || initialData?.profileImageUrl) && (
          <p className="text-sm text-green-400">✓ Profile image set</p>
        )}

        <FileUpload
          onUpload={setResumeUrl}
          accept=".pdf,.doc,.docx"
          label="Resume / CV (PDF or DOC)"
        />
        {(resumeUrl || initialData?.resumeUrl) && (
          <p className="text-sm text-green-400">✓ Resume uploaded</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium transition-colors"
        >
          {isLoading ? 'Saving...' : 'Save About Section'}
        </button>
      </form>
    </div>
  )
}
