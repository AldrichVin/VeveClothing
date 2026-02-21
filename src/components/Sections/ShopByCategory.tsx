import { motion } from 'framer-motion'
import { CATEGORIES, CATEGORY_LABELS } from '../../types/product'
import type { Category } from '../../types/product'

const CATEGORY_COLORS: Record<Category, string> = {
  top: '#f5f0eb',
  bottom: '#ebe8e5',
  outerwear: '#e5e0db',
  dress: '#f0ebe5',
}

export const ShopByCategory = () => {
  return (
    <section
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
        <h2 className="font-brand text-[24px] md:text-[30px] font-light text-text-primary">
          Collections
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {CATEGORIES.map((category, i) => (
          <motion.a
            key={category}
            href={`#${category}`}
            className="group relative aspect-[3/4] overflow-hidden cursor-pointer block no-underline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
          >
            {/* Placeholder bg — replace with category images */}
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundColor: CATEGORY_COLORS[category] }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
              <h3 className="font-body text-[12px] md:text-[13px] font-light tracking-[0.2em] uppercase text-text-primary">
                {CATEGORY_LABELS[category]}
              </h3>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
