import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import AuthForm from '@/components/auth-form'

export const metadata = {
  title: 'Sign In | Admin Portfolio',
  description: 'Sign in to your portfolio admin dashboard',
}

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session?.user) {
    redirect('/admin')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-400">Sign in to manage your portfolio</p>
          </div>

          <AuthForm mode="sign-in" />

          <p className="text-center text-sm text-slate-400 mt-6">
            Don&apos;t have an account?{' '}
            <a href="/sign-up" className="text-blue-400 hover:text-blue-300 font-medium">
              Create one
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
