import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const CampaignBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section
      ref={containerRef}
      className="relative h-[70vh] overflow-hidden"
    >
      {/* Placeholder — replace with campaign image */}
      <motion.div
        className="absolute inset-0 bg-surface flex items-center justify-center"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-text-primary/5" />
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="font-body text-[11px] font-light tracking-[0.3em] uppercase text-text-accent mb-4">
              Summer 2025
            </p>
            <h2 className="font-brand text-[32px] md:text-[44px] font-light italic text-text-primary mb-8">
              The Linen Collection
            </h2>
            <a
              href="#shop"
              className="inline-block font-body text-[11px] font-light tracking-[0.25em] uppercase text-text-primary border-b border-text-primary pb-1 hover:text-text-secondary hover:border-text-secondary transition-colors duration-300"
            >
              Discover
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
