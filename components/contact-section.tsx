"use client"

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import { useGameStore } from '@/lib/store'
import { FloatingElement } from './parallax-section'

const socialLinks = [
  { name: 'GITHUB', url: 'https://github.com/StevenYoe', icon: 'GH' },
  { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/steven-yoe88', icon: 'LD' },
  { name: 'INSTAGRAM', url: 'https://www.instagram.com/stevenyoe88', icon: 'IG' },
  { name: 'WEBSITE', url: 'https://stevenyoe.is-a.dev', icon: 'WS' },
]

const contactMethods = [
  { 
    label: 'EMAIL ME', 
    value: 'stevenyoe80@gmail.com', 
    href: 'mailto:stevenyoe80@gmail.com',
    description: 'For business inquiries'
  },
  { 
    label: 'CHAT ON WHATSAPP', 
    value: '+62 851 8308 8865', 
    href: 'https://wa.me/6285183088865',
    description: 'Fast response, available 24/7'
  },
]

export function ContactSection() {
  const theme = useGameStore((state) => state.theme)
  const parallaxIntensity = useGameStore((state) => state.parallaxIntensity)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const springConfig = { stiffness: 50, damping: 20 }
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [100 * parallaxIntensity, -50 * parallaxIntensity]), springConfig)
  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [5 * parallaxIntensity, -5 * parallaxIntensity]), springConfig)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  const themeMessages = {
    'persona-3': { main: "The Dark Hour awaits...", sub: "Let's create something extraordinary together" },
    'persona-4': { main: "Reach out through the fog...", sub: "Discover the truth of collaboration" },
    'persona-5': { main: "Show me your true form...", sub: "Take your heart, steal the show" }
  }

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div
        style={{ y, rotate, scale }}
        className="absolute inset-0 pointer-events-none"
      >
        {theme === 'persona-5' && (
          <>
            <div className="absolute inset-0 opacity-5">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-px"
                  style={{
                    backgroundColor: accent,
                    top: `${10 + i * 12}%`,
                    transform: `rotate(${-5 + i * 1.5}deg)`
                  }}
                  animate={{ x: ['-10%', '10%', '-10%'] }}
                  transition={{ duration: 10 + i * 2, repeat: Infinity }}
                />
              ))}
            </div>
            {/* Large geometric shapes */}
            <motion.div
              className="absolute top-20 -right-32 w-96 h-96 opacity-5 rotate-45"
              style={{ border: `4px solid ${accent}` }}
              animate={{ rotate: [45, 50, 45] }}
              transition={{ duration: 20, repeat: Infinity }}
            />
          </>
        )}
        
        {theme === 'persona-4' && (
          <>
            <div className="absolute inset-0 tv-static opacity-15" />
            <motion.div
              animate={{ 
                opacity: [0.05, 0.15, 0.05],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-1/3 left-1/3 w-[60vw] h-[60vh] -translate-x-1/2 -translate-y-1/2"
              style={{ 
                background: `radial-gradient(ellipse, ${accent}30 0%, transparent 60%)`
              }}
            />
          </>
        )}
        
        {theme === 'persona-3' && (
          <>
            {/* Large moon */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 w-64 h-64 rounded-full moon-glow"
              style={{ 
                backgroundColor: accent,
                opacity: 0.15,
                boxShadow: `0 0 100px ${accent}50, 0 0 200px ${accent}30`
              }}
            />
            {/* Stars */}
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={`contact-star-${i}`}
                animate={{ opacity: [0.1, 0.8, 0.1] }}
                transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
                className="absolute rounded-full"
                style={{
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  backgroundColor: accent,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: `0 0 ${5 + Math.random() * 10}px ${accent}`
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <FloatingElement
            key={`contact-float-${i}`}
            floatIntensity={25 + i * 10}
            rotateIntensity={8}
            delay={i * 0.6}
            className="absolute"
          >
            <motion.div
              className={`${theme === 'persona-3' ? 'rounded-full' : theme === 'persona-5' ? 'rotate-45' : ''}`}
              style={{
                width: `${40 + Math.random() * 50}px`,
                height: `${40 + Math.random() * 50}px`,
                backgroundColor: `${accent}05`,
                border: `1px solid ${accent}20`,
                left: `${5 + i * 20}%`,
                top: `${60 + i * 8}%`,
              }}
            />
          </FloatingElement>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px" style={{ backgroundColor: accent }} />
            <span className="text-sm tracking-[0.3em]" style={{ color: accent }}>
              05 / CONTACT
            </span>
          </div>
        </motion.div>

        {/* Main CTA Area */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Big CTA */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`font-display text-6xl md:text-8xl lg:text-9xl tracking-tight leading-none ${
                theme === 'persona-5' ? '-skew-x-3' : ''
              } ${theme === 'persona-3' ? 'neon-glow' : ''}`}
            >
              <motion.span 
                className="text-foreground block"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                {"LET'S"}
              </motion.span>
              <motion.span 
                className="block"
                style={{ color: accent }}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                CONNECT
              </motion.span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-muted-foreground mt-8 max-w-lg leading-relaxed"
            >
              {themeMessages[theme].main}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mt-4 max-w-lg"
            >
              {themeMessages[theme].sub}
            </motion.p>
          </div>

          {/* Right - Contact Methods */}
          <div className="space-y-6">
            {contactMethods.map((method, i) => (
              <motion.a
                key={method.label}
                href={method.href}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                onMouseEnter={() => setHoveredMethod(method.label)}
                onMouseLeave={() => setHoveredMethod(null)}
                className={`block relative p-8 border-2 transition-all duration-300 ${
                  theme === 'persona-5' ? '-skew-x-3' : theme === 'persona-3' ? 'rounded-xl' : ''
                }`}
                style={{
                  borderColor: hoveredMethod === method.label ? accent : accent + '30',
                  backgroundColor: hoveredMethod === method.label ? accent + '10' : 'var(--secondary)'
                }}
              >
                <motion.div
                  className={theme === 'persona-5' ? 'skew-x-3' : ''}
                  whileHover={{ x: 10 }}
                >
                  <span 
                    className="text-sm tracking-[0.3em] block mb-2"
                    style={{ color: accent }}
                  >
                    {method.label}
                  </span>
                  <span 
                    className="font-display text-3xl md:text-4xl tracking-wider block mb-2"
                    style={{ color: hoveredMethod === method.label ? accent : 'var(--foreground)' }}
                  >
                    {method.value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {method.description}
                  </span>
                </motion.div>

                {/* Arrow indicator */}
                <motion.div
                  className={`absolute right-8 top-1/2 -translate-y-1/2 ${
                    theme === 'persona-5' ? 'skew-x-3' : ''
                  }`}
                  animate={{ 
                    x: hoveredMethod === method.label ? 10 : 0,
                    opacity: hoveredMethod === method.label ? 1 : 0.5
                  }}
                >
                  <svg 
                    className="w-8 h-8" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke={accent}
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>

                {/* Side accent */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1"
                  style={{ backgroundColor: accent }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: hoveredMethod === method.label ? 1 : 0 }}
                />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Social Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1 }}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-6 text-center border-2 transition-all duration-300 overflow-hidden ${
                theme === 'persona-5' ? '-skew-x-6' : theme === 'persona-3' ? 'rounded-xl' : ''
              }`}
              style={{
                borderColor: hoveredLink === link.name ? accent : accent + '30',
                backgroundColor: hoveredLink === link.name ? accent : 'var(--secondary)'
              }}
            >
              {/* Background animation */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: hoveredLink === link.name 
                    ? `radial-gradient(circle at 50% 50%, ${accent}40 0%, transparent 70%)`
                    : 'none'
                }}
              />

              <div className={`relative z-10 ${theme === 'persona-5' ? 'skew-x-6' : ''}`}>
                {/* Icon */}
                <motion.div
                  className={`w-12 h-12 mx-auto mb-3 flex items-center justify-center font-display text-xl ${
                    theme === 'persona-3' ? 'rounded-full' : theme === 'persona-5' ? 'rotate-45' : ''
                  }`}
                  style={{
                    backgroundColor: hoveredLink === link.name ? 'rgba(255,255,255,0.2)' : accent + '20',
                    color: hoveredLink === link.name 
                      ? (theme === 'persona-4' ? '#1a1510' : '#fff') 
                      : accent
                  }}
                  animate={{
                    scale: hoveredLink === link.name ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className={theme === 'persona-5' ? '-rotate-45' : ''}>{link.icon}</span>
                </motion.div>

                {/* Name */}
                <span 
                  className="font-display text-lg tracking-wider"
                  style={{ 
                    color: hoveredLink === link.name 
                      ? (theme === 'persona-4' ? '#1a1510' : '#fff') 
                      : 'var(--foreground)'
                  }}
                >
                  {link.name}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Availability Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`w-3 h-3 ${theme === 'persona-3' ? 'rounded-full' : ''}`}
              style={{ 
                backgroundColor: '#22c55e',
                boxShadow: '0 0 10px #22c55e'
              }}
            />
            <span className="text-muted-foreground tracking-wider">
              Currently available for new projects
            </span>
          </div>
          <span className="hidden md:block text-muted-foreground">|</span>
          <span className="text-muted-foreground tracking-wider">
            Response time: within 24 hours
          </span>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 right-0 py-8"
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <span>2026 STEVEN. All rights reserved.</span>
          <motion.span 
            className="font-display tracking-wider" 
            style={{ color: accent }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {theme === 'persona-3' && 'MEMENTO MORI'}
            {theme === 'persona-4' && 'REACH OUT TO THE TRUTH'}
            {theme === 'persona-5' && 'TAKE YOUR HEART'}
          </motion.span>
        </div>
      </motion.footer>
    </section>
  )
}
