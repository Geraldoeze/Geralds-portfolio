import { getStacks } from '@/app/actions/stacks'
import StacksList from '@/components/admin/stacks-list'
import StacksForm from '@/components/admin/stacks-form'
import { Suspense } from 'react'

export const metadata = {
  title: 'Tech Stacks | Admin Portfolio',
}

async function StacksContent() {
  const stacksList = await getStacks()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Tech Stacks</h1>
        <p className="text-slate-400">Manage technologies and frameworks you work with.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StacksList stacks={stacksList} />
        </div>
        <div>
          <StacksForm />
        </div>
      </div>
    </div>
  )
}

export default function StacksPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <StacksContent />
    </Suspense>
  )
}
