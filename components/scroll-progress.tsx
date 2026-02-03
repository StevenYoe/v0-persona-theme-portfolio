"use client"

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useGameStore } from '@/lib/store'

const sections = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'work', label: 'WORK' },
  { id: 'contact', label: 'CONTACT' },
]

export function ScrollProgress() {
  const theme = useGameStore((state) => state.theme)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const [activeSection, setActiveSection] = useState(0)
  const [scrollPercent, setScrollPercent] = useState(0)

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Calculate scroll percentage
      const percent = Math.round((scrollY / (documentHeight - windowHeight)) * 100)
      setScrollPercent(Math.min(100, Math.max(0, percent)))

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

  // Progress for section indicator
  const sectionProgress = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, (sections.length - 1)]
  )

  return (
    <>
      {/* Top progress bar with theme-specific styling */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[60] origin-left"
        style={{ 
          backgroundColor: accent,
          scaleX,
          boxShadow: theme === 'persona-3' ? `0 0 10px ${accent}, 0 0 20px ${accent}` : 'none'
        }}
      />

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

        {/* Scroll percentage */}
        <motion.div
          className="mt-6 font-display text-xs tracking-wider"
          style={{ color: accent }}
        >
          {scrollPercent}%
        </motion.div>
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
