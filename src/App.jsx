import { useRef } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Education from './components/Education.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import ChequeredDissolve from './components/ChequeredDissolve.jsx'
import useLenis from './hooks/useLenis.js'
import useStickyStack from './hooks/useStickyStack.js'

export default function App() {
  useLenis()

  const heroInner = useRef(null)
  const heroShade = useRef(null)
  const expOuter = useRef(null)
  const expInner = useRef(null)
  const expShade = useRef(null)
  const projectsOuter = useRef(null)

  useStickyStack([
    { innerRef: heroInner, shadeRef: heroShade, nextRef: expOuter },
    { innerRef: expInner, shadeRef: expShade, nextRef: projectsOuter },
  ])

  return (
    <div id="top">
      <CustomCursor />
      <Header />
      <main>
        {/* The sticky stack: Hero pins, Experience slides up and recedes it,
            Projects is the final layer — it covers but is never covered. */}
        <div className="relative bg-bg">
          <div style={{ height: '150vh' }} className="relative">
            <div
              ref={heroInner}
              className="sticky top-0 z-0 flex min-h-screen origin-center flex-col justify-center"
            >
              <Hero />
              <div ref={heroShade} className="pointer-events-none absolute inset-0 bg-black opacity-0" />
            </div>
          </div>

          <div ref={expOuter} style={{ height: '140vh' }} className="relative">
            <div
              ref={expInner}
              className="sticky top-0 z-10 flex min-h-screen origin-center flex-col justify-center bg-bg"
            >
              <ChequeredDissolve surface="#121417" />
              <Experience />
              <div ref={expShade} className="pointer-events-none absolute inset-0 bg-black opacity-0" />
            </div>
          </div>

          <div ref={projectsOuter} className="relative z-20 bg-bg">
            <ChequeredDissolve surface="#0b0d0f" />
            <Projects />
          </div>
        </div>

        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
