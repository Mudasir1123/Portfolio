export async function downloadCV() {
  const pdfUrl = '/Muhammad_Mudasir_CV_20251126.pdf'
  const link = document.createElement('a')
  link.href = pdfUrl
  link.download = 'Muhammad_Mudasir_CV_2026.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function generateCVText(cvData: any): string {
  let text = ''

  // Header
  text += `${'='.repeat(60)}\n`
  text += `${cvData.name.toUpperCase()}\n`
  text += `${cvData.title}\n`
  text += `${'='.repeat(60)}\n\n`

  // Contact Info
  text += 'CONTACT INFORMATION\n'
  text += `${'─'.repeat(60)}\n`
  text += `Email: ${cvData.email}\n`
  text += `Phone: ${cvData.phone}\n`
  text += `Location: ${cvData.location}\n\n`

  // Summary
  text += 'PROFESSIONAL SUMMARY\n'
  text += `${'─'.repeat(60)}\n`
  text += `${cvData.summary}\n\n`

  // Experience
  text += 'PROFESSIONAL EXPERIENCE\n'
  text += `${'─'.repeat(60)}\n`
  cvData.experience.forEach((job: any) => {
    text += `\n${job.role}\n`
    text += `${job.company} | ${job.duration}\n`
    text += `${job.description}\n`
    text += `Technologies: ${job.technologies.join(', ')}\n`
  })
  text += '\n'

  // Education
  text += 'EDUCATION\n'
  text += `${'─'.repeat(60)}\n`
  cvData.education.forEach((edu: any) => {
    text += `\n${edu.degree}\n`
    text += `${edu.institution} | ${edu.year}\n`
    text += `${edu.details}\n`
  })
  text += '\n'

  // Skills
  text += 'SKILLS\n'
  text += `${'─'.repeat(60)}\n`
  text += `Frontend: ${cvData.skills.frontend.join(', ')}\n`
  text += `Backend: ${cvData.skills.backend.join(', ')}\n`
  text += `3D & Graphics: ${cvData.skills['3d'].join(', ')}\n`
  text += `Tools & DevOps: ${cvData.skills.tools.join(', ')}\n\n`

  // Projects
  text += 'FEATURED PROJECTS\n'
  text += `${'─'.repeat(60)}\n`
  cvData.projects.forEach((project: any) => {
    text += `\n${project.name}\n`
    text += `${project.description}\n`
    text += `Technologies: ${project.technologies.join(', ')}\n`
  })
  text += '\n'

  text += `${'='.repeat(60)}\n`
  text += `© 2024 ${cvData.name}. All rights reserved.\n`

  return text
}
