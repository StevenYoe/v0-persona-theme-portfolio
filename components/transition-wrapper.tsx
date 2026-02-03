"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { usePersonaTheme } from './persona-theme-context'
import { useState, useEffect, type ReactNode } from 'react'

export function TransitionWrapper({ children }: { children: ReactNode }) {
  const { theme } = usePersonaTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [prevTheme, setPrevTheme] = useState(theme)

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  useEffect(() => {
    if (theme !== prevTheme) {
      setIsTransitioning(true)
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        setPrevTheme(theme)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [theme, prevTheme])

  return (
    <>
      {/* Theme transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] origin-bottom"
            style={{ backgroundColor: accent }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span 
                className="font-display text-6xl md:text-8xl tracking-wider"
                style={{ color: theme === 'persona-5' ? '#fff' : 'var(--background)' }}
              >
                {theme === 'persona-3' && 'P3'}
                {theme === 'persona-4' && 'P4'}
                {theme === 'persona-5' && 'P5'}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>

      {/* Persona-specific ambient effects */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {/* P3 - Subtle blue ambient glow */}
        {theme === 'persona-3' && (
          <motion.div
            animate={{ 
              opacity: [0.02, 0.05, 0.02],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 70% 20%, #00d4ff20 0%, transparent 50%)'
            }}
          />
        )}

        {/* P4 - Fog effect */}
        {theme === 'persona-4' && (
          <>
            <motion.div
              animate={{ 
                x: [0, 50, 0],
                opacity: [0.03, 0.08, 0.03],
              }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 30% 80%, #ffd70010 0%, transparent 40%)'
              }}
            />
            <div className="absolute inset-0 tv-static opacity-[0.02]" />
          </>
        )}

        {/* P5 - Diagonal lines */}
        {theme === 'persona-5' && (
          <motion.div
            animate={{ 
              opacity: [0.02, 0.04, 0.02],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                #e60012 0px,
                #e60012 1px,
                transparent 1px,
                transparent 60px
              )`
            }}
          />
        )}
      </div>
    </>
  )
}
