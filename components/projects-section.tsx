"use client"

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useGameStore } from '@/lib/store'

const projects = [
  {
    id: 1,
    title: 'Project Velvet',
    category: 'Web Application',
    description: 'A sophisticated SaaS platform with real-time collaboration features.',
    fullDescription: 'Project Velvet is a comprehensive SaaS platform designed for remote teams. It features real-time document collaboration, video conferencing integration, and advanced project management tools. Built with a focus on performance and user experience.',
    tags: ['React', 'Node.js', 'WebSocket'],
    year: '2025',
    features: ['Real-time sync', 'Video chat', 'Task management', 'Analytics dashboard'],
    image: '/project-velvet.jpg',
    link: '#'
  },
  {
    id: 2,
    title: 'Midnight Hour',
    category: 'Mobile App',
    description: 'Sleep tracking application with AI-powered insights and recommendations.',
    fullDescription: 'Midnight Hour uses machine learning to analyze sleep patterns and provide personalized recommendations for better rest. The app integrates with various wearables and smart home devices to create an optimal sleep environment.',
    tags: ['React Native', 'TensorFlow', 'Firebase'],
    year: '2024',
    features: ['AI analysis', 'Wearable sync', 'Smart alarms', 'Sleep reports'],
    image: '/project-midnight.jpg',
    link: '#'
  },
  {
    id: 3,
    title: 'Shadow World',
    category: 'E-Commerce',
    description: 'High-performance e-commerce platform with immersive 3D product views.',
    fullDescription: 'Shadow World revolutionizes online shopping with interactive 3D product visualization. Customers can examine products from every angle, customize options in real-time, and experience AR try-on features for select categories.',
    tags: ['Next.js', 'Three.js', 'Stripe'],
    year: '2024',
    features: ['3D viewer', 'AR try-on', 'One-click checkout', 'Inventory sync'],
    image: '/project-shadow.jpg',
    link: '#'
  },
  {
    id: 4,
    title: 'Phantom Thief',
    category: 'Game Development',
    description: 'Browser-based puzzle game with stunning visual effects.',
    fullDescription: 'Phantom Thief is an atmospheric puzzle game that runs entirely in the browser. Players solve intricate heist-themed puzzles while enjoying cinematic visuals and an original soundtrack. Features 50+ levels with increasing complexity.',
    tags: ['Canvas', 'GSAP', 'Howler.js'],
    year: '2023',
    features: ['50+ levels', 'Leaderboards', 'Achievements', 'Cloud saves'],
    image: '/project-phantom.jpg',
    link: '#'
  },
]

