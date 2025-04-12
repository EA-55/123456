"use client"

import type React from "react"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
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
import { FormSuccessDialog } from "@/components/form-success-dialog"

// Cinematischer Parallax-Effekt für Hintergrundbilder
const ParallaxBackground = ({ children, speed = 0.5, className = "" }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 300])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

const ImageSlider = () => {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Download-CqRiTGZ61dtZ0EZkKgRVMmFtpwvHYY.jpeg"
          alt="Kfz-Ersatzteile und Autozubehör - Qualitätsprodukte für Ihr Fahrzeug"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Cinematische Lichtstreifen */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 10 }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-[1px] bg-white/30"
          animate={{
            y: ["-100%", "100vh"],
            scaleX: [1, 3, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 7,
          }}
        />
      </motion.div>

      <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-white text-center">
        <motion.h1
          className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Qualitäts-Ersatzteile für Ihr Fahrzeug
        </motion.h1>
        <motion.p
          className="mt-4 max-w-[700px] text-lg sm:text-xl md:text-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Große Auswahl an hochwertigen Autoteilen zu fairen Preisen
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 relative overflow-hidden group">
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
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              asChild
              className="bg-white text-primary hover:bg-white/90 border-2 border-primary relative overflow-hidden group"
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
        </motion.div>
      </div>

      {/* Cinematischer Scroll-Indikator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            className="w-1 h-2 bg-white rounded-full mt-2"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

const BrandSlider = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sliderRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (sliderRef.current) {
      observer.observe(sliderRef.current)
    }

    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current)
      }
    }
  }, [])

  const brands = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-CsZnK0lDttfel9l9t0UNKTU5znIfkF.svg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-qP2aSDlegx8LTwNFSiqALtkojObEBu.svg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-JH412j14upUMvfRDE6Ql0flab6GlrC.svg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-JWqxZPuD3paBUjEHO1MwyCeTwSANYJ.svg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-XK5qls3TjUqreRmy9xrZZ0RcHjWJGo.svg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-GnlKovgXPIBe3kBUXvrT2tVaJHDuOs.svg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-0K2QitbmNpca3x1bTkpiZUGy8PxoVE.svg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9-ibCf5f5Qz3xryJIUk1d5aXrPUDGzbZ.svg",
  ]

  return (
    <div className="overflow-hidden" ref={sliderRef}>
      <motion.div
        className="flex gap-8"
        animate={
          isVisible
            ? {
                x: [0, -1920],
              }
            : {}
        }
        transition={
          isVisible
            ? {
                x: {
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }
            : {}
        }
      >
        {[...brands, ...brands].map((brand, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0"
            whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={brand || "/placeholder.svg"}
              alt={`Autoersatzteile Marke ${index + 1} - Qualitätsprodukte für Ihr Fahrzeug`}
              width={220}
              height={70}
              loading="lazy"
              onError={(e) => {
                // If image fails to load, replace with a fallback or hide the element
                e.currentTarget.style.display = "none"
              }}
            />
          </motion.div>
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorDetails, setErrorDetails] = useState<string | null>(null)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorDetails(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Speichern der Anfrage im localStorage
        const timestamp = new Date().toISOString()
        const inquiryId = `contact_${timestamp}`
        const storedInquiries = JSON.parse(localStorage.getItem("contactInquiries") || "[]")

        storedInquiries.push({
          id: inquiryId,
          type: "contact",
          data: { ...formData },
          timestamp,
          status: "new",
        })

        localStorage.setItem("contactInquiries", JSON.stringify(storedInquiries))

        // Dispatch storage event für andere Tabs
        window.dispatchEvent(
          new StorageEvent("storage", {
            key: "contactInquiries",
            newValue: JSON.stringify(storedInquiries),
          }),
        )

        setSubmitStatus("success")
        setFormData({ name: "", email: "", phone: "", message: "" })

        // Erfolgs-Dialog anzeigen
        setShowSuccessDialog(true)
      } else {
        const errorData = await response.json()
        console.error("Server error:", errorData)
        setSubmitStatus("error")
        setErrorDetails(JSON.stringify(errorData, null, 2))
      }
    } catch (error) {
      console.error("Error:", error)
      setSubmitStatus("error")
      setErrorDetails(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            name="name"
            placeholder="Name"
            className="h-12"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            name="email"
            type="email"
            placeholder="E-Mail"
            className="h-12"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            name="phone"
            type="tel"
            placeholder="Telefon"
            className="h-12"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Textarea
            name="message"
            placeholder="Ihre Nachricht"
            className="min-h-[120px] resize-none"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button type="submit" className="w-full relative overflow-hidden" disabled={isSubmitting}>
            <span className="relative z-10">{isSubmitting ? "Wird gesendet..." : "Nachricht senden"}</span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-orange-600 to-primary"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
          </Button>
        </motion.div>
        {submitStatus === "error" && (
          <div>
            <p className="text-red-600">
              Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.
            </p>
            {errorDetails && (
              <pre className="mt-2 p-2 bg-red-100 text-red-800 rounded text-xs overflow-auto">{errorDetails}</pre>
            )}
          </div>
        )}
      </form>

      {/* Erfolgs-Dialog */}
      <FormSuccessDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog} formType="contact" />
    </>
  )
}

