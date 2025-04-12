"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Info } from "lucide-react"

interface InfoBarProps {
  className?: string
}

export function InfoBar({ className }: InfoBarProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [infoText, setInfoText] = useState("")

  useEffect(() => {
    // Check if the info bar is active
    const infoBarActive = localStorage.getItem("infoBarActive") === "true"
    const infoBarText = localStorage.getItem("infoBarText") || ""

    setIsVisible(infoBarActive)
    setInfoText(infoBarText)

    // Listen for storage events to update in real-time across tabs
    const handleStorageChange = (e) => {
      if (e.key === "infoBarActive") {
        setIsVisible(e.newValue === "true")
      } else if (e.key === "infoBarText") {
        setInfoText(e.newValue || "")
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  if (!isVisible || !infoText) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className={`bg-primary text-white py-2 px-4 text-center ${className}`}
      >
        <div className="container mx-auto flex items-center justify-center gap-2">
          <Info className="h-4 w-4" />
          <p className="text-sm font-medium">{infoText}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
