export const CATEGORIES = ['top', 'bottom', 'outerwear', 'dress'] as const
export type Category = typeof CATEGORIES[number]

export const CATEGORY_LABELS: Record<Category, string> = {
  top: 'Top',
  bottom: 'Bottom',
  outerwear: 'Outerwear',
  dress: 'Dress',
}

export interface Product {
  readonly id: string
  readonly name: string
  readonly price: number
  readonly category: Category
  readonly description: string | null
  readonly image_url: string
  readonly hover_image_url: string | null
  readonly is_new: boolean
  readonly is_featured: boolean
  readonly created_at: string
}
