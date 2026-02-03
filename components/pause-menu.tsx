"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { useGameStore } from '@/lib/store'

const menuItems = [
  { id: 'resume', label: 'RESUME', sublabel: 'Continue Viewing' },
  { id: 'settings', label: 'SETTINGS', sublabel: 'Customize Experience' },
  { id: 'main-menu', label: 'MAIN MENU', sublabel: 'Return to Title' },
]

export function PauseMenu() {
  const theme = useGameStore((state) => state.theme)
  const currentScreen = useGameStore((state) => state.currentScreen)
  const closePauseMenu = useGameStore((state) => state.closePauseMenu)
  const setScreen = useGameStore((state) => state.setScreen)
  const returnToMainMenu = useGameStore((state) => state.returnToMainMenu)
  
  const [selectedIndex, setSelectedIndex] = useState(0)

  const isVisible = currentScreen === 'pause-menu'
  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  const handleSelect = useCallback((id: string) => {
    switch (id) {
      case 'resume':
        closePauseMenu()
        break
      case 'settings':
        setScreen('settings')
        break
      case 'main-menu':
        returnToMainMenu()
        break
    }
  }, [closePauseMenu, setScreen, returnToMainMenu])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible) return
      
      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          closePauseMenu()
          break
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length)
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % menuItems.length)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          handleSelect(menuItems[selectedIndex].id)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible, selectedIndex, closePauseMenu, handleSelect])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
        >
          {/* Dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            style={{ backgroundColor: 'var(--background)' }}
            onClick={closePauseMenu}
          />

          {/* Animated background pattern */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {theme === 'persona-5' && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                style={{
                  background: `repeating-linear-gradient(-45deg, transparent, transparent 20px, ${accent} 20px, ${accent} 22px)`
                }}
              />
            )}
            {theme === 'persona-4' && (
              <motion.div
                className="absolute inset-0 tv-static"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
              />
            )}
            {theme === 'persona-3' && (
              <>
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
                    style={{
                      backgroundColor: accent,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      boxShadow: `0 0 10px ${accent}`
                    }}
                  />
                ))}
              </>
            )}
          </div>

          {/* Menu content */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl px-8"
          >
            {/* PAUSED title */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-12"
            >
              <h1 
                className={`font-display text-6xl md:text-8xl tracking-wider ${
                  theme === 'persona-5' ? '-skew-x-6' : ''
                } ${theme === 'persona-3' ? 'neon-glow' : ''}`}
                style={{ color: accent }}
              >
                PAUSED
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="h-1 w-32 mx-auto mt-4"
                style={{ backgroundColor: accent }}
              />
            </motion.div>

            {/* Menu items */}
            <nav className="space-y-3">
              {menuItems.map((item, index) => {
                const isSelected = selectedIndex === index
                
                return (
                  <motion.button
                    key={item.id}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    onClick={() => handleSelect(item.id)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full text-left relative group outline-none ${
                      theme === 'persona-5' ? '-skew-x-3' : ''
                    }`}
                  >
                    {/* Background */}
                    <motion.div
                      className="absolute inset-0 -z-10"
                      initial={false}
                      animate={{
                        backgroundColor: isSelected ? accent : 'transparent',
                        scaleX: isSelected ? 1 : 0
                      }}
                      style={{ originX: 0 }}
                      transition={{ duration: 0.15 }}
                    />

                    <div className={`py-4 px-6 flex items-center justify-between ${
                      theme === 'persona-5' ? 'skew-x-3' : ''
                    }`}>
                      <div className="flex items-center gap-4">
                        {/* Indicator */}
                        <motion.div
                          animate={{ scale: isSelected ? 1 : 0 }}
                          className="w-2 h-2"
                          style={{ 
                            backgroundColor: isSelected ? 'var(--background)' : accent,
                            transform: theme === 'persona-5' ? 'rotate(-45deg)' : 
                                       theme === 'persona-3' ? 'none' : 'none',
                            borderRadius: theme === 'persona-3' ? '50%' : '0'
                          }}
                        />

                        <div>
                          <span 
                            className="font-display text-2xl md:text-3xl tracking-wider block"
                            style={{ color: isSelected ? 'var(--background)' : 'var(--foreground)' }}
                          >
                            {item.label}
                          </span>
                          <span 
                            className="text-xs tracking-widest opacity-70"
                            style={{ color: isSelected ? 'var(--background)' : 'var(--muted-foreground)' }}
                          >
                            {item.sublabel}
                          </span>
                        </div>
                      </div>

                      <motion.span
                        animate={{ x: isSelected ? 0 : -10, opacity: isSelected ? 1 : 0 }}
                        className="font-display text-2xl"
                        style={{ color: isSelected ? 'var(--background)' : accent }}
                      >
                        {'>'}
                      </motion.span>
                    </div>
                  </motion.button>
                )
              })}
            </nav>

            {/* Instructions */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-10 text-sm text-muted-foreground tracking-widest"
            >
              PRESS <span style={{ color: accent }}>ESC</span> TO RESUME
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
