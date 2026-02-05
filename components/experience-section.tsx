"use client"

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { useGameStore } from '@/lib/store'
import { ParallaxSection, FloatingElement } from './parallax-section'

type ExperienceTab = 'work' | 'organization' | 'education'

const workExperience = [
  {
    id: 1,
    role: 'Senior Frontend Developer',
    company: 'Tech Innovations Inc.',
    period: '2023 - Present',
    description: 'Leading frontend architecture and mentoring junior developers. Building scalable React applications with Next.js.',
    highlights: ['Led team of 5 developers', 'Improved performance by 40%', 'Implemented design system']
  },
  {
    id: 2,
    role: 'Full Stack Developer',
    company: 'Digital Solutions Co.',
    period: '2021 - 2023',
    description: 'Developed full-stack applications using React, Node.js, and PostgreSQL. Collaborated with design team on UX improvements.',
    highlights: ['Built 10+ client projects', 'Integrated payment systems', 'API development']
  },
  {
    id: 3,
    role: 'Junior Developer',
    company: 'StartUp Hub',
    period: '2019 - 2021',
    description: 'Started journey as a developer, learning modern web technologies and contributing to various startup projects.',
    highlights: ['React fundamentals', 'Agile methodology', 'Version control']
  },
]

const organizationExperience = [
  {
    id: 1,
    role: 'Tech Lead',
    company: 'Developer Community Local',
    period: '2022 - Present',
    description: 'Organizing tech meetups and workshops for local developer community. Managing volunteer teams and speaker coordination.',
    highlights: ['500+ community members', 'Monthly events', 'Workshop facilitation']
  },
  {
    id: 2,
    role: 'Open Source Contributor',
    company: 'Various Projects',
    period: '2020 - Present',
    description: 'Active contributor to open source projects. Maintaining personal libraries and contributing to popular frameworks.',
    highlights: ['100+ contributions', 'Library maintainer', 'Documentation']
  },
  {
    id: 3,
    role: 'Hackathon Organizer',
    company: 'Code For Good',
    period: '2021 - 2022',
    description: 'Organized hackathons focused on social impact. Coordinated with sponsors and managed participant experience.',
    highlights: ['3 major events', '200+ participants', 'Sponsorship management']
  },
]

const education = [
  {
    id: 1,
    role: 'Bachelor of Computer Science',
    company: 'University of Technology',
    period: '2015 - 2019',
    description: 'Graduated with honors. Specialized in software engineering and human-computer interaction.',
    highlights: ['GPA 3.8/4.0', 'Dean\'s List', 'Research assistant']
  },
  {
    id: 2,
    role: 'Full Stack Bootcamp',
    company: 'Code Academy Pro',
    period: '2019',
    description: 'Intensive 12-week program covering modern web development stack from frontend to deployment.',
    highlights: ['React/Node.js', 'MongoDB', 'AWS deployment']
  },
  {
    id: 3,
    role: 'Various Certifications',
    company: 'Online Platforms',
    period: '2019 - Present',
    description: 'Continuous learning through various online certifications and courses.',
    highlights: ['AWS Certified', 'Google Analytics', 'UI/UX Design']
  },
]

const tabs: { id: ExperienceTab; label: string; sublabel: string }[] = [
  { id: 'work', label: 'WORK', sublabel: 'Professional Experience' },
  { id: 'organization', label: 'ORGANIZATION', sublabel: 'Community & Volunteer' },
  { id: 'education', label: 'EDUCATION', sublabel: 'Learning Journey' },
]

