"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Shield, Key, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function AdminSetup() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [setupKey, setSetupKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validierung
    if (password !== confirmPassword) {
      toast({
        title: "Fehler",
        description: "Die Passwörter stimmen nicht überein.",
        variant: "destructive",
      })
      return
    }

    if (setupKey !== "Hamburg55") {
      toast({
        title: "Fehler",
        description: "Der Setup-Schlüssel ist ungültig.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        toast({
          title: "Erfolgreich eingerichtet",
          description: "Die Admin-Zugangsdaten wurden erfolgreich gespeichert.",
        })

        // Kurze Verzögerung vor der Weiterleitung
        setTimeout(() => {
          router.push("/admin/login")
        }, 3000)
      } else {
        toast({
          title: "Fehler",
          description: data.error || "Es gab ein Problem bei der Einrichtung.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Setup error:", error)
      toast({
        title: "Fehler",
        description: "Es gab ein Problem bei der Einrichtung.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-[400px] shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Shield className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Admin-Einrichtung</CardTitle>
            <CardDescription className="text-center">
              Erstellen Sie neue Admin-Zugangsdaten für Ihre Website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {success ? (
              <div className="bg-green-50 p-4 rounded-md border border-green-200 text-green-700">
                <h3 className="font-medium mb-2">Einrichtung erfolgreich!</h3>
                <p>
                  Ihre Admin-Zugangsdaten wurden erfolgreich gespeichert. Sie werden in Kürze zur Login-Seite
                  weitergeleitet.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSetup}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="setupKey">Setup-Schlüssel</Label>
                    <div className="relative">
                      <Input
                        id="setupKey"
                        type="password"
                        placeholder="Geben Sie den Setup-Schlüssel ein"
                        value={setupKey}
                        onChange={(e) => setSetupKey(e.target.value)}
                        required
                      />
                      <Key className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Der Setup-Schlüssel wurde Ihnen vom Entwickler mitgeteilt.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Neuer Benutzername</Label>
                    <Input
                      id="username"
                      placeholder="Benutzername"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Neues Passwort</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Passwort"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Passwort bestätigen"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center">
                        <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-current rounded-full"></span>
                        Einrichtung läuft...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Save className="mr-2 h-4 w-4" />
                        Admin-Zugangsdaten speichern
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-center w-full text-muted-foreground">
              Diese Seite ist nur für die einmalige Einrichtung gedacht und sollte nach der Verwendung deaktiviert
              werden.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
