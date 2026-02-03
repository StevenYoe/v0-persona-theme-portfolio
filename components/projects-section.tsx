"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { useGameStore } from '@/lib/store'

const projects = [
  {
    id: 1,
    title: 'Project Velvet',
    category: 'Web Application',
    description: 'A sophisticated SaaS platform with real-time collaboration features.',
    tags: ['React', 'Node.js', 'WebSocket'],
    year: '2025'
  },
  {
    id: 2,
    title: 'Midnight Hour',
    category: 'Mobile App',
    description: 'Sleep tracking application with AI-powered insights and recommendations.',
    tags: ['React Native', 'TensorFlow', 'Firebase'],
    year: '2024'
  },
  {
    id: 3,
    title: 'Shadow World',
    category: 'E-Commerce',
    description: 'High-performance e-commerce platform with immersive 3D product views.',
    tags: ['Next.js', 'Three.js', 'Stripe'],
    year: '2024'
  },
  {
    id: 4,
    title: 'Phantom Thief',
    category: 'Game Development',
    description: 'Browser-based puzzle game with stunning visual effects.',
    tags: ['Canvas', 'GSAP', 'Howler.js'],
    year: '2023'
  },
]

export function ProjectsSection() {
  const theme = useGameStore((state) => state.theme)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100])

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

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
        WORK • PROJECTS • CREATIONS • WORK • PROJECTS • CREATIONS •
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px" style={{ backgroundColor: accent }} />
              <span className="text-sm tracking-[0.3em]" style={{ color: accent }}>
                03 / WORK
              </span>
            </div>
            
            <h2 className={`font-display text-5xl md:text-7xl tracking-tight ${
              theme === 'persona-5' ? '-skew-x-3' : ''
            }`}>
              <span style={{ color: accent }}>SELECTED</span>
              <br />
              <span className="text-foreground">PROJECTS</span>
            </h2>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, x: 10 }}
            whileTap={{ scale: 0.95 }}
            className={`mt-8 md:mt-0 px-8 py-4 border-2 font-display text-xl tracking-wider transition-colors ${
              theme === 'persona-5' ? '-skew-x-6' : ''
            }`}
            style={{ 
              borderColor: accent,
              color: accent
            }}
          >
            VIEW ALL
          </motion.button>
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
              className={`relative group cursor-pointer ${
                theme === 'persona-5' ? '' : ''
              }`}
            >
              <motion.div
                className={`relative p-8 md:p-12 border transition-all duration-500 ${
                  theme === 'persona-5' ? '-skew-x-2' : ''
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

                <div className="grid md:grid-cols-12 gap-6 items-center">
                  {/* Year */}
                  <div className="md:col-span-2">
                    <span className="text-sm tracking-widest text-muted-foreground">
                      {project.year}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <div className="md:col-span-4">
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

                  {/* Tags */}
                  <div className="md:col-span-2 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 text-xs tracking-wider"
                        style={{ 
                          backgroundColor: accent + '20',
                          color: accent
                        }}
                      >
                        {tag}
                      </span>
                    ))}
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
    </section>
  )
}
