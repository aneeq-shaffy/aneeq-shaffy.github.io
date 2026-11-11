import { useEffect, useRef } from 'react'
import { createTimeline } from 'animejs'

// Section heading reveal (K02): an index that counts up, a rule that draws
// out, a label that fades in, then the title masks up from below — all
// fired once the heading scrolls into view.
export default function SectionHeading({ index = '01', label, title, subtitle }) {
  const numRef = useRef(null)
  const lineRef = useRef(null)
  const tagRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const target = parseInt(index, 10) || 0

    if (reduced) {
      if (numRef.current) numRef.current.textContent = index
      if (lineRef.current) lineRef.current.style.transform = 'scaleX(1)'
      if (tagRef.current) tagRef.current.style.opacity = '1'
      if (titleRef.current) titleRef.current.style.transform = 'translateY(0)'
      if (subtitleRef.current) subtitleRef.current.style.opacity = '1'
      return
    }

    const counter = { v: 0 }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        const tl = createTimeline({ defaults: { ease: 'outExpo' } })
        tl.add(
          counter,
          {
            v: target,
            duration: 700,
            onUpdate: () => {
              if (numRef.current) numRef.current.textContent = String(Math.round(counter.v)).padStart(2, '0')
            },
          },
          0,
        )
          .add(lineRef.current, { scaleX: [0, 1], duration: 900 }, 0)
          .add(tagRef.current, { opacity: [0, 1], duration: 500 }, 300)
          .add(titleRef.current, { translateY: ['105%', '0%'], duration: 800 }, 150)
          .add(subtitleRef.current, { opacity: [0, 1], translateY: [10, 0], duration: 600 }, 400)
        observer.disconnect()
      },
      { threshold: 0.4 },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [index])

  return (
    <div ref={rootRef} className="mb-10">
      <div className="mb-4 flex items-center gap-4 font-mono text-[13px] font-medium uppercase tracking-[0.1em] text-ink-dim">
        <span ref={numRef} className="text-accent" style={{ fontVariantNumeric: 'tabular-nums' }}>
          00
        </span>
        <span ref={lineRef} className="h-[3px] flex-1 origin-left scale-x-0 bg-ink" />
        <span ref={tagRef} className="opacity-0">
          {label}
        </span>
      </div>
      <div className="overflow-hidden">
        <h2
          ref={titleRef}
          className="block font-display text-4xl font-bold uppercase leading-[0.92] tracking-tight sm:text-5xl"
          style={{ transform: 'translateY(105%)' }}
        >
          {title}
        </h2>
      </div>
      <p ref={subtitleRef} className="mt-3 text-ink-dim opacity-0">
        {subtitle}
      </p>
    </div>
  )
}
