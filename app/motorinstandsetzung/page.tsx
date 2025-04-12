import type { Metadata } from "next"
import MotorinstandsetzungClient from "./MotorinstandsetzungClient"

// Metadata für diese Seite
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Professionelle Motorinstandsetzung | Kfz-Motorreparatur",
    description:
      "Fachgerechte Motorinstandsetzung für alle Fahrzeugtypen. Komplette Überholung, Leistungsoptimierung und Qualitätssicherung durch zertifizierte Meisterbetriebe.",
    keywords: [
      "Motorinstandsetzung",
      "Motorreparatur",
      "Motorüberholung",
      "Motorschaden",
      "Motorblock",
      "Zylinderkopf",
      "Kurbelwelle",
      "Motorleistung",
      "Kfz-Werkstatt",
    ],
    alternates: {
      canonical: "/motorinstandsetzung",
    },
    openGraph: {
      title: "Professionelle Motorinstandsetzung | ErsatzteilPartner24",
      description:
        "Fachgerechte Motorinstandsetzung für alle Fahrzeugtypen. Komplette Überholung, Leistungsoptimierung und Qualitätssicherung durch zertifizierte Meisterbetriebe.",
      url: "https://ersatzteilpartner24.de/motorinstandsetzung",
      type: "website",
    },
  }
}

// Füge eine Funktion hinzu, um statische Generierung zu aktivieren
export const dynamic = "force-static"
export const revalidate = 86400 // Revalidiere einmal täglich

export default function Motorinstandsetzung() {
  return <MotorinstandsetzungClient />
}
