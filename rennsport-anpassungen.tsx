"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Shield, AlertTriangle, CheckCircle, FileText, Flag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RennsportAnpassungen() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Rennsport-Anpassungen für Motorsport-Fahrzeuge"
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Rennsport-Anpassungen</h1>
            <p className="text-xl text-gray-300 mb-8">
              Spezialisierte Optimierungen ausschließlich für den Motorsport und Offroad-Einsatz
            </p>
          </div>
        </div>
      </div>

      {/* Legal Warning Banner */}
      <div className="bg-red-50 border-y border-red-200">
        <div className="container mx-auto px-4 py-4">
          <Alert variant="destructive" className="bg-red-50 border-red-300">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle className="text-red-800 font-bold">Wichtiger rechtlicher Hinweis</AlertTitle>
            <AlertDescription className="text-red-800">
              Die hier beschriebenen Anpassungen sind ausschließlich für Rennfahrzeuge und Offroad-Einsatz konzipiert
              und im öffentlichen Straßenverkehr <strong>nicht zulässig</strong>. Die Nutzung modifizierter Fahrzeuge
              auf öffentlichen Straßen kann zu Bußgeldern, Punkten, Verlust der Betriebserlaubnis und
              Versicherungsschutz führen.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2>Spezialisierte Anpassungen für maximale Leistung im Motorsport</h2>

            <p>
              Für den ambitionierten Motorsport bieten wir bei ErsatzteilPartner24 spezialisierte Anpassungen, die das
              volle Potenzial Ihres Rennfahrzeugs freisetzen. Unsere Experten verfügen über umfassende Erfahrung in der
              Optimierung von Fahrzeugen für Rennstrecken, Rallye-Events und andere Motorsportveranstaltungen.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg my-8 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="mr-2 h-5 w-5 text-primary" />
                Unsere Motorsport-Expertise
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </span>
                  <span>Jahrelange Erfahrung in der Rennwagen-Optimierung</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </span>
                  <span>Zusammenarbeit mit professionellen Rennteams</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </span>
                  <span>Modernste Diagnose- und Programmiergeräte</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </span>
                  <span>Umfassendes Verständnis der technischen Anforderungen verschiedener Rennklassen</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg my-8 border border-red-200">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-red-800">Rechtlicher Hinweis</h3>
                  <p className="text-red-800">
                    Wir weisen ausdrücklich darauf hin, dass alle hier beschriebenen Anpassungen
                    <strong>
                      {" "}
                      ausschließlich für den Einsatz auf privaten Rennstrecken, bei Motorsportveranstaltungen oder im
                      Offroad-Bereich{" "}
                    </strong>{" "}
                    bestimmt sind. Die Nutzung im öffentlichen Straßenverkehr ist illegal und kann zu erheblichen
                    rechtlichen Konsequenzen führen, darunter:
                  </p>
                  <ul className="mt-2 space-y-1 text-red-800">
                    <li>• Erlöschen der Betriebserlaubnis des Fahrzeugs</li>
                    <li>• Verlust des Versicherungsschutzes</li>
                    <li>• Hohe Bußgelder und Punkte in Flensburg</li>
                    <li>• Strafverfahren bei Unfällen oder Kontrollen</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3>Unsere Rennsport-Anpassungen</h3>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Flag className="mr-2 h-5 w-5 text-primary" />
                    Leistungsoptimierung für Rennfahrzeuge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Maximale Leistungssteigerung durch umfassende Anpassung der Motorsteuerung. Optimierung von
                    Einspritzung, Zündzeitpunkt, Ladedruck und Drosselklappenansteuerung für höchste Performance auf der
                    Rennstrecke.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Deaktivierung von Motorsport-Limitierungen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Für den reinen Rennsporteinsatz bieten wir die Deaktivierung von leistungsbegrenzenden Systemen wie
                    Drehzahlbegrenzern oder elektronischen Geschwindigkeitsbegrenzungen.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h3>Spezielle Anpassungen für Offroad-Fahrzeuge</h3>
            <p>
              Für Offroad-Fahrzeuge, die ausschließlich im Gelände eingesetzt werden, bieten wir spezialisierte
              Anpassungen, die auf die besonderen Anforderungen des Geländefahrens abgestimmt sind:
            </p>
            <ul>
              <li>Optimierung des Drehmomentverlaufs für bessere Traktion im Gelände</li>
              <li>Anpassung der Motorcharakteristik für extreme Steigungen und schwieriges Terrain</li>
              <li>Spezielle Kalibrierungen für Wettbewerbsfahrzeuge im Offroad-Sport</li>
            </ul>

            <h3>Unser Prozess für Rennsport-Anpassungen</h3>
            <ol>
              <li>
                <strong>Ausführliche Beratung:</strong> Besprechung der Einsatzzwecke und technischen Anforderungen
              </li>
              <li>
                <strong>Technische Analyse:</strong> Bewertung des aktuellen Fahrzeugzustands und Optimierungspotenzials
              </li>
              <li>
                <strong>Individuelle Anpassung:</strong> Maßgeschneiderte Programmierung für Ihren spezifischen
                Einsatzzweck
              </li>
              <li>
                <strong>Testphase:</strong> Umfangreiche Tests unter simulierten Rennbedingungen
              </li>
              <li>
                <strong>Feinabstimmung:</strong> Präzise Justierung basierend auf den Testergebnissen
              </li>
              <li>
                <strong>Dokumentation:</strong> Detaillierte Aufzeichnung aller vorgenommenen Änderungen
              </li>
            </ol>

            <div className="bg-primary/5 p-6 rounded-lg my-8 border border-primary/20">
              <h3 className="text-xl font-semibold mb-4">Häufig gestellte Fragen</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">
                    Kann ich mein Fahrzeug nach einer Rennsport-Anpassung wieder für den Straßenverkehr umrüsten?
                  </h4>
                  <p className="text-gray-700">
                    Ja, in den meisten Fällen ist eine Rückrüstung auf die Straßenverkehrszulassung möglich. Wir
                    speichern die originalen Fahrzeugdaten vor jeder Anpassung und können diese bei Bedarf
                    wiederherstellen. Bitte beachten Sie, dass bei umfangreichen mechanischen Modifikationen zusätzliche
                    Maßnahmen erforderlich sein können.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Bieten Sie auch mechanische Anpassungen für Rennfahrzeuge an?</h4>
                  <p className="text-gray-700">
                    Ja, neben den elektronischen Optimierungen bieten wir in Zusammenarbeit mit unseren
                    Partnerwerkstätten auch mechanische Modifikationen wie Fahrwerksanpassungen, Bremsenupgrades und
                    Motorumbauten an. Sprechen Sie uns für ein individuelles Angebot an.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Welche Dokumente benötige ich für eine Rennsport-Anpassung?</h4>
                  <p className="text-gray-700">
                    Für Rennsport-Anpassungen benötigen wir einen Nachweis, dass das Fahrzeug für den Motorsport oder
                    ausschließlich auf Privatgelände eingesetzt wird. Dies kann durch eine Rennlizenz,
                    Teilnahmebestätigungen an Motorsportveranstaltungen oder eine schriftliche Erklärung erfolgen. Zudem
                    benötigen wir den Fahrzeugschein und einen gültigen Ausweis des Fahrzeughalters.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
            <h2 className="text-2xl font-bold mb-4">Interesse an Rennsport-Anpassungen?</h2>
            <p className="text-lg text-gray-700 mb-6">
              Unsere Motorsport-Experten beraten Sie gerne zu den Möglichkeiten für Ihr Rennfahrzeug und erstellen ein
              individuelles Angebot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/kontakt">
                  Beratungstermin vereinbaren
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
