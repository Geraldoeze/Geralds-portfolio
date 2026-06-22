'use client'

export default function PortfolioProjects({ projects }: { projects: any[] }) {
  if (!projects.length) return null

  const featured = projects.filter(p => p.featured).slice(0, 3)
  const displayProjects = featured.length > 0 ? featured : projects.slice(0, 6)

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="space-y-12">
        <h2 className="text-4xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Featured Projects
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-all hover:shadow-xl"
            >
              {project.imageUrl && (
                <div className="h-48 bg-slate-700 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 line-clamp-3">
                    {project.shortDescription || project.description}
                  </p>
                </div>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="text-xs bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-center font-medium text-sm"
                    >
                      View Project
                    </a>
                  )}
                  {project.gitUrl && (
                    <a
                      href={project.gitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors text-center font-medium text-sm"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
