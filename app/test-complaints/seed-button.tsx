"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { RefreshCw } from "lucide-react"

export default function SeedComplaintsButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSeed = async () => {
    if (!confirm("Möchten Sie wirklich Testdaten für Reklamationen erstellen? Bestehende Testdaten werden gelöscht.")) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/seed-complaints", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Erfolg",
          description: `${data.count} Testdaten für Reklamationen wurden erstellt.`,
        })
      } else {
        throw new Error(data.error || "Ein Fehler ist aufgetreten")
      }
    } catch (error) {
      console.error("Fehler beim Seeden:", error)
      toast({
        title: "Fehler",
        description: "Die Testdaten konnten nicht erstellt werden.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleSeed} disabled={isLoading}>
      {isLoading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
      Testdaten für Reklamationen erstellen
    </Button>
  )
}
