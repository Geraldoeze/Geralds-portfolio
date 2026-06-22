'use client'

import Link from 'next/link'
import { useSession } from '@/lib/auth-client'
import PortfolioHero from './hero'
import PortfolioAbout from './about'
import PortfolioProjects from './projects'
import PortfolioStacks from './stacks'
import PortfolioFooter from './footer'

interface PortfolioProps {
  projects: any[]
  stacks: any[]
  about: any
}

export default function Portfolio({ projects, stacks, about }: PortfolioProps) {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Gerald Ezena
            </span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6">
              <a href="#about" className="hover:text-blue-400 transition-colors">
                About
              </a>
              <a href="#projects" className="hover:text-blue-400 transition-colors">
                Projects
              </a>
              <a href="#stacks" className="hover:text-blue-400 transition-colors">
                Tech Stack
              </a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">
                Contact
              </a>
            </nav>
            {session ? (
              <Link
                href="/admin"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-medium"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors font-medium"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-6">
        <PortfolioHero about={about} />
        {about && <PortfolioAbout about={about} />}
        {projects.length > 0 && <PortfolioProjects projects={projects} />}
        {stacks.length > 0 && <PortfolioStacks stacks={stacks} />}
      </main>

      <PortfolioFooter />
    </div>
  )
}
