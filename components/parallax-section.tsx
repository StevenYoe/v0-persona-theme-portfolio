"use client"

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { usePersonaTheme } from './persona-theme-context'

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down'
}

export function ParallaxSection({ 
  children, 
  className = '', 
  speed = 0.5,
  direction = 'up'
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { theme } = usePersonaTheme()
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const multiplier = direction === 'up' ? -1 : 1
  
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 300 * speed * multiplier]),
    springConfig
  )

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  // Theme-specific rotation
  const rotation = useTransform(scrollYProgress, [0, 1], theme === 'persona-5' ? [-2, 2] : [0, 0])

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale, rotateZ: rotation }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function ParallaxBackground({ 
  children, 
  className = '',
  intensity = 1
}: { 
  children?: ReactNode
  className?: string
  intensity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -200 * intensity])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        {children}
      </motion.div>
    </div>
  )
}
