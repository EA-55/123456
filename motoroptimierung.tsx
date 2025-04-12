"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Shield, Zap, Gauge, FileCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Motoroptimierung() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Professionelle Motoroptimierung"
            fill
            className="object-cover object-center opacity-40"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary border border-primary/30">Software & Tuning</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Motoroptimierung</h1>
            <p className="text-xl text-gray-300 mb-8">
              Legale Leistungssteigerung und Effizienzoptimierung für Ihr Fahrzeug
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2>Professionelle ECU-Optimierung für mehr Leistung und Effizienz</h2>

            <p>
              Bei ErsatzteilPartner24 bieten wir Ihnen professionelle Motoroptimierung (auch bekannt als Chiptuning)
              durch präzise Anpassung der elektronischen Motorsteuerung (ECU). Unsere Optimierungen werden von
              erfahrenen Technikern durchgeführt, die mit modernster Diagnosetechnik und fahrzeugspezifischer Software
              arbeiten.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg my-8 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="mr-2 h-5 w-5 text-primary" />
                Unsere Qualitätsversprechen
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                    <FileCheck className="h-4 w-4 text-primary" />
                  </span>
                  <span>Ausschließlich TÜV-konforme Anpassungen innerhalb der gesetzlichen Grenzen</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                    <FileCheck className="h-4 w-4 text-primary" />
                  </span>
                  <span>Individuelle Abstimmung auf Ihr spezifisches Fahrzeugmodell</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                    <FileCheck className="h-4 w-4 text-primary" />
                  </span>
                  <span>Umfassende Dokumentation aller Änderungen für TÜV und Versicherung</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                    <FileCheck className="h-4 w-4 text-primary" />
                  </span>
                  <span>Garantie auf alle durchgeführten Optimierungen</span>
                </li>
              </ul>
            </div>

            <h3>Was ist ECU-Optimierung?</h3>
            <p>
              Die elektronische Motorsteuerung (ECU) regelt zahlreiche Parameter Ihres Motors, darunter Einspritzmenge,
              Zündzeitpunkt, Ladedruck und Drosselklappenstellung. Durch präzise Anpassung dieser Parameter können wir
              die Leistungsreserven Ihres Motors freisetzen, ohne die vom Hersteller vorgesehenen Sicherheitsgrenzen zu
              überschreiten.
            </p>

            <h3>Vorteile unserer Motoroptimierung</h3>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-primary" />
                    Mehr Leistung
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Steigerung der Motorleistung um 15-30% und des Drehmoments um 15-40%, abhängig vom Fahrzeugmodell
                    und Motortyp. Spürbar bessere Beschleunigung und höhere Endgeschwindigkeit.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gauge className="mr-2 h-5 w-5 text-primary" />
                    Kraftstoffeffizienz
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Optimierung des Kraftstoffverbrauchs durch effizientere Verbrennung. Bei gleichbleibender Fahrweise
                    können Sie bis zu 10% Kraftstoff einsparen.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h3>Rechtliche Aspekte und TÜV-Konformität</h3>
            <p>
              Alle unsere Motoroptimierungen werden unter strikter Einhaltung der gesetzlichen Vorgaben durchgeführt.
              Wir stellen sicher, dass:
            </p>
            <ul>
              <li>Die Abgasnormen und Emissionswerte eingehalten werden</li>
              <li>Die Betriebssicherheit des Fahrzeugs zu jeder Zeit gewährleistet ist</li>
              <li>Die Änderungen TÜV-konform und eintragungsfähig sind</li>
              <li>Sie alle notwendigen Dokumente für Versicherung und TÜV erhalten</li>
            </ul>

            <p>
              Nach der Optimierung erhalten Sie eine detaillierte Dokumentation aller vorgenommenen Änderungen sowie
              eine Bescheinigung für die Eintragung beim TÜV. Wir beraten Sie gerne zu den spezifischen Anforderungen
              für Ihr Fahrzeugmodell.
            </p>

            <h3>Unser Prozess</h3>
            <ol>
              <li>
                <strong>Fahrzeuganalyse:</strong> Umfassende Diagnose und Bewertung des aktuellen Zustands
              </li>
              <li>
                <strong>Individuelle Beratung:</strong> Besprechung der möglichen Optimierungen und Ihrer Wünsche
              </li>
              <li>
                <strong>Datensicherung:</strong> Backup der originalen Motorsteuerungsdaten
              </li>
              <li>
                <strong>Optimierung:</strong> Präzise Anpassung der ECU-Parameter
              </li>
              <li>
                <strong>Testphase:</strong> Umfangreiche Tests unter verschiedenen Betriebsbedingungen
              </li>
              <li>
                <strong>Dokumentation:</strong> Ausstellung aller notwendigen Unterlagen für TÜV und Versicherung
              </li>
            </ol>

            <div className="bg-primary/5 p-6 rounded-lg my-8 border border-primary/20">
              <h3 className="text-xl font-semibold mb-4">Häufig gestellte Fragen</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Verliere ich die Herstellergarantie durch eine Motoroptimierung?</h4>
                  <p className="text-gray-700">
                    Die Herstellergarantie kann bei Motoroptimierungen eingeschränkt werden. Wir beraten Sie individuell
                    zu diesem Thema und bieten bei Bedarf eine Anschlussgarantie für optimierte Komponenten an.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Ist die Optimierung für alle Fahrzeuge möglich?</h4>
                  <p className="text-gray-700">
                    Wir bieten Optimierungen für die meisten gängigen Fahrzeugmarken und -modelle an. Die Möglichkeiten
                    und das Potenzial variieren je nach Fahrzeugtyp und Motorisierung. Kontaktieren Sie uns für eine
                    individuelle Beratung.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Wie lange dauert eine Motoroptimierung?</h4>
                  <p className="text-gray-700">
                    Die Durchführung einer professionellen Motoroptimierung dauert in der Regel 2-4 Stunden, abhängig
                    vom Fahrzeugtyp und Umfang der Optimierung.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
            <h2 className="text-2xl font-bold mb-4">Interesse an einer professionellen Motoroptimierung?</h2>
            <p className="text-lg text-gray-700 mb-6">
              Unsere Experten beraten Sie gerne zu den Möglichkeiten für Ihr Fahrzeug und erstellen ein individuelles
              Angebot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/kontakt">
                  Jetzt beraten lassen
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/software-tuning">Weitere Leistungen entdecken</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
