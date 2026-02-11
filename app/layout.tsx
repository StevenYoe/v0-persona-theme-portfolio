import React from "react"
import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import ThemeFavicon from "@/components/theme-favicon"

const bebasNeue = Bebas_Neue({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-display'
});
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Persona Portfolio',
  description: 'A Persona-inspired portfolio with dramatic parallax effects',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="persona-5" suppressHydrationWarning>
      <body className={`${bebasNeue.variable} ${inter.variable} font-sans antialiased overflow-x-hidden`}>
        <ThemeFavicon />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
