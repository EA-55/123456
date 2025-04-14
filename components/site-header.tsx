"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { MobileMenu } from "./mobile-menu"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">ErsatzteilPartner24</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Startseite
            </Link>
            <Link href="/motorinstandsetzung" className="text-sm font-medium transition-colors hover:text-primary">
              Motorinstandsetzung
            </Link>
            <Link href="/software-tuning" className="text-sm font-medium transition-colors hover:text-primary">
              Software Tuning
            </Link>
            <Link href="/rueckgabe" className="text-sm font-medium transition-colors hover:text-primary">
              Rückgabe
            </Link>
            <Link href="/reklamation" className="text-sm font-medium transition-colors hover:text-primary">
              Reklamation
            </Link>
            <Link href="/b2b-registrierung" className="text-sm font-medium transition-colors hover:text-primary">
              B2B Registrierung
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
              <span className="sr-only">Menü öffnen</span>
            </button>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  )
}
