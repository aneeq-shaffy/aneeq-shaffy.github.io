import { motion } from 'motion/react'

export default function Reveal({ children, delay = 0, y = 28, className = '', as = 'div', ...rest }) {
  const Tag = typeof as === 'string' ? motion[as] : as
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0, 0, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function RevealGroup({ children, className = '', stagger = 0.08, as = 'div', ...rest }) {
  const Tag = typeof as === 'string' ? motion[as] : as
  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export const revealItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0, 0, 1] } },
}
