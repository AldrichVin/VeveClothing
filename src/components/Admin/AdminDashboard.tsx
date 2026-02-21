import { useAllProducts } from '../../hooks/useProducts'
import { ProductForm } from './ProductForm'
import { ProductTable } from './ProductTable'

interface AdminDashboardProps {
  readonly onLogout: () => void
}

export const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const { products, loading, error, createProduct, deleteProduct } = useAllProducts()

  return (
    <div className="min-h-screen bg-bg">
      {/* Admin header */}
      <header className="border-b border-border">
        <div
          className="flex items-center justify-between py-4"
          style={{ padding: '1rem clamp(24px, 4vw, 80px)' }}
        >
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="font-brand text-[20px] font-normal tracking-[0.35em] uppercase text-text-primary no-underline"
            >
              VEVE
            </a>
            <span className="font-body text-[10px] font-light tracking-[0.2em] uppercase text-text-accent border-l border-border pl-4">
              Admin
            </span>
          </div>
          <button
            onClick={onLogout}
            className="font-body text-[11px] font-light tracking-[0.15em] text-text-secondary hover:text-text-primary transition-colors duration-300 bg-transparent border-none cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Dashboard content */}
      <div
        className="py-8 md:py-12"
        style={{ padding: '2rem clamp(24px, 4vw, 80px)' }}
      >
        {error && (
          <div className="mb-6 p-4 border border-red-200 bg-red-50">
            <p className="font-body text-[12px] font-light text-red-600">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-14">
          {/* Left: Add product form */}
          <div className="border-b lg:border-b-0 lg:border-r border-border pb-8 lg:pb-0 lg:pr-14">
            <ProductForm onSubmit={createProduct} />
          </div>

          {/* Right: Product list */}
          <div>
            <h2 className="font-brand text-[20px] font-light text-text-primary mb-6">
              Products ({products.length})
            </h2>
            <ProductTable
              products={products}
              loading={loading}
              onDelete={deleteProduct}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
