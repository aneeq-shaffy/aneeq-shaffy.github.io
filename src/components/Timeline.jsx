import { useEffect, useRef } from 'react'
import { animate } from 'animejs'

// Scroll-triggered timeline (K09): a vertical rail draws down past each row,
// with a marker that rides the line and rows fading in as it passes them.
export default function Timeline({ items }) {
  const rootRef = useRef(null)
  const lineRef = useRef(null)
  const markRef = useRef(null)
  const rowsRef = useRef([])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rows = rowsRef.current

    if (reduced) {
      if (lineRef.current) lineRef.current.style.transform = 'scaleY(1)'
      rows.forEach((row) => row && (row.style.opacity = '1'))
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        const railHeight = root.querySelector('[data-rail]')?.offsetHeight || 0

        animate(lineRef.current, { scaleY: [0, 1], duration: 900 + items.length * 220, ease: 'inOutQuart' })
        animate(markRef.current, {
          translateY: [0, railHeight - 11],
          rotate: [0, 450],
          duration: 900 + items.length * 220,
          ease: 'inOutQuart',
        })
        rows.forEach((row, i) => {
          if (!row) return
          animate(row, {
            opacity: [0.25, 1],
            duration: 400,
            delay: (i / items.length) * (700 + items.length * 220),
          })
        })
        observer.disconnect()
      },
      { threshold: 0.3 },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [items.length])

  return (
    <div ref={rootRef} className="relative hard bg-bg-elevated p-7 shadow-[6px_6px_0_var(--color-ink)] sm:p-9">
      <div data-rail className="absolute bottom-7 left-[112px] top-7 w-[3px] bg-ink/15 sm:left-[132px]">
        <div ref={lineRef} className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-ink" />
        <div ref={markRef} className="absolute -left-[7px] top-0 h-[17px] w-[17px] border-2 border-ink bg-accent" />
      </div>

      <div className="flex flex-col">
        {items.map((item, i) => (
          <div
            key={`${item.year}-${item.title}`}
            ref={(el) => (rowsRef.current[i] = el)}
            className="grid grid-cols-[88px_1fr] gap-8 py-4 opacity-[0.25] sm:grid-cols-[108px_1fr]"
          >
            <div className="font-display text-2xl font-bold uppercase leading-none sm:text-3xl">{item.year}</div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">{item.kicker}</div>
              <div className="mt-1 font-display text-lg font-bold uppercase sm:text-xl">{item.title}</div>
              {item.description ? <p className="mt-2 max-w-prose text-sm text-ink-dim">{item.description}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
