"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState<boolean>(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consentGiven = localStorage.getItem("cookieConsent")

    // Only show the banner if no choice has been made yet
    if (!consentGiven) {
      // Small delay to prevent the banner from flashing on page load
      const timer = setTimeout(() => {
        setShowConsent(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowConsent(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-background/95 backdrop-blur-sm border-t shadow-lg"
        >
          <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Wir verwenden Cookies</h3>
              <p className="text-sm text-muted-foreground">
                Diese Website verwendet Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.
                Durch die Nutzung unserer Website stimmen Sie unserer{" "}
                <a href="/datenschutz" className="text-primary hover:underline">
                  Datenschutzrichtlinie
                </a>{" "}
                zu.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Button variant="outline" onClick={declineCookies} className="whitespace-nowrap">
                Ablehnen
              </Button>
              <Button onClick={acceptCookies} className="whitespace-nowrap bg-primary hover:bg-primary/90">
                Akzeptieren
              </Button>
            </div>
            <Button variant="ghost" size="icon" onClick={declineCookies} className="absolute top-2 right-2 md:hidden">
              <X className="h-4 w-4" />
              <span className="sr-only">Schließen</span>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
