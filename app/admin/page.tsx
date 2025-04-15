"use client"
import dynamic from "next/dynamic"

// Dynamischer Import der Tab-Komponenten mit korrekter Konfiguration
const InquiriesTab = dynamic(() => import("./components/inquiries-tab"), {
  ssr: false,
  loading: () => <div>Lade Anfragen...</div>,
})

const ReturnsTab = dynamic(() => import("./components/returns-tab"), {
  ssr: false,
  loading: () => <div>Lade Rückgaben...</div>,
})

const ReklamationenTab = dynamic(() => import("./components/reklamationen-tab"), {
  ssr: false,
  loading: () => <div>Lade Reklamationen...</div>,
})

const PopupManagerTab = dynamic(() => import("./components/popup-manager-tab"), {
  ssr: false,
  loading: () => <div>Lade Popup-Manager...</div>,
})

// Verhindere statisches Prerendering für diese Seite
export const forceDynamic = "force-dynamic"
export const runtime = "edge"

export default function AdminPage() {
  return null // Leere Seite für SSR
}
