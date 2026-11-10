import { useEffect, useRef } from 'react'
import { animate } from 'animejs'

// A real port of the "circuit lap" idea: a path draws in once, clockwise,
// with a glowing head, when it scrolls into view — then cools to a plain
// line. Here it traces across the skills section instead of a race track.
const PATH = 'M0,44 C120,44 140,6 280,6 S420,78 580,78 S720,10 900,10 S1080,70 1200,70'

export default function CircuitTrace({ className = '' }) {
  const pathRef = useRef(null)
  const dotRef = useRef(null)
  const playedRef = useRef(false)

  useEffect(() => {
    const path = pathRef.current
    const dot = dotRef.current
    if (!path) return

    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`
    if (dot) dot.style.opacity = '0'

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const play = () => {
      if (playedRef.current) return
      playedRef.current = true

      if (reduced) {
        path.style.strokeDashoffset = '0'
        return
      }

      if (dot) dot.style.opacity = '1'
      const tween = { progress: 0 }
      animate(tween, {
        progress: 100,
        duration: 2600,
        ease: 'inOutSine',
        onUpdate: () => {
          const p = tween.progress
          path.style.strokeDashoffset = `${length * (1 - p / 100)}`
          if (dot) {
            const point = path.getPointAtLength(length * (p / 100))
            dot.setAttribute('cx', point.x)
            dot.setAttribute('cy', point.y)
          }
        },
        onComplete: () => {
          if (dot) dot.style.opacity = '0'
        },
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && play(),
      { threshold: 0.35 },
    )
    observer.observe(path)
    return () => observer.disconnect()
  }, [])

  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 84"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 top-0 h-20 w-full ${className}`}
    >
      <path ref={pathRef} d={PATH} fill="none" stroke="#c8ff3d" strokeOpacity="0.3" strokeWidth="2" />
      <circle ref={dotRef} r="4" fill="#c8ff3d" style={{ filter: 'drop-shadow(0 0 6px #c8ff3d)' }} />
    </svg>
  )
}
