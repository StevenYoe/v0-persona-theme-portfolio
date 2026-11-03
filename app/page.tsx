"use client"

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/lib/store'
import { getFieldContent } from '@/lib/portfolio-data'
import { getAudioPlayerInstance } from '@/components/audio-manager'
import { LenisProvider } from '@/components/lenis-provider'
import { StartScreen } from '@/components/start-screen'
import { MainMenu } from '@/components/main-menu'
import { FieldSelect } from '@/components/field-select'
import { SettingsMenu } from '@/components/settings-menu'
import { PauseMenu } from '@/components/pause-menu'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { SkillsSection } from '@/components/skills-section'
import { ExperienceSection } from '@/components/experience-section'
import { ProjectsSection } from '@/components/projects-section'
import { ContactSection } from '@/components/contact-section'
import { CustomCursor } from '@/components/custom-cursor'
import { TransitionWrapper } from '@/components/transition-wrapper'
import { AudioManager } from '@/components/audio-manager'
import PreLoader from '@/components/pre-loader';

const SECTION_COMPONENTS = {
  about: AboutSection,
  skills: SkillsSection,
  experience: ExperienceSection,
  projects: ProjectsSection,
  contact: ContactSection,
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const { currentScreen, openPauseMenu, theme, setScreen, sfxEnabled, sfxVolume, field } = useGameStore()
  const content = getFieldContent(field)

  // Apply theme on mount and changes
  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])

  const playSfx = useCallback((type: 'hover' | 'select') => {
    if (sfxEnabled) {
      const player = getAudioPlayerInstance()
      if (player) {
        player.playSFX(type, sfxVolume)
      }
    }
  }, [sfxEnabled, sfxVolume])

  // ESC key to open pause menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && currentScreen === 'portfolio') {
        e.preventDefault()
        playSfx('select')
        openPauseMenu()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentScreen, openPauseMenu, playSfx])

  if (isLoading) {
    return <PreLoader onComplete={() => setIsLoading(false)} />
  }

  return (
    <LenisProvider>
      <CustomCursor />
      <AudioManager />
      
      <AnimatePresence mode="wait">
        {/* Start Screen */}
        {currentScreen === 'start-screen' && (
          <StartScreen key="start-screen" />
        )}

        {/* Main Menu */}
        {currentScreen === 'main-menu' && (
          <MainMenu key="main-menu" />
        )}

        {/* Field Select */}
        {currentScreen === 'field-select' && (
          <FieldSelect key="field-select" />
        )}

        {/* Settings Menu */}
        {currentScreen === 'settings' && (
          <SettingsMenu key="settings" />
        )}

        {/* Portfolio (Main Content) */}
        {(currentScreen === 'portfolio' || currentScreen === 'pause-menu') && (
          <main key={`portfolio-${field ?? 'default'}`} className="relative">
            <Navigation />
            
            <TransitionWrapper>
              <div id="hero">
                <HeroSection />
              </div>
              
              {content.sections.map((id) => {
                const Section = SECTION_COMPONENTS[id]
                return (
                  <div id={id} key={id}>
                    <Section />
                  </div>
                )
              })}
            </TransitionWrapper>
          </main>
        )}
      </AnimatePresence>

      {/* Pause Menu Overlay */}
      <PauseMenu />
    </LenisProvider>
  )
}
