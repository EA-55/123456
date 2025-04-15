import type { NextRequest } from "next/server"

// Entfernung der Node.js-spezifischen Module (fs, path)
// und Verwendung von Umgebungsvariablen

export function isAuthenticated(req: NextRequest) {
  const authCookie = req.cookies.get("admin_auth")?.value
  return authCookie === "authenticated"
}

export async function authenticate(username: string, password: string) {
  try {
    // Verwende nur Umgebungsvariablen für die Authentifizierung
    const envUsername = process.env.ADMIN_USERNAME || process.env.NEXT_PUBLIC_ADMIN_USERNAME
    const envPassword = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD

    if (envUsername && envPassword) {
      return username === envUsername && password === envPassword
    }

    // Fallback auf Standardwerte, wenn keine Umgebungsvariablen vorhanden sind
    // (nur für Entwicklungszwecke)
    if (process.env.NODE_ENV !== "production") {
      return username === "admin" && password === "password"
    }

    return false
  } catch (error) {
    console.error("Authentication error:", error)
    return false
  }
}
