import { motion } from 'framer-motion'
import { CATEGORIES, CATEGORY_LABELS } from '../../types/product'
import type { Category } from '../../types/product'

const CATEGORY_STYLES: Record<Category, { bg: string; text: string }> = {
  top: { bg: '#e8e3de', text: '#2a2a2a' },
  bottom: { bg: '#d4cec8', text: '#1a1a1a' },
  outerwear: { bg: '#2a2a2a', text: '#f0ece8' },
  dress: { bg: '#c4bdb5', text: '#1a1a1a' },
}

export const ShopByCategory = () => {
  return (
    <section className="bg-bg-warm">
      <div
        className="py-16 md:py-24"
        style={{ padding: '4rem clamp(24px, 6vw, 120px)' }}
      >
        <motion.div
          className="flex flex-col items-center text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-body text-[10px] font-normal tracking-[0.35em] uppercase text-text-accent mb-3">
            Browse
          </p>
          <h2 className="font-brand text-[26px] md:text-[32px] font-light text-text-primary">
            Collections
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {CATEGORIES.map((category, i) => {
            const style = CATEGORY_STYLES[category]
            return (
              <motion.a
                key={category}
                href={`#${category}`}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer block no-underline"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundColor: style.bg }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h3
                    className="font-body text-[11px] md:text-[12px] font-normal tracking-[0.25em] uppercase"
                    style={{ color: style.text }}
                  >
                    {CATEGORY_LABELS[category]}
                  </h3>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
