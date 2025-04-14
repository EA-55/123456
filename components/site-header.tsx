"use client"

import Link from "next/link"
import { useState } from "react"
// Neuer Import mit neuem Namen
import { NavigationMenu } from "./navigation-menu"

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold">ErsatzteilPartner24</span>
          </Link>
          <nav className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
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
        </div>
        <div className="flex flex-1 items-center justify-end">
          <button className="md:hidden" onClick={() => setMenuOpen(true)} aria-label="Menü öffnen">
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
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
      {/* Verwendung der neuen Komponente */}
      {menuOpen && <NavigationMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />}
    </header>
  )
}
