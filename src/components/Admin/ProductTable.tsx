import { useState } from 'react'
import type { Product } from '../../types/product'
import { CATEGORY_LABELS } from '../../types/product'
import type { Category } from '../../types/product'

interface ProductTableProps {
  readonly products: Product[]
  readonly loading: boolean
  readonly onDelete: (id: string) => Promise<boolean>
}

export const ProductTable = ({ products, loading, onDelete }: ProductTableProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return
    setDeletingId(id)
    await onDelete(id)
    setDeletingId(null)
  }

  if (loading) {
    return (
      <div className="py-8 text-center">
        <p className="font-body text-[12px] font-light text-text-accent tracking-widest uppercase">
          Loading products...
        </p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="font-body text-[12px] font-light text-text-accent">
          No products yet. Add your first product above.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            {['Image', 'Name', 'Category', 'Price', 'Status', ''].map((header) => (
              <th
                key={header}
                className="font-body text-[10px] font-light tracking-[0.2em] uppercase text-text-accent text-left py-3 px-2"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-border/50 hover:bg-surface/50 transition-colors">
              <td className="py-3 px-2">
                <div className="w-12 h-16 bg-surface overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td className="py-3 px-2">
                <p className="font-body text-[12px] font-light text-text-primary">
                  {product.name}
                </p>
              </td>
              <td className="py-3 px-2">
                <p className="font-body text-[11px] font-light text-text-secondary">
                  {CATEGORY_LABELS[product.category as Category]}
                </p>
              </td>
              <td className="py-3 px-2">
                <p className="font-body text-[12px] font-light text-text-primary">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
              </td>
              <td className="py-3 px-2">
                <div className="flex gap-2">
                  {product.is_new && (
                    <span className="font-body text-[9px] tracking-widest uppercase text-text-accent border border-border px-2 py-0.5">
                      New
                    </span>
                  )}
                  {product.is_featured && (
                    <span className="font-body text-[9px] tracking-widest uppercase text-text-accent border border-border px-2 py-0.5">
                      Featured
                    </span>
                  )}
                </div>
              </td>
              <td className="py-3 px-2 text-right">
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  className="font-body text-[11px] font-light text-red-400 hover:text-red-600 transition-colors duration-200 bg-transparent border-none cursor-pointer disabled:opacity-50"
                >
                  {deletingId === product.id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
