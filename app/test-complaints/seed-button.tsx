"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function SeedButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSeed = async () => {
    if (!confirm("Möchten Sie wirklich Testdaten für Reklamationen erstellen? Bestehende Testdaten werden gelöscht.")) {
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch("/api/seed-complaints", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Fehler beim Erstellen der Testdaten")
      }

      const data = await response.json()

      toast({
        title: "Erfolg",
        description: `${data.count} Testdaten für Reklamationen wurden erfolgreich erstellt.`,
      })
    } catch (error) {
      console.error("Fehler beim Erstellen der Testdaten:", error)
      toast({
        title: "Fehler",
        description: "Beim Erstellen der Testdaten ist ein Fehler aufgetreten.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleSeed} disabled={isLoading} className="w-full">
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {isLoading ? "Wird erstellt..." : "Testdaten für Reklamationen erstellen"}
    </Button>
  )
}
