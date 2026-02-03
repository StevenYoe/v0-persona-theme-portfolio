"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { usePersonaTheme } from './persona-theme-context'

const skills = [
  { name: 'React / Next.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'UI/UX Design', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Three.js / WebGL', level: 75 },
  { name: 'Motion Design', level: 85 },
]

const tools = [
  'Figma', 'VS Code', 'Git', 'Docker', 
  'Framer', 'Blender', 'After Effects', 'Photoshop'
]

export function SkillsSection() {
  const { theme } = usePersonaTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10])

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background elements */}
      <motion.div
        style={{ y, rotate }}
        className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ fill: accent }}>
          {theme === 'persona-5' && (
            <path d="M10,10 L90,10 L90,90 L10,90 Z M20,20 L20,80 L80,80 L80,20 Z" />
          )}
          {theme === 'persona-4' && (
            <circle cx="50" cy="50" r="40" fill="none" stroke={accent} strokeWidth="2" />
          )}
          {theme === 'persona-3' && (
            <path d="M50,10 A40,40 0 1,1 50,90 A20,20 0 1,0 50,10" />
          )}
        </svg>
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
              02 / SKILLS
            </span>
          </div>
          
          <h2 className={`font-display text-5xl md:text-7xl tracking-tight ${
            theme === 'persona-5' ? '-skew-x-3' : ''
          }`}>
            <span style={{ color: accent }}>MY</span>
            <span className="text-foreground ml-4">ARSENAL</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Skills bars */}
          <div className="space-y-8">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-display text-xl tracking-wider">
                    {skill.name}
                  </span>
                  <span style={{ color: accent }} className="font-display text-xl">
                    {skill.level}%
                  </span>
                </div>
                <div 
                  className="h-2 bg-secondary overflow-hidden"
                  style={{ 
                    transform: theme === 'persona-5' ? 'skewX(-12deg)' : 'none'
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full"
                    style={{ backgroundColor: accent }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tools grid */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl tracking-wider mb-8"
              style={{ color: accent }}
            >
              TOOLS & TECHNOLOGIES
            </motion.h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tools.map((tool, i) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: accent,
                  }}
                  className={`p-4 border text-center transition-all duration-300 cursor-default ${
                    theme === 'persona-5' ? '-skew-x-6' : ''
                  }`}
                  style={{ 
                    borderColor: accent + '40',
                    backgroundColor: 'var(--secondary)'
                  }}
                >
                  <span className="text-sm tracking-wider">{tool}</span>
                </motion.div>
              ))}
            </div>

            {/* Additional info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 p-6 border-l-4"
              style={{ borderColor: accent, backgroundColor: 'var(--secondary)' }}
            >
              <p className="text-muted-foreground">
                {"Always learning, always evolving. I believe in staying updated with the latest technologies while mastering the fundamentals."}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
