"use client"

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useGameStore } from '@/lib/store'
import { FloatingElement, MouseParallax } from './parallax-section'

export function HeroSection() {
  const theme = useGameStore((state) => state.theme)
  const parallaxIntensity = useGameStore((state) => state.parallaxIntensity)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Mouse position for interactive parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Multiple parallax layers with different speeds
  const springConfig = { stiffness: 50, damping: 20 }
  
  // Layer 1 - Deepest background (slowest)
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100 * parallaxIntensity]), springConfig)
  // Layer 2 - Mid background
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -250 * parallaxIntensity]), springConfig)
  // Layer 3 - Near background
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -400 * parallaxIntensity]), springConfig)
  // Layer 4 - Main content
  const y4 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -550 * parallaxIntensity]), springConfig)
  // Layer 5 - Foreground decorations (fastest)
  const y5 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200 * parallaxIntensity]), springConfig)
  
  // Additional transforms
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, theme === 'persona-5' ? -8 * parallaxIntensity : 0])
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10])

  // Mouse parallax
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 })
  
  const mouseParallax1 = useTransform(smoothMouseX, [-1, 1], [-30, 30])
  const mouseParallax2 = useTransform(smoothMouseY, [-1, 1], [-30, 30])
  const mouseParallax3 = useTransform(smoothMouseX, [-1, 1], [-60, 60])
  const mouseParallax4 = useTransform(smoothMouseY, [-1, 1], [-60, 60])

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      mouseX.set(x)
      mouseY.set(y)
    }

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [mouseX, mouseY])

  const themeConfig = {
    'persona-3': {
      title: 'MEMENTO',
      subtitle: 'MORI',
      accent: '#00d4ff',
      tagline: 'The Arcana is the means by which all is revealed.',
    },
    'persona-4': {
      title: 'REACH OUT',
      subtitle: 'TO THE TRUTH',
      accent: '#ffd700',
      tagline: 'Face your true self.',
    },
    'persona-5': {
      title: 'TAKE YOUR',
      subtitle: 'HEART',
      accent: '#e60012',
      tagline: "You'll never see it coming.",
    }
  }

  const config = themeConfig[theme]

  return (
    <section 
      ref={containerRef}
      className="relative h-[250vh] overflow-hidden"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Layer 1 - Deepest background patterns */}
        <motion.div 
          style={{ y: y1, x: mouseParallax1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {theme === 'persona-5' && (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] opacity-[0.03]"
                style={{
                  background: `repeating-linear-gradient(45deg, ${config.accent} 0px, ${config.accent} 2px, transparent 2px, transparent 60px)`
                }}
              />
              {/* Large diagonal stripe */}
              <motion.div 
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  background: `repeating-linear-gradient(-45deg, transparent, transparent 30px, ${config.accent} 30px, ${config.accent} 32px)`
                }}
              />
            </>
          )}
          
          {theme === 'persona-4' && (
            <>
              {/* Deep fog layer */}
              <motion.div
                animate={{ 
                  x: [0, 200, 0],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse 120% 80% at 20% 40%, ${config.accent}15 0%, transparent 60%)`
                }}
              />
            </>
          )}
          
          {theme === 'persona-3' && (
            <>
              {/* Distant stars */}
              {[...Array(100)].map((_, i) => (
                <motion.div
                  key={`star-deep-${i}`}
                  animate={{ opacity: [0.1, 0.5, 0.1] }}
                  transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
                  className="absolute rounded-full"
                  style={{
                    width: `${0.5 + Math.random()}px`,
                    height: `${0.5 + Math.random()}px`,
                    backgroundColor: config.accent,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: 0.2
                  }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* Layer 2 - Mid background elements */}
        <motion.div 
          style={{ y: y2, x: mouseParallax2, opacity }}
          className="absolute inset-0 pointer-events-none"
        >
          {theme === 'persona-5' && (
            <>
              {/* Rotating diamond shapes */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`diamond-${i}`}
                  initial={{ rotate: 45 }}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ 
                    duration: 40 + i * 10, 
                    repeat: Infinity, 
                    ease: "linear",
                  }}
                  className="absolute opacity-10"
                  style={{
                    width: `${200 + i * 100}px`,
                    height: `${200 + i * 100}px`,
                    left: `${10 + i * 15}%`,
                    top: `${5 + i * 10}%`,
                    border: `2px solid ${config.accent}`,
                  }}
                />
              ))}
            </>
          )}
          
          {theme === 'persona-4' && (
            <>
              {/* TV scan lines */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${config.accent}20 2px, ${config.accent}20 4px)`
                }}
              />
              {/* Mid fog */}
              <motion.div
                animate={{ x: [-100, 100, -100] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(ellipse 100% 60% at 50% 50%, ${config.accent}20 0%, transparent 50%)`
                }}
              />
            </>
          )}
          
          {theme === 'persona-3' && (
            <>
              {/* Glowing orbs */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`orb-${i}`}
                  animate={{ 
                    y: [0, -30, 0],
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 5 + Math.random() * 3, 
                    repeat: Infinity, 
                    delay: Math.random() * 2 
                  }}
                  className="absolute rounded-full"
                  style={{
                    width: `${30 + Math.random() * 50}px`,
                    height: `${30 + Math.random() * 50}px`,
                    background: `radial-gradient(circle, ${config.accent}40 0%, transparent 70%)`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    boxShadow: `0 0 40px ${config.accent}30`
                  }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* Layer 3 - Near background decorations */}
        <motion.div 
          style={{ y: y3, x: mouseParallax3 }}
          className="absolute inset-0 pointer-events-none"
        >
          {theme === 'persona-5' && (
            <>
              {/* Splatter shapes */}
              {[...Array(5)].map((_, i) => (
                <FloatingElement
                  key={`splatter-${i}`}
                  floatIntensity={15}
                  rotateIntensity={3}
                  delay={i * 0.5}
                  className="absolute opacity-20"
                >
                  <motion.div
                    style={{
                      width: `${100 + Math.random() * 150}px`,
                      height: `${100 + Math.random() * 150}px`,
                      backgroundColor: config.accent,
                      left: `${Math.random() * 80}%`,
                      top: `${Math.random() * 80}%`,
                      clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)'
                    }}
                  />
                </FloatingElement>
              ))}
            </>
          )}
          
          {theme === 'persona-4' && (
            <>
              {/* TV static overlay */}
              <div className="absolute inset-0 tv-static opacity-30" />
            </>
          )}
          
          {theme === 'persona-3' && (
            <>
              {/* Moon */}
              <motion.div
                animate={{ 
                  y: [0, -30, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-16 right-16 w-48 h-48 rounded-full moon-glow"
                style={{ 
                  backgroundColor: config.accent,
                  opacity: 0.25,
                  boxShadow: `0 0 60px ${config.accent}50, 0 0 120px ${config.accent}30`
                }}
              />
              {/* Crescent shadow */}
              <motion.div
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-24 w-40 h-40 rounded-full"
                style={{ 
                  backgroundColor: 'var(--background)',
                }}
              />
            </>
          )}
        </motion.div>

        {/* Layer 4 - Main content */}
        <motion.div 
          style={{ 
            y: y4, 
            x: mouseParallax4, 
            opacity, 
            scale, 
            rotateZ: rotate,
            filter: `blur(${blur}px)`
          }}
          className="relative z-10 text-center px-4"
        >
          {/* Pre-title decoration */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-32 h-1 mx-auto mb-8"
            style={{ backgroundColor: config.accent }}
          />

          {/* Main title */}
          <MouseParallax intensity={0.02} className="relative">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`font-display text-[15vw] md:text-[12vw] leading-[0.85] tracking-tight ${
                theme === 'persona-3' ? 'neon-glow' : ''
              }`}
              style={{ color: config.accent }}
            >
              {config.title}
            </motion.h1>
            
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`font-display text-[15vw] md:text-[12vw] leading-[0.85] tracking-tight ${
                theme === 'persona-5' ? '-skew-x-12' : ''
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
                className="absolute -left-12 top-1/2 -translate-y-1/2 w-[calc(100%+96px)] h-full -z-10 -skew-x-12"
                style={{ backgroundColor: config.accent + '15' }}
              />
            )}
          </MouseParallax>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 text-xl md:text-3xl tracking-[0.2em] font-light text-muted-foreground"
          >
            {config.tagline}
          </motion.p>

          {/* Name/Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16"
          >
            <p className="text-sm tracking-[0.4em] text-muted-foreground mb-3">
              BACKEND & QA SPECIALIST
            </p>
            <h2 
              className="font-display text-5xl md:text-7xl tracking-wider"
              style={{ color: config.accent }}
            >
              STEVEN
            </h2>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute -bottom-40 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-xs tracking-[0.3em] text-muted-foreground">SCROLL</span>
              <motion.div 
                className="w-px h-20"
                style={{ backgroundColor: config.accent }}
                animate={{ scaleY: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Layer 5 - Foreground elements (move opposite direction) */}
        <motion.div 
          style={{ y: y5 }}
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        >
          {theme === 'persona-5' && (
            <>
              <svg 
                viewBox="0 0 1440 150" 
                className="absolute bottom-0 w-full"
                style={{ fill: 'var(--background)' }}
                preserveAspectRatio="none"
              >
                <path d="M0,150 L1440,150 L1440,100 L720,0 L0,100 Z" />
              </svg>
              {/* Additional sharp shapes */}
              <motion.div
                className="absolute bottom-20 left-10 w-32 h-32 opacity-30"
                style={{
                  backgroundColor: config.accent,
                  clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)'
                }}
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-32 right-20 w-24 h-24 opacity-20"
                style={{
                  backgroundColor: config.accent,
                  clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)'
                }}
                animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </>
          )}
          {(theme === 'persona-4' || theme === 'persona-3') && (
            <div 
              className="absolute bottom-0 left-0 right-0 h-48"
              style={{
                background: `linear-gradient(to top, var(--background) 0%, var(--background) 20%, transparent 100%)`
              }}
            />
          )}
        </motion.div>

        {/* Ambient particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className={`absolute ${theme === 'persona-3' ? 'rounded-full' : theme === 'persona-5' ? 'rotate-45' : ''}`}
              initial={{ 
                x: Math.random() * (windowSize.width || 1000),
                y: Math.random() * (windowSize.height || 800)
              }}
              animate={{ 
                y: [null, -1000],
                opacity: [0, 0.5, 0]
              }}
              transition={{ 
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear"
              }}
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                backgroundColor: config.accent,
                boxShadow: theme === 'persona-3' ? `0 0 10px ${config.accent}` : 'none'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
