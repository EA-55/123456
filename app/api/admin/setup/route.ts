import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import fs from "fs"
import path from "path"

// Pfad zur temporären Datei für Admin-Zugangsdaten
const CREDENTIALS_FILE = path.join(process.cwd(), "admin-credentials.json")

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Benutzername und Passwort sind erforderlich" },
        { status: 400 },
      )
    }

    // Speichern der Zugangsdaten in einer temporären Datei
    const credentials = { username, password }
    fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(credentials, null, 2))

    // Cookie setzen, um den Benutzer als authentifiziert zu markieren
    cookies().set({
      name: "admin_auth",
      value: "authenticated",
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Setup error:", error)
    return NextResponse.json({ success: false, error: "Serverfehler" }, { status: 500 })
  }
}
