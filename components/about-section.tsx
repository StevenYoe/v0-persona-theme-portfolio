"use client"

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { useGameStore } from '@/lib/store'
import { ParallaxSection, FloatingElement } from './parallax-section'

export function AboutSection() {
  const theme = useGameStore((state) => state.theme)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const springConfig = { stiffness: 100, damping: 30 }
  
  // Smooth parallax layers
  const x1 = useSpring(useTransform(scrollYProgress, [0, 1], [-200, 200]), springConfig)
  const x2 = useSpring(useTransform(scrollYProgress, [0, 1], [200, -200]), springConfig)
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [80, -80]), springConfig)
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [-40, 40]), springConfig)
  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [-3, 3]), springConfig)

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  const stats = [
    { number: '5+', label: 'Years Experience' },
    { number: '50+', label: 'Projects Completed' },
    { number: '30+', label: 'Happy Clients' },
    { number: '100%', label: 'Dedication' },
  ]

  const handleDownloadCV = () => {
    // Create a sample CV download
    const link = document.createElement('a')
    link.href = '/cv.pdf'
    link.download = 'CV_YourName.pdf'
    link.click()
  }

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Deep background layer */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute inset-0 pointer-events-none"
      >
        {theme === 'persona-5' && (
          <>
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute w-full h-px opacity-5"
                style={{
                  backgroundColor: accent,
                  top: `${10 + i * 10}%`,
                  transform: `rotate(${-2 + i * 0.5}deg)`
                }}
              />
            ))}
          </>
        )}
        {theme === 'persona-4' && (
          <div className="absolute inset-0 tv-static opacity-10" />
        )}
        {theme === 'persona-3' && (
          [...Array(30)].map((_, i) => (
            <motion.div
              key={`star-about-${i}`}
              animate={{ opacity: [0.1, 0.5, 0.1] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
              className="absolute rounded-full"
              style={{
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                backgroundColor: accent,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))
        )}
      </motion.div>

      {/* Large text background */}
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute top-20 -left-20 text-[30vw] font-display opacity-[0.03] pointer-events-none select-none"
        aria-hidden="true"
      >
        ABOUT
      </motion.div>

      {/* Decorative shapes layer */}
      {theme === 'persona-5' && (
        <motion.div
          style={{ rotate, y: y2 }}
          className="absolute top-1/4 right-0 w-1/3 h-[60%] -skew-x-12 opacity-5"
          aria-hidden="true"
        >
          <div 
            className="w-full h-full"
            style={{ 
              background: `repeating-linear-gradient(0deg, ${accent} 0px, ${accent} 4px, transparent 4px, transparent 20px)`
            }}
          />
        </motion.div>
      )}

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <FloatingElement
            key={`float-${i}`}
            floatIntensity={20 + i * 5}
            rotateIntensity={5}
            delay={i * 0.8}
            className="absolute"
          >
            <motion.div
              className={`${theme === 'persona-3' ? 'rounded-full' : theme === 'persona-5' ? 'rotate-45' : ''}`}
              style={{
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                backgroundColor: `${accent}10`,
                border: `1px solid ${accent}30`,
                left: `${10 + i * 20}%`,
                top: `${20 + i * 15}%`,
              }}
            />
          </FloatingElement>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left column - Image/Visual */}
          <ParallaxSection speed={0.4} direction="up" rotateOnScroll>
            <div className="relative">
              {/* Outer frame with parallax */}
              <motion.div
                style={{ rotate }}
                className="absolute -inset-8 opacity-20"
              >
                <div 
                  className={`w-full h-full border ${theme === 'persona-5' ? '-skew-x-6' : theme === 'persona-3' ? 'rounded-lg' : ''}`}
                  style={{ borderColor: accent }}
                />
              </motion.div>

              {/* Inner frame */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute -inset-4 border-2 ${theme === 'persona-5' ? '-skew-x-3' : theme === 'persona-3' ? 'rounded-lg' : ''}`}
                style={{ borderColor: accent }}
              />
              
              {/* Image placeholder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`relative aspect-[4/5] ${theme === 'persona-5' ? '-skew-x-3' : theme === 'persona-3' ? 'rounded-lg' : ''} overflow-hidden`}
                style={{ backgroundColor: 'var(--secondary)' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                      rotate: theme === 'persona-5' ? [0, 5, 0] : [0, 0, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-9xl font-display"
                    style={{ color: accent }}
                  >
                    {theme === 'persona-3' ? '☽' : theme === 'persona-4' ? 'TV' : '♠'}
                  </motion.div>
                </div>
                
                {/* Scan lines overlay */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${accent}10 2px, ${accent}10 4px)`
                  }}
                />
              </motion.div>

              {/* Floating label */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05, x: 10 }}
                className={`absolute -bottom-6 -right-6 px-6 py-3 ${theme === 'persona-5' ? 'skew-x-6' : ''}`}
                style={{ backgroundColor: accent }}
              >
                <span 
                  className="font-display text-2xl tracking-wider"
                  style={{ color: theme === 'persona-5' ? '#fff' : 'var(--background)' }}
                >
                  CREATIVE
                </span>
              </motion.div>
            </div>
          </ParallaxSection>

          {/* Right column - Content */}
          <ParallaxSection speed={0.3} direction="down">
            <div className="space-y-8">
              {/* Section label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <motion.div 
                  className="w-12 h-px" 
                  style={{ backgroundColor: accent }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                />
                <span className="text-sm tracking-[0.3em]" style={{ color: accent }}>
                  01 / ABOUT
                </span>
              </motion.div>

              {/* Title with staggered animation */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`font-display text-5xl md:text-6xl tracking-tight ${
                  theme === 'persona-5' ? '-skew-x-3' : ''
                } ${theme === 'persona-3' ? 'neon-glow' : ''}`}
              >
                <motion.span 
                  style={{ color: accent }}
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  CRAFTING
                </motion.span>
                <br />
                <motion.span 
                  className="text-foreground"
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  DIGITAL EXPERIENCES
                </motion.span>
              </motion.h2>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-4 text-muted-foreground text-lg leading-relaxed"
              >
                <p>
                  I am a passionate creative developer who transforms ideas into 
                  immersive digital experiences. With a keen eye for design and 
                  a love for clean code, I bridge the gap between aesthetics and 
                  functionality.
                </p>
                <p>
                  Every project is an opportunity to push boundaries and create 
                  something extraordinary that resonates with users and stands 
                  the test of time.
                </p>
              </motion.div>

              {/* Download CV Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={handleDownloadCV}
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 font-display text-xl tracking-wider transition-colors flex items-center gap-3 ${
                    theme === 'persona-5' ? '-skew-x-6' : theme === 'persona-3' ? 'rounded-lg' : ''
                  }`}
                  style={{ 
                    backgroundColor: accent,
                    color: theme === 'persona-4' ? '#1a1510' : '#fff',
                    boxShadow: theme === 'persona-3' ? `0 0 20px ${accent}60` : 'none'
                  }}
                >
                  <span className={theme === 'persona-5' ? 'skew-x-6' : ''}>DOWNLOAD CV</span>
                  <motion.svg
                    className={`w-5 h-5 ${theme === 'persona-5' ? 'skew-x-6' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </motion.svg>
                </motion.button>
              </motion.div>

              {/* Stats with enhanced parallax */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: accent,
                    }}
                    className={`text-center p-4 border transition-all duration-300 ${
                      theme === 'persona-5' ? '-skew-x-3' : theme === 'persona-3' ? 'rounded-lg' : ''
                    }`}
                    style={{ borderColor: accent + '40' }}
                  >
                    <motion.div 
                      className="font-display text-3xl md:text-4xl"
                      style={{ color: accent }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-xs tracking-wider text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </ParallaxSection>
        </div>
      </div>

      {/* Bottom decoration */}
      <motion.div
        style={{ x: x2, y: y1 }}
        className="absolute bottom-10 right-0 text-[20vw] font-display opacity-[0.03] pointer-events-none select-none"
        aria-hidden="true"
      >
        ME
      </motion.div>
    </section>
  )
}
