"use client"

import { useEffect, useState } from "react"

interface DebugData {
  fileExists: boolean
  fileContent?: string
  fileStats?: {
    size: number
    created: string
    modified: string
  }
  error?: string
}

export default function DebugPage() {
  const [debugData, setDebugData] = useState<DebugData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/debug")
      .then((res) => res.json())
      .then((data) => {
        setDebugData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching debug data:", error)
        setDebugData({ fileExists: false, error: "Failed to fetch debug data" })
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Debug-Seite</h1>
        <p>Lade Debug-Informationen...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Debug-Seite</h1>
      <div className="mb-4">
        <strong>Datei existiert:</strong> {debugData?.fileExists ? "Ja" : "Nein"}
      </div>
      {debugData?.fileStats && (
        <div className="mb-4">
          <strong>Datei-Statistiken:</strong>
          <ul className="ml-4 mt-2">
            <li>Größe: {debugData.fileStats.size} Bytes</li>
            <li>Erstellt: {new Date(debugData.fileStats.created).toLocaleString()}</li>
            <li>Geändert: {new Date(debugData.fileStats.modified).toLocaleString()}</li>
          </ul>
        </div>
      )}
      <div>
        <strong>Dateiinhalt:</strong>
        <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto max-h-96">
          {debugData?.fileContent || debugData?.error || "Keine Daten verfügbar"}
        </pre>
      </div>
    </div>
  )
}
