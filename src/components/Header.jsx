import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi'

export default function Header() {
  const { items } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const count = items.reduce((n, i) => n + i.qty, 0)

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-wider text-gold" aria-label="LEGACY DRIPPING">
          LEGACY DRIPPING
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm opacity-80 hover:opacity-100 hover:text-gold transition">Inicio</Link>
          <Link to="/catalog" className="text-sm opacity-80 hover:opacity-100 hover:text-gold transition">Catálogo</Link>
          <Link to="/about" className="text-sm opacity-80 hover:opacity-100 hover:text-gold transition">Sobre Nosotros</Link>
          <Link to="/contact" className="text-sm opacity-80 hover:opacity-100 hover:text-gold transition">Contacto</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/catalog" className="bg-brandRed hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-lg transition">
            Ver catálogo
          </Link>
          <Link to="/checkout" className="relative">
            <FiShoppingCart className="text-2xl hover:text-gold transition" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-black rounded-full w-5 h-5 text-center text-xs font-bold leading-5">
                {count}
              </span>
            )}
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <Link to="/checkout" className="relative">
            <FiShoppingCart className="text-2xl" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-black rounded-full w-5 h-5 text-center text-xs font-bold leading-5">
                {count}
              </span>
            )}
          </Link>
          <button onClick={toggleMenu} className="text-2xl">
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-gray-800 p-4">
          <nav className="flex flex-col gap-4">
            <Link to="/" className="text-sm opacity-80 hover:opacity-100" onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
            <Link to="/catalog" className="text-sm opacity-80 hover:opacity-100" onClick={() => setMobileMenuOpen(false)}>Catálogo</Link>
            <Link to="/about" className="text-sm opacity-80 hover:opacity-100" onClick={() => setMobileMenuOpen(false)}>Sobre Nosotros</Link>
            <Link to="/contact" className="text-sm opacity-80 hover:opacity-100" onClick={() => setMobileMenuOpen(false)}>Contacto</Link>
            <Link to="/catalog" className="bg-brandRed hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm text-center" onClick={() => setMobileMenuOpen(false)}>
              Ver catálogo
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
