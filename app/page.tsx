import Link from 'next/link'
import { getProjects } from '@/app/actions/projects'
import { getStacks } from '@/app/actions/stacks'
import { getAbout } from '@/app/actions/about'
import Portfolio from '@/components/portfolio/portfolio'

export const metadata = {
  title: 'Gerald Ezena | Senior Frontend Developer',
  description: 'Senior Frontend Developer specializing in Next.js, React, and modern web applications.',
}

export default async function HomePage() {
  const [projects, stacks, aboutData] = await Promise.all([
    getProjects().catch(() => []),
    getStacks().catch(() => []),
    getAbout().catch(() => null),
  ])

  return (
    <Portfolio
      projects={projects}
      stacks={stacks}
      about={aboutData}
    />
  )
}
