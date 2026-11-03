"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useCallback } from 'react'
import { useGameStore } from '@/lib/store'
import { CREDITS } from '@/lib/credits'
import { getAudioPlayerInstance } from '@/components/audio-manager'

interface CreditsModalProps {
  open: boolean
  onClose: () => void
}

export function CreditsModal({ open, onClose }: CreditsModalProps) {
  const theme = useGameStore((state) => state.theme)
  const sfxEnabled = useGameStore((state) => state.sfxEnabled)
  const sfxVolume = useGameStore((state) => state.sfxVolume)

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  const close = useCallback(() => {
    if (sfxEnabled) {
      const player = getAudioPlayerInstance()
      if (player) player.playSFX('select', sfxVolume)
    }
    onClose()
  }, [onClose, sfxEnabled, sfxVolume])

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        if (e.repeat) return
        close()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, close])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center px-4"
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'var(--background)', opacity: 0.92 }}
            onClick={close}
          />

          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto border-2 p-6 sm:p-10 ${
              theme === 'persona-5' ? '-skew-x-2' : theme === 'persona-3' ? 'rounded-xl' : ''
            }`}
            style={{ borderColor: accent, backgroundColor: 'var(--secondary)' }}
          >
            <div className={theme === 'persona-5' ? 'skew-x-2' : ''}>
              <h2
                className={`font-display text-4xl sm:text-6xl tracking-wider text-center ${
                  theme === 'persona-3' ? 'neon-glow' : ''
                }`}
                style={{ color: accent }}
              >
                CREDITS
              </h2>
              <div className="h-1 w-24 mx-auto mt-3 mb-8" style={{ backgroundColor: accent }} />

              <div className="space-y-8 text-center">
                <section>
                  <h3 className="text-xs tracking-[0.4em] text-muted-foreground mb-2">DESIGNED & DEVELOPED BY</h3>
                  <p className="font-display text-3xl tracking-wider" style={{ color: accent }}>
                    {CREDITS.builtBy}
                  </p>
                </section>

                <section>
                  <h3 className="text-xs tracking-[0.4em] text-muted-foreground mb-3">BUILT WITH</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {CREDITS.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm tracking-wider border"
                        style={{ borderColor: accent + '60' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>

                {CREDITS.music.length > 0 && (
                  <section>
                    <h3 className="text-xs tracking-[0.4em] text-muted-foreground mb-4">MUSIC</h3>
                    <div className="space-y-5">
                      {CREDITS.music.map((group) => (
                        <div key={group.theme}>
                          <p className="font-display text-xl tracking-wider mb-2" style={{ color: accent }}>
                            {group.theme}
                          </p>
                          <ul className="space-y-1">
                            {group.tracks.map((track) => (
                              <li key={`${track.game}-${track.title}`} className="text-sm">
                                <span>{track.title}</span>
                                <span className="block text-xs text-muted-foreground">{track.game}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {CREDITS.musicNote && (
                      <p className="mt-4 text-xs text-muted-foreground">{CREDITS.musicNote}</p>
                    )}
                  </section>
                )}

                <section>
                  <h3 className="text-xs tracking-[0.4em] text-muted-foreground mb-2">SOURCE CODE</h3>
                  <a
                    href={CREDITS.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-sfx-interactive
                    className="text-sm tracking-wider underline underline-offset-4 break-all"
                    style={{ color: accent }}
                  >
                    {CREDITS.repoUrl.replace('https://', '')}
                  </a>
                </section>

                <p className="text-xs text-muted-foreground leading-relaxed">{CREDITS.disclaimer}</p>
              </div>

              <div className="mt-10 flex justify-center">
                <motion.button
                  data-sfx-interactive
                  onClick={close}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-display text-xl tracking-wider border-2 px-10 py-3"
                  style={{
                    borderColor: accent,
                    backgroundColor: accent,
                    color: theme === 'persona-4' ? '#1a1510' : '#fff',
                  }}
                >
                  BACK
                </motion.button>
              </div>
              <p className="mt-4 text-center text-xs tracking-widest text-muted-foreground">
                <span style={{ color: accent }}>ESC</span> OR <span style={{ color: accent }}>ENTER</span> TO CLOSE
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
