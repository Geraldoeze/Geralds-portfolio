import { getProjects } from '@/app/actions/projects'
import ProjectsList from '@/components/admin/projects-list'
import ProjectsForm from '@/components/admin/projects-form'
import { Suspense } from 'react'

export const metadata = {
  title: 'Projects | Admin Portfolio',
}

async function ProjectsContent() {
  const projects = await getProjects()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Projects</h1>
        <p className="text-slate-400">Manage your portfolio projects and work experience.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProjectsList projects={projects} />
        </div>
        <div>
          <ProjectsForm />
        </div>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  )
}
