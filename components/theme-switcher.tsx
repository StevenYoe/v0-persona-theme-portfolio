"use client"

import { usePersonaTheme } from './persona-theme-context'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const themes = [
  { 
    id: 'persona-3' as const, 
    name: 'P3', 
    fullName: 'PERSONA 3',
    color: '#00d4ff',
    subtitle: 'Memento Mori'
  },
  { 
    id: 'persona-4' as const, 
    name: 'P4', 
    fullName: 'PERSONA 4',
    color: '#ffd700',
    subtitle: 'Reach Out to the Truth'
  },
  { 
    id: 'persona-5' as const, 
    name: 'P5', 
    fullName: 'PERSONA 5',
    color: '#e60012',
    subtitle: 'Take Your Heart'
  },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = usePersonaTheme()
  const [isOpen, setIsOpen] = useState(false)

  const currentTheme = themes.find(t => t.id === theme) || themes[2]

  return (
    <div className="fixed top-6 right-6 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative px-4 py-2 font-display text-2xl tracking-wider border-2 transition-all duration-300"
        style={{ 
          borderColor: currentTheme.color,
          color: currentTheme.color,
          backgroundColor: 'rgba(0,0,0,0.8)'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10">{currentTheme.name}</span>
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: currentTheme.color }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute top-full right-0 mt-2 overflow-hidden"
            style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
          >
            {themes.map((t, i) => (
              <motion.button
                key={t.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => {
                  setTheme(t.id)
                  setIsOpen(false)
                }}
                className={`block w-full px-6 py-4 text-left transition-all duration-300 border-l-4 ${
                  theme === t.id ? 'bg-opacity-20' : ''
                }`}
                style={{ 
                  borderColor: t.color,
                  backgroundColor: theme === t.id ? t.color + '20' : 'transparent'
                }}
                whileHover={{ 
                  backgroundColor: t.color + '30',
                  x: 10
                }}
              >
                <span 
                  className="font-display text-xl tracking-widest block"
                  style={{ color: t.color }}
                >
                  {t.fullName}
                </span>
                <span className="text-xs text-muted-foreground mt-1 block">
                  {t.subtitle}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
