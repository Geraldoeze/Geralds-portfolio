import { getAbout } from '@/app/actions/about'
import AboutForm from '@/components/admin/about-form'
import { Suspense } from 'react'

export const metadata = {
  title: 'About | Admin Portfolio',
}

async function AboutContent() {
  const aboutData = await getAbout()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">About Section</h1>
        <p className="text-slate-400">Update your professional profile and biography.</p>
      </div>

      <div className="max-w-2xl">
        <AboutForm initialData={aboutData} />
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <AboutContent />
    </Suspense>
  )
}
