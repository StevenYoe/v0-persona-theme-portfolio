"use client"

import { useEffect, useRef, useCallback } from 'react'
import { useGameStore } from '@/lib/store'

// Audio file path resolver
const getAudioPath = (theme: 'persona-3' | 'persona-4' | 'persona-5', filename: string): string => {
  const themeFolder = theme === 'persona-3' ? 'p3' : theme === 'persona-4' ? 'p4' : 'p5'
  return `/audio/${themeFolder}/${filename}`
}

// Audio Player class using HTML5 Audio API
class AudioPlayer {
  private currentBGM: HTMLAudioElement | null = null
  private nextBGM: HTMLAudioElement | null = null
  private audioCache: Map<string, HTMLAudioElement> = new Map()
  private fadeInterval: NodeJS.Timeout | null = null
  private volume = 0.8
  private theme: 'persona-3' | 'persona-4' | 'persona-5' = 'persona-5'
  private location: 'menu' | 'portfolio' = 'menu'
  private isPlaying = false

  // Initialize and preload audio
  init(theme: 'persona-3' | 'persona-4' | 'persona-5', location: 'menu' | 'portfolio') {
    this.theme = theme
    this.location = location
    this.preloadAudio(theme, location)
  }

  // Preload audio files for a specific theme and location
  private preloadAudio(theme: 'persona-3' | 'persona-4' | 'persona-5', location: 'menu' | 'portfolio') {
    const filename = location === 'menu' ? 'menu-bgm.mp3' : 'portfolio-bgm.mp3'
    const path = getAudioPath(theme, filename)

    if (!this.audioCache.has(path)) {
      const audio = new Audio(path)
      audio.loop = true
      audio.preload = 'auto'
      audio.volume = 0
      this.audioCache.set(path, audio)
    }
  }

  // Preload all audio files for better performance
  preloadAll() {
    const themes: ('persona-3' | 'persona-4' | 'persona-5')[] = ['persona-3', 'persona-4', 'persona-5']
    const locations: ('menu' | 'portfolio')[] = ['menu', 'portfolio']

    themes.forEach(theme => {
      locations.forEach(location => {
        this.preloadAudio(theme, location)
      })
    })
  }

  // Set volume (0-100)
  setVolume(vol: number) {
    this.volume = vol / 100
    if (this.currentBGM) {
      this.currentBGM.volume = this.volume
    }
  }

  // Set theme and switch audio if needed
  setTheme(theme: 'persona-3' | 'persona-4' | 'persona-5') {
    if (this.theme === theme) return
    this.theme = theme
    if (this.isPlaying) {
      this.switchTrack()
    }
  }

  // Set location and switch audio if needed
  setLocation(location: 'menu' | 'portfolio') {
    if (this.location === location) return
    this.location = location
    if (this.isPlaying) {
      this.switchTrack()
    }
  }

