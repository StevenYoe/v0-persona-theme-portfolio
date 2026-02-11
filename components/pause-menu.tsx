"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { useGameStore } from '@/lib/store'
import { getAudioPlayerInstance } from '@/components/audio-manager'

const menuItems = [
  { id: 'resume', label: 'RESUME', sublabel: 'Continue Viewing' },
  { id: 'settings', label: 'SETTINGS', sublabel: 'Customize Experience' },
  { id: 'main-menu', label: 'MAIN MENU', sublabel: 'Return to Title' },
]

const navItems = [
  { id: 'hero', label: 'HOME', sublabel: 'Back to Top' },
  { id: 'about', label: 'ABOUT', sublabel: 'Who I Am' },
  { id: 'skills', label: 'SKILLS', sublabel: 'My Arsenal' },
  { id: 'experience', label: 'EXPERIENCE', sublabel: 'My Journey' },
  { id: 'projects', label: 'PROJECTS', sublabel: 'My Work' },
  { id: 'contact', label: 'CONTACT', sublabel: 'Get in Touch' },
]

export function PauseMenu() {
  const theme = useGameStore((state) => state.theme)
  const currentScreen = useGameStore((state) => state.currentScreen)
  const closePauseMenu = useGameStore((state) => state.closePauseMenu)
  const setScreen = useGameStore((state) => state.setScreen)
  const returnToMainMenu = useGameStore((state) => state.returnToMainMenu)
  const sfxEnabled = useGameStore((state) => state.sfxEnabled)
  const sfxVolume = useGameStore((state) => state.sfxVolume)
  
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'menu' | 'navigation'>('menu')
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [confirmSelectedIndex, setConfirmSelectedIndex] = useState(0)

  const isVisible = currentScreen === 'pause-menu'
  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  const currentItems = activeTab === 'menu' ? menuItems : navItems

  const playSelectSfx = useCallback(() => {
    if (sfxEnabled) {
      const player = getAudioPlayerInstance()
      if (player) {
        player.playSFX('select', sfxVolume)
      }
    }
  }, [sfxEnabled, sfxVolume])

  const handleConfirmMainMenu = useCallback((confirmed: boolean) => {
    playSelectSfx()
    setShowConfirmDialog(false)
    if (confirmed) {
      returnToMainMenu()
    }
  }, [returnToMainMenu, playSelectSfx])

  const handleSelect = useCallback((id: string) => {
    playSelectSfx()
    if (activeTab === 'menu') {
      switch (id) {
        case 'resume':
          closePauseMenu()
          break
        case 'settings':
          setScreen('settings')
          break
        case 'main-menu':
          setShowConfirmDialog(true)
          setConfirmSelectedIndex(0)
          break
      }
    } else {
      // Navigation items
      const el = document.getElementById(id)
      if (el) {
        closePauseMenu()
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      }
    }
  }, [activeTab, closePauseMenu, setScreen, playSelectSfx])

  // Reset selection when tab changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [activeTab])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible) return
      
      // Handle confirm dialog navigation
      if (showConfirmDialog) {
        switch (e.key) {
          case 'Escape':
            e.preventDefault()
            playSelectSfx()
            setShowConfirmDialog(false)
            break
          case 'ArrowLeft':
          case 'ArrowRight':
          case 'a':
          case 'A':
          case 'd':
          case 'D':
            e.preventDefault()
            playSelectSfx()
            setConfirmSelectedIndex((prev) => (prev === 0 ? 1 : 0))
            break
          case 'Enter':
          case ' ':
            e.preventDefault()
            // 0 is NO, 1 is YES
            handleConfirmMainMenu(confirmSelectedIndex === 1)
            break
        }
        return
      }
      
      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          playSelectSfx()
          closePauseMenu()
          break
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault()
          playSelectSfx()
          setSelectedIndex((prev) => (prev - 1 + currentItems.length) % currentItems.length)
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault()
          playSelectSfx()
          setSelectedIndex((prev) => (prev + 1) % currentItems.length)
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault()
          playSelectSfx()
          setActiveTab('menu')
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault()
          playSelectSfx()
          setActiveTab('navigation')
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          handleSelect(currentItems[selectedIndex].id)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible, selectedIndex, closePauseMenu, handleSelect, currentItems, showConfirmDialog, confirmSelectedIndex, handleConfirmMainMenu, playSelectSfx])

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
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            style={{ backgroundColor: 'var(--background)' }}
            onClick={() => {
              closePauseMenu()
              playSelectSfx()
            }}
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
            className="relative z-10 w-full max-w-4xl px-8"
          >
            {/* PAUSED title */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8"
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

            {/* Tab Switcher */}
            <div className="flex justify-center gap-4 mb-8">
              {[
                { id: 'menu', label: 'MENU' },
                { id: 'navigation', label: 'NAVIGATION' }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  data-sfx-interactive
                  onClick={() => {
                    setActiveTab(tab.id as 'menu' | 'navigation')
                    playSelectSfx()
                  }}
                  className={`px-6 py-3 font-display text-lg tracking-wider transition-all ${
                    theme === 'persona-5' ? '-skew-x-3' : theme === 'persona-3' ? 'rounded-lg' : ''
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id ? accent : 'transparent',
                    color: activeTab === tab.id 
                      ? (theme === 'persona-4' ? '#1a1510' : '#fff')
                      : accent,
                    border: `2px solid ${accent}`
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={theme === 'persona-5' ? 'skew-x-3' : ''}>{tab.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Menu items */}
            <AnimatePresence mode="wait">
              <motion.nav
                key={activeTab}
                initial={{ opacity: 0, x: activeTab === 'menu' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeTab === 'menu' ? 20 : -20 }}
                className={`space-y-3 ${activeTab === 'navigation' ? 'grid grid-cols-2 gap-3 space-y-0' : ''}`}
              >
                {currentItems.map((item, index) => {
                  const isSelected = selectedIndex === index
                  
                  return (
                    <motion.button
                      key={item.id}
                      data-sfx-interactive
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      onClick={() => handleSelect(item.id)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full text-left relative group outline-none ${
                        theme === 'persona-5' ? '-skew-x-3' : theme === 'persona-3' ? 'rounded-lg' : ''
                      }`}
                    >
                      {/* Background */}
                      <motion.div
                        className={`absolute inset-0 -z-10 ${
                          theme === 'persona-3' ? 'rounded-lg' : ''
                        }`}
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
                              className="font-display text-xl md:text-2xl tracking-wider block"
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
              </motion.nav>
            </AnimatePresence>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-center gap-6 mt-10 text-sm text-muted-foreground tracking-widest"
            >
              <p>
                <span style={{ color: accent }}>ESC</span> TO RESUME
              </p>
              <span className="hidden md:inline">|</span>
              <p>
                <span style={{ color: accent }}>ARROWS/WASD</span> TO NAVIGATE
              </p>
              <span className="hidden md:inline">|</span>
              <p>
                <span style={{ color: accent }}>ENTER</span> TO SELECT
              </p>
            </motion.div>
          </motion.div>

          {/* Confirm Dialog */}
          <AnimatePresence>
            {showConfirmDialog && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 flex items-center justify-center"
              >
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-background"
                  onClick={() => {
                    setShowConfirmDialog(false)
                    playSelectSfx()
                  }}
                />

                {/* Dialog */}
                <motion.div
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 20 }}
                  className={`relative z-10 p-8 md:p-12 border-2 ${
                    theme === 'persona-5' ? '-skew-x-3' : theme === 'persona-3' ? 'rounded-xl' : ''
                  }`}
                  style={{
                    borderColor: accent,
                    backgroundColor: 'var(--secondary)'
                  }}
                >
                  <div className={theme === 'persona-5' ? 'skew-x-3' : ''}>
                    <h3 
                      className={`font-display text-2xl md:text-4xl tracking-wider mb-4 text-center ${
                        theme === 'persona-3' ? 'neon-glow' : ''
                      }`}
                      style={{ color: accent }}
                    >
                      RETURN TO MAIN MENU?
                    </h3>
                    <p className="text-muted-foreground text-center mb-8 tracking-wider">
                      Your current progress will be saved.
                    </p>

                    <div className="flex justify-center gap-4">
                      {['NO', 'YES'].map((option, i) => {
                        const isSelected = confirmSelectedIndex === i
                        return (
                          <motion.button
                            key={option}
                            data-sfx-interactive
                            onClick={() => handleConfirmMainMenu(option === 'YES')}
                            onMouseEnter={() => setConfirmSelectedIndex(i)}
                            className={`px-8 py-4 font-display text-xl tracking-wider transition-all ${
                              theme === 'persona-5' ? '-skew-x-3' : theme === 'persona-3' ? 'rounded-lg' : ''
                            }`}
                            style={{
                              backgroundColor: isSelected ? accent : 'transparent',
                              color: isSelected 
                                ? (theme === 'persona-4' ? '#1a1510' : '#fff')
                                : accent,
                              border: `2px solid ${accent}`
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className={theme === 'persona-5' ? 'skew-x-3' : ''}>{option}</span>
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
