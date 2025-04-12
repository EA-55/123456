"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { SeedButton } from "./seed-button"

interface TestResult {
  name: string
  status: "success" | "error" | "pending"
  message?: string
  data?: any
}

export default function TestReturnsPage() {
  const [results, setResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState("tests")

  const runTests = async () => {
    setIsRunning(true)
    setResults([])

    // Test 1: Verbindung zur Datenbank prüfen
    try {
      setResults((prev) => [...prev, { name: "Datenbankverbindung", status: "pending" }])

      const response = await fetch("/api/returns")
      if (!response.ok) throw new Error("Fehler bei der Verbindung zur Datenbank")

      setResults((prev) =>
        prev.map((r) =>
          r.name === "Datenbankverbindung"
            ? {
                name: "Datenbankverbindung",
                status: "success",
                message: "Verbindung zur Datenbank erfolgreich hergestellt",
              }
            : r,
        ),
      )
    } catch (error) {
      setResults((prev) =>
        prev.map((r) =>
          r.name === "Datenbankverbindung"
            ? {
                name: "Datenbankverbindung",
                status: "error",
                message: `Fehler: ${error instanceof Error ? error.message : String(error)}`,
              }
            : r,
        ),
      )
    }

    // Test 2: Rückgabe erstellen
    try {
      setResults((prev) => [...prev, { name: "Rückgabe erstellen", status: "pending" }])

      const testData = {
        customerNumber: "TEST-" + Math.floor(Math.random() * 10000),
        customerName: "Test Kunde",
        email: "test@example.com",
        comments: "Dies ist ein automatisierter Test",
        articles: [
          {
            articleNumber: "TEST-ART-" + Math.floor(Math.random() * 10000),
            quantity: "1",
            condition: "Originalverpackung",
            returnReason: "Kunden Rücktritt",
          },
        ],
      }

      const response = await fetch("/api/returns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testData),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || "Fehler beim Erstellen der Rückgabe")

      setResults((prev) =>
        prev.map((r) =>
          r.name === "Rückgabe erstellen"
            ? {
                name: "Rückgabe erstellen",
                status: "success",
                message: "Rückgabe erfolgreich erstellt",
                data: { id: data.id, ...data.return },
              }
            : r,
        ),
      )

      // Test 3: Rückgabe abrufen
      if (data.id) {
        setResults((prev) => [...prev, { name: "Rückgabe abrufen", status: "pending" }])

        const getResponse = await fetch(`/api/returns/${data.id}`)
        const getData = await getResponse.json()

        if (!getResponse.ok) throw new Error(getData.error || "Fehler beim Abrufen der Rückgabe")

        setResults((prev) =>
          prev.map((r) =>
            r.name === "Rückgabe abrufen"
              ? {
                  name: "Rückgabe abrufen",
                  status: "success",
                  message: "Rückgabe erfolgreich abgerufen",
                  data: getData,
                }
              : r,
          ),
        )

        // Test 4: Rückgabe aktualisieren
        setResults((prev) => [...prev, { name: "Rückgabe aktualisieren", status: "pending" }])

        const updateData = {
          status: "processing",
          processorName: "Test Bearbeiter",
          additionalInfo: "Aktualisiert durch Test",
        }

        const updateResponse = await fetch(`/api/returns/${data.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        })

        const updateResult = await updateResponse.json()

        if (!updateResponse.ok) throw new Error(updateResult.error || "Fehler beim Aktualisieren der Rückgabe")

        setResults((prev) =>
          prev.map((r) =>
            r.name === "Rückgabe aktualisieren"
              ? {
                  name: "Rückgabe aktualisieren",
                  status: "success",
                  message: "Rückgabe erfolgreich aktualisiert",
                  data: updateResult.return,
                }
              : r,
          ),
        )

        // Test 5: Rückgabe löschen
        setResults((prev) => [...prev, { name: "Rückgabe löschen", status: "pending" }])

        const deleteResponse = await fetch(`/api/returns/${data.id}`, {
          method: "DELETE",
        })

        if (!deleteResponse.ok) {
          const deleteError = await deleteResponse.json()
          throw new Error(deleteError.error || "Fehler beim Löschen der Rückgabe")
        }

        setResults((prev) =>
          prev.map((r) =>
            r.name === "Rückgabe löschen"
              ? {
                  name: "Rückgabe löschen",
                  status: "success",
                  message: "Rückgabe erfolgreich gelöscht",
                }
              : r,
          ),
        )
      }
    } catch (error) {
      // Fehlerbehandlung für alle Tests nach dem ersten
      const currentTest = results.find((r) => r.status === "pending")
      if (currentTest) {
        setResults((prev) =>
          prev.map((r) =>
            r.name === currentTest.name
              ? {
                  name: currentTest.name,
                  status: "error",
                  message: `Fehler: ${error instanceof Error ? error.message : String(error)}`,
                }
              : r,
          ),
        )
      }
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "pending":
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Rückgabe-Funktionalität testen</h1>
        <p className="text-muted-foreground mt-2">
          Auf dieser Seite können Sie die Rückgabe-Funktionalität mit der Supabase-Datenbank testen.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Testdaten</CardTitle>
            <CardDescription>Erstellen oder löschen Sie Testdaten für die Rückgabe-Funktionalität.</CardDescription>
          </CardHeader>
          <CardContent>
            <SeedButton />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Funktionalitätstests</CardTitle>
            <CardDescription>
              Führen Sie Tests durch, um sicherzustellen, dass die Rückgabe-Funktionalität korrekt funktioniert.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="tests">Tests</TabsTrigger>
                <TabsTrigger value="results">Ergebnisse</TabsTrigger>
              </TabsList>

              <TabsContent value="tests">
                <div className="space-y-4">
                  <p>Folgende Tests werden durchgeführt:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Verbindung zur Datenbank prüfen</li>
                    <li>Rückgabe erstellen</li>
                    <li>Rückgabe abrufen</li>
                    <li>Rückgabe aktualisieren</li>
                    <li>Rückgabe löschen</li>
                  </ul>

                  <div className="flex gap-4 mt-6">
                    <Button onClick={runTests} disabled={isRunning}>
                      {isRunning ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Tests werden ausgeführt...
                        </>
                      ) : (
                        "Tests starten"
                      )}
                    </Button>

                    <Button variant="outline" asChild>
                      <Link href="/rueckgabe">Zum Rückgabeformular</Link>
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="results">
                {results.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Noch keine Testergebnisse vorhanden. Starten Sie die Tests, um Ergebnisse zu sehen.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {results.map((result, index) => (
                      <div key={index} className="p-4 border rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {getStatusIcon(result.status)}
                            <h3 className="ml-2 font-medium">{result.name}</h3>
                          </div>
                          <Badge
                            variant={result.status === "success" ? "outline" : "destructive"}
                            className={
                              result.status === "success"
                                ? "bg-green-100 text-green-800"
                                : result.status === "pending"
                                  ? "bg-blue-100 text-blue-800"
                                  : undefined
                            }
                          >
                            {result.status === "success"
                              ? "Erfolgreich"
                              : result.status === "pending"
                                ? "Wird ausgeführt"
                                : "Fehler"}
                          </Badge>
                        </div>

                        {result.message && <p className="text-sm text-muted-foreground">{result.message}</p>}

                        {result.data && (
                          <>
                            <Separator className="my-2" />
                            <div className="mt-2">
                              <p className="text-sm font-medium mb-1">Daten:</p>
                              <pre className="text-xs bg-muted p-2 rounded-md overflow-auto max-h-40">
                                {JSON.stringify(result.data, null, 2)}
                              </pre>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4">
                  <Button onClick={runTests} disabled={isRunning}>
                    {isRunning ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Tests werden ausgeführt...
                      </>
                    ) : (
                      "Tests erneut starten"
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manuelle Tests</CardTitle>
            <CardDescription>
              Hier finden Sie Links zu den verschiedenen Seiten, um die Funktionalität manuell zu testen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Rückgabeformular</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Testen Sie das Rückgabeformular, indem Sie eine neue Rückgabe erstellen.
                </p>
                <Button asChild>
                  <Link href="/rueckgabe">Zum Rückgabeformular</Link>
                </Button>
              </div>

              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Admin-Bereich</h3>
                <p className="text-sm text-muted-foreground mb-4">Verwalten Sie Rückgaben im Admin-Bereich.</p>
                <Button asChild>
                  <Link href="/admin">Zum Admin-Bereich</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
