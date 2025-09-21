import fs from "fs"
import path from "path"

// Pfad zur temporären Datei für Admin-Zugangsdaten
const CREDENTIALS_FILE = path.join(process.cwd(), "admin-credentials.json")

export async function authenticate(username: string, password: string) {
  try {
    // Zuerst prüfen, ob Umgebungsvariablen vorhanden sind
    const envUsername = process.env.ADMIN_USERNAME
    const envPassword = process.env.ADMIN_PASSWORD

    if (envUsername && envPassword) {
      return username === envUsername && password === envPassword
    }

    // Wenn keine Umgebungsvariablen vorhanden sind, die gespeicherten Zugangsdaten prüfen
    if (fs.existsSync(CREDENTIALS_FILE)) {
      const fileContent = fs.readFileSync(CREDENTIALS_FILE, "utf8")
      const credentials = JSON.parse(fileContent)

      return username === credentials.username && password === credentials.password
    }

    // Fallback auf Standardwerte
    return username === "admin" && password === "password"
  } catch (error) {
    console.error("Authentication error:", error)
    // Fallback auf Standardwerte im Fehlerfall
    return username === "admin" && password === "password"
  }
}
