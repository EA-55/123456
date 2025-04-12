"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Database, Trash } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function SeedButton() {
  const [isSeeding, setIsSeeding] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const seedTestData = async () => {
    setIsSeeding(true)
    try {
      const response = await fetch("/api/seed-returns", {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Fehler beim Seeden der Testdaten")
      }

      toast({
        title: "Testdaten erstellt",
        description: `${data.returns} Rückgaben mit insgesamt ${data.items} Artikeln wurden erstellt.`,
      })
    } catch (error) {
      console.error("Fehler:", error)
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten",
      })
    } finally {
      setIsSeeding(false)
    }
  }

  const deleteTestData = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch("/api/seed-returns", {
        method: "DELETE",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Fehler beim Löschen der Testdaten")
      }

      toast({
        title: "Testdaten gelöscht",
        description: "Alle Testdaten wurden erfolgreich gelöscht.",
      })
    } catch (error) {
      console.error("Fehler:", error)
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex gap-4">
      <Button onClick={seedTestData} disabled={isSeeding || isDeleting} className="flex items-center">
        {isSeeding ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Testdaten werden erstellt...
          </>
        ) : (
          <>
            <Database className="mr-2 h-4 w-4" />
            Testdaten erstellen
          </>
        )}
      </Button>

      <Button
        variant="outline"
        onClick={deleteTestData}
        disabled={isSeeding || isDeleting}
        className="flex items-center"
      >
        {isDeleting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Testdaten werden gelöscht...
          </>
        ) : (
          <>
            <Trash className="mr-2 h-4 w-4" />
            Testdaten löschen
          </>
        )}
      </Button>
    </div>
  )
}
