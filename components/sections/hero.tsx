'use client'

import { motion } from 'framer-motion'
import { ParticleField } from '@/components/3d/particle-field'
import Image from 'next/image'
import { ChevronDown, Download, Github, Linkedin, Mail, MessageCircle } from 'lucide-react'
import { downloadCV } from '@/lib/cv-utils'
import Typewriter from 'typewriter-effect'
import { MagneticButton } from '@/components/ui/magnetic-button'

export function Hero({ data }: { data: any }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative w-full min-h-screen py-32 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      {/* 3D Particle Background */}
      <div className="absolute inset-0 opacity-50">
        <ParticleField />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-30 pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 mt-12 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column: Text Content */}
        <div className="text-left flex flex-col items-start">
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg opacity-75 blur animate-pulse" />
                <div className="relative bg-slate-950 px-4 py-2 rounded-lg border border-cyan-500/50 glass">
                  <p className="text-sm font-medium text-cyan-400">Welcome to my portfolio</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-4 text-gradient drop-shadow-lg tracking-tight"
          >
            {data.name}
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="text-2xl md:text-4xl text-gray-300 mb-8 font-light h-16 flex items-center"
          >
            <Typewriter
              options={{
                strings: [
                  'Full Stack Developer',
                  'AI Engineer',
                  'Creative Technologist',
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-gray-400 max-w-xl mb-10 text-lg leading-relaxed space-y-4"
          >
            {data.summary.split('\n\n').slice(0, 1).map((paragraph: string, idx: number) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex gap-6 mb-12"
          >
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              title="GitHub"
            >
              <Github size={28} />
            </a>
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              title="LinkedIn"
            >
              <Linkedin size={28} />
            </a>
            <a
              href={`https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 transition-colors duration-300"
              title="WhatsApp"
            >
              <MessageCircle size={28} />
            </a>
            <a
              href={`mailto:${data.email}`}
              className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
              title="Email"
            >
              <Mail size={28} />
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 items-center z-20"
          >
            <MagneticButton href="#work">
              <div className="relative group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  Explore My Work
                  <ChevronDown size={20} className="-rotate-90 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </MagneticButton>

            <MagneticButton>
              <button
                onClick={downloadCV}
                className="group flex items-center justify-center gap-2 px-8 py-4 glass-card font-semibold text-purple-400 hover:text-white hover:bg-purple-500/20 transition-all duration-300 border-purple-500/30 min-w-[200px]"
              >
                <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
                Download CV
              </button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Column: Profile Image */}
        <motion.div
          variants={itemVariants}
          className="relative lg:ml-auto w-full max-w-sm mx-auto aspect-[4/5] group"
        >
          {/* Animated Glow Rings behind image */}
          <div className="absolute inset-x-8 -inset-y-4 bg-gradient-to-br from-cyan-500/40 to-purple-500/40 rounded-full blur-[50px] opacity-50 group-hover:opacity-80 transition-opacity duration-700 animate-pulse" />
          
          {/* Glassmorphic Frame */}
          <div className="absolute inset-0 rounded-3xl border border-cyan-500/30 bg-slate-900/20 backdrop-blur-md shadow-[0_0_40px_rgba(6,182,212,0.1)] group-hover:border-cyan-500/60 group-hover:shadow-[0_0_60px_rgba(6,182,212,0.4)] transition-all duration-700 transform group-hover:-translate-y-3 flex items-center justify-center p-3 overflow-hidden">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950/50">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10 pointer-events-none" />
              <Image
                src="/WhatsApp%20Image%202025-10-01%20at%2013.23.51_86c23014.jpg"
                alt="Muhammad Mudasir"
                fill
                className="object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}


