"use client"
import ShopCard from '@/components/shop/ShopCard'
import SearchBar from '@/components/lib/ui/SearchBar'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { fetchProducts, type Product } from '@/api/products'

const ShopPage = () => {
  const [data, setData] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts()
        setData(products)
      } catch (err) {
        console.log(err)
      }
    }
    loadProducts()
  }, [])

  // useCallback: Memoize search handler to prevent recreation on every render
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  // useMemo: Filter products only when data or searchQuery changes
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return data

    return data.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [data, searchQuery])

  return (
    <div>
      <div className='flex justify-center mt-6 mb-8'>
        <SearchBar
          placeholder="Search products"
          onSearch={handleSearch}
        />
      </div>
      <div className='grid grid-cols-3 gap-2 ml-30 mt-10'>
        {filteredProducts.map((d) => {
          return (<ShopCard key={d.id} id={d.id} image={d.image} title={d.title} desc={d.description} price={d.price} />)
        })}
      </div>
    </div>
  )
}

export default ShopPage