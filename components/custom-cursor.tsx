"use client"

import { motion, useSpring } from 'framer-motion'
import { useState, useEffect } from 'react'
import { usePersonaTheme } from './persona-theme-context'

export function CustomCursor() {
  const { theme } = usePersonaTheme()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  const springConfig = { damping: 25, stiffness: 300 }
  const cursorX = useSpring(mousePos.x, springConfig)
  const cursorY = useSpring(mousePos.y, springConfig)
  const trailingCursorX = useSpring(mousePos.x, { damping: 50, stiffness: 200 })
  const trailingCursorY = useSpring(mousePos.y, { damping: 50, stiffness: 200 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Detect hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  // Don't render on mobile/touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 2 : 1,
            opacity: isHovering ? 0.5 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="relative -translate-x-1/2 -translate-y-1/2"
        >
          {/* Persona 5 style cursor */}
          {theme === 'persona-5' && (
            <motion.div
              className="w-4 h-4 -rotate-45"
              style={{ backgroundColor: accent }}
              animate={{ rotate: isHovering ? 0 : -45 }}
            />
          )}
          
          {/* Persona 4 style cursor */}
          {theme === 'persona-4' && (
            <motion.div
              className="w-4 h-4 border-2"
              style={{ borderColor: accent, backgroundColor: isHovering ? accent : 'transparent' }}
            />
          )}
          
          {/* Persona 3 style cursor */}
          {theme === 'persona-3' && (
            <motion.div
              className="w-4 h-4 rounded-full"
              style={{ 
                backgroundColor: accent,
                boxShadow: `0 0 ${isHovering ? '20px' : '10px'} ${accent}`
              }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Trailing cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99] hidden lg:block"
        style={{
          x: trailingCursorX,
          y: trailingCursorY,
        }}
        animate={{
          opacity: isVisible ? 0.3 : 0,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 3 : 1.5,
          }}
          className="w-8 h-8 -translate-x-1/2 -translate-y-1/2 border rounded-full"
          style={{ borderColor: accent }}
        />
      </motion.div>

      {/* Hide default cursor globally */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}
