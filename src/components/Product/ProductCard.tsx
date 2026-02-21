import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Product } from '../../types/product'

interface ProductCardProps {
  readonly product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [hovered, setHovered] = useState(false)

  const displayImage = hovered && product.hover_image_url
    ? product.hover_image_url
    : product.image_url

  return (
    <motion.article
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-surface mb-3">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {product.is_new && (
          <span className="absolute top-3 left-3 font-body text-[10px] font-light tracking-[0.2em] uppercase text-text-primary bg-white/90 px-2.5 py-1">
            New
          </span>
        )}
      </div>
      <h3 className="font-body text-[12px] md:text-[13px] font-light tracking-[0.1em] text-text-primary mb-1">
        {product.name}
      </h3>
      <p className="font-body text-[11px] md:text-[12px] font-light text-text-secondary">
        Rp {product.price.toLocaleString('id-ID')}
      </p>
    </motion.article>
  )
}

export const ProductCardPlaceholder = () => {
  return (
    <div className="group">
      <div className="aspect-[3/4] bg-surface mb-3 animate-pulse" />
      <div className="h-3 bg-surface w-3/4 mb-2 animate-pulse" />
      <div className="h-3 bg-surface w-1/2 animate-pulse" />
    </div>
  )
}
