'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="font-bold text-xl hidden sm:inline">AutoLifeGh</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/vehicles" className="text-gray-600 hover:text-blue-600">
            Browse Cars
          </Link>
          <Link href="/sell" className="text-gray-600 hover:text-blue-600">
            Sell Your Car
          </Link>
          <Link href="/#financing" className="text-gray-600 hover:text-blue-600">
            Financing
          </Link>
          <a href="#contact" className="text-gray-600 hover:text-blue-600">
            Contact
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/vehicles" className="btn-outline">
            View Cars
          </Link>
          <Link href="/sell" className="btn-primary">
            Sell Your Car
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          <div className="container-custom py-4 space-y-4">
            <Link href="/vehicles" className="block text-gray-600 hover:text-blue-600 font-medium">
              Browse Cars
            </Link>
            <Link href="/sell" className="block text-gray-600 hover:text-blue-600 font-medium">
              Sell Your Car
            </Link>
            <Link href="/#financing" className="block text-gray-600 hover:text-blue-600 font-medium">
              Financing
            </Link>
            <a href="#contact" className="block text-gray-600 hover:text-blue-600 font-medium">
              Contact
            </a>
            <div className="pt-4 space-y-2">
              <Link href="/vehicles" className="block btn-outline text-center">
                View Cars
              </Link>
              <Link href="/sell" className="block btn-primary text-center">
                Sell Your Car
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
