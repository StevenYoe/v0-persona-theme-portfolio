"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { useGameStore } from '@/lib/store'

const socialLinks = [
  { name: 'GITHUB', url: '#' },
  { name: 'LINKEDIN', url: '#' },
  { name: 'TWITTER', url: '#' },
  { name: 'DRIBBBLE', url: '#' },
]

export function ContactSection() {
  const theme = useGameStore((state) => state.theme)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -50])
  const rotate = useTransform(scrollYProgress, [0, 1], [5, -5])

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  const themeMessages = {
    'persona-3': "The Dark Hour awaits...",
    'persona-4': "Reach out through the fog...",
    'persona-5': "Show me your true form..."
  }

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div
        style={{ y, rotate }}
        className="absolute inset-0 pointer-events-none"
      >
        {theme === 'persona-5' && (
          <div className="absolute inset-0 opacity-5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-px"
                style={{
                  backgroundColor: accent,
                  top: `${20 + i * 15}%`,
                  transform: `rotate(${-3 + i}deg)`
                }}
              />
            ))}
          </div>
        )}
        
        {theme === 'persona-4' && (
          <div className="absolute inset-0 tv-static opacity-10" />
        )}
        
        {theme === 'persona-3' && (
          <motion.div
            animate={{ 
              opacity: [0.05, 0.1, 0.05],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
            style={{ 
              background: `radial-gradient(circle, ${accent}40 0%, transparent 70%)`
            }}
          />
        )}
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px" style={{ backgroundColor: accent }} />
            <span className="text-sm tracking-[0.3em]" style={{ color: accent }}>
              04 / CONTACT
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - CTA */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`font-display text-6xl md:text-8xl tracking-tight leading-none ${
                theme === 'persona-5' ? '-skew-x-3' : ''
              }`}
            >
              <span className="text-foreground">{"LET'S"}</span>
              <br />
              <span style={{ color: accent }}>CONNECT</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground mt-8 max-w-md"
            >
              {themeMessages[theme]}
            </motion.p>

            {/* Email */}
            <motion.a
              href="mailto:hello@yourname.com"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ x: 20 }}
              className={`inline-block mt-8 font-display text-2xl md:text-3xl tracking-wider border-b-2 pb-2 transition-colors ${
                theme === 'persona-5' ? '-skew-x-3' : ''
              }`}
              style={{ 
                borderColor: accent,
                color: accent
              }}
            >
              HELLO@YOURNAME.COM
            </motion.a>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-6 mt-12"
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  whileHover={{ y: -5 }}
                  className="relative font-display text-lg tracking-wider transition-colors"
                  style={{ 
                    color: hoveredLink === link.name ? accent : 'var(--muted-foreground)'
                  }}
                >
                  {link.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ backgroundColor: accent }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredLink === link.name ? 1 : 0 }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <form className="space-y-6">
              {[
                { label: 'NAME', type: 'text', placeholder: 'Your name' },
                { label: 'EMAIL', type: 'email', placeholder: 'your@email.com' },
                { label: 'MESSAGE', type: 'textarea', placeholder: 'Your message...' },
              ].map((field, i) => (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <label 
                    className="block text-sm tracking-[0.2em] mb-2"
                    style={{ color: accent }}
                  >
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      placeholder={field.placeholder}
                      rows={5}
                      className={`w-full px-4 py-3 bg-secondary border-2 transition-all duration-300 focus:outline-none text-foreground placeholder:text-muted-foreground ${
                        theme === 'persona-5' ? '-skew-x-2' : ''
                      }`}
                      style={{ borderColor: accent + '40' }}
                      onFocus={(e) => e.target.style.borderColor = accent}
                      onBlur={(e) => e.target.style.borderColor = accent + '40'}
                    />
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className={`w-full px-4 py-3 bg-secondary border-2 transition-all duration-300 focus:outline-none text-foreground placeholder:text-muted-foreground ${
                        theme === 'persona-5' ? '-skew-x-2' : ''
                      }`}
                      style={{ borderColor: accent + '40' }}
                      onFocus={(e) => e.target.style.borderColor = accent}
                      onBlur={(e) => e.target.style.borderColor = accent + '40'}
                    />
                  )}
                </motion.div>
              ))}

              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 font-display text-2xl tracking-wider transition-all duration-300 ${
                  theme === 'persona-5' ? '-skew-x-3' : ''
                }`}
                style={{ 
                  backgroundColor: accent,
                  color: theme === 'persona-5' ? '#fff' : 'var(--background)'
                }}
              >
                SEND MESSAGE
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 right-0 py-8"
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <span>© 2026 YOUR NAME. All rights reserved.</span>
          <span className="font-display tracking-wider" style={{ color: accent }}>
            {theme === 'persona-3' && 'MEMENTO MORI'}
            {theme === 'persona-4' && 'REACH OUT TO THE TRUTH'}
            {theme === 'persona-5' && 'TAKE YOUR HEART'}
          </span>
        </div>
      </motion.footer>
    </section>
  )
}
