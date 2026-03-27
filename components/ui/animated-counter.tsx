'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'

interface AnimatedCounterProps {
  value: number
  label: string
  icon: React.ElementType
  suffix?: string
}

export function AnimatedCounter({ value, label, icon: Icon, suffix = '' }: AnimatedCounterProps) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })
  const spring = useSpring(0, { duration: 2000, bounce: 0 })
  const display = useTransform(spring, (current) => Math.floor(current))

  useEffect(() => {
    if (inView) {
      spring.set(value)
    }
  }, [inView, spring, value])

  return (
    <div ref={ref} className="glass p-6 rounded-2xl flex flex-col items-center justify-center relative group overflow-hidden border-cyan-500/20 hover:border-cyan-400/50 transition-colors duration-500">
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="p-3 bg-slate-900 rounded-xl mb-4 text-cyan-400 group-hover:text-purple-400 group-hover:scale-110 transition-all duration-300">
          <Icon size={24} />
        </div>
        <div className="text-4xl font-bold text-white flex mb-2">
          <motion.span>{display}</motion.span>
          <span className="text-cyan-400">{suffix}</span>
        </div>
        <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">{label}</p>
      </div>
    </div>
  )
}
