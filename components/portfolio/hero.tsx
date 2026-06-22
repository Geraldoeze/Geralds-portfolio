'use client'

export default function PortfolioHero({ about }: { about: any }) {
  return (
    <section className="py-20 md:py-32">
      <div className="text-center space-y-6">
        {about?.profileImageUrl && (
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full border-4 border-blue-400 overflow-hidden">
              <img
                src={about.profileImageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
              {about?.title || 'Senior Frontend Developer'}
            </span>
          </h1>
          {about?.content && (
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
              {about.content.split('\n')[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center pt-6">
          <a
            href="#projects"
            className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-semibold"
          >
            View My Work
          </a>
          {about?.resumeUrl && (
            <a
              href={about.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors font-semibold border border-slate-700"
            >
              Download Resume
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
