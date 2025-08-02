'use client'

import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">UberClone</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="hover:text-gray-300">Ride</a>
          <a href="#" className="hover:text-gray-300">Drive</a>
          <a href="#" className="hover:text-gray-300">Business</a>
          <a href="#" className="hover:text-gray-300">About</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100">
            Sign up
          </button>
          <button className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black">
            Log in
          </button>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4">
          <nav className="flex flex-col space-y-2">
            <a href="#" className="hover:text-gray-300">Ride</a>
            <a href="#" className="hover:text-gray-300">Drive</a>
            <a href="#" className="hover:text-gray-300">Business</a>
            <a href="#" className="hover:text-gray-300">About</a>
          </nav>
        </div>
      )}
    </header>
  )
}