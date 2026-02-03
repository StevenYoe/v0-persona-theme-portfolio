"use client"

import { PersonaThemeProvider } from '@/components/persona-theme-context'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { SkillsSection } from '@/components/skills-section'
import { ProjectsSection } from '@/components/projects-section'
import { ContactSection } from '@/components/contact-section'
import { CustomCursor } from '@/components/custom-cursor'
import { ScrollProgress } from '@/components/scroll-progress'
import { TransitionWrapper } from '@/components/transition-wrapper'

export default function Home() {
  return (
    <PersonaThemeProvider>
      <main className="relative">
        <CustomCursor />
        <ScrollProgress />
        <Navigation />
        <ThemeSwitcher />
        
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
          
          <div id="work">
            <ProjectsSection />
          </div>
          
          <div id="contact">
            <ContactSection />
          </div>
        </TransitionWrapper>
      </main>
    </PersonaThemeProvider>
  )
}
