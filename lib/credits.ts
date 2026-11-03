/**
 * Isi layar CREDITS di Main Menu.
 * Bagian dengan array kosong otomatis disembunyikan.
 */

export interface MusicGroup {
  /** Judul grup, misalnya nama tema */
  theme: string
  tracks: { title: string; game: string }[]
}

export const CREDITS = {
  builtBy: 'Steven',
  repoUrl: 'https://github.com/StevenYoe/v0-persona-theme-portfolio',
  techStack: [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Zustand',
    'Framer Motion',
    'Lenis',
    'Shadcn UI',
  ],
  music: [
    {
      theme: 'PERSONA 3',
      tracks: [
        { title: 'Brand New Days - The Beginning', game: 'Persona 3 FES' },
        { title: 'Color Your Night (Instrumental)', game: 'Persona 3 Reload' },
      ],
    },
    {
      theme: 'PERSONA 4',
      tracks: [
        { title: 'A Corner of Memories', game: 'Persona 4' },
        { title: 'Your Affection (Instrumental)', game: 'Persona 4' },
      ],
    },
    {
      theme: 'PERSONA 5',
      tracks: [
        { title: 'Phantom', game: 'Persona 5' },
        { title: 'Beneath the Mask (Instrumental)', game: 'Persona 5' },
      ],
    },
  ] as MusicGroup[],
  musicNote: 'All music belongs to its respective owners.',
  disclaimer:
    'Fan-made tribute inspired by the Persona series. Not affiliated with or endorsed by Atlus or SEGA.',
}
