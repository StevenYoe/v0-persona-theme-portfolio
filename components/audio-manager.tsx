"use client"

import { useEffect, useRef, useCallback } from 'react'
import { useGameStore } from '@/lib/store'

// Web Audio API based audio generation for different themes
const createOscillator = (
  audioContext: AudioContext, 
  frequency: number, 
  type: OscillatorType,
  duration: number,
  volume: number
) => {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.frequency.value = frequency
  oscillator.type = type
  gainNode.gain.value = volume
  
  oscillator.start()
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration)
  oscillator.stop(audioContext.currentTime + duration)
}

// Background music generator using Web Audio API
class BGMGenerator {
  private audioContext: AudioContext | null = null
  private isPlaying = false
  private intervalId: NodeJS.Timeout | null = null
  private volume = 0.8
  private theme: 'persona-3' | 'persona-4' | 'persona-5' = 'persona-5'
  private location: 'menu' | 'portfolio' = 'menu'

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    }
    return this.audioContext
  }

  setVolume(vol: number) {
    this.volume = vol / 100
  }

  setTheme(theme: 'persona-3' | 'persona-4' | 'persona-5') {
    this.theme = theme
    if (this.isPlaying) {
      this.stop()
      this.play()
    }
  }

  setLocation(location: 'menu' | 'portfolio') {
    const changed = this.location !== location
    this.location = location
    if (changed && this.isPlaying) {
      this.stop()
      this.play()
    }
  }

  play() {
    if (this.isPlaying || !this.audioContext) return
    this.isPlaying = true
    
    // Generate ambient music based on theme and location
    const playNote = () => {
      if (!this.audioContext || !this.isPlaying) return
      
      // Different music patterns for menu vs portfolio
      const menuPatterns = {
        'persona-3': { freqs: [220, 262, 330, 392], type: 'sine' as OscillatorType, tempo: 800 },
        'persona-4': { freqs: [196, 247, 294, 370], type: 'triangle' as OscillatorType, tempo: 600 },
        'persona-5': { freqs: [185, 233, 277, 349], type: 'sawtooth' as OscillatorType, tempo: 500 },
      }
      
      const portfolioPatterns = {
        'persona-3': { freqs: [330, 392, 440, 523], type: 'sine' as OscillatorType, tempo: 700 },
        'persona-4': { freqs: [294, 370, 440, 554], type: 'triangle' as OscillatorType, tempo: 550 },
        'persona-5': { freqs: [277, 349, 415, 523], type: 'square' as OscillatorType, tempo: 450 },
      }
      
      const patterns = this.location === 'menu' ? menuPatterns : portfolioPatterns
      const pattern = patterns[this.theme]
      const freq = pattern.freqs[Math.floor(Math.random() * pattern.freqs.length)]
      
      createOscillator(this.audioContext, freq, pattern.type, 0.8, this.volume * 0.05)
      
      // Add bass note
      if (Math.random() > 0.6) {
        createOscillator(this.audioContext, freq / 2, 'sine', 1.2, this.volume * 0.03)
      }
      
      this.intervalId = setTimeout(playNote, pattern.tempo + Math.random() * 200)
    }
    
    playNote()
  }

  stop() {
    this.isPlaying = false
    if (this.intervalId) {
      clearTimeout(this.intervalId)
      this.intervalId = null
    }
  }
}

// Global BGM instance
let bgmGenerator: BGMGenerator | null = null

export function AudioManager() {
  const theme = useGameStore((state) => state.theme)
  const musicVolume = useGameStore((state) => state.musicVolume)
  const sfxVolume = useGameStore((state) => state.sfxVolume)
  const musicEnabled = useGameStore((state) => state.musicEnabled)
  const sfxEnabled = useGameStore((state) => state.sfxEnabled)
  const musicLocation = useGameStore((state) => state.musicLocation)
  
  const isInitialized = useRef(false)

  // Initialize audio on first user interaction
  const initAudio = useCallback(() => {
    if (isInitialized.current) return
    
    if (!bgmGenerator) {
      bgmGenerator = new BGMGenerator()
    }
    bgmGenerator.init()
    isInitialized.current = true
    
    if (musicEnabled) {
      bgmGenerator.setVolume(musicVolume)
      bgmGenerator.setTheme(theme)
      bgmGenerator.setLocation(musicLocation)
      bgmGenerator.play()
    }
  }, [musicEnabled, musicVolume, theme, musicLocation])

  // Update theme
  useEffect(() => {
    if (bgmGenerator && isInitialized.current) {
      bgmGenerator.setTheme(theme)
    }
  }, [theme])

  // Update music location
  useEffect(() => {
    if (bgmGenerator && isInitialized.current) {
      bgmGenerator.setLocation(musicLocation)
    }
  }, [musicLocation])

  // Update music volume
  useEffect(() => {
    if (bgmGenerator) {
      bgmGenerator.setVolume(musicVolume)
    }
  }, [musicVolume])

  // Toggle music
  useEffect(() => {
    if (!bgmGenerator || !isInitialized.current) return
    
    if (musicEnabled) {
      bgmGenerator.play()
    } else {
      bgmGenerator.stop()
    }
  }, [musicEnabled])

  // Play hover sound effect
  const playHoverSfx = useCallback(() => {
    if (!sfxEnabled || !isInitialized.current) return
    
    const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    
    const frequencies = {
      'persona-3': 800,
      'persona-4': 600,
      'persona-5': 1000,
    }
    
    createOscillator(audioContext, frequencies[theme], 'sine', 0.1, (sfxVolume / 100) * 0.1)
  }, [sfxEnabled, theme, sfxVolume])

  // Play select sound effect
  const playSelectSfx = useCallback(() => {
    if (!sfxEnabled || !isInitialized.current) return
    
    const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    
    const frequencies = {
      'persona-3': [400, 600, 800],
      'persona-4': [300, 500, 700],
      'persona-5': [500, 700, 900],
    }
    
    const types: Record<string, OscillatorType> = {
      'persona-3': 'sine',
      'persona-4': 'triangle',
      'persona-5': 'square',
    }
    
    const freqs = frequencies[theme]
    const type = types[theme]
    
    freqs.forEach((freq, i) => {
      setTimeout(() => {
        createOscillator(audioContext, freq, type, 0.15, (sfxVolume / 100) * 0.12)
      }, i * 50)
    })
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
      if (bgmGenerator) {
        bgmGenerator.stop()
      }
    }
  }, [])

  return null // This is a non-visual component
}
