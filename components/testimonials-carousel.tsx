"use client"

import { motion, useMotionValue, useTransform, AnimatePresence, PanInfo } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { useGameStore } from '@/lib/store'

const testimonials = [
  {
    id: 1,
    quote: "Working with them was like unlocking a new Persona. They transformed our vision into reality with incredible attention to detail.",
    author: "Makoto Yuki",
    role: "CEO, Velvet Room Inc.",
    avatar: "MY"
  },
  {
    id: 2,
    quote: "The fog lifted the moment we saw the final product. Exceptional work that exceeded all expectations.",
    author: "Yu Narukami",
    role: "Founder, Investigation Team",
    avatar: "YN"
  },
  {
    id: 3,
    quote: "They stole our hearts with their creativity. A true phantom thief of the digital world.",
    author: "Ren Amamiya",
    role: "Lead Developer, Phantom Co.",
    avatar: "RA"
  },
  {
    id: 4,
    quote: "Every pixel, every interaction - crafted with the precision of a calling card. Absolutely stunning work.",
    author: "Morgana",
    role: "Design Director, Mementos",
    avatar: "MG"
  },
]

export function TestimonialsCarousel() {
  const theme = useGameStore((state) => state.theme)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15])
  const scale = useTransform(x, [-200, 0, 200], [0.8, 1, 0.8])

  const accent = theme === 'persona-3' ? '#00d4ff' : theme === 'persona-4' ? '#ffd700' : '#e60012'

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length)
  }, [])

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      paginate(1)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, paginate])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      paginate(-1)
    } else if (info.offset.x < -100) {
      paginate(1)
    }
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction < 0 ? 45 : -45,
    }),
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {theme === 'persona-5' && (
          <div 
            className="absolute inset-0"
            style={{
              background: `repeating-linear-gradient(-45deg, ${accent}, ${accent} 1px, transparent 1px, transparent 40px)`
            }}
          />
        )}
        {theme === 'persona-4' && <div className="absolute inset-0 tv-static" />}
        {theme === 'persona-3' && (
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${accent}20 0%, transparent 50%)`
            }}
          />
        )}
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px" style={{ backgroundColor: accent }} />
            <span className="text-sm tracking-[0.3em]" style={{ color: accent }}>
              TESTIMONIALS
            </span>
            <div className="w-12 h-px" style={{ backgroundColor: accent }} />
          </div>
          <h2 className={`font-display text-4xl md:text-5xl tracking-tight ${
            theme === 'persona-5' ? '-skew-x-3' : ''
          } ${theme === 'persona-3' ? 'neon-glow' : ''}`}>
            <span className="text-foreground">SOCIAL</span>
            <span style={{ color: accent }} className="ml-3">LINKS</span>
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative h-[400px] md:h-[350px] flex items-center justify-center perspective-1000"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                rotateY: { duration: 0.4 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              style={{ x, rotate, scale }}
              className="absolute w-full max-w-3xl cursor-grab active:cursor-grabbing"
            >
              <motion.div
                className={`relative p-8 md:p-12 ${
                  theme === 'persona-5' ? '-skew-x-2' : theme === 'persona-3' ? 'rounded-2xl' : ''
                }`}
                style={{
                  backgroundColor: 'var(--secondary)',
                  border: `3px solid ${accent}`,
                  boxShadow: theme === 'persona-3' ? `0 0 40px ${accent}30` : 'none'
                }}
                whileHover={{ 
                  boxShadow: `0 0 50px ${accent}40`,
                  borderColor: accent
                }}
              >
                {/* Quote marks */}
                <motion.div
                  className="absolute -top-6 -left-2 font-display text-9xl opacity-20 select-none"
                  style={{ color: accent }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.2, y: 0 }}
                >
                  {'"'}
                </motion.div>

                <div className={theme === 'persona-5' ? 'skew-x-2' : ''}>
                  {/* Quote */}
                  <motion.p
                    className="text-xl md:text-2xl leading-relaxed mb-8 text-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {currentTestimonial.quote}
                  </motion.p>

                  {/* Author info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <motion.div
                      className={`w-16 h-16 flex items-center justify-center font-display text-xl ${
                        theme === 'persona-3' ? 'rounded-full' : theme === 'persona-5' ? 'rotate-45' : ''
                      }`}
                      style={{ 
                        backgroundColor: accent,
                        color: theme === 'persona-4' ? '#1a1510' : '#fff'
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      <span className={theme === 'persona-5' ? '-rotate-45' : ''}>
                        {currentTestimonial.avatar}
                      </span>
                    </motion.div>

                    <div>
                      <motion.h4
                        className="font-display text-xl tracking-wider"
                        style={{ color: accent }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {currentTestimonial.author}
                      </motion.h4>
                      <motion.p
                        className="text-muted-foreground text-sm tracking-wider"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        {currentTestimonial.role}
                      </motion.p>
                    </div>
                  </div>
                </div>

                {/* Decorative corner */}
                <motion.div
                  className="absolute bottom-0 right-0 w-24 h-24"
                  style={{
                    backgroundColor: accent,
                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                    opacity: 0.1
                  }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <motion.button
            onClick={() => paginate(-1)}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className={`absolute left-0 md:left-4 z-10 w-12 h-12 flex items-center justify-center ${
              theme === 'persona-3' ? 'rounded-full' : theme === 'persona-5' ? '-skew-x-6' : ''
            }`}
            style={{ 
              backgroundColor: accent,
              color: theme === 'persona-4' ? '#1a1510' : '#fff'
            }}
          >
            <span className={`font-display text-2xl ${theme === 'persona-5' ? 'skew-x-6' : ''}`}>{'<'}</span>
          </motion.button>

          <motion.button
            onClick={() => paginate(1)}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className={`absolute right-0 md:right-4 z-10 w-12 h-12 flex items-center justify-center ${
              theme === 'persona-3' ? 'rounded-full' : theme === 'persona-5' ? '-skew-x-6' : ''
            }`}
            style={{ 
              backgroundColor: accent,
              color: theme === 'persona-4' ? '#1a1510' : '#fff'
            }}
          >
            <span className={`font-display text-2xl ${theme === 'persona-5' ? 'skew-x-6' : ''}`}>{'>'}</span>
          </motion.button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1)
                setCurrentIndex(i)
              }}
              className={`relative transition-all duration-300 ${
                theme === 'persona-3' ? 'rounded-full' : theme === 'persona-5' ? 'rotate-45' : ''
              }`}
              style={{
                width: currentIndex === i ? '32px' : '12px',
                height: '12px',
                backgroundColor: currentIndex === i ? accent : accent + '30',
                boxShadow: currentIndex === i ? `0 0 10px ${accent}` : 'none'
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>

        {/* Swipe hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-6 text-sm text-muted-foreground tracking-wider"
        >
          <span className="hidden md:inline">DRAG TO NAVIGATE</span>
          <span className="md:hidden">SWIPE TO NAVIGATE</span>
        </motion.p>
      </div>
    </section>
  )
}
