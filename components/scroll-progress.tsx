"use client"

import { motion, useScroll, useSpring } from 'framer-motion'
import { usePersonaTheme } from './persona-theme-context'

export function ScrollProgress() {
  const { theme } = usePersonaTheme()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ 
          backgroundColor: accent,
          scaleX
        }}
      />

      {/* Side progress indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-2">
        <motion.div
          className="w-px h-32 origin-top"
          style={{ 
            backgroundColor: accent + '30',
          }}
        />
        <motion.div
          className="w-px origin-top absolute top-0"
          style={{ 
            backgroundColor: accent,
            height: 128,
            scaleY: scrollYProgress
          }}
        />
        <motion.span
          className="font-display text-xs tracking-wider mt-4"
          style={{ color: accent }}
        >
          <motion.span>
            {/* This will show percentage */}
          </motion.span>
        </motion.span>
      </div>
    </>
  )
}
