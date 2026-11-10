import { motion } from 'motion/react'
import SectionHeading from './SectionHeading.jsx'
import Reveal, { RevealGroup, revealItem } from './Reveal.jsx'
import useTilt from '../hooks/useTilt.js'

const PROJECTS = [
  {
    index: '01',
    name: 'ITPM-Lingo',
    tagline: 'English–Sinhala translation platform',
    image: '/assets/project2.png',
    code: 'https://github.com/gitPirate12/itpm-lingo-2.0',
    description:
      "A translation web app with OAuth 2.0 authentication wired through NextAuth.js and a MongoDB adapter. Built RESTful CRUD APIs, tested with Postman, and integrated three third-party translation APIs from RapidAPI. Restructured the MongoDB schema to resolve UUID/ObjectID compatibility issues, and led the team through to delivery.",
    tech: ['Next.js', 'MongoDB', 'OAuth 2.0', 'RapidAPI'],
  },
  {
    index: '02',
    name: 'FitFusion',
    tagline: 'Fitness social media platform',
    image: '/assets/project1.png',
    code: 'https://github.com/gitPirate12/FitFusion',
    description:
      'My first Spring Boot project — a fitness-focused social app built with Spring Boot, React.js, and MongoDB. Learned how models, repositories, and services fit together in a Java backend, added JWT-based authentication, and tested every endpoint through Postman.',
    tech: ['Spring Boot', 'React.js', 'MongoDB', 'JWT'],
  },
  {
    index: '03',
    name: 'Flavor Exchange',
    tagline: 'Recipe sharing platform',
    image: '/assets/project3.png',
    code: 'https://github.com/gitPirate12/flavor-exchange',
    description:
      "A recipe-sharing platform built with Next.js, React.js, and MongoDB — my first time pairing Mongoose with NextAuth. Built CRUD APIs, used the Context API to manage favorites and recipe state, and worked through a GitHub OAuth2 flow after Mongoose and NextAuth turned out not to play nicely together.",
    tech: ['Next.js', 'React.js', 'MongoDB', 'Context API'],
  },
]

function ProjectCard({ p }) {
  const tilt = useTilt(6)

  return (
    <motion.article
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
      variants={revealItem}
      className="group flex flex-col overflow-hidden rounded-md border border-border bg-bg-elevated transition-colors hover:border-accent"
    >
      <a href={p.code} target="_blank" rel="noopener" className="block aspect-video overflow-hidden border-b border-border">
        <img
          src={p.image}
          alt={`${p.name} project screenshot`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </a>

      <div className="flex flex-1 flex-col p-7" style={{ transform: 'translateZ(20px)' }}>
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-sm text-ink-faint">{p.index}</span>
          <span className="font-mono text-[0.68rem] tracking-wide text-accent">Full-Stack</span>
        </div>
        <h3 className="mb-1 text-xl font-semibold">{p.name}</h3>
        <p className="mb-4 text-sm text-ink-dim">{p.tagline}</p>
        <p className="mb-5 flex-1 text-sm text-ink-dim">{p.description}</p>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span key={t} className="rounded-sm border border-border bg-bg px-2 py-1 font-mono text-[0.7rem] text-ink-dim">
              {t}
            </span>
          ))}
        </div>

        <a href={p.code} target="_blank" rel="noopener" className="font-mono text-sm font-bold text-accent hover:underline">
          View Code →
        </a>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1180px] border-b border-border px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading
        label="03 / PROJECTS"
        title="Projects"
        subtitle="Featured development work & technical achievements"
      />

      <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.12} style={{ perspective: 1200 }}>
        {PROJECTS.map((p) => (
          <ProjectCard key={p.index} p={p} />
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-12 rounded-md border border-border bg-bg-elevated p-10 text-center">
        <p className="mb-5 text-xl font-semibold">Interested in collaborating?</p>
        <a
          href="#contact"
          className="inline-block rounded-sm bg-accent px-6 py-3 font-mono text-sm font-bold tracking-wide text-bg transition-colors hover:bg-accent-dim"
        >
          Get In Touch
        </a>
      </Reveal>
    </section>
  )
}
