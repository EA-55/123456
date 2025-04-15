import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createServerClient } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Benutzername und Passwort sind erforderlich" },
        { status: 400 },
      )
    }

    // Store credentials in Supabase
    const supabase = createServerClient()

    // Check if admin settings already exist
    const { data: existingSettings, error: fetchError } = await supabase.from("admin_settings").select("*").single()

    if (fetchError && fetchError.code !== "PGRST116") {
      // PGRST116 is "no rows returned" which is expected
      console.error("Error checking admin settings:", fetchError)
      return NextResponse.json(
        { success: false, error: "Fehler beim Überprüfen der Admin-Einstellungen" },
        { status: 500 },
      )
    }

    // Insert or update admin settings
    const credentials = { username, password, updated_at: new Date().toISOString() }

    let error
    if (existingSettings) {
      const { error: updateError } = await supabase
        .from("admin_settings")
        .update(credentials)
        .eq("id", existingSettings.id)
      error = updateError
    } else {
      const { error: insertError } = await supabase.from("admin_settings").insert({ ...credentials, id: 1 })
      error = insertError
    }

    if (error) {
      console.error("Error saving admin settings:", error)
      return NextResponse.json(
        { success: false, error: "Fehler beim Speichern der Admin-Einstellungen" },
        { status: 500 },
      )
    }

    // Set cookie to mark user as authenticated
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
