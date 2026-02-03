"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type PersonaTheme = 'persona-3' | 'persona-4' | 'persona-5'

interface ThemeContextType {
  theme: PersonaTheme
  setTheme: (theme: PersonaTheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function PersonaThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<PersonaTheme>('persona-5')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('persona-theme') as PersonaTheme
    if (saved && ['persona-3', 'persona-4', 'persona-5'].includes(saved)) {
      setTheme(saved)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.className = theme
      localStorage.setItem('persona-theme', theme)
    }
  }, [theme, mounted])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function usePersonaTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('usePersonaTheme must be used within PersonaThemeProvider')
  return context
}
