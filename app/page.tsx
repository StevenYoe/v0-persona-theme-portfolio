"use client"

import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/lib/store'
import { LenisProvider } from '@/components/lenis-provider'
import { MainMenu } from '@/components/main-menu'
import { SettingsMenu } from '@/components/settings-menu'
import { PauseMenu } from '@/components/pause-menu'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { SkillsSection } from '@/components/skills-section'
import { ExperienceSection } from '@/components/experience-section'
import { ProjectsSection } from '@/components/projects-section'
import { TestimonialsCarousel } from '@/components/testimonials-carousel'
import { ContactSection } from '@/components/contact-section'
import { CustomCursor } from '@/components/custom-cursor'
import { ScrollProgress } from '@/components/scroll-progress'
import { TransitionWrapper } from '@/components/transition-wrapper'

export default function Home() {
  const currentScreen = useGameStore((state) => state.currentScreen)
  const openPauseMenu = useGameStore((state) => state.openPauseMenu)
  const theme = useGameStore((state) => state.theme)

  // Apply theme on mount and changes
  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])

  // ESC key to open pause menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && currentScreen === 'portfolio') {
        e.preventDefault()
        openPauseMenu()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentScreen, openPauseMenu])

  return (
    <LenisProvider>
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {/* Main Menu */}
        {currentScreen === 'main-menu' && (
          <MainMenu key="main-menu" />
        )}

        {/* Settings Menu */}
        {currentScreen === 'settings' && (
          <SettingsMenu key="settings" />
        )}

        {/* Portfolio (Main Content) */}
        {(currentScreen === 'portfolio' || currentScreen === 'pause-menu') && (
          <main key="portfolio" className="relative">
            <ScrollProgress />
            <Navigation />
            
            <TransitionWrapper>
              <div id="hero">
                <HeroSection />
              </div>
              
              <div id="about">
                <AboutSection />
              </div>
              
              <div id="skills">
                <SkillsSection />
              </div>
              
              <div id="experience">
                <ExperienceSection />
              </div>
              
              <div id="projects">
                <ProjectsSection />
              </div>
              
              <div id="testimonials">
                <TestimonialsCarousel />
              </div>
              
              <div id="contact">
                <ContactSection />
              </div>
            </TransitionWrapper>
          </main>
        )}
      </AnimatePresence>

      {/* Pause Menu Overlay */}
      <PauseMenu />
    </LenisProvider>
  )
}
