import { SeedButton } from "./seed-button"

export default function TestComplaintsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Testdaten für Reklamationen</h1>
      <p className="mb-4">
        Auf dieser Seite können Sie Testdaten für Reklamationen erstellen, um die Funktionalität des Reklamationssystems
        zu testen.
      </p>
      <div className="max-w-md">
        <SeedButton />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Hinweise</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Durch Klicken auf den Button werden 10 Testreklamationen mit zufälligen Daten erstellt.</li>
          <li>Bestehende Testdaten werden gelöscht, bevor neue erstellt werden.</li>
          <li>
            Die erstellten Reklamationen haben unterschiedliche Status (offen, in Bearbeitung, abgeschlossen,
            abgelehnt).
          </li>
          <li>Jede Reklamation enthält 1-3 Artikel und detaillierte Fahrzeugdaten.</li>
          <li>Einige Reklamationen enthalten auch Anhänge und/oder Diagnoseausdrucke.</li>
          <li>
            Nach dem Erstellen der Testdaten können Sie diese im Admin-Bereich unter dem Tab "Reklamationen" einsehen.
          </li>
        </ul>
      </div>
    </div>
  )
}
