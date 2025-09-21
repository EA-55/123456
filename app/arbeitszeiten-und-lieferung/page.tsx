"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Clock, Truck, AlertTriangle, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Cinematischer Parallax-Hintergrund
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

// Cinematischer Reveal-Effekt
const CinematicReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        initial={{ width: "100%" }}
        animate={isInView ? { width: "0%" } : { width: "100%" }}
        transition={{ duration: 1, delay, ease: [0.6, 0.01, -0.05, 0.95] }}
        className="absolute inset-0 bg-primary z-10"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function ArbeitszeienUndLieferung() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150])

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Cinematische Hintergrundeffekte */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none z-10"></div>

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="relative h-[70vh] w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div className="absolute inset-0" style={{ y, scale }}>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/Download-hILvCg7p5r1Bnbj5RrVb35tLuB6lJT.jpeg"
            alt="Arbeitszeiten und Lieferung Hero"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"
          style={{ opacity }}
        />

        {/* Filmische Lichtstreifen */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 10 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-[2px] bg-white/30"
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
            className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y: textY }}
          >
            Arbeitszeiten & Lieferung
          </motion.h1>
          <motion.p
            className="mt-6 max-w-[700px] text-xl sm:text-2xl md:text-3xl text-white/90"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ y: textY }}
          >
            Informationen zu unseren Öffnungszeiten und Lieferservice
          </motion.p>
        </div>

        {/* Filmischer Scroll-Indikator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.p
            className="text-white/80 text-sm mb-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Scrollen Sie für mehr
          </motion.p>
          <motion.div
            className="w-[30px] h-[50px] border-2 border-white/50 rounded-full flex justify-center"
            animate={{
              boxShadow: [
                "0 0 0 rgba(255, 153, 0, 0)",
                "0 0 15px rgba(255, 153, 0, 0.5)",
                "0 0 0 rgba(255, 153, 0, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              className="w-1.5 h-3 bg-white/80 rounded-full mt-2"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
      </motion.div>

      <div className="container mx-auto px-4 py-12 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/" passHref>
            <Button variant="outline" className="mb-6 bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zur Hauptseite
            </Button>
          </Link>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-xl blur-xl opacity-0"
              whileInView={{ opacity: [0, 0.7, 0.3] }}
              transition={{ duration: 2 }}
              viewport={{ once: true }}
            />
            <Card className="shadow-lg border-2 border-transparent hover:border-primary/20 transition-all duration-300 bg-white/80 backdrop-blur-sm relative z-10 h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Clock className="mr-2 text-primary" />
                  </motion.div>
                  Arbeitszeiten
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/2">Tag</TableHead>
                      <TableHead>Öffnungszeiten</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { day: "Montag - Freitag", hours: "08:00 - 18:00 Uhr" },
                      { day: "Samstag", hours: "08:00 - 13:30 Uhr" },
                      { day: "Sonntag", hours: "Geschlossen" },
                    ].map((item, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="hover:bg-primary/5 transition-colors"
                      >
                        <TableCell className="font-medium">{item.day}</TableCell>
                        <TableCell>{item.hours}</TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-xl blur-xl opacity-0"
              whileInView={{ opacity: [0, 0.7, 0.3] }}
              transition={{ duration: 2, delay: 0.2 }}
              viewport={{ once: true }}
            />
            <Card className="shadow-lg border-2 border-transparent hover:border-primary/20 transition-all duration-300 bg-white/80 backdrop-blur-sm relative z-10 h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Truck className="mr-2 text-primary" />
                  </motion.div>
                  Lieferzeiten
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/2">Bestellung bis</TableHead>
                      <TableHead>Lieferung am</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { order: "Montag 18:00 Uhr", delivery: "Dienstag ab 07:00 Uhr" },
                      { order: "Dienstag 18:00 Uhr", delivery: "Mittwoch ab 07:00 Uhr" },
                      { order: "Mittwoch 18:00 Uhr", delivery: "Donnerstag ab 07:00 Uhr" },
                      { order: "Donnerstag 18:00 Uhr", delivery: "Freitag ab 07:00 Uhr" },
                      { order: "Freitag 18:00 Uhr", delivery: "Samstag ab 08:00 Uhr" },
                      { order: "Samstag 13:30 Uhr", delivery: "Montag ab 07:00 Uhr" },
                    ].map((item, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="hover:bg-primary/5 transition-colors"
                      >
                        <TableCell className="font-medium">{item.order}</TableCell>
                        <TableCell>{item.delivery}</TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-xl blur-xl opacity-0"
            whileInView={{ opacity: [0, 0.7, 0.3] }}
            transition={{ duration: 2, delay: 0.4 }}
            viewport={{ once: true }}
          />
          <Card className="mt-8 shadow-lg border-2 border-transparent hover:border-primary/20 transition-all duration-300 bg-white/80 backdrop-blur-sm relative z-10">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <AlertTriangle className="mr-2 text-primary" />
                </motion.div>
                Wichtige Hinweise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {[
                  "Bestellungen, die nach 18:00 Uhr eingehen, werden am nächsten Arbeitstag bearbeitet.",
                  "Samstagsbestellungen nach 13:30 Uhr werden am Montag bearbeitet und Dienstag geliefert.",
                  "An Sonn- und Feiertagen erfolgt keine Bearbeitung oder Auslieferung von Bestellungen.",
                  "Alle Lieferzeiten gelten vorbehaltlich der Verfügbarkeit der Artikel.",
                  "Für dringende Bestellungen kontaktieren Sie bitte unseren Kundenservice.",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="hover:text-primary transition-colors"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <CinematicReveal>
            <h2 className="text-3xl font-bold mb-4">Bereit zu bestellen?</h2>
          </CinematicReveal>
          <motion.p
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            Besuchen Sie unseren B2B Shop und profitieren Sie von unserem schnellen Lieferservice
          </motion.p>
          <motion.div className="relative inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <motion.div
              className="absolute -inset-4 bg-primary/30 rounded-xl blur-xl"
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
            <Button size="lg" asChild className="relative z-10">
              <Link href="https://tm1.carparts-cat.com/login/atevis" target="_blank" rel="noopener noreferrer">
                Zum Shop
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
