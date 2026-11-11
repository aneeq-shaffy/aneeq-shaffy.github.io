import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

const DRIPS = [
  { x: '8%', w: 9, h: 56 },
  { x: '24%', w: 6, h: 32 },
  { x: '44%', w: 10, h: 72 },
  { x: '62%', w: 6, h: 40 },
  { x: '80%', w: 8, h: 60 },
  { x: '94%', w: 5, h: 26 },
]

// Paint drips (A03): bars that grow downward from a tagged word, like
// spray paint running on a wall.
export default function Drips({ className = '', delay = 0 }) {
  const rootRef = useRef(null)
  const barsRef = useRef([])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const bars = barsRef.current

    if (reduced) {
      bars.forEach((bar) => bar && (bar.style.transform = 'scaleY(1)'))
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        animate(bars, {
          scaleY: [0, 1],
          duration: 650,
          delay: stagger(130, { start: delay }),
          ease: 'outCubic',
        })
        observer.disconnect()
      },
      { threshold: 0.4 },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={rootRef} className={`relative h-16 ${className}`}>
      {DRIPS.map((d, i) => (
        <div
          key={i}
          ref={(el) => (barsRef.current[i] = el)}
          className="absolute top-0 origin-top rounded-b-full bg-accent"
          style={{ left: d.x, width: d.w, height: d.h, transform: 'scaleY(0)' }}
        />
      ))}
    </div>
  )
}
