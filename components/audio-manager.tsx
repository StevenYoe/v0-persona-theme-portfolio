"use client"

import { useEffect, useRef, useCallback } from 'react'
import { useGameStore } from '@/lib/store'

// Audio file path resolver
const getAudioPath = (theme: 'persona-3' | 'persona-4' | 'persona-5', filename: string): string => {
  const themeFolder = theme === 'persona-3' ? 'p3' : theme === 'persona-4' ? 'p4' : 'p5'
  return `/audio/${themeFolder}/${filename}`
}

class AudioPlayer {
  private bgm: HTMLAudioElement | null = null
  private sfxCache: Map<string, HTMLAudioElement> = new Map()
  private volume = 0.8
  private theme: 'persona-3' | 'persona-4' | 'persona-5' = 'persona-5'
  private location: 'menu' | 'portfolio' = 'menu'
  private isPlaying = false
  private fadeInterval: NodeJS.Timeout | null = null

  init(theme: 'persona-3' | 'persona-4' | 'persona-5', location: 'menu' | 'portfolio', volume: number) {
    this.theme = theme
    this.location = location
    this.volume = volume / 100
    this.preloadSfx(theme)
  }

  private preloadSfx(theme: 'persona-3' | 'persona-4' | 'persona-5') {
    ['hover.mp3', 'select.mp3'].forEach(sfx => {
      const path = getAudioPath(theme, sfx)
      if (!this.sfxCache.has(path)) {
        const audio = new Audio(path)
        audio.preload = 'auto'
        this.sfxCache.set(path, audio)
      }
    })
  }

  private getBgmPath(): string {
    const filename = this.location === 'menu' ? 'menu-bgm.mp3' : 'portfolio-bgm.mp3'
    return getAudioPath(this.theme, filename)
  }

  private fadeIn(duration = 500) {
    if (!this.bgm) return
    if (this.fadeInterval) clearInterval(this.fadeInterval)

    this.bgm.volume = 0
    const targetVolume = this.volume
    const steps = 20
    const stepDuration = duration / steps
    const volumeStep = targetVolume / steps
    let currentStep = 0

    this.fadeInterval = setInterval(() => {
      currentStep++
      const newVolume = Math.min(volumeStep * currentStep, targetVolume)
      if (this.bgm) {
        this.bgm.volume = newVolume
      }

      if (currentStep >= steps) {
        if (this.fadeInterval) clearInterval(this.fadeInterval)
      }
    }, stepDuration)
  }

  private fadeOut(onComplete?: () => void, duration = 500) {
    if (!this.bgm) {
      if (onComplete) onComplete()
      return
    }
    if (this.fadeInterval) clearInterval(this.fadeInterval)
    
    const currentAudio = this.bgm
    const initialVolume = currentAudio.volume
    const steps = 20
    const stepDuration = duration / steps
    const volumeStep = initialVolume / steps
    let currentStep = 0

    this.fadeInterval = setInterval(() => {
      currentStep++
      const newVolume = Math.max(initialVolume - (volumeStep * currentStep), 0)
      currentAudio.volume = newVolume
      
      if (currentStep >= steps) {
        if (this.fadeInterval) clearInterval(this.fadeInterval)
        if (onComplete) onComplete()
      }
    }, stepDuration)
  }

  play() {
    if (this.isPlaying) return
    this.isPlaying = true

    if (this.bgm) {
      this.bgm.pause()
      this.bgm.src = '' // Release resource
      this.bgm = null
    }
    
    this.bgm = new Audio(this.getBgmPath())
    this.bgm.loop = true
    this.bgm.volume = this.volume // Set volume directly
    
    const playPromise = this.bgm.play()
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Audio started successfully, no need to fadeIn from 0 if volume is set
      }).catch(error => {
        console.warn('Audio playback failed to start:', error)
        this.isPlaying = false
      })
    }
  }
  
  stop() {
    if (!this.isPlaying) return
    this.isPlaying = false
    
    if (this.bgm) {
      this.bgm.pause()
      this.bgm.currentTime = 0
      this.bgm.src = '' // Release resource
      this.bgm = null
    }
  }

  private changeTrack() {
    // If music is explicitly stopped, don't change track.
    // Otherwise, ensure track changes and plays.
    if (!useGameStore.getState().musicEnabled) {
      this.stop(); // Ensure it's stopped if music is disabled
      return;
    }

    // Stop current track if playing
    if (this.bgm) {
      this.bgm.pause();
      this.bgm.src = ''; // Release resource
      this.bgm = null;
    }

    this.bgm = new Audio(this.getBgmPath());
    this.bgm.loop = true;
    this.bgm.volume = this.volume; // Ensure volume is set

    const playPromise = this.bgm.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.isPlaying = true; // Ensure isPlaying is true on successful track change
      }).catch(error => {
        console.warn('Audio playback failed on track change:', error);
        this.isPlaying = false;
      });
    } else {
      this.isPlaying = true; // Assume playing if no promise (sync play)
    }
  }

  setVolume(vol: number) {
    this.volume = vol / 100
    if (this.bgm && this.isPlaying) {
      // Don't interrupt fades
      if (!this.fadeInterval) {
        this.bgm.volume = this.volume
      }
    }
  }

  setTheme(theme: 'persona-3' | 'persona-4' | 'persona-5') {
    if (this.theme === theme) return
    this.theme = theme
    this.preloadSfx(theme)
    this.changeTrack()
  }

  setLocation(location: 'menu' | 'portfolio') {
    if (this.location === location) return
    this.location = location
    this.changeTrack()
  }

  playSFX(sfxType: 'hover' | 'select', volume: number) {
    const path = getAudioPath(this.theme, `${sfxType}.mp3`)
    const sfx = new Audio(path) // Create new instance to allow overlaps
    sfx.volume = volume / 100
    const playPromise = sfx.play()

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.debug('SFX playback failed:', error)
      })
    }
  }
  
  destroy() {
    this.stop()
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval)
    }
    this.sfxCache.clear()
  }
}

