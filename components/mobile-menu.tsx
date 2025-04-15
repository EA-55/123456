"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menü öffnen">
        <Menu className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <div className="container flex h-16 items-center justify-between">
              <Link href="/" onClick={closeMenu}>
                <span className="font-bold">ErsatzteilPartner24</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={closeMenu} aria-label="Menü schließen">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="container grid gap-6 py-6">
              {[
                { href: "#about", label: "Über uns" },
                { href: "/motorinstandsetzung", label: "Motorinstandsetzung" },
                { href: "#brands", label: "Marken" },
                { href: "/arbeitszeiten-und-lieferung", label: "Arbeitszeiten & Lieferung" },
                { href: "/rueckgabe", label: "Rückgabe" },
                { href: "#contact", label: "Kontakt" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="grid gap-4 mt-4">
                <Button asChild className="w-full">
                  <a href="https://tm1.carparts-cat.com/login/atevis" target="_blank" rel="noopener noreferrer">
                    Zum Shop
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/b2b-registrierung">B2B Registrierung</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
