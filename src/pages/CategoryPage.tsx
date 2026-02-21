import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProducts } from '../hooks/useProducts'
import { ProductCard, ProductCardPlaceholder } from '../components/Product/ProductCard'
import { Nav } from '../components/Nav/Nav'
import { Footer } from '../components/Sections/Footer'
import { CATEGORIES, CATEGORY_LABELS } from '../types/product'
import type { Category } from '../types/product'

const PLACEHOLDER_COUNT = 8

const CATEGORY_SUBTITLES: Record<Category, string> = {
  top: 'Effortless silhouettes for every occasion',
  bottom: 'Tailored lines, modern proportions',
  outerwear: 'Refined layers for the season',
  dress: 'Statement pieces, timeless elegance',
}

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>()

  const isValidCategory = CATEGORIES.includes(category as Category)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [category])

  if (!isValidCategory) {
    return <Navigate to="/" replace />
  }

  const validCategory = category as Category

  return <CategoryContent category={validCategory} />
}

interface CategoryContentProps {
  readonly category: Category
}

const CategoryContent = ({ category }: CategoryContentProps) => {
  const { products, loading } = useProducts({ category })

  return (
    <>
      <Nav />

      {/* Spacer for fixed nav */}
      <div className="h-16 md:h-20" />

      {/* Category Header */}
      <section className="bg-bg-warm">
        <div
          className="py-16 md:py-24 flex flex-col items-center text-center"
          style={{ padding: '4rem clamp(24px, 6vw, 120px)' }}
        >
          <motion.p
            className="font-body text-[10px] font-normal tracking-[0.35em] uppercase text-text-accent mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Collection
          </motion.p>
          <motion.h1
            className="font-brand text-[36px] md:text-[48px] font-light text-text-primary mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            {CATEGORY_LABELS[category]}
          </motion.h1>
          <motion.p
            className="font-body text-[12px] md:text-[13px] font-light text-text-secondary tracking-[0.05em] max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            {CATEGORY_SUBTITLES[category]}
          </motion.p>
        </div>
      </section>

      {/* Product Grid */}
      <section>
        <div
          className="py-12 md:py-20"
          style={{ padding: '3rem clamp(24px, 6vw, 120px)' }}
        >
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
                <ProductCardPlaceholder key={i} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center text-center py-16">
              <p className="font-body text-[10px] font-normal tracking-[0.35em] uppercase text-text-accent mb-3">
                No products yet
              </p>
              <p className="font-body text-[13px] font-light text-text-secondary">
                New pieces are coming soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
