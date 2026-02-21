import { motion } from 'framer-motion'
import { HeroVideo } from './HeroVideo'

export const Hero = () => {
  return (
    <section className="relative w-screen h-screen overflow-hidden">
      <HeroVideo />

      {/* Scroll indicator — right-aligned editorial style */}
      <motion.div
        className="absolute right-8 bottom-10 flex flex-col items-center gap-2"
        style={{ zIndex: 99999 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="font-body text-[10px] font-normal tracking-[0.3em] uppercase text-text-primary/60">
          Scroll
        </span>
        <div className="flex flex-col items-center gap-[2px]">
          {[0, 1, 2].map((i) => (
            <motion.svg
              key={i}
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              className="text-text-primary"
              animate={{ opacity: [0.15, 0.7, 0.15] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            >
              <path d="M1 1l6 5.5L13 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
