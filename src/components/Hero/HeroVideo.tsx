import { useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const VIDEO_SRC = 'https://cdn.midjourney.com/video/512b9f1b-00c0-4505-95c9-e880c8def602/2.mp4'
const WATCHDOG_INTERVAL_MS = 1000

export const HeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const ensurePlaying = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused || video.ended) {
      video.play().catch(() => {})
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.play().catch(() => {})

    // Watchdog: if video stops for any reason, restart it
    const watchdog = setInterval(ensurePlaying, WATCHDOG_INTERVAL_MS)

    // Resume when tab becomes visible again
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        ensurePlaying()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      clearInterval(watchdog)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [ensurePlaying])

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover object-top"
        muted
        playsInline
        loop
        preload="auto"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
    </motion.div>
  )
}
