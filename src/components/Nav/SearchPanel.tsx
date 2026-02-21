import { useRef, useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import type { Product } from '../../types/product'
import { CloseIcon, SearchIcon } from './NavIcons'

interface SearchPanelProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

export const SearchPanel = ({ isOpen, onClose }: SearchPanelProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const searchProducts = useCallback(async (searchQuery: string) => {
    if (!isSupabaseConfigured || searchQuery.length < 2) {
      setResults([])
      return
    }

    setSearching(true)
    const { data } = await supabase
      .from('products')
      .select('*')
      .ilike('name', `%${searchQuery}%`)
      .limit(6)

    setResults((data as Product[]) ?? [])
    setSearching(false)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      searchProducts(query)
    }, 300)
    return () => clearTimeout(timer)
  }, [query, searchProducts])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="w-full bg-white border-b border-border overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div
            className="py-5"
            style={{ padding: '1.25rem clamp(24px, 6vw, 120px)' }}
          >
            <div className="relative flex items-center">
              <SearchIcon className="absolute left-0 text-text-accent" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full font-body text-[14px] font-light text-text-primary bg-transparent border-none outline-none pl-8 pr-8 placeholder:text-text-accent"
              />
              <button
                onClick={onClose}
                className="absolute right-0 bg-transparent border-none cursor-pointer p-0 text-text-accent hover:text-text-primary transition-colors duration-200"
                aria-label="Close search"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Results */}
            {query.length >= 2 && (
              <div className="mt-4 border-t border-border pt-4">
                {searching ? (
                  <p className="font-body text-[12px] font-light text-text-accent">
                    Searching...
                  </p>
                ) : results.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {results.map((product) => (
                      <a
                        key={product.id}
                        href={`#product-${product.id}`}
                        className="flex items-center gap-4 no-underline group"
                        onClick={onClose}
                      >
                        <div className="w-12 h-16 bg-surface overflow-hidden shrink-0">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-body text-[12px] font-light text-text-primary group-hover:text-text-secondary transition-colors">
                            {product.name}
                          </p>
                          <p className="font-body text-[11px] font-light text-text-accent">
                            Rp {product.price.toLocaleString('id-ID')}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="font-body text-[12px] font-light text-text-accent">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