  // Play current track
  play() {
    if (this.isPlaying) return

    const filename = this.location === 'menu' ? 'menu-bgm.mp3' : 'portfolio-bgm.mp3'
    const path = getAudioPath(this.theme, filename)

    // Get or create audio element
    let audio = this.audioCache.get(path)
    if (!audio) {
      audio = new Audio(path)
      audio.loop = true
      audio.preload = 'auto'
      this.audioCache.set(path, audio)
    }

    this.currentBGM = audio
    this.currentBGM.volume = 0

    // Start playing and fade in
    const playPromise = this.currentBGM.play()
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.fadeIn(this.currentBGM!)
      }).catch(error => {
        console.warn('Audio playback failed:', error)
      })
    }

    this.isPlaying = true
  }

  // Stop current track
  stop() {
    if (!this.currentBGM) return

    this.fadeOut(this.currentBGM, () => {
      if (this.currentBGM) {
        this.currentBGM.pause()
        this.currentBGM.currentTime = 0
      }
      this.isPlaying = false
    })
  }

  // Switch to a different track with crossfade
  private switchTrack() {
    const filename = this.location === 'menu' ? 'menu-bgm.mp3' : 'portfolio-bgm.mp3'
    const path = getAudioPath(this.theme, filename)

    // Get or create new audio element
    let newAudio = this.audioCache.get(path)
    if (!newAudio) {
      newAudio = new Audio(path)
      newAudio.loop = true
      newAudio.preload = 'auto'
      this.audioCache.set(path, newAudio)
    }

    // If same track, do nothing
    if (this.currentBGM && this.currentBGM === newAudio) return

    this.nextBGM = newAudio
    this.nextBGM.volume = 0

    // Start new track
    const playPromise = this.nextBGM.play()
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Crossfade
        this.crossfade()
      }).catch(error => {
        console.warn('Audio playback failed:', error)
      })
    }
  }

  // Fade in audio
  private fadeIn(audio: HTMLAudioElement, duration = 500) {
    if (this.fadeInterval) clearInterval(this.fadeInterval)

    const steps = 20
    const stepDuration = duration / steps
    const volumeStep = this.volume / steps
    let currentStep = 0

    this.fadeInterval = setInterval(() => {
      currentStep++
      audio.volume = Math.min(volumeStep * currentStep, this.volume)

      if (currentStep >= steps) {
        if (this.fadeInterval) clearInterval(this.fadeInterval)
        this.fadeInterval = null
      }
    }, stepDuration)
  }

  // Fade out audio
  private fadeOut(audio: HTMLAudioElement, onComplete?: () => void, duration = 500) {
    if (this.fadeInterval) clearInterval(this.fadeInterval)

    const steps = 20
    const stepDuration = duration / steps
    const volumeStep = audio.volume / steps
    let currentStep = 0

    this.fadeInterval = setInterval(() => {
      currentStep++
      audio.volume = Math.max(audio.volume - volumeStep, 0)

      if (currentStep >= steps) {
        if (this.fadeInterval) clearInterval(this.fadeInterval)
        this.fadeInterval = null
        if (onComplete) onComplete()
      }
    }, stepDuration)
  }

  // Crossfade between current and next track
  private crossfade(duration = 500) {
    if (!this.currentBGM || !this.nextBGM) return

    const oldAudio = this.currentBGM
    const newAudio = this.nextBGM

    // Fade out old, fade in new
    this.fadeOut(oldAudio, () => {
      oldAudio.pause()
      oldAudio.currentTime = 0
    }, duration)

    this.fadeIn(newAudio, duration)

    // Switch references
    this.currentBGM = newAudio
    this.nextBGM = null
  }

  // Play sound effect
  playSFX(sfxType: 'hover' | 'select', volume: number) {
    const filename = sfxType === 'hover' ? 'hover.mp3' : 'select.mp3'
    const path = getAudioPath(this.theme, filename)

    // Create new audio instance for SFX (allows multiple simultaneous plays)
    const sfx = new Audio(path)
    sfx.volume = volume / 100
    const playPromise = sfx.play()

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Silently fail for SFX if file doesn't exist yet
        console.debug('SFX playback failed:', error)
      })
    }
  }

  // Cleanup
  destroy() {
    this.stop()
    this.audioCache.forEach(audio => {
      audio.pause()
      audio.src = ''
    })
    this.audioCache.clear()
  }
}

// Global audio player instance
let audioPlayer: AudioPlayer | null = null

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

    if (!audioPlayer) {
      audioPlayer = new AudioPlayer()
    }
    audioPlayer.init(theme, musicLocation)
    audioPlayer.preloadAll() // Preload all audio files
    isInitialized.current = true

    if (musicEnabled) {
      audioPlayer.setVolume(musicVolume)
      audioPlayer.play()
    }
  }, [musicEnabled, musicVolume, theme, musicLocation])

  // Update theme
  useEffect(() => {
    if (audioPlayer && isInitialized.current) {
      audioPlayer.setTheme(theme)
    }
  }, [theme])

  // Update music location
  useEffect(() => {
    if (audioPlayer && isInitialized.current) {
      audioPlayer.setLocation(musicLocation)
    }
  }, [musicLocation])

  // Update music volume
  useEffect(() => {
    if (audioPlayer && isInitialized.current) {
      audioPlayer.setVolume(musicVolume)
    }
  }, [musicVolume])

  // Toggle music
  useEffect(() => {
    if (!audioPlayer || !isInitialized.current) return

    if (musicEnabled) {
      audioPlayer.play()
    } else {
      audioPlayer.stop()
    }
  }, [musicEnabled])

  // Play hover sound effect
  const playHoverSfx = useCallback(() => {
    if (!sfxEnabled || !isInitialized.current || !audioPlayer) return
    audioPlayer.playSFX('hover', sfxVolume)
  }, [sfxEnabled, sfxVolume])

  // Play select sound effect
  const playSelectSfx = useCallback(() => {
    if (!sfxEnabled || !isInitialized.current || !audioPlayer) return
    audioPlayer.playSFX('select', sfxVolume)
  }, [sfxEnabled, sfxVolume])

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
      if (audioPlayer) {
        audioPlayer.destroy()
      }
    }
  }, [])

  return null // This is a non-visual component
}
