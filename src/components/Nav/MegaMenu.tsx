import { Link } from 'react-router-dom'
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
          className="absolute top-full left-0 w-full bg-white border-b border-border z-50 shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
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
              <p className="font-body text-[10px] font-normal tracking-[0.3em] uppercase text-text-accent mb-1">
                Categories
              </p>
              <Link
                to="/"
                className="font-body text-[13px] font-normal text-text-primary hover:text-text-accent transition-colors duration-200 no-underline"
              >
                View All
              </Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  to={`/shop/${cat}`}
                  className="font-body text-[13px] font-normal text-text-secondary hover:text-text-primary transition-colors duration-200 no-underline"
                >
                  {CATEGORY_LABELS[cat]}
                </Link>
              ))}
            </div>

            {/* Right: Featured collections */}
            <div className="grid grid-cols-2 gap-5">
              <Link to="/#new-arrivals" className="group block no-underline">
                <div className="aspect-[4/5] overflow-hidden mb-3 bg-surface">
                  {/* Swap with Midjourney-generated "New Arrivals" photo */}
                  <img
                    src="/images/mega-new.jpg"
                    alt="New Arrivals"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
                <p className="font-body text-[11px] font-normal tracking-[0.15em] uppercase text-text-primary group-hover:text-text-secondary transition-colors duration-200">
                  New Arrivals
                </p>
              </Link>
              <Link to="/" className="group block no-underline">
                <div className="aspect-[4/5] overflow-hidden mb-3 bg-bg-dark">
                  {/* Swap with Midjourney-generated "Best Sellers" photo */}
                  <img
                    src="/images/mega-best.jpg"
                    alt="Best Sellers"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
                <p className="font-body text-[11px] font-normal tracking-[0.15em] uppercase text-text-primary group-hover:text-text-secondary transition-colors duration-200">
                  Best Sellers
                </p>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
