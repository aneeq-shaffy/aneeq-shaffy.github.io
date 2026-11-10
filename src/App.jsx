import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Education from './components/Education.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

const SLIDE_COUNT = 6

export default function App() {
  const [index, setIndex] = useState(0)
  const touchStart = useRef(null)

  const goTo = useCallback((i) => {
    setIndex((prev) => {
      const next = typeof i === 'function' ? i(prev) : i
      return Math.max(0, Math.min(SLIDE_COUNT - 1, next))
    })
  }, [])

  const slides = [
    { id: 'about', label: 'About', content: <Hero onNext={() => goTo((i) => i + 1)} /> },
    { id: 'experience', label: 'Experience', content: <Experience /> },
    { id: 'projects', label: 'Projects', content: <Projects /> },
    { id: 'education', label: 'Education', content: <Education /> },
    { id: 'skills', label: 'Skills', content: <Skills /> },
    {
      id: 'contact',
      label: 'Contact',
      content: (
        <>
          <Contact />
          <Footer onNavigate={goTo} />
        </>
      ),
    },
  ]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goTo((i) => i + 1)
      if (e.key === 'ArrowLeft') goTo((i) => i - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo])

  const onPointerDown = (e) => {
    touchStart.current = e.clientX ?? e.changedTouches?.[0]?.clientX
  }
  const onPointerUp = (e) => {
    if (touchStart.current == null) return
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX
    const delta = endX - touchStart.current
    touchStart.current = null
    if (Math.abs(delta) < 60) return
    if (delta < 0) goTo((i) => i + 1)
    else goTo((i) => i - 1)
  }

  return (
    <div className="flex h-[100svh] w-screen flex-col overflow-hidden bg-bg">
      <Header slides={slides} activeIndex={index} onNavigate={goTo} />

      <div
        className="relative flex-1 overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <motion.div
          className="flex h-full"
          animate={{ x: `-${index * 100}%` }}
          transition={{ type: 'spring', stiffness: 260, damping: 32 }}
        >
          {slides.map((s) => (
            <div key={s.id} className="no-scrollbar h-full w-screen flex-shrink-0 overflow-y-auto">
              {s.content}
            </div>
          ))}
        </motion.div>

        <button
          onClick={() => goTo((i) => i - 1)}
          disabled={index === 0}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-40 hidden -translate-y-1/2 text-xl text-ink-dim transition-colors hover:text-ink disabled:pointer-events-none disabled:opacity-0 sm:block sm:left-7"
        >
          ←
        </button>
        <button
          onClick={() => goTo((i) => i + 1)}
          disabled={index === slides.length - 1}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-40 hidden -translate-y-1/2 text-xl text-ink-dim transition-colors hover:text-ink disabled:pointer-events-none disabled:opacity-0 sm:block sm:right-7"
        >
          →
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 py-3">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            aria-label={`Go to ${s.label}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-ink' : 'w-1.5 bg-ink/25'}`}
          />
        ))}
      </div>
    </div>
  )
}
