'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import { Mail, Github, Linkedin, Twitter, ExternalLink, Download, MessageCircle, Phone, Send, Loader2, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { downloadCV } from '@/lib/cv-utils'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function Contact({ data }: { data: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (formData: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      const result = await response.json()
      if (response.ok && result.success) {
        toast.success('Message sent successfully! I will get back to you soon.')
        reset()
      } else {
        toast.error(result.error || 'Something went wrong. Please try again or email me directly.')
      }
    } catch (error) {
      toast.error('Failed to send message. Please check your connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks: { icon: LucideIcon, label: string, url: string, color: string }[] = [
    { icon: Github, label: 'GitHub', url: data.github, color: 'hover:text-gray-400' },
    { icon: Linkedin, label: 'LinkedIn', url: data.linkedin, color: 'hover:text-blue-400' },
    { icon: MessageCircle, label: 'WhatsApp', url: `https://wa.me/${data.phone.replace(/[^0-9]/g, '')}`, color: 'hover:text-green-400' },
    { icon: Mail, label: 'Email', url: `mailto:${data.email}`, color: 'hover:text-pink-400' },
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

  const handleDownloadCV = async () => {
    setIsDownloading(true)
    try {
      await downloadCV()
    } catch (error) {
      console.error('Error downloading CV:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 md:py-32 px-6 relative overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Let&apos;s Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto mb-6" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              I&apos;m always interested in hearing about new projects and opportunities. Feel free to reach out!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Name</label>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Your name"
                    className={`w-full px-4 py-3 bg-slate-900/60 border ${
                      errors.name ? 'border-red-500/50' : 'border-cyan-500/30'
                    } rounded-lg focus:border-cyan-500 focus:outline-none text-white placeholder-gray-500 transition-all duration-300`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Email</label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 bg-slate-900/60 border ${
                      errors.email ? 'border-red-500/50' : 'border-cyan-500/30'
                    } rounded-lg focus:border-cyan-500 focus:outline-none text-white placeholder-gray-500 transition-all duration-300`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Message</label>
                  <textarea
                    {...register('message')}
                    placeholder="Your message here..."
                    rows={5}
                    className={`w-full px-4 py-3 bg-slate-900/60 border ${
                      errors.message ? 'border-red-500/50' : 'border-cyan-500/30'
                    } rounded-lg focus:border-cyan-500 focus:outline-none text-white placeholder-gray-500 transition-all duration-300 resize-none`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
                  )}
                </div>

                <MagneticButton className="w-full mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-bold text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </MagneticButton>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8 h-full flex flex-col justify-between">
              {/* Quick Info */}
              <div className="glass-card p-8 border-white/5 hover:border-cyan-500/30 transition-all duration-300">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">Get In Touch</h3>
                <div className="space-y-4 mb-6">
                  <p className="text-gray-300 flex items-start gap-3">
                    <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{data.email}</span>
                  </p>
                  <p className="text-gray-300 flex items-start gap-3">
                    <Phone className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>{data.phone}</span>
                  </p>
                </div>

                {/* Social Links */}
                <h4 className="text-sm font-semibold text-purple-400 mb-4">Follow Me</h4>
                <div className="grid grid-cols-4 gap-4">
                  {socialLinks.map(({ icon: Icon, label, url, color }) => (
                    <motion.a
                      key={label}
                      href={url}
                      className={`p-4 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-xl flex items-center justify-center ${color} transition-all duration-300 hover:border-cyan-500/80 group`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title={label}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-125 transition-transform" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Download CV */}
              <MagneticButton className="w-full">
                <button
                  onClick={handleDownloadCV}
                  disabled={isDownloading}
                  className="w-full relative group px-8 py-4 glass-card border border-purple-500/30 font-semibold text-white overflow-hidden transition-all duration-300 disabled:opacity-50"
                  suppressHydrationWarning
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center gap-2">
                    <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
                    {isDownloading ? 'Downloading...' : 'Download CV'}
                  </div>
                </button>
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
