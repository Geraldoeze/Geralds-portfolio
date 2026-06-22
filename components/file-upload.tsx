'use client'

import { useState, useRef } from 'react'

interface FileUploadProps {
  onUpload: (url: string) => void
  accept?: string
  label?: string
  error?: string
}

export default function FileUpload({
  onUpload,
  accept = 'image/*',
  label = 'Upload Image',
  error,
}: FileUploadProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    setUploadError('')

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File must be less than 5MB')
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload file
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Upload failed')
      }

      const data = await response.json()
      onUpload(data.url)
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed')
      setPreview(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>

      <div
        className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-slate-500 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          disabled={isLoading}
          className="hidden"
        />

        {preview ? (
          <div className="space-y-2">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-32 object-cover rounded mx-auto"
            />
            {isLoading && <p className="text-sm text-slate-400">Uploading...</p>}
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-slate-300">
              {isLoading ? 'Uploading...' : 'Drag and drop or click to select'}
            </p>
            <p className="text-xs text-slate-500">Max 5MB</p>
          </div>
        )}
      </div>

      {(uploadError || error) && (
        <p className="text-sm text-red-400">{uploadError || error}</p>
      )}
    </div>
  )
}
