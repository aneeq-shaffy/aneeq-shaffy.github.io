import { useEffect, useRef } from 'react'

const GLYPHS = '01{}<>/=;#$_*+ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function scramble(target, p, seed) {
  let s = ''
  for (let i = 0; i < target.length; i++) {
    const ch = target[i]
    if (ch === ' ' || ch === '·') {
      s += ch
      continue
    }
    const at = (i / target.length) * 0.75
    s += p >= at + 0.25 ? ch : p >= at ? GLYPHS[(Math.floor(seed * 30) + i * 7) % GLYPHS.length] : ' '
  }
  return s
}

// Decode-text reveal (A04): a line resolves out of code-glyph noise, like a
// terminal printing itself in.
export default function DecodeText({ text, className = '', delay = 0, trigger = 'inview' }) {
  const ref = useRef(null)
  const rootRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const run = () => {
      if (reduced) {
        el.textContent = text
        return
      }
      const start = performance.now() + delay
      let raf
      const tick = (now) => {
        const t = Math.min(1, Math.max(0, (now - start) / 1400))
        el.textContent = scramble(text, t, now / 1000)
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(raf)
    }

    if (trigger === 'mount') return run()

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
  }, [text, delay, trigger])

  return (
    <span ref={rootRef}>
      <span ref={ref} className={className} style={{ whiteSpace: 'pre' }}>
        {text}
      </span>
    </span>
  )
}
