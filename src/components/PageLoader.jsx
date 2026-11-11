import { useEffect, useRef, useState } from 'react'
import { animate, createTimeline } from 'animejs'

function shouldShowLoader() {
  if (typeof window === 'undefined') return false
  if (sessionStorage.getItem('loader-shown')) return false
  sessionStorage.setItem('loader-shown', '1')
  return true
}

// Page loader (A01): the name sprays in behind a nozzle glow, a counter
// ticks to 100, then an orange flood rises carrying the role title and
// wipes itself away to reveal the page.
export default function PageLoader() {
  const [visible, setVisible] = useState(shouldShowLoader)
  const panelRef = useRef(null)
  const tagRef = useRef(null)
  const nozzleRef = useRef(null)
  const numRef = useRef(null)
  const floodRef = useRef(null)

  useEffect(() => {
    if (!visible) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  useEffect(() => {
    if (!visible) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finish = () => setVisible(false)

    if (reduced) {
      finish()
      return
    }

    const tag = tagRef.current
    const nozzle = nozzleRef.current
    const reveal = { v: 0 }
    const counter = { v: 0 }

    const tl = createTimeline({
      onComplete: () => {
        animate(panelRef.current, {
          translateY: ['0%', '-100%'],
          duration: 650,
          ease: 'inOutQuart',
          onComplete: finish,
        })
      },
    })

    tl.add(
      reveal,
      {
        v: 1,
        duration: 900,
        ease: 'inOutQuart',
        onUpdate: () => {
          tag.style.clipPath = `inset(0 ${(1 - reveal.v) * 100}% 0 0)`
          nozzle.style.transform = `translateX(${reveal.v * tag.offsetWidth}px)`
          nozzle.style.opacity = reveal.v > 0.01 && reveal.v < 0.99 ? '1' : '0'
        },
      },
      0,
    )
      .add(
        counter,
        {
          v: 100,
          duration: 1300,
          ease: 'outExpo',
          onUpdate: () => {
            if (numRef.current) numRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
          },
        },
        100,
      )
      .add(floodRef.current, { translateY: ['100%', '0%'], duration: 650, ease: 'inOutQuart' }, 1500)

    return () => tl.pause()
  }, [visible])

  if (!visible) return null

  return (
    <div ref={panelRef} className="fixed inset-0 z-[200] overflow-hidden bg-ink">
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative" style={{ transform: 'rotate(-7deg)' }}>
          <div
            ref={tagRef}
            className="font-tag text-[18vw] leading-[0.8] text-accent sm:text-[11rem]"
            style={{ clipPath: 'inset(0 100% 0 0)' }}
          >
            Aneeq
          </div>
          <div
            ref={nozzleRef}
            aria-hidden
            className="pointer-events-none absolute left-0 top-[30%] h-20 w-20 -translate-y-1/2 rounded-full opacity-0"
            style={{ background: 'radial-gradient(circle, rgba(255,140,90,0.9), rgba(255,90,31,0.3) 40%, transparent 70%)' }}
          />
        </div>
      </div>

      <div
        className="absolute bottom-6 left-6 font-display text-5xl font-bold leading-none text-bg-elevated sm:text-6xl"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        <span ref={numRef}>000</span>
      </div>
      <div className="absolute bottom-8 right-6 font-mono text-xs text-ink-faint">loading portfolio…</div>

      <div ref={floodRef} className="absolute inset-0 grid translate-y-full place-items-center bg-accent">
        <div className="text-center font-display text-5xl font-bold uppercase leading-[0.85] tracking-tight sm:text-7xl">
          Intern
          <br />
          Software Eng.
        </div>
      </div>
    </div>
  )
}
