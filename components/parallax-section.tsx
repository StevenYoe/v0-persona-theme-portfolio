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
  const parallaxIntensity = useGameStore((state) => state.parallaxIntensity)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const adjustedSpeed = speed * parallaxIntensity
  
  // Direction-based transforms
  const yRange = direction === 'up' ? [0, -300 * adjustedSpeed] : 
                 direction === 'down' ? [0, 300 * adjustedSpeed] : [0, 0]
  const xRange = direction === 'left' ? [0, -300 * adjustedSpeed] : 
                 direction === 'right' ? [0, 300 * adjustedSpeed] : [0, 0]

  const y = useSpring(useTransform(scrollYProgress, [0, 1], yRange), springConfig)
  const x = useSpring(useTransform(scrollYProgress, [0, 1], xRange), springConfig)
  
  const opacityInput = fadeOnScroll ? [0, 0.2, 0.8, 1] : [0, 0, 1, 1]
  const opacityOutput = fadeOnScroll ? [0, 1, 1, 0] : [1, 1, 1, 1]
  const opacity = useTransform(scrollYProgress, opacityInput, opacityOutput)
  
  const scaleInput = scaleOnScroll ? [0, 0.2, 0.8, 1] : [0, 0, 1, 1]
  const scaleOutput = scaleOnScroll ? [0.8, 1, 1, 0.8] : [1, 1, 1, 1]
  const scale = useTransform(scrollYProgress, scaleInput, scaleOutput)
  
  const rotationOutput = rotateOnScroll && theme === 'persona-5' 
    ? [-3 * parallaxIntensity, 3 * parallaxIntensity] 
    : [0, 0]
  const rotation = useTransform(scrollYProgress, [0, 1], rotationOutput)

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
  const parallaxIntensity = useGameStore((state) => state.parallaxIntensity)
  
  const y = useTransform(
    scrollProgress, 
    [0, 1], 
    [0, -500 * depth * parallaxIntensity]
  )
  
  const scale = useTransform(
    scrollProgress, 
    [0, 1], 
    [1 + (depth * 0.2 * parallaxIntensity), 1]
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

// Floating element with parallax
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
  const parallaxIntensity = useGameStore((state) => state.parallaxIntensity)
  
  return (
    <motion.div
      animate={{
        y: [0, -floatIntensity * parallaxIntensity, 0],
        rotate: [-rotateIntensity, rotateIntensity, -rotateIntensity],
      }}
      transition={{
        duration: 6,
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
  const parallaxIntensity = useGameStore((state) => state.parallaxIntensity)
  
  const x = useSpring(0, { stiffness: 100, damping: 30 })
  const y = useSpring(0, { stiffness: 100, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    x.set((e.clientX - centerX) * intensity * parallaxIntensity)
    y.set((e.clientY - centerY) * intensity * parallaxIntensity)
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
  const y = useTransform(progress, range, [50, 0])
  
  return (
    <motion.span 
      style={{ opacity, y }} 
      className="mr-2 inline-block"
    >
      {children}
    </motion.span>
  )
}
