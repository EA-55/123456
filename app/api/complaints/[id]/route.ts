import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

// Einfache GET-Funktion mit korrekter Typisierung
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const supabase = createClient()

    // Basisabfrage für die Beschwerde
    const { data: complaint, error } = await supabase.from("complaints").select("*").eq("id", id).single()

    if (error) {
      return NextResponse.json({ error: "Fehler beim Abrufen der Beschwerde" }, { status: 500 })
    }

    if (!complaint) {
      return NextResponse.json({ error: "Beschwerde nicht gefunden" }, { status: 404 })
    }

    return NextResponse.json(complaint)
  } catch (error) {
    console.error("Fehler in GET /api/complaints/[id]:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}

// Einfache PATCH-Funktion mit korrekter Typisierung
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()
    const supabase = createClient()

    const { data, error } = await supabase.from("complaints").update(body).eq("id", id).select().single()

    if (error) {
      return NextResponse.json({ error: "Fehler beim Aktualisieren der Beschwerde" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Fehler in PATCH /api/complaints/[id]:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}

// Einfache DELETE-Funktion mit korrekter Typisierung
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const supabase = createClient()

    const { error } = await supabase.from("complaints").delete().eq("id", id)

    if (error) {
      return NextResponse.json({ error: "Fehler beim Löschen der Beschwerde" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Fehler in DELETE /api/complaints/[id]:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}
