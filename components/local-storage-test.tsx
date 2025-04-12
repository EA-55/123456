"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, CheckCircle, XCircle } from "lucide-react"

export function LocalStorageTest() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null)
  const [testValue, setTestValue] = useState<string | null>(null)
  const [allItems, setAllItems] = useState<Record<string, string>>({})
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    try {
      // Test if localStorage is supported
      localStorage.setItem("test", "test value")
      const retrieved = localStorage.getItem("test")
      setIsSupported(retrieved === "test value")
      setTestValue(retrieved)

      // Get all localStorage items
      const items: Record<string, string> = {}
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key) {
          items[key] = localStorage.getItem(key) || ""
        }
      }
      setAllItems(items)
    } catch (error) {
      setIsSupported(false)
      console.error("localStorage is not supported:", error)
    }
  }, [])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="fixed bottom-0 right-0 w-full md:w-96 bg-white border border-gray-300 shadow-lg rounded-t-lg overflow-hidden z-50">
      <div className="flex items-center justify-between p-3 bg-gray-100 cursor-pointer" onClick={toggleExpand}>
        <div className="flex items-center">
          <h3 className="font-medium mr-2">localStorage Test</h3>
          {isSupported !== null &&
            (isSupported ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            ))}
        </div>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        )}
      </div>

      {isExpanded && (
        <div className="p-4 max-h-96 overflow-y-auto">
          <div className="mb-4">
            <h4 className="font-medium mb-2">Status:</h4>
            <div className={`p-2 rounded ${isSupported ? "bg-green-100" : "bg-red-100"}`}>
              {isSupported ? "localStorage wird unterstützt" : "localStorage wird NICHT unterstützt"}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-2">Test Wert:</h4>
            <div className="p-2 bg-gray-100 rounded">{testValue || "Kein Wert gefunden"}</div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Alle localStorage Einträge:</h4>
            {Object.keys(allItems).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(allItems).map(([key, value]) => (
                  <div key={key} className="p-2 bg-gray-100 rounded">
                    <div className="font-medium">{key}:</div>
                    <div className="text-sm break-all">{value}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-2 bg-gray-100 rounded">Keine Einträge gefunden</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
