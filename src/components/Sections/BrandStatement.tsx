import { motion } from 'framer-motion'

export const BrandStatement = () => {
  return (
    <section className="bg-bg-warm">
      <div
        className="py-24 md:py-32 flex flex-col items-center text-center"
        style={{ padding: '6rem clamp(24px, 6vw, 120px)' }}
      >
        <motion.div
          className="flex flex-col items-center gap-6 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="font-body text-[10px] md:text-[11px] font-normal tracking-[0.35em] uppercase text-text-accent">
            Crafted for the modern woman
          </p>
          <h2 className="font-brand text-[30px] md:text-[40px] font-light italic text-text-primary leading-snug">
            Where tradition meets tomorrow
          </h2>
          <div className="w-16 h-px bg-text-primary/20 mt-2" />
        </motion.div>
      </div>
    </section>
  )
}
