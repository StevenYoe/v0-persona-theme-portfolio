# Persona-Themed Portfolio

A dynamic and interactive portfolio website inspired by the UI/UX of the Persona game series. This project showcases a range of web development skills through a unique, game-like interface.

## Tech Stack

This portfolio is built with modern web technologies:

- **Next.js** - React framework with App Router
- **Bun** - Fast JavaScript runtime and package manager
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe development
- **Zustand** - Lightweight state management
- **Framer Motion** - Production-ready animations
- **Lenis** - Smooth scrolling library
- **Shadcn UI** - Accessible component library
- **Custom Audio System** - MP3-based audio with crossfade transitions

## Prerequisites

Make sure you have [Bun](https://bun.sh) installed. You can install it with the following command in PowerShell:

```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

## Getting Started

1.  **Install dependencies:**

    ```bash
    bun install
    ```

2.  **Run the development server:**

    ```bash
    bun run dev
    ```

3.  **Open your browser:**

    Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

-   `bun run dev`: Starts the development server.
-   `bun run build`: Creates a production-ready build of the application.
-   `bun run start`: Starts the production server.
-   `bun run lint`: Runs ESLint to check for code quality and errors.

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

-   `menu-bgm.mp3`: Main menu background music
-   `portfolio-bgm.mp3`: Portfolio page background music
-   `hover.mp3`: Button hover sound effect
-   `select.mp3`: Click/select sound effect

**📖 For detailed instructions**, please see the `public/audio/AUDIO.md` file.
