import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MobileMenu } from './MobileMenu'

const NAV_LINKS = ['Shop', 'Lookbook', 'About'] as const
const SCROLL_THRESHOLD = 50

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 h-16 md:h-20 transition-colors duration-300 ${
          scrolled
            ? 'bg-white border-b border-border'
            : 'bg-transparent border-b border-transparent'
        }`}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        aria-label="Main navigation"
      >
        <div
          className="flex items-center justify-between h-full"
          style={{ padding: '0 clamp(24px, 6vw, 120px)' }}
        >
          <a
            href="/"
            className={`font-brand text-[22px] md:text-[26px] font-normal tracking-[0.35em] uppercase no-underline transition-colors duration-300 ${
              scrolled ? 'text-text-primary' : 'text-text-primary'
            }`}
          >
            VEVE
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-12">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`group relative font-body text-[13px] font-light tracking-[0.2em] uppercase no-underline transition-colors duration-300 ${
                  scrolled
                    ? 'text-text-secondary hover:text-text-primary'
                    : 'text-text-primary/70 hover:text-text-primary'
                }`}
              >
                {link}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-text-primary transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[6px] bg-transparent border-none cursor-pointer p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span className="block w-[22px] h-px bg-text-primary transition-colors duration-300" />
            <span className="block w-[22px] h-px bg-text-primary transition-colors duration-300" />
          </button>
        </div>
      </motion.nav>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
      />
    </>
  )
}
