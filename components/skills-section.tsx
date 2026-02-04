"use client"

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import { useGameStore } from '@/lib/store'
import { ParallaxSection, FloatingElement } from './parallax-section'

const skills = [
  { 
    name: 'React / Next.js', 
    icon: '⚛',
    description: 'Building modern web applications with server-side rendering and static generation'
  },
  { 
    name: 'TypeScript', 
    icon: 'TS',
    description: 'Type-safe development for scalable and maintainable codebases'
  },
  { 
    name: 'UI/UX Design', 
    icon: '◈',
    description: 'Creating intuitive and beautiful user interfaces with attention to detail'
  },
  { 
    name: 'Node.js', 
    icon: '⬢',
    description: 'Backend development with Express, REST APIs, and server architecture'
  },
  { 
    name: 'Three.js / WebGL', 
    icon: '△',
    description: '3D graphics and immersive web experiences'
  },
  { 
    name: 'Motion Design', 
    icon: '◎',
    description: 'Fluid animations and micro-interactions for delightful UX'
  },
]

const tools = [
  'Figma', 'VS Code', 'Git', 'Docker', 
  'Framer', 'Blender', 'After Effects', 'Photoshop'
]

export function SkillsSection() {
  const theme = useGameStore((state) => state.theme)
  const parallaxIntensity = useGameStore((state) => state.parallaxIntensity)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const springConfig = { stiffness: 50, damping: 20 }
  
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [150 * parallaxIntensity, -150 * parallaxIntensity]), springConfig)
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [-100 * parallaxIntensity, 100 * parallaxIntensity]), springConfig)
  const x1 = useSpring(useTransform(scrollYProgress, [0, 1], [-200 * parallaxIntensity, 200 * parallaxIntensity]), springConfig)
  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [-15 * parallaxIntensity, 15 * parallaxIntensity]), springConfig)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Deep background layer */}
      <motion.div
        style={{ y: y2, scale }}
        className="absolute inset-0 pointer-events-none"
      >
        {theme === 'persona-5' && (
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              background: `repeating-linear-gradient(-45deg, transparent, transparent 30px, ${accent} 30px, ${accent} 32px)`
            }}
          />
        )}
        {theme === 'persona-4' && (
          <>
            <div className="absolute inset-0 tv-static opacity-10" />
            <motion.div
              animate={{ x: [0, 100, 0], opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 70% 30%, ${accent}10 0%, transparent 50%)`
              }}
            />
          </>
        )}
        {theme === 'persona-3' && (
          [...Array(40)].map((_, i) => (
            <motion.div
              key={`star-skill-${i}`}
              animate={{ opacity: [0.1, 0.6, 0.1] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
              className="absolute rounded-full"
              style={{
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                backgroundColor: accent,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: `0 0 5px ${accent}`
              }}
            />
          ))
        )}
      </motion.div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <FloatingElement
            key={`geo-${i}`}
            floatIntensity={15 + i * 8}
            rotateIntensity={10}
            delay={i * 0.5}
            className="absolute"
          >
            <motion.div
              style={{
                width: `${40 + i * 20}px`,
                height: `${40 + i * 20}px`,
                border: `1px solid ${accent}20`,
                left: `${5 + i * 15}%`,
                top: `${10 + i * 12}%`,
              }}
              className={`${
                theme === 'persona-5' ? 'rotate-45' : 
                theme === 'persona-3' ? 'rounded-full' : ''
              }`}
            />
          </FloatingElement>
        ))}
      </div>

      {/* Background shape with parallax */}
      <motion.div
        style={{ y: y1, rotate }}
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

      {/* Large text background */}
      <motion.div
        style={{ x: x1 }}
        className="absolute top-1/3 -left-10 text-[25vw] font-display opacity-[0.02] pointer-events-none select-none"
        aria-hidden="true"
      >
        SKILLS
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <ParallaxSection speed={0.2} direction="up">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div 
                className="w-12 h-px" 
                style={{ backgroundColor: accent }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
              />
              <span className="text-sm tracking-[0.3em]" style={{ color: accent }}>
                02 / SKILLS
              </span>
            </div>
            
            <h2 className={`font-display text-5xl md:text-7xl tracking-tight ${
              theme === 'persona-5' ? '-skew-x-3' : ''
            } ${theme === 'persona-3' ? 'neon-glow' : ''}`}>
              <span style={{ color: accent }}>MY</span>
              <span className="text-foreground ml-4">ARSENAL</span>
            </h2>
          </motion.div>
        </ParallaxSection>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Skills cards */}
          <ParallaxSection speed={0.3} direction="up">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`relative p-5 border cursor-default transition-all duration-300 ${
                    theme === 'persona-5' ? '-skew-x-3' : theme === 'persona-3' ? 'rounded-lg' : ''
                  }`}
                  style={{ 
                    borderColor: hoveredSkill === skill.name ? accent : accent + '30',
                    backgroundColor: hoveredSkill === skill.name ? accent + '10' : 'var(--secondary)'
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    className={`w-10 h-10 flex items-center justify-center mb-3 ${
                      theme === 'persona-5' ? 'skew-x-3' : ''
                    }`}
                    style={{ 
                      backgroundColor: accent + '20',
                      borderRadius: theme === 'persona-3' ? '50%' : theme === 'persona-5' ? '0' : '4px'
                    }}
                    animate={{
                      boxShadow: hoveredSkill === skill.name 
                        ? `0 0 20px ${accent}40` 
                        : `0 0 0px ${accent}00`
                    }}
                  >
                    <span 
                      className="font-display text-lg"
                      style={{ color: accent }}
                    >
                      {skill.icon}
                    </span>
                  </motion.div>

                  {/* Content */}
                  <div className={theme === 'persona-5' ? 'skew-x-3' : ''}>
                    <h3 
                      className="font-display text-lg tracking-wider mb-1"
                      style={{ color: hoveredSkill === skill.name ? accent : 'var(--foreground)' }}
                    >
                      {skill.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  {/* Corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-8 h-8"
                    initial={{ scale: 0 }}
                    animate={{ scale: hoveredSkill === skill.name ? 1 : 0 }}
                    style={{
                      backgroundColor: accent,
                      clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </ParallaxSection>

          {/* Tools grid with parallax */}
          <ParallaxSection speed={0.25} direction="down">
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
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ 
                      scale: 1.08,
                      backgroundColor: accent,
                      color: 'var(--background)'
                    }}
                    className={`p-4 border text-center transition-all duration-300 cursor-default ${
                      theme === 'persona-5' ? '-skew-x-6' : theme === 'persona-3' ? 'rounded-lg' : ''
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
                className={`mt-12 p-6 border-l-4 ${theme === 'persona-3' ? 'rounded-r-lg' : ''}`}
                style={{ borderColor: accent, backgroundColor: 'var(--secondary)' }}
              >
                <p className="text-muted-foreground">
                  Always learning, always evolving. I believe in staying updated with the latest technologies while mastering the fundamentals.
                </p>
              </motion.div>
            </div>
          </ParallaxSection>
        </div>
      </div>
    </section>
  )
}
