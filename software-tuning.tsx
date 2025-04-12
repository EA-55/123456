"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Zap, FileText, Flag, ArrowRight, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SoftwareTuning() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Software & Tuning Services"
            fill
            className="object-cover object-center opacity-40"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary border border-primary/30">
              Professionelle Dienstleistungen
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Software & Tuning</h1>
            <p className="text-xl text-gray-300 mb-8">
              Spezialisierte Fahrzeugoptimierung und Diagnose mit modernster Technik
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/kontakt">
                  Beratungstermin vereinbaren
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-center">Unsere Software & Tuning Dienstleistungen</h2>
            <p className="text-center text-muted-foreground">
              Bei ErsatzteilPartner24 bieten wir professionelle Software- und Tuning-Dienstleistungen für Ihr Fahrzeug.
              Unser erfahrenes Team nutzt modernste Technologie und umfassendes Fachwissen, um optimale Ergebnisse zu
              erzielen – immer unter Berücksichtigung aller rechtlichen Vorgaben.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mb-16">
            <Card className="border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Motoroptimierung</CardTitle>
                <CardDescription>Legale Leistungssteigerung und Effizienzoptimierung</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Professionelle ECU-Optimierung für mehr Leistung, besseres Ansprechverhalten und optimierten
                  Kraftstoffverbrauch – alles TÜV-konform und mit Garantie.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/software-tuning/motoroptimierung">
                    Mehr erfahren
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Fehlercode-Analyse</CardTitle>
                <CardDescription>Professionelle Diagnose und Fehlerbehebung</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Präzises Auslesen und Interpretieren von Fehlercodes mit herstellerspezifischer Diagnosetechnik für
                  eine zielgerichtete Problemlösung.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/software-tuning/fehlercode-analyse">
                    Mehr erfahren
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Flag className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Rennsport-Anpassungen</CardTitle>
                <CardDescription>Spezialisierte Optimierungen für den Motorsport</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Maßgeschneiderte Anpassungen für Rennfahrzeuge und Offroad-Einsatz – ausschließlich für den Motorsport
                  und nicht im öffentlichen Straßenverkehr.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/software-tuning/rennsport-anpassungen">
                    Mehr erfahren
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 mb-16">
            <h3 className="text-2xl font-bold mb-4">Unsere Expertise</h3>
            <p className="text-muted-foreground mb-6">
              Unser Team verfügt über jahrelange Erfahrung in der Fahrzeugoptimierung und arbeitet mit modernster
              Diagnosetechnik. Wir legen größten Wert auf Qualität, Zuverlässigkeit und die Einhaltung aller rechtlichen
              Vorgaben.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <span>Zertifizierte Techniker mit umfassender Ausbildung</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <span>Herstellerspezifische Diagnosegeräte und Software</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <span>Regelmäßige Weiterbildung zu neuesten Technologien</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <span>Umfassende Dokumentation aller durchgeführten Arbeiten</span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary/5 p-8 rounded-lg border border-primary/20 text-center">
            <h2 className="text-2xl font-bold mb-4">Interesse an unseren Dienstleistungen?</h2>
            <p className="text-lg text-gray-700 mb-6">
              Kontaktieren Sie uns für eine individuelle Beratung oder vereinbaren Sie direkt einen Termin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/kontakt">
                  Kontakt aufnehmen
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:+4917012345678">+49 170 1234 5678</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
