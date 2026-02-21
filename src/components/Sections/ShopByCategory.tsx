import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CATEGORIES, CATEGORY_LABELS } from '../../types/product'
import type { Category } from '../../types/product'

const CATEGORY_IMAGES: Record<Category, string> = {
  top: 'https://cdn.midjourney.com/3e4df5b4-7ce4-419d-b43d-c4752de8d4ec/0_3.png',
  bottom: '/images/cat-bottom.jpg',
  outerwear: '/images/cat-outerwear.jpg',
  dress: '/images/cat-dress.jpg',
}

const CATEGORY_FALLBACK_BG: Record<Category, string> = {
  top: '#e8e3de',
  bottom: '#d4cec8',
  outerwear: '#2a2a2a',
  dress: '#c4bdb5',
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
          {CATEGORIES.map((category, i) => (
            <motion.div
              key={category}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            >
              <Link
                to={`/shop/${category}`}
                className="block w-full h-full no-underline"
              >
                {/* Category image — swap with Midjourney-generated photo */}
                <img
                  src={CATEGORY_IMAGES[category]}
                  alt={CATEGORY_LABELS[category]}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                    target.parentElement!.style.backgroundColor = CATEGORY_FALLBACK_BG[category]
                  }}
                />
                {/* Fallback bg in case image hasn't loaded */}
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 -z-10"
                  style={{ backgroundColor: CATEGORY_FALLBACK_BG[category] }}
                />
                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent group-hover:from-black/60 transition-colors duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h3 className="font-body text-[11px] md:text-[12px] font-normal tracking-[0.25em] uppercase text-white">
                    {CATEGORY_LABELS[category]}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
