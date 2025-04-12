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
  const [debugInfo, setDebugInfo] = useState<string>("")

  // Debugging-Funktion
  const addDebugInfo = (info: string) => {
    setDebugInfo((prev) => `${prev}\n${new Date().toISOString()}: ${info}`)
  }

  useEffect(() => {
    // Load popup configuration
    const loadPopupConfig = () => {
      try {
        addDebugInfo("Versuche, Popup-Konfiguration zu laden")
        const config = localStorage.getItem("popupConfig")
        if (config) {
          addDebugInfo("Popup-Konfiguration gefunden")
          const parsedConfig = JSON.parse(config) as PopupConfig
          // Fallback für ältere Konfigurationen ohne redirectEnabled
          if (parsedConfig.redirectEnabled === undefined) {
            parsedConfig.redirectEnabled = true
          }
          return parsedConfig
        }
        addDebugInfo("Keine Popup-Konfiguration gefunden")
        return null
      } catch (error) {
        addDebugInfo(`Fehler beim Laden der Konfiguration: ${error.message}`)
        return null
      }
    }

    const handlePopupConfig = () => {
      try {
        const config = loadPopupConfig()
        if (!config) {
          addDebugInfo("Keine Konfiguration vorhanden, Popup wird nicht angezeigt")
          return
        }

        if (!config.active) {
          addDebugInfo("Popup ist nicht aktiv")
          setIsVisible(false)
          setPopupConfig(null)
          return
        }

        addDebugInfo(`Popup ist aktiv: ${JSON.stringify(config)}`)
        setPopupConfig(config)

        // Check if user has seen the popup before
        let popupHistory
        try {
          const historyStr = localStorage.getItem("popupHistory")
          addDebugInfo(`Popup-History: ${historyStr}`)
          popupHistory = JSON.parse(historyStr || "null") || {
            lastSeen: null,
            viewCount: 0,
          }
        } catch (error) {
          addDebugInfo(`Fehler beim Parsen der Popup-History: ${error.message}`)
          popupHistory = {
            lastSeen: null,
            viewCount: 0,
          }
        }

        const now = new Date().getTime()
        const lastSeen = popupHistory.lastSeen ? new Date(popupHistory.lastSeen).getTime() : null
        const viewCount = popupHistory.viewCount || 0

        addDebugInfo(
          `Letzte Anzeige: ${lastSeen ? new Date(lastSeen).toISOString() : "nie"}, Anzahl Anzeigen: ${viewCount}`,
        )

        // Check if popup should be shown based on conditions
        const shouldShowPopup = () => {
          // If never seen before, show it
          if (lastSeen === null) {
            addDebugInfo("Popup wurde noch nie angezeigt, wird angezeigt")
            return true
          }

          // If max views reached, don't show
          if (viewCount >= config.maxViews) {
            addDebugInfo(`Maximale Anzahl Anzeigen erreicht (${viewCount}/${config.maxViews})`)
            return false
          }

          // Check if enough time has passed since last view
          const daysSinceLastView = lastSeen ? (now - lastSeen) / (1000 * 60 * 60 * 24) : null
          addDebugInfo(`Tage seit letzter Anzeige: ${daysSinceLastView}`)
          return daysSinceLastView !== null && daysSinceLastView >= config.viewInterval
        }

        // Check if popup is still within its duration period
        const isWithinDuration = () => {
          try {
            const popupCreated = localStorage.getItem("popupCreated")
            addDebugInfo(
              `Popup erstellt am: ${popupCreated ? new Date(Number.parseInt(popupCreated)).toISOString() : "unbekannt"}`,
            )

            if (!popupCreated) {
              // If no creation date, set it now
              localStorage.setItem("popupCreated", now.toString())
              addDebugInfo("Keine Erstellungszeit gefunden, setze auf jetzt")
              return true
            }

            const creationTime = Number.parseInt(popupCreated)
            const daysSinceCreation = (now - creationTime) / (1000 * 60 * 60 * 24)
            addDebugInfo(`Tage seit Erstellung: ${daysSinceCreation}, Dauer: ${config.duration}`)
            return daysSinceCreation <= config.duration
          } catch (error) {
            addDebugInfo(`Fehler bei Dauer-Prüfung: ${error.message}`)
            return true
          }
        }

        const shouldShow = shouldShowPopup()
        const withinDuration = isWithinDuration()
        addDebugInfo(`Sollte angezeigt werden: ${shouldShow}, Innerhalb Dauer: ${withinDuration}`)

        // Show popup if conditions are met
        if (shouldShow && withinDuration) {
          // Small delay to avoid immediate popup
          addDebugInfo("Popup wird mit Verzögerung angezeigt")
          const timer = setTimeout(() => {
            addDebugInfo("Zeige Popup jetzt an")
            setIsVisible(true)

            // Update popup history
            try {
              localStorage.setItem(
                "popupHistory",
                JSON.stringify({
                  lastSeen: new Date().toISOString(),
                  viewCount: viewCount + 1,
                }),
              )
              addDebugInfo("Popup-History aktualisiert")
            } catch (error) {
              addDebugInfo(`Fehler beim Aktualisieren der History: ${error.message}`)
            }
          }, 1500)

          return () => {
            addDebugInfo("Timer gelöscht")
            clearTimeout(timer)
          }
        } else {
          addDebugInfo("Popup wird nicht angezeigt")
        }
      } catch (error) {
        addDebugInfo(`Allgemeiner Fehler: ${error.message}`)
      }
    }

    // Initial load
    addDebugInfo("Initialisiere Popup")
    handlePopupConfig()

    // Listen for storage events
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "popupConfig") {
        addDebugInfo("Storage-Event für popupConfig erkannt")
        handlePopupConfig()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Also check for changes every minute (for the same tab)
    addDebugInfo("Starte Intervall-Prüfung")
    const intervalId = setInterval(() => {
      addDebugInfo("Intervall-Prüfung ausgelöst")
      handlePopupConfig()
    }, 60000)

    return () => {
      addDebugInfo("Komponente wird entfernt, räume auf")
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(intervalId)
    }
  }, [])

  const handleClose = () => {
    addDebugInfo("Popup wird geschlossen")
    setIsVisible(false)
  }

  const handleButtonClick = () => {
    addDebugInfo("Button geklickt")
    // Wenn Weiterleitung aktiviert ist, leite weiter, ansonsten schließe nur das Popup
    if (popupConfig?.redirectEnabled && popupConfig?.buttonUrl) {
      addDebugInfo(`Leite weiter zu: ${popupConfig.buttonUrl}`)
      window.location.href = popupConfig.buttonUrl
    }
    handleClose()
  }

  // Wenn wir im Entwicklungsmodus sind, zeigen wir Debug-Informationen an
  const showDebug = process.env.NODE_ENV === "development"

  if (!popupConfig && !showDebug) return null

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg mx-auto my-4 rounded-lg shadow-xl overflow-hidden"
              style={{ backgroundColor: popupConfig?.backgroundColor || "#ffffff" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white z-10 shadow-md"
                aria-label="Schließen"
              >
                <X className="h-5 w-5" />
              </button>

              {popupConfig?.imageUrl && (
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
                  style={{ color: popupConfig?.textColor || "#000000" }}
                >
                  {popupConfig?.title}
                </h2>
                <div
                  className="mb-4 whitespace-pre-wrap text-sm sm:text-base"
                  style={{ color: popupConfig?.textColor || "#000000" }}
                  dangerouslySetInnerHTML={{ __html: popupConfig?.description || "" }}
                />

                {popupConfig?.buttonText && (
                  <Button className="w-full py-2 sm:py-3 text-sm sm:text-base" onClick={handleButtonClick}>
                    {popupConfig.buttonText}
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Debug-Informationen */}
      {showDebug && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 text-white p-4 max-h-60 overflow-auto text-xs">
          <h3 className="font-bold mb-2">Popup Debug:</h3>
          <pre>{debugInfo || "Keine Debug-Informationen"}</pre>
          <div className="mt-2 flex gap-2">
            <button
              className="bg-blue-500 px-2 py-1 rounded text-white"
              onClick={() => {
                localStorage.removeItem("popupHistory")
                localStorage.removeItem("popupCreated")
                addDebugInfo("Popup-History zurückgesetzt")
              }}
            >
              Reset History
            </button>
            <button
              className="bg-green-500 px-2 py-1 rounded text-white"
              onClick={() => {
                setIsVisible(true)
                addDebugInfo("Popup manuell angezeigt")
              }}
            >
              Popup anzeigen
            </button>
          </div>
        </div>
      )}
    </>
  )
}
