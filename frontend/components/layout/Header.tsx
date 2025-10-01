'use client'

import Link from 'next/link'
import { FiCompass } from 'react-icons/fi'

/**
 * Header component with navigation
 */
export default function Header() {
  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-primary-100">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-primary-500 to-secondary-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <FiCompass className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-bold text-gradient">
              WanderGuide AI
            </span>
          </Link>
        </div>
      </nav>
    </header>
  )
}

