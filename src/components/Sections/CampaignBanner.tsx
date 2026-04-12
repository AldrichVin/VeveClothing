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
      className="relative h-[70vh] overflow-hidden bg-bg-dark"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ y }}
      >
        <img
          src="https://cdn.midjourney.com/20cfb63f-3dca-4d94-a4f3-8a26981ed1bd/0_2.png"
          alt="The Linen Collection campaign"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="font-body text-[10px] md:text-[11px] font-normal tracking-[0.35em] uppercase text-white/50 mb-5">
              Summer 2025
            </p>
            <h2 className="font-brand text-[36px] md:text-[52px] font-light italic text-white mb-10 leading-tight">
              The Linen Collection
            </h2>
            <a
              href="#shop"
              className="inline-block font-body text-[11px] font-normal tracking-[0.25em] uppercase text-white border border-white/30 px-8 py-3 hover:bg-white hover:text-bg-dark transition-all duration-400 no-underline"
            >
              Discover
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
