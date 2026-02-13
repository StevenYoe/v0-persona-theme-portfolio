"use client";

import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/store';
import { getAudioPlayerInstance } from '@/components/audio-manager';

export function StartScreen() {
  const setScreen = useGameStore((state) => state.setScreen);
  const theme = useGameStore((state) => state.theme);
  const sfxEnabled = useGameStore((state) => state.sfxEnabled);
  const sfxVolume = useGameStore((state) => state.sfxVolume);

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  const playSelectSfx = useCallback(() => {
    if (sfxEnabled) {
      const player = getAudioPlayerInstance()
      if (player) {
        player.playSFX('select', sfxVolume)
      }
    }
  }, [sfxEnabled, sfxVolume])

  useEffect(() => {
    const handleInteraction = () => {
      setScreen('main-menu');
    };

    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('click', handleInteraction);

    return () => {
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, [setScreen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background"
    >
      <motion.h1
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="font-display text-2xl tracking-widest text-foreground"
        style={{ color: accent }}
      >
        PRESS ANY KEY OR CLICK TO START
      </motion.h1>
    </motion.div>
  );
}
