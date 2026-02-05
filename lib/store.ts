import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PersonaTheme = 'persona-3' | 'persona-4' | 'persona-5'
export type GameScreen = 'start-screen' | 'main-menu' | 'portfolio' | 'settings' | 'pause-menu'
export type MusicLocation = 'menu' | 'portfolio'

interface GameState {
  // Screen management
  currentScreen: GameScreen
  previousScreen: GameScreen | null
  
  // Theme settings
  theme: PersonaTheme
  
  // Audio settings
  musicVolume: number
  sfxVolume: number
  musicEnabled: boolean
  sfxEnabled: boolean
  musicLocation: MusicLocation
  
  // Visual settings
  parallaxIntensity: number
  cursorEnabled: boolean
  
  // Actions
  setScreen: (screen: GameScreen) => void
  goBack: () => void
  setTheme: (theme: PersonaTheme) => void
  setMusicVolume: (volume: number) => void
  setSfxVolume: (volume: number) => void
  toggleMusic: () => void
  toggleSfx: () => void
  setParallaxIntensity: (intensity: number) => void
  toggleCursor: () => void
  openPauseMenu: () => void
  closePauseMenu: () => void
  startGame: () => void
  returnToMainMenu: () => void
  setMusicLocation: (location: MusicLocation) => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentScreen: 'start-screen',
      previousScreen: null,
      theme: 'persona-3',
      musicVolume: 80,
      sfxVolume: 80,
      musicEnabled: true,
      sfxEnabled: true,
      musicLocation: 'menu',
      parallaxIntensity: 1,
      cursorEnabled: true,

      // Actions
      setScreen: (screen) => set((state) => ({ 
        previousScreen: state.currentScreen,
        currentScreen: screen 
      })),
      
      goBack: () => set((state) => ({
        currentScreen: state.previousScreen || 'main-menu',
        previousScreen: null
      })),
      
      setTheme: (theme) => {
        document.documentElement.className = theme
        set({ theme })
      },
      
      setMusicVolume: (musicVolume) => set({ musicVolume }),
      setSfxVolume: (sfxVolume) => set({ sfxVolume }),
      toggleMusic: () => set((state) => ({ musicEnabled: !state.musicEnabled })),
      toggleSfx: () => set((state) => ({ sfxEnabled: !state.sfxEnabled })),
      setParallaxIntensity: (parallaxIntensity) => set({ parallaxIntensity }),
      toggleCursor: () => set((state) => ({ cursorEnabled: !state.cursorEnabled })),
      
      openPauseMenu: () => {
        const state = get()
        if (state.currentScreen === 'portfolio') {
          set({ previousScreen: 'portfolio', currentScreen: 'pause-menu' })
        }
      },
      
      closePauseMenu: () => {
        const state = get()
        if (state.currentScreen === 'pause-menu') {
          set({ currentScreen: 'portfolio', previousScreen: null })
        }
      },
      
      startGame: () => set({ 
        currentScreen: 'portfolio',
        previousScreen: 'main-menu',
        musicLocation: 'portfolio'
      }),
      
      returnToMainMenu: () => set({
        currentScreen: 'main-menu',
        previousScreen: null,
        musicLocation: 'menu'
      }),
      
      setMusicLocation: (musicLocation) => set({ musicLocation })
    }),
    {
      name: 'persona-portfolio-settings',
      partialize: (state) => ({
        theme: state.theme,
        musicVolume: state.musicVolume,
        sfxVolume: state.sfxVolume,
        musicEnabled: state.musicEnabled,
        sfxEnabled: state.sfxEnabled,
        parallaxIntensity: state.parallaxIntensity,
        cursorEnabled: state.cursorEnabled
      })
    }
  )
)
