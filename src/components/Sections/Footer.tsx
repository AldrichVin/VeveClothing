export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-text-primary text-white">
      <div
        className="py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8"
        style={{ padding: '3rem clamp(24px, 6vw, 120px)' }}
      >
        <a
          href="/"
          className="font-brand text-[20px] font-normal tracking-[0.35em] uppercase text-white no-underline"
        >
          VEVE
        </a>

        <nav className="flex items-center gap-8">
          {['Shop', 'About', 'Contact'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-body text-[11px] font-light tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors duration-300 no-underline"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>

      <div
        className="border-t border-white/10 py-6 flex items-center justify-center"
        style={{ padding: '1.5rem clamp(24px, 6vw, 120px)' }}
      >
        <p className="font-body text-[10px] font-light tracking-[0.15em] text-white/40">
          &copy; {currentYear} VEVE. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
