"use client"

import Link from "next/link"
import { useEffect } from "react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div
        className="fixed right-0 top-0 h-full w-3/4 max-w-sm bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute right-4 top-4 text-gray-500 hover:text-gray-900" onClick={onClose}>
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
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
          <span className="sr-only">Menü schließen</span>
        </button>
        <nav className="mt-8 flex flex-col gap-4">
          <Link href="/" className="text-lg font-medium transition-colors hover:text-primary" onClick={onClose}>
            Startseite
          </Link>
          <Link
            href="/motorinstandsetzung"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={onClose}
          >
            Motorinstandsetzung
          </Link>
          <Link
            href="/software-tuning"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={onClose}
          >
            Software Tuning
          </Link>
          <Link
            href="/rueckgabe"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={onClose}
          >
            Rückgabe
          </Link>
          <Link
            href="/reklamation"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={onClose}
          >
            Reklamation
          </Link>
          <Link
            href="/b2b-registrierung"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={onClose}
          >
            B2B Registrierung
          </Link>
        </nav>
      </div>
    </div>
  )
}
