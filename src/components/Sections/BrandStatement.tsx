import { motion } from 'framer-motion'

export const BrandStatement = () => {
  return (
    <section className="py-24 md:py-32" style={{ padding: '6rem clamp(24px, 6vw, 120px)' }}>
      <motion.div
        className="flex flex-col items-center text-center gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p className="font-body text-[11px] md:text-[12px] font-light tracking-[0.3em] uppercase text-text-accent">
          Crafted for the modern woman
        </p>
        <h2 className="font-brand text-[28px] md:text-[36px] font-light italic text-text-primary leading-snug max-w-2xl">
          Where tradition meets tomorrow
        </h2>
        <div className="w-12 h-px bg-border mt-2" />
      </motion.div>
    </section>
  )
}
