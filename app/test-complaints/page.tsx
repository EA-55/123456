import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SeedComplaintsButton from "./seed-button"

export default function TestComplaintsPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Reklamationen Testdaten</CardTitle>
          <CardDescription>
            Erstellen Sie Testdaten für Reklamationen, um die Funktionalität im Admin-Bereich zu testen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <p>
              Klicken Sie auf den Button unten, um 10 zufällige Reklamationen mit verschiedenen Status, Artikeln und
              Fahrzeugdaten zu erstellen. Bestehende Testdaten werden gelöscht.
            </p>
            <div>
              <SeedComplaintsButton />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
