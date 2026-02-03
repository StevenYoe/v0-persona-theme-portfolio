"use client"

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { useGameStore } from '@/lib/store'
import { ParallaxSection, FloatingElement } from './parallax-section'

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
  const theme = useGameStore((state) => state.theme)
  const parallaxIntensity = useGameStore((state) => state.parallaxIntensity)
  const containerRef = useRef<HTMLDivElement>(null)
  
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
          {/* Skills bars with parallax */}
          <ParallaxSection speed={0.3} direction="up">
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
                    <motion.span 
                      style={{ color: accent }} 
                      className="font-display text-xl"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  <div 
                    className={`h-3 bg-secondary overflow-hidden ${
                      theme === 'persona-3' ? 'rounded-full' : ''
                    }`}
                    style={{ 
                      transform: theme === 'persona-5' ? 'skewX(-12deg)' : 'none'
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full relative ${theme === 'persona-3' ? 'rounded-full' : ''}`}
                      style={{ backgroundColor: accent }}
                    >
                      {/* Shine effect */}
                      <motion.div
                        className="absolute inset-0 opacity-50"
                        initial={{ x: '-100%' }}
                        whileInView={{ x: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                        style={{
                          background: `linear-gradient(90deg, transparent, white, transparent)`
                        }}
                      />
                    </motion.div>
                  </div>
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
