import { useEffect } from 'react'

// Port of the "sticky stack" recede effect: each pinned layer shrinks and
// darkens as the next one slides up to cover it, rather than just scrolling
// away underneath. Verbatim formula, adapted to vanilla refs.
const RECEDE_SCALE = 0.9
const RECEDE_SHADE = 0.55

export default function useStickyStack(layers) {
  useEffect(() => {
    const phone = window.matchMedia('(max-width: 639px)')
    let raf = null

    const apply = () => {
      raf = null
      const view = window.innerHeight || 1
      const shrink = phone.matches ? 0 : 1 - RECEDE_SCALE
      for (const { innerRef, shadeRef, nextRef } of layers) {
        const inner = innerRef.current
        const shade = shadeRef.current
        const next = nextRef.current
        if (!inner || !shade || !next) continue
        const p = Math.min(1, Math.max(0, 1 - next.getBoundingClientRect().top / view))
        inner.style.transform = p > 0 && shrink > 0 ? `scale(${1 - shrink * p})` : ''
        inner.style.willChange = p > 0 && shrink > 0 ? 'transform' : ''
        shade.style.opacity = `${RECEDE_SHADE * p}`
        inner.style.visibility = p >= 1 ? 'hidden' : 'visible'
      }
    }

    const schedule = () => {
      if (raf) return
      raf = requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf) cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
