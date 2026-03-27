'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import { TiltCard } from '@/components/ui/tilt-card'

export function Skills({ data }: { data: any }) {
  const skillCategories = [
    {
      category: 'Frontend',
      color: 'from-cyan-400 to-blue-400',
      skills: data.frontend,
    },
    {
      category: 'Backend',
      color: 'from-purple-400 to-pink-400',
      skills: data.backend,
    },
    {
      category: '3D & Graphics',
      color: 'from-pink-400 to-rose-400',
      skills: data['3d'],
    },
    {
      category: 'Tools & DevOps',
      color: 'from-blue-400 to-cyan-400',
      skills: data.tools,
    },
  ]
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      id="skills"
      ref={ref}
      className="py-20 md:py-32 px-6 relative overflow-hidden bg-gradient-to-b from-slate-900 via-black to-slate-950"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Skills & Expertise
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, idx) => (
              <TiltCard key={idx}>
                <motion.div
                  variants={itemVariants}
                  className="group relative h-full"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                  <div className="relative h-full glass-card p-8 border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col">
                    <h3 className={`text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-6 pb-4 border-b border-white/10 group-hover:border-white/30 transition-colors`}>
                      {category.category}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 flex-1 content-start">
                      {category.skills.map((skill: string, i: number) => (
                        <div
                          key={i}
                          className="relative overflow-hidden bg-slate-900/40 border border-white/5 rounded-lg px-4 py-3 text-center text-gray-300 hover:text-white transition-colors duration-300 group/skill"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover/skill:opacity-20 transition-opacity duration-300`} />
                          <span className="relative z-10 text-sm font-medium">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
