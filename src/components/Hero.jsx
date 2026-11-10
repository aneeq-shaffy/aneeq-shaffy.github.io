import { useEffect, useRef } from 'react'
import { animate, utils } from 'animejs'
import { motion } from 'motion/react'
import ContourField from './ContourField.jsx'
import useTilt from '../hooks/useTilt.js'

function SplitLetters({ text, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const letters = ref.current.querySelectorAll('.letter')
    animate(letters, {
      translateY: [36, 0],
      opacity: [0, 1],
      duration: 900,
      delay: utils.stagger(28),
      ease: 'outExpo',
    })
  }, [])

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="letter inline-block opacity-0"
          style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
        >
          {ch}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const tilt = useTilt(8)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const handle = (e) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      el.style.setProperty('--spot-x', `${x}%`)
      el.style.setProperty('--spot-y', `${y}%`)
    }
    el.addEventListener('mousemove', handle)
    return () => el.removeEventListener('mousemove', handle)
  }, [])

  return (
    <section
      id="about"
      ref={heroRef}
      className="relative mx-auto max-w-[1180px] overflow-hidden border-b border-border px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-28"
      style={{ '--spot-x': '50%', '--spot-y': '30%' }}
    >
      <ContourField className="opacity-60" />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(420px circle at var(--spot-x) var(--spot-y), rgba(200,255,61,0.10), transparent 70%)',
        }}
      />

      <div className="relative z-10 mb-4 font-mono text-xs tracking-[0.1em] text-accent">01 / PROFILE</div>

      <div className="relative z-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <h1 className="font-mono text-4xl font-extrabold tracking-tight sm:text-6xl">
            <SplitLetters text="ANEEQ SHAFFY" />
          </h1>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.2, 0, 0, 1] }}
            className="mb-6 mt-1 text-xl font-semibold text-accent sm:text-2xl"
          >
            Software Developer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6, ease: [0.2, 0, 0, 1] }}
            className="mb-4 max-w-[60ch] text-ink-dim"
          >
            I build full-stack web apps — frontend, backend, and whatever's in between — and I'm
            currently doing that as a Software Engineer Intern at{' '}
            <a
              href="https://baylanka.net"
              target="_blank"
              rel="noopener"
              className="text-ink underline decoration-border underline-offset-4 hover:text-accent hover:decoration-accent"
            >
              Baylanka
            </a>
            . React, Next.js, Node.js, and a steadily growing tolerance for debugging other
            people's CSS at 1am.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6, ease: [0.2, 0, 0, 1] }}
            className="mb-4 max-w-[60ch] text-ink-dim"
          >
            Outside of shipping features, I'm into clean code, tidy git history, and figuring out
            why a bug that "shouldn't be possible" is, in fact, very possible. Based in Colombo,
            Sri Lanka — open to full-time, freelance, or just a good conversation about tech.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6, ease: [0.2, 0, 0, 1] }}
            className="my-7 grid grid-cols-2 gap-x-8 gap-y-3 rounded border border-border bg-bg-elevated p-5"
          >
            <MetaItem k="AGE" v="23" />
            <MetaItem k="LOCATION" v="Colombo, LK" />
            <MetaItem k="ROLE" v="Intern" />
            <MetaItem k="COMPANY" v="Baylanka" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.6, ease: [0.2, 0, 0, 1] }}
            className="mb-6 flex flex-wrap gap-4"
          >
            <MagneticLink
              href="/cv.pdf"
              target="_blank"
              rel="noopener"
              className="rounded-sm bg-accent px-6 py-3 font-mono text-sm font-bold tracking-wide text-bg transition-colors hover:bg-accent-dim"
            >
              Download CV
            </MagneticLink>
            <MagneticLink
              href="mailto:aneeqshaffy7@gmail.com?subject=Let%27s%20Connect"
              className="rounded-sm border border-border px-6 py-3 font-mono text-sm font-bold tracking-wide transition-colors hover:border-accent hover:text-accent"
            >
              Get In Touch
            </MagneticLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex gap-6 font-mono text-sm text-ink-dim"
          >
            <a href="https://www.linkedin.com/in/aneeq-shaffy" target="_blank" rel="noopener" className="hover:text-accent">
              LinkedIn
            </a>
            <a href="https://github.com/aneeq-shaffy" target="_blank" rel="noopener" className="hover:text-accent">
              GitHub
            </a>
            <a href="tel:+94762844725" className="hover:text-accent">
              +94 76 284 4725
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.2, 0, 0, 1] }}
          className="flex justify-center"
          style={{ perspective: 1000 }}
        >
          <motion.div
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
            className="group relative aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-md border border-border bg-bg-elevated"
          >
            <img
              src="/assets/aneeq-headshot.jpeg"
              alt="Aneeq Shaffy - Software Developer"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent" />
            <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-accent/70" />
            <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-accent/70" />
            <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-accent/70" />
            <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-accent/70" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function MetaItem({ k, v }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[0.68rem] tracking-wide text-ink-faint">{k}</span>
      <span className="text-sm font-semibold">{v}</span>
    </div>
  )
}

function MagneticLink({ children, className, ...rest }) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`
  }

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <a
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`inline-block transition-transform duration-150 ease-out ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}
