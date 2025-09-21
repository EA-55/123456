import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { CookieConsent } from "@/components/cookie-consent"
import { InfoBar } from "@/components/info-bar"
// Importieren Sie die Debug-Komponenten
import { WelcomePopup } from "@/components/welcome-popup-debug"
import { LocalStorageTest } from "@/components/local-storage-test"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: {
    default: "ErsatzteilPartner24 | Qualitäts-Kfz-Ersatzteile zu fairen Preisen",
    template: "%s | ErsatzteilPartner24",
  },
  description:
    "Ihr zuverlässiger Partner für hochwertige Kfz-Ersatzteile. Über 600.000 Artikel für PKW, Motorrad und NFZ zu fairen Preisen. Schnelle Lieferung am nächsten Tag.",
  keywords: [
    "Kfz-Ersatzteile",
    "Autoersatzteile",
    "Motorinstandsetzung",
    "Autoteile",
    "Fahrzeugteile",
    "Motorteile",
    "Bremsen",
    "Fahrwerk",
    "Karosserie",
    "Elektrik",
  ],
  authors: [{ name: "ErsatzteilPartner24" }],
  creator: "ErsatzteilPartner24",
  publisher: "ErsatzteilPartner24",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ersatzteilpartner24.de"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ErsatzteilPartner24 | Qualitäts-Kfz-Ersatzteile zu fairen Preisen",
    description:
      "Ihr zuverlässiger Partner für hochwertige Kfz-Ersatzteile. Über 600.000 Artikel für PKW, Motorrad und NFZ zu fairen Preisen. Schnelle Lieferung am nächsten Tag.",
    url: "https://ersatzteilpartner24.de",
    siteName: "ErsatzteilPartner24",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/autopartner24_3-MUIweDkQmdOJ4fuLvbLdnfy5leqtmt.png",
        width: 1200,
        height: 630,
        alt: "ErsatzteilPartner24 Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ErsatzteilPartner24 | Qualitäts-Kfz-Ersatzteile zu fairen Preisen",
    description:
      "Ihr zuverlässiger Partner für hochwertige Kfz-Ersatzteile. Über 600.000 Artikel für PKW, Motorrad und NFZ zu fairen Preisen. Schnelle Lieferung am nächsten Tag.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/autopartner24_3-MUIweDkQmdOJ4fuLvbLdnfy5leqtmt.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={inter.variable}>
      <head>
        <link rel="canonical" href="https://ersatzteilpartner24.de" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <InfoBar />
        <WelcomePopup />
        {children}
        <CookieConsent />
        {process.env.NODE_ENV === "development" && <LocalStorageTest />}
      </body>
    </html>
  )
}
