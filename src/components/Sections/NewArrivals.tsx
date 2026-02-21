import { motion } from 'framer-motion'
import { useProducts } from '../../hooks/useProducts'
import { ProductCard, ProductCardPlaceholder } from '../Product/ProductCard'

const PLACEHOLDER_COUNT = 8

export const NewArrivals = () => {
  const { products, loading } = useProducts({ featured: true })

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
        <p className="font-body text-[11px] font-light tracking-[0.3em] uppercase text-text-accent mb-3">
          Just In
        </p>
        <h2 className="font-brand text-[24px] md:text-[30px] font-light text-text-primary">
          New Arrivals
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {loading
          ? Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
              <ProductCardPlaceholder key={i} />
            ))
          : products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </div>

      {!loading && products.length === 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
            <div key={i} className="group">
              <div className="aspect-[3/4] bg-surface mb-3 flex items-center justify-center">
                <span className="font-body text-[11px] text-text-accent tracking-widest uppercase">
                  Coming Soon
                </span>
              </div>
              <div className="h-3 bg-surface w-3/4 mb-2" />
              <div className="h-3 bg-surface w-1/2" />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
