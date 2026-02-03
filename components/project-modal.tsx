"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/lib/store'
import { X, ExternalLink, Github } from 'lucide-react'
import { useEffect } from 'react'

interface Project {
  id: number
  title: string
  category: string
  description: string
  fullDescription: string
  tags: string[]
  year: string
  features: string[]
  liveUrl?: string
  githubUrl?: string
  images: string[]
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const theme = useGameStore((state) => state.theme)
  
  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25 }}
            className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-2 ${
              theme === 'persona-5' ? '-skew-x-1' : theme === 'persona-3' ? 'rounded-xl' : ''
            }`}
            style={{ borderColor: accent }}
          >
            {/* Close button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className={`absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center ${
                theme === 'persona-5' ? '-skew-x-6' : theme === 'persona-3' ? 'rounded-full' : ''
              }`}
              style={{ backgroundColor: accent }}
            >
              <X className={`w-6 h-6 text-background ${theme === 'persona-5' ? 'skew-x-6' : ''}`} />
            </motion.button>

            {/* Header */}
            <div className="relative p-8 pb-0">
              <motion.div
                className="absolute top-0 right-0 font-display text-[15rem] leading-none opacity-5 pointer-events-none"
                style={{ color: accent }}
              >
                0{project.id}
              </motion.div>

              <div className="flex items-center gap-4 mb-4">
                <motion.div 
                  className="w-12 h-px" 
                  style={{ backgroundColor: accent }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                />
                <span className="text-sm tracking-[0.3em]" style={{ color: accent }}>
                  {project.category.toUpperCase()} / {project.year}
                </span>
              </div>

              <h2 className={`font-display text-5xl md:text-6xl tracking-tight mb-6 ${
                theme === 'persona-5' ? '-skew-x-3' : ''
              }`} style={{ color: accent }}>
                {project.title}
              </h2>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                {project.tags.map((tag) => (
                  <span 
                    key={tag}
                    className={`px-4 py-2 text-sm font-display tracking-wider border ${
                      theme === 'persona-5' ? '-skew-x-6' : theme === 'persona-3' ? 'rounded-full' : ''
                    }`}
                    style={{ 
                      borderColor: accent,
                      color: accent
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 pt-4">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-xl tracking-wider mb-4" style={{ color: accent }}>
                    OVERVIEW
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.fullDescription}
                  </p>

                  <h3 className="font-display text-xl tracking-wider mb-4" style={{ color: accent }}>
                    KEY FEATURES
                  </h3>
                  <ul className="space-y-3">
                    {project.features.map((feature, i) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span 
                          className={`w-2 h-2 mt-2 flex-shrink-0 ${
                            theme === 'persona-3' ? 'rounded-full' : theme === 'persona-5' ? 'rotate-45' : ''
                          }`}
                          style={{ backgroundColor: accent }}
                        />
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  {/* Project preview placeholder */}
                  <div 
                    className={`aspect-video mb-6 border-2 flex items-center justify-center ${
                      theme === 'persona-3' ? 'rounded-lg' : ''
                    }`}
                    style={{ 
                      borderColor: `${accent}40`,
                      backgroundColor: `${accent}10`
                    }}
                  >
                    <span className="font-display text-xl tracking-wider opacity-30" style={{ color: accent }}>
                      PROJECT PREVIEW
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 py-4 flex items-center justify-center gap-3 font-display text-lg tracking-wider ${
                          theme === 'persona-5' ? '-skew-x-3' : theme === 'persona-3' ? 'rounded-lg' : ''
                        }`}
                        style={{ 
                          backgroundColor: accent,
                          color: theme === 'persona-5' ? '#fff' : 'var(--background)'
                        }}
                      >
                        <ExternalLink className={`w-5 h-5 ${theme === 'persona-5' ? 'skew-x-3' : ''}`} />
                        LIVE DEMO
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 py-4 flex items-center justify-center gap-3 font-display text-lg tracking-wider border-2 ${
                          theme === 'persona-5' ? '-skew-x-3' : theme === 'persona-3' ? 'rounded-lg' : ''
                        }`}
                        style={{ 
                          borderColor: accent,
                          color: accent
                        }}
                      >
                        <Github className={`w-5 h-5 ${theme === 'persona-5' ? 'skew-x-3' : ''}`} />
                        SOURCE
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom decoration */}
            <motion.div
              className="h-1 w-full"
              style={{ backgroundColor: accent }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
