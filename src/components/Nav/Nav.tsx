import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { MobileMenu } from './MobileMenu'
import { MegaMenu } from './MegaMenu'
import { SearchPanel } from './SearchPanel'
import { CartDrawer } from './CartDrawer'
import { UserIcon, SearchIcon, BagIcon } from './NavIcons'
import { useCart } from '../../context/CartContext'

const SCROLL_THRESHOLD = 50

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [shopHovered, setShopHovered] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { itemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openShop = useCallback(() => setShopHovered(true), [])
  const closeShop = useCallback(() => setShopHovered(false), [])

  const isElevated = scrolled || searchOpen

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isElevated
            ? 'bg-white/95 backdrop-blur-sm border-b border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
            : 'bg-transparent border-b border-transparent'
        }`}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        aria-label="Main navigation"
      >
        <div
          className="flex items-center justify-between h-16 md:h-20"
          style={{ padding: '0 clamp(24px, 6vw, 120px)' }}
        >
          {/* Left: Logo */}
          <a
            href="/"
            className="font-brand text-[22px] md:text-[26px] font-normal tracking-[0.35em] uppercase no-underline transition-colors duration-300 text-text-primary"
          >
            VEVE
          </a>

          {/* Center: Desktop nav links */}
          <div className="hidden md:flex items-center gap-10">
            <div
              className="relative"
              onMouseEnter={openShop}
              onMouseLeave={closeShop}
            >
              <button
                className="group relative font-body text-[12px] font-normal tracking-[0.2em] uppercase bg-transparent border-none cursor-pointer transition-colors duration-300 text-text-secondary hover:text-text-primary"
              >
                Shop
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-text-primary transition-all duration-300 ease-out group-hover:w-full" />
              </button>
            </div>
            <a
              href="#new-arrivals"
              className="group relative font-body text-[12px] font-normal tracking-[0.2em] uppercase no-underline transition-colors duration-300 text-text-secondary hover:text-text-primary"
            >
              New Arrivals
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-text-primary transition-all duration-300 ease-out group-hover:w-full" />
            </a>
            <a
              href="#about"
              className="group relative font-body text-[12px] font-normal tracking-[0.2em] uppercase no-underline transition-colors duration-300 text-text-secondary hover:text-text-primary"
            >
              About
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-text-primary transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          </div>

          {/* Right: Utility icons */}
          <div className="flex items-center gap-5">
            <a
              href="/admin"
              className="hidden md:block transition-colors duration-300 text-text-primary hover:text-text-secondary"
              aria-label="Account"
            >
              <UserIcon />
            </a>
            <button
              onClick={() => setSearchOpen((prev) => !prev)}
              className="bg-transparent border-none cursor-pointer p-0 transition-colors duration-300 text-text-primary hover:text-text-secondary"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative bg-transparent border-none cursor-pointer p-0 transition-colors duration-300 text-text-primary hover:text-text-secondary"
              aria-label="Shopping bag"
            >
              <BagIcon />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-text-primary text-white text-[9px] flex items-center justify-center font-body">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden flex flex-col gap-[6px] bg-transparent border-none cursor-pointer p-2"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <span className="block w-[22px] h-px bg-text-primary" />
              <span className="block w-[22px] h-px bg-text-primary" />
            </button>
          </div>
        </div>

        <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

        <MegaMenu
          isOpen={shopHovered}
          onMouseEnter={openShop}
          onMouseLeave={closeShop}
        />
      </motion.nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
