import { useEffect, useRef } from 'react'

// Wraps a Lordicon <lord-icon> web component and plays its animation once,
// the moment it scrolls into view (Lordicon's own triggers don't include a
// clean "play once on appear", so this does it via IntersectionObserver +
// the player instance Lordicon attaches to the element once it boots).
export default function AnimatedIcon({ src, size = 28, colors = 'primary:#1a1a1a,secondary:#1a1a1a' }) {
  const ref = useRef(null)
  const playedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const tryPlay = () => {
      if (playedRef.current) return
      const player = el.playerInstance
      if (!player) return
      playedRef.current = true
      if (player.playFromBeginning) player.playFromBeginning()
      else player.play()
    }

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && tryPlay(),
      { threshold: 0.4 },
    )
    observer.observe(el)
    el.addEventListener('ready', tryPlay)

    return () => {
      observer.disconnect()
      el.removeEventListener('ready', tryPlay)
    }
  }, [])

  if (!src) return null

  // eslint-disable-next-line react/no-unknown-property
  return <lord-icon ref={ref} src={src} colors={colors} style={{ width: size, height: size }} />
}