export function ExperienceSection() {
  const theme = useGameStore((state) => state.theme)
  const parallaxIntensity = useGameStore((state) => state.parallaxIntensity)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<ExperienceTab>('work')
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const springConfig = { stiffness: 50, damping: 20 }
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [100 * parallaxIntensity, -100 * parallaxIntensity]), springConfig)
  const x1 = useSpring(useTransform(scrollYProgress, [0, 1], [-150 * parallaxIntensity, 150 * parallaxIntensity]), springConfig)
  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [-10 * parallaxIntensity, 10 * parallaxIntensity]), springConfig)

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  const getExperienceData = () => {
    switch (activeTab) {
      case 'work': return workExperience
      case 'organization': return organizationExperience
      case 'education': return education
    }
  }

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background decorations */}
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute inset-0 pointer-events-none"
      >
        {theme === 'persona-5' && (
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              background: `repeating-linear-gradient(45deg, transparent, transparent 40px, ${accent} 40px, ${accent} 42px)`
            }}
          />
        )}
        {theme === 'persona-4' && (
          <div className="absolute inset-0 tv-static opacity-10" />
        )}
        {theme === 'persona-3' && (
          [...Array(30)].map((_, i) => (
            <motion.div
              key={`star-exp-${i}`}
              animate={{ opacity: [0.1, 0.5, 0.1] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
              className="absolute rounded-full"
              style={{
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                backgroundColor: accent,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: `0 0 5px ${accent}`
              }}
            />
          ))
        )}
      </motion.div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <FloatingElement
            key={`float-exp-${i}`}
            floatIntensity={20 + i * 10}
            rotateIntensity={8}
            delay={i * 0.7}
            className="absolute"
          >
            <motion.div
              className={`${theme === 'persona-3' ? 'rounded-full' : theme === 'persona-5' ? 'rotate-45' : ''}`}
              style={{
                width: `${30 + Math.random() * 40}px`,
                height: `${30 + Math.random() * 40}px`,
                backgroundColor: `${accent}08`,
                border: `1px solid ${accent}20`,
                left: `${70 + i * 8}%`,
                top: `${15 + i * 20}%`,
              }}
            />
          </FloatingElement>
        ))}
      </div>

      {/* Large text background */}
      <motion.div
        style={{ x: x1 }}
        className="absolute top-1/4 -right-20 text-[20vw] font-display opacity-[0.02] pointer-events-none select-none"
        aria-hidden="true"
      >
        EXP
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <ParallaxSection speed={0.2} direction="up">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div 
                className="w-12 h-px" 
                style={{ backgroundColor: accent }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
              />
              <span className="text-sm tracking-[0.3em]" style={{ color: accent }}>
                03 / EXPERIENCE
              </span>
            </div>
            
            <h2 className={`font-display text-5xl md:text-7xl tracking-tight ${
              theme === 'persona-5' ? '-skew-x-3' : ''
            } ${theme === 'persona-3' ? 'neon-glow' : ''}`}>
              <span style={{ color: accent }}>MY</span>
              <span className="text-foreground ml-4">JOURNEY</span>
            </h2>
          </motion.div>
        </ParallaxSection>

        {/* Tabs */}
        <ParallaxSection speed={0.15} direction="up">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {tabs.map((tab, i) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative px-6 py-4 text-left transition-all duration-300 ${
                  theme === 'persona-5' ? '-skew-x-3' : theme === 'persona-3' ? 'rounded-lg' : ''
                }`}
                style={{
                  backgroundColor: activeTab === tab.id ? accent : 'var(--secondary)',
                  border: `2px solid ${activeTab === tab.id ? accent : accent + '30'}`
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={theme === 'persona-5' ? 'skew-x-3' : ''}>
                  <span 
                    className="font-display text-lg tracking-wider block"
                    style={{ 
                      color: activeTab === tab.id 
                        ? (theme === 'persona-4' ? '#1a1510' : '#fff') 
                        : 'var(--foreground)' 
                    }}
                  >
                    {tab.label}
                  </span>
                  <span 
                    className="text-xs tracking-wider"
                    style={{ 
                      color: activeTab === tab.id 
                        ? (theme === 'persona-4' ? '#1a1510' : '#ffffffaa') 
                        : 'var(--muted-foreground)' 
                    }}
                  >
                    {tab.sublabel}
                  </span>
                </div>

                {/* Active indicator line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ backgroundColor: theme === 'persona-4' ? '#1a1510' : '#fff' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeTab === tab.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </motion.div>
        </ParallaxSection>

        {/* Experience Timeline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Timeline line */}
            <div 
              className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px hidden md:block"
              style={{ backgroundColor: accent + '30' }}
            />

            <div className="space-y-8">
              {getExperienceData().map((item, i) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`relative grid md:grid-cols-2 gap-8 ${
                    i % 2 === 0 ? '' : 'md:direction-rtl'
                  }`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className={`absolute left-0 md:left-1/2 top-8 w-4 h-4 -translate-x-1/2 hidden md:block z-10 ${
                      theme === 'persona-3' ? 'rounded-full' : theme === 'persona-5' ? 'rotate-45' : ''
                    }`}
                    style={{ 
                      backgroundColor: hoveredId === item.id ? accent : 'var(--background)',
                      border: `3px solid ${accent}`,
                      boxShadow: hoveredId === item.id ? `0 0 15px ${accent}` : 'none'
                    }}
                    animate={{
                      scale: hoveredId === item.id ? 1.3 : 1
                    }}
                  />

                  {/* Content */}
                  <motion.div
                    className={`${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:col-start-2 md:pl-12'} ${
                      theme === 'persona-5' ? '' : ''
                    }`}
                    style={{ direction: 'ltr' }}
                  >
                    <motion.div
                      className={`p-6 border transition-all duration-300 relative ${
                        theme === 'persona-5' ? '-skew-x-2' : theme === 'persona-3' ? 'rounded-lg' : ''
                      }`}
                      style={{ 
                        borderColor: hoveredId === item.id ? accent : accent + '30',
                        backgroundColor: hoveredId === item.id ? accent + '08' : 'var(--secondary)'
                      }}
                      whileHover={{ y: -5 }}
                    >
                      <div className={theme === 'persona-5' ? 'skew-x-2' : ''}>
                        {/* Period badge */}
                        <motion.span
                          className={`inline-block px-3 py-1 text-xs tracking-wider mb-3 ${
                            theme === 'persona-3' ? 'rounded' : ''
                          }`}
                          style={{ 
                            backgroundColor: accent + '20',
                            color: accent
                          }}
                        >
                          {item.period}
                        </motion.span>

                        {/* Role & Company */}
                        <h3 
                          className="font-display text-2xl tracking-wider mb-1"
                          style={{ color: hoveredId === item.id ? accent : 'var(--foreground)' }}
                        >
                          {item.role}
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          {item.company}
                        </p>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground mb-4">
                          {item.description}
                        </p>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2">
                          {item.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className={`px-2 py-1 text-xs tracking-wider ${
                                theme === 'persona-3' ? 'rounded' : ''
                              }`}
                              style={{ 
                                border: `1px solid ${accent}40`,
                                color: accent
                              }}
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Decorative corner */}
                      <motion.div
                        className="absolute top-0 right-0 w-12 h-12 opacity-10"
                        style={{
                          backgroundColor: accent,
                          clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
                        }}
                        animate={{
                          opacity: hoveredId === item.id ? 0.3 : 0.1
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
