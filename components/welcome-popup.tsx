"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PopupConfig {
  active: boolean
  title: string
  description: string
  imageUrl: string
  buttonText: string
  buttonUrl: string
  redirectEnabled: boolean
  duration: number // in days
  maxViews: number
  viewInterval: number // in days
  backgroundColor: string
  textColor: string
}

export function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [popupConfig, setPopupConfig] = useState<PopupConfig | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Erkennung von mobilen Geräten
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent.toLowerCase(),
      )
      setIsMobile(isMobileDevice || window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // Funktion zum Laden der Popup-Konfiguration
    const loadPopupConfig = () => {
      try {
        const config = localStorage.getItem("popupConfig")
        if (config) {
          const parsedConfig = JSON.parse(config) as PopupConfig
          // Fallback für ältere Konfigurationen ohne redirectEnabled
          if (parsedConfig.redirectEnabled === undefined) {
            parsedConfig.redirectEnabled = true
          }
          return parsedConfig
        }
        return null
      } catch (error) {
        console.error("Fehler beim Laden der Popup-Konfiguration:", error)
        return null
      }
    }

    // Funktion zum Prüfen und Anzeigen des Popups
    const handlePopupConfig = () => {
      try {
        const config = loadPopupConfig()
        if (!config || !config.active) {
          setIsVisible(false)
          setPopupConfig(null)
          return
        }

        setPopupConfig(config)

        // Popup-History laden
        let popupHistory
        try {
          const historyStr = localStorage.getItem("popupHistory")
          popupHistory = JSON.parse(historyStr || "null") || {
            lastSeen: null,
            viewCount: 0,
          }
        } catch (error) {
          console.error("Fehler beim Laden der Popup-History:", error)
          popupHistory = {
            lastSeen: null,
            viewCount: 0,
          }
        }

        const now = new Date().getTime()
        const lastSeen = popupHistory.lastSeen ? new Date(popupHistory.lastSeen).getTime() : null
        const viewCount = popupHistory.viewCount || 0

        // Prüfen, ob das Popup angezeigt werden soll
        const shouldShowPopup = () => {
          // Wenn noch nie gesehen, anzeigen
          if (lastSeen === null) return true

          // Wenn maximale Anzahl erreicht, nicht anzeigen
          if (viewCount >= config.maxViews) return false

          // Prüfen, ob genug Zeit seit der letzten Anzeige vergangen ist
          const daysSinceLastView = lastSeen ? (now - lastSeen) / (1000 * 60 * 60 * 24) : null
          return daysSinceLastView !== null && daysSinceLastView >= config.viewInterval
        }

        // Prüfen, ob das Popup noch innerhalb der Anzeigedauer ist
        const isWithinDuration = () => {
          try {
            const popupCreated = localStorage.getItem("popupCreated")
            if (!popupCreated) {
              // Wenn kein Erstellungsdatum, jetzt setzen
              localStorage.setItem("popupCreated", now.toString())
              return true
            }

            const creationTime = Number.parseInt(popupCreated)
            const daysSinceCreation = (now - creationTime) / (1000 * 60 * 60 * 24)
            return daysSinceCreation <= config.duration
          } catch (error) {
            console.error("Fehler bei der Dauer-Prüfung:", error)
            return true
          }
        }

        // Popup anzeigen, wenn die Bedingungen erfüllt sind
        if (shouldShowPopup() && isWithinDuration()) {
          // Kleine Verzögerung, um sofortiges Popup zu vermeiden
          const timer = setTimeout(() => {
            setIsVisible(true)

            // Popup-History aktualisieren
            try {
              localStorage.setItem(
                "popupHistory",
                JSON.stringify({
                  lastSeen: new Date().toISOString(),
                  viewCount: viewCount + 1,
                }),
              )
            } catch (error) {
              console.error("Fehler beim Aktualisieren der Popup-History:", error)
            }
          }, 1500)

          return () => clearTimeout(timer)
        }
      } catch (error) {
        console.error("Allgemeiner Fehler bei der Popup-Verarbeitung:", error)
      }
    }

    // Initialisierung
    handlePopupConfig()

    // Event-Listener für Storage-Events
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "popupConfig") {
        handlePopupConfig()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Regelmäßige Überprüfung (für denselben Tab)
    const intervalId = setInterval(handlePopupConfig, 60000)

    // Aufräumen
    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(intervalId)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleButtonClick = () => {
    // Wenn Weiterleitung aktiviert ist, leite weiter, ansonsten schließe nur das Popup
    if (popupConfig?.redirectEnabled && popupConfig?.buttonUrl) {
      window.location.href = popupConfig.buttonUrl
    }
    handleClose()
  }

  // Für Entwicklungszwecke: Popup immer anzeigen, wenn kein localStorage verfügbar ist
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      try {
        localStorage.getItem("test")
      } catch (e) {
        console.log("localStorage nicht verfügbar, zeige Popup für Entwicklungszwecke")
        setIsVisible(true)
        setPopupConfig({
          active: true,
          title: "Willkommen zurück!",
          description: "Schön, dass Sie wieder da sind. Entdecken Sie unsere neuesten Angebote und Dienstleistungen.",
          imageUrl: "",
          buttonText: "Jetzt entdecken",
          buttonUrl: "/",
          redirectEnabled: true,
          duration: 7,
          maxViews: 2,
          viewInterval: 2,
          backgroundColor: "#ffffff",
          textColor: "#000000",
        })
      }
    }
  }, [])

  if (!popupConfig) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto"
          onClick={handleClose}
          style={{ touchAction: "pan-y" }} // Verbessert das Scrolling auf Touch-Geräten
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg mx-auto my-4 rounded-lg shadow-xl overflow-hidden"
            style={{ backgroundColor: popupConfig.backgroundColor || "#ffffff" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white z-10 shadow-md"
              aria-label="Schließen"
              style={{ touchAction: "manipulation" }} // Verbessert die Touch-Erkennung
            >
              <X className="h-5 w-5" />
            </button>

            {popupConfig.imageUrl && (
              <div className="relative w-full h-40 sm:h-48">
                <Image
                  src={popupConfig.imageUrl || "/placeholder.svg"}
                  alt="Willkommen"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            )}

            <div className="p-4 sm:p-6">
              <h2
                className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3"
                style={{ color: popupConfig.textColor || "#000000" }}
              >
                {popupConfig.title}
              </h2>
              <div
                className="mb-4 whitespace-pre-wrap text-sm sm:text-base"
                style={{ color: popupConfig.textColor || "#000000" }}
                dangerouslySetInnerHTML={{ __html: popupConfig.description }}
              />

              {popupConfig.buttonText && (
                <Button
                  className="w-full py-2 sm:py-3 text-sm sm:text-base"
                  onClick={handleButtonClick}
                  style={{ touchAction: "manipulation" }} // Verbessert die Touch-Erkennung
                >
                  {popupConfig.buttonText}
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
