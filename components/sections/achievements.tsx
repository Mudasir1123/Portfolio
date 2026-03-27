'use client'

import { motion } from 'framer-motion'
import { Trophy, Award, Medal } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

export function Achievements({ achievements }: { achievements: { title: string; year: string }[] }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  // Ensure we have different icons for visual variety
  const icons = [Trophy, Award, Medal]

  return (
    <section
      id="achievements"
      ref={ref}
      className="py-16 md:py-24 px-6 relative overflow-hidden bg-background"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Honors & Awards
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements?.map((achievement, idx) => {
            const Icon = icons[idx % icons.length]
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 animate-pulse" />
                <div className="relative glass-card p-8 h-full border border-white/5 hover:border-yellow-500/30 transition-all duration-300 flex flex-col items-center text-center">
                  
                  <div className="w-16 h-16 rounded-full bg-slate-900 border border-yellow-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(234,179,8,0.2)] group-hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] transition-shadow duration-500 relative">
                    <div className="absolute inset-0 rounded-full bg-yellow-500/20 animate-ping opacity-20" />
                    <Icon className="text-yellow-400 w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <span className="mb-2 text-xs font-mono text-yellow-500/70">{achievement.year}</span>
                  <p className="text-lg font-bold text-gray-200 group-hover:text-yellow-400 transition-colors">
                    {achievement.title}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
