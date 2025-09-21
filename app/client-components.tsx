"use client"

import type React from "react"

import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  Package,
  PhoneCall,
  ChevronRight,
  Mail,
  MapPin,
  Clock,
  Truck,
  Search,
  Wrench,
  Gauge,
  Car,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

const ImageSlider = () => {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/Download-hILvCg7p5r1Bnbj5RrVb35tLuB6lJT.jpeg"
        alt="Hero image"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Qualitäts-Ersatzteile für Ihr Fahrzeug
        </h1>
        <p className="mt-4 max-w-[700px] text-lg sm:text-xl md:text-2xl">
          Große Auswahl an hochwertigen Autoteilen zu fairen Preisen
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
            <a href="https://ersatzteilpartner24.de" target="_blank" rel="noopener noreferrer">
              Zum Online-Shop
              <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-primary border-primary hover:bg-primary/10">
            <a href="#contact">
              Kontakt aufnehmen
              <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

const BrandSlider = () => {
  const brands = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-CsZnK0lDttfel9l9t0UNKTU5znIfkF.svg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-qP2aSDlegx8LTwNFSiqALtkojObEBu.svg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-JH412j14upUMvfRDE6Ql0flab6GlrC.svg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-JWqxZPuD3paBUjEHO1MwyCeTwSANYJ.svg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-XK5qls3TjUqreRmy9xrZZ0RcHjWJGo.svg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-GnlKovgXPIBe3kBUXvrT2tVaJHDuOs.svg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-0K2QitbmNpca3x1bTkpiZUdy8PxoVE.svg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9-ibCf5f5Qz3xryJIUk1d5aXrPUDGzbZ.svg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-gcXFhW4jIVsa2a45hrA77uIOFDFelT.svg",
  ]

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-8"
        animate={{
          x: [0, -1920],
        }}
        transition={{
          x: {
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
        }}
      >
        {[...brands, ...brands].map((brand, index) => (
          <div key={index} className="flex-shrink-0">
            <Image src={brand || "/placeholder.svg"} alt="Brand Logo" width={220} height={70} />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        alert("Nachricht erfolgreich gesendet!")
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        const errorData = await response.json()
        alert(`Fehler beim Senden der Nachricht: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Es gab einen Fehler beim Senden der Nachricht.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input placeholder="Name" className="h-12" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="E-Mail"
          className="h-12"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Input
          type="tel"
          placeholder="Telefon"
          className="h-12"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Textarea
          placeholder="Ihre Nachricht"
          className="min-h-[120px] resize-none"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Nachricht senden
      </Button>
    </form>
  )
}

export default function ClientComponents() {
  return (
    <>
      {/* Hero Section */}
      <ImageSlider />

      {/* About Us Section */}
      <section id="about" className="py-20 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
            Über ErsatzteilPartner24
          </h2>
          <p className="mt-4 text-center text-muted-foreground max-w-[800px] mx-auto">
            ErsatzteilPartner24 ist Ihr zuverlässiger Partner für hochwertige Kfz-Ersatzteile. Mit über 600.000 Artikeln
            für PKW, Motorrad und NFZ bieten wir europaweit eine der größten Auswahlen zu fairen Preisen.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 text-center">
              <Package className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">Große Auswahl</h3>
              <p className="mt-2 text-sm text-muted-foreground">600.000 Artikel für PKW, Motorrad und NFZ</p>
            </Card>
            <Card className="p-6 text-center">
              <Search className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">Schnelle Lieferung</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Bestellung bis 18 Uhr, Lieferung ab 7 Uhr am nächsten Tag
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Truck className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">Eigene Auslieferung</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Zuverlässige Lieferung durch unseren eigenen Lieferservice
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Manufacturers Section (previously Products Section) */}
      <section id="manufacturers" className="py-20">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Unsere Produkt Hersteller
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6">
              <Wrench className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Bremsen & Fahrwerk</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Bremsscheiben</li>
                <li>Bremsbeläge</li>
                <li>Stoßdämpfer</li>
                <li>Federn</li>
              </ul>
            </Card>
            <Card className="p-6">
              <Gauge className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Motor & Antrieb</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Riemen & Rollen</li>
                <li>Wasserpumpen</li>
                <li>Ölfilter</li>
                <li>Zündkerzen</li>
              </ul>
            </Card>
            <Card className="p-6">
              <Car className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Karosserie</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Stoßstangen</li>
                <li>Kotflügel</li>
                <li>Spiegel</li>
                <li>Beleuchtung</li>
              </ul>
            </Card>
            <Card className="p-6">
              <Zap className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Elektrik</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Sensoren</li>
                <li>Batterien</li>
                <li>Anlasser</li>
                <li>Lichtmaschinen</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="py-16 bg-white">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12">
            Unsere Marken
          </h2>
          <BrandSlider />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Kontaktieren Sie uns</h2>
            <p className="mt-4 text-muted-foreground max-w-[600px] mx-auto">
              Haben Sie Fragen zu unseren Produkten? Wir sind für Sie da.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <ContactForm />
            </Card>

            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Kontaktinformationen</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <PhoneCall className="h-5 w-5 text-primary" />
                      <span>01705345350</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <span>info@ersatzteilpartner24.de</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>Dietrich Bonhoeffer Str. 4, 21423 Winsen Luhe</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>Mo-Fr: 7:00 - 18:00 Uhr</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Finden Sie die passenden Teile für Ihr Fahrzeug
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground">
            Bestellen Sie bis 18 Uhr und erhalten Sie Ihre Teile am nächsten Morgen ab 7 Uhr
          </p>
          <div className="mt-8">
            <Button size="lg" asChild className="bg-primary text-white hover:bg-primary/90">
              <a href="https://ersatzteilpartner24.de" target="_blank" rel="noopener noreferrer">
                Zum Online-Shop
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
      <section id="motorinstandsetzung" className="py-20 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
          <div className="absolute inset-0 bg-black/70 mix-blend-multiply"></div>
        </div>

        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
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
            <div className="relative rounded-xl overflow-hidden border-2 border-primary/20 shadow-2xl shadow-primary/20">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/adad-gJwxGZOBilEJGRkyOPkmGszUnRiygq.png"
                alt="Professionelle Motorinstandsetzung - Hochleistungsmotor"
                width={800}
                height={600}
                className="object-cover w-full aspect-[4/3]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 text-white">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
              Professionelle Motorinstandsetzung
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Wir bieten Ihnen eine professionelle Motorinstandsetzung für alle Fahrzeugtypen. Unsere erfahrenen
              Mechaniker verwenden modernste Technologien und hochwertige Ersatzteile.
            </p>
            <div className="grid gap-4 md:grid-cols-2 mb-8">
              {[
                "Detaillierte Diagnose und Fehlerbehebung",
                "Professionelle Reinigung aller Komponenten",
                "Verwendung von Original-Ersatzteilen",
                "Umfassende Qualitätssicherung",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-300">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link href="/motorinstandsetzung">
                  Mehr erfahren
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                asChild
                className="bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 transition-colors"
              >
                <a href="#contact">
                  Kontakt aufnehmen
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
