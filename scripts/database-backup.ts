/**
 * Supabase Datenbank-Backup-Skript
 *
 * Dieses Skript erstellt ein Backup der wichtigsten Tabellen in der Supabase-Datenbank
 * und speichert es als JSON-Dateien.
 */

import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"

// Konfiguration
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const BACKUP_DIR = path.join(process.cwd(), "backups")

// Tabellen, die gesichert werden sollen
const TABLES_TO_BACKUP = [
  "motor_inquiries",
  "contacts",
  "b2b_registrations",
  "returns",
  "complaints",
  "complaint_items",
  "complaint_vehicle_data",
]

/**
 * Erstellt das Backup-Verzeichnis, falls es nicht existiert
 */
function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true })
    console.log(`✅ Backup-Verzeichnis erstellt: ${BACKUP_DIR}`)
  }
}

/**
 * Erstellt ein Backup einer Tabelle
 */
async function backupTable(supabase: any, tableName: string): Promise<boolean> {
  try {
    console.log(`🔄 Sichere Tabelle: ${tableName}...`)

    const { data, error } = await supabase.from(tableName).select("*")

    if (error) {
      console.error(`❌ Fehler beim Sichern von ${tableName}:`, error)
      return false
    }

    const timestamp = new Date().toISOString().replace(/:/g, "-")
    const fileName = `${tableName}_${timestamp}.json`
    const filePath = path.join(BACKUP_DIR, fileName)

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    console.log(`✅ Tabelle ${tableName} gesichert: ${filePath}`)

    return true
  } catch (error) {
    console.error(`❌ Unerwarteter Fehler beim Sichern von ${tableName}:`, error)
    return false
  }
}

/**
 * Hauptfunktion zum Erstellen aller Backups
 */
async function createBackups() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error("❌ Supabase-Umgebungsvariablen fehlen")
    process.exit(1)
  }

  console.log("🔍 Starte Datenbank-Backup...")

  // Stelle sicher, dass das Backup-Verzeichnis existiert
  ensureBackupDir()

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

    let allBackupsSuccessful = true

    // Sichere jede Tabelle
    for (const table of TABLES_TO_BACKUP) {
      const success = await backupTable(supabase, table)
      allBackupsSuccessful = allBackupsSuccessful && success
    }

    // Ergebnis ausgeben
    console.log("\n📊 Backup-Ergebnis:")
    if (allBackupsSuccessful) {
      console.log("✅ Alle Tabellen wurden erfolgreich gesichert!")
    } else {
      console.error("❌ Einige Backups sind fehlgeschlagen. Bitte überprüfe die Fehler.")
    }
  } catch (error) {
    console.error("❌ Unerwarteter Fehler beim Backup-Prozess:", error)
    process.exit(1)
  }
}

// Führe die Backups aus
createBackups().catch((error) => {
  console.error("❌ Kritischer Fehler:", error)
  process.exit(1)
})
