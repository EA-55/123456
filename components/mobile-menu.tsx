"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronRight } from "lucide-react"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closeMenu}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed right-0 top-0 h-full w-3/4 max-w-xs bg-background p-4 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-6">
                <Button variant="ghost" size="icon" onClick={closeMenu} aria-label="Menü schließen">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <nav className="space-y-4">
                <Link
                  href="/"
                  className="flex items-center justify-between py-2 border-b text-foreground hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  <span>Startseite</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/motorinstandsetzung"
                  className="flex items-center justify-between py-2 border-b text-foreground hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  <span>Motorinstandsetzung</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/software-tuning"
                  className="flex items-center justify-between py-2 border-b text-foreground hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  <span>Software & Tuning</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/arbeitszeiten-und-lieferung"
                  className="flex items-center justify-between py-2 border-b text-foreground hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  <span>Arbeitszeiten & Lieferung</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/rueckgabe"
                  className="flex items-center justify-between py-2 border-b text-foreground hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  <span>Rückgabe</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/reklamation"
                  className="flex items-center justify-between py-2 border-b text-foreground hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  <span>Reklamation</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/b2b-registrierung"
                  className="flex items-center justify-between py-2 border-b text-foreground hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  <span>B2B Registrierung</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </nav>

              <div className="mt-8">
                <Button asChild className="w-full" onClick={closeMenu}>
                  <a href="https://tm1.carparts-cat.com/login/atevis" target="_blank" rel="noopener noreferrer">
                    Zum Shop
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
