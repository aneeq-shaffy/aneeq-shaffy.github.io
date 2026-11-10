import { useEffect, useRef } from 'react'

// A rolling field of sine-wave contour lines behind the hero, in the spirit
// of the analytic contour backdrops in high-end WebGL hero sections — done
// here on a plain 2D canvas so it stays cheap on every device.
const LINE_SCALE = 2.6
const LINE_COUNT = 3
const WAVE_SPEED = 0.35
const WAVE_AMOUNT = 0.45

function field(x, y, t) {
  let f = Math.sin(x * 1.0 + t * 0.6) * 0.5
  f += Math.sin(y * 0.85 - t * 0.45) * 0.45
  f += Math.sin((x + y) * 0.65 + t * 0.35) * 0.35
  f += Math.sin((x - y) * 0.95 - t * 0.55) * 0.25
  return f * 0.5 + 0.5
}

export default function ContourField({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let raf = null
    let start = performance.now()

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const CELLS = 56

    const draw = (now) => {
      const t = ((now - start) / 1000) * WAVE_SPEED
      const cols = CELLS
      const rows = Math.max(8, Math.round((cols * height) / width))
      const stepX = width / cols
      const stepY = height / rows
      const aspect = width / height

      ctx.clearRect(0, 0, width, height)
      ctx.strokeStyle = 'rgba(200,255,61,0.16)'
      ctx.lineWidth = 1
      ctx.beginPath()

      const values = new Float32Array((cols + 1) * (rows + 1))
      for (let j = 0; j <= rows; j++) {
        for (let i = 0; i <= cols; i++) {
          const nx = ((i / cols) * 2 - 1) * aspect * LINE_SCALE
          const ny = ((j / rows) * 2 - 1) * LINE_SCALE
          const qx = nx + Math.sin(ny * 0.8 + t * 0.7) * WAVE_AMOUNT
          const qy = ny + Math.cos(nx * 0.7 - t * 0.6) * WAVE_AMOUNT
          values[j * (cols + 1) + i] = field(qx, qy, t) * LINE_COUNT
        }
      }

      for (let level = 0.5; level < LINE_COUNT; level++) {
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            const a = values[j * (cols + 1) + i]
            const b = values[j * (cols + 1) + i + 1]
            const c = values[(j + 1) * (cols + 1) + i + 1]
            const d = values[(j + 1) * (cols + 1) + i]
            const idx = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0)
            if (idx === 0 || idx === 15) continue
            const x0 = i * stepX
            const y0 = j * stepY
            const top = [x0 + stepX * ((level - a) / (b - a)), y0]
            const right = [x0 + stepX, y0 + stepY * ((level - b) / (c - b))]
            const bottom = [x0 + stepX * ((level - d) / (c - d)), y0 + stepY]
            const left = [x0, y0 + stepY * ((level - a) / (d - a))]
            const seg = (p, q) => {
              ctx.moveTo(p[0], p[1])
              ctx.lineTo(q[0], q[1])
            }
            switch (idx) {
              case 1: case 14: seg(left, bottom); break
              case 2: case 13: seg(bottom, right); break
              case 3: case 12: seg(left, right); break
              case 4: case 11: seg(top, right); break
              case 6: case 9: seg(top, bottom); break
              case 7: case 8: seg(left, top); break
              case 5: seg(left, top); seg(bottom, right); break
              case 10: seg(left, bottom); seg(top, right); break
              default: break
            }
          }
        }
      }
      ctx.stroke()
      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)

    if (!reduced) {
      raf = requestAnimationFrame(draw)
    } else {
      draw(performance.now())
    }

    return () => {
      window.removeEventListener('resize', resize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={`absolute inset-0 ${className}`} />
}
