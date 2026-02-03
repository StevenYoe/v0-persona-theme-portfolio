"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { usePersonaTheme } from './persona-theme-context'
import { ParallaxSection } from './parallax-section'

export function AboutSection() {
  const { theme } = usePersonaTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const x1 = useTransform(scrollYProgress, [0, 1], [-200, 200])
  const x2 = useTransform(scrollYProgress, [0, 1], [200, -200])
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5])

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  const stats = [
    { number: '5+', label: 'Years Experience' },
    { number: '50+', label: 'Projects Completed' },
    { number: '30+', label: 'Happy Clients' },
    { number: '100%', label: 'Dedication' },
  ]

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background decorations */}
      <motion.div
        style={{ x: x1 }}
        className="absolute top-20 -left-20 text-[30vw] font-display opacity-5 pointer-events-none select-none"
        aria-hidden="true"
      >
        ABOUT
      </motion.div>

      {theme === 'persona-5' && (
        <motion.div
          style={{ rotate }}
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

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left column - Image/Visual */}
          <ParallaxSection speed={0.3} direction="up">
            <div className="relative">
              {/* Frame decoration */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute -inset-4 border-2 ${theme === 'persona-5' ? '-skew-x-3' : ''}`}
                style={{ borderColor: accent }}
              />
              
              {/* Image placeholder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`relative aspect-[4/5] ${theme === 'persona-5' ? '-skew-x-3' : ''} overflow-hidden`}
                style={{ backgroundColor: 'var(--secondary)' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-8xl font-display"
                    style={{ color: accent }}
                  >
                    {theme === 'persona-3' ? '☽' : theme === 'persona-4' ? '📺' : '🎭'}
                  </motion.div>
                </div>
                
                {/* Overlay pattern */}
                {theme === 'persona-5' && (
                  <div 
                    className="absolute inset-0 opacity-20 mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='0.4' fillRule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`
                    }}
                  />
                )}
              </motion.div>

              {/* Floating label */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
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
          <ParallaxSection speed={0.2} direction="down">
            <div className="space-y-8">
              {/* Section label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-px" style={{ backgroundColor: accent }} />
                <span className="text-sm tracking-[0.3em]" style={{ color: accent }}>
                  01 / ABOUT
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`font-display text-5xl md:text-6xl tracking-tight ${
                  theme === 'persona-5' ? '-skew-x-3' : ''
                }`}
              >
                <span style={{ color: accent }}>CRAFTING</span>
                <br />
                <span className="text-foreground">DIGITAL EXPERIENCES</span>
              </motion.h2>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
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

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className={`text-center p-4 border ${theme === 'persona-5' ? '-skew-x-3' : ''}`}
                    style={{ borderColor: accent + '40' }}
                  >
                    <div 
                      className="font-display text-3xl md:text-4xl"
                      style={{ color: accent }}
                    >
                      {stat.number}
                    </div>
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
        style={{ x: x2 }}
        className="absolute bottom-10 right-0 text-[20vw] font-display opacity-5 pointer-events-none select-none"
        aria-hidden="true"
      >
        ME
      </motion.div>
    </section>
  )
}
