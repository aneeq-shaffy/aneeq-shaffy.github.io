// Orange Field social icon tile (C): a paper square with a hard shadow that
// flips orange and tilts on hover, and slams flat on press.
export default function IconButton({ href, label, path, target, rel }) {
  const isExternal = target === '_blank'
  return (
    <a
      href={href}
      target={target}
      rel={isExternal ? rel || 'noopener' : rel}
      aria-label={label}
      className="grid h-[52px] w-[52px] place-items-center border-[3px] border-ink bg-bg-elevated text-ink shadow-[4px_4px_0_var(--color-ink)] transition-[transform,box-shadow,background-color] duration-150 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:-rotate-[4deg] hover:bg-accent hover:shadow-[6px_6px_0_var(--color-ink)] active:translate-x-1 active:translate-y-1 active:rotate-0 active:shadow-none"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" style={{ stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'square' }}>
        <path d={path} />
      </svg>
    </a>
  )
}
