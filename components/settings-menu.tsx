"use client"

import React from "react"

import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { useGameStore, type PersonaTheme } from '@/lib/store'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { getAudioPlayerInstance } from '@/components/audio-manager'

const themeOptions: { id: PersonaTheme; label: string; description: string }[] = [
  { id: 'persona-3', label: 'PERSONA 3', description: 'Blue Moon / Memento Mori' },
  { id: 'persona-4', label: 'PERSONA 4', description: 'Golden Fog / Reach Out to the Truth' },
  { id: 'persona-5', label: 'PERSONA 5', description: 'Red Rebellion / Take Your Heart' },
]

interface SettingItem {
  id: string
  label: string
  type: 'theme' | 'slider' | 'toggle'
}

const settingItems: SettingItem[] = [
  { id: 'theme', label: 'THEME', type: 'theme' },
  { id: 'music', label: 'MUSIC VOLUME', type: 'slider' },
  { id: 'sfx', label: 'SFX VOLUME', type: 'slider' },
  { id: 'cursor', label: 'CUSTOM CURSOR', type: 'toggle' },
  { id: 'back', label: 'BACK', type: 'toggle' },
]

export function SettingsMenu() {
  const theme = useGameStore((state) => state.theme)
  const setTheme = useGameStore((state) => state.setTheme)
  const goBack = useGameStore((state) => state.goBack)
  const musicVolume = useGameStore((state) => state.musicVolume)
  const setMusicVolume = useGameStore((state) => state.setMusicVolume)
  const sfxVolume = useGameStore((state) => state.sfxVolume)
  const setSfxVolume = useGameStore((state) => state.setSfxVolume)
  const cursorEnabled = useGameStore((state) => state.cursorEnabled)
  const toggleCursor = useGameStore((state) => state.toggleCursor)
  const sfxEnabled = useGameStore((state) => state.sfxEnabled)
  
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [themeIndex, setThemeIndex] = useState(
    themeOptions.findIndex(t => t.id === theme)
  )

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  const playSfx = useCallback((type: 'hover' | 'select') => {
    if (sfxEnabled) {
      const player = getAudioPlayerInstance()
      if (player) {
        player.playSFX(type, sfxVolume)
      }
    }
  }, [sfxEnabled, sfxVolume])

  const handleAction = useCallback((itemId: string, direction?: 'left' | 'right') => {
    playSfx('select')
    switch (itemId) {
      case 'theme':
        if (direction === 'left') {
          const newIndex = (themeIndex - 1 + themeOptions.length) % themeOptions.length
          setThemeIndex(newIndex)
          setTheme(themeOptions[newIndex].id)
        } else if (direction === 'right') {
          const newIndex = (themeIndex + 1) % themeOptions.length
          setThemeIndex(newIndex)
          setTheme(themeOptions[newIndex].id)
        }
        break
      case 'music':
        if (direction === 'left') {
          setMusicVolume(Math.max(0, musicVolume - 10))
        } else if (direction === 'right') {
          setMusicVolume(Math.min(100, musicVolume + 10))
        }
        break
      case 'sfx':
        if (direction === 'left') {
          setSfxVolume(Math.max(0, sfxVolume - 10))
        } else if (direction === 'right') {
          setSfxVolume(Math.min(100, sfxVolume + 10))
        }
        break
      case 'cursor':
        toggleCursor()
        break
      case 'back':
        goBack()
        break
    }
  }, [themeIndex, setTheme, musicVolume, setMusicVolume, sfxVolume, setSfxVolume, toggleCursor, goBack, playSfx])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault()
          playSfx('hover')
          setSelectedIndex((prev) => (prev - 1 + settingItems.length) % settingItems.length)
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault()
          playSfx('hover')
          setSelectedIndex((prev) => (prev + 1) % settingItems.length)
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault()
          handleAction(settingItems[selectedIndex].id, 'left')
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault()
          handleAction(settingItems[selectedIndex].id, 'right')
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (settingItems[selectedIndex].id === 'back') {
            goBack()
            playSfx('select')
          } else if (settingItems[selectedIndex].type === 'toggle') {
            handleAction(settingItems[selectedIndex].id)
          }
          break
        case 'Escape':
          e.preventDefault()
          goBack()
          playSfx('select')
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, handleAction, goBack, playSfx])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          style={{
            background: `repeating-linear-gradient(45deg, transparent, transparent 60px, ${accent}05 60px, ${accent}05 62px)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl px-4 sm:px-6 md:px-8">
        {/* Title */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <h1 
            className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider ${
              theme === 'persona-5' ? '-skew-x-6' : ''
            }`}
            style={{ color: accent }}
          >
            SETTINGS
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="h-1 w-24 sm:w-28 md:w-32 mt-2 sm:mt-3 md:mt-4"
            style={{ backgroundColor: accent, originX: 0 }}
          />
        </motion.div>

        {/* Settings list */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {settingItems.map((item, index) => {
            const isSelected = selectedIndex === index
            
            return (
              <motion.div
                key={item.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`relative ${theme === 'persona-5' ? '-skew-x-3' : ''}`}
              >
                {/* Selection background */}
                <motion.div
                  className="absolute inset-0 -z-10"
                  animate={{
                    backgroundColor: isSelected ? `${accent}20` : 'transparent',
                    scaleX: isSelected ? 1 : 0
                  }}
                  style={{ originX: 0 }}
                  transition={{ duration: 0.2 }}
                />

                <div 
                  className={`py-3 px-4 sm:py-4 sm:px-5 md:py-5 md:px-6 flex items-center justify-between flex-wrap gap-y-2 ${
                    theme === 'persona-5' ? 'skew-x-3' : ''
                  }`}
                >
                  {/* Label */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <motion.div
                      animate={{ scale: isSelected ? 1 : 0 }}
                      className="w-2 h-2 sm:w-3 sm:h-3"
                      style={{ backgroundColor: accent }}
                    />
                    <span 
                      className="font-display text-xl sm:text-2xl md:text-3xl tracking-wider"
                      style={{ color: isSelected ? accent : 'var(--foreground)' }}
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* Control */}
                  <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-end">
                    {item.id === 'theme' && (
                      <div className="flex items-center gap-3 sm:gap-4">
                        <button
                          onClick={() => handleAction('theme', 'left')}
                          className="font-display text-xl sm:text-2xl px-1 sm:px-2 opacity-60 hover:opacity-100 transition-opacity"
                          style={{ color: accent }}
                        >
                          {'<'}
                        </button>
                        <div className="w-28 sm:w-36 md:w-48 text-center">
                          <span 
                            className="font-display text-base sm:text-lg tracking-wider"
                            style={{ color: accent }}
                          >
                            {themeOptions[themeIndex].label}
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">
                            {themeOptions[themeIndex].description}
                          </p>
                        </div>
                        <button
                          onClick={() => handleAction('theme', 'right')}
                          className="font-display text-xl sm:text-2xl px-1 sm:px-2 opacity-60 hover:opacity-100 transition-opacity"
                          style={{ color: accent }}
                        >
                          {'>'}
                        </button>
                      </div>
                    )}

                    {item.id === 'music' && (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleAction('music', 'left')}
                          className="font-display text-xl sm:text-2xl px-1 sm:px-2 opacity-60 hover:opacity-100 transition-opacity"
                          style={{ color: accent }}
                        >
                          {'<'}
                        </button>
                        <Slider
                          value={[musicVolume]}
                          max={100}
                          step={10}
                          onValueChange={(value) => {
                            setMusicVolume(value[0])
                            playSfx('select')
                          }}
                          className="w-32 sm:w-48 md:w-64"
                          style={{ 
                            '--slider-track': `${accent}30`,
                            '--slider-range': accent,
                            '--slider-thumb': accent
                          } as React.CSSProperties}
                        />
                        <button
                          onClick={() => handleAction('music', 'right')}
                          className="font-display text-xl sm:text-2xl px-1 sm:px-2 opacity-60 hover:opacity-100 transition-opacity"
                          style={{ color: accent }}
                        >
                          {'>'}
                        </button>
                        <span 
                          className="font-display text-base sm:text-lg w-8 text-right"
                          style={{ color: accent }}
                        >
                          {musicVolume}%
                        </span>
                      </div>
                    )}

                    {item.id === 'sfx' && (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleAction('sfx', 'left')}
                          className="font-display text-xl sm:text-2xl px-1 sm:px-2 opacity-60 hover:opacity-100 transition-opacity"
                          style={{ color: accent }}
                        >
                          {'<'}
                        </button>
                        <Slider
                          value={[sfxVolume]}
                          max={100}
                          step={10}
                          onValueChange={(value) => {
                            setSfxVolume(value[0])
                            playSfx('select')
                          }}
                          className="w-32 sm:w-48 md:w-64"
                          style={{ 
                            '--slider-track': `${accent}30`,
                            '--slider-range': accent,
                            '--slider-thumb': accent
                          } as React.CSSProperties}
                        />
                        <button
                          onClick={() => handleAction('sfx', 'right')}
                          className="font-display text-xl sm:text-2xl px-1 sm:px-2 opacity-60 hover:opacity-100 transition-opacity"
                          style={{ color: accent }}
                        >
                          {'>'}
                        </button>
                        <span 
                          className="font-display text-base sm:text-lg w-8 text-right"
                          style={{ color: accent }}
                        >
                          {sfxVolume}%
                        </span>
                      </div>
                    )}

                    {item.id === 'cursor' && (
                      <Switch
                        checked={cursorEnabled}
                        onCheckedChange={() => {
                          toggleCursor()
                          playSfx('select')
                        }}
                        style={{
                          backgroundColor: cursorEnabled ? accent : 'var(--secondary)'
                        }}
                      />
                    )}

                    {item.id === 'back' && (
                      <button
                        onClick={() => {
                          goBack()
                          playSfx('select')
                        }}
                        className="font-display text-base sm:text-xl tracking-wider px-4 sm:px-6 py-1 sm:py-2 border-2 hover:bg-accent/20 transition-colors"
                        style={{ borderColor: accent, color: accent }}
                      >
                        {'<'} RETURN
                      </button>
                    )}
                  </div>
                </div>

                {/* Divider */}
                {item.id !== 'back' && (
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-px opacity-20"
                    style={{ backgroundColor: accent }}
                  />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 sm:mt-12 text-center text-xs sm:text-sm"
        >
          <p className="text-muted-foreground tracking-widest">
            <span style={{ color: accent }}>W/S</span> NAVIGATE
            <span className="mx-2">|</span>
            <span style={{ color: accent }}>A/D</span> ADJUST
            <span className="mx-2">|</span>
            <span style={{ color: accent }}>ESC</span> BACK
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
