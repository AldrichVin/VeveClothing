import { AnimatePresence, motion } from 'framer-motion'

interface MobileMenuProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly links: readonly string[]
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.06, duration: 0.4, ease: 'easeOut' },
  }),
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

export const MobileMenu = ({ isOpen, onClose, links }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-100 bg-bg flex flex-col items-center justify-center"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-6 bg-transparent border-none cursor-pointer p-2"
            onClick={onClose}
            aria-label="Close menu"
          >
            <div className="relative w-5 h-5">
              <span className="absolute top-1/2 left-0 w-full h-px bg-text-primary rotate-45" />
              <span className="absolute top-1/2 left-0 w-full h-px bg-text-primary -rotate-45" />
            </div>
          </button>

          {/* Links */}
          <nav className="flex flex-col items-center gap-8">
            {links.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-brand text-text-primary text-2xl font-light tracking-[0.2em] uppercase no-underline"
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={i}
                onClick={onClose}
              >
                {link}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
