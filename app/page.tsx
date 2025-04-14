"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import dynamic from "next/dynamic"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { SchemaJsonLd } from "@/components/schema-json-ld"

// Dynamisches Laden der ClientComponents mit Suspense
const ClientComponents = dynamic(() => import("@/components/client-components"), {
  loading: () => <div className="min-h-[600px] flex items-center justify-center">Laden...</div>,
  ssr: true,
})

// Dynamisches Laden des MobileMenu
const MobileMenu = dynamic(() => import("@/components/mobile-menu"), {
  ssr: false,
})

// Subtiler Partikeleffekt für cinematisches Gefühl
const CinematicParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            x: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
            y: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
          }}
          transition={{
            duration: 20 + Math.random() * 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// Subtiler Lichtstrahl-Effekt
const CinematicLightRay = () => {
  return (
    <motion.div
      className="fixed top-0 left-1/2 w-[1px] h-0 bg-gradient-to-b from-primary/40 to-transparent pointer-events-none z-0"
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: ["0vh", "100vh", "0vh"],
        opacity: [0, 0.3, 0],
        left: ["48%", "52%", "48%"],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 15,
      }}
    />
  )
}

export default function Home() {
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8])
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98])
  const [menuOpen, setMenuOpen] = useState(false)

  // Schema.org JSON-LD für die Hauptseite
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name: "ErsatzteilPartner24",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/autopartner24_3-MUIweDkQmdOJ4fuLvbLdnfy5leqtmt.png",
    url: "https://tm1.carparts-cat.com/login/atevis",
    telephone: "01705345350",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dietrich Bonhoeffer Str. 4",
      addressLocality: "Winsen Luhe",
      postalCode: "21423",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.3594,
      longitude: 10.2122,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "13:30",
      },
    ],
    priceRange: "€€",
    description:
      "Ihr zuverlässiger Partner für hochwertige Kfz-Ersatzteile. Über 600.000 Artikel für PKW, Motorrad und NFZ zu fairen Preisen. Schnelle Lieferung am nächsten Tag.",
    sameAs: ["https://tm1.carparts-cat.com/login/atevis"],
    potentialAction: {
      "@type": "SearchAction",
      target: "https://tm1.carparts-cat.com/login/atevis/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Schema.org JSON-LD */}
      <SchemaJsonLd data={schemaData} />

      {/* Cinematische Hintergrundeffekte */}
      <CinematicParticles />
      <CinematicLightRay />
      <div className="fixed inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none z-0"></div>

      {/* Header */}
      <motion.header
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/autopartner24_3-MUIweDkQmdOJ4fuLvbLdnfy5leqtmt.png"
                alt="ErsatzteilPartner24 Logo - Kfz-Ersatzteile und Autozubehör"
                width={200}
                height={50}
                className="h-auto w-40"
                priority
              />
            </Link>
          </motion.div>
          <nav className="hidden space-x-6 md:flex">
            {[
              { href: "#about", label: "Über uns" },
              {
                href: "/motorinstandsetzung",
                label: "Motorinstandsetzung",
                isNew: true,
              },
              { href: "#brands", label: "Marken" },
              { href: "/arbeitszeiten-und-lieferung", label: "Arbeitszeiten & Lieferung" },
              { href: "/rueckgabe", label: "Rückgabe" },
              { href: "/reklamation", label: "Reklamation" },
              { href: "#contact", label: "Kontakt" },
            ].map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium hover:text-primary transition-colors relative group"
                >
                  {item.label}
                  {item.isNew && (
                    <motion.span
                      className="absolute -top-3 -right-6 text-red-500 text-xs font-bold transform rotate-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      Neu!
                    </motion.span>
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                className="bg-primary text-white hover:bg-primary/90 hidden md:flex relative overflow-hidden group"
              >
                <a href="https://tm1.carparts-cat.com/login/atevis" target="_blank" rel="noopener noreferrer">
                  <span className="relative z-10">Zum Shop</span>
                  <ChevronRight className="ml-2 h-4 w-4 relative z-10" />
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-orange-600 to-primary"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </a>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                className="bg-white text-primary hover:bg-white/90 hidden md:flex border-2 border-primary relative overflow-hidden group"
              >
                <Link href="/b2b-registrierung">
                  <span className="relative z-10">B2B Registrierung</span>
                  <ChevronRight className="ml-2 h-4 w-4 relative z-10" />
                  <motion.span
                    className="absolute inset-0 bg-primary"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.span
                    className="absolute inset-0 bg-primary mix-blend-difference"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </Link>
              </Button>
            </motion.div>
            <div className="md:hidden">
              <button
                className="flex items-center justify-center"
                onClick={() => setMenuOpen(true)}
                aria-label="Menü öffnen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </button>
            </div>
            {menuOpen && <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />}
          </div>
        </div>
      </motion.header>

      <ClientComponents />

      {/* Footer */}
      <footer className="bg-background py-12 border-t relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 opacity-20"></div>
        <div className="container relative z-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href="/">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/autopartner24_3-MUIweDkQmdOJ4fuLvbLdnfy5leqtmt.png"
                  alt="ErsatzteilPartner24 Logo - Kfz-Ersatzteile und Autozubehör"
                  width={150}
                  height={40}
                  className="h-auto w-32"
                />
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">Ihr zuverlässiger Partner für Kfz-Ersatzteile</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold">Schnelllinks</h3>
              <ul className="mt-4 space-y-2">
                {[
                  { href: "#about", label: "Über uns" },
                  { href: "/motorinstandsetzung", label: "Motorinstandsetzung" },
                  { href: "#brands", label: "Marken" },
                  { href: "/arbeitszeiten-und-lieferung", label: "Arbeitszeiten & Lieferung" },
                  { href: "/rueckgabe", label: "Rückgabe" },
                  { href: "/reklamation", label: "Reklamation" },
                  { href: "#contact", label: "Kontakt" },
                ].map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold">Rechtliches</h3>
              <ul className="mt-4 space-y-2">
                {[
                  { href: "/impressum", label: "Impressum" },
                  { href: "/agb", label: "AGB" },
                  { href: "/datenschutz", label: "Datenschutz" },
                ].map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          <motion.div
            className="mt-8 border-t pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ErsatzteilPartner24. Alle Rechte vorbehalten.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
