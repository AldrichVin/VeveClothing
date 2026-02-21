import { AnimatePresence, motion } from 'framer-motion'
import { CATEGORIES, CATEGORY_LABELS } from '../../types/product'

interface MegaMenuProps {
  readonly isOpen: boolean
  readonly onMouseEnter: () => void
  readonly onMouseLeave: () => void
}

export const MegaMenu = ({ isOpen, onMouseEnter, onMouseLeave }: MegaMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute top-full left-0 w-full bg-white border-b border-border z-50"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div
            className="grid grid-cols-[1fr_1fr] gap-12 py-10"
            style={{ padding: '2.5rem clamp(24px, 6vw, 120px)' }}
          >
            {/* Left: Category links */}
            <div className="flex flex-col gap-4">
              <p className="font-body text-[10px] font-light tracking-[0.3em] uppercase text-text-accent mb-1">
                Categories
              </p>
              <a
                href="#shop"
                className="font-body text-[13px] font-light text-text-primary hover:text-text-secondary transition-colors duration-200 no-underline"
              >
                View All
              </a>
              {CATEGORIES.map((cat) => (
                <a
                  key={cat}
                  href={`#${cat}`}
                  className="font-body text-[13px] font-light text-text-primary hover:text-text-secondary transition-colors duration-200 no-underline"
                >
                  {CATEGORY_LABELS[cat]}
                </a>
              ))}
            </div>

            {/* Right: Featured collections */}
            <div className="grid grid-cols-2 gap-6">
              <a href="#new-arrivals" className="group block no-underline">
                <div className="aspect-[4/5] bg-surface overflow-hidden mb-3">
                  <div className="w-full h-full bg-surface flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <span className="font-body text-[10px] text-text-accent tracking-widest uppercase">
                      New In
                    </span>
                  </div>
                </div>
                <p className="font-body text-[11px] font-light tracking-[0.15em] uppercase text-text-primary">
                  New Arrivals
                </p>
              </a>
              <a href="#shop" className="group block no-underline">
                <div className="aspect-[4/5] bg-surface overflow-hidden mb-3">
                  <div className="w-full h-full bg-surface flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <span className="font-body text-[10px] text-text-accent tracking-widest uppercase">
                      Most Wanted
                    </span>
                  </div>
                </div>
                <p className="font-body text-[11px] font-light tracking-[0.15em] uppercase text-text-primary">
                  Best Sellers
                </p>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
