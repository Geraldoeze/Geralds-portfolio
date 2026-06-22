'use client'

export default function PortfolioAbout({ about }: { about: any }) {
  if (!about) return null

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {about.profileImageUrl && (
          <div className="hidden md:block">
            <img
              src={about.profileImageUrl}
              alt="Profile"
              className="rounded-xl border border-slate-700"
            />
          </div>
        )}

        <div className="space-y-6">
          <h2 className="text-4xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              About Me
            </span>
          </h2>

          <div className="prose prose-invert max-w-none">
            {about.content.split('\n').map((paragraph: string, idx: number) => (
              paragraph.trim() && (
                <p key={idx} className="text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              )
            ))}
          </div>

          {about.resumeUrl && (
            <div>
              <a
                href={about.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-semibold"
              >
                Download Full Resume
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
