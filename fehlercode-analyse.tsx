"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Shield, AlertTriangle, CheckCircle, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function FehlercodeAnalyse() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Professionelle Fehlercode-Analyse"
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Fehlercode-Analyse</h1>
            <p className="text-xl text-gray-300 mb-8">
              Professionelles Auslesen und Beheben von Fehlercodes für optimale Fahrzeugleistung
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2>Präzise Diagnose und Behebung von Fahrzeugfehlern</h2>

            <p>
              Moderne Fahrzeuge sind mit komplexen elektronischen Systemen ausgestattet, die kontinuierlich überwacht
              werden. Bei Unregelmäßigkeiten speichert das Fahrzeug Fehlercodes, die wertvolle Hinweise auf mögliche
              Probleme geben. Bei ErsatzteilPartner24 bieten wir eine umfassende Fehlercode-Analyse mit modernster
              Diagnosetechnik, um diese Codes präzise zu interpretieren und gezielte Lösungen anzubieten.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg my-8 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="mr-2 h-5 w-5 text-primary" />
                Unsere Grundsätze
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </span>
                  <span>Ausschließlich legale Diagnose und Fehlerbehebung</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </span>
                  <span>Keine Manipulation von sicherheitsrelevanten Systemen</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </span>
                  <span>Vollständige Transparenz über alle durchgeführten Maßnahmen</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </span>
                  <span>Einhaltung aller gesetzlichen Vorgaben und Herstellerrichtlinien</span>
                </li>
              </ul>
            </div>

            <h3>Professionelle Fehlerdiagnose</h3>
            <p>
              Unsere Fehlercode-Analyse umfasst das Auslesen aller im Fahrzeug gespeicherten Fehlercodes mittels
              herstellerspezifischer Diagnosegeräte. Im Gegensatz zu einfachen OBD-Scannern ermöglichen unsere
              professionellen Systeme Zugriff auf alle Steuergeräte und liefern detaillierte Informationen zu:
            </p>
            <ul>
              <li>Motorsteuerung und Antriebsstrang</li>
              <li>Fahrwerk und Bremssystemen</li>
              <li>Komfort- und Sicherheitssystemen</li>
              <li>Infotainment und Fahrerassistenzsystemen</li>
            </ul>

            <h3>Unser Leistungsumfang</h3>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Fehlercode-Auslesen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Vollständiges Auslesen aller Fehlercodes aus sämtlichen Steuergeräten Ihres Fahrzeugs mit
                    professioneller Diagnosetechnik. Detaillierte Erklärung der gefundenen Fehler und ihrer möglichen
                    Ursachen.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    Fehlercode-Löschen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Fachgerechtes Löschen von nicht sicherheitsrelevanten Fehlercodes nach erfolgreicher Behebung der
                    Ursache. Wir löschen keine Fehlercodes ohne vorherige Analyse und Behebung des Grundproblems.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg my-8 border border-yellow-200">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-yellow-800">Wichtiger Hinweis</h3>
                  <p className="text-yellow-800">
                    Wir führen <strong>keine</strong> Manipulation von Abgaswerten, Sicherheitssystemen oder anderen
                    gesetzlich vorgeschriebenen Funktionen durch. Das Löschen von Fehlercodes erfolgt ausschließlich
                    nach fachgerechter Behebung der Ursache und nur bei nicht sicherheitsrelevanten Systemen. Wir
                    behalten uns vor, Anfragen abzulehnen, die gegen gesetzliche Bestimmungen verstoßen würden.
                  </p>
                </div>
              </div>
            </div>

            <h3>Wann ist eine Fehlercode-Analyse sinnvoll?</h3>
            <p>Eine professionelle Fehlercode-Analyse ist in folgenden Situationen besonders empfehlenswert:</p>
            <ul>
              <li>Bei Aufleuchten der Motorkontrollleuchte oder anderer Warnleuchten</li>
              <li>Bei ungewöhnlichem Fahrverhalten oder Leistungsverlust</li>
              <li>Nach Reparaturen, um den Erfolg zu überprüfen</li>
              <li>Vor dem Kauf eines Gebrauchtfahrzeugs</li>
              <li>Als regelmäßige Vorsorge, um Probleme frühzeitig zu erkennen</li>
            </ul>

            <h3>Unser Prozess</h3>
            <ol>
              <li>
                <strong>Erstgespräch:</strong> Besprechung der Symptome und Ihrer Beobachtungen
              </li>
              <li>
                <strong>Diagnose:</strong> Umfassendes Auslesen aller Steuergeräte mit professioneller Technik
              </li>
              <li>
                <strong>Analyse:</strong> Fachkundige Interpretation der ausgelesenen Fehlercodes
              </li>
              <li>
                <strong>Beratung:</strong> Erläuterung der Ergebnisse und Empfehlung geeigneter Maßnahmen
              </li>
              <li>
                <strong>Behebung:</strong> Gezielte Reparatur oder Einstellung zur Beseitigung der Fehlerursache
              </li>
              <li>
                <strong>Kontrolle:</strong> Abschließende Überprüfung und Dokumentation
              </li>
            </ol>

            <div className="bg-primary/5 p-6 rounded-lg my-8 border border-primary/20">
              <h3 className="text-xl font-semibold mb-4">Häufig gestellte Fragen</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Kann jeder Fehlercode gelöscht werden?</h4>
                  <p className="text-gray-700">
                    Nein. Wir löschen Fehlercodes nur, wenn die zugrundeliegende Ursache behoben wurde. Fehlercodes in
                    sicherheitsrelevanten Systemen werden ausschließlich nach fachgerechter Reparatur zurückgesetzt. Das
                    einfache Löschen ohne Behebung der Ursache kann zu Folgeschäden führen und ist bei
                    sicherheitsrelevanten Systemen nicht zulässig.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Wie unterscheidet sich Ihre Diagnose von günstigen OBD-Scannern?</h4>
                  <p className="text-gray-700">
                    Einfache OBD-Scanner können nur auf die grundlegenden Motorfunktionen zugreifen und liefern oft nur
                    Fehlercodes ohne detaillierte Erklärungen. Unsere professionellen Diagnosegeräte bieten Zugang zu
                    allen Steuergeräten des Fahrzeugs, können Live-Daten auslesen und ermöglichen eine präzise
                    Fehleranalyse durch herstellerspezifische Diagnosefunktionen.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Wie lange dauert eine Fehlercode-Analyse?</h4>
                  <p className="text-gray-700">
                    Eine umfassende Fehlercode-Analyse dauert in der Regel 30-60 Minuten, abhängig von der Komplexität
                    des Fahrzeugs und der Anzahl der Fehlercodes. Die Behebung der festgestellten Probleme kann je nach
                    Art und Umfang zusätzliche Zeit in Anspruch nehmen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
            <h2 className="text-2xl font-bold mb-4">Probleme mit Ihrem Fahrzeug?</h2>
            <p className="text-lg text-gray-700 mb-6">
              Unsere Experten führen eine professionelle Fehlercode-Analyse durch und helfen Ihnen, die Ursachen zu
              beheben. Vereinbaren Sie jetzt einen Termin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/kontakt">
                  Termin vereinbaren
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
