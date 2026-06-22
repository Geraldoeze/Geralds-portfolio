import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import AuthForm from '@/components/auth-form'

export const metadata = {
  title: 'Sign Up | Admin Portfolio',
  description: 'Create your portfolio admin account',
}

export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session?.user) {
    redirect('/admin')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Get Started</h1>
            <p className="text-slate-400">Create your portfolio admin account</p>
          </div>

          <AuthForm mode="sign-up" />

          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{' '}
            <a href="/sign-in" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
