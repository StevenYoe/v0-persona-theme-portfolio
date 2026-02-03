"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { usePersonaTheme } from './persona-theme-context'

export function HeroSection() {
  const { theme } = usePersonaTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -450])
  const yForeground = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, theme === 'persona-5' ? -5 : 0])

  const themeConfig = {
    'persona-3': {
      title: 'MEMENTO',
      subtitle: 'MORI',
      accent: '#00d4ff',
      tagline: 'Remember, you will die.',
      shapes: ['circle', 'crescent']
    },
    'persona-4': {
      title: 'REACH OUT',
      subtitle: 'TO THE TRUTH',
      accent: '#ffd700',
      tagline: 'Face your true self.',
      shapes: ['tv', 'fog']
    },
    'persona-5': {
      title: 'TAKE YOUR',
      subtitle: 'HEART',
      accent: '#e60012',
      tagline: 'You\'ll never see it coming.',
      shapes: ['mask', 'splatter']
    }
  }

  const config = themeConfig[theme]

  return (
    <section 
      ref={containerRef}
      className="relative h-[200vh] overflow-hidden"
    >
      {/* Background layers with parallax */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Deep background shapes */}
        <motion.div 
          style={{ y: y3 }}
          className="absolute inset-0 pointer-events-none"
        >
          {theme === 'persona-5' && (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -right-1/2 w-[150%] h-[150%] opacity-5"
                style={{
                  background: `repeating-linear-gradient(45deg, ${config.accent} 0px, ${config.accent} 2px, transparent 2px, transparent 40px)`
                }}
              />
              {/* Diagonal stripes */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  background: `repeating-linear-gradient(-45deg, transparent, transparent 20px, ${config.accent} 20px, ${config.accent} 22px)`
                }}
              />
            </>
          )}
          
          {theme === 'persona-4' && (
            <>
              {/* TV static overlay */}
              <div className="absolute inset-0 tv-static opacity-20" />
              {/* Fog layers */}
              <motion.div
                animate={{ x: [0, 100, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 opacity-30"
                style={{
                  background: `radial-gradient(ellipse at 30% 50%, ${config.accent}20 0%, transparent 50%)`
                }}
              />
            </>
          )}
          
          {theme === 'persona-3' && (
            <>
              {/* Moon in background */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-20 w-40 h-40 rounded-full moon-glow"
                style={{ 
                  backgroundColor: config.accent,
                  opacity: 0.3
                }}
              />
              {/* Stars */}
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: config.accent,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* Mid layer decorations */}
        <motion.div 
          style={{ y: y2, opacity }}
          className="absolute inset-0 pointer-events-none"
        >
          {theme === 'persona-5' && (
            <motion.svg
              viewBox="0 0 100 100"
              className="absolute top-1/4 -left-20 w-96 h-96 opacity-20"
              style={{ fill: config.accent }}
            >
              <motion.path
                d="M50 10 L90 50 L50 90 L10 50 Z"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
            </motion.svg>
          )}
        </motion.div>

        {/* Main content */}
        <motion.div 
          style={{ y: y1, opacity, scale, rotateZ: rotate }}
          className="relative z-10 text-center px-4"
        >
          {/* Pre-title decoration */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-24 h-1 mx-auto mb-8"
            style={{ backgroundColor: config.accent }}
          />

          {/* Main title */}
          <div className="relative">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[12vw] md:text-[10vw] leading-[0.85] tracking-tight"
              style={{ color: config.accent }}
            >
              {config.title}
            </motion.h1>
            
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`font-display text-[12vw] md:text-[10vw] leading-[0.85] tracking-tight ${
                theme === 'persona-5' ? '-skew-x-6' : ''
              }`}
              style={{ color: 'var(--foreground)' }}
            >
              {config.subtitle}
            </motion.h1>

            {/* Decorative stroke behind text for P5 */}
            {theme === 'persona-5' && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -left-8 top-1/2 -translate-y-1/2 w-[calc(100%+64px)] h-full -z-10 -skew-x-12"
                style={{ backgroundColor: config.accent + '15' }}
              />
            )}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 text-xl md:text-2xl tracking-widest font-light text-muted-foreground"
          >
            {config.tagline}
          </motion.p>

          {/* Name/Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12"
          >
            <p className="text-sm tracking-[0.3em] text-muted-foreground mb-2">
              CREATIVE DEVELOPER
            </p>
            <h2 
              className="font-display text-4xl md:text-5xl tracking-wider"
              style={{ color: config.accent }}
            >
              YOUR NAME
            </h2>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute -bottom-32 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs tracking-widest text-muted-foreground">SCROLL</span>
              <div 
                className="w-px h-16"
                style={{ backgroundColor: config.accent }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Foreground decorative elements */}
        <motion.div 
          style={{ y: yForeground }}
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        >
          {theme === 'persona-5' && (
            <svg 
              viewBox="0 0 1440 100" 
              className="absolute bottom-0 w-full"
              style={{ fill: 'var(--background)' }}
              preserveAspectRatio="none"
            >
              <path d="M0,100 L1440,100 L1440,80 L720,20 L0,80 Z" />
            </svg>
          )}
          {theme === 'persona-4' && (
            <div 
              className="absolute bottom-0 left-0 right-0 h-32"
              style={{
                background: `linear-gradient(to top, var(--background) 0%, transparent 100%)`
              }}
            />
          )}
          {theme === 'persona-3' && (
            <div 
              className="absolute bottom-0 left-0 right-0 h-32"
              style={{
                background: `linear-gradient(to top, var(--background) 0%, transparent 100%)`
              }}
            />
          )}
        </motion.div>
      </div>
    </section>
  )
}
