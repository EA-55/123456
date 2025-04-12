"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, AlertTriangle, FileText, Check, Search, Wrench, Zap } from "lucide-react"

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

export default function FehlercodeAnalyse() {
  const [activeTab, setActiveTab] = useState("overview")

  // Schema.org JSON-LD für SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Fehlercode-Analyse",
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
      "Professionelle Fehlercode-Analyse und Diagnose für alle Fahrzeugtypen. Präzise Fehlersuche und effektive Lösungen für Ihr Fahrzeug.",
    serviceType: "Fahrzeug-Diagnose",
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
            alt="Professionelle Fehlercode-Analyse"
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
                  Professionelle Diagnose
                </Badge>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Fehlercode-Analyse
              </motion.h1>

              <motion.p
                className="text-xl text-gray-300 mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Professionelle Fehlercode-Analyse und Diagnose für alle Fahrzeugtypen. Präzise Fehlersuche und effektive
                Lösungen für Ihr Fahrzeug.
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
                    alt="Professionelle Fehlercode-Analyse"
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
            <h2 className="text-3xl font-bold mb-6">Professionelle Fehlerdiagnose für Ihr Fahrzeug</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Unsere professionelle Fehlercode-Analyse identifiziert präzise die Ursachen von Störungen in Ihrem
              Fahrzeug. Mit modernster Diagnosetechnik und umfassendem Fachwissen bieten wir effektive Lösungen für alle
              Fahrzeugtypen.
            </p>
            <div className="flex justify-center">
              <Badge variant="outline" className="text-primary border-primary">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Keine Manipulation von Sicherheitssystemen
              </Badge>
            </div>
          </div>
        </FadeInSection>

        {/* What is Fehlercode-Analyse Section */}
        <section className="mb-16">
          <FadeInSection delay={0.2}>
            <Card className="border-2 border-transparent hover:border-primary/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Was ist eine Fehlercode-Analyse?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Die Fehlercode-Analyse ist ein diagnostisches Verfahren, bei dem die im Fahrzeug gespeicherten
                  Fehlercodes ausgelesen und interpretiert werden. Moderne Fahrzeuge verfügen über zahlreiche
                  elektronische Steuergeräte, die kontinuierlich die Funktionen des Fahrzeugs überwachen und bei
                  Abweichungen Fehlercodes speichern.
                </p>
                <p className="mb-4">
                  Mit speziellen Diagnosegeräten können wir auf diese Fehlercodes zugreifen und sie präzise auswerten.
                  Dies ermöglicht uns, die genaue Ursache von Störungen zu identifizieren, ohne zeitaufwändige und
                  kostspielige Fehlersuche durch Ausprobieren.
                </p>
                <p>
                  Unsere Fehlercode-Analyse geht weit über das einfache Auslesen von Codes hinaus. Wir interpretieren
                  die Daten fachkundig, führen bei Bedarf erweiterte Diagnoseverfahren durch und bieten konkrete
                  Lösungsvorschläge für die festgestellten Probleme.
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
              <h2 className="text-3xl font-semibold mb-4">Vorteile der Fehlercode-Analyse</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Entdecken Sie die zahlreichen Vorteile einer professionellen Fehlercode-Analyse
              </p>
            </div>
          </FadeInSection>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Search className="h-10 w-10 text-primary" />,
                title: "Präzise Diagnose",
                description: "Genaue Identifikation der Fehlerursachen ohne zeitaufwändiges Ausprobieren",
              },
              {
                icon: <FileText className="h-10 w-10 text-primary" />,
                title: "Umfassende Analyse",
                description: "Auslesen aller Steuergeräte für ein vollständiges Bild des Fahrzeugzustands",
              },
              {
                icon: <Wrench className="h-10 w-10 text-primary" />,
                title: "Effektive Lösungen",
                description: "Konkrete Handlungsempfehlungen zur Behebung der festgestellten Probleme",
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "Schnelle Durchführung",
                description: "Die Analyse ist in der Regel innerhalb von 30-60 Minuten abgeschlossen",
              },
              {
                icon: <AlertTriangle className="h-10 w-10 text-primary" />,
                title: "Vorbeugende Wartung",
                description: "Frühzeitige Erkennung potenzieller Probleme bevor größere Schäden entstehen",
              },
              {
                icon: <Check className="h-10 w-10 text-primary" />,
                title: "Für alle Fahrzeugtypen",
                description: "Kompatibel mit nahezu allen Fahrzeugmarken und -modellen",
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
              <h2 className="text-3xl font-semibold mb-4">So läuft die Fehlercode-Analyse ab</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Transparenter Ablauf von der Diagnose bis zur Lösungsfindung
              </p>
            </div>
          </FadeInSection>

          <div className="grid gap-8 md:grid-cols-2">
            <FadeInSection delay={0.3}>
              <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Der Diagnoseprozess</CardTitle>
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
                        <h3 className="font-semibold mb-1">Erstgespräch & Fehlerbeschreibung</h3>
                        <p className="text-sm text-muted-foreground">
                          Wir besprechen mit Ihnen die auftretenden Probleme und Symptome Ihres Fahrzeugs.
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
                        <h3 className="font-semibold mb-1">Auslesen der Fehlercodes</h3>
                        <p className="text-sm text-muted-foreground">
                          Mit modernster Diagnosetechnik lesen wir alle Steuergeräte Ihres Fahrzeugs aus.
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
                        <h3 className="font-semibold mb-1">Analyse & Interpretation</h3>
                        <p className="text-sm text-muted-foreground">
                          Unsere Experten analysieren und interpretieren die ausgelesenen Fehlercodes fachkundig.
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
                        <h3 className="font-semibold mb-1">Erweiterte Diagnose (bei Bedarf)</h3>
                        <p className="text-sm text-muted-foreground">
                          Bei komplexen Problemen führen wir zusätzliche Diagnoseverfahren durch.
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
                        <h3 className="font-semibold mb-1">Lösungsvorschläge & Beratung</h3>
                        <p className="text-sm text-muted-foreground">
                          Wir erläutern Ihnen die Ergebnisse und beraten Sie zu den möglichen Lösungen.
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
                    Bei unserer Fehlercode-Analyse legen wir größten Wert auf die Einhaltung aller gesetzlichen
                    Vorschriften und die Sicherheit Ihres Fahrzeugs. Wir stellen sicher, dass:
                  </p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Alle Diagnosearbeiten nach Herstellervorgaben durchgeführt werden",
                      "Keine Manipulation von Sicherheitssystemen erfolgt",
                      "Die Verkehrssicherheit zu keinem Zeitpunkt beeinträchtigt wird",
                      "Alle Datenschutzbestimmungen eingehalten werden",
                      "Keine illegalen Eingriffe in die Fahrzeugelektronik vorgenommen werden",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">
                        Wir führen keine illegalen Manipulationen wie das Zurücksetzen von Airbag-Fehlern ohne Behebung
                        der Ursache, Manipulation von Kilometerzählern oder Abschaltung von Sicherheitssystemen durch.
                        Solche Eingriffe sind gesetzlich verboten und können die Sicherheit Ihres Fahrzeugs gefährden.
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
                Antworten auf die häufigsten Fragen zur Fehlercode-Analyse
              </p>
            </div>
          </FadeInSection>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                question: "Für welche Fahrzeuge ist die Fehlercode-Analyse geeignet?",
                answer:
                  "Unsere Fehlercode-Analyse ist für nahezu alle Fahrzeugmarken und -modelle ab Baujahr 1996 (OBD-II-Standard) geeignet. Wir verfügen über spezielle Diagnosegeräte für verschiedene Hersteller, darunter VW, Audi, BMW, Mercedes, Ford, Opel, Toyota und viele mehr.",
              },
              {
                question: "Wie lange dauert eine Fehlercode-Analyse?",
                answer:
                  "Eine Standard-Fehlercode-Analyse dauert in der Regel 30-60 Minuten. Bei komplexeren Problemen oder wenn erweiterte Diagnoseverfahren erforderlich sind, kann es auch länger dauern. Wir informieren Sie vorab über den zu erwartenden Zeitaufwand.",
              },
              {
                question: "Kann ich während der Analyse dabei sein?",
                answer:
                  "Ja, Sie können gerne während der Analyse dabei sein. Unsere Techniker erklären Ihnen gerne die einzelnen Schritte und die gefundenen Fehlercodes. So erhalten Sie einen transparenten Einblick in den Zustand Ihres Fahrzeugs.",
              },
              {
                question: "Werden die Fehlercodes nach der Analyse gelöscht?",
                answer:
                  "Wir löschen die Fehlercodes nur, wenn die Ursache des Problems behoben wurde oder wenn Sie dies ausdrücklich wünschen. In vielen Fällen ist es sinnvoll, die Fehlercodes erst nach erfolgreicher Reparatur zu löschen, um zu überprüfen, ob das Problem tatsächlich behoben wurde.",
              },
              {
                question: "Kann ich mit der Fehlercode-Analyse die TÜV-Hauptuntersuchung bestehen?",
                answer:
                  "Die Fehlercode-Analyse kann helfen, Probleme zu identifizieren, die bei der HU zu Beanstandungen führen könnten. Durch die frühzeitige Erkennung und Behebung dieser Probleme erhöhen Sie die Chancen, die HU zu bestehen. Die Analyse selbst ersetzt jedoch nicht die HU.",
              },
              {
                question: "Was kostet eine Fehlercode-Analyse?",
                answer:
                  "Die Kosten für eine Fehlercode-Analyse hängen vom Fahrzeugtyp und dem Umfang der Analyse ab. Bitte kontaktieren Sie uns für ein individuelles Angebot. Bei anschließender Reparatur in unserem Betrieb können die Diagnosekosten teilweise oder vollständig angerechnet werden.",
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
                  <h2 className="text-3xl font-bold mb-4">Probleme mit Ihrem Fahrzeug?</h2>
                  <p className="text-lg text-gray-300 mb-8">
                    Kontaktieren Sie uns noch heute für eine professionelle Fehlercode-Analyse. Unser Expertenteam hilft
                    Ihnen, die Ursache schnell und präzise zu identifizieren.
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
