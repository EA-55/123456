"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle, ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ComplaintConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const complaintId = searchParams.get("id")
  const [isLoading, setIsLoading] = useState(true)
  const [complaint, setComplaint] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchComplaintDetails = async () => {
      if (!complaintId) {
        setError("Keine Reklamations-ID gefunden")
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/complaints/${complaintId}`)
        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Reklamationsdetails")
        }

        const data = await response.json()
        setComplaint(data)
      } catch (error) {
        console.error("Fehler beim Abrufen der Reklamationsdetails:", error)
        setError("Fehler beim Abrufen der Reklamationsdetails")
      } finally {
        setIsLoading(false)
      }
    }

    fetchComplaintDetails()
  }, [complaintId])

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg">Laden der Reklamationsdetails...</p>
      </div>
    )
  }

  if (error || !complaint) {
    return (
      <div className="container mx-auto py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-red-500">Fehler</CardTitle>
            <CardDescription>Es ist ein Fehler aufgetreten</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{error || "Reklamation konnte nicht gefunden werden"}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zur Startseite
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4"
            >
              <CheckCircle className="h-16 w-16 text-green-500" />
            </motion.div>
            <CardTitle className="text-2xl">Reklamation erfolgreich gesendet</CardTitle>
            <CardDescription>Ihre Reklamation wurde erfolgreich übermittelt und wird bearbeitet.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4 bg-gray-50">
                <p className="font-medium">Reklamations-ID:</p>
                <p className="font-mono">{complaintId}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Bitte bewahren Sie diese ID für Rückfragen auf. Wir werden Ihre Reklamation so schnell wie möglich
                  bearbeiten und uns bei Ihnen melden.
                </p>
              </div>

              <div className="border-t pt-4 mt-4">
                <p className="font-medium mb-2">Nächste Schritte:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Sie erhalten in Kürze eine Bestätigungs-E-Mail mit den Details Ihrer Reklamation.</li>
                  <li>Unser Team wird Ihre Reklamation prüfen und bearbeiten.</li>
                  <li>Bei Rückfragen werden wir uns unter den von Ihnen angegebenen Kontaktdaten bei Ihnen melden.</li>
                </ol>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zur Startseite
            </Button>
            <Button onClick={() => window.print()}>Bestätigung drucken</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
