"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import {
  ChevronLeft,
  Wrench,
  Gauge,
  Shield,
  ArrowRight,
  Check,
  PenToolIcon as Tool,
  Settings,
  FileCheck,
  Award,
} from "lucide-react"
import dynamic from "next/dynamic"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Image from "next/image"
import React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { FormSuccessDialog } from "@/components/form-success-dialog"
import { SchemaJsonLd } from "@/components/schema-json-ld"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Dynamically import the 3D engine component to avoid SSR issues
const Engine3DView = dynamic(() => import("@/components/Engine3DView"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full bg-gray-200 rounded-lg">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  ),
})

const FeatureCard = React.memo(({ icon: Icon, title, description }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <Icon className="h-7 w-7 text-primary" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
})

const ProcessStep = React.memo(({ number, title, description }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="flex gap-4"
    >
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
          {number}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
})

const formSchema = z.object({
  name: z.string().min(2, { message: "Name muss mindestens 2 Zeichen lang sein." }),
  email: z.string().email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }),
  phone: z.string().min(5, { message: "Telefonnummer muss mindestens 5 Zeichen lang sein." }),
  carModel: z.string().min(2, { message: "Fahrzeugmodell muss angegeben werden." }),
  carYear: z.string().min(4, { message: "Baujahr muss angegeben werden." }),
  engineType: z.string().min(2, { message: "Motortyp muss angegeben werden." }),
  vin: z.string().optional(),
  description: z.string().min(10, { message: "Beschreibung muss mindestens 10 Zeichen lang sein." }),
})

