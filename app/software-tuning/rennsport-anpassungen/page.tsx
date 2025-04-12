"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, AlertTriangle, Settings, Check, Gauge, Zap, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SchemaJsonLd } from "@/components/schema-json-ld"
import { Separator } from "@/components/ui/separator"

// Animierter Abschnitt mit Fade-In-Effekt
const FadeInSection = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function RennsportAnpassungen() {
  const [activeTab, setActiveTab] = useState("overview")

  // Schema.org JSON-LD für SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Rennsport-Anpassungen",
    provider: {
      "@type": "LocalBusiness",
      name: "ErsatzteilPartner24",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Dietrich Bonhoeffer Str. 4",
        addressLocality: "Winsen Luhe",
        postalCode: "21423",
        addressCountry: "DE",
      },
      telephone: "01705345350",
      email: "info@ersatzteilpartner24.de",
    },
    description:
      "Spezielle Software-Anpassungen für den Einsatz im Motorsport. Maximale Leistung und optimale Abstimmung für Rennstrecken. Nicht für den öffentlichen Straßenverkehr zugelassen.",
    serviceType: "Motorsport-Software-Optimierung",
  }

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Schema.org JSON-LD */}
      <SchemaJsonLd data={schemaData} />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Rennsport-Anpassungen für Motorsportfahrzeuge"
            fill
            className="object-cover object-center opacity-40"
            sizes="100vw"
            quality={85}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
        </div>

        {/* Animated light effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-[1px] bg-primary/30"
            animate={{
              y: ["-100%", "100vh"],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 5,
            }}
          />
          <motion.div
            className="absolute -left-20 top-1/3 w-40 h-40 rounded-full bg-primary/20 blur-3xl"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Button
                  variant="outline"
                  className="mb-8 bg-white/10 text-white border-white hover:bg-white/20"
                  asChild
                >
                  <Link href="/software-tuning">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Zurück zur Übersicht
                  </Link>
                </Button>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <Badge className="bg-red-500/20 text-red-500 border border-red-500/30 mb-4">Nur für Motorsport</Badge>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Rennsport-Anpassungen
              </motion.h1>

              <motion.p
                className="text-xl text-gray-300 mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Spezielle Software-Anpassungen für den Einsatz im Motorsport. Maximale Leistung und optimale Abstimmung
                für Rennstrecken. Nicht für den öffentlichen Straßenverkehr zugelassen.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 relative overflow-hidden group">
                  <a href="#benefits">
                    <span className="relative z-10">Vorteile entdecken</span>
                    <ChevronRight className="ml-2 h-4 w-4 relative z-10" />
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-orange-600 to-primary"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-white/10 text-white border-2 border-white/20 hover:bg-white/20"
                >
                  <a href="#contact">
                    <span>Kontakt aufnehmen</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            </div>

            <motion.div
              className="md:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-orange-500/30 rounded-xl blur-xl opacity-70"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [0.98, 1.02, 0.98],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <div className="relative rounded-xl overflow-hidden border-2 border-primary/20 shadow-lg">
                <div className="relative" style={{ paddingTop: "75%" }}>
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Rennsport-Anpassungen für Motorsportfahrzeuge"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Legal Warning Section */}
        <FadeInSection>
          <Card className="border-2 border-red-500/20 mb-16">
            <CardHeader className="bg-red-500/10">
              <CardTitle className="flex items-center text-red-500">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Wichtiger rechtlicher Hinweis
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="font-bold text-lg mb-4">
                Die hier beschriebenen Rennsport-Anpassungen sind ausschließlich für den Einsatz im Motorsport auf
                abgesperrten Strecken konzipiert und nicht für den öffentlichen Straßenverkehr zugelassen.
              </p>
              <p className="mb-4">
                Die Nutzung dieser Anpassungen im öffentlichen Straßenverkehr ist illegal und kann folgende Konsequenzen
                haben:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-6 text-red-700">
                <li>Erlöschen der Betriebserlaubnis des Fahrzeugs</li>
                <li>Verlust des Versicherungsschutzes</li>
                <li>Ordnungswidrigkeiten- oder Strafverfahren</li>
                <li>Beschlagnahme des Fahrzeugs</li>
                <li>Gefährdung der Verkehrssicherheit</li>
              </ul>
              <p>
                Wir bieten diese Anpassungen ausschließlich für registrierte Motorsportfahrzeuge an und setzen voraus,
                dass unsere Kunden die rechtlichen Rahmenbedingungen kennen und einhalten.
              </p>
            </CardContent>
          </Card>
        </FadeInSection>

        {/* Intro Section */}
        <FadeInSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Spezielle Anpassungen für maximale Rennstrecken-Performance</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Unsere Rennsport-Anpassungen sind speziell für den Einsatz im Motorsport entwickelt und bieten maximale
              Leistung und optimale Abstimmung für Rennstrecken. Wir passen die Software Ihres Fahrzeugs individuell an
              Ihre spezifischen Anforderungen und die Bedingungen der jeweiligen Rennstrecke an.
            </p>
            <div className="flex justify-center">
              <Badge variant="outline" className="text-red-500 border-red-500">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Ausschließlich für den Motorsport
              </Badge>
            </div>
          </div>
        </FadeInSection>

        {/* What are Rennsport-Anpassungen Section */}
        <section className="mb-16">
          <FadeInSection delay={0.2}>
            <Card className="border-2 border-transparent hover:border-primary/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Was sind Rennsport-Anpassungen?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Rennsport-Anpassungen sind spezielle Modifikationen der Motorsteuerungssoftware (ECU), die auf
                  maximale Leistung und optimale Performance auf der Rennstrecke ausgerichtet sind. Im Gegensatz zu
                  straßenzugelassenen Optimierungen werden hier Parameter wie Leistungsbegrenzungen,
                  Drehzahlbegrenzungen und Emissionskontrollen für den reinen Renneinsatz angepasst.
                </p>
                <p className="mb-4">
                  Diese Anpassungen ermöglichen es, das volle Potenzial des Motors auszuschöpfen, ohne Rücksicht auf
                  Faktoren wie Langlebigkeit im Alltagsbetrieb, Kraftstoffverbrauch oder Emissionsvorschriften nehmen zu
                  müssen. Die Software wird speziell auf die Anforderungen des Motorsports und die spezifischen
                  Bedingungen der jeweiligen Rennstrecke abgestimmt.
                </p>
                <p>
                  Unsere Rennsport-Anpassungen werden individuell für jedes Fahrzeug entwickelt und können je nach
                  Bedarf verschiedene Aspekte wie Leistungssteigerung, Ansprechverhalten, Drehzahlverhalten, Launch
                  Control, Anti-Lag-Systeme und vieles mehr umfassen.
                </p>
              </CardContent>
            </Card>
          </FadeInSection>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="mb-16">
          <FadeInSection delay={0.2}>
            <div className="text-center mb-12">
              <Badge className="mb-2">Ihre Vorteile</Badge>
              <h2 className="text-3xl font-semibold mb-4">Vorteile der Rennsport-Anpassungen</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Entdecken Sie die zahlreichen Vorteile unserer speziellen Motorsport-Optimierungen
              </p>
            </div>
          </FadeInSection>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Gauge className="h-10 w-10 text-primary" />,
                title: "Maximale Leistung",
                description: "Ausschöpfung des vollen Potenzials Ihres Motors für maximale Rennstrecken-Performance",
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "Optimiertes Ansprechverhalten",
                description: "Direktes und aggressives Ansprechen für schnellere Reaktionen auf der Rennstrecke",
              },
              {
                icon: <Settings className="h-10 w-10 text-primary" />,
                title: "Spezielle Rennfunktionen",
                description: "Launch Control, Anti-Lag, Flat-Shift und weitere spezielle Motorsport-Funktionen",
              },
              {
                icon: <Clock className="h-10 w-10 text-primary" />,
                title: "Streckenspezifische Abstimmung",
                description: "Individuelle Anpassung an die spezifischen Anforderungen verschiedener Rennstrecken",
              },
              {
                icon: <Settings className="h-10 w-10 text-primary" />,
                title: "Mehrere Kennfelder",
                description: "Möglichkeit, zwischen verschiedenen Abstimmungen je nach Bedingungen zu wechseln",
              },
              {
                icon: <Check className="h-10 w-10 text-primary" />,
                title: "Professionelle Umsetzung",
                description: "Durchführung durch erfahrene Motorsport-Experten mit langjähriger Erfahrung",
              },
            ].map((item, index) => (
              <FadeInSection key={index} delay={0.3 + index * 0.1}>
                <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">{item.icon}</div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* Available Modifications Section */}
        <section className="mb-16">
          <FadeInSection delay={0.2}>
            <div className="text-center mb-12">
              <Badge className="mb-2">Anpassungsmöglichkeiten</Badge>
              <h2 className="text-3xl font-semibold mb-4">Verfügbare Rennsport-Modifikationen</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Übersicht der möglichen Anpassungen für Ihr Motorsportfahrzeug
              </p>
            </div>
          </FadeInSection>

          <div className="grid gap-8 md:grid-cols-2">
            <FadeInSection delay={0.3}>
              <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Leistungsoptimierungen</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Extreme Leistungssteigerung ohne Rücksicht auf Emissionsvorschriften",
                      "Anpassung von Einspritzmenge, Einspritzzeitpunkt und Zündzeitpunkt",
                      "Optimierung des Ladedrucks für maximale Leistung",
                      "Entfernung von Leistungsbegrenzungen",
                      "Erhöhung oder Entfernung der Drehzahlbegrenzung",
                      "Anpassung der Drehmomentkurve für optimale Rennstrecken-Performance",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection delay={0.4}>
              <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Spezielle Rennfunktionen</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Launch Control für optimale Starts",
                      "Anti-Lag-System für minimale Turbo-Verzögerung",
                      "Flat-Shift für schnellere Gangwechsel ohne Gaswegnahme",
                      "Schaltblitz und Drehzahlanzeige für optimale Schaltzeitpunkte",
                      "Deaktivierung von ABS und Traktionskontrolle für Rennstrecken",
                      "Spezielle Kennfelder für verschiedene Streckenbedingungen",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </FadeInSection>
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-16">
          <FadeInSection delay={0.2}>
            <div className="text-center mb-12">
              <Badge className="mb-2">Unser Prozess</Badge>
              <h2 className="text-3xl font-semibold mb-4">So läuft die Rennsport-Anpassung ab</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Transparenter Ablauf von der Beratung bis zur Fertigstellung
              </p>
            </div>
          </FadeInSection>

          <div className="grid gap-8 md:grid-cols-2">
            <FadeInSection delay={0.3}>
              <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Der Anpassungsprozess</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                          1
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Beratung & Anforderungsanalyse</h3>
                        <p className="text-sm text-muted-foreground">
                          Wir besprechen Ihre spezifischen Anforderungen und die geplante Nutzung des Fahrzeugs.
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                          2
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Fahrzeuganalyse & Auslesen der Originaldaten</h3>
                        <p className="text-sm text-muted-foreground">
                          Wir analysieren Ihr Fahrzeug und lesen die originalen Steuergerätedaten aus.
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                          3
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Entwicklung der Rennsport-Software</h3>
                        <p className="text-sm text-muted-foreground">
                          Unsere Experten entwickeln eine maßgeschneiderte Software für Ihre Motorsport-Anforderungen.
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                          4
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Aufspielen & Grundeinstellung</h3>
                        <p className="text-sm text-muted-foreground">
                          Die optimierte Software wird aufgespielt und grundlegend eingestellt.
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                          5
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Feinabstimmung & Tests</h3>
                        <p className="text-sm text-muted-foreground">
                          Die Software wird auf der Rennstrecke oder dem Prüfstand fein abgestimmt und getestet.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>

            <FadeInSection delay={0.4}>
              <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Rechtliche Aspekte & Sicherheit</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Bei unseren Rennsport-Anpassungen legen wir größten Wert auf Transparenz bezüglich der rechtlichen
                    Rahmenbedingungen:
                  </p>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">
                        <strong>Wichtiger Hinweis:</strong> Die hier angebotenen Rennsport-Anpassungen sind
                        ausschließlich für den Einsatz im Motorsport auf abgesperrten Strecken konzipiert. Die Nutzung
                        im öffentlichen Straßenverkehr ist illegal und führt zum Erlöschen der Betriebserlaubnis des
                        Fahrzeugs.
                      </p>
                    </div>
                  </div>
                  <p className="mb-4">Wir stellen sicher, dass:</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Sie vollständig über die rechtlichen Konsequenzen informiert werden",
                      "Die Anpassungen nur für nachweislich im Motorsport eingesetzte Fahrzeuge durchgeführt werden",
                      "Die Sicherheit des Fahrzeugs im Renneinsatz gewährleistet bleibt",
                      "Alle Anpassungen dokumentiert und transparent dargestellt werden",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    Wir behalten uns vor, Aufträge abzulehnen, wenn wir den Verdacht haben, dass die Anpassungen im
                    öffentlichen Straßenverkehr eingesetzt werden sollen.
                  </p>
                </CardContent>
              </Card>
            </FadeInSection>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <FadeInSection delay={0.2}>
            <div className="text-center mb-12">
              <Badge className="mb-2">FAQ</Badge>
              <h2 className="text-3xl font-semibold mb-4">Häufig gestellte Fragen</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Antworten auf die häufigsten Fragen zu Rennsport-Anpassungen
              </p>
            </div>
          </FadeInSection>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                question: "Für welche Fahrzeuge sind Rennsport-Anpassungen geeignet?",
                answer:
                  "Unsere Rennsport-Anpassungen sind für speziell für den Motorsport vorbereitete Fahrzeuge geeignet. Wir bieten Anpassungen für verschiedene Fahrzeugtypen an, darunter Tourenwagen, GT-Fahrzeuge, Rallyefahrzeuge und Dragster. Die Eignung hängt von der technischen Basis des Fahrzeugs und den geplanten Einsatzbedingungen ab.",
              },
              {
                question: "Wie viel Mehrleistung ist möglich?",
                answer:
                  "Die mögliche Leistungssteigerung hängt stark vom Fahrzeugtyp, Motor und den vorhandenen Modifikationen ab. Bei Rennsport-Anpassungen können je nach Fahrzeug Leistungssteigerungen von 30-50% oder mehr erreicht werden. Wir beraten Sie gerne individuell zu den Möglichkeiten Ihres spezifischen Fahrzeugs.",
              },
              {
                question: "Kann ich zwischen verschiedenen Abstimmungen wechseln?",
                answer:
                  "Ja, wir können mehrere Kennfelder für verschiedene Einsatzbedingungen programmieren, zwischen denen Sie wechseln können. Dies ist besonders nützlich für unterschiedliche Streckenbedingungen, Wetterverhältnisse oder Rennklassen. Die Umschaltung erfolgt in der Regel über einen Schalter im Fahrzeug oder per Software.",
              },
              {
                question: "Sind zusätzliche Hardware-Modifikationen notwendig?",
                answer:
                  "Für optimale Ergebnisse sind in vielen Fällen zusätzliche Hardware-Modifikationen empfehlenswert oder sogar notwendig. Dazu können verstärkte Motorkomponenten, verbesserte Kühlsysteme, Sportauspuffanlagen oder spezielle Rennsport-ECUs gehören. Wir beraten Sie gerne zu den empfohlenen Modifikationen für Ihr spezifisches Projekt.",
              },
              {
                question: "Wie lange dauert die Entwicklung einer Rennsport-Abstimmung?",
                answer:
                  "Die Entwicklung einer maßgeschneiderten Rennsport-Abstimmung ist ein komplexer Prozess, der je nach Fahrzeug und gewünschten Funktionen zwischen 1-3 Tagen dauern kann. Für die optimale Feinabstimmung sind in der Regel mehrere Testläufe auf der Rennstrecke oder dem Prüfstand erforderlich.",
              },
              {
                question: "Kann ich die Anpassungen rückgängig machen?",
                answer:
                  "Ja, wir sichern vor jeder Anpassung die originalen Steuergerätedaten. Die Anpassungen können jederzeit rückgängig gemacht werden, indem die Originaldaten wieder aufgespielt werden. Dies ist wichtig, falls das Fahrzeug später wieder im Straßenverkehr zugelassen werden soll.",
              },
            ].map((item, index) => (
              <FadeInSection key={index} delay={0.3 + index * 0.1}>
                <Card className="border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="mb-16">
          <FadeInSection delay={0.2}>
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-grid-white/5 bg-grid-8"></div>
              <motion.div
                className="absolute -left-20 top-1/3 w-60 h-60 rounded-full bg-primary/20 blur-3xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
              <div className="relative z-10 p-8 md:p-12">
                <div className="max-w-3xl mx-auto text-center text-white">
                  <h2 className="text-3xl font-bold mb-4">Bereit für maximale Rennstrecken-Performance?</h2>
                  <p className="text-lg text-gray-300 mb-8">
                    Kontaktieren Sie uns noch heute für eine individuelle Beratung zu unseren Rennsport-Anpassungen.
                    Unser Expertenteam steht Ihnen gerne zur Verfügung.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                      <Link href="#contact">
                        Kontakt aufnehmen
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="bg-white/10 text-white border-2 border-white/20 hover:bg-white/20"
                    >
                      <Link href="tel:01705345350">
                        <span>01705345350</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>
      </div>
    </div>
  )
}
