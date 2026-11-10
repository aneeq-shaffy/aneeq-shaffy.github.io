import { useEffect, useRef } from 'react'
import { animate, utils } from 'animejs'
import { motion } from 'motion/react'

function SplitWords({ text, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const words = ref.current.querySelectorAll('.word')
    animate(words, {
      translateY: [28, 0],
      opacity: [0, 1],
      duration: 900,
      delay: utils.stagger(70),
      ease: 'outExpo',
    })
  }, [])

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden className="word mr-[0.22em] inline-block opacity-0 last:mr-0">
          {w}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  return (
    <section id="about" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-bg">
      {/* Full-bleed portrait, right edge of the viewport */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.2, 0, 0, 1] }}
        className="absolute inset-y-0 right-0 hidden w-[46%] sm:block lg:w-[42%]"
      >
        <img
          src="/assets/aneeq-headshot-graded.jpg"
          alt="Aneeq Shaffy - Software Developer"
          className="h-full w-full object-cover object-top"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--color-bg) 0%, transparent 28%)' }}
        />
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{ background: 'linear-gradient(to right, var(--color-bg) 0%, transparent 12%)' }}
        />
      </motion.div>

      {/* Ghost background word */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-4 left-1/2 -z-10 w-full -translate-x-1/2 select-none text-center font-display text-[22vw] font-bold leading-none tracking-tight text-ink/[0.045] sm:text-[15vw]"
      >
        DEVELOPER
      </span>

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-between px-5 py-8 sm:px-8">
        <div className="flex flex-1 flex-col justify-center">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr] lg:gap-6">
            <div className="hidden lg:block">
              <span className="block origin-bottom-left -rotate-90 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-ink-dim">
                Software developer
              </span>
            </div>

            <div className="lg:max-w-[54%]">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 flex gap-10 font-mono text-sm text-ink-dim sm:mb-10 sm:gap-14"
              >
                <Stat value="+3" label="Projects shipped" />
                <Stat value="+1" label="Internship live" />
                <Stat value="#1" label="Debugging enthusiast" />
              </motion.div>

              <h1 className="font-display text-[15vw] font-bold leading-[0.95] tracking-tight text-ink sm:text-[7rem] lg:text-[6rem]">
                <SplitWords text="Hey, I'm Aneeq" />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-6 max-w-[40ch] text-lg italic text-ink-dim"
              >
                — a software developer who ships full-stack web apps and occasionally sleeps.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="mt-8 max-w-[46ch] text-ink-dim"
              >
                Currently a Software Engineer Intern at{' '}
                <a
                  href="https://baylanka.net"
                  target="_blank"
                  rel="noopener"
                  className="text-ink underline underline-offset-4 hover:text-ink-dim"
                >
                  Baylanka
                </a>
                , a German-Sri Lankan custom software studio. I build on two real products —{' '}
                <strong className="font-semibold text-ink">Onres24</strong>, a flight-school
                management platform, and <strong className="font-semibold text-ink">Woblu Maintenance</strong>,
                a property-management system for insurance agencies. PHP, MySQL, jQuery, and
                Bootstrap, day in and day out.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-8 flex flex-wrap gap-6"
              >
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex items-center gap-1.5 border-b border-ink pb-0.5 text-ink"
                >
                  Download CV <span className="transition-transform group-hover:translate-x-1">↗</span>
                </a>
                <a
                  href="mailto:aneeqshaffy7@gmail.com?subject=Let%27s%20Connect"
                  className="group inline-flex items-center gap-1.5 border-b border-ink pb-0.5 text-ink"
                >
                  Get In Touch <span className="transition-transform group-hover:translate-x-1">↗</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-border pt-5 font-mono text-xs uppercase tracking-wide text-ink-faint">
          <span>2026</span>
          <a href="#experience" className="flex items-center gap-2 hover:text-ink">
            Scroll down <span className="animate-bounce">↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-display text-2xl font-semibold text-ink">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  )
}
