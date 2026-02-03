"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useGameStore } from '@/lib/store'

const navItems = [
  { name: 'HOME', href: '#hero' },
  { name: 'ABOUT', href: '#about' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'WORK', href: '#work' },
  { name: 'CONTACT', href: '#contact' },
]

export function Navigation() {
  const theme = useGameStore((state) => state.theme)
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
      
      // Detect active section
      const sections = ['hero', 'about', 'skills', 'work', 'contact']
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(section)
          break
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Desktop nav */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 hidden lg:block transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
        style={{
          backgroundColor: scrolled ? 'rgba(0,0,0,0.9)' : 'transparent'
        }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
            className="font-display text-2xl tracking-wider"
            style={{ color: accent }}
            whileHover={{ scale: 1.05 }}
          >
            PORTFOLIO
          </motion.a>

          {/* Nav items */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href) }}
                className="relative font-display text-sm tracking-[0.2em] transition-colors"
                style={{ 
                  color: activeSection === item.href.replace('#', '') ? accent : 'var(--foreground)'
                }}
                whileHover={{ y: -2 }}
              >
                {item.name}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ backgroundColor: accent }}
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: activeSection === item.href.replace('#', '') ? 1 : 0 
                  }}
                />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5"
        style={{ backgroundColor: accent }}
      >
        <motion.span
          animate={{ 
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 6 : 0
          }}
          className="w-6 h-0.5 bg-background block"
        />
        <motion.span
          animate={{ opacity: isOpen ? 0 : 1 }}
          className="w-6 h-0.5 bg-background block"
        />
        <motion.span
          animate={{ 
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -6 : 0
          }}
          className="w-6 h-0.5 bg-background block"
        />
      </motion.button>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ backgroundColor: 'var(--background)' }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(item.href) }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`font-display text-4xl tracking-wider ${
                    theme === 'persona-5' ? '-skew-x-6' : ''
                  }`}
                  style={{ 
                    color: activeSection === item.href.replace('#', '') ? accent : 'var(--foreground)'
                  }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ 
          backgroundColor: accent,
          scaleX: 0
        }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
      />
    </>
  )
}