export function ProjectsSection() {
  const theme = useGameStore((state) => state.theme)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100])

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Scrolling text background */}
      <motion.div
        style={{ x }}
        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[20vw] font-display opacity-5 pointer-events-none select-none"
        aria-hidden="true"
      >
        PROJECTS * CREATIONS * PORTFOLIO * PROJECTS * CREATIONS *
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px" style={{ backgroundColor: accent }} />
            <span className="text-sm tracking-[0.3em]" style={{ color: accent }}>
              04 / PROJECTS
            </span>
          </div>
          
          <h2 className={`font-display text-5xl md:text-7xl tracking-tight ${
            theme === 'persona-5' ? '-skew-x-3' : ''
          }`}>
            <span style={{ color: accent }}>SELECTED</span>
            <br />
            <span className="text-foreground">PROJECTS</span>
          </h2>
        </motion.div>

        {/* Projects grid */}
        <div className="space-y-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group cursor-pointer"
            >
              <motion.div
                className={`relative p-8 md:p-12 border transition-all duration-500 ${
                  theme === 'persona-5' ? '-skew-x-2' : theme === 'persona-3' ? 'rounded-lg' : ''
                }`}
                style={{ 
                  borderColor: hoveredId === project.id ? accent : accent + '30',
                  backgroundColor: hoveredId === project.id ? accent + '10' : 'transparent'
                }}
                whileHover={{ x: theme === 'persona-5' ? 20 : 0 }}
              >
                {/* Project number */}
                <motion.span
                  className="absolute top-4 right-4 md:top-8 md:right-8 font-display text-6xl md:text-8xl opacity-10"
                  style={{ color: accent }}
                  animate={{ 
                    opacity: hoveredId === project.id ? 0.3 : 0.1,
                    scale: hoveredId === project.id ? 1.1 : 1
                  }}
                >
                  0{project.id}
                </motion.span>

                <div className={`grid md:grid-cols-12 gap-6 items-center ${
                  theme === 'persona-5' ? 'skew-x-2' : ''
                }`}>
                  {/* Year */}
                  <div className="md:col-span-2">
                    <span className="text-sm tracking-widest text-muted-foreground">
                      {project.year}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <div className="md:col-span-3">
                    <motion.h3 
                      className="font-display text-3xl md:text-4xl tracking-wider mb-2"
                      style={{ color: hoveredId === project.id ? accent : 'var(--foreground)' }}
                    >
                      {project.title}
                    </motion.h3>
                    <span className="text-sm tracking-wider text-muted-foreground">
                      {project.category}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-4">
                    <p className="text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags & Button */}
                  <div className="md:col-span-3 flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag}
                          className={`px-3 py-1 text-xs tracking-wider ${
                            theme === 'persona-3' ? 'rounded' : ''
                          }`}
                          style={{ 
                            backgroundColor: accent + '20',
                            color: accent
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* View Details Button */}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedProject(project)
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 border-2 font-display text-sm tracking-wider transition-all ${
                        theme === 'persona-5' ? '-skew-x-3' : theme === 'persona-3' ? 'rounded' : ''
                      }`}
                      style={{ 
                        borderColor: accent,
                        color: accent,
                        backgroundColor: hoveredId === project.id ? accent + '20' : 'transparent'
                      }}
                    >
                      <span className={theme === 'persona-5' ? 'skew-x-3' : ''}>VIEW DETAILS</span>
                    </motion.button>
                  </div>
                </div>

                {/* Hover indicator */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1"
                  style={{ backgroundColor: accent }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: hoveredId === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedProject(null)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.98 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              style={{ backgroundColor: 'var(--background)' }}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto border-2 ${
                theme === 'persona-5' ? '-skew-x-2' : theme === 'persona-3' ? 'rounded-xl' : ''
              }`}
              style={{ 
                backgroundColor: 'var(--card)',
                borderColor: accent,
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              
              <div className={`p-8 md:p-12 ${theme === 'persona-5' ? 'skew-x-2' : ''}`}>
                {/* Close button */}
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  className={`absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 flex items-center justify-center z-10 ${
                    theme === 'persona-3' ? 'rounded-full' : theme === 'persona-5' ? 'rotate-45' : ''
                  }`}
                  style={{ 
                    backgroundColor: accent,
                    color: theme === 'persona-4' ? '#1a1510' : '#fff'
                  }}
                >
                  <span className={`font-display text-xl ${theme === 'persona-5' ? '-rotate-45' : ''}`}>X</span>
                </motion.button>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                  {/* Left: Image */}
                  <div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className={`relative aspect-video ${
                        theme === 'persona-5' ? '-skew-x-3' : theme === 'persona-3' ? 'rounded-lg' : ''
                      } overflow-hidden`}
                      style={{ 
                        backgroundColor: 'var(--secondary)',
                        border: `2px solid ${accent}30`
                      }}
                    >
                      {/* Project image placeholder with theme symbol */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            opacity: [0.2, 0.4, 0.2]
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="text-8xl font-display"
                          style={{ color: accent }}
                        >
                          {theme === 'persona-3' ? '☽' : theme === 'persona-4' ? 'TV' : '♠'}
                        </motion.div>
                      </div>

                      {/* Scan lines */}
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${accent}10 2px, ${accent}10 4px)`
                        }}
                      />

                      {/* Project number overlay */}
                      <div 
                        className="absolute bottom-4 right-4 font-display text-6xl opacity-30"
                        style={{ color: accent }}
                      >
                        0{selectedProject.id}
                      </div>
                    </motion.div>

                    {/* Technologies */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-6"
                    >
                      <h4 
                        className="font-display text-lg tracking-wider mb-3"
                        style={{ color: accent }}
                      >
                        TECHNOLOGIES
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <span 
                            key={tag}
                            className={`px-4 py-2 font-display tracking-wider ${
                              theme === 'persona-3' ? 'rounded-lg' : ''
                            }`}
                            style={{ 
                              backgroundColor: accent,
                              color: theme === 'persona-4' ? '#1a1510' : '#fff'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right: Content */}
                  <div>
                    {/* Header */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6"
                    >
                      <span 
                        className="text-sm tracking-widest"
                        style={{ color: accent }}
                      >
                        {selectedProject.year} / {selectedProject.category}
                      </span>
                      <h3 
                        className={`font-display text-4xl md:text-5xl tracking-wider mt-2 ${
                          theme === 'persona-3' ? 'neon-glow' : ''
                        }`}
                        style={{ color: accent }}
                      >
                        {selectedProject.title}
                      </h3>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-lg text-muted-foreground mb-8 leading-relaxed"
                    >
                      {selectedProject.fullDescription}
                    </motion.p>

                    {/* Features */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mb-8"
                    >
                      <h4 
                        className="font-display text-lg tracking-wider mb-4"
                        style={{ color: accent }}
                      >
                        KEY FEATURES
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedProject.features.map((feature, i) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div 
                              className={`w-2 h-2 ${
                                theme === 'persona-3' ? 'rounded-full' : theme === 'persona-5' ? 'rotate-45' : ''
                              }`}
                              style={{ backgroundColor: accent }}
                            />
                            <span className="text-muted-foreground">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Action buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-wrap gap-4"
                    >
                      <motion.a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-8 py-3 font-display text-lg tracking-wider ${
                          theme === 'persona-5' ? '-skew-x-3' : theme === 'persona-3' ? 'rounded-lg' : ''
                        }`}
                        style={{ 
                          backgroundColor: accent,
                          color: theme === 'persona-4' ? '#1a1510' : '#fff'
                        }}
                      >
                        <span className={theme === 'persona-5' ? 'skew-x-3' : ''}>VIEW LIVE</span>
                      </motion.a>
                      <motion.button
                        onClick={() => setSelectedProject(null)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-8 py-3 font-display text-lg tracking-wider border-2 ${
                          theme === 'persona-5' ? '-skew-x-3' : theme === 'persona-3' ? 'rounded-lg' : ''
                        }`}
                        style={{ 
                          borderColor: accent,
                          color: accent
                        }}
                      >
                        <span className={theme === 'persona-5' ? 'skew-x-3' : ''}>CLOSE</span>
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
