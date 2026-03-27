'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import { TiltCard } from '@/components/ui/tilt-card'
import Image from 'next/image'

export function Projects({ data }: { data: any[] }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const gradients = [
    'from-cyan-500 to-blue-500',
    'from-purple-500 to-pink-500',
    'from-pink-500 to-rose-500',
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-blue-500',
    'from-cyan-500 to-purple-500',
  ]

  const projects = useMemo(() => {
    return data.map((project, idx) => ({
      ...project,
      gradient: gradients[idx % gradients.length],
      id: idx
    }))
  }, [data])

  // Use requested filters (including new languages)
  const filters = ['All', 'Laravel', 'Next.js', 'React.js', 'HTML', 'CSS', 'Streamlit']

  const filteredProjects = projects.filter(
    (project) => activeFilter === 'All' || project.technologies.includes(activeFilter)
  )

  return (
    <section
      id="work"
      ref={ref}
      className="py-20 md:py-32 px-6 relative overflow-hidden bg-background"
    >
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Featured Work
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : 'bg-slate-900/50 text-gray-400 border border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="h-full"
              >
                <TiltCard className="h-full">
                  <div className="group relative h-full">
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="absolute inset-0 z-20"
                        aria-label={`View ${project.name} project`}
                      />
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                    <div className="relative glass-card p-6 h-full flex flex-col border-white/5 hover:border-white/20">
                      
                      {project.image ? (
                        <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors">
                          <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
                          />
                        </div>
                      ) : (
                        <div className="flex justify-between items-start mb-6">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${project.gradient} bg-opacity-10 backdrop-blur-sm border border-white/10`}>
                            <FolderIcon className="text-white w-6 h-6" />
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                          {project.name}
                        </h3>
                        {project.link && (
                          <div className="text-gray-400 group-hover:text-cyan-400 transition-colors shrink-0 bg-white/5 p-2 rounded-full group-hover:bg-white/10">
                            <ArrowUpRight size={20} />
                          </div>
                        )}
                      </div>

                      <p className="text-gray-400 mb-6 flex-grow line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
                        {project.technologies.slice(0, 4).map((tag: string, i: number) => (
                          <span
                            key={i}
                            className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
    </svg>
  )
}
