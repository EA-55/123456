"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown } from "lucide-react"

export function LocalStorageTest() {
  const [status, setStatus] = useState<string>("Prüfe localStorage...")
  const [isSupported, setIsSupported] = useState<boolean | null>(null)
  const [testValue, setTestValue] = useState<string>("")
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  useEffect(() => {
    // Prüfen, ob localStorage unterstützt wird
    try {
      localStorage.setItem("test", "test")
      const test = localStorage.getItem("test")
      if (test === "test") {
        setIsSupported(true)
        setStatus("localStorage wird unterstützt")
      } else {
        setIsSupported(false)
        setStatus("localStorage wird nicht korrekt unterstützt")
      }
      localStorage.removeItem("test")
    } catch (e) {
      setIsSupported(false)
      setStatus(`localStorage wird nicht unterstützt: ${e.message}`)
    }

    // Vorhandene Popup-Konfiguration prüfen
    try {
      const popupConfig = localStorage.getItem("popupConfig")
      if (popupConfig) {
        setTestValue(popupConfig)
        setStatus((prev) => `${prev}\nPopup-Konfiguration gefunden`)
      } else {
        setStatus((prev) => `${prev}\nKeine Popup-Konfiguration gefunden`)
      }
    } catch (e) {
      setStatus((prev) => `${prev}\nFehler beim Lesen der Popup-Konfiguration: ${e.message}`)
    }
  }, [])

  const handleTestWrite = () => {
    try {
      const testData = {
        test: "Testdaten",
        timestamp: new Date().toISOString(),
      }
      localStorage.setItem("testData", JSON.stringify(testData))
      setStatus((prev) => `${prev}\nTestdaten erfolgreich geschrieben`)
    } catch (e) {
      setStatus((prev) => `${prev}\nFehler beim Schreiben von Testdaten: ${e.message}`)
    }
  }

  const handleTestRead = () => {
    try {
      const testData = localStorage.getItem("testData")
      if (testData) {
        setStatus((prev) => `${prev}\nTestdaten gelesen: ${testData}`)
      } else {
        setStatus((prev) => `${prev}\nKeine Testdaten gefunden`)
      }
    } catch (e) {
      setStatus((prev) => `${prev}\nFehler beim Lesen von Testdaten: ${e.message}`)
    }
  }

  const handleResetPopupHistory = () => {
    try {
      localStorage.removeItem("popupHistory")
      localStorage.removeItem("popupCreated")
      setStatus((prev) => `${prev}\nPopup-History zurückgesetzt`)
    } catch (e) {
      setStatus((prev) => `${prev}\nFehler beim Zurücksetzen der Popup-History: ${e.message}`)
    }
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
      <div
        className="flex items-center justify-between p-2 cursor-pointer bg-gray-100 hover:bg-gray-200"
        onClick={toggleExpanded}
      >
        <h3 className="font-bold">localStorage Test</h3>
        <div className="flex items-center">
          {isSupported === true && <span className="mr-2 text-green-500 text-sm">✓ Unterstützt</span>}
          {isSupported === false && <span className="mr-2 text-red-500 text-sm">✗ Nicht unterstützt</span>}
          {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 max-h-60 overflow-auto">
          <pre className="text-xs mb-2 whitespace-pre-wrap bg-gray-50 p-2 rounded">{status}</pre>

          {testValue && (
            <div className="mb-2">
              <h4 className="font-semibold text-sm">Popup-Konfiguration:</h4>
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-20">{testValue}</pre>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            <Button size="sm" onClick={handleTestWrite}>
              Test schreiben
            </Button>
            <Button size="sm" onClick={handleTestRead}>
              Test lesen
            </Button>
            <Button size="sm" variant="destructive" onClick={handleResetPopupHistory}>
              Popup-History zurücksetzen
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
