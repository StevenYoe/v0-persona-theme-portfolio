# Persona theme portfolio

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/stevenyoes-projects/v0-persona-theme-portfolio)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/f0upP8k0qZa)

## Tech Stack

This portfolio is built with modern web technologies:

- **Next.js** 16.0.10 - React framework with App Router
- **Bun** 1.3.6 - Fast JavaScript runtime and package manager
- **Tailwind CSS** 4.1.9 - Utility-first CSS framework
- **TypeScript** - Type-safe development
- **Zustand** 5.0.11 - Lightweight state management
- **Framer Motion** 12.31.0 - Production-ready animations
- **Lenis** 1.3.17 - Smooth scrolling library
- **Shadcn UI** - Beautiful, accessible component library
- **Custom Audio System** - MP3-based audio with crossfade transitions

## Prerequisites

Make sure you have [Bun](https://bun.sh) installed. Install it with:

```bash
# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"
```

## Getting Started

1. **Install dependencies:**

```bash
bun install
```

2. **Run the development server:**

```bash
bun run dev
```

3. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

## Audio Setup

This portfolio uses a custom MP3-based audio system with theme-specific music and sound effects.

### Audio File Structure

Place your MP3 files in the following structure:

```
public/audio/
├── p3/  (Persona 3 theme)
├── p4/  (Persona 4 theme)
└── p5/  (Persona 5 theme)
```

Each theme folder requires:
- `menu-bgm.mp3` - Main menu background music
- `portfolio-bgm.mp3` - Portfolio page background music
- `hover.mp3` - Button hover sound effect
- `select.mp3` - Click/select sound effect

**📖 For detailed instructions**, see [public/audio/AUDIO.md](public/audio/AUDIO.md)

## Deployment

Your project is live at:

**[https://vercel.com/stevenyoes-projects/v0-persona-theme-portfolio](https://vercel.com/stevenyoes-projects/v0-persona-theme-portfolio)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/f0upP8k0qZa](https://v0.app/chat/f0upP8k0qZa)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
