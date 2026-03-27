import { Navbar } from '@/components/layout/navbar'
import { ScrollToTop } from '@/components/layout/scroll-to-top'
import { Preloader } from '@/components/layout/preloader'
import { LenisProvider } from '@/components/providers/lenis-provider'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Skills } from '@/components/sections/skills'
import { Projects } from '@/components/sections/projects'
import { Timeline } from '@/components/sections/timeline'
import { Achievements } from '@/components/sections/achievements'
import { Certifications } from '@/components/sections/certifications'
import { Contact } from '@/components/sections/contact'
import fs from 'fs'
import path from 'path'

export default function Home() {
  const cvFilePath = path.join(process.cwd(), 'public', 'cv.json')
  const cvData = JSON.parse(fs.readFileSync(cvFilePath, 'utf8'))

  return (
    <LenisProvider>
      <Preloader />
      <Navbar />
      <main className="w-full">
        <Hero data={cvData} />
        <About data={cvData} />
        <Skills data={cvData.skills} />
        <Projects data={cvData.projects} />
        <Timeline experience={cvData.experience} education={cvData.education} />
        {cvData.achievements && <Achievements achievements={cvData.achievements} />}
        <Certifications />
        <Contact data={cvData} />

        {/* Footer */}
        <footer className="bg-black border-t border-cyan-500/20 py-12">
          <div className="max-w-6xl mx-auto px-6 text-center text-gray-500">
            <p>© 2024 Muhammad Mudasir. All rights reserved.</p>
            <p className="mt-2 text-sm">Crafted with passion using Next.js, React, Three.js & Tailwind CSS</p>
          </div>
        </footer>
      </main>
      <ScrollToTop />
    </LenisProvider>
  )
}
