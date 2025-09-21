"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Info, LogOut, Settings, MessageSquare, Bell, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { InquiriesTab } from "./components/inquiries-tab"
import { PopupManagerTab } from "./components/popup-manager-tab"
import { ReturnsTab } from "./components/returns-tab"

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [isInfoBarActive, setIsInfoBarActive] = useState(false)
  const [infoBarText, setInfoBarText] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        console.log("Überprüfe Authentifizierung...")
        const response = await fetch("/api/admin/check-auth")
        const data = await response.json()

        console.log("Auth-Check-Antwort:", data)

        if (!response.ok || !data.authenticated) {
          console.log("Nicht authentifiziert, Weiterleitung zur Login-Seite")
          router.push("/admin/login")
        } else {
          console.log("Authentifiziert, lade Dashboard")
          const active = localStorage.getItem("infoBarActive") === "true"
          const text = localStorage.getItem("infoBarText") || ""

          setIsInfoBarActive(active)
          setInfoBarText(text)
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Auth-Check-Fehler:", error)
        router.push("/admin/login")
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const handleSaveInfoBar = () => {
    localStorage.setItem("infoBarActive", isInfoBarActive.toString())
    localStorage.setItem("infoBarText", infoBarText)

    // Dispatch storage event to update other tabs
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "infoBarActive",
        newValue: isInfoBarActive.toString(),
      }),
    )
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "infoBarText",
        newValue: infoBarText,
      }),
    )

    toast({
      title: "Änderungen gespeichert",
      description: "Die Info-Leiste wurde aktualisiert.",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Abmelden
          </Button>
        </div>

        <Tabs defaultValue="info-bar">
          <TabsList className="mb-4">
            <TabsTrigger value="info-bar">
              <Info className="mr-2 h-4 w-4" />
              Info-Leiste
            </TabsTrigger>
            <TabsTrigger value="inquiries">
              <MessageSquare className="mr-2 h-4 w-4" />
              Anfragen
            </TabsTrigger>
            <TabsTrigger value="returns">
              <Package className="mr-2 h-4 w-4" />
              Rückgaben
            </TabsTrigger>
            <TabsTrigger value="popup">
              <Bell className="mr-2 h-4 w-4" />
              Popup-Manager
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Einstellungen
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info-bar">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Info-Leiste verwalten</CardTitle>
                  <CardDescription>
                    Aktivieren oder deaktivieren Sie die Info-Leiste und bearbeiten Sie den Inhalt.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="info-bar-active" checked={isInfoBarActive} onCheckedChange={setIsInfoBarActive} />
                    <Label htmlFor="info-bar-active">Info-Leiste aktivieren</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="info-bar-text">Text der Info-Leiste</Label>
                    <Textarea
                      id="info-bar-text"
                      placeholder="Geben Sie hier den Text für die Info-Leiste ein..."
                      value={infoBarText}
                      onChange={(e) => setInfoBarText(e.target.value)}
                      disabled={!isInfoBarActive}
                    />
                  </div>

                  <div className="bg-gray-100 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Vorschau:</h3>
                    <div
                      className={`bg-primary text-white py-2 px-4 text-center rounded-md ${!isInfoBarActive && "opacity-50"}`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Info className="h-4 w-4" />
                        <p className="text-sm font-medium">{infoBarText || "Hier wird Ihr Text angezeigt"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveInfoBar}>Änderungen speichern</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="inquiries">
            <InquiriesTab />
          </TabsContent>

          <TabsContent value="returns">
            <ReturnsTab />
          </TabsContent>

          <TabsContent value="popup">
            <PopupManagerTab />
          </TabsContent>

          <TabsContent value="settings">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Einstellungen</CardTitle>
                  <CardDescription>Verwalten Sie Ihre Admin-Einstellungen.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Weitere Einstellungen können hier hinzugefügt werden.</p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
