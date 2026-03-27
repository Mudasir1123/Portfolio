'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import { Clock, FolderGit2, Trophy } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/animated-counter'

export function About({ data }: { data: any }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 md:py-32 px-6 relative overflow-hidden bg-gradient-to-b from-black via-slate-950 to-slate-900"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4">
                {data.summary.split('\n\n').map((paragraph: string, idx: number) => (
                  <p key={idx} className="text-gray-300 text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-75" />
              <div className="relative bg-slate-900/80 backdrop-blur border border-cyan-500/30 rounded-2xl p-8 space-y-6">
                <div>
                  <h3 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                    Core Expertise
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Full-Stack Web Development (Next.js, React, Node.js)</li>
                    <li>• 3D Graphics & WebGL (Three.js, Babylon.js)</li>
                    <li>• UI/UX Design & Animation</li>
                    <li>• Database Design & Optimization</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full" />
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.frontend.concat(data.skills['3d']).slice(0, 8).map(
                      (tech: string) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-300 text-sm"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Performance Counters */}
          <motion.div 
            variants={itemVariants} 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            <AnimatedCounter 
              value={1} 
              suffix="+" 
              label="Year Experience" 
              icon={Clock} 
            />
            <AnimatedCounter 
              value={data.projects?.length || 20} 
              suffix="+" 
              label="Projects Completed" 
              icon={FolderGit2} 
            />
            <AnimatedCounter 
              value={data.achievements?.length || 5} 
              suffix="+" 
              label="Awards & Achievements" 
              icon={Trophy} 
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
