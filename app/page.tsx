"use client"

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/lib/store'
import { getAudioPlayerInstance } from '@/components/audio-manager'
import { LenisProvider } from '@/components/lenis-provider'
import { StartScreen } from '@/components/start-screen'
import { MainMenu } from '@/components/main-menu'
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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const { currentScreen, openPauseMenu, theme, setScreen, sfxEnabled, sfxVolume } = useGameStore()

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

        {/* Settings Menu */}
        {currentScreen === 'settings' && (
          <SettingsMenu key="settings" />
        )}

        {/* Portfolio (Main Content) */}
        {(currentScreen === 'portfolio' || currentScreen === 'pause-menu') && (
          <main key="portfolio" className="relative">
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
