'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if document is already loaded
    if (document.readyState === 'complete') {
      const timer = setTimeout(() => setIsLoading(false), 800)
      return () => clearTimeout(timer)
    } else {
      const handleLoad = () => {
        const timer = setTimeout(() => setIsLoading(false), 800)
        return () => clearTimeout(timer)
      }
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="relative">
            {/* Animated Ring */}
            <motion.div
              className="absolute -inset-4 border-2 border-transparent border-t-cyan-500 border-r-purple-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />

            {/* Inner Ring */}
            <motion.div
              className="absolute inset-0 border-2 border-transparent border-b-cyan-400 border-l-purple-400 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            {/* Center Logo/Dot */}
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center bg-slate-900 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)] text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              MM
            </motion.div>
          </div>

          <motion.div 
            className="mt-12 overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-cyan-400/80 font-mono text-sm tracking-widest uppercase flex gap-1">
              <span>Initializing</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5, times: [0, 0.5, 1] }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1, times: [0, 0.5, 1] }}
              >
                .
              </motion.span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
