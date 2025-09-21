import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { isAuthenticated } from "./lib/auth"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Debugging
  console.log(`Middleware ausgeführt für: ${pathname}`)
  console.log(`Auth-Cookie: ${req.cookies.get("admin_auth")?.value}`)

  // Only apply to /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!isAuthenticated(req)) {
      console.log("Nicht authentifiziert, Weiterleitung zur Login-Seite")
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }
    console.log("Authentifiziert, Zugriff erlaubt")
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