// Animierte Feature-Karte
const FeatureCard = ({ icon: Icon, title, description }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <Card className="p-6 text-center h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300">
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Icon className="mx-auto h-12 w-12 text-primary" />
        </motion.div>
        <h3 className="mt-4 text-2xl font-bold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </Card>
    </motion.div>
  )
}

export default function ClientComponents() {
  return (
    <>
      {/* Hero Section */}
      <ImageSlider />

      {/* About Us Section */}
      <section id="about" className="py-20 bg-muted relative overflow-hidden">
        <ParallaxBackground
          speed={0.2}
          className="absolute inset-0 bg-gradient-to-b from-gray-200 to-transparent opacity-50"
        />
        <div className="container relative z-10">
          <motion.h2
            className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Über ErsatzteilPartner24
          </motion.h2>
          <motion.p
            className="mt-4 text-center text-muted-foreground max-w-[800px] mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            ErsatzteilPartner24 ist Ihr zuverlässiger Partner für hochwertige Kfz-Ersatzteile. Mit über 600.000 Artikeln
            für PKW, Motorrad und NFZ bieten wir europaweit eine der größten Auswahlen zu fairen Preisen.
          </motion.p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={Package} title="Große Auswahl" description="600.000 Artikel für PKW, Motorrad und NFZ" />
            <FeatureCard
              icon={Search}
              title="Schnelle Lieferung"
              description="Bestellung bis 18 Uhr, Lieferung ab 7 Uhr am nächsten Tag"
            />
            <FeatureCard
              icon={Truck}
              title="Eigene Auslieferung"
              description="Zuverlässige Lieferung durch unseren eigenen Lieferservice"
            />
          </div>
        </div>
      </section>

      {/* Motorinstandsetzung Teaser Section - New Design */}
      <section id="motorinstandsetzung" className="py-24 relative overflow-hidden">
        {/* Hintergrund mit Gradient und Muster */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
          <div className="absolute inset-0 opacity-10 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat"></div>
        </div>

        {/* Animierte Lichteffekte */}
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
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
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

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Linke Spalte mit Bild */}
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
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/adad-FppmyQe7v138OXuvvJYsgLRTBgx8KQ.png"
                  alt="Professionelle Motorinstandsetzung - Hochleistungsmotor"
                  width={800}
                  height={600}
                  className="object-cover w-full aspect-[4/3]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
              </div>
            </motion.div>

            {/* Rechte Spalte mit Inhalt */}
            <div className="lg:col-span-7 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30"
              >
                <span className="text-sm font-semibold">Spezialisierter Service</span>
              </motion.div>

              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Professionelle Motorinstandsetzung
              </motion.h2>

              <motion.p
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Wir bieten Ihnen eine professionelle Motorinstandsetzung für alle Fahrzeugtypen. Unsere erfahrenen
                Mechaniker verwenden modernste Technologien und hochwertige Ersatzteile.
              </motion.p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  { text: "Detaillierte Diagnose und Fehlerbehebung", icon: Search, delay: 0.3 },
                  { text: "Professionelle Reinigung aller Komponenten", icon: Wrench, delay: 0.4 },
                  { text: "Verwendung von Original-Ersatzteilen", icon: Package, delay: 0.5 },
                  { text: "Umfassende Qualitätssicherung", icon: Gauge, delay: 0.6 },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: item.delay }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, x: 5 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-3 flex items-center gap-3 transition-all duration-300 hover:bg-white/20 hover:border-primary/30"
                  >
                    <div className="bg-primary/20 p-2 rounded-full">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-gray-200">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-primary to-orange-600 rounded-lg blur-md z-0 opacity-70"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                      scale: [0.98, 1.02, 0.98],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                  <Button asChild size="lg" className="relative z-10">
                    <Link href="/motorinstandsetzung">
                      <span className="relative z-10">Mehr erfahren</span>
                      <ChevronRight className="ml-2 h-4 w-4 relative z-10" />
                    </Link>
                  </Button>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 transition-colors"
                >
                  <a href="#contact">
                    <span>Kontakt aufnehmen</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 relative overflow-hidden">
        <ParallaxBackground
          speed={-0.1}
          className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-transparent opacity-50"
        />
        <div className="container relative z-10">
          <motion.h2
            className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Unser Sortiment
          </motion.h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Wrench,
                title: "Bremsen & Fahrwerk",
                items: ["Bremsscheiben", "Bremsbeläge", "Stoßdämpfer", "Federn"],
              },
              {
                icon: Gauge,
                title: "Motor & Antrieb",
                items: ["Riemen & Rollen", "Wasserpumpen", "Ölfilter", "Zündkerzen"],
              },
              {
                icon: Car,
                title: "Karosserie",
                items: ["Stoßstangen", "Kotflügel", "Spiegel", "Beleuchtung"],
              },
              {
                icon: Zap,
                title: "Elektrik",
                items: ["Sensoren", "Batterien", "Anlasser", "Lichtmaschinen"],
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <Card className="p-6 h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                  <category.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {category.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + itemIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="py-16 bg-white relative overflow-hidden">
        <ParallaxBackground
          speed={0.1}
          className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 opacity-30"
        />
        <div className="container relative z-10">
          <motion.h2
            className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Unsere Produkt Marken
          </motion.h2>
          <BrandSlider />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted relative overflow-hidden">
        <ParallaxBackground
          speed={-0.2}
          className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-transparent opacity-50"
        />
        <div className="container max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Kontaktieren Sie uns
            </motion.h2>
            <motion.p
              className="mt-4 text-muted-foreground max-w-[600px] mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Haben Sie Fragen zu unseren Produkten? Wir sind für Sie da.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <ContactForm />
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Kontaktinformationen</h3>
                    <div className="space-y-4">
                      <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                        <PhoneCall className="h-5 w-5 text-primary" />
                        <span>01705345350</span>
                      </motion.div>
                      <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                        <Mail className="h-5 w-5 text-primary" />
                        <span>info@ersatzteilpartner24.de</span>
                      </motion.div>
                      <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>Dietrich Bonhoeffer Str. 4, 21423 Winsen Luhe</span>
                      </motion.div>
                      <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                        <Clock className="h-5 w-5 text-primary" />
                        <span>Mo-Fr: 7:00 - 18:00 Uhr</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black">
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: 'url("/placeholder.svg?height=500&width=1920")',
              backgroundSize: "cover",
            }}
          />
        </div>
        <div className="container text-center relative z-10">
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Finden Sie die passenden Teile für Ihr Fahrzeug
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-[600px] text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Bestellen Sie bis 18 Uhr und erhalten Sie Ihre Teile am nächsten Morgen ab 7 Uhr
          </motion.p>
          <motion.div
            className="mt-8 inline-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button size="lg" asChild className="bg-primary text-white hover:bg-primary/90">
              <a href="https://tm1.carparts-cat.com/login/atevis" target="_blank" rel="noopener noreferrer">
                Zum Shop
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Filmische Lichtstreifen */}
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 10 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-[1px] bg-white/30"
            animate={{
              y: ["-100%", "100vh"],
              scaleX: [1, 3, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 7,
            }}
          />
        </motion.div>
      </section>
    </>
  )
}
