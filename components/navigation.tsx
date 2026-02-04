"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useGameStore } from '@/lib/store'

export function Navigation() {
  const theme = useGameStore((state) => state.theme)
  const openPauseMenu = useGameStore((state) => state.openPauseMenu)
  const [scrolled, setScrolled] = useState(false)

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Mobile Pause Menu Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={openPauseMenu}
        className={`fixed top-6 left-6 z-50 lg:hidden w-14 h-14 flex flex-col items-center justify-center gap-1 ${
          theme === 'persona-5' ? '-skew-x-6' : theme === 'persona-3' ? 'rounded-lg' : ''
        }`}
        style={{ 
          backgroundColor: accent,
          boxShadow: theme === 'persona-3' ? `0 0 20px ${accent}60` : 'none'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open pause menu"
      >
        <span 
          className="font-display text-xs tracking-widest"
          style={{ color: theme === 'persona-4' ? '#1a1510' : '#fff' }}
        >
          MENU
        </span>
        <div className="flex gap-0.5">
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5"
              style={{ 
                backgroundColor: theme === 'persona-4' ? '#1a1510' : '#fff',
                transform: theme === 'persona-5' ? 'rotate(45deg)' : 'none',
                borderRadius: theme === 'persona-3' ? '50%' : '0'
              }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
            />
          ))}
        </div>
      </motion.button>

      {/* Desktop Button Helper - Persona Style */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 50 }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-6 right-6 z-50 hidden lg:flex items-center gap-3 px-5 py-3 ${
          theme === 'persona-5' ? '-skew-x-6' : theme === 'persona-3' ? 'rounded-lg' : ''
        }`}
        style={{ 
          backgroundColor: 'var(--secondary)',
          border: `2px solid ${accent}`,
          boxShadow: theme === 'persona-3' ? `0 0 15px ${accent}40` : 'none'
        }}
      >
        {/* ESC Key */}
        <motion.div
          className={`flex items-center gap-2 ${theme === 'persona-5' ? 'skew-x-6' : ''}`}
          whileHover={{ scale: 1.05 }}
        >
          <motion.kbd
            className={`px-3 py-1.5 font-display text-sm tracking-wider ${
              theme === 'persona-3' ? 'rounded' : ''
            }`}
            style={{ 
              backgroundColor: accent,
              color: theme === 'persona-4' ? '#1a1510' : '#fff'
            }}
            animate={{ 
              boxShadow: [
                `0 0 0px ${accent}`,
                `0 0 10px ${accent}`,
                `0 0 0px ${accent}`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ESC
          </motion.kbd>
          <span className="text-sm tracking-wider text-muted-foreground">
            PAUSE MENU
          </span>
        </motion.div>

        {/* Divider */}
        <div 
          className="w-px h-6"
          style={{ backgroundColor: accent + '40' }}
        />

        {/* Scroll indicator */}
        <div className={`flex items-center gap-2 ${theme === 'persona-5' ? 'skew-x-6' : ''}`}>
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <div 
              className="w-4 h-6 rounded-full border-2 flex justify-center pt-1"
              style={{ borderColor: accent }}
            >
              <motion.div
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: accent }}
                animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
          <span className="text-sm tracking-wider text-muted-foreground">
            SCROLL
          </span>
        </div>
      </motion.div>

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ 
          backgroundColor: accent,
          scaleX: 0
        }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
      />
    </>
  )
}
