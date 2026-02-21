import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CATEGORIES, CATEGORY_LABELS } from '../../types/product'
import { CloseIcon, ChevronDownIcon } from './NavIcons'

interface MobileMenuProps {
  readonly isOpen: boolean
  readonly onClose: () => void
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

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [shopExpanded, setShopExpanded] = useState(false)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center"
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
            <CloseIcon className="text-text-primary" />
          </button>

          {/* Links */}
          <nav className="flex flex-col items-center gap-8">
            {/* Shop with accordion */}
            <motion.div
              className="flex flex-col items-center"
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={0}
            >
              <button
                onClick={() => setShopExpanded((prev) => !prev)}
                className="flex items-center gap-2 font-brand text-text-primary text-2xl font-light tracking-[0.2em] uppercase bg-transparent border-none cursor-pointer"
              >
                Shop
                <ChevronDownIcon
                  className={`transition-transform duration-300 ${shopExpanded ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {shopExpanded && (
                  <motion.div
                    className="flex flex-col items-center gap-4 mt-4"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    {CATEGORIES.map((cat) => (
                      <a
                        key={cat}
                        href={`#${cat}`}
                        className="font-body text-text-secondary text-sm font-light tracking-[0.15em] uppercase no-underline"
                        onClick={onClose}
                      >
                        {CATEGORY_LABELS[cat]}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* New Arrivals */}
            <motion.a
              href="#new-arrivals"
              className="font-brand text-text-primary text-2xl font-light tracking-[0.2em] uppercase no-underline"
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={1}
              onClick={onClose}
            >
              New Arrivals
            </motion.a>

            {/* About */}
            <motion.a
              href="#about"
              className="font-brand text-text-primary text-2xl font-light tracking-[0.2em] uppercase no-underline"
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={2}
              onClick={onClose}
            >
              About
            </motion.a>

            {/* Account */}
            <motion.a
              href="/admin"
              className="font-brand text-text-primary text-2xl font-light tracking-[0.2em] uppercase no-underline"
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={3}
              onClick={onClose}
            >
              Account
            </motion.a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
