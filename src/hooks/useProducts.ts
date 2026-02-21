import { useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { Product, Category } from '../types/product'

export const useProducts = (options?: {
  readonly featured?: boolean
  readonly category?: Category
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    let query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (options?.featured) {
      query = query.or('is_new.eq.true,is_featured.eq.true')
    }
    if (options?.category) {
      query = query.eq('category', options.category)
    }

    const { data, error: fetchError } = await query

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setProducts(data as Product[])
    }
    setLoading(false)
  }, [options?.featured, options?.category])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, loading, error, refetch: fetchProducts }
}

export const useAllProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setProducts(data as Product[])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const deleteProduct = async (id: string) => {
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (deleteError) {
      setError(deleteError.message)
      return false
    }
    await fetchProducts()
    return true
  }

  const createProduct = async (product: {
    name: string
    price: number
    category: string
    description?: string
    image_url: string
    hover_image_url?: string
    is_new: boolean
    is_featured: boolean
  }) => {
    const { error: insertError } = await supabase
      .from('products')
      .insert(product)

    if (insertError) {
      setError(insertError.message)
      return false
    }
    await fetchProducts()
    return true
  }

  return { products, loading, error, deleteProduct, createProduct, refetch: fetchProducts }
}

export const uploadProductImage = async (file: File): Promise<string | null> => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${crypto.randomUUID()}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(fileName, file)

  if (uploadError) {
    console.error('Upload error:', uploadError.message)
    return null
  }

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName)

  return data.publicUrl
}
