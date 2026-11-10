import { useEffect, useRef } from 'react'

// Port of the "chequered flag coming apart" seam effect: a canvas band at the
// top of an incoming section that starts as a solid colour, breaks into a
// checkerboard, and burns off as the section scrolls into place.
const CELL = 22
const SOLID_UNTIL = 0.16
const LIFT = 2
const ACCENT_SHARE = 0.07

function noise(x, y) {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}

const clamp01 = (v) => Math.min(1, Math.max(0, v))

export default function ChequeredDissolve({
  height = '28vh',
  surface = '#0b0d0f',
  accent = '#c8ff3d',
  className = '',
}) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = null
    let width = 0
    let cssHeight = 0
    let lastProgress = -1

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      cssHeight = rect.height
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(cssHeight * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const render = (progress) => {
      ctx.clearRect(0, 0, width, cssHeight)
      const columns = Math.ceil(width / CELL)
      const rows = Math.ceil(cssHeight / CELL)
      const lift = progress * LIFT
      for (let y = 0; y < rows; y++) {
        const depth = y / Math.max(1, rows - 1) + lift
        if (depth > 1) break
        const solid = depth <= SOLID_UNTIL
        const fade = clamp01(1 - (depth - SOLID_UNTIL) / (1 - SOLID_UNTIL))
        if (!solid && fade <= 0) break
        for (let x = 0; x < columns; x++) {
          if (!solid) {
            if ((x + y) % 2 !== 0) continue
            if (noise(x, y) > fade) continue
          }
          ctx.fillStyle = !solid && noise(x + 101, y + 57) < ACCENT_SHARE ? accent : surface
          ctx.fillRect(x * CELL, y * CELL, CELL, CELL)
        }
      }
    }

    const update = () => {
      raf = null
      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const progress = clamp01(1 - rect.top / vh)
      if (Math.abs(progress - lastProgress) > 0.002) {
        lastProgress = progress
        render(progress)
      }
    }

    const schedule = () => {
      if (raf) return
      raf = requestAnimationFrame(update)
    }

    resize()
    update()

    if (reduced) {
      render(1)
      return () => {}
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [surface, accent])

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 z-30 ${className}`}
      style={{ height }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
