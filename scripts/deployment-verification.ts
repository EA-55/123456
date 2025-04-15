/**
 * Deployment-Verifikationsskript
 *
 * Dieses Skript führt automatisierte Überprüfungen nach einem Deployment durch,
 * um sicherzustellen, dass alle kritischen Funktionen korrekt arbeiten.
 */

import { createClient } from "@supabase/supabase-js"
import fetch from "node-fetch"

// Konfiguration
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://ersatzteilpartner24.de"
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

// Kritische Seiten, die überprüft werden sollen
const CRITICAL_PAGES = [
  "/",
  "/motorinstandsetzung",
  "/software-tuning",
  "/reklamation",
  "/rueckgabe",
  "/admin/login",
  "/agb",
  "/impressum",
  "/datenschutz",
]

// API-Endpunkte, die überprüft werden sollen
const API_ENDPOINTS = ["/api/supabase-test", "/api/debug"]

/**
 * Überprüft, ob eine Seite erfolgreich geladen werden kann
 */
async function checkPage(url: string): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}${url}`)
    if (response.status === 200) {
      console.log(`✅ Seite ${url} ist erreichbar`)
      return true
    } else {
      console.error(`❌ Seite ${url} ist nicht erreichbar (Status: ${response.status})`)
      return false
    }
  } catch (error) {
    console.error(`❌ Fehler beim Zugriff auf ${url}:`, error)
    return false
  }
}

/**
 * Überprüft, ob ein API-Endpunkt funktioniert
 */
async function checkApiEndpoint(url: string): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}${url}`)
    if (response.status === 200) {
      console.log(`✅ API-Endpunkt ${url} funktioniert`)
      return true
    } else {
      console.error(`❌ API-Endpunkt ${url} funktioniert nicht (Status: ${response.status})`)
      return false
    }
  } catch (error) {
    console.error(`❌ Fehler beim Zugriff auf API-Endpunkt ${url}:`, error)
    return false
  }
}

/**
 * Überprüft die Verbindung zur Supabase-Datenbank
 */
async function checkSupabaseConnection(): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error("❌ Supabase-Umgebungsvariablen fehlen")
    return false
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    const { data, error } = await supabase.from("motor_inquiries").select("id").limit(1)

    if (error) {
      console.error("❌ Supabase-Verbindung fehlgeschlagen:", error)
      return false
    }

    console.log("✅ Supabase-Verbindung erfolgreich")
    return true
  } catch (error) {
    console.error("❌ Fehler bei der Supabase-Verbindung:", error)
    return false
  }
}

/**
 * Hauptfunktion zur Durchführung aller Überprüfungen
 */
async function runVerification() {
  console.log("🔍 Starte Deployment-Verifikation...")
  console.log(`🌐 Basis-URL: ${BASE_URL}`)

  let allChecksSuccessful = true

  // Überprüfe kritische Seiten
  console.log("\n📄 Überprüfe kritische Seiten:")
  for (const page of CRITICAL_PAGES) {
    const success = await checkPage(page)
    allChecksSuccessful = allChecksSuccessful && success
  }

  // Überprüfe API-Endpunkte
  console.log("\n🔌 Überprüfe API-Endpunkte:")
  for (const endpoint of API_ENDPOINTS) {
    const success = await checkApiEndpoint(endpoint)
    allChecksSuccessful = allChecksSuccessful && success
  }

  // Überprüfe Supabase-Verbindung
  console.log("\n🗄️ Überprüfe Supabase-Verbindung:")
  const supabaseSuccess = await checkSupabaseConnection()
  allChecksSuccessful = allChecksSuccessful && supabaseSuccess

  // Ergebnis ausgeben
  console.log("\n📊 Verifikationsergebnis:")
  if (allChecksSuccessful) {
    console.log("✅ Alle Überprüfungen erfolgreich! Das Deployment scheint korrekt zu funktionieren.")
  } else {
    console.error("❌ Einige Überprüfungen sind fehlgeschlagen. Bitte überprüfe die Fehler und behebe sie.")
  }
}

// Führe die Verifikation aus
runVerification().catch((error) => {
  console.error("❌ Unerwarteter Fehler bei der Verifikation:", error)
  process.exit(1)
})
