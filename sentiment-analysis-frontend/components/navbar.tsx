"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, BarChart2 } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
                <BarChart2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white">SentiMeter</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/analyze"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
            >
              Analyze
            </Link>
            <Link
              href="/documentation"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="/pricing"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Get Started
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block py-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/analyze"
              className="block py-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Analyze
            </Link>
            <Link
              href="#"
              className="block py-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Documentation
            </Link>
            <Link
              href="#"
              className="block py-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

