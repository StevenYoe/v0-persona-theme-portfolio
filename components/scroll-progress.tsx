"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useGameStore } from '@/lib/store'

const sections = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'contact', label: 'CONTACT' },
]

export function ScrollProgress() {
  const theme = useGameStore((state) => state.theme)
  const [activeSection, setActiveSection] = useState(0)

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight

      // Find active section
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementMiddle = rect.top + rect.height / 2
          if (elementMiddle < windowHeight * 0.6 && elementMiddle > -rect.height * 0.4) {
            setActiveSection(index)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Side progress indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3">
        {/* Section dots */}
        {sections.map((section, index) => {
          const isActive = activeSection === index
          const isPast = activeSection > index
          
          return (
            <motion.button
              key={section.id}
              onClick={() => {
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group relative flex items-center"
              whileHover={{ scale: 1.1 }}
            >
              {/* Dot */}
              <motion.div
                animate={{
                  scale: isActive ? 1.5 : 1,
                  backgroundColor: isActive || isPast ? accent : 'transparent',
                }}
                className={`w-3 h-3 border-2 transition-colors ${
                  theme === 'persona-3' ? 'rounded-full' :
                  theme === 'persona-5' ? 'rotate-45' : ''
                }`}
                style={{ 
                  borderColor: accent,
                  boxShadow: isActive && theme === 'persona-3' ? `0 0 10px ${accent}` : 'none'
                }}
              />
              
              {/* Label on hover */}
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: -10 }}
                className="absolute right-8 font-display text-sm tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: accent }}
              >
                {section.label}
              </motion.span>

              {/* Connecting line */}
              {index < sections.length - 1 && (
                <motion.div
                  className="absolute top-full left-1/2 -translate-x-1/2 w-px h-3"
                  animate={{
                    backgroundColor: isPast ? accent : `${accent}30`
                  }}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Mobile bottom indicator */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex xl:hidden items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border"
        style={{ borderColor: `${accent}30` }}
      >
        {sections.map((section, index) => {
          const isActive = activeSection === index
          
          return (
            <motion.button
              key={section.id}
              onClick={() => {
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
              animate={{
                scale: isActive ? 1.3 : 1,
                backgroundColor: isActive ? accent : 'transparent',
              }}
              className={`w-2 h-2 border transition-colors ${
                theme === 'persona-3' ? 'rounded-full' :
                theme === 'persona-5' ? 'rotate-45' : ''
              }`}
              style={{ borderColor: accent }}
            />
          )
        })}
      </div>
    </>
  )
}
