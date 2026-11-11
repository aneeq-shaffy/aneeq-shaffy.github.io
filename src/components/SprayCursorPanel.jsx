import { useEffect, useRef } from 'react'

// Spray cursor (A06): a contained playground where moving the pointer lays
// down a drifting trail of orange spray, with the odd drip. Confined to its
// own panel rather than hijacking the real cursor.
export default function SprayCursorPanel({ className = '' }) {
  const boxRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const box = boxRef.current
    const canvas = canvasRef.current
    if (!box || !canvas) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    const sp = { x: 0, y: 0, in: false }
    let parts = []
    let raf = null

    const onMove = (e) => {
      const b = box.getBoundingClientRect()
      sp.in = true
      sp.x = e.clientX - b.left
      sp.y = e.clientY - b.top
    }
    const onLeave = () => {
      sp.in = false
    }
    box.addEventListener('pointermove', onMove)
    box.addEventListener('pointerleave', onLeave)

    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (!w || !h) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      if (canvas.width !== Math.round(w * dpr)) {
        canvas.width = Math.round(w * dpr)
        canvas.height = Math.round(h * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (!sp.in && !reduced) {
        const t = now / 1000
        sp.x = w * 0.55 + Math.cos(t * 1.1) * w * 0.3
        sp.y = h * 0.42 + Math.sin(t * 2.2) * h * 0.22
      }
      if (!reduced) {
        for (let k = 0; k < 14; k++) {
          const a = Math.random() * Math.PI * 2
          const r = Math.pow(Math.random(), 1.6) * 22
          parts.push({ x: sp.x + Math.cos(a) * r, y: sp.y + Math.sin(a) * r, s: Math.random() * 2.2 + 0.6 })
        }
        if (Math.random() < 0.04) parts.push({ x: sp.x, y: sp.y, s: 3.5, drip: 0 })
      }

      ctx.fillStyle = 'rgba(242,239,232,0.035)'
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = '#ff5a1f'
      parts.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2)
        ctx.fill()
        if (p.drip !== undefined && p.drip < 40) {
          p.drip += 0.6
          ctx.fillRect(p.x - 1.5, p.y, 3, p.drip)
        }
      })
      parts = parts.filter((p) => p.drip === undefined || p.drip < 40)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      box.removeEventListener('pointermove', onMove)
      box.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={boxRef}
      className={`hard relative overflow-hidden bg-bg-elevated ${className}`}
      style={{ cursor: 'crosshair' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
      <div className="pointer-events-none absolute bottom-5 left-6 font-display text-4xl font-bold uppercase leading-[0.85] sm:text-5xl">
        Go on,
        <br />
        tag it.
      </div>
    </div>
  )
}
