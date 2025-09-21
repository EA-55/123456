"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <Button variant="ghost" className="mb-8" asChild>
          <Link href="/">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Zurück zur Startseite
          </Link>
        </Button>

        <div className="prose prose-gray max-w-none">
          <h1>Impressum</h1>

          <h2>Angaben gemäß § 5 TMG:</h2>
          <p>
            Emre Avci Ersatzteilpartner24.de
            <br />
            Dietrich Bonhoeffer Str. 4<br />
            21423 Winsen Luhe
          </p>

          <h2>Kontakt:</h2>
          <p>
            Telefon: 01705345350
            <br />
            E-Mail: info@ersatzteilpartner24.de
          </p>

          <h2>Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:</h2>
          <p>DE359122000</p>

          <h2>Streitbeilegungsverfahren</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform für die außergerichtliche Online-Streitbeilegung
            (OS-Plattform) bereit, aufrufbar unter{" "}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </div>
    </div>
  )
}
