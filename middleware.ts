import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Explizit für Edge Runtime konfigurieren
export const runtime = "edge"

// Middleware ohne Node.js-spezifische Module
export function middleware(request: NextRequest) {
  // Admin-Bereich schützen
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.includes("/admin/login")) {
    const authCookie = request.cookies.get("admin_auth")?.value

    if (authCookie !== "authenticated") {
      const url = new URL("/admin/login", request.url)
      url.searchParams.set("redirect", request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Schütze alle Admin-Routen außer Login
    "/admin/:path*",
  ],
}
