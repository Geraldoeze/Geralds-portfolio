import { getProjects } from '@/actions/projects'
import { getStacks } from '@/actions/stacks'
import { getAbout } from '@/actions/about'
import Link from 'next/link'

export const metadata = {
  title: 'Dashboard | Admin Portfolio',
}

export default async function AdminDashboard() {
  const [projects, stacks, aboutData] = await Promise.all([
    getProjects(),
    getStacks(),
    getAbout(),
  ])

  const stats = [
    { label: 'Projects', value: projects.length, href: '/admin/projects', color: 'from-blue-600 to-blue-700' },
    { label: 'Tech Stacks', value: stacks.length, href: '/admin/stacks', color: 'from-purple-600 to-purple-700' },
    { label: 'About', value: aboutData ? '✓' : '○', href: '/admin/about', color: 'from-green-600 to-green-700' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Welcome back! Manage your portfolio content here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link key={stat.href} href={stat.href}>
            <div className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white cursor-pointer hover:shadow-lg transition-shadow h-full`}>
              <p className="text-slate-200 text-sm font-medium mb-2">{stat.label}</p>
              <p className="text-4xl font-bold">{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/projects?action=new"
            className="bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/50 rounded-lg p-4 transition-colors text-blue-400 font-medium"
          >
            + Add New Project
          </Link>
          <Link
            href="/admin/stacks?action=new"
            className="bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/50 rounded-lg p-4 transition-colors text-purple-400 font-medium"
          >
            + Add Tech Stack
          </Link>
          <Link
            href="/admin/about"
            className="bg-green-600/10 hover:bg-green-600/20 border border-green-500/50 rounded-lg p-4 transition-colors text-green-400 font-medium"
          >
            Edit About Section
          </Link>
        </div>
      </div>
    </div>
  )
}
