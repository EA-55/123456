"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Zap, AlertTriangle, FileText, Settings, Gauge } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SchemaJsonLd } from "@/components/schema-json-ld"

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

export default function SoftwareTuning() {
  const [activeTab, setActiveTab] = useState("overview")

  // Schema.org JSON-LD für SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Software & Tuning",
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
      "Professionelle Software-Optimierung und Tuning für Ihr Fahrzeug. Motoroptimierung, Fehlercode-Analyse und Rennsport-Anpassungen von zertifizierten Experten.",
    serviceType: "Fahrzeug-Software-Optimierung",
  }

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Schema.org JSON-LD */}
      <SchemaJsonLd data={schemaData} />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/adad-FppmyQe7v138OXuvvJYsgLRTBgx8KQ.png"
            alt="Professionelle Software-Optimierung und Tuning"
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
          <motion.div
            className="absolute -right-20 bottom-1/3 w-60 h-60 rounded-full bg-orange-500/20 blur-3xl"
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
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
                  <Link href="/">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Zurück zur Startseite
                  </Link>
                </Button>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <Badge className="bg-primary/20 text-primary border border-primary/30 mb-4">
                  Professioneller Service
                </Badge>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Software & Tuning
              </motion.h1>

              <motion.p
                className="text-xl text-gray-300 mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Professionelle Software-Optimierung und Tuning für Ihr Fahrzeug. Steigern Sie Leistung und Effizienz mit
                unseren maßgeschneiderten Lösungen.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 relative overflow-hidden group">
                  <a href="#services">
                    <span className="relative z-10">Unsere Leistungen</span>
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
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/adad-FppmyQe7v138OXuvvJYsgLRTBgx8KQ.png"
                    alt="Professionelle Software-Optimierung und Tuning"
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
            <h2 className="text-3xl font-bold mb-6">Maßgeschneiderte Software-Lösungen für Ihr Fahrzeug</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Unser Team aus zertifizierten Experten bietet Ihnen professionelle Software-Optimierungen und
              Tuning-Lösungen für Ihr Fahrzeug. Wir setzen auf modernste Technologie und jahrelange Erfahrung, um die
              Leistung und Effizienz Ihres Fahrzeugs zu verbessern.
            </p>
            <div className="flex justify-center">
              <Badge variant="outline" className="text-primary border-primary">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Alle Leistungen werden unter Einhaltung der gesetzlichen Vorschriften durchgeführt
              </Badge>
            </div>
          </div>
        </FadeInSection>

        {/* Services Section */}
        <section id="services" className="mb-16">
          <FadeInSection delay={0.2}>
            <div className="text-center mb-12">
              <Badge className="mb-2">Unsere Leistungen</Badge>
              <h2 className="text-3xl font-semibold mb-4">Software & Tuning Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Entdecken Sie unsere professionellen Dienstleistungen im Bereich Software und Tuning
              </p>
            </div>
          </FadeInSection>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Motoroptimierung Card */}
            <FadeInSection delay={0.3}>
              <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-lg overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Motoroptimierung"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-primary/80 text-white">Legal & TÜV-konform</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gauge className="mr-2 h-5 w-5 text-primary" />
                    Motoroptimierung
                  </CardTitle>
                  <CardDescription>Leistungssteigerung & Effizienzverbesserung</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Professionelle ECU-Optimierung für mehr Leistung, besseres Ansprechverhalten und reduzierten
                    Kraftstoffverbrauch. Alle Anpassungen sind TÜV-konform und legal für den Straßenverkehr.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/software-tuning/motoroptimierung">
                      Mehr erfahren
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </FadeInSection>

            {/* Fehlercode-Analyse Card */}
            <FadeInSection delay={0.4}>
              <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-lg overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Fehlercode-Analyse"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-primary/80 text-white">Professionelle Diagnose</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Fehlercode-Analyse
                  </CardTitle>
                  <CardDescription>Diagnose & Fehlerbehebung</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Professionelles Auslesen und Analysieren von Fehlercodes mit modernster Diagnosetechnik. Wir
                    identifizieren Probleme präzise und bieten effektive Lösungen zur Behebung.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/software-tuning/fehlercode-analyse">
                      Mehr erfahren
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </FadeInSection>

            {/* Rennsport-Anpassungen Card */}
            <FadeInSection delay={0.5}>
              <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-lg overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Rennsport-Anpassungen"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-red-500/80 text-white">Nur für Motorsport</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5 text-primary" />
                    Rennsport-Anpassungen
                  </CardTitle>
                  <CardDescription>Spezielle Motorsport-Optimierungen</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Spezielle Software-Anpassungen für den Einsatz im Motorsport. Maximale Leistung und optimale
                    Abstimmung für Rennstrecken. Nicht für den öffentlichen Straßenverkehr zugelassen.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/software-tuning/rennsport-anpassungen">
                      Mehr erfahren
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </FadeInSection>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <FadeInSection delay={0.2}>
            <div className="text-center mb-12">
              <Badge className="mb-2">Ihre Vorteile</Badge>
              <h2 className="text-3xl font-semibold mb-4">Warum Sie uns vertrauen können</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Profitieren Sie von unserer Expertise und modernster Technologie
              </p>
            </div>
          </FadeInSection>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "Zertifizierte Experten",
                description: "Unser Team besteht aus zertifizierten Fachleuten mit jahrelanger Erfahrung",
              },
              {
                icon: <Settings className="h-10 w-10 text-primary" />,
                title: "Modernste Technologie",
                description: "Wir arbeiten mit den neuesten Diagnose- und Programmiergeräten",
              },
              {
                icon: <FileText className="h-10 w-10 text-primary" />,
                title: "Rechtliche Sicherheit",
                description: "Alle Straßenverkehrs-Optimierungen sind TÜV-konform und legal",
              },
              {
                icon: <Gauge className="h-10 w-10 text-primary" />,
                title: "Maßgeschneiderte Lösungen",
                description: "Individuelle Anpassungen für Ihr spezifisches Fahrzeug und Ihre Bedürfnisse",
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

        {/* Legal Notice Section */}
        <section className="mb-16">
          <FadeInSection delay={0.2}>
            <Card className="border-2 border-yellow-500/20">
              <CardHeader className="bg-yellow-500/10">
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                  Wichtiger rechtlicher Hinweis
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-4">
                  Alle unsere Leistungen im Bereich Motoroptimierung und Fehlercode-Analyse für den Straßenverkehr
                  werden unter strikter Einhaltung der gesetzlichen Vorschriften durchgeführt. Wir legen größten Wert
                  auf die Verkehrssicherheit und Umweltverträglichkeit Ihres Fahrzeugs.
                </p>
                <p className="mb-4">
                  Unsere Rennsport-Anpassungen sind ausschließlich für den Einsatz im Motorsport auf abgesperrten
                  Strecken konzipiert und nicht für den öffentlichen Straßenverkehr zugelassen. Die Nutzung solcher
                  Anpassungen im Straßenverkehr ist illegal und kann zum Erlöschen der Betriebserlaubnis, des
                  Versicherungsschutzes sowie zu rechtlichen Konsequenzen führen.
                </p>
                <p>
                  Wir beraten Sie gerne ausführlich zu den rechtlichen Rahmenbedingungen und helfen Ihnen, die für Ihre
                  Bedürfnisse passende und legale Lösung zu finden.
                </p>
              </CardContent>
            </Card>
          </FadeInSection>
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
                    Kontaktieren Sie uns noch heute für eine individuelle Beratung zu unseren Software & Tuning
                    Leistungen. Unser Expertenteam steht Ihnen gerne zur Verfügung.
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
