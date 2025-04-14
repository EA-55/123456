import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

// Einfache GET-Funktion mit korrekter Typisierung
export async function GET(request: Request) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("complaints").select("*").order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: "Fehler beim Abrufen der Beschwerden" }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Fehler in GET /api/complaints:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}

// Einfache POST-Funktion mit korrekter Typisierung
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = createClient()

    const { data, error } = await supabase.from("complaints").insert(body).select().single()

    if (error) {
      return NextResponse.json({ error: "Fehler beim Erstellen der Beschwerde" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Fehler in POST /api/complaints:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}
