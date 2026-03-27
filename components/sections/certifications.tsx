'use client'

import { motion } from 'framer-motion'
import { FileBadge } from 'lucide-react'

// Dummy certifications to show the infinite scroll since none are explicitly in cv.json yet
// You can replace these with actual data if added to cv.json
const DUMMY_CERTS = [
  "Certified Full Stack Developer",
  "Generative AI Specialist",
  "AWS Certified Solutions Architect",
  "Advanced .NET Core Framework",
  "React & Next.js Professional",
]

export function Certifications({ certifications = DUMMY_CERTS }: { certifications?: string[] }) {
  // Duplicate array to create a seamless infinite loop
  const scrollItems = [...certifications, ...certifications]

  return (
    <section
      id="certifications"
      className="py-16 md:py-24 relative overflow-hidden bg-background border-t border-b border-white/5"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4 inline-block">
          Professional Certifications
        </h2>
      </div>

      <div className="flex overflow-hidden relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
          className="flex gap-8 whitespace-nowrap pl-8"
        >
          {scrollItems.map((cert, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl opacity-0 hover:opacity-100 blur transition-opacity duration-300 pointer-events-none" />
              <div className="relative glass-card flex items-center gap-4 px-8 py-5 rounded-2xl border border-white/5 group-hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <FileBadge className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-200 group-hover:text-cyan-400 transition-colors">
                  {cert}
                </h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
