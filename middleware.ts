import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Konfiguration für die Middleware
export const config = {
  matcher: ["/admin/:path*"],
}

// Middleware-Funktion mit verbesserter Fehlerbehandlung
export function middleware(request: NextRequest) {
  try {
    // Überprüfe, ob der Benutzer angemeldet ist
    const authCookie = request.cookies.get("admin_auth")

    // Wenn der Benutzer nicht angemeldet ist und versucht, auf den Admin-Bereich zuzugreifen
    if (!authCookie?.value && !request.nextUrl.pathname.includes("/admin/login")) {
      // Leite zur Login-Seite weiter
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }

    // Erlaube den Zugriff
    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)

    // Im Fehlerfall zur Login-Seite weiterleiten
    const loginUrl = new URL("/admin/login", request.url)
    return NextResponse.redirect(loginUrl)
  }
}
