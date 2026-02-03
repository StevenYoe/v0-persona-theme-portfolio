"use client"

import { ReactLenis } from 'lenis/react'
import { type ReactNode } from 'react'
import { useGameStore } from '@/lib/store'

interface LenisProviderProps {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  const currentScreen = useGameStore((state) => state.currentScreen)
  const parallaxIntensity = useGameStore((state) => state.parallaxIntensity)
  
  // Only enable smooth scroll in portfolio
  const isScrollEnabled = currentScreen === 'portfolio'

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1 * parallaxIntensity,
        duration: 1.2,
        smoothWheel: isScrollEnabled,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
