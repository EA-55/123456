"use client"

import Image from "next/image"
import Link from "next/link"
import { Package, PhoneCall, ChevronRight, Mail, MapPin, Clock, Truck, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const images = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Download-CqRiTGZ61dtZ0EZkKgRVMmFtpwvHYY.jpeg",
    "/placeholder.svg?height=1080&width=1920",
    "/placeholder.svg?height=1080&width=1920",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentImage] || "/placeholder.svg"}
            alt="Slider image"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Qualitäts-Ersatzteile für Ihr Fahrzeug
        </h1>
        <p className="mt-4 max-w-[700px] text-lg sm:text-xl md:text-2xl">
          Große Auswahl an hochwertigen Autoteilen zu fairen Preisen
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            as="a"
            href="https://shop.ersatzteilpartner24.de"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary/90"
          >
            Zum Online-Shop
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            as="a"
            href="#contact"
            className="text-white border-white hover:bg-white/10"
          >
            Kontakt aufnehmen
            <ChevronRight className="ml-2 h-4 w-4" />
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

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/autopartner24_3-MUIweDkQmdOJ4fuLvbLdnfy5leqtmt.png"
            alt="ErsatzteilPartner24 Logo"
            width={200}
            height={50}
            className="h-auto w-40"
          />
          <nav className="hidden space-x-6 md:flex">
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              Über uns
            </Link>
            <Link href="#products" className="text-sm font-medium hover:text-primary transition-colors">
              Produkte
            </Link>
            <Link href="#brands" className="text-sm font-medium hover:text-primary transition-colors">
              Marken
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Kontakt
            </Link>
          </nav>
          <Button
            as="a"
            href="https://shop.ersatzteilpartner24.de"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white hover:bg-primary/90"
          >
            Zum Shop
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

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

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Unser Sortiment</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6">
              <Package className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Bremsen & Fahrwerk</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Bremsscheiben</li>
                <li>Bremsbeläge</li>
                <li>Stoßdämpfer</li>
                <li>Federn</li>
              </ul>
            </Card>
            <Card className="p-6">
              <Package className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Motor & Antrieb</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Riemen & Rollen</li>
                <li>Wasserpumpen</li>
                <li>Ölfilter</li>
                <li>Zündkerzen</li>
              </ul>
            </Card>
            <Card className="p-6">
              <Package className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Karosserie</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Stoßstangen</li>
                <li>Kotflügel</li>
                <li>Spiegel</li>
                <li>Beleuchtung</li>
              </ul>
            </Card>
            <Card className="p-6">
              <Package className="h-10 w-10 text-primary mb-4" />
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
              <form className="space-y-4">
                <div className="space-y-2">
                  <Input placeholder="Name" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Input type="email" placeholder="E-Mail" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Input type="tel" placeholder="Telefon" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Textarea placeholder="Ihre Nachricht" className="min-h-[120px] resize-none" />
                </div>
                <Button type="submit" className="w-full">
                  Nachricht senden
                </Button>
              </form>
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
            <Button
              size="lg"
              as="a"
              href="https://shop.ersatzteilpartner24.de"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white hover:bg-primary/90"
            >
              Zum Online-Shop
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-12 border-t">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/autopartner24_3-MUIweDkQmdOJ4fuLvbLdnfy5leqtmt.png"
                alt="ErsatzteilPartner24 Logo"
                width={150}
                height={40}
                className="h-auto w-32"
              />
              <p className="mt-4 text-sm text-muted-foreground">Ihr zuverlässiger Partner für Kfz-Ersatzteile</p>
            </div>
            <div>
              <h3 className="font-bold">Schnelllinks</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Über uns
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Produkte
                  </Link>
                </li>
                <li>
                  <Link href="#brands" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Marken
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Kontakt
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold">Rechtliches</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/impressum"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link href="/agb" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    AGB
                  </Link>
                </li>
                <li>
                  <Link
                    href="/datenschutz"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Datenschutz
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ErsatzteilPartner24. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
