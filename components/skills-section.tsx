"use client"

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useGameStore } from '@/lib/store'
import { ParallaxSection, FloatingElement } from './parallax-section'

const skills = [
  { 
    name: 'React / Next.js', 
    icon: '⚛',
    description: 'Building modern web applications with server-side rendering and static generation',
    category: 'Frontend'
  },
  { 
    name: 'TypeScript', 
    icon: 'TS',
    description: 'Type-safe development for scalable and maintainable codebases',
    category: 'Language'
  },
  { 
    name: 'UI/UX Design', 
    icon: '◈',
    description: 'Creating intuitive and beautiful user interfaces with attention to detail',
    category: 'Design'
  },
  { 
    name: 'Node.js', 
    icon: '⬢',
    description: 'Backend development with Express, REST APIs, and server architecture',
    category: 'Backend'
  },
  { 
    name: 'Three.js / WebGL', 
    icon: '△',
    description: '3D graphics and immersive web experiences',
    category: 'Graphics'
  },
  { 
    name: 'Motion Design', 
    icon: '◎',
    description: 'Fluid animations and micro-interactions for delightful UX',
    category: 'Animation'
  },
  { 
    name: 'Database', 
    icon: '⊞',
    description: 'SQL, NoSQL, and database optimization techniques',
    category: 'Backend'
  },
  { 
    name: 'DevOps', 
    icon: '⚙',
    description: 'CI/CD pipelines, containerization, and cloud deployment',
    category: 'Operations'
  },
]

const tools = [
  'Figma', 'VS Code', 'Git', 'Docker', 
  'Framer', 'Blender', 'After Effects', 'Photoshop'
]

export function SkillsSection() {
  const theme = useGameStore((state) => state.theme)
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const springConfig = { stiffness: 100, damping: 30 }
  
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), springConfig)
  const x1 = useSpring(useTransform(scrollYProgress, [0, 1], [-150, 150]), springConfig)
  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [-10, 10]), springConfig)

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  // Auto-advance carousel
  useEffect(() => {
    if (isDragging) return
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % skills.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isDragging])

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % skills.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + skills.length) % skills.length)
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    setDragStart(clientX)
  }

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX
    const diff = dragStart - clientX
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    setIsDragging(false)
  }

  const getVisibleIndices = () => {
    const prev = (currentIndex - 1 + skills.length) % skills.length
    const next = (currentIndex + 1) % skills.length
    return [prev, currentIndex, next]
  }

  const visibleIndices = getVisibleIndices()

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  }

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background layer */}
      <motion.div
        style={{ y: y1 }}
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
            className="mb-16"
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

        {/* 3D Carousel */}
        <div className="mb-20">
          <div 
            className="relative h-[400px] md:h-[500px] perspective-1000"
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onMouseLeave={() => isDragging && setIsDragging(false)}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
          >
            {/* Carousel Track */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                  }}
                  className="absolute w-full max-w-2xl px-4"
                >
                  <motion.div
                    className={`relative p-8 md:p-12 border-2 cursor-grab active:cursor-grabbing ${
                      theme === 'persona-5' ? '-skew-x-3' : theme === 'persona-3' ? 'rounded-2xl' : ''
                    }`}
                    style={{ 
                      borderColor: accent,
                      backgroundColor: 'var(--card)',
                      boxShadow: theme === 'persona-3' 
                        ? `0 0 40px ${accent}30, 0 0 80px ${accent}15`
                        : `0 25px 50px -12px ${accent}20`
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Category badge */}
                    <motion.div
                      className={`absolute -top-4 left-8 px-4 py-1 ${
                        theme === 'persona-5' ? 'skew-x-3' : theme === 'persona-3' ? 'rounded-full' : ''
                      }`}
                      style={{ backgroundColor: accent }}
                    >
                      <span 
                        className="font-display text-sm tracking-wider"
                        style={{ color: theme === 'persona-4' ? '#1a1510' : '#fff' }}
                      >
                        {skills[currentIndex].category}
                      </span>
                    </motion.div>

                    <div className={theme === 'persona-5' ? 'skew-x-3' : ''}>
                      {/* Icon */}
                      <motion.div
                        className={`w-20 h-20 flex items-center justify-center mb-6 ${
                          theme === 'persona-3' ? 'rounded-full' : theme === 'persona-5' ? '' : ''
                        }`}
                        style={{ 
                          backgroundColor: accent + '20',
                          boxShadow: theme === 'persona-3' ? `0 0 30px ${accent}40` : 'none'
                        }}
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <span 
                          className="font-display text-4xl"
                          style={{ color: accent }}
                        >
                          {skills[currentIndex].icon}
                        </span>
                      </motion.div>

                      {/* Content */}
                      <h3 
                        className="font-display text-3xl md:text-5xl tracking-wider mb-4"
                        style={{ color: accent }}
                      >
                        {skills[currentIndex].name}
                      </h3>
                      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        {skills[currentIndex].description}
                      </p>
                    </div>

                    {/* Corner accents */}
                    <div 
                      className="absolute top-0 right-0 w-16 h-16"
                      style={{
                        background: `linear-gradient(135deg, transparent 50%, ${accent}20 50%)`
                      }}
                    />
                    <div 
                      className="absolute bottom-0 left-0 w-16 h-16"
                      style={{
                        background: `linear-gradient(-45deg, transparent 50%, ${accent}20 50%)`
                      }}
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center z-10 ${
                theme === 'persona-5' ? '-skew-x-6' : theme === 'persona-3' ? 'rounded-full' : ''
              }`}
              style={{ 
                backgroundColor: accent,
                boxShadow: theme === 'persona-3' ? `0 0 20px ${accent}60` : 'none'
              }}
            >
              <span 
                className={`font-display text-2xl ${theme === 'persona-5' ? 'skew-x-6' : ''}`}
                style={{ color: theme === 'persona-4' ? '#1a1510' : '#fff' }}
              >
                {'<'}
              </span>
            </motion.button>

            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center z-10 ${
                theme === 'persona-5' ? '-skew-x-6' : theme === 'persona-3' ? 'rounded-full' : ''
              }`}
              style={{ 
                backgroundColor: accent,
                boxShadow: theme === 'persona-3' ? `0 0 20px ${accent}60` : 'none'
              }}
            >
              <span 
                className={`font-display text-2xl ${theme === 'persona-5' ? 'skew-x-6' : ''}`}
                style={{ color: theme === 'persona-4' ? '#1a1510' : '#fff' }}
              >
                {'>'}
              </span>
            </motion.button>

            {/* Indicators */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3">
              {skills.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1)
                    setCurrentIndex(i)
                  }}
                  className={`w-3 h-3 transition-all ${
                    theme === 'persona-3' ? 'rounded-full' : theme === 'persona-5' ? 'rotate-45' : ''
                  }`}
                  style={{
                    backgroundColor: i === currentIndex ? accent : 'transparent',
                    border: `2px solid ${accent}`,
                    boxShadow: i === currentIndex && theme === 'persona-3' ? `0 0 10px ${accent}` : 'none'
                  }}
                  whileHover={{ scale: 1.3 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tools grid */}
        <ParallaxSection speed={0.25} direction="up">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl tracking-wider mb-8 text-center"
              style={{ color: accent }}
            >
              TOOLS & TECHNOLOGIES
            </motion.h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
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
          </div>
        </ParallaxSection>
      </div>
    </section>
  )
}
