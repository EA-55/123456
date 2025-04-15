"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Dynamischer Import der Tab-Komponenten, um zirkuläre Abhängigkeiten zu vermeiden
const InquiriesTab = dynamic(() => import("./components/inquiries-tab"), { ssr: false })
const ReturnsTab = dynamic(() => import("./components/returns-tab"), { ssr: false })
const ReklamationenTab = dynamic(() => import("./components/reklamationen-tab"), { ssr: false })
const PopupManagerTab = dynamic(() => import("./components/popup-manager-tab"), { ssr: false })

// Verhindere statisches Prerendering für diese Seite
export const dynamic = "force-dynamic"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState("inquiries")
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
    return null // Router wird die Seite umleiten, kein Rendering nötig
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin-Bereich</h1>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Abmelden
        </button>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "inquiries"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Anfragen
            </button>
            <button
              onClick={() => setActiveTab("returns")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "returns"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Rückgaben
            </button>
            <button
              onClick={() => setActiveTab("reklamationen")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "reklamationen"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Reklamationen
            </button>
            <button
              onClick={() => setActiveTab("popup")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "popup"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Popup-Manager
            </button>
          </nav>
        </div>
      </div>

      {activeTab === "inquiries" && <InquiriesTab />}
      {activeTab === "returns" && <ReturnsTab />}
      {activeTab === "reklamationen" && <ReklamationenTab />}
      {activeTab === "popup" && <PopupManagerTab />}
    </div>
  )
}