// Keep a single instance
let audioPlayer: AudioPlayer | null = null

export function getAudioPlayerInstance() {
  return audioPlayer
}

export function AudioManager() {
  const store = useGameStore()
  const isInitialized = useRef(false)
  const lastHoveredElement = useRef<EventTarget | null>(null)

  // Initialization: needs to happen after a user interaction
  const initAudio = useCallback(() => {
    if (isInitialized.current || typeof window === 'undefined') return
    
    if (!audioPlayer) {
      audioPlayer = new AudioPlayer()
    }
    
    audioPlayer.init(store.theme, store.musicLocation, store.musicVolume)
    isInitialized.current = true

    if (store.musicEnabled) {
      audioPlayer.play()
    }
    
    // Explicitly play a select SFX on first interaction/initialization
    if (store.sfxEnabled && audioPlayer) { // Only if SFX is enabled and player is ready
      audioPlayer.playSFX('select', store.sfxVolume)
    }
    
    // Remove listeners once done
    window.removeEventListener('click', initAudio)
    window.removeEventListener('keydown', initAudio)
  }, [store.theme, store.musicLocation, store.musicVolume, store.musicEnabled, store.sfxEnabled, store.sfxVolume])
  
  // Setup first interaction listener
  useEffect(() => {
    window.addEventListener('click', initAudio)
    window.addEventListener('keydown', initAudio)
    
    return () => {
      window.removeEventListener('click', initAudio)
      window.removeEventListener('keydown', initAudio)
    }
  }, [initAudio])

  // Effect for theme changes
  useEffect(() => {
    if (audioPlayer && isInitialized.current) {
      audioPlayer.setTheme(store.theme)
    }
  }, [store.theme])

  // Effect for location changes
  useEffect(() => {
    if (audioPlayer && isInitialized.current) {
      audioPlayer.setLocation(store.musicLocation)
    }
  }, [store.musicLocation])

  // Effect for volume changes
  useEffect(() => {
    if (audioPlayer && isInitialized.current) {
      audioPlayer.setVolume(store.musicVolume)
    }
  }, [store.musicVolume])

  // Effect for toggling music on/off
  useEffect(() => {
    if (!audioPlayer || !isInitialized.current) return
    
    if (store.musicEnabled) {
      audioPlayer.play()
    } else {
      audioPlayer.stop()
    }
  }, [store.musicEnabled])
  
  // Effect for SFX
  const playSfx = useCallback((type: 'hover' | 'select') => {
    if (!isInitialized.current) {
      initAudio()
    }
    if (!audioPlayer || !isInitialized.current || !store.sfxEnabled) return
    audioPlayer.playSFX(type, store.sfxVolume)
  }, [store.sfxEnabled, store.sfxVolume, initAudio])

  useEffect(() => {
    const handleSFXPlay = (type: 'hover' | 'select', targetElement: HTMLElement) => {
      const interactiveElement = targetElement.closest('button, a, input[type="range"], input[type="checkbox"], [role="button"], [role="menuitem"], [tabindex]:not([tabindex="-1"]), [data-sfx-interactive]') as HTMLElement | null;
      if (interactiveElement) {
        if (type === 'hover') {
          if (lastHoveredElement.current !== interactiveElement) {
            playSfx('hover')
            lastHoveredElement.current = interactiveElement
          }
        } else { // type === 'select'
          playSfx('select')
        }
      } else {
        lastHoveredElement.current = null;
      }
    }

    const handleMouseEnter = (e: MouseEvent) => {
      handleSFXPlay('hover', e.target as HTMLElement)
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Clear last hovered element only if the mouse is truly leaving the interactive element
      // This helps prevent re-triggering hover sfx when moving between nested elements
      if (lastHoveredElement.current === (e.relatedTarget as HTMLElement)?.closest('button, a, input[type="range"], input[type="checkbox"], [role="button"], [role="menuitem"], [tabindex]:not([tabindex="-1"])')) {
        // Still hovering over the same logical interactive element
        return;
      }
      lastHoveredElement.current = null
    }

    const handleClick = (e: MouseEvent) => {
      handleSFXPlay('select', e.target as HTMLElement)
    }

    const handleFocusIn = (e: FocusEvent) => {
      handleSFXPlay('hover', e.target as HTMLElement)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && document.activeElement) {
        handleSFXPlay('select', document.activeElement as HTMLElement)
      }
    }
    
    // Add global event listeners
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)
    document.addEventListener('click', handleClick)
    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      // Clean up event listeners
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
      document.removeEventListener('click', handleClick)
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [playSfx])

  // Cleanup on unmount
  useEffect(() => () => {
    if (audioPlayer) {
      audioPlayer.destroy()
      audioPlayer = null
      isInitialized.current = false
    }
  }, [])

  return null
}
