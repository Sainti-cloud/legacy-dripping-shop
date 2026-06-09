import React, { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])

  const addToCart = (product, qty = 1) => {
    setItems(prev => {
      const found = prev.find(i => i.id === product.id)
      if (found) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { ...product, qty }]
    })
  }

  const updateQty = (id, qty) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
  }

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const clearCart = () => setItems([])

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  const value = useMemo(() => ({
    items, addToCart, updateQty, removeItem, clearCart, total
  }), [items])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }
  return context
}
