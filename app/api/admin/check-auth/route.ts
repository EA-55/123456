import { type NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"

export function GET(req: NextRequest) {
  console.log("Auth-Check API aufgerufen")
  console.log(`Auth-Cookie: ${req.cookies.get("admin_auth")?.value}`)

  if (isAuthenticated(req)) {
    return NextResponse.json({ authenticated: true })
  } else {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
