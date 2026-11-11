import { useEffect, useRef } from 'react'
import { animate } from 'animejs'

// Spray-tag reveal (A01/A02/A03): a hand-lettered word wipes in left to
// right behind a soft spray-nozzle glow, as if just tagged on the wall.
export default function TagReveal({
  text,
  className = '',
  trigger = 'inview',
  delay = 0,
  rotate = -6,
  stroke = false,
}) {
  const wordRef = useRef(null)
  const nozzleRef = useRef(null)
  const rootRef = useRef(null)

  useEffect(() => {
    const word = wordRef.current
    const nozzle = nozzleRef.current
    if (!word) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const run = () => {
      if (reduced) {
        word.style.clipPath = 'inset(0 0% 0 0)'
        return
      }
      const progress = { v: 0 }
      animate(progress, {
        v: 1,
        duration: 1100,
        delay,
        ease: 'inOutQuart',
        onUpdate: () => {
          word.style.clipPath = `inset(0 ${(1 - progress.v) * 100}% 0 0)`
          if (nozzle) {
            nozzle.style.transform = `translateX(${progress.v * word.offsetWidth}px)`
            nozzle.style.opacity = progress.v > 0.01 && progress.v < 0.99 ? '1' : '0'
          }
        },
      })
    }

    if (trigger === 'mount') {
      run()
      return
    }

    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        run()
        observer.disconnect()
      },
      { threshold: 0.4 },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [trigger, delay])

  return (
    <span ref={rootRef} className={`relative inline-block ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      <span
        ref={wordRef}
        className="font-tag leading-[0.8] text-accent"
        style={
          stroke
            ? { WebkitTextStroke: '3px var(--color-ink)', paintOrder: 'stroke fill', clipPath: 'inset(0 100% 0 0)' }
            : { clipPath: 'inset(0 100% 0 0)' }
        }
      >
        {text}
      </span>
      <span
        ref={nozzleRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full opacity-0"
        style={{
          background:
            'radial-gradient(circle, rgba(255,140,90,0.9), rgba(255,90,31,0.3) 40%, transparent 70%)',
        }}
      />
    </span>
  )
}
