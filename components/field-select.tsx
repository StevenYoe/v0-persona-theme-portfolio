"use client"

import { motion } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useGameStore } from '@/lib/store'
import { FIELDS } from '@/lib/portfolio-data'
import { getAudioPlayerInstance } from '@/components/audio-manager'

export function FieldSelect() {
  const theme = useGameStore((state) => state.theme)
  const currentField = useGameStore((state) => state.field)
  const selectField = useGameStore((state) => state.selectField)
  const goBack = useGameStore((state) => state.goBack)
  const sfxEnabled = useGameStore((state) => state.sfxEnabled)
  const sfxVolume = useGameStore((state) => state.sfxVolume)

  const [selectedIndex, setSelectedIndex] = useState(() => {
    const i = FIELDS.findIndex((f) => f.id === currentField)
    return i >= 0 ? i : 0
  })
  const wasTouched = useRef(false)

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  const playSfx = useCallback((type: 'hover' | 'select') => {
    if (!sfxEnabled) return
    const player = getAudioPlayerInstance()
    if (player) player.playSFX(type, sfxVolume)
  }, [sfxEnabled, sfxVolume])

  const choose = useCallback((index: number) => {
    playSfx('select')
    selectField(FIELDS[index].id)
  }, [playSfx, selectField])

  useEffect(() => {
    const handleTouchStart = () => { wasTouched.current = true }
    const handleTouchEnd = () => { setTimeout(() => { wasTouched.current = false }, 100) }

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault()
          playSfx('hover')
          setSelectedIndex((prev) => (prev - 1 + FIELDS.length) % FIELDS.length)
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault()
          playSfx('hover')
          setSelectedIndex((prev) => (prev + 1) % FIELDS.length)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          choose(selectedIndex)
          break
        case 'Escape':
          e.preventDefault()
          playSfx('select')
          goBack()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [selectedIndex, choose, goBack, playSfx])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Simple themed background */}
      <div className="absolute inset-0 pointer-events-none">
        {theme === 'persona-5' && (
          <div
            className="absolute inset-0"
            style={{ background: `repeating-linear-gradient(45deg, transparent, transparent 40px, ${accent}08 40px, ${accent}08 42px)` }}
          />
        )}
        {theme === 'persona-4' && (
          <div
            className="absolute inset-0 opacity-20"
            style={{ background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${accent}10 2px, ${accent}10 4px)` }}
          />
        )}
        {theme === 'persona-3' && (
          <motion.div
            className="absolute top-20 right-32 w-48 h-48 rounded-full moon-glow"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ backgroundColor: accent, opacity: 0.15 }}
          />
        )}
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-lg md:max-w-3xl px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-14 text-center"
        >
          <h1
            className={`font-display text-[10vw] sm:text-[8vw] md:text-[6vw] leading-none tracking-tight ${
              theme === 'persona-5' ? '-skew-x-6' : ''
            } ${theme === 'persona-3' ? 'neon-glow' : ''}`}
            style={{ color: accent }}
          >
            SELECT YOUR FIELD
          </h1>
          <div className="h-1 w-32 sm:w-40 mx-auto mt-3" style={{ backgroundColor: accent }} />
          <p className="mt-4 text-xs sm:text-sm tracking-widest text-muted-foreground">
            THE PORTFOLIO WILL ADAPT TO YOUR CHOICE
          </p>
        </motion.div>

        <nav className="space-y-3 sm:space-y-4">
          {FIELDS.map((item, index) => {
            const isSelected = selectedIndex === index
            return (
              <motion.button
                key={item.id}
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => choose(index)}
                onMouseEnter={() => { if (!wasTouched.current) setSelectedIndex(index) }}
                onFocus={() => { if (!wasTouched.current) setSelectedIndex(index) }}
                data-sfx-interactive
                className={`w-full text-left relative outline-none ${theme === 'persona-5' ? '-skew-x-3' : ''}`}
              >
                <motion.div
                  className="absolute inset-0 -z-10"
                  initial={false}
                  animate={{ backgroundColor: isSelected ? accent : 'transparent', scaleX: isSelected ? 1 : 0 }}
                  style={{ originX: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <div className={`py-4 px-6 sm:py-5 sm:px-7 flex items-center justify-between ${theme === 'persona-5' ? 'skew-x-3' : ''}`}>
                  <div>
                    <span
                      className="font-display text-2xl sm:text-4xl tracking-wider block"
                      style={{ color: isSelected ? 'var(--background)' : 'var(--foreground)' }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-xs sm:text-sm tracking-widest opacity-70"
                      style={{ color: isSelected ? 'var(--background)' : 'var(--muted-foreground)' }}
                    >
                      {item.sublabel}
                    </span>
                  </div>
                  <motion.span
                    animate={{ x: isSelected ? 0 : -20, opacity: isSelected ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-display text-3xl sm:text-4xl"
                    style={{ color: 'var(--background)' }}
                  >
                    {'>'}
                  </motion.span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px opacity-20" style={{ backgroundColor: accent }} />
              </motion.button>
            )
          })}
        </nav>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 text-center text-xs sm:text-sm text-muted-foreground tracking-widest"
        >
          <span style={{ color: accent }}>ARROWS/WS</span> TO NAVIGATE
          <span className="mx-2 sm:mx-4">|</span>
          <span style={{ color: accent }}>ENTER</span> TO SELECT
          <span className="mx-2 sm:mx-4">|</span>
          <span style={{ color: accent }}>ESC</span> TO GO BACK
        </motion.p>
      </div>
    </motion.div>
  )
}
