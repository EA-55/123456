"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4 mt-4">
          <Link href="#about" className="text-lg font-medium" onClick={toggleMenu}>
            Über uns
          </Link>
          <Link href="/motorinstandsetzung" className="text-lg font-medium relative" onClick={toggleMenu}>
            Motorinstandsetzung
            <motion.span
              className="absolute -top-3 -right-6 text-red-500 text-xs font-bold transform rotate-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              Neu!
            </motion.span>
          </Link>
          <Link href="#brands" className="text-lg font-medium" onClick={toggleMenu}>
            Marken
          </Link>
          <Link href="/arbeitszeiten-und-lieferung" className="text-lg font-medium" onClick={toggleMenu}>
            Arbeitszeiten & Lieferung
          </Link>
          <Link href="#contact" className="text-lg font-medium" onClick={toggleMenu}>
            Kontakt
          </Link>
          <Button asChild className="bg-primary text-white hover:bg-primary/90 w-full mt-4">
            <a href="https://tm1.carparts-cat.com/login/atevis" target="_blank" rel="noopener noreferrer">
              Zum Shop
            </a>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
