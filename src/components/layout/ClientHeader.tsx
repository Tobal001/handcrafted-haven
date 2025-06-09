

// src/components/layout/ClientHeader.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Header from './header';

export default function ClientHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-serif font-bold">H-H</h1>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <nav className="space-x-4 text-sm font-medium mr-6">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/products" className="hover:underline">Shop</Link>
            <Link href="/meet-artisans" className="hover:underline">Artisans</Link>
            <Link href="/about" className="hover:underline">About</Link>
          </nav>
          <div className="ml-6">
            <Header />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          type="button" 
          className="md:hidden p-2 rounded-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6">
          <nav className="flex flex-col space-y-4 text-sm font-medium">
            <Link href="/" className="hover:underline py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/products" className="hover:underline py-2" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
            <Link href="/artisans" className="hover:underline py-2" onClick={() => setMobileMenuOpen(false)}>Artisans</Link>
            <Link href="/about" className="hover:underline py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
          </nav>
          <div className="mt-4">
            <Header />
          </div>
        </div>
      )}
    </header>
  );
}
