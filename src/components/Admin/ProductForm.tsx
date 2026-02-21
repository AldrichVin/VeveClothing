import { useState, type FormEvent } from 'react'
import { CATEGORIES, CATEGORY_LABELS } from '../../types/product'
import { uploadProductImage } from '../../hooks/useProducts'

interface ProductFormProps {
  readonly onSubmit: (product: {
    name: string
    price: number
    category: string
    description?: string
    image_url: string
    hover_image_url?: string
    is_new: boolean
    is_featured: boolean
  }) => Promise<boolean>
}

export const ProductForm = ({ onSubmit }: ProductFormProps) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [description, setDescription] = useState('')
  const [isNew, setIsNew] = useState(true)
  const [isFeatured, setIsFeatured] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [hoverImageFile, setHoverImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetForm = () => {
    setName('')
    setPrice('')
    setCategory(CATEGORIES[0])
    setDescription('')
    setIsNew(true)
    setIsFeatured(false)
    setImageFile(null)
    setHoverImageFile(null)
    setError(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!imageFile) {
      setError('Please select a product image')
      return
    }

    setLoading(true)
    setError(null)

    const imageUrl = await uploadProductImage(imageFile)
    if (!imageUrl) {
      setError('Failed to upload image')
      setLoading(false)
      return
    }

    let hoverImageUrl: string | undefined
    if (hoverImageFile) {
      const url = await uploadProductImage(hoverImageFile)
      if (url) hoverImageUrl = url
    }

    const success = await onSubmit({
      name,
      price: parseFloat(price),
      category,
      description: description || undefined,
      image_url: imageUrl,
      hover_image_url: hoverImageUrl,
      is_new: isNew,
      is_featured: isFeatured,
    })

    if (success) {
      resetForm()
    } else {
      setError('Failed to create product')
    }
    setLoading(false)
  }

  const inputClass =
    'w-full font-body text-[13px] font-light text-text-primary bg-transparent border-b border-border py-2 outline-none focus:border-text-primary transition-colors duration-300'
  const labelClass =
    'block font-body text-[11px] font-light tracking-[0.15em] uppercase text-text-secondary mb-2'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2 className="font-brand text-[20px] font-light text-text-primary mb-2">
        Add Product
      </h2>

      <div>
        <label className={labelClass}>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Price (Rp)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          step="1000"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as typeof category)}
          className={`${inputClass} cursor-pointer`}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_LABELS[cat]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <label className={labelClass}>Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          className="font-body text-[12px] font-light text-text-secondary"
        />
      </div>

      <div>
        <label className={labelClass}>Hover Image (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setHoverImageFile(e.target.files?.[0] ?? null)}
          className="font-body text-[12px] font-light text-text-secondary"
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isNew}
            onChange={(e) => setIsNew(e.target.checked)}
            className="accent-text-primary"
          />
          <span className="font-body text-[12px] font-light text-text-secondary">
            New Arrival
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="accent-text-primary"
          />
          <span className="font-body text-[12px] font-light text-text-secondary">
            Featured
          </span>
        </label>
      </div>

      {error && (
        <p className="font-body text-[11px] font-light text-red-500">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 font-body text-[11px] font-light tracking-[0.25em] uppercase text-white bg-text-primary py-3 border-none cursor-pointer hover:bg-text-primary/90 transition-colors duration-300 disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  )
}
