'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { useState } from 'react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/projects', label: 'Projects', icon: '💼' },
  { href: '/admin/about', label: 'About', icon: '👤' },
  { href: '/admin/stacks', label: 'Tech Stacks', icon: '⚙️' },
]

export default function AdminNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    await authClient.signOut()
    window.location.href = '/sign-in'
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-800 text-white"
      >
        ☰
      </button>

      {/* Sidebar */}
      <nav
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:static w-64 h-screen bg-slate-900 border-r border-slate-800 transition-transform duration-300 z-40 flex flex-col`}
      >
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-white">Portfolio CMS</h1>
          <p className="text-sm text-slate-400 mt-1">Admin Dashboard</p>
        </div>

        <div className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-3 rounded-lg bg-red-600/10 text-red-400 hover:bg-red-600/20 transition-colors font-medium"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
