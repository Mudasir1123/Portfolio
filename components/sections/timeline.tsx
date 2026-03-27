'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Briefcase, GraduationCap } from 'lucide-react'

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Timeline({ experience, education }: { experience: any[], education: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  const timelineEvents = [
    ...experience.map((exp) => ({
      year: exp.duration.split(' - ')[0],
      title: exp.role,
      company: exp.company,
      description: exp.description,
      type: 'work',
    })),
    ...education.map((edu) => ({
      year: edu.year,
      title: edu.degree,
      company: edu.institution,
      description: edu.details,
      type: 'education',
    })),
  ].sort((a, b) => b.year.localeCompare(a.year))

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return

    const items = gsap.utils.toArray<HTMLElement>('.timeline-item')
    
    // Animate the central line growing down
    gsap.fromTo(lineRef.current, 
      { height: 0 },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        }
      }
    )

    // Animate each item popping in
    items.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [timelineEvents.length])

  return (
    <section
      id="timeline"
      className="py-20 md:py-32 px-6 relative overflow-hidden bg-background"
    >
      {/* Background Elements */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="max-w-4xl mx-auto relative z-10" ref={containerRef}>
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Experience & Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto" />
        </div>

        <div className="relative">
          {/* Animated Central Line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-white/5 rounded-full overflow-hidden transform md:-translate-x-1/2 hidden sm:block">
            <div ref={lineRef} className="w-full bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 rounded-full" />
          </div>

          <div className="space-y-12">
            {timelineEvents.map((event, idx) => (
              <div
                key={idx}
                className={`timeline-item flex flex-col md:flex-row relative gap-8 ${
                  idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Mobile Line - Only visible on very small screens */}
                <div className="sm:hidden absolute left-5 top-12 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 to-transparent" />

                {/* Timeline Dot / Icon */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center hidden sm:flex z-10">
                  <div className={`w-14 h-14 rounded-full border-4 border-slate-950 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] ${
                    event.type === 'work'
                      ? 'bg-cyan-950 text-cyan-400 shadow-cyan-500/20'
                      : 'bg-purple-950 text-purple-400 shadow-purple-500/20'
                  }`}>
                    {event.type === 'work' ? <Briefcase size={24} /> : <GraduationCap size={24} />}
                  </div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[calc(50%-40px)] ${idx % 2 === 0 ? 'md:pl-0' : 'md:pr-0 pl-[60px] sm:pl-0'}`}>
                  <div className="glass-card p-8 border-white/5 hover:border-white/20 transition-all duration-300 relative group overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 ${
                      event.type === 'work' ? 'from-cyan-500 to-blue-500' : 'from-purple-500 to-pink-500'
                    }`} />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {event.title}
                      </h3>
                      <span className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap ${
                        event.type === 'work'
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                          : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      }`}>
                        {event.year}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="sm:hidden text-gray-500">
                        {event.type === 'work' ? <Briefcase size={16} /> : <GraduationCap size={16} />}
                      </span>
                      <p className={`font-semibold ${event.type === 'work' ? 'text-cyan-400' : 'text-purple-400'}`}>
                        {event.company}
                      </p>
                    </div>

                    <p className="text-gray-400 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
