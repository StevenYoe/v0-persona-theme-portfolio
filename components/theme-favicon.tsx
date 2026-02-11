"use client"

import { useEffect } from 'react'
import { useGameStore } from '@/lib/store'

const ThemeFavicon = () => {
  const theme = useGameStore((state) => state.theme)

  useEffect(() => {
    let faviconLink = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!faviconLink) {
        faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        document.head.appendChild(faviconLink);
    }
    
    if (faviconLink) {
      switch (theme) {
        case 'persona-3':
          faviconLink.href = '/p3-favicon.ico';
          break;
        case 'persona-4':
          faviconLink.href = '/p4-favicon.ico';
          break;
        case 'persona-5':
          faviconLink.href = '/p5-favicon.ico';
          break;
        default:
          faviconLink.href = '/icon.ico'; // Fallback
          break;
      }
    }
  }, [theme])

  return null // This component doesn't render anything
}

export default ThemeFavicon