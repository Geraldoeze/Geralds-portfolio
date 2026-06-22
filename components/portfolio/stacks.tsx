'use client'

export default function PortfolioStacks({ stacks }: { stacks: any[] }) {
  if (!stacks.length) return null

  const groupedByCategory = stacks.reduce(
    (acc, stack) => {
      if (!acc[stack.category]) acc[stack.category] = []
      acc[stack.category].push(stack)
      return acc
    },
    {} as Record<string, typeof stacks>
  )

  return (
    <section id="stacks" className="py-20 md:py-28">
      <div className="space-y-12">
        <h2 className="text-4xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Tech Stack
          </span>
        </h2>

        <div className="space-y-12">
          {Object.entries(groupedByCategory).map(([category, categoryStacks]) => (
            <div key={category}>
              <h3 className="text-2xl font-semibold text-white mb-6">{category}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categoryStacks.map((stack) => (
                  <div
                    key={stack.id}
                    className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors text-center"
                  >
                    {stack.iconUrl && (
                      <div className="mb-3">
                        <img
                          src={stack.iconUrl}
                          alt={stack.name}
                          className="w-12 h-12 mx-auto"
                        />
                      </div>
                    )}
                    <h4 className="font-semibold text-white mb-1">{stack.name}</h4>
                    <p className="text-xs text-slate-400">
                      {stack.proficiency}
                    </p>
                    {stack.description && (
                      <p className="text-xs text-slate-400 mt-2">
                        {stack.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
