import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { authenticate } from "@/lib/server-auth"

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Benutzername und Passwort sind erforderlich" },
        { status: 400 },
      )
    }

    const isValid = await authenticate(username, password)

    if (isValid) {
      // Set a cookie to maintain the session
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
    } else {
      return NextResponse.json({ success: false, error: "Ungültige Anmeldedaten" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "Serverfehler" }, { status: 500 })
  }
}
