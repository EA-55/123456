"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Einfache Fallback-Seite für den Admin-Bereich
// Wird verwendet, wenn die Hauptseite Probleme hat
export default function AdminFallbackPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/admin/check-auth")
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          router.push("/admin/login")
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
        router.push("/admin/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout")
      router.push("/admin/login")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Überprüfe Authentifizierung...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin-Bereich (Fallback-Modus)</h1>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Abmelden
        </button>
      </div>

      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
        <p>Der Admin-Bereich wird im Fallback-Modus ausgeführt. Einige Funktionen sind möglicherweise eingeschränkt.</p>
        <p>Bitte kontaktieren Sie den Administrator, wenn dieses Problem weiterhin besteht.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Anfragen</h2>
          <p>Laden der Anfragen nicht möglich im Fallback-Modus.</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Rückgaben</h2>
          <p>Laden der Rückgaben nicht möglich im Fallback-Modus.</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Reklamationen</h2>
          <p>Laden der Reklamationen nicht möglich im Fallback-Modus.</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Popup-Manager</h2>
          <p>Laden des Popup-Managers nicht möglich im Fallback-Modus.</p>
        </div>
      </div>
    </div>
  )
}
