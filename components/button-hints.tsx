"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/lib/store'

export function ButtonHints() {
  const theme = useGameStore((state) => state.theme)
  const currentScreen = useGameStore((state) => state.currentScreen)
  const openPauseMenu = useGameStore((state) => state.openPauseMenu)
  
  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  if (currentScreen !== 'portfolio') return null

  return (
    <>
      {/* Desktop Button Hints - Bottom Right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-40 hidden lg:flex items-center gap-4"
      >
        {/* ESC - Pause Menu */}
        <motion.button
          onClick={openPauseMenu}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-4 py-2 border backdrop-blur-sm"
          style={{ 
            borderColor: `${accent}60`,
            backgroundColor: 'rgba(0,0,0,0.7)'
          }}
        >
          <kbd 
            className={`px-2 py-1 text-xs font-display tracking-wider border ${
              theme === 'persona-5' ? '-skew-x-6' : theme === 'persona-3' ? 'rounded' : ''
            }`}
            style={{ 
              borderColor: accent,
              color: accent,
              backgroundColor: `${accent}20`
            }}
          >
            ESC
          </kbd>
          <span className="text-sm font-display tracking-wider text-foreground">
            MENU
          </span>
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          className="flex items-center gap-3 px-4 py-2 border backdrop-blur-sm"
          style={{ 
            borderColor: `${accent}60`,
            backgroundColor: 'rgba(0,0,0,0.7)'
          }}
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <svg 
              width="16" 
              height="24" 
              viewBox="0 0 16 24" 
              fill="none"
              className="opacity-70"
            >
              <rect 
                x="1" 
                y="1" 
                width="14" 
                height="22" 
                rx={theme === 'persona-3' ? '7' : '2'} 
                stroke={accent} 
                strokeWidth="2"
              />
              <motion.rect 
                x="6" 
                y="6" 
                width="4" 
                height="6"
                rx={theme === 'persona-3' ? '2' : '0'}
                fill={accent}
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </svg>
          </motion.div>
          <span className="text-sm font-display tracking-wider text-foreground">
            SCROLL
          </span>
        </motion.div>
      </motion.div>

      {/* Mobile Menu Button - Top Left */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={openPauseMenu}
        className={`fixed top-6 left-6 z-50 lg:hidden w-14 h-14 flex items-center justify-center ${
          theme === 'persona-5' ? '-skew-x-6' : theme === 'persona-3' ? 'rounded-lg' : ''
        }`}
        style={{ backgroundColor: accent }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none"
          className={theme === 'persona-5' ? 'skew-x-6' : ''}
        >
          <rect x="4" y="6" width="16" height="2" fill="currentColor" className="text-background" />
          <rect x="4" y="11" width="16" height="2" fill="currentColor" className="text-background" />
          <rect x="4" y="16" width="16" height="2" fill="currentColor" className="text-background" />
        </svg>
      </motion.button>
    </>
  )
}
