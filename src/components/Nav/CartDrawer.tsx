import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import { CloseIcon, MinusIcon, PlusIcon } from './NavIcons'

interface CartDrawerProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, itemCount, subtotal, removeItem, updateQuantity } = useCart()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 right-0 h-full w-[420px] max-w-full bg-white z-[70] flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.08)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-6 border-b border-border">
              <h2 className="font-body text-[12px] font-normal tracking-[0.25em] uppercase text-text-primary">
                Bag ({itemCount})
              </h2>
              <button
                onClick={onClose}
                className="bg-transparent border-none cursor-pointer p-0 text-text-primary hover:text-text-accent transition-colors duration-200"
                aria-label="Close cart"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 px-7">
                  <p className="font-body text-[13px] font-light text-text-accent">
                    Your bag is empty
                  </p>
                  <button
                    onClick={onClose}
                    className="font-body text-[11px] font-normal tracking-[0.2em] uppercase text-text-primary border border-text-primary px-6 py-2.5 bg-transparent cursor-pointer hover:bg-text-primary hover:text-white transition-all duration-300"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex gap-4 px-7 py-6 border-b border-border/50"
                    >
                      <div className="w-20 h-[106px] bg-surface overflow-hidden shrink-0">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="font-body text-[12px] font-normal text-text-primary mb-1">
                            {item.name}
                          </p>
                          <p className="font-body text-[11px] font-light text-text-accent">
                            Rp {item.price.toLocaleString('id-ID')}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="bg-transparent border border-border w-7 h-7 flex items-center justify-center cursor-pointer text-text-primary hover:bg-surface hover:border-text-primary transition-all duration-200"
                              aria-label="Decrease quantity"
                            >
                              <MinusIcon />
                            </button>
                            <span className="font-body text-[12px] font-normal text-text-primary w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="bg-transparent border border-border w-7 h-7 flex items-center justify-center cursor-pointer text-text-primary hover:bg-surface hover:border-text-primary transition-all duration-200"
                              aria-label="Increase quantity"
                            >
                              <PlusIcon />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="font-body text-[10px] font-normal tracking-[0.1em] uppercase text-text-accent hover:text-text-primary transition-colors duration-200 bg-transparent border-none cursor-pointer underline underline-offset-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-7 py-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-body text-[11px] font-normal tracking-[0.15em] uppercase text-text-secondary">
                    Subtotal
                  </span>
                  <span className="font-body text-[15px] font-normal text-text-primary">
                    Rp {subtotal.toLocaleString('id-ID')}
                  </span>
                </div>
                <button className="w-full font-body text-[11px] font-normal tracking-[0.25em] uppercase text-white bg-text-primary py-4 border-none cursor-pointer hover:bg-bg-dark transition-colors duration-300">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
