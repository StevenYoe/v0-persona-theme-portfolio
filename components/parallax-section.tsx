"use client"

import React from "react"

import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { useGameStore } from '@/lib/store'

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  rotateOnScroll?: boolean
  scaleOnScroll?: boolean
  fadeOnScroll?: boolean
}

export function ParallaxSection({ 
  children, 
  className = '', 
  speed = 0.5,
  direction = 'up',
  rotateOnScroll = false,
  scaleOnScroll = true,
  fadeOnScroll = true
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const theme = useGameStore((state) => state.theme)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Smoother spring config - increased damping for less choppy motion
  const springConfig = { stiffness: 50, damping: 30, mass: 1, restDelta: 0.001 }
  
  // Direction-based transforms with reduced intensity
  const yRange = direction === 'up' ? [0, -150 * speed] : 
                 direction === 'down' ? [0, 150 * speed] : [0, 0]
  const xRange = direction === 'left' ? [0, -150 * speed] : 
                 direction === 'right' ? [0, 150 * speed] : [0, 0]

  const rawY = useTransform(scrollYProgress, [0, 1], yRange)
  const rawX = useTransform(scrollYProgress, [0, 1], xRange)
  
  // Apply spring for smooth interpolation
  const y = useSpring(rawY, springConfig)
  const x = useSpring(rawX, springConfig)
  
  const opacityInput = fadeOnScroll ? [0, 0.15, 0.85, 1] : [0, 0, 1, 1]
  const opacityOutput = fadeOnScroll ? [0, 1, 1, 0] : [1, 1, 1, 1]
  const opacity = useTransform(scrollYProgress, opacityInput, opacityOutput)
  
  const scaleInput = scaleOnScroll ? [0, 0.15, 0.85, 1] : [0, 0, 1, 1]
  const scaleOutput = scaleOnScroll ? [0.95, 1, 1, 0.95] : [1, 1, 1, 1]
  const scale = useTransform(scrollYProgress, scaleInput, scaleOutput)
  
  const rotationOutput = rotateOnScroll && theme === 'persona-5' 
    ? [-2, 2] 
    : [0, 0]
  const rawRotation = useTransform(scrollYProgress, [0, 1], rotationOutput)
  const rotation = useSpring(rawRotation, springConfig)

  return (
    <motion.div
      ref={ref}
      style={{ y, x, opacity, scale, rotateZ: rotation }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Enhanced parallax layer for background effects
interface ParallaxLayerProps {
  children?: ReactNode
  className?: string
  depth?: number // 0 = foreground, 1 = background
  scrollProgress: MotionValue<number>
}

export function ParallaxLayer({ 
  children, 
  className = '',
  depth = 0.5,
  scrollProgress
}: ParallaxLayerProps) {
  // Smoother spring config
  const springConfig = { stiffness: 30, damping: 30, mass: 1 }
  
  const rawY = useTransform(
    scrollProgress, 
    [0, 1], 
    [0, -300 * depth]
  )
  
  const y = useSpring(rawY, springConfig)
  
  const scale = useTransform(
    scrollProgress, 
    [0, 1], 
    [1 + (depth * 0.1), 1]
  )

  return (
    <motion.div
      style={{ y, scale }}
      className={`absolute inset-0 ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Floating element with parallax - smoother animation
interface FloatingElementProps {
  children: ReactNode
  className?: string
  floatIntensity?: number
  rotateIntensity?: number
  delay?: number
}

export function FloatingElement({
  children,
  className = '',
  floatIntensity = 20,
  rotateIntensity = 5,
  delay = 0
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [0, -floatIntensity, 0],
        rotate: [-rotateIntensity, rotateIntensity, -rotateIntensity],
      }}
      transition={{
        duration: 8, // Slower, smoother duration
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Mouse parallax effect
interface MouseParallaxProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function MouseParallax({
  children,
  className = '',
  intensity = 0.02
}: MouseParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  // Smoother spring for mouse movement
  const springConfig = { stiffness: 50, damping: 30 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    x.set((e.clientX - centerX) * intensity)
    y.set((e.clientY - centerY) * intensity)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Text reveal with parallax
interface ParallaxTextProps {
  children: string
  className?: string
  stagger?: number
}

export function ParallaxText({
  children,
  className = '',
  stagger = 0.03
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"]
  })

  const words = children.split(' ')

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i * stagger
        const end = start + 0.3
        
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </div>
  )
}

function Word({ 
  children, 
  progress, 
  range 
}: { 
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0, 1])
  const rawY = useTransform(progress, range, [30, 0])
  const y = useSpring(rawY, { stiffness: 50, damping: 20 })
  
  return (
    <motion.span 
      style={{ opacity, y }} 
      className="mr-2 inline-block"
    >
      {children}
    </motion.span>
  )
}
