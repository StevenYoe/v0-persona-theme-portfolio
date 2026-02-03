"use client"

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useGameStore } from '@/lib/store'

export function CustomCursor() {
  const theme = useGameStore((state) => state.theme)
  const cursorEnabled = useGameStore((state) => state.cursorEnabled)
  
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  // Use motion values for better performance
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  // Spring animation for smooth following
  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Trailing cursor with more delay
  const trailConfig = { damping: 30, stiffness: 200, mass: 1 }
  const trailXSpring = useSpring(cursorX, trailConfig)
  const trailYSpring = useSpring(cursorY, trailConfig)

  // Outer ring with even more delay
  const outerConfig = { damping: 40, stiffness: 100, mass: 1.5 }
  const outerXSpring = useSpring(cursorX, outerConfig)
  const outerYSpring = useSpring(cursorY, outerConfig)

  useEffect(() => {
    if (!cursorEnabled) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button'
      
      setIsHovering(isInteractive)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [cursorX, cursorY, cursorEnabled])

  // Don't render on mobile/touch devices or if disabled
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null
  }

  if (!cursorEnabled) {
    return null
  }

  return (
    <>
      {/* Outer glow ring - Persona 3 only */}
      {theme === 'persona-3' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997] hidden lg:block"
          style={{
            x: outerXSpring,
            y: outerYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            animate={{
              opacity: isVisible ? 0.3 : 0,
              scale: isHovering ? 2.5 : isClicking ? 0.8 : 1.5,
            }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 rounded-full"
            style={{
              background: `radial-gradient(circle, ${accent}40 0%, transparent 70%)`,
              boxShadow: `0 0 30px ${accent}50`,
            }}
          />
        </motion.div>
      )}

      {/* Trailing cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden lg:block"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            opacity: isVisible ? (isHovering ? 0.5 : 0.3) : 0,
            scale: isHovering ? 2 : isClicking ? 0.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'persona-5' && (
            <div 
              className="w-8 h-8 border-2 rotate-45"
              style={{ borderColor: accent }}
            />
          )}
          {theme === 'persona-4' && (
            <div 
              className="w-8 h-8 border-2"
              style={{ borderColor: accent }}
            />
          )}
          {theme === 'persona-3' && (
            <div 
              className="w-8 h-8 rounded-full border-2"
              style={{ 
                borderColor: accent,
                boxShadow: `0 0 15px ${accent}80`
              }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            opacity: isVisible ? 1 : 0,
            scale: isClicking ? 0.7 : isHovering ? 1.5 : 1,
            rotate: isHovering ? (theme === 'persona-5' ? 135 : 0) : (theme === 'persona-5' ? 45 : 0),
          }}
          transition={{ duration: 0.15 }}
        >
          {/* Persona 5 - Diamond shape */}
          {theme === 'persona-5' && (
            <div className="relative">
              <div 
                className="w-4 h-4"
                style={{ 
                  backgroundColor: accent,
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                }}
              />
              {isHovering && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="absolute inset-0"
                  style={{ 
                    backgroundColor: accent,
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                  }}
                />
              )}
            </div>
          )}
          
          {/* Persona 4 - Square/TV shape */}
          {theme === 'persona-4' && (
            <div className="relative">
              <div 
                className="w-4 h-4 border-2"
                style={{ 
                  borderColor: accent,
                  backgroundColor: isHovering ? accent : 'transparent'
                }}
              />
              {/* TV static effect on hover */}
              {isHovering && (
                <motion.div
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 0.1, repeat: Infinity }}
                  className="absolute -inset-1 opacity-30"
                  style={{
                    background: `repeating-linear-gradient(0deg, transparent, transparent 1px, ${accent}30 1px, ${accent}30 2px)`
                  }}
                />
              )}
            </div>
          )}
          
          {/* Persona 3 - Glowing circle */}
          {theme === 'persona-3' && (
            <div className="relative">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ 
                  backgroundColor: accent,
                  boxShadow: `0 0 ${isHovering ? '20px' : '10px'} ${accent}, 0 0 ${isHovering ? '40px' : '20px'} ${accent}80`
                }}
              />
              {/* Pulsing ring */}
              <motion.div
                animate={{ 
                  scale: [1, 2, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full"
                style={{ 
                  border: `1px solid ${accent}`,
                }}
              />
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9996] hidden lg:block"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`w-8 h-8 ${theme === 'persona-3' ? 'rounded-full' : theme === 'persona-5' ? 'rotate-45' : ''}`}
            style={{ 
              border: `2px solid ${accent}`,
            }}
          />
        </motion.div>
      )}

      {/* Hide default cursor globally when custom cursor is enabled */}
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