export default function MotorinstandsetzungClient() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      carModel: "",
      carYear: "",
      engineType: "",
      vin: "",
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/motor-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Ein Fehler ist aufgetreten")
      }

      // Speichern der Motoranfrage im localStorage für den Admin-Bereich
      const motorInquiry = {
        id: data.id || Math.random().toString(36).substring(2, 15),
        type: "motor",
        data: values,
        timestamp: new Date().toISOString(),
        status: "new",
      }

      const existingInquiries = JSON.parse(localStorage.getItem("motorInquiries") || "[]")
      existingInquiries.push(motorInquiry)
      localStorage.setItem("motorInquiries", JSON.stringify(existingInquiries))

      form.reset()
      setShowSuccessDialog(true)
    } catch (error) {
      console.error("Fehler beim Senden des Formulars:", error)
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Schema.org JSON-LD für Motorinstandsetzung
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Motorinstandsetzung",
    serviceType: "Kfz-Motorreparatur",
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
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 53.3594,
        longitude: 10.2122,
      },
      geoRadius: "50000",
    },
    description:
      "Fachgerechte Motorinstandsetzung für alle Fahrzeugtypen. Komplette Überholung, Leistungsoptimierung und Qualitätssicherung durch zertifizierte Meisterbetriebe.",
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "PriceSpecification",
        description: "Preis abhängig vom Fahrzeugtyp und Umfang der Arbeiten",
      },
    },
  }

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Schema.org JSON-LD */}
      <SchemaJsonLd data={schemaData} />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
        {/* Update the background image */}
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/adad-gJwxGZOBilEJGRkyOPkmGszUnRiygq.png"
            alt="Professioneller Hochleistungsmotor"
            fill
            className="object-cover object-center"
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
              repeat: 2,
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
                Professionelle Motorinstandsetzung
              </motion.h1>

              <motion.p
                className="text-xl text-gray-300 mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Unsere Motorinstandsetzung wird durch unseren Partner, Avci KFZ Technik, einen zertifizierten
                Meisterbetrieb mit jahrelanger Erfahrung, durchgeführt.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 relative overflow-hidden group">
                  <a href="#contact">
                    <span className="relative z-10">Anfrage stellen</span>
                    <ArrowRight className="ml-2 h-4 w-4 relative z-10" />
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
                  <a href="#services">
                    <span>Leistungen entdecken</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-6 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-primary/20 p-1.5 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-gray-300">Zertifizierte Fachleute</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-primary/20 p-1.5 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-gray-300">Modernste Technik</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-primary/20 p-1.5 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-gray-300">Garantierte Qualität</span>
                </div>
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
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/adad-gJwxGZOBilEJGRkyOPkmGszUnRiygq.png"
                    alt="Professioneller Hochleistungsmotor - Detailansicht"
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
        {/* Navigation Tabs */}
        <Tabs defaultValue="overview" className="mb-12" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3 mb-8">
            <TabsTrigger value="overview" className="text-sm md:text-base">
              <FileCheck className="mr-2 h-4 w-4 hidden md:inline" />
              Überblick
            </TabsTrigger>
            <TabsTrigger value="services" className="text-sm md:text-base">
              <Wrench className="mr-2 h-4 w-4 hidden md:inline" />
              Leistungen
            </TabsTrigger>
            <TabsTrigger value="process" className="text-sm md:text-base">
              <Settings className="mr-2 h-4 w-4 hidden md:inline" />
              Ablauf
            </TabsTrigger>
          </TabsList>

          {activeTab === "overview" && (
            <TabsContent value="overview" forceMount>
              <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="order-2 md:order-1"
                >
                  <h2 className="text-3xl font-semibold mb-6">Unser Service für Sie</h2>
                  <p className="mb-6 text-muted-foreground">
                    Bei unserer Motorinstandsetzung setzen wir auf jahrelange Erfahrung und modernste Technik. Wir
                    bieten Ihnen eine umfassende Betreuung von der Diagnose bis zur Fertigstellung.
                  </p>
                  <div className="space-y-4 mb-8">
                    {[
                      "Gründliche Fehlerdiagnose mit modernster Technik",
                      "Professionelle Demontage und Reinigung aller Komponenten",
                      "Präzise Reparatur und Austausch von Verschleißteilen",
                      "Sorgfältige Montage und Einstellung nach Herstellervorgaben",
                      "Umfangreiche Qualitätskontrolle und Testläufe",
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      >
                        <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                  <Button asChild className="bg-primary hover:bg-primary/90 relative overflow-hidden group">
                    <a href="#contact">
                      <span className="relative z-10">Jetzt anfragen</span>
                      <ArrowRight className="ml-2 h-4 w-4 relative z-10" />
                    </a>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="order-1 md:order-2"
                >
                  <Card className="overflow-hidden border-2 border-primary/20 shadow-lg">
                    <CardHeader className="bg-primary/5 border-b border-primary/10">
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        Warum uns vertrauen?
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                            <Tool className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Meisterwerkstatt</h3>
                            <p className="text-sm text-muted-foreground">
                              Alle Arbeiten werden von zertifizierten Meistern durchgeführt
                            </p>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                            <Settings className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Modernste Technik</h3>
                            <p className="text-sm text-muted-foreground">
                              Wir arbeiten mit den neuesten Geräten und Diagnosesystemen
                            </p>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                            <Shield className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">Garantierte Qualität</h3>
                            <p className="text-sm text-muted-foreground">
                              Wir geben Garantie auf alle durchgeführten Arbeiten
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
          )}

          {activeTab === "services" && (
            <TabsContent value="services" forceMount id="services">
              <div className="mb-16">
                <div className="text-center mb-12">
                  <Badge className="mb-2">Unsere Leistungen</Badge>
                  <h2 className="text-3xl font-semibold mb-4">Umfassende Motorinstandsetzung</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Wir bieten professionelle Motorinstandsetzung für alle Fahrzeugtypen und Motorenarten
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                  <FeatureCard
                    icon={Wrench}
                    title="Zylinderkopfarbeiten"
                    description="Präzises Schleifen, Planen und Erneuern von Ventilsitzringen, Ventilführungen und Ventilen für optimale Leistung."
                  />
                  <FeatureCard
                    icon={Gauge}
                    title="Zylinderbearbeitung"
                    description="Professionelles Honen und Bohren von Zylindern für perfekte Passform und minimalen Ölverbrauch."
                  />
                  <FeatureCard
                    icon={Settings}
                    title="Kurbelwellenservice"
                    description="Fachgerechte Aufbereitung und Lagerung von Kurbelwellen für einen ruhigen Motorlauf und lange Lebensdauer."
                  />
                  <FeatureCard
                    icon={Tool}
                    title="Pleuelbearbeitung"
                    description="Präzises Richten und Bearbeiten von Pleuelstangen für optimale Kraftübertragung und Laufruhe."
                  />
                  <FeatureCard
                    icon={Gauge}
                    title="Motorblockarbeiten"
                    description="Planen und Druckprüfung von Motorblöcken zur Sicherstellung der Dichtheit und Stabilität."
                  />
                  <FeatureCard
                    icon={Shield}
                    title="Qualitätssicherung"
                    description="Umfangreiche Prüfverfahren und Testläufe zur Gewährleistung höchster Qualitätsstandards. Verwendung von hochwertigen Ersatzteilen nach Kundenwunsch"
                  />
                </div>
              </div>

              <div className="bg-gray-50 -mx-4 px-4 py-16 mt-16">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <Badge className="mb-2">Spezialisierungen</Badge>
                    <h2 className="text-3xl font-semibold mb-4">Motortypen & Fahrzeuge</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Wir sind auf verschiedene Motortypen und Fahrzeugmarken spezialisiert
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <Card className="border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                      <CardHeader>
                        <CardTitle>Motortypen</CardTitle>
                        <CardDescription>Wir bearbeiten alle gängigen Motortypen</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {[
                            "Benzinmotoren (Ottomotoren)",
                            "Dieselmotoren",
                            "Direkteinspritzer",
                            "Turbo- und Kompressormotoren",
                            "Hybridantriebe",
                            "Klassische Motoren",
                          ].map((item, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-primary" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                      <CardHeader>
                        <CardTitle>Fahrzeugmarken</CardTitle>
                        <CardDescription>Wir haben Erfahrung mit allen führenden Marken</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {[
                            "Volkswagen, Audi, Seat, Škoda",
                            "BMW, Mini",
                            "Mercedes-  Audi, Seat, Škoda",
                            "BMW, Mini",
                            "Mercedes-Benz, Smart",
                            "Ford, Opel",
                            "Toyota, Lexus",
                            "Renault, Dacia, Nissan",
                          ].map((item, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-primary" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          )}

          {activeTab === "process" && (
            <TabsContent value="process" forceMount>
              <div className="mb-16">
                <div className="text-center mb-12">
                  <Badge className="mb-2">Unser Prozess</Badge>
                  <h2 className="text-3xl font-semibold mb-4">So läuft die Motorinstandsetzung ab</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Transparenter Ablauf von der Anfrage bis zur Fertigstellung
                  </p>
                </div>

                <div className="max-w-3xl mx-auto">
                  <div className="relative border-l-2 border-primary/20 pl-8 ml-4 space-y-12">
                    <ProcessStep
                      number="1"
                      title="Anfrage & Versand"
                      description="Sie stellen eine Anfrage über unser Formular und versenden den Motor an uns. Wir bestätigen den Eingang Ihres Motors."
                    />
                    <ProcessStep
                      number="2"
                      title="Diagnose & Kostenvoranschlag"
                      description="Wir führen eine gründliche Diagnose durch und erstellen einen detaillierten Kostenvoranschlag mit allen notwendigen Arbeiten und Ersatzteilen."
                    />
                    <ProcessStep
                      number="3"
                      title="Besprechung & Freigabe"
                      description="Wir besprechen den Kostenvoranschlag mit Ihnen und beginnen mit den Arbeiten erst nach Ihrer Freigabe."
                    />
                    <ProcessStep
                      number="4"
                      title="Bearbeitung & Reparatur"
                      description="Wir führen alle notwendigen Bearbeitungen und Reparaturen durch, tauschen Verschleißteile aus und bereiten alle Komponenten fachgerecht auf."
                    />
                    <ProcessStep
                      number="5"
                      title="Montage & Qualitätskontrolle"
                      description="Der Motor wird sorgfältig nach Herstellervorgaben montiert und durchläuft umfangreiche Tests und Qualitätskontrollen."
                    />
                    <ProcessStep
                      number="6"
                      title="Rückversand & Garantie"
                      description="Der instandgesetzte Motor wird sicher an Sie zurückgesendet, inklusive Garantie auf alle durchgeführten Arbeiten."
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 -mx-4 px-4 py-16 mt-16">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <Badge className="mb-2">Häufige Fragen</Badge>
                    <h2 className="text-3xl font-semibold mb-4">FAQ zur Motorinstandsetzung</h2>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        question: "Wie lange dauert eine Motorinstandsetzung?",
                        answer:
                          "Die Dauer hängt vom Umfang der Arbeiten und der Verfügbarkeit der Ersatzteile ab. In der Regel dauert eine komplette Motorinstandsetzung zwischen 5 und 10 Arbeitstagen.",
                      },
                      {
                        question: "Gibt es eine Garantie auf die Arbeiten?",
                        answer:
                          "Ja, wir geben eine Garantie von 12 Monaten auf alle durchgeführten Arbeiten und verbauten Teile.",
                      },
                      {
                        question: "Kann ich auch nur Teilarbeiten durchführen lassen?",
                        answer:
                          "Ja, wir bieten auch einzelne Leistungen wie Zylinderkopfüberholung oder Kurbelwellenbearbeitung an. Wir beraten Sie gerne zu den sinnvollsten Maßnahmen.",
                      },
                      {
                        question: "Wie werden die Kosten berechnet?",
                        answer:
                          "Die Kosten setzen sich aus Arbeitszeit, Ersatzteilen und Materialien zusammen. Wir erstellen immer einen detaillierten Kostenvoranschlag vor Beginn der Arbeiten.",
                      },
                    ].map((item, index) => (
                      <Card
                        key={index}
                        className="border-2 border-transparent hover:border-primary/20 transition-all duration-300"
                      >
                        <CardHeader>
                          <CardTitle className="text-lg">{item.question}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{item.answer}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>

        {/* Contact Form Section */}
        <section id="contact" className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 -z-10"></div>
          <motion.div
            className="absolute -left-20 top-1/3 w-60 h-60 rounded-full bg-primary/10 blur-3xl"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
          <motion.div
            className="absolute -right-20 bottom-1/3 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl"
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />

          <div className="relative z-10">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <Badge className="mb-2 bg-primary/20 text-primary border border-primary/30">Kontakt</Badge>
                <h2 className="text-3xl font-semibold mb-4">Motorinstandsetzungsanfrage</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground">
                  Füllen Sie das Formular aus und wir werden uns umgehend bei Ihnen melden
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <Card className="max-w-2xl mx-auto border-2 border-transparent hover:border-primary/20 transition-all duration-300 shadow-lg bg-white/95 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-orange-500/10 border-b border-primary/10">
                  <CardTitle className="flex items-center gap-2">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Wrench className="h-5 w-5 text-primary" />
                    </div>
                    Ihre Anfrage
                  </CardTitle>
                  <CardDescription>Alle mit * markierten Felder sind Pflichtfelder</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Ihr Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-Mail</FormLabel>
                              <FormControl>
                                <Input placeholder="ihre-email@beispiel.de" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefon</FormLabel>
                            <FormControl>
                              <Input placeholder="Ihre Telefonnummer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="carModel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fahrzeugmodell</FormLabel>
                              <FormControl>
                                <Input placeholder="z.B. BMW 320d" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="carYear"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Baujahr</FormLabel>
                              <FormControl>
                                <Input placeholder="z.B. 2018" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="engineType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Motortyp</FormLabel>
                              <FormControl>
                                <Input placeholder="z.B. N47D20C" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="vin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fahrgestellnummer (VIN) - Optional</FormLabel>
                            <FormControl>
                              <Input placeholder="Ihre Fahrgestellnummer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Beschreibung des Problems</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Beschreiben Sie das Problem mit Ihrem Motor"
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Wird gesendet..." : "Anfrage senden"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Fügen Sie den Erfolgs-Dialog am Ende der Komponente hinzu */}
      <FormSuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        title="Motorinstandsetzungsanfrage erfolgreich gesendet"
        description="Vielen Dank für Ihre Anfrage. Unser Fachteam wird sich in Kürze bei Ihnen melden."
        formType="motor"
      />
    </div>
  )
}
