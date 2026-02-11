"use client"

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { useGameStore } from '@/lib/store'
import { ParallaxSection, FloatingElement } from './parallax-section'

type ExperienceTab = 'work' | 'organization' | 'education'

const workExperience = [
  {
    id: 1,
    role: 'Product Operation Intern – Quality Assurance',
    company: 'PT Global Loyalty Indonesia',
    period: 'August 2025 – January 2026',
    description: 'Focused on ensuring seamless user experiences and validating functional requirements within high-traffic mobile applications as a Product Operation Intern – Quality Assurance.',
    highlights: [
      'Executed Manual Testing for Alfagift mobile app',
      'Developed comprehensive Test Scenarios & Cases',
      'Reported defects using Jira for timely resolution',
      'Authored User Guides for new features',
      'Utilized Postman, DBeaver, MongoDB, Redis for data validation'
    ]
  },
  {
    id: 2,
    role: 'IT Internship',
    company: 'PT Pristine Prima Lestari',
    period: 'March - July 2025',
    description: 'Managed full-stack web development, covering the entire SDLC, and provided essential technical support for company operations as an IT Intern.',
    highlights: [
      'Developed a full-stack company website & job portal',
      'Managed SDLC from frontend to backend & database',
      'Provided technical infrastructure support'
    ]
  },
  {
    id: 3,
    role: 'Web Development Internship',
    company: 'PT Samanasoft Inovasi Persada',
    period: 'June - July 2024',
    description: 'Contributed to web development projects by developing features for existing websites and programs, and creating tutorial videos.',
    highlights: [
      'Developed features for existing websites/programs',
      'Contributed to tutorial video creation'
    ]
  },
]

const organizationExperience = [
  {
    id: 1,
    role: 'Treasurer & Head of Multimedia Division',
    company: 'Inaugurasi 2024 (Senate Session Welcoming New Students)',
    period: '2024',
    description: 'Managed financial resources and multimedia aspects for the new student orientation event \'Inaugurasi 2024\'.',
    highlights: [
      'Managed budget allocation',
      'Led multimedia content creation'
    ]
  },
  {
    id: 2,
    role: 'Treasurer',
    company: 'ECLIVAL 2024 (E-Commerce Logistics Student Association Festival)',
    period: '2024',
    description: 'Handled financial management for ECLIVAL 2024, a large-scale festival organized by the E-Commerce Logistics Student Association.',
    highlights: [
      'Oversaw financial transactions & reporting',
      'Ensured fiscal responsibility'
    ]
  },
  {
    id: 3,
    role: 'Treasurer',
    company: 'E-Commerce Logistics Student Association',
    period: 'January 2023 - June 2024',
    description: 'Managed the financial affairs of the E-Commerce Logistics Student Association.',
    highlights: [
      'Responsible for financial planning & oversight',
      'Maintained accurate financial records'
    ]
  },
  {
    id: 4,
    role: 'Secretary & Treasurer',
    company: 'Anagata 2024 (New Student Orientation)',
    period: '2024',
    description: 'Served in key leadership roles for the new student orientation event \'Anagata 2024\', focusing on finance and administration.',
    highlights: [
      'Coordinated administrative tasks',
      'Managed financial records & budgets'
    ]
  },
  {
    id: 5,
    role: 'Head of Fresh Money Division',
    company: 'Ashandya 2023 (Cultural Events)',
    period: '2023',
    description: 'Led fundraising initiatives for the cultural event \'Ashandya 2023\'.',
    highlights: [
      'Led fundraising initiatives'
    ]
  },
  {
    id: 6,
    role: 'Event Division',
    company: 'Anagata 2023 (New Student Orientation)',
    period: '2023',
    description: 'Contributed to the event organization team for Anagata 2023.',
    highlights: [
      'Assisted in event planning and execution'
    ]
  },
  {
    id: 7,
    role: 'Equipment & Logistics Division',
    company: 'Outbound WMK FB UMN 2024 (Digital Entrepreneurship Event)',
    period: '2024',
    description: 'Managed equipment and logistics for the digital entrepreneurship event.',
    highlights: [
      'Managed equipment and logistics'
    ]
  },
  {
    id: 8,
    role: 'Committee',
    company: 'MNP Campus Visit Committee 2023',
    period: '2023',
    description: 'Served as a committee member for the MNP Campus Visit.',
    highlights: [
      'Contributed to campus visit organization'
    ]
  },
]

const education = [
  {
    id: 1,
    role: 'E-Commerce Logistics Major',
    company: 'Multimedia Nusantara Polytechnic',
    period: '2022 - Present',
    description: 'Currently pursuing a degree with a strong academic record, maintaining a high GPA and recognized as a scholarship recipient.',
    highlights: [
      'GPA: 3.84/4.0',
      'Scholarship recipient'
    ]
  },
  {
    id: 2,
    role: 'Certifications & Achievements',
    company: 'Various Platforms',
    period: '2023 - 2024',
    description: 'Participated in various online courses and training sessions to enhance technical skills and professional knowledge.',
    highlights: [
      'Samsung Innovation Campus Batch 5',
      'DQ Lab Data Analysis and Visualization',
      'Disaster Preparedness & Post-Disaster Resilience'
    ]
  },
]

const tabs: { id: ExperienceTab; label: string; sublabel: string }[] = [
  { id: 'work', label: 'WORK', sublabel: 'Professional Experience' },
  { id: 'organization', label: 'ORGANIZATION', sublabel: 'Leadership & Involvement' },
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
