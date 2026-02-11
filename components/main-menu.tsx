"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { useGameStore } from '@/lib/store'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const menuItems = [
  { id: 'start', label: 'START', sublabel: 'Enter Portfolio' },
  { id: 'settings', label: 'SETTINGS', sublabel: 'Customize Experience' },
  { id: 'quit', label: 'QUIT', sublabel: 'Exit Application' },
]

export function MainMenu() {
  const theme = useGameStore((state) => state.theme)
  const startGame = useGameStore((state) => state.startGame)
  const setScreen = useGameStore((state) => state.setScreen)
  
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showQuitDialog, setShowQuitDialog] = useState(false)
  const [quitDialogIndex, setQuitDialogIndex] = useState(0)

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  const handleSelect = useCallback((id: string) => {
    switch (id) {
      case 'start':
        startGame()
        break
      case 'settings':
        setScreen('settings')
        break
      case 'quit':
        setShowQuitDialog(true)
        setQuitDialogIndex(0) // Default to NO
        break
    }
  }, [startGame, setScreen])

  const handleQuit = (confirmed: boolean) => {
    setShowQuitDialog(false)
    if (!confirmed) return

    // Try to close the tab/window
    window.close()
    // If that doesn't work (most browsers block this), show a message
    setTimeout(() => {
      alert('Please close this tab manually.')
    }, 100)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showQuitDialog) {
        switch (e.key) {
          case 'ArrowLeft':
          case 'a':
          case 'A':
          case 'ArrowRight':
          case 'd':
          case 'D':
            e.preventDefault()
            setQuitDialogIndex((prev) => (prev === 0 ? 1 : 0))
            break
          case 'Enter':
          case ' ':
            e.preventDefault()
            // 0 is NO, 1 is YES
            handleQuit(quitDialogIndex === 1)
            break
          case 'Escape':
            e.preventDefault()
            setShowQuitDialog(false)
            break
        }
        return
      }
      
      switch (e.key) {
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
  }, [selectedIndex, showQuitDialog, quitDialogIndex, handleSelect])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Theme-specific background effects */}
        {theme === 'persona-5' && (
          <>
            {/* Rotating diagonal lines */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              style={{
                background: `repeating-linear-gradient(45deg, transparent, transparent 40px, ${accent}08 40px, ${accent}08 42px)`
              }}
            />
            {/* Red splatter shapes */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ scale: 0, rotate: Math.random() * 360 }}
                animate={{ 
                  scale: [0, 1, 1, 0],
                  rotate: Math.random() * 360 + 180,
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50]
                }}
                transition={{ 
                  duration: 4 + Math.random() * 4, 
                  repeat: Infinity, 
                  delay: Math.random() * 4,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${100 + Math.random() * 200}px`,
                  height: `${100 + Math.random() * 200}px`,
                  backgroundColor: accent,
                  opacity: 0.1,
                  clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
                }}
              />
            ))}
          </>
        )}

        {theme === 'persona-4' && (
          <>
            {/* TV scan lines */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${accent}10 2px, ${accent}10 4px)`
              }}
            />
            {/* Fog effect */}
            <motion.div
              className="absolute inset-0"
              animate={{ 
                background: [
                  `radial-gradient(ellipse 80% 60% at 20% 40%, ${accent}15 0%, transparent 50%)`,
                  `radial-gradient(ellipse 80% 60% at 80% 60%, ${accent}15 0%, transparent 50%)`,
                  `radial-gradient(ellipse 80% 60% at 20% 40%, ${accent}15 0%, transparent 50%)`
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* TV static overlay */}
            <div className="absolute inset-0 tv-static" />
          </>
        )}

        {theme === 'persona-3' && (
          <>
            {/* Moon */}
            <motion.div
              className="absolute top-20 right-32 w-48 h-48 rounded-full moon-glow"
              animate={{ 
                y: [0, -20, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ 
                backgroundColor: accent,
                opacity: 0.2
              }}
            />
            {/* Floating stars */}
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                animate={{ 
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1]
                }}
                transition={{ 
                  duration: 2 + Math.random() * 3, 
                  repeat: Infinity, 
                  delay: Math.random() * 2 
                }}
                style={{
                  width: `${1 + Math.random() * 3}px`,
                  height: `${1 + Math.random() * 3}px`,
                  backgroundColor: accent,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: `0 0 ${4 + Math.random() * 8}px ${accent}`
                }}
              />
            ))}
            {/* Horizontal glow lines */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px"
                animate={{ 
                  x: ['-100%', '100%'],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2, 
                  repeat: Infinity, 
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
                style={{
                  width: '200px',
                  backgroundColor: accent,
                  top: `${20 + i * 15}%`,
                  boxShadow: `0 0 20px ${accent}`
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-lg md:max-w-4xl lg:max-w-5xl xl:max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16 md:mb-20 text-center"
        >
          <h1 
            className={`font-display text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] leading-none tracking-tight ${
              theme === 'persona-5' ? '-skew-x-6' : ''
            } ${theme === 'persona-3' ? 'neon-glow' : ''}`}
            style={{ color: accent }}
          >
            STEVEN'S PORTFOLIO
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-1 w-32 sm:w-40 md:w-48 mx-auto mt-2 sm:mt-3 md:mt-4"
            style={{ backgroundColor: accent }}
          />
        </motion.div>

        {/* Menu items */}
        <nav className="space-y-3 sm:space-y-4">
          {menuItems.map((item, index) => {
            const isSelected = selectedIndex === index;
            
            return (
              <motion.button
                key={item.id}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.5 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                onClick={() => handleSelect(item.id)}
                onMouseEnter={() => setSelectedIndex(index)}
                onFocus={() => setSelectedIndex(index)}
                data-sfx-interactive
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
                  transition={{ duration: 0.2 }}
                />

                <div className={`py-4 px-6 sm:py-5 sm:px-7 md:py-6 md:px-8 flex items-center justify-between ${
                  theme === 'persona-5' ? 'skew-x-3' : ''
                }`}>
                  <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
                    {/* Selection indicator */}
                    <motion.div
                      animate={{
                        scale: isSelected ? 1 : 0,
                        rotate: isSelected ? 0 : -90
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {theme === 'persona-5' && (
                        <div 
                          className="w-3 h-3 sm:w-4 sm:h-4 -rotate-45"
                          style={{ 
                            backgroundColor: isSelected ? 'var(--background)' : accent 
                          }}
                        />
                      )}
                      {theme === 'persona-4' && (
                        <div 
                          className="w-3 h-3 sm:w-4 sm:h-4 border-2"
                          style={{ 
                            borderColor: isSelected ? 'var(--background)' : accent,
                            backgroundColor: isSelected ? 'var(--background)' : 'transparent'
                          }}
                        />
                      )}
                      {theme === 'persona-3' && (
                        <div 
                          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                          style={{ 
                            backgroundColor: isSelected ? 'var(--background)' : accent,
                            boxShadow: `0 0 10px ${isSelected ? 'var(--background)' : accent}`
                          }}
                        />
                      )}
                    </motion.div>

                    {/* Text */}
                    <div>
                      <span 
                        className="font-display text-3xl sm:text-4xl md:text-5xl tracking-wider block"
                        style={{ 
                          color: isSelected ? 'var(--background)' : 'var(--foreground)' 
                        }}
                      >
                        {item.label}
                      </span>
                      <span 
                        className="text-xs sm:text-sm tracking-widest opacity-60"
                        style={{ 
                          color: isSelected ? 'var(--background)' : 'var(--muted-foreground)' 
                        }}
                      >
                        {item.sublabel}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    animate={{ x: isSelected ? 0 : -20, opacity: isSelected ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-display text-3xl sm:text-4xl"
                    style={{ color: isSelected ? 'var(--background)' : accent }}
                  >
                    {'>'}
                  </motion.div>
                </div>

                {/* Border bottom */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-px opacity-20"
                  style={{ backgroundColor: accent }}
                />
              </motion.button>
            )
          })}
        </nav>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 sm:mt-16 text-center text-xs sm:text-sm"
        >
          <p className="text-muted-foreground tracking-widest">
            USE <span style={{ color: accent }}>ARROWS</span> OR <span style={{ color: accent }}>W/S</span> TO NAVIGATE
            <span className="mx-2 sm:mx-4">|</span>
            PRESS <span style={{ color: accent }}>ENTER</span> TO SELECT
          </p>
        </motion.div>
      </div>

      {/* Quit Dialog */}
      <AlertDialog open={showQuitDialog} onOpenChange={setShowQuitDialog}>
        <AlertDialogContent 
          className="border-2"
          style={{ 
            backgroundColor: 'var(--background)',
            borderColor: accent
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle 
              className="font-display text-2xl sm:text-3xl tracking-wider"
              style={{ color: accent }}
            >
              QUIT APPLICATION?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-sm sm:text-base">
              Are you sure you want to exit? Your progress will not be saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-4">
            {['NO', 'YES'].map((option, i) => {
              const isSelected = quitDialogIndex === i
              return (
                <motion.button
                  key={option}
                  data-sfx-interactive
                  onClick={() => handleQuit(option === 'YES')}
                  onMouseEnter={() => setQuitDialogIndex(i)}
                  className={`w-full font-display text-base sm:text-xl tracking-wider border-2 px-6 sm:px-8 transition-colors ${
                    option === 'NO' ? '' : ''
                  }`}
                  style={{
                    borderColor: accent,
                    backgroundColor: isSelected ? accent : 'transparent',
                    color: isSelected ? 'var(--background)' : accent,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {option}
                </motion.button>
              )
            })}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  )
}
