import { useRef } from 'react'
import { useMotionValue, useSpring, useTransform } from 'motion/react'

export default function useTilt(strength = 10) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const springX = useSpring(px, { stiffness: 220, damping: 20 })
  const springY = useSpring(py, { stiffness: 220, damping: 20 })
  const rotateX = useTransform(springY, [0, 1], [strength, -strength])
  const rotateY = useTransform(springX, [0, 1], [-strength, strength])

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const onMouseLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave }
}
