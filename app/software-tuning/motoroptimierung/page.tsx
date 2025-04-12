"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Zap, AlertTriangle, Check, Gauge, BarChart, Fuel, Clock } from "lucide-react"

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

export default function Motoroptimierung() {
  const [activeTab, setActiveTab] = useState("overview")

  // Schema.org JSON-LD für SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Motoroptimierung",
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
      "Professionelle und TÜV-konforme Motoroptimierung für mehr Leistung, besseres Ansprechverhalten und optimierten Kraftstoffverbrauch.",
    serviceType: "Fahrzeug-Motoroptimierung",
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
            alt="Professionelle Motoroptimierung"
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
                <Badge className="bg-primary/20 text-primary border border-primary/30 mb-4">
                  TÜV-konforme Leistungssteigerung
                </Badge>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Motoroptimierung
              </motion.h1>

              <motion.p
                className="text-xl text-gray-300 mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Professionelle und TÜV-konforme Motoroptimierung für mehr Leistung, besseres Ansprechverhalten und
                optimierten Kraftstoffverbrauch.
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
                    alt="Professionelle Motoroptimierung"
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
        {/* Intro Section */}
        <FadeInSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Legale Leistungssteigerung für Ihr Fahrzeug</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Unsere professionelle Motoroptimierung verbessert die Leistung und Effizienz Ihres Fahrzeugs durch präzise
              Anpassungen der Motorsteuerung. Alle Optimierungen erfolgen unter strikter Einhaltung der gesetzlichen
              Vorschriften und sind TÜV-konform.
            </p>
            <div className="flex justify-center">
              <Badge variant="outline" className="text-primary border-primary">
                <AlertTriangle className="mr-2 h-4 w-4" />
                100% legal und TÜV-konform
              </Badge>
            </div>
          </div>
        </FadeInSection>

        {/* What is Motoroptimierung Section */}
        <section className="mb-16">
          <FadeInSection delay={0.2}>
            <Card className="border-2 border-transparent hover:border-primary/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Was ist Motoroptimierung?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Motoroptimierung, auch als Chiptuning oder ECU-Tuning bekannt, ist die gezielte Anpassung der
                  Motorsteuerungssoftware (ECU) Ihres Fahrzeugs. Durch präzise Modifikationen der Kennfelder werden
                  Leistungsreserven freigesetzt, die vom Hersteller aus verschiedenen Gründen nicht vollständig
                  ausgeschöpft wurden.
                </p>
                <p className="mb-4">
                  Bei der Motoroptimierung werden Parameter wie Einspritzmenge, Einspritzzeitpunkt, Ladedruck und
                  Zündzeitpunkt optimiert, um die Leistung und das Drehmoment zu erhöhen, das Ansprechverhalten zu
                  verbessern und in vielen Fällen sogar den Kraftstoffverbrauch zu reduzieren.
                </p>
                <p>
                  Unsere Optimierungen werden individuell auf Ihr Fahrzeug abgestimmt und berücksichtigen alle
                  technischen Spezifikationen und Sicherheitsparameter. Wir legen größten Wert auf die Langlebigkeit des
                  Motors und die Einhaltung aller gesetzlichen Vorschriften.
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
              <h2 className="text-3xl font-semibold mb-4">Vorteile der Motoroptimierung</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Entdecken Sie die zahlreichen Vorteile einer professionellen Motoroptimierung
              </p>
            </div>
          </FadeInSection>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Gauge className="h-10 w-10 text-primary" />,
                title: "Mehr Leistung",
                description: "Steigerung der Motorleistung und des Drehmoments für ein dynamischeres Fahrerlebnis",
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "Besseres Ansprechverhalten",
                description: "Direkteres Ansprechen des Motors auf Gaspedalbefehle für mehr Fahrspaß",
              },
              {
                icon: <Fuel className="h-10 w-10 text-primary" />,
                title: "Kraftstoffeinsparung",
                description: "Optimierter Verbrauch durch effizientere Verbrennung und bessere Drehmomentkurve",
              },
              {
                icon: <BarChart className="h-10 w-10 text-primary" />,
                title: "Optimierte Kennfelder",
                description: "Individuell angepasste Motorsteuerung für optimale Performance",
              },
              {
                icon: <AlertTriangle className="h-10 w-10 text-primary" />,
                title: "TÜV-konform",
                description: "Alle Optimierungen entsprechen den gesetzlichen Vorschriften und sind eintragungsfähig",
              },
              {
                icon: <Clock className="h-10 w-10 text-primary" />,
                title: "Schnelle Durchführung",
                description: "Die Optimierung ist in der Regel innerhalb weniger Stunden abgeschlossen",
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

        {/* Process Section */}
        <section className="mb-16">
          <FadeInSection delay={0.2}>
            <div className="text-center mb-12">
              <Badge className="mb-2">Unser Prozess</Badge>
              <h2 className="text-3xl font-semibold mb-4">So läuft die Motoroptimierung ab</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Transparenter Ablauf von der Beratung bis zur Fertigstellung
              </p>
            </div>
          </FadeInSection>

          <div className="grid gap-8 md:grid-cols-2">
            <FadeInSection delay={0.3}>
              <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Der Optimierungsprozess</CardTitle>
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
                        <h3 className="font-semibold mb-1">Fahrzeuganalyse & Beratung</h3>
                        <p className="text-sm text-muted-foreground">
                          Wir analysieren Ihr Fahrzeug und beraten Sie zu den Optimierungsmöglichkeiten und rechtlichen
                          Rahmenbedingungen.
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
                        <h3 className="font-semibold mb-1">Auslesen der Originaldaten</h3>
                        <p className="text-sm text-muted-foreground">
                          Wir lesen die originalen Steuergerätedaten aus und sichern diese als Backup.
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
                        <h3 className="font-semibold mb-1">Individuelle Programmierung</h3>
                        <p className="text-sm text-muted-foreground">
                          Unsere Experten optimieren die Kennfelder individuell für Ihr Fahrzeug unter Berücksichtigung
                          aller technischen Parameter.
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
                        <h3 className="font-semibold mb-1">Aufspielen & Testfahrt</h3>
                        <p className="text-sm text-muted-foreground">
                          Die optimierte Software wird aufgespielt und bei einer Testfahrt überprüft.
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
                        <h3 className="font-semibold mb-1">Dokumentation & Garantie</h3>
                        <p className="text-sm text-muted-foreground">
                          Sie erhalten eine detaillierte Dokumentation der Optimierung und unsere Garantie.
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
                  <CardTitle>Rechtliche Aspekte & TÜV-Konformität</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Alle unsere Motoroptimierungen für den Straßenverkehr werden unter strikter Einhaltung der
                    gesetzlichen Vorschriften durchgeführt und sind TÜV-konform. Wir stellen sicher, dass:
                  </p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Die Abgasnormen eingehalten werden",
                      "Die Betriebserlaubnis des Fahrzeugs erhalten bleibt",
                      "Die Verkehrssicherheit zu keinem Zeitpunkt beeinträchtigt wird",
                      "Alle Sicherheitssysteme unverändert funktionieren",
                      "Die Optimierung eintragungsfähig ist",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mb-4">
                    Auf Wunsch unterstützen wir Sie bei der Eintragung der Leistungssteigerung in die Fahrzeugpapiere
                    und stellen alle notwendigen Unterlagen zur Verfügung.
                  </p>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">
                        Wir führen keine illegalen Manipulationen wie das Entfernen von Partikelfiltern, Katalysatoren
                        oder Abschaltung von Sicherheitssystemen durch. Solche Eingriffe sind gesetzlich verboten und
                        können zu erheblichen rechtlichen Konsequenzen führen.
                      </p>
                    </div>
                  </div>
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
                Antworten auf die häufigsten Fragen zur Motoroptimierung
              </p>
            </div>
          </FadeInSection>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                question: "Ist die Motoroptimierung legal?",
                answer:
                  "Ja, unsere Motoroptimierungen für den Straßenverkehr sind vollständig legal und TÜV-konform. Wir stellen sicher, dass alle gesetzlichen Vorschriften eingehalten werden und die Betriebserlaubnis des Fahrzeugs erhalten bleibt.",
              },
              {
                question: "Verliere ich die Herstellergarantie?",
                answer:
                  "Eine Motoroptimierung kann Auswirkungen auf die Herstellergarantie haben. Viele Hersteller behalten sich das Recht vor, Garantieansprüche abzulehnen, wenn diese in direktem Zusammenhang mit der Optimierung stehen. Wir bieten jedoch eine eigene Garantie auf unsere Leistungen an.",
              },
              {
                question: "Wie viel Mehrleistung ist möglich?",
                answer:
                  "Die mögliche Leistungssteigerung hängt vom Fahrzeugtyp und Motor ab. Bei Dieselmotoren sind typischerweise 20-30% mehr Leistung und Drehmoment möglich, bei Turbobenzinern 15-25%. Wir beraten Sie gerne individuell zu den Möglichkeiten Ihres Fahrzeugs.",
              },
              {
                question: "Muss die Optimierung eingetragen werden?",
                answer:
                  "Ja, eine Leistungssteigerung muss in der Regel in die Fahrzeugpapiere eingetragen werden. Wir unterstützen Sie bei diesem Prozess und stellen alle notwendigen Unterlagen für die Eintragung beim TÜV zur Verfügung.",
              },
              {
                question: "Wie lange dauert die Optimierung?",
                answer:
                  "Die Durchführung der Motoroptimierung dauert in der Regel 2-3 Stunden. Bei komplexeren Fahrzeugen oder zusätzlichen Leistungen kann es auch etwas länger dauern.",
              },
              {
                question: "Kann ich die Optimierung rückgängig machen?",
                answer:
                  "Ja, wir sichern vor jeder Optimierung die originalen Steuergerätedaten. Die Optimierung kann jederzeit rückgängig gemacht werden, indem die Originaldaten wieder aufgespielt werden.",
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
                  <h2 className="text-3xl font-bold mb-4">Bereit für mehr Leistung?</h2>
                  <p className="text-lg text-gray-300 mb-8">
                    Kontaktieren Sie uns noch heute für eine individuelle Beratung zu unseren Motoroptimierungen. Unser
                    Expertenteam steht Ihnen gerne zur Verfügung.
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
