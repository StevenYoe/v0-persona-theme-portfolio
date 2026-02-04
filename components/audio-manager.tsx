"use client"

import { useEffect, useRef, useCallback } from 'react'
import { useGameStore } from '@/lib/store'

// Theme-specific audio configuration
const themeAudio = {
  'persona-3': {
    bgm: '/audio/p3-bgm.mp3', // Placeholder - would need actual audio files
    hover: '/audio/p3-hover.mp3',
    select: '/audio/p3-select.mp3',
  },
  'persona-4': {
    bgm: '/audio/p4-bgm.mp3',
    hover: '/audio/p4-hover.mp3',
    select: '/audio/p4-select.mp3',
  },
  'persona-5': {
    bgm: '/audio/p5-bgm.mp3',
    hover: '/audio/p5-hover.mp3',
    select: '/audio/p5-select.mp3',
  },
}

export function AudioManager() {
  const theme = useGameStore((state) => state.theme)
  const musicVolume = useGameStore((state) => state.musicVolume)
  const sfxVolume = useGameStore((state) => state.sfxVolume)
  const musicEnabled = useGameStore((state) => state.musicEnabled)
  const sfxEnabled = useGameStore((state) => state.sfxEnabled)
  const currentScreen = useGameStore((state) => state.currentScreen)
  
  const bgmRef = useRef<HTMLAudioElement | null>(null)
  const hoverSfxRef = useRef<HTMLAudioElement | null>(null)
  const selectSfxRef = useRef<HTMLAudioElement | null>(null)
  const isInitialized = useRef(false)

  // Initialize audio context on user interaction
  const initAudio = useCallback(() => {
    if (isInitialized.current) return
    
    // Create background music audio
    bgmRef.current = new Audio()
    bgmRef.current.loop = true
    bgmRef.current.volume = musicVolume / 100
    
    // Create SFX audio elements
    hoverSfxRef.current = new Audio()
    selectSfxRef.current = new Audio()
    
    isInitialized.current = true
  }, [musicVolume])

  // Update BGM when theme changes
  useEffect(() => {
    if (!bgmRef.current || !isInitialized.current) return
    
    const audioConfig = themeAudio[theme]
    
    // For now, we'll use Web Audio API to generate simple sounds
    // In production, you would use actual audio files
    bgmRef.current.src = audioConfig.bgm
    
    if (musicEnabled && currentScreen !== 'main-menu') {
      bgmRef.current.play().catch(() => {
        // Autoplay was prevented, user needs to interact first
      })
    }
  }, [theme, musicEnabled, currentScreen])

  // Update music volume
  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.volume = musicVolume / 100
    }
  }, [musicVolume])

  // Update SFX volume
  useEffect(() => {
    if (hoverSfxRef.current) {
      hoverSfxRef.current.volume = sfxVolume / 100
    }
    if (selectSfxRef.current) {
      selectSfxRef.current.volume = sfxVolume / 100
    }
  }, [sfxVolume])

  // Toggle music
  useEffect(() => {
    if (!bgmRef.current) return
    
    if (musicEnabled && currentScreen !== 'main-menu') {
      bgmRef.current.play().catch(() => {})
    } else {
      bgmRef.current.pause()
    }
  }, [musicEnabled, currentScreen])

  // Play hover sound effect
  const playHoverSfx = useCallback(() => {
    if (!sfxEnabled || !isInitialized.current) return
    
    // Using Web Audio API to create a simple hover sound
    const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Theme-specific hover sounds
    const frequencies = {
      'persona-3': 800,
      'persona-4': 600,
      'persona-5': 1000,
    }
    
    oscillator.frequency.value = frequencies[theme]
    oscillator.type = 'sine'
    gainNode.gain.value = (sfxVolume / 100) * 0.1
    
    oscillator.start()
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1)
    oscillator.stop(audioContext.currentTime + 0.1)
  }, [sfxEnabled, theme, sfxVolume])

  // Play select sound effect
  const playSelectSfx = useCallback(() => {
    if (!sfxEnabled || !isInitialized.current) return
    
    const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Theme-specific select sounds
    const frequencies = {
      'persona-3': [400, 600, 800],
      'persona-4': [300, 500, 700],
      'persona-5': [500, 700, 900],
    }
    
    const freqs = frequencies[theme]
    oscillator.frequency.value = freqs[0]
    oscillator.type = theme === 'persona-3' ? 'sine' : theme === 'persona-4' ? 'triangle' : 'square'
    gainNode.gain.value = (sfxVolume / 100) * 0.15
    
    oscillator.start()
    oscillator.frequency.setValueAtTime(freqs[1], audioContext.currentTime + 0.05)
    oscillator.frequency.setValueAtTime(freqs[2], audioContext.currentTime + 0.1)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2)
    oscillator.stop(audioContext.currentTime + 0.2)
  }, [sfxEnabled, theme, sfxVolume])

  // Initialize on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudio()
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }
    
    window.addEventListener('click', handleFirstInteraction)
    window.addEventListener('keydown', handleFirstInteraction)
    
    return () => {
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [initAudio])

  // Add event listeners for interactive elements
  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON' || target.closest('button') || target.tagName === 'A') {
        playHoverSfx()
      }
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON' || target.closest('button') || target.tagName === 'A') {
        playSelectSfx()
      }
    }

    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('click', handleClick, true)
    }
  }, [playHoverSfx, playSelectSfx])

  // Cleanup
  useEffect(() => {
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause()
        bgmRef.current = null
      }
    }
  }, [])

  return null // This is a non-visual component
}
